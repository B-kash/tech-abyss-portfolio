import Phaser from 'phaser';

export type ContentType = 'about' | 'projects' | 'blog';

export class ContentOverlay {
  private scene: Phaser.Scene;
  private container!: Phaser.GameObjects.Container;
  private background!: Phaser.GameObjects.Rectangle;
  private titleText!: Phaser.GameObjects.Text;
  private contentText!: Phaser.GameObjects.Text;
  private closeHintText!: Phaser.GameObjects.Text;
  private isVisible = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createUI();
  }

  private createUI(): void {
    const width = this.scene.scale.width;
    const height = this.scene.scale.height;

    this.container = this.scene.add.container(0, 0);
    this.container.setVisible(false);
    this.container.setDepth(2000);

    // Background overlay
    this.background = this.scene.add.rectangle(
      width / 2,
      height / 2,
      width * 0.85,
      height * 0.85,
      0x1a1a2e,
      0.95
    );
    this.background.setStrokeStyle(3, 0x16213e);

    // Title - positioned at top with padding
    const titleY = height * 0.12;
    this.titleText = this.scene.add.text(width / 2, titleY, '', {
      fontSize: '32px',
      fontFamily: 'Courier New',
      color: '#00ffff',
      align: 'center',
    });
    this.titleText.setOrigin(0.5);

    // Close hint - positioned at bottom with proper padding
    const hintY = height * 0.92;
    this.closeHintText = this.scene.add.text(width / 2, hintY, 'Press ESC to close', {
      fontSize: '16px',
      fontFamily: 'Courier New',
      color: '#00ffff',
      align: 'center',
      backgroundColor: '#000000',
      padding: { x: 10, y: 5 },
    });
    this.closeHintText.setOrigin(0.5);

    // Content area - positioned between title and hint with proper bounds
    const contentStartY = titleY + 50; // Start below title
    const contentEndY = hintY - 30; // End above hint
    const contentHeight = contentEndY - contentStartY;
    
    this.contentText = this.scene.add.text(width / 2, contentStartY, '', {
      fontSize: '16px',
      fontFamily: 'Courier New',
      color: '#ffffff',
      wordWrap: { width: width * 0.75 },
      align: 'left',
      lineSpacing: 6,
      maxLines: Math.floor(contentHeight / 22), // 16px font + 6px spacing ≈ 22px per line
    });
    this.contentText.setOrigin(0.5, 0);
    // Set word wrap width
    this.contentText.setWordWrapWidth(width * 0.75);

    this.container.add([this.background, this.titleText, this.contentText, this.closeHintText]);
  }

  async show(type: ContentType): Promise<void> {
    if (this.isVisible) return;

    this.isVisible = true;
    this.container.setVisible(true);

    const content = await this.loadContent(type);
    this.titleText.setText(this.getTitle(type));
    this.contentText.setText(content);
  }

  private async loadContent(type: ContentType): Promise<string> {
    try {
      switch (type) {
        case 'about':
          const aboutRes = await fetch('/content/about.md');
          if (aboutRes.ok) {
            return await aboutRes.text();
          }
          return this.getDefaultAbout();

        case 'projects':
          const projectsRes = await fetch('/content/projects.json');
          if (projectsRes.ok) {
            const projects = await projectsRes.json();
            return this.formatProjects(projects);
          }
          return this.getDefaultProjects();

        case 'blog':
          const blogRes = await fetch('/content/blog.json');
          if (blogRes.ok) {
            const blog = await blogRes.json();
            return this.formatBlog(blog);
          }
          return this.getDefaultBlog();

        default:
          return 'Content not found.';
      }
    } catch (e) {
      console.error('Failed to load content:', e);
      return `Failed to load ${type} content. Please check the content files.`;
    }
  }

  private getTitle(type: ContentType): string {
    const titles = {
      about: 'About Me',
      projects: 'Projects',
      blog: 'Blog',
    };
    return titles[type];
  }

  private formatProjects(projects: any): string {
    if (!Array.isArray(projects)) return 'Invalid projects format.';
    
    return projects.map((project: any, index: number) => {
      return `\n${index + 1}. ${project.title || 'Untitled Project'}\n` +
             `   ${project.description || 'No description'}\n` +
             (project.tech ? `   Tech: ${project.tech.join(', ')}\n` : '') +
             (project.link ? `   Link: ${project.link}\n` : '');
    }).join('\n');
  }

  private formatBlog(blog: any): string {
    if (!blog.posts || !Array.isArray(blog.posts)) {
      return 'Invalid blog format.';
    }

    return blog.posts.map((post: any, index: number) => {
      return `\n${index + 1}. ${post.title || 'Untitled Post'}\n` +
             (post.date ? `   Date: ${post.date}\n` : '') +
             `   ${post.excerpt || 'No excerpt'}\n` +
             (post.link ? `   Link: ${post.link}\n` : '');
    }).join('\n');
  }

  private getDefaultAbout(): string {
    return `Welcome to my portfolio!

I'm a developer passionate about creating interactive experiences and building great software.

This portfolio is built as a 2D open-world game using Phaser 3, TypeScript, and Vite.

Explore the world, talk to NPCs, and discover more about my work!`;
  }

  private getDefaultProjects(): string {
    return `1. Portfolio Game
   This interactive portfolio website built with Phaser 3
   Tech: TypeScript, Phaser 3, Vite
   
2. Example Project
   A sample project description
   Tech: React, Node.js`;
  }

  private getDefaultBlog(): string {
    return `1. Getting Started with Phaser 3
   Date: 2024-01-01
   An introduction to building games with Phaser 3...
   
2. Building Interactive Portfolios
   Date: 2024-01-15
   How to create engaging portfolio experiences...`;
  }

  hide(): void {
    this.isVisible = false;
    this.container.setVisible(false);
  }

  isOverlayVisible(): boolean {
    return this.isVisible;
  }
}