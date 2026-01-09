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
    // Use game scale dimensions (screen/viewport size) for fixed positioning
    const screenWidth = this.scene.scale.width;
    const screenHeight = this.scene.scale.height;
    const dialogHeight = 210;
    
    // Calculate dialog width - ensure it doesn't exceed screen width
    // Use min to ensure it fits on small screens, with padding
    const maxDialogWidth = Math.min(screenWidth * 0.9, 900);
    const dialogWidth = Math.max(400, Math.min(maxDialogWidth, screenWidth - 40)); // Min 400px, max with 20px padding on each side
    
    // Center the dialog horizontally and position near bottom
    const centerX = screenWidth / 2;
    const dialogY = screenHeight - dialogHeight / 2 - 20; // 20px from bottom

    this.container = this.scene.add.container(centerX, dialogY);
    this.container.setVisible(false);
    this.container.setDepth(10000); // Very high depth to ensure it's on top
    // Make container fixed to camera (not scrolling with world)
    this.container.setScrollFactor(0, 0);

    // Background - positioned relative to container
    this.background = this.scene.add.rectangle(0, 0, dialogWidth, dialogHeight, 0x000000, 0.8);
    this.background.setStrokeStyle(2, 0xffffff);
    this.background.setScrollFactor(0, 0); // Fixed to camera
    this.background.setOrigin(0.5, 0.5);

    // Name label (above the dialog box)
    this.nameText = this.scene.add.text(0, -dialogHeight / 2 - 30, '', {
      fontSize: '24px',
      fontFamily: 'Courier New',
      color: '#ffff00',
      align: 'center',
    });
    this.nameText.setOrigin(0.5);
    this.nameText.setScrollFactor(0, 0); // Fixed to camera

    // Dialog text area - positioned to leave room for hint at bottom
    const dialogStartY = -dialogHeight / 2 + 25;
    // Calculate max lines based on available space (leave more room for hint)
    const availableHeight = dialogHeight - 80; // Increased from 70 to 80 for better spacing
    const maxLines = Math.floor(availableHeight / 20);
    
    // Calculate text width with padding
    const textWidth = dialogWidth * 0.85;
    
    this.dialogText = this.scene.add.text(0, dialogStartY, '', {
      fontSize: '16px',
      fontFamily: 'Courier New',
      color: '#ffffff',
      wordWrap: { width: textWidth },
      align: 'left',
      lineSpacing: 4,
      maxLines: maxLines,
    });
    this.dialogText.setOrigin(0.5, 0);
    this.dialogText.setScrollFactor(0, 0); // Fixed to camera
    this.dialogText.setWordWrapWidth(textWidth);

    // Hint text - positioned at bottom of dialog box, ensure it's visible
    const hintY = dialogHeight / 2 - 25; // Position with more spacing from bottom
    this.hintText = this.scene.add.text(0, hintY, 'Press any key to continue...', {
      fontSize: '14px',
      fontFamily: 'Courier New',
      color: '#00ffff',
      align: 'center',
      fontStyle: 'italic',
      backgroundColor: '#000000',
      padding: { x: 10, y: 6 },
      wordWrap: { width: dialogWidth - 40 }, // Ensure hint text wraps if needed
    });
    this.hintText.setOrigin(0.5);
    this.hintText.setScrollFactor(0, 0); // Fixed to camera
    this.hintText.setDepth(10001); // Ensure hint is on top

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

    // If typewriter is still running, skip it and show full text immediately
    if (this.typewriterTimer) {
      const currentLine = this.currentDialog.lines[this.currentLineIndex];
      this.dialogText.setText(currentLine.text);
      this.typewriterTimer.destroy();
      this.typewriterTimer = undefined;
      return; // Don't advance to next line yet - wait for next key press
    }

    // Typewriter finished, advance to next line
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