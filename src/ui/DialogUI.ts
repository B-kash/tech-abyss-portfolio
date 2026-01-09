import Phaser from 'phaser';
import { Dialog, DialogLine } from '../data/dialogs';
import { SaveSystem } from '../systems/SaveSystem';

export class DialogUI {
  private scene: Phaser.Scene;
  private container!: Phaser.GameObjects.Container;
  private background!: Phaser.GameObjects.Rectangle;
  private nameText!: Phaser.GameObjects.Text;
  private dialogText!: Phaser.GameObjects.Text;
  private hintText!: Phaser.GameObjects.Text;
  private currentDialog: Dialog | null = null;
  private currentLineIndex = 0;
  private typewriterTimer?: Phaser.Time.TimerEvent;
  private onCompleteCallback?: () => void;
  private isVisible = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createUI();
  }

  private createUI(): void {
    const width = this.scene.scale.width;
    const height = 280;
    const y = this.scene.scale.height - height / 2;

    this.container = this.scene.add.container(0, 0);
    this.container.setVisible(false);
    this.container.setDepth(1000);

    // Background
    this.background = this.scene.add.rectangle(
      width / 2,
      y,
      width * 0.9,
      height,
      0x000000,
      0.8
    );
    this.background.setStrokeStyle(2, 0xffffff);

    // Name label (above the dialog box)
    this.nameText = this.scene.add.text(width / 2, y - height / 2 - 30, '', {
      fontSize: '24px',
      fontFamily: 'Courier New',
      color: '#ffff00',
      align: 'center',
    });
    this.nameText.setOrigin(0.5);

    // Dialog text area - positioned to leave room for hint at bottom
    // Start position: slightly below the top of the box
    const dialogStartY = y - height / 2 + 25;
    // Calculate max lines based on available space
    // Font size 16px + line spacing 4px = ~20px per line
    // Available height: height - 70px (for hint, padding, and name label space)
    const availableHeight = height - 70;
    const maxLines = Math.floor(availableHeight / 20);
    
    this.dialogText = this.scene.add.text(width / 2, dialogStartY, '', {
      fontSize: '16px',
      fontFamily: 'Courier New',
      color: '#ffffff',
      wordWrap: { width: width * 0.85 },
      align: 'left',
      lineSpacing: 4,
      maxLines: maxLines, // Dynamically calculate max lines
    });
    this.dialogText.setOrigin(0.5, 0);
    // Ensure word wrapping is enabled
    this.dialogText.setWordWrapWidth(width * 0.85);

    // Hint text - positioned at bottom of dialog box with padding
    this.hintText = this.scene.add.text(width / 2, y + height / 2 - 20, 'Press E, Space, or any key to continue | ESC to close', {
      fontSize: '14px',
      fontFamily: 'Courier New',
      color: '#aaaaaa',
      align: 'center',
      fontStyle: 'italic',
      backgroundColor: '#000000',
      padding: { x: 8, y: 4 },
    });
    this.hintText.setOrigin(0.5);

    this.container.add([this.background, this.nameText, this.dialogText, this.hintText]);
  }

  showDialog(dialog: Dialog, onComplete?: () => void): void {
    if (this.isVisible) return;

    if (!dialog || !dialog.lines || dialog.lines.length === 0) {
      console.warn('Dialog has no lines:', dialog);
      return;
    }

    this.currentDialog = dialog;
    this.currentLineIndex = 0;
    this.onCompleteCallback = onComplete;
    this.isVisible = true;
    this.container.setVisible(true);
    
    // Ensure all elements are visible
    this.background.setVisible(true);
    this.nameText.setVisible(true);
    this.dialogText.setVisible(true);
    this.hintText.setVisible(true);
    
    this.displayLine(dialog.lines[0]);

    // Unlock zone if needed
    if (dialog.unlocksZone) {
      SaveSystem.unlockZone(dialog.unlocksZone);
    }
  }

  private displayLine(line: DialogLine): void {
    if (!this.currentDialog) return;

    const speakerName = line.speaker ?? 'Unknown';
    this.nameText.setText(speakerName);
    this.dialogText.setText('');

    const fullText = line.text;
    
    // Immediately show first character to ensure text appears
    if (fullText.length > 0) {
      this.dialogText.setText(fullText.substring(0, 1));
    }
    
    let charIndex = 1;
    const typewriterSpeed = 30; // ms per character

    if (this.typewriterTimer) {
      this.typewriterTimer.destroy();
    }

    // Start typewriter effect from character 1 (since we already showed the first one)
    const remainingChars = fullText.length - 1;
    if (remainingChars > 0) {
      this.typewriterTimer = this.scene.time.addEvent({
        delay: typewriterSpeed,
        callback: () => {
          if (charIndex < fullText.length) {
            this.dialogText.setText(fullText.substring(0, charIndex + 1));
            charIndex++;
          } else {
            if (this.typewriterTimer) {
              this.typewriterTimer.destroy();
              this.typewriterTimer = undefined;
            }
          }
        },
        repeat: remainingChars - 1,
      });
    }
  }

  advance(): void {
    if (!this.currentDialog || !this.isVisible) return;

    // If typewriter is still running, skip it
    if (this.typewriterTimer) {
      const currentLine = this.currentDialog.lines[this.currentLineIndex];
      this.dialogText.setText(currentLine.text);
      this.typewriterTimer.destroy();
      this.typewriterTimer = undefined;
      return;
    }

    this.currentLineIndex++;
    if (this.currentLineIndex >= this.currentDialog.lines.length) {
      this.hide();
      if (this.onCompleteCallback) {
        this.onCompleteCallback();
      }
    } else {
      this.displayLine(this.currentDialog.lines[this.currentLineIndex]);
    }
  }

  hide(): void {
    this.isVisible = false;
    this.container.setVisible(false);
    this.currentDialog = null;
    this.currentLineIndex = 0;

    if (this.typewriterTimer) {
      this.typewriterTimer.destroy();
      this.typewriterTimer = undefined;
    }
  }

  isDialogVisible(): boolean {
    return this.isVisible;
  }
}