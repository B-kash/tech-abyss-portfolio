import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Create a simple player sprite programmatically
    this.createPlayerSprite();
    this.createNPCSprite();
    this.createTileset();
  }

  private createPlayerSprite(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x00ff00); // Green
    graphics.fillRect(0, 0, 32, 32);
    graphics.fillStyle(0x006600); // Darker green for shading
    graphics.fillRect(8, 8, 16, 16);
    graphics.generateTexture('player', 32, 32);
    graphics.destroy();
  }

  private createNPCSprite(): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xff0000); // Red
    graphics.fillRect(0, 0, 32, 32);
    graphics.fillStyle(0x990000); // Darker red for shading
    graphics.fillRect(8, 8, 16, 16);
    graphics.generateTexture('npc', 32, 32);
    graphics.destroy();
  }

  private createTileset(): void {
    // Create a simple 16x16 tileset programmatically
    const tileSize = 16;
    const tilesPerRow = 4;
    const tilesPerCol = 4;
    
    const graphics = this.add.graphics();
    const totalWidth = tileSize * tilesPerRow;
    const totalHeight = tileSize * tilesPerCol;

    // Fill background
    graphics.fillStyle(0x87ceeb); // Sky blue for ground
    graphics.fillRect(0, 0, totalWidth, totalHeight);

    // Create different tile types
    for (let y = 0; y < tilesPerCol; y++) {
      for (let x = 0; x < tilesPerRow; x++) {
        const tx = x * tileSize;
        const ty = y * tileSize;
        
        if (y === 0) {
          // Top row: grass
          graphics.fillStyle(0x90ee90);
          graphics.fillRect(tx, ty, tileSize, tileSize);
          graphics.fillStyle(0x228b22);
          graphics.fillRect(tx + 2, ty + 2, tileSize - 4, tileSize - 4);
        } else if (y === 1) {
          // Second row: stone
          graphics.fillStyle(0x808080);
          graphics.fillRect(tx, ty, tileSize, tileSize);
          graphics.fillStyle(0x555555);
          graphics.fillRect(tx + 1, ty + 1, tileSize - 2, tileSize - 2);
        } else if (y === 2) {
          // Third row: water
          graphics.fillStyle(0x4682b4);
          graphics.fillRect(tx, ty, tileSize, tileSize);
          graphics.fillStyle(0x1e90ff);
          graphics.fillRect(tx + 1, ty + 1, tileSize - 2, 2);
        } else {
          // Bottom row: wall/brick
          graphics.fillStyle(0x8b4513);
          graphics.fillRect(tx, ty, tileSize, tileSize);
          graphics.lineStyle(1, 0x654321);
          graphics.strokeRect(tx + 2, ty + 2, tileSize - 4, tileSize - 4);
        }
      }
    }

    graphics.generateTexture('tileset', totalWidth, totalHeight);
    graphics.destroy();

    // Load the map JSON
    this.load.tilemapTiledJSON('worldMap', '/maps/world.json');
  }

  create(): void {
    // Start the world scene
    this.scene.start('WorldScene');
  }
}