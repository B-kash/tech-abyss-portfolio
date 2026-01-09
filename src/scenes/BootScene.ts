import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Create game-style sprites programmatically
    this.createPlayerSprite();
    this.createNPCSprites();
    this.createTileset();
    this.createBackgroundPattern();
    this.createBuildingSprites();
  }

  private createPlayerSprite(): void {
    // Create a pixel-art style player character
    const size = 32;
    const graphics = this.add.graphics();
    
    // Body (blue shirt)
    graphics.fillStyle(0x4169e1);
    graphics.fillRect(8, 12, 16, 20);
    
    // Head
    graphics.fillStyle(0xffdbac); // Skin tone
    graphics.fillRect(10, 4, 12, 12);
    
    // Hair
    graphics.fillStyle(0x8b4513);
    graphics.fillRect(8, 4, 16, 6);
    
    // Eyes
    graphics.fillStyle(0x000000);
    graphics.fillRect(12, 8, 2, 2);
    graphics.fillRect(18, 8, 2, 2);
    
    // Legs (pants)
    graphics.fillStyle(0x2f4f4f);
    graphics.fillRect(10, 24, 6, 8);
    graphics.fillRect(16, 24, 6, 8);
    
    // Arms
    graphics.fillStyle(0x4169e1);
    graphics.fillRect(4, 14, 4, 12);
    graphics.fillRect(24, 14, 4, 12);
    
    // Shoes
    graphics.fillStyle(0x1a1a1a);
    graphics.fillRect(10, 30, 6, 2);
    graphics.fillRect(16, 30, 6, 2);
    
    graphics.generateTexture('player', size, size);
    graphics.destroy();
  }

  private createNPCSprites(): void {
    // Guide NPC (Yellow/Orange)
    this.createNPC('npc_guide', 0xffa500, 0xff8c00);
    
    // Engineer NPC (Blue/Cyan)
    this.createNPC('npc_engineer', 0x00ced1, 0x008b8b);
    
    // Contact NPC (Green/Teal)
    this.createNPC('npc_contact', 0x32cd32, 0x228b22);
    
    // Generic NPC sprite for fallback
    this.createNPC('npc', 0xff6347, 0xcd5c5c);
  }

  private createNPC(key: string, primaryColor: number, secondaryColor: number): void {
    const size = 32;
    const graphics = this.add.graphics();
    
    // Body (primary color)
    graphics.fillStyle(primaryColor);
    graphics.fillRect(8, 12, 16, 20);
    
    // Head
    graphics.fillStyle(0xffdbac); // Skin tone
    graphics.fillRect(10, 4, 12, 12);
    
    // Hair/Head covering (secondary color)
    graphics.fillStyle(secondaryColor);
    graphics.fillRect(8, 4, 16, 8);
    
    // Eyes
    graphics.fillStyle(0x000000);
    graphics.fillRect(12, 8, 2, 2);
    graphics.fillRect(18, 8, 2, 2);
    
    // Mouth (small smile)
    graphics.lineStyle(1, 0x000000);
    graphics.beginPath();
    graphics.arc(16, 12, 2, 0, Math.PI);
    graphics.strokePath();
    
    // Legs (dark pants)
    graphics.fillStyle(0x2f4f4f);
    graphics.fillRect(10, 24, 6, 8);
    graphics.fillRect(16, 24, 6, 8);
    
    // Arms (primary color)
    graphics.fillStyle(primaryColor);
    graphics.fillRect(4, 14, 4, 12);
    graphics.fillRect(24, 14, 4, 12);
    
    // Shoes
    graphics.fillStyle(0x1a1a1a);
    graphics.fillRect(10, 30, 6, 2);
    graphics.fillRect(16, 30, 6, 2);
    
    graphics.generateTexture(key, size, size);
    graphics.destroy();
  }

  private createTileset(): void {
    // Create a game-style 16x16 tileset
    const tileSize = 16;
    const tilesPerRow = 8; // More tiles for variety
    const tilesPerCol = 8;
    
    const graphics = this.add.graphics();
    const totalWidth = tileSize * tilesPerRow;
    const totalHeight = tileSize * tilesPerCol;

    // Fill with transparent background
    graphics.fillStyle(0x000000, 0);
    graphics.fillRect(0, 0, totalWidth, totalHeight);

    // Create different tile types
    for (let y = 0; y < tilesPerCol; y++) {
      for (let x = 0; x < tilesPerRow; x++) {
        const tx = x * tileSize;
        const ty = y * tileSize;
        
        if (y === 0 || (y === 1 && x < 4)) {
          // Grass tiles with texture
          graphics.fillStyle(0x7cb342); // Base green
          graphics.fillRect(tx, ty, tileSize, tileSize);
          // Add grass texture
          graphics.fillStyle(0x558b2f); // Darker green
          for (let i = 0; i < 3; i++) {
            graphics.fillRect(tx + 2 + i * 4, ty + 2, 2, 2);
            graphics.fillRect(tx + 4 + i * 3, ty + 6, 2, 2);
            graphics.fillRect(tx + 3 + i * 4, ty + 10, 2, 2);
          }
          // Add small flowers occasionally
          if ((x + y) % 3 === 0) {
            graphics.fillStyle(0xffeb3b); // Yellow flower
            graphics.fillCircle(tx + 8, ty + 8, 1);
          }
        } else if ((y === 1 && x >= 4) || (y === 2 && x < 4)) {
          // Dirt/Path tiles
          graphics.fillStyle(0x8d6e63); // Brown
          graphics.fillRect(tx, ty, tileSize, tileSize);
          graphics.fillStyle(0x6d4c41); // Darker brown
          graphics.fillRect(tx + 2, ty + 2, 4, 4);
          graphics.fillRect(tx + 10, ty + 6, 4, 4);
          graphics.fillRect(tx + 6, ty + 10, 4, 4);
        } else if ((y === 2 && x >= 4) || (y === 3 && x < 4)) {
          // Stone/Cobblestone tiles
          graphics.fillStyle(0x9e9e9e); // Gray
          graphics.fillRect(tx, ty, tileSize, tileSize);
          graphics.lineStyle(1, 0x757575);
          graphics.strokeRect(tx + 1, ty + 1, 6, 6);
          graphics.strokeRect(tx + 9, ty + 1, 6, 6);
          graphics.strokeRect(tx + 1, ty + 9, 6, 6);
          graphics.strokeRect(tx + 9, ty + 9, 6, 6);
        } else if ((y === 3 && x >= 4) || y === 4) {
          // Water tiles
          graphics.fillStyle(0x42a5f5); // Light blue
          graphics.fillRect(tx, ty, tileSize, tileSize);
          graphics.fillStyle(0x1e88e5); // Darker blue
          // Wave pattern
          graphics.fillRect(tx, ty + 6, tileSize, 2);
          graphics.fillRect(tx, ty + 12, tileSize, 2);
          // Highlights
          graphics.fillStyle(0x64b5f6);
          graphics.fillRect(tx + 4, ty + 2, 2, 2);
          graphics.fillRect(tx + 10, ty + 8, 2, 2);
        } else if (y === 5) {
          // Wall/Brick tiles
          graphics.fillStyle(0x8b4513); // Brown
          graphics.fillRect(tx, ty, tileSize, tileSize);
          graphics.lineStyle(1, 0x654321);
          graphics.strokeRect(tx, ty, tileSize, tileSize);
          graphics.strokeRect(tx + 8, ty, tileSize / 2, tileSize);
          graphics.strokeRect(tx, ty + 8, tileSize, tileSize / 2);
        } else if (y === 6) {
          // Wood planks
          graphics.fillStyle(0xd7a86e); // Tan
          graphics.fillRect(tx, ty, tileSize, tileSize);
          graphics.lineStyle(1, 0xb8860b);
          for (let i = 0; i < 4; i++) {
            graphics.moveTo(tx, ty + i * 4);
            graphics.lineTo(tx + tileSize, ty + i * 4);
          }
          graphics.strokePath();
        } else {
          // Sand/Desert tiles
          graphics.fillStyle(0xf0e68c); // Khaki
          graphics.fillRect(tx, ty, tileSize, tileSize);
          graphics.fillStyle(0xdaa520); // Goldenrod
          graphics.fillRect(tx + 2, ty + 2, 3, 3);
          graphics.fillRect(tx + 11, ty + 7, 2, 2);
          graphics.fillRect(tx + 5, ty + 11, 4, 2);
        }
      }
    }

    graphics.generateTexture('tileset', totalWidth, totalHeight);
    graphics.destroy();

    // Load the map JSON
    this.load.tilemapTiledJSON('worldMap', '/maps/world.json');
  }

  private createBackgroundPattern(): void {
    // Create a subtle background pattern that can be tiled
    const size = 64;
    const graphics = this.add.graphics();
    
    // Sky gradient effect
    graphics.fillStyle(0x87ceeb); // Sky blue
    graphics.fillRect(0, 0, size, size);
    graphics.fillStyle(0xadd8e6); // Lighter blue
    graphics.fillRect(0, 0, size, size / 2);
    
    // Add some cloud-like texture
    graphics.fillStyle(0xffffff, 0.3);
    graphics.fillCircle(size * 0.3, size * 0.2, size * 0.15);
    graphics.fillCircle(size * 0.7, size * 0.3, size * 0.1);
    
    graphics.generateTexture('sky_bg', size, size);
    graphics.destroy();
  }

  private createBuildingSprites(): void {
    // Create different building sprites for each room type
    this.createBuilding('building_about', 0xd4a574, 0x8b6f47); // Tan/Brown house
    this.createBuilding('building_projects', 0x5d8aa8, 0x3d5a7a); // Blue lab
    this.createBuilding('building_blog', 0x9370db, 0x6a4c93); // Purple library
    this.createBuilding('building_contact', 0x90ee90, 0x32cd32); // Green office
    // Generic building for fallback
    this.createBuilding('building', 0x888888, 0x555555); // Gray building
  }

  private createBuilding(key: string, wallColor: number, roofColor: number): void {
    // Create a simple building sprite (64x80 for a small house)
    const width = 64;
    const height = 80;
    const graphics = this.add.graphics();
    
    // Building base/walls
    graphics.fillStyle(wallColor);
    graphics.fillRect(0, 20, width, height - 20);
    
    // Roof (triangle)
    graphics.fillStyle(roofColor);
    graphics.beginPath();
    graphics.moveTo(0, 20);
    graphics.lineTo(width / 2, 0);
    graphics.lineTo(width, 20);
    graphics.closePath();
    graphics.fillPath();
    
    // Roof edge
    graphics.lineStyle(2, 0x654321);
    graphics.beginPath();
    graphics.moveTo(0, 20);
    graphics.lineTo(width / 2, 0);
    graphics.lineTo(width, 20);
    graphics.strokePath();
    
    // Window frames
    graphics.lineStyle(2, 0x4a4a4a);
    graphics.strokeRect(8, 35, 16, 16);
    graphics.strokeRect(width - 24, 35, 16, 16);
    
    // Window panes
    graphics.fillStyle(0x87ceeb, 0.7);
    graphics.fillRect(9, 36, 14, 14);
    graphics.fillRect(width - 23, 36, 14, 14);
    
    // Door frame (center, bottom)
    graphics.lineStyle(2, 0x4a4a4a);
    graphics.strokeRect(width / 2 - 10, height - 25, 20, 25);
    
    // Door
    graphics.fillStyle(0x654321);
    graphics.fillRect(width / 2 - 9, height - 24, 18, 23);
    
    // Door handle
    graphics.fillStyle(0xffd700);
    graphics.fillCircle(width / 2 + 6, height - 12, 2);
    
    // Building outline
    graphics.lineStyle(2, 0x4a4a4a);
    graphics.strokeRect(0, 20, width, height - 20);
    
    graphics.generateTexture(key, width, height);
    graphics.destroy();
  }

  create(): void {
    // Start the world scene
    this.scene.start('WorldScene');
  }
}