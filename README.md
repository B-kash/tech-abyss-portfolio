# Tech Abyss - Interactive Portfolio Game

A 2D open-world portfolio website built as a playable game using Phaser 3, TypeScript, and Vite.

## 🎮 Features

- **2D Open World**: Explore a large map with buildings and NPCs
- **Player Movement**: WASD or Arrow Keys for movement
- **NPC Interactions**: Talk to NPCs to unlock new areas
- **Zone System**: Unlock and access About, Projects, and Blog sections
- **Save System**: Progress persists in localStorage (unlocked zones + player position)
- **Collision Detection**: Walls and obstacles prevent walking through objects
- **Dialog System**: Interactive conversations with NPCs
- **Content Overlays**: View portfolio content in-game

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The game will open in your browser at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎯 Controls

- **WASD** or **Arrow Keys**: Move player
- **E** or **Space**: Interact with NPCs/doors
- **ESC**: Close dialog or content overlay

## 🗺️ Game World

The game world contains:

- **Town Center**: Starting area with a Guide NPC
- **About House**: Unlocked after talking to the Guide
- **Projects Lab**: Unlocked after talking to the Engineer
- **Blog Library**: Unlocked after talking to the Writer

### NPCs

- **Guide**: Explains controls and unlocks the About section
- **Engineer**: Unlocks the Projects Lab
- **Writer**: Unlocks the Blog Library

### Doors/Zones

- Doors show as orange rectangles when locked
- Doors show as green rectangles when unlocked
- Interacting with an unlocked door teleports you and shows the zone content

## 📁 Project Structure

```
tech-abyss_website/
├── public/
│   ├── content/          # Portfolio content files
│   │   ├── about.md      # About section markdown
│   │   ├── projects.json # Projects list
│   │   └── blog.json     # Blog posts index
│   └── maps/             # Tiled map files
│       ├── world.json    # Main game map (Tiled JSON export)
│       └── tileset.tsx   # Tileset definition
├── src/
│   ├── scenes/           # Phaser scenes
│   │   ├── BootScene.ts  # Asset loading and initialization
│   │   └── WorldScene.ts # Main gameplay scene
│   ├── systems/          # Game systems
│   │   ├── SaveSystem.ts      # LocalStorage save/load
│   │   └── InteractionSystem.ts # NPC/door interaction logic
│   ├── ui/               # UI components
│   │   ├── DialogUI.ts   # NPC dialog overlay
│   │   └── ContentOverlay.ts # About/Projects/Blog overlay
│   ├── data/             # Game data
│   │   └── dialogs.ts    # NPC dialog definitions
│   └── main.ts           # Game entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🗺️ Editing Maps with Tiled

### Installing Tiled

Download Tiled Map Editor from: https://www.mapeditor.org/

### Map Structure

The game expects the following layers in your Tiled map:

1. **Ground** (Tile Layer): Background tiles
2. **Collisions** (Object Layer): Rectangle objects for walls/obstacles
3. **npcs** (Object Layer): NPC spawn points with properties
4. **doors** (Object Layer): Door zones with properties

### Adding NPCs

1. Create an object in the "npcs" layer
2. Set object properties:
   - `id`: Unique identifier (e.g., "guide", "engineer", "writer")
   - `name`: Display name
   - `dialogId`: Dialog to use (usually same as id)

### Adding Doors

1. Create a rectangle object in the "doors" layer
2. Set object properties:
   - `id`: Unique identifier (e.g., "aboutDoor")
   - `requiredUnlock`: Zone name (e.g., "about", "projects", "blog")
   - `targetX`: X coordinate to teleport to
   - `targetY`: Y coordinate to teleport to
   - `label`: Display name for the door

### Exporting

1. Export as JSON (File → Export As → JSON map files (*.json))
2. Save to `public/maps/world.json`
3. Ensure tileset image is referenced correctly (or use programmatic generation)

## 🎨 Customization

### Adding Content

- **About**: Edit `public/content/about.md` (Markdown)
- **Projects**: Edit `public/content/projects.json` (JSON array)
- **Blog**: Edit `public/content/blog.json` (JSON with posts array)

### Adding NPCs and Dialogs

1. Add dialog data to `src/data/dialogs.ts`
2. Add NPC object in Tiled map or modify `addDefaultNPCs()` in `WorldScene.ts`
3. Dialog format:
   ```typescript
   {
     id: 'unique_id',
     lines: [
       { speaker: 'NPC Name', text: 'Dialog text here' }
     ],
     unlocksZone: 'zone_name' // optional
   }
   ```

### Custom Sprites

Replace the programmatic sprite generation in `BootScene.ts` with actual image loading:

```typescript
this.load.image('player', 'path/to/player.png');
this.load.image('npc', 'path/to/npc.png');
this.load.image('tileset', 'path/to/tileset.png');
```

## 💾 Save System

Saves are stored in localStorage with the following structure:

```typescript
{
  version: 1,
  unlockedZones: ['about', 'projects'],
  playerPosition: { x: 300, y: 400 }
}
```

To reset progress, clear localStorage or call `SaveSystem.clear()` in the browser console.

## 🐛 Troubleshooting

### Map not loading

- Check browser console for errors
- Verify `public/maps/world.json` exists
- Ensure map JSON is valid (can validate at jsonlint.com)
- Game will fall back to a default map if loading fails

### NPCs/Doors not appearing

- Verify object layers are named correctly ("npcs", "doors")
- Check object properties are set correctly
- Check browser console for parsing errors
- Game will add default NPCs/doors if none found in map

### Content not loading

- Verify files exist in `public/content/`
- Check browser network tab for 404 errors
- Ensure content files are valid JSON/Markdown
- Default content will be shown if files can't be loaded

## 📝 License

MIT License - feel free to use this as a template for your own portfolio!

## 🙏 Credits

- **Phaser 3**: Game framework
- **Tiled**: Map editor
- **Vite**: Build tool
- **TypeScript**: Type safety

---

Built with ❤️ using Phaser 3, TypeScript, and Vite