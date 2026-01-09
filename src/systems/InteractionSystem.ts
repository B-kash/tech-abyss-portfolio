import Phaser from 'phaser';

export interface Interactable {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  type: 'npc' | 'door';
  data?: Record<string, any>;
}

export class InteractionSystem {
  private interactables: Interactable[] = [];
  private interactionRange = 50;

  addInteractable(interactable: Interactable): void {
    this.interactables.push(interactable);
  }

  clear(): void {
    this.interactables = [];
  }

  findNearest(playerX: number, playerY: number): Interactable | null {
    let nearest: Interactable | null = null;
    let nearestDistance = this.interactionRange;

    for (const interactable of this.interactables) {
      const centerX = interactable.x + (interactable.width ?? 0) / 2;
      const centerY = interactable.y + (interactable.height ?? 0) / 2;
      const distance = Phaser.Math.Distance.Between(playerX, playerY, centerX, centerY);

      if (distance < nearestDistance) {
        // Prioritize NPCs over doors
        if (!nearest) {
          nearest = interactable;
          nearestDistance = distance;
        } else if (interactable.type === 'npc' && nearest.type === 'door') {
          // NPCs take priority over doors
          nearest = interactable;
          nearestDistance = distance;
        } else if (interactable.type === nearest.type) {
          // Same type, take the closer one
          nearest = interactable;
          nearestDistance = distance;
        } else if (interactable.type === 'door' && nearest.type === 'door') {
          // Both doors, take the closer one
          nearest = interactable;
          nearestDistance = distance;
        }
      }
    }

    return nearest;
  }
}