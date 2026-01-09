# Tech Abyss - Interactive Portfolio Game

A 2D open-world portfolio website built as a playable game using Phaser 3, TypeScript, and Vite. Explore a game world, interact with NPCs, unlock buildings, and discover portfolio content through an immersive gaming experience.

## 🎮 Features

- **2D Open World**: Explore a 1024×1024 pixel world with wrapping boundaries
- **Player Movement**: WASD or Arrow Keys for movement (276 px/s)
- **NPC Interactions**: Talk to NPCs to unlock new areas and learn about the developer
- **Zone System**: Unlock and access About, Projects, and Contact sections
- **Save System**: Progress persists in localStorage (unlocked zones + player position)
- **Collision Detection**: Player cannot walk through NPCs or buildings
- **Building System**: Distinct building sprites for each zone type with collision
- **Dialog System**: Interactive conversations with NPCs featuring typewriter effect
- **Content Overlays**: View portfolio content in HTML modals with typewriter animations
- **World Wrapping**: Seamless looping - exit one edge to appear on the opposite side

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

The game world is a 1024×1024 pixel (64×64 tile) map with wrapping boundaries. The world contains:

- **Starting Area**: Center of the world with Guide NPC nearby
- **About House**: Unlocked after talking to the Guide (Northwest area)
- **Projects Lab**: Unlocked after talking to the Engineer (Northeast area)
- **Contact Office**: Unlocked after talking to the Contact NPC (Southwest area)

### NPCs

- **Guide**: Located near starting position, explains controls and unlocks the About House
- **Engineer**: Located in the east area, unlocks the Projects Lab
- **Contact**: Located in the west area, unlocks the Contact Office

### Buildings/Doors

- Buildings are represented as distinct sprites (houses/labs/offices)
- Buildings have collision - player cannot walk through them
- Interacting with an unlocked building (E or Space) teleports you and shows the zone content
- Locked buildings appear darker (gray tint) with "(Locked)" label
- Unlocked buildings appear in full color

## 📁 Project Structure

```
tech-abyss_website/
├── public/
│   ├── content/          # Portfolio content files
│   │   ├── about.md      # About section markdown
│   │   ├── projects.json # Projects list (Tech Abyss, Video Subtitles, Music Master, etc.)
│   │   ├── blog.json     # Blog posts index
│   │   └── contact.json  # Contact information (email, GitHub, LinkedIn, social)
│   └── maps/             # Tiled map files
│       ├── world.json    # Main game map (64×64 tiles = 1024×1024 pixels)
│       └── tileset.tsx   # Tileset definition
├── src/
│   ├── scenes/           # Phaser scenes
│   │   ├── BootScene.ts  # Asset loading and initialization
│   │   └── WorldScene.ts # Main gameplay scene
│   ├── systems/          # Game systems
│   │   ├── SaveSystem.ts      # LocalStorage save/load
│   │   └── InteractionSystem.ts # NPC/door interaction logic
│   ├── ui/               # UI components
│   │   ├── DialogUI.ts   # NPC dialog overlay (Phaser-based, fixed to screen)
│   │   └── ContentOverlay.ts # About/Projects/Contact overlay (HTML/CSS modal)
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

- **About**: Edit `public/content/about.md` (Markdown format)
- **Projects**: Edit `public/content/projects.json` (JSON array with title, description, tech, link)
- **Blog**: Edit `public/content/blog.json` (JSON with posts array)
- **Contact**: Edit `public/content/contact.json` (JSON with email, GitHub, LinkedIn, social, message)

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

Sprites are currently generated programmatically in `BootScene.ts`:
- Player sprite (32×32, blue shirt, pixel-art style)
- NPC sprites (32×32, unique colors per NPC: Guide=orange, Engineer=cyan, Contact=green)
- Building sprites (64×80, distinct colors: About=tan, Projects=blue, Contact=light green)
- Tileset (128×128, 8×8 tiles, various terrain types)
- Background pattern (64×64, sky with clouds)

To use custom images instead, replace in `BootScene.ts`:
```typescript
this.load.image('player', 'path/to/player.png');
this.load.image('npc_guide', 'path/to/guide.png');
this.load.image('building_about', 'path/to/about-building.png');
this.load.image('tileset', 'path/to/tileset.png');
```

## 💾 Save System

Saves are stored in localStorage with the following structure:

```typescript
{
  version: 1,
  unlockedZones: ['about', 'projects', 'contact'],
  playerPosition: { x: 512, y: 512 }
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