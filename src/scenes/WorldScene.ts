import Phaser from 'phaser';
import { SaveSystem } from '../systems/SaveSystem';
import { InteractionSystem, Interactable } from '../systems/InteractionSystem';
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
  private groundLayer!: Phaser.Tilemaps.TilemapLayer;
  private collisionLayer!: Phaser.Physics.Arcade.StaticGroup;
  
  private interactionSystem!: InteractionSystem;
  private dialogUI!: DialogUI;
  private contentOverlay!: ContentOverlay;
  
  private npcs: Map<string, Phaser.GameObjects.Sprite> = new Map();
  private doors: Map<string, { sprite: Phaser.GameObjects.Rectangle; data: DoorData }> = new Map();

  constructor() {
    super({ key: 'WorldScene' });
  }

  create(): void {
    // Initialize systems
    this.interactionSystem = new InteractionSystem();
    this.dialogUI = new DialogUI(this);
    this.contentOverlay = new ContentOverlay(this);

    // Setup input
    this.setupInput();

    // Load map
    this.loadMap();

    // Create player
    this.createPlayer();

    // Setup camera
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.5);

    // Setup collisions
    this.setupCollisions();

    // Load NPCs and doors from map
    this.loadNPCs();
    this.loadDoors();
  }

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
  }

  private loadMap(): void {
    // Try to load the map, if it fails, create a basic one
    try {
      this.map = this.make.tilemap({ key: 'worldMap' });
      this.map.addTilesetImage('tileset', 'tileset');
      this.groundLayer = this.map.createLayer('Ground', 'tileset', 0, 0) || this.map.createLayer('ground', 'tileset', 0, 0);
      
      if (!this.groundLayer) {
        console.warn('Ground layer not found, creating blank layer');
        // Create a blank layer if it doesn't exist
        const mapWidth = this.map.widthInPixels || 2000;
        const mapHeight = this.map.heightInPixels || 2000;
        const tileset = this.map.getTileset('tileset');
        
        if (tileset) {
          this.groundLayer = this.map.createBlankLayer('Ground', tileset, 0, 0, mapWidth / 16, mapHeight / 16);
          if (this.groundLayer) {
            // Fill with ground tiles (tile index 1 = grass, or 0 if tileset uses 0-based)
            this.groundLayer.fill(1);
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
    const mapWidth = 2000;
    const mapHeight = 2000;
    
    this.map = this.make.tilemap({ 
      tileWidth: 16, 
      tileHeight: 16, 
      width: mapWidth / 16, 
      height: mapHeight / 16 
    });
    
    const tileset = this.map.addTilesetImage('tileset', 'tileset', 16, 16, 0, 0);
    if (tileset) {
      this.groundLayer = this.map.createBlankLayer('Ground', tileset, 0, 0, mapWidth / 16, mapHeight / 16);
      
      // Fill with ground tiles
      if (this.groundLayer) {
        this.groundLayer.fill(1); // Use tile index 1 (should be a ground tile)
      }
    }
  }

  private createPlayer(): void {
    const saveData = SaveSystem.load();
    const startX = saveData?.playerPosition.x ?? 300;
    const startY = saveData?.playerPosition.y ?? 300;

    this.player = this.physics.add.sprite(startX, startY, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setScale(1);
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
    if (this.collisionLayer.children.entries.length === 0) {
      // Add walls around the map
      const wallThickness = 50;
      const mapWidth = this.map ? this.map.widthInPixels : 2000;
      const mapHeight = this.map ? this.map.heightInPixels : 2000;

      // Top wall
      const topWall = this.add.rectangle(mapWidth / 2, -wallThickness / 2, mapWidth, wallThickness, 0xff0000, 0.3);
      this.physics.add.existing(topWall, true);
      this.collisionLayer.add(topWall);

      // Bottom wall
      const bottomWall = this.add.rectangle(mapWidth / 2, mapHeight + wallThickness / 2, mapWidth, wallThickness, 0xff0000, 0.3);
      this.physics.add.existing(bottomWall, true);
      this.collisionLayer.add(bottomWall);

      // Left wall
      const leftWall = this.add.rectangle(-wallThickness / 2, mapHeight / 2, wallThickness, mapHeight, 0xff0000, 0.3);
      this.physics.add.existing(leftWall, true);
      this.collisionLayer.add(leftWall);

      // Right wall
      const rightWall = this.add.rectangle(mapWidth + wallThickness / 2, mapHeight / 2, wallThickness, mapHeight, 0xff0000, 0.3);
      this.physics.add.existing(rightWall, true);
      this.collisionLayer.add(rightWall);

      // Add some internal obstacles
      this.addCollisionRect(500, 500, 100, 100);
      this.addCollisionRect(1000, 800, 150, 100);
      this.addCollisionRect(1500, 400, 100, 200);
    }

    // Collision between player and walls
    this.physics.add.collider(this.player, this.collisionLayer);
  }

  private addCollisionRect(x: number, y: number, width: number, height: number): void {
    const rect = this.add.rectangle(x, y, width, height, 0xff0000, 0.3);
    this.physics.add.existing(rect, true);
    this.collisionLayer.add(rect);
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

          const npc = this.physics.add.sprite(obj.x, obj.y, 'npc');
          npc.setOrigin(0, 1); // Bottom-left origin for Tiled compatibility
          npc.setScale(1);
          
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
    const defaultNPCs: Array<{ id: string; name: string; x: number; y: number }> = [
      { id: 'guide', name: 'Guide', x: 400, y: 400 },
      { id: 'engineer', name: 'Engineer', x: 1200, y: 800 },
      { id: 'writer', name: 'Writer', x: 1600, y: 1200 },
    ];

    defaultNPCs.forEach((npcData) => {
      const npc = this.physics.add.sprite(npcData.x, npcData.y, 'npc');
      npc.setOrigin(0.5, 1);
      npc.setScale(1);

      const nameLabel = this.add.text(npcData.x, npcData.y - 40, npcData.name, {
        fontSize: '14px',
        fontFamily: 'Courier New',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 4, y: 2 },
      });
      nameLabel.setOrigin(0.5, 1);

      this.npcs.set(npcData.id, npc);

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

          const isUnlocked = SaveSystem.isZoneUnlocked(doorData.requiredUnlock);
          const doorRect = this.add.rectangle(
            obj.x + (obj.width || 32) / 2,
            obj.y + (obj.height || 32) / 2,
            obj.width || 32,
            obj.height || 32,
            isUnlocked ? 0x00ff00 : 0xff6600,
            0.5
          );
          doorRect.setStrokeStyle(2, isUnlocked ? 0x00aa00 : 0xaa4400);

          const doorLabel = this.add.text(obj.x + (obj.width || 32) / 2, obj.y - 20, doorData.label, {
            fontSize: '12px',
            fontFamily: 'Courier New',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 4, y: 2 },
          });
          doorLabel.setOrigin(0.5, 1);

          this.doors.set(doorData.id, { sprite: doorRect, data: doorData });

          this.interactionSystem.addInteractable({
            id: doorData.id,
            x: obj.x,
            y: obj.y,
            width: obj.width || 32,
            height: obj.height || 32,
            type: 'door',
            data: doorData,
          });
        });
      }
    }

    // Add default doors if none found
    if (this.doors.size === 0) {
      this.addDefaultDoors();
    }
  }

  private addDefaultDoors(): void {
    const defaultDoors: Array<{ id: string; requiredUnlock: string; label: string; x: number; y: number; targetX: number; targetY: number }> = [
      { id: 'aboutDoor', requiredUnlock: 'about', label: 'About House', x: 600, y: 400, targetX: 800, targetY: 600 },
      { id: 'projectsDoor', requiredUnlock: 'projects', label: 'Projects Lab', x: 1400, y: 600, targetX: 1200, targetY: 900 },
      { id: 'blogDoor', requiredUnlock: 'blog', label: 'Blog Library', x: 1800, y: 1400, targetX: 1700, targetY: 1600 },
    ];

    defaultDoors.forEach((doorInfo) => {
      const isUnlocked = SaveSystem.isZoneUnlocked(doorInfo.requiredUnlock);
      const doorRect = this.add.rectangle(doorInfo.x, doorInfo.y, 64, 64, isUnlocked ? 0x00ff00 : 0xff6600, 0.5);
      doorRect.setStrokeStyle(2, isUnlocked ? 0x00aa00 : 0xaa4400);

      const doorLabel = this.add.text(doorInfo.x, doorInfo.y - 40, doorInfo.label, {
        fontSize: '12px',
        fontFamily: 'Courier New',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 4, y: 2 },
      });
      doorLabel.setOrigin(0.5, 1);

      const doorData: DoorData = {
        id: doorInfo.id,
        requiredUnlock: doorInfo.requiredUnlock,
        targetX: doorInfo.targetX,
        targetY: doorInfo.targetY,
        label: doorInfo.label,
      };

      this.doors.set(doorInfo.id, { sprite: doorRect, data: doorData });

      this.interactionSystem.addInteractable({
        id: doorInfo.id,
        x: doorInfo.x - 32,
        y: doorInfo.y - 32,
        width: 64,
        height: 64,
        type: 'door',
        data: doorData,
      });
    });
  }

  update(): void {
    // Handle dialog/overlay interactions first
    if (this.dialogUI.isDialogVisible()) {
      // Pause player movement when dialog is visible
      this.player.setVelocity(0, 0);
      
      // Advance dialog on any key press (except ESC which closes it)
      // Check E, Space, and also check if any key was just pressed
      if (Phaser.Input.Keyboard.JustDown(this.interactKey) || 
          Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        this.dialogUI.advance();
      } else {
        // Check for any other key being pressed (for "any key" functionality)
        const keys = this.input.keyboard!.addKeys('ENTER');
        const enterKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        if (Phaser.Input.Keyboard.JustDown(enterKey)) {
          this.dialogUI.advance();
        }
        // Also check arrow keys and WASD for dialog advancement
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up) ||
            Phaser.Input.Keyboard.JustDown(this.cursors.down) ||
            Phaser.Input.Keyboard.JustDown(this.cursors.left) ||
            Phaser.Input.Keyboard.JustDown(this.cursors.right) ||
            Phaser.Input.Keyboard.JustDown(this.wasdKeys.W) ||
            Phaser.Input.Keyboard.JustDown(this.wasdKeys.A) ||
            Phaser.Input.Keyboard.JustDown(this.wasdKeys.S) ||
            Phaser.Input.Keyboard.JustDown(this.wasdKeys.D)) {
          this.dialogUI.advance();
        }
      }
      return;
    }

    if (this.contentOverlay.isOverlayVisible()) {
      // Pause player movement when overlay is visible
      this.player.setVelocity(0, 0);
      // ESC to close is handled in setupInput
      return;
    }

    // Handle player movement
    const speed = 200;
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
        npcData.id === 'writer' ? 'blog' : ''
      );
      
      const dialog = getDialog(npcData.dialogId, hasUnlocked);
      this.dialogUI.showDialog(dialog);
    } else if (nearest.type === 'door') {
      const doorData = nearest.data as DoorData;
      const isUnlocked = SaveSystem.isZoneUnlocked(doorData.requiredUnlock);
      
      if (isUnlocked) {
        this.teleportPlayer(doorData.targetX, doorData.targetY, doorData.requiredUnlock);
      } else {
        // Show message
        this.dialogUI.showDialog({
          id: 'locked',
          lines: [
            { speaker: 'System', text: `The ${doorData.label} is locked. Talk to NPCs to unlock new areas!` },
          ],
        });
      }
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
      if (zone === 'about' || zone === 'projects' || zone === 'blog') {
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