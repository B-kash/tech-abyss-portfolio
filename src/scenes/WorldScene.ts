import Phaser from 'phaser';
import { SaveSystem } from '../systems/SaveSystem';
import { InteractionSystem } from '../systems/InteractionSystem';
import { DialogUI } from '../ui/DialogUI';
import { ContentOverlay, ContentType } from '../ui/ContentOverlay';
import { getDialog } from '../data/dialogs';

interface DoorData {
  id: string;
  requiredUnlock: string;
  targetX: number;
  targetY: number;
  label: string;
}

interface NPCData {
  id: string;
  name: string;
  dialogId: string;
}

export default class WorldScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: { W: Phaser.Input.Keyboard.Key; A: Phaser.Input.Keyboard.Key; S: Phaser.Input.Keyboard.Key; D: Phaser.Input.Keyboard.Key };
  private interactKey!: Phaser.Input.Keyboard.Key;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private escapeKey!: Phaser.Input.Keyboard.Key;
  
  private map!: Phaser.Tilemaps.Tilemap;
  private groundLayer!: Phaser.Tilemaps.TilemapLayer | null;
  private collisionLayer!: Phaser.Physics.Arcade.StaticGroup;
  
  private interactionSystem!: InteractionSystem;
  private dialogUI!: DialogUI;
  private contentOverlay!: ContentOverlay;
  
  private npcs: Map<string, Phaser.GameObjects.Sprite> = new Map();
  private doors: Map<string, { building: Phaser.GameObjects.Sprite; data: DoorData; label: Phaser.GameObjects.Text }> = new Map();
  private buildings: Map<string, { sprite: Phaser.GameObjects.Sprite; body: Phaser.Physics.Arcade.StaticBody }> = new Map();

  constructor() {
    super({ key: 'WorldScene' });
  }

  create(): void {
    // Initialize systems
    this.interactionSystem = new InteractionSystem();
    this.dialogUI = new DialogUI(this);
    this.contentOverlay = new ContentOverlay();

    // Setup input
    this.setupInput();

    // Load map first (needed for background size)
    this.loadMap();

    // Create background (after map is loaded)
    this.createBackground();

    // Create player
    this.createPlayer();

        // Setup camera - don't set bounds for wrapping world
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.5);

    // Setup wall collisions
    this.setupCollisions();

    // Load NPCs and doors from map (buildings are created with doors)
    this.loadNPCs();
    this.loadDoors();
    
    // Set up sprite collisions after all objects are created
    this.setupSpriteCollisions();
  }

  private setupSpriteCollisions(): void {
    // Collision between NPCs (they shouldn't overlap) - set up here as fallback
    // Note: Player collisions are set up immediately when NPCs/buildings are created
    const npcArray = Array.from(this.npcs.values());
    for (let i = 0; i < npcArray.length; i++) {
      for (let j = i + 1; j < npcArray.length; j++) {
        this.physics.add.collider(npcArray[i], npcArray[j]);
      }
    }
  }

  private dialogKeyHandler?: (event: KeyboardEvent) => void;
  private dialogKeyHandlerActive = false;
  private pressedKeys = new Set<string>();

  private setupInput(): void {
    this.cursors = this.input.keyboard!.createCursorKeys();
    this.wasdKeys = this.input.keyboard!.addKeys('W,A,S,D') as any;
    this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.spaceKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.escapeKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.escapeKey.on('down', () => {
      if (this.contentOverlay.isOverlayVisible()) {
        this.contentOverlay.hide();
      } else if (this.dialogUI.isDialogVisible()) {
        this.dialogUI.hide();
      }
    });

    // Setup global key handler for dialogs (to catch ANY key press)
    this.dialogKeyHandler = (event: KeyboardEvent) => {
      if (this.dialogUI.isDialogVisible()) {
        // Track key presses to prevent multiple triggers
        if (this.pressedKeys.has(event.code)) {
          return; // Key already being processed
        }
        this.pressedKeys.add(event.code);

        if (event.key === 'Escape') {
          this.dialogUI.hide();
        } else {
          // Any other key advances the dialog
          this.dialogUI.advance();
        }

        // Clear the key after a short delay to allow next press
        setTimeout(() => {
          this.pressedKeys.delete(event.code);
        }, 100);
      }
    };
  }

  private loadMap(): void {
    // Try to load the map, if it fails, create a basic one
    try {
      this.map = this.make.tilemap({ key: 'worldMap' });
      this.map.addTilesetImage('tileset', 'tileset');
      this.groundLayer = this.map.createLayer('Ground', 'tileset', 0, 0) || this.map.createLayer('ground', 'tileset', 0, 0) || null;
      
      if (!this.groundLayer) {
        console.warn('Ground layer not found, creating blank layer');
        // Create a blank layer if it doesn't exist
        const mapWidth = this.map.widthInPixels || 1024;
        const mapHeight = this.map.heightInPixels || 1024;
        const tileset = this.map.getTileset('tileset');
        
        if (tileset) {
          const newLayer = this.map.createBlankLayer('Ground', tileset, 0, 0, mapWidth / 16, mapHeight / 16);
          if (newLayer) {
            this.groundLayer = newLayer;
            // Fill with a varied ground pattern
            const width = newLayer.width;
            const height = newLayer.height;
            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                // Create varied terrain - mostly grass with some dirt paths
                let tileIndex = 0; // Default grass
                if ((x + y * 3) % 15 === 0) {
                  tileIndex = 4; // Dirt path
                } else if ((x * y) % 20 === 0) {
                  tileIndex = 1; // Grass variant
                }
                newLayer.putTileAt(tileIndex, x, y);
              }
            }
          }
        }
      } else if (this.groundLayer) {
        // If layer exists, check if it's empty and fill if needed
        try {
          const tile = this.groundLayer.getTileAt(0, 0, false);
          // If tile is null or has index 0, layer might be empty - fill it
          if (!tile || tile.index === 0) {
            const width = this.groundLayer.width || 125;
            const height = this.groundLayer.height || 125;
            // Fill with ground tiles (tile index 1 = grass)
            for (let y = 0; y < height; y++) {
              for (let x = 0; x < width; x++) {
                this.groundLayer.putTileAt(1, x, y);
              }
            }
          }
        } catch (e) {
          // If getting tile fails, try to fill the layer anyway
          console.warn('Could not check layer tiles, filling with defaults');
          const width = this.groundLayer.width || 125;
          const height = this.groundLayer.height || 125;
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              try {
                this.groundLayer.putTileAt(1, x, y);
              } catch (err) {
                // Ignore individual tile errors
              }
            }
          }
        }
      }
      
      // If still no ground layer, create fallback
      if (!this.groundLayer) {
        console.warn('Could not create ground layer, using fallback map');
        this.createFallbackMap();
        return;
      }
    } catch (e) {
      console.warn('Failed to load map, creating fallback:', e);
      this.createFallbackMap();
    }
  }

  private createFallbackMap(): void {
    // Create a simple fallback map if Tiled map fails to load
    // Make it large enough to accommodate all NPCs and doors (64x64 tiles = 1024x1024 pixels)
    const mapWidth = 1024;
    const mapHeight = 1024;
    
    this.map = this.make.tilemap({ 
      tileWidth: 16, 
      tileHeight: 16, 
      width: mapWidth / 16, 
      height: mapHeight / 16 
    });
    
    const tileset = this.map.addTilesetImage('tileset', 'tileset', 16, 16, 0, 0);
    if (tileset) {
      const newLayer = this.map.createBlankLayer('Ground', tileset, 0, 0, mapWidth / 16, mapHeight / 16);
      this.groundLayer = newLayer || null;
      if (this.groundLayer) {
        // Fill with varied ground pattern
        const width = this.groundLayer.width;
        const height = this.groundLayer.height;
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            // Create varied terrain - mostly grass with some dirt paths
            let tileIndex = 0; // Default grass
            if ((x + y * 3) % 15 === 0) {
              tileIndex = 4; // Dirt path
            } else if ((x * y) % 20 === 0) {
              tileIndex = 1; // Grass variant
            }
            this.groundLayer.putTileAt(tileIndex, x, y);
          }
        }
      }
    }
  }

  private createPlayer(): void {
    const saveData = SaveSystem.load();
    const mapWidth = this.map ? this.map.widthInPixels : 1024;
    const mapHeight = this.map ? this.map.heightInPixels : 1024;
    // Start player in center-ish area, with guide nearby
    const startX = saveData?.playerPosition.x ?? mapWidth * 0.5;
    const startY = saveData?.playerPosition.y ?? mapHeight * 0.5;

    this.player = this.physics.add.sprite(startX, startY, 'player');
    // Disable world bounds collision for wrapping world
    this.player.setCollideWorldBounds(false);
    this.player.setScale(1);
    this.player.setDepth(500); // Player should be above buildings and doors
  }

  private setupCollisions(): void {
    // Create collision group
    this.collisionLayer = this.physics.add.staticGroup();

    // Load collision objects from map if available
    if (this.map && this.map.objects) {
      const collisionLayer = this.map.getObjectLayer('Collisions') || this.map.getObjectLayer('collisions');
      
      if (collisionLayer && collisionLayer.objects) {
        collisionLayer.objects.forEach((obj: any) => {
          if (obj.x !== undefined && obj.y !== undefined) {
            const rect = this.add.rectangle(obj.x, obj.y, obj.width || 32, obj.height || 32, 0xff0000, 0.3);
            rect.setOrigin(0, 0);
            this.physics.add.existing(rect, true);
            this.collisionLayer.add(rect);
          }
        });
      }
    }

    // Add some default collision rectangles if none exist
    // No walls needed for wrapping world - player will wrap around edges
    // Keep collision layer for any internal obstacles if needed

    // Collision between player and walls
    this.physics.add.collider(this.player, this.collisionLayer);
  }


  private createBackground(): void {
    // Create a tiled background using the sky pattern
    const mapWidth = this.map.widthInPixels;
    const mapHeight = this.map.heightInPixels;
    
    // Create background tiles
    if (this.textures.exists('sky_bg')) {
      const bgTileSize = 64;
      const cols = Math.ceil(mapWidth / bgTileSize);
      const rows = Math.ceil(mapHeight / bgTileSize);
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const bgTile = this.add.image(x * bgTileSize, y * bgTileSize, 'sky_bg');
          bgTile.setOrigin(0, 0);
          bgTile.setDepth(-1000); // Behind everything
          bgTile.setScrollFactor(0.1, 0.1); // Slight parallax effect
        }
      }
    } else {
      // Fallback: solid color background with gradient effect
      const bg = this.add.rectangle(0, 0, mapWidth, mapHeight, 0x87ceeb);
      bg.setOrigin(0, 0);
      bg.setDepth(-1000);
    }
  }

  private getNPCSpriteKey(npcId: string): string {
    // Return the appropriate sprite key based on NPC ID
    const spriteMap: Record<string, string> = {
      'guide': 'npc_guide',
      'engineer': 'npc_engineer',
      'writer': 'npc_writer',
      'contact': 'npc_contact',
    };
    return spriteMap[npcId] || 'npc';
  }

  private loadNPCs(): void {
    if (this.map && this.map.objects) {
      const npcLayer = this.map.getObjectLayer('npcs') || this.map.getObjectLayer('NPCs');
      
      if (npcLayer && npcLayer.objects) {
        npcLayer.objects.forEach((obj: any) => {
          const npcData: NPCData = {
            id: obj.properties?.find((p: any) => p.name === 'id')?.value || obj.id || 'guide',
            name: obj.properties?.find((p: any) => p.name === 'name')?.value || 'NPC',
            dialogId: obj.properties?.find((p: any) => p.name === 'dialogId')?.value || obj.id || 'guide',
          };

          // Use specific sprite based on NPC ID
          const spriteKey = this.getNPCSpriteKey(npcData.id);
          const npc = this.physics.add.sprite(obj.x, obj.y, spriteKey);
          npc.setOrigin(0, 1); // Bottom-left origin for Tiled compatibility
          npc.setScale(1);
          npc.setDepth(400); // Above buildings, below player
          // Make NPC immovable for collision
          (npc.body as Phaser.Physics.Arcade.Body).setImmovable(true);
          
          // Add name label
          const nameLabel = this.add.text(obj.x, obj.y - 40, npcData.name, {
            fontSize: '14px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 4, y: 2 },
          });
          nameLabel.setOrigin(0, 1);

          this.npcs.set(npcData.id, npc);
          
          // Add collision with player immediately
          this.physics.add.collider(this.player, npc);

          // Add to interaction system
          this.interactionSystem.addInteractable({
            id: npcData.id,
            x: obj.x,
            y: obj.y,
            width: 32,
            height: 32,
            type: 'npc',
            data: npcData,
          });
        });
      }
    }

    // Add default NPCs if none found
    if (this.npcs.size === 0) {
      this.addDefaultNPCs();
    }
  }

  private addDefaultNPCs(): void {
    // Position NPCs spread out across the world
    const mapWidth = this.map ? this.map.widthInPixels : 1024;
    const mapHeight = this.map ? this.map.heightInPixels : 1024;
    
    // Player starts at center (0.5, 0.5), so guide should be close by
    const playerStartX = mapWidth * 0.5;
    const playerStartY = mapHeight * 0.5;
    
    const defaultNPCs: Array<{ id: string; name: string; x: number; y: number }> = [
      { id: 'guide', name: 'Guide', x: playerStartX + 68, y: playerStartY - 32 },        // Slightly right and up from player starting position
      { id: 'engineer', name: 'Engineer', x: mapWidth * 0.88, y: mapHeight * 0.34 },  // Far east, upper area
      // { id: 'writer', name: 'Writer', x: mapWidth * 0.34, y: mapHeight * 0.88 },      // Far south, left area - commented out
      { id: 'contact', name: 'Contact', x: mapWidth * 0.1, y: mapHeight * 0.63 },  // Far west, mid area
    ];

    defaultNPCs.forEach((npcData) => {
      // Use specific sprite based on NPC ID
      const spriteKey = this.getNPCSpriteKey(npcData.id);
      const npc = this.physics.add.sprite(npcData.x, npcData.y, spriteKey);
      npc.setOrigin(0.5, 1);
      npc.setScale(1);
      npc.setDepth(400); // Above buildings, below player
      // Make NPC immovable for collision
      (npc.body as Phaser.Physics.Arcade.Body).setImmovable(true);

      const nameLabel = this.add.text(npcData.x, npcData.y - 40, npcData.name, {
        fontSize: '14px',
        fontFamily: 'Courier New',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 4, y: 2 },
      });
      nameLabel.setOrigin(0.5, 1);

      this.npcs.set(npcData.id, npc);
      
      // Add collision with player immediately
      this.physics.add.collider(this.player, npc);

      this.interactionSystem.addInteractable({
        id: npcData.id,
        x: npcData.x,
        y: npcData.y,
        width: 32,
        height: 32,
        type: 'npc',
        data: { id: npcData.id, name: npcData.name, dialogId: npcData.id },
      });
    });
  }

  private loadDoors(): void {
    if (this.map && this.map.objects) {
      const doorLayer = this.map.getObjectLayer('doors') || this.map.getObjectLayer('Doors');
      
      if (doorLayer && doorLayer.objects) {
        doorLayer.objects.forEach((obj: any) => {
          const doorData: DoorData = {
            id: obj.properties?.find((p: any) => p.name === 'id')?.value || obj.id || 'door1',
            requiredUnlock: obj.properties?.find((p: any) => p.name === 'requiredUnlock')?.value || 'about',
            targetX: obj.properties?.find((p: any) => p.name === 'targetX')?.value || obj.x + 200,
            targetY: obj.properties?.find((p: any) => p.name === 'targetY')?.value || obj.y + 200,
            label: obj.properties?.find((p: any) => p.name === 'label')?.value || 'Door',
          };

          const doorX = obj.x + (obj.width || 32) / 2;
          const doorY = obj.y + (obj.height || 32) / 2;
          
          // Create building at door position
          this.createBuilding(
            doorX,
            doorY,
            this.getBuildingSpriteKey(doorData.requiredUnlock),
            doorData.id,
            doorData
          );
        });
      }
    }

    // Add default doors if none found
    if (this.doors.size === 0) {
      this.addDefaultDoors();
    }
  }

  private addDefaultDoors(): void {
    // Position buildings that act as doors, spread out across the world
    const mapWidth = this.map ? this.map.widthInPixels : 1024;
    const mapHeight = this.map ? this.map.heightInPixels : 1024;
    
    const defaultDoors: Array<{ id: string; requiredUnlock: string; label: string; x: number; y: number; targetX: number; targetY: number }> = [
      { id: 'aboutDoor', requiredUnlock: 'about', label: 'About House', x: mapWidth * 0.18, y: mapHeight * 0.18, targetX: mapWidth * 0.18, targetY: mapHeight * 0.18 },      // Northwest corner
      { id: 'projectsDoor', requiredUnlock: 'projects', label: 'Projects Lab', x: mapWidth * 0.84, y: mapHeight * 0.18, targetX: mapWidth * 0.84, targetY: mapHeight * 0.18 },  // Northeast corner
      // { id: 'blogDoor', requiredUnlock: 'blog', label: 'Blog Library', x: mapWidth * 0.84, y: mapHeight * 0.80, targetX: mapWidth * 0.84, targetY: mapHeight * 0.80 },      // Southeast corner - commented out
      { id: 'contactDoor', requiredUnlock: 'contact', label: 'Contact Office', x: mapWidth * 0.10, y: mapHeight * 0.80, targetX: mapWidth * 0.10, targetY: mapHeight * 0.80 },  // Southwest corner
    ];

    defaultDoors.forEach((doorInfo) => {
      const doorData: DoorData = {
        id: doorInfo.id,
        requiredUnlock: doorInfo.requiredUnlock,
        targetX: doorInfo.targetX,
        targetY: doorInfo.targetY,
        label: doorInfo.label,
      };
      
      // Create building that acts as the door
      this.createBuilding(
        doorInfo.x,
        doorInfo.y,
        this.getBuildingSpriteKey(doorInfo.requiredUnlock),
        doorInfo.id,
        doorData
      );
    });
  }



  private createBuilding(x: number, y: number, spriteKey: string, doorId: string, doorData?: DoorData): void {
    // Building is 64x80, position so bottom aligns with y, centered at x
    const building = this.add.sprite(x, y, spriteKey);
    building.setOrigin(0.5, 1); // Center horizontally, bottom aligned
    
    // Make building a physics body for collision
    this.physics.add.existing(building, true); // true = static body
    const body = building.body as Phaser.Physics.Arcade.StaticBody;
    // Adjust body size to match sprite better (slightly smaller than sprite for better feel)
    body.setSize(60, 78);
    body.setOffset(2, 2);
    
    // Set depth so building appears behind player but above ground
    building.setDepth(100);
    
    // Add collision with player immediately
    this.physics.add.collider(this.player, building);
    
    this.buildings.set(doorId, { sprite: building, body: body });
    
    // If this building has door data, make it interactable
    if (doorData) {
      // Add label above building
      const isUnlocked = SaveSystem.isZoneUnlocked(doorData.requiredUnlock);
      const labelText = `${doorData.label}${!isUnlocked ? ' (Locked)' : ''}`;
      const label = this.add.text(x, y - 90, labelText, {
        fontSize: '12px',
        fontFamily: 'Courier New',
        color: isUnlocked ? '#ffffff' : '#ff6600',
        backgroundColor: '#000000',
        padding: { x: 4, y: 2 },
      });
      label.setOrigin(0.5, 1);
      label.setDepth(300);
      
      // Store door data with building reference
      this.doors.set(doorId, { building: building, data: doorData, label: label });
      
      // Make building interactable - interaction area covers the front/bottom part of building
      this.interactionSystem.addInteractable({
        id: doorId,
        x: x - 32, // Building is 64 wide, so -32 to +32 covers it
        y: y - 40, // Front part of building (where door would be)
        width: 64,
        height: 40,
        type: 'door',
        data: doorData,
      });
      
      // Update building appearance based on unlock status
      if (!isUnlocked) {
        // Make locked buildings slightly darker
        building.setTint(0x888888);
      }
    }
  }

  private getBuildingSpriteKey(roomType: string): string {
    const spriteMap: Record<string, string> = {
      'about': 'building_about',
      'projects': 'building_projects',
      'blog': 'building_blog',
      'contact': 'building_contact',
    };
    return spriteMap[roomType] || 'building';
  }

  update(): void {
    // Handle dialog/overlay interactions first
    if (this.dialogUI.isDialogVisible()) {
      // Pause player movement when dialog is visible
      this.player.setVelocity(0, 0);
      
      // Activate global key handler if not already active
      if (this.dialogKeyHandler && !this.dialogKeyHandlerActive) {
        document.addEventListener('keydown', this.dialogKeyHandler);
        this.dialogKeyHandlerActive = true;
      }
      
      return;
    } else {
      // Remove global key handler when dialog is not visible
      if (this.dialogKeyHandler && this.dialogKeyHandlerActive) {
        document.removeEventListener('keydown', this.dialogKeyHandler);
        this.dialogKeyHandlerActive = false;
      }
    }

    if (this.contentOverlay.isOverlayVisible()) {
      // Pause player movement when overlay is visible
      this.player.setVelocity(0, 0);
      // ESC to close is handled in setupInput
      return;
    }

    // Handle player movement
    const speed = 276; // Increased from 200 for faster movement
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left?.isDown || this.wasdKeys.A.isDown) {
      velocityX = -speed;
    } else if (this.cursors.right?.isDown || this.wasdKeys.D.isDown) {
      velocityX = speed;
    }

    if (this.cursors.up?.isDown || this.wasdKeys.W.isDown) {
      velocityY = -speed;
    } else if (this.cursors.down?.isDown || this.wasdKeys.S.isDown) {
      velocityY = speed;
    }

    this.player.setVelocity(velocityX, velocityY);

    // World wrapping: wrap player position if they go beyond map boundaries
    const mapWidth = this.map ? this.map.widthInPixels : 1024;
    const mapHeight = this.map ? this.map.heightInPixels : 1024;
    
    // Wrap horizontally (left/right)
    if (this.player.x < 0) {
      this.player.setX(mapWidth);
    } else if (this.player.x > mapWidth) {
      this.player.setX(0);
    }
    
    // Wrap vertically (top/bottom)
    if (this.player.y < 0) {
      this.player.setY(mapHeight);
    } else if (this.player.y > mapHeight) {
      this.player.setY(0);
    }

    // Handle interaction when not in dialog/overlay
    if (Phaser.Input.Keyboard.JustDown(this.interactKey) || Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.handleInteraction();
    }
    
    // Auto-save player position periodically
    if (this.time.now % 5000 < 16) { // Every ~5 seconds
      this.savePlayerPosition();
    }
  }

  private handleInteraction(): void {
    const nearest = this.interactionSystem.findNearest(this.player.x, this.player.y);
    
    if (!nearest) return;

    if (nearest.type === 'npc') {
      const npcData = nearest.data as NPCData;
      const hasUnlocked = SaveSystem.isZoneUnlocked(
        npcData.id === 'guide' ? 'about' :
        npcData.id === 'engineer' ? 'projects' :
        npcData.id === 'writer' ? 'blog' :
        npcData.id === 'contact' ? 'contact' : ''
      );
      
      const dialog = getDialog(npcData.dialogId, hasUnlocked);
      
      // Callback to update door appearances after dialog completes if zone was unlocked
      const onDialogComplete = () => {
        if (dialog.unlocksZone) {
          // Update all door appearances in case any were unlocked
          this.doors.forEach((_door, doorId) => {
            this.updateDoorAppearance(doorId);
          });
        }
      };
      
      this.dialogUI.showDialog(dialog, onDialogComplete);
    } else if (nearest.type === 'door') {
      const doorData = nearest.data as DoorData;
      const isUnlocked = SaveSystem.isZoneUnlocked(doorData.requiredUnlock);
      
      if (isUnlocked) {
        // Teleport player into the room (fade transition)
        this.teleportPlayer(doorData.targetX, doorData.targetY, doorData.requiredUnlock);
      } else {
        // Show locked door message
        this.dialogUI.showDialog({
          id: 'locked',
          lines: [
            { speaker: 'System', text: `The ${doorData.label} is locked.` },
            { speaker: 'System', text: 'Talk to NPCs to unlock new areas!' },
          ],
        });
      }
    }
  }

  private updateDoorAppearance(doorId: string): void {
    const door = this.doors.get(doorId);
    if (!door) return;
    
    const isUnlocked = SaveSystem.isZoneUnlocked(door.data.requiredUnlock);
    
    // Update label
    const labelText = `${door.data.label}${!isUnlocked ? ' (Locked)' : ''}`;
    door.label.setText(labelText);
    door.label.setColor(isUnlocked ? '#ffffff' : '#ff6600');
    
    // Update building appearance
    const building = door.building;
    if (isUnlocked) {
      building.clearTint(); // Remove tint if unlocked
    } else {
      building.setTint(0x888888); // Darken if locked
    }
  }

  private teleportPlayer(x: number, y: number, zone: string): void {
    // Fade out
    this.cameras.main.fadeOut(300, 0, 0, 0);
    
    this.cameras.main.once('camerafadeoutcomplete', () => {
      // Move player
      this.player.setPosition(x, y);
      this.savePlayerPosition();
      
      // Show content overlay for zones
      if (zone === 'about' || zone === 'projects' || zone === 'blog' || zone === 'contact') {
        this.contentOverlay.show(zone as ContentType);
      }
      
      // Fade in
      this.cameras.main.fadeIn(300, 0, 0, 0);
    });
  }

  private savePlayerPosition(): void {
    SaveSystem.save({
      playerPosition: { x: this.player.x, y: this.player.y },
    });
  }
}