export interface SaveData {
  version: number;
  unlockedZones: string[];
  playerPosition: { x: number; y: number };
}

const SAVE_KEY = 'techAbyssSave';
const CURRENT_VERSION = 1;

export class SaveSystem {
  static save(data: Partial<SaveData>): void {
    const existing = SaveSystem.load();
    const saveData: SaveData = {
      version: CURRENT_VERSION,
      unlockedZones: data.unlockedZones ?? existing?.unlockedZones ?? [],
      playerPosition: data.playerPosition ?? existing?.playerPosition ?? { x: 100, y: 100 },
    };
    
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    } catch (e) {
      console.error('Failed to save game:', e);
    }
  }

  static load(): SaveData | null {
    try {
      const data = localStorage.getItem(SAVE_KEY);
      if (!data) return null;
      
      const parsed: SaveData = JSON.parse(data);
      
      // Version migration could go here
      if (parsed.version !== CURRENT_VERSION) {
        console.warn('Save version mismatch, resetting save');
        return null;
      }
      
      return parsed;
    } catch (e) {
      console.error('Failed to load game:', e);
      return null;
    }
  }

  static clear(): void {
    localStorage.removeItem(SAVE_KEY);
  }

  static isZoneUnlocked(zone: string): boolean {
    const save = SaveSystem.load();
    return save?.unlockedZones.includes(zone) ?? false;
  }

  static unlockZone(zone: string): void {
    const save = SaveSystem.load() ?? {
      version: CURRENT_VERSION,
      unlockedZones: [],
      playerPosition: { x: 100, y: 100 },
    };
    
    if (!save.unlockedZones.includes(zone)) {
      save.unlockedZones.push(zone);
      SaveSystem.save({ unlockedZones: save.unlockedZones });
    }
  }
}