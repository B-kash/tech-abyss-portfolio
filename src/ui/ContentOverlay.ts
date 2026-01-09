export type ContentType = 'about' | 'projects' | 'blog';

export class ContentOverlay {
  private modal: HTMLElement;
  private modalTitle: HTMLElement;
  private modalBody: HTMLElement;
  private modalClose: HTMLElement;
  private isVisible = false;
  private escapeHandler?: (event: KeyboardEvent) => void;

  constructor() {
    // Get DOM elements
    this.modal = document.getElementById('content-modal')!;
    this.modalTitle = document.getElementById('modal-title')!;
    this.modalBody = document.getElementById('modal-body')!;
    this.modalClose = document.getElementById('modal-close')!;

    // Setup close button handler
    this.modalClose.addEventListener('click', () => {
      this.hide();
    });

    // Close on backdrop click
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });
  }

  async show(type: ContentType): Promise<void> {
    if (this.isVisible) return;

    this.isVisible = true;
    this.modalTitle.textContent = this.getTitle(type);
    this.modalBody.innerHTML = 'Loading...';
    
    // Show modal
    this.modal.classList.add('show');

    // Load and display content
    const content = await this.loadContent(type);
    this.modalBody.innerHTML = this.formatContent(type, content);

    // Setup ESC key handler
    this.escapeHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    };
    document.addEventListener('keydown', this.escapeHandler);
  }

  hide(): void {
    if (!this.isVisible) return;

    this.isVisible = false;
    this.modal.classList.remove('show');

    // Remove ESC handler
    if (this.escapeHandler) {
      document.removeEventListener('keydown', this.escapeHandler);
      this.escapeHandler = undefined;
    }
  }

  isOverlayVisible(): boolean {
    return this.isVisible;
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
            return JSON.stringify(projects, null, 2);
          }
          return this.getDefaultProjects();

        case 'blog':
          const blogRes = await fetch('/content/blog.json');
          if (blogRes.ok) {
            const blog = await blogRes.json();
            return JSON.stringify(blog, null, 2);
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

  private formatContent(type: ContentType, content: string): string {
    if (type === 'about') {
      // Convert markdown-like text to HTML
      return this.markdownToHtml(content);
    } else if (type === 'projects') {
      // Parse and format JSON projects
      try {
        const projects = JSON.parse(content);
        return this.formatProjects(projects);
      } catch (e) {
        return '<pre>' + this.escapeHtml(content) + '</pre>';
      }
    } else if (type === 'blog') {
      // Parse and format JSON blog
      try {
        const blog = JSON.parse(content);
        return this.formatBlog(blog);
      } catch (e) {
        return '<pre>' + this.escapeHtml(content) + '</pre>';
      }
    }
    return '<pre>' + this.escapeHtml(content) + '</pre>';
  }

  private markdownToHtml(markdown: string): string {
    let html = markdown;

    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');

    // Convert code blocks
    html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>');

    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');

    // Convert line breaks to paragraphs
    const paragraphs = html.split(/\n\n+/);
    html = paragraphs
      .map((p) => {
        p = p.trim();
        if (!p) return '';
        // Don't wrap headers, lists, or code blocks in <p>
        if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<pre') || p.startsWith('<li')) {
          return p;
        }
        return '<p>' + p + '</p>';
      })
      .join('');

    // Convert bullet lists
    html = html.replace(/^[\*\-] (.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Convert numbered lists
    html = html.replace(/^\d+\. (.+)$/gim, '<li>$1</li>');
    
    // Convert line breaks
    html = html.replace(/\n/gim, '<br>');

    return html;
  }

  private formatProjects(projects: any): string {
    if (!Array.isArray(projects)) return '<p>Invalid projects format.</p>';

    let html = '<div>';
    projects.forEach((project: any, index: number) => {
      html += `<div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #16213e;">`;
      html += `<h3>${index + 1}. ${this.escapeHtml(project.title || 'Untitled Project')}</h3>`;
      html += `<p>${this.escapeHtml(project.description || 'No description')}</p>`;
      if (project.tech && Array.isArray(project.tech)) {
        html += `<p><strong>Tech:</strong> ${this.escapeHtml(project.tech.join(', '))}</p>`;
      }
      if (project.link) {
        html += `<p><strong>Link:</strong> <a href="${this.escapeHtml(project.link)}" target="_blank">${this.escapeHtml(project.link)}</a></p>`;
      }
      html += `</div>`;
    });
    html += '</div>';
    return html;
  }

  private formatBlog(blog: any): string {
    if (!blog.posts || !Array.isArray(blog.posts)) {
      return '<p>Invalid blog format.</p>';
    }

    let html = '<div>';
    blog.posts.forEach((post: any, index: number) => {
      html += `<div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #16213e;">`;
      html += `<h3>${index + 1}. ${this.escapeHtml(post.title || 'Untitled Post')}</h3>`;
      if (post.date) {
        html += `<p><em>Date: ${this.escapeHtml(post.date)}</em></p>`;
      }
      html += `<p>${this.escapeHtml(post.excerpt || 'No excerpt')}</p>`;
      if (post.link) {
        html += `<p><strong>Link:</strong> <a href="${this.escapeHtml(post.link)}" target="_blank">${this.escapeHtml(post.link)}</a></p>`;
      }
      html += `</div>`;
    });
    html += '</div>';
    return html;
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private getTitle(type: ContentType): string {
    const titles = {
      about: 'About Me',
      projects: 'Projects',
      blog: 'Blog',
    };
    return titles[type];
  }

  private getDefaultAbout(): string {
    return `Welcome to my portfolio!

I'm a developer passionate about creating interactive experiences and building great software.

This portfolio is built as a 2D open-world game using Phaser 3, TypeScript, and Vite.

Explore the world, talk to NPCs, and discover more about my work!`;
  }

  private getDefaultProjects(): string {
    return JSON.stringify([
      {
        title: 'Portfolio Game',
        description: 'This interactive portfolio website built with Phaser 3',
        tech: ['TypeScript', 'Phaser 3', 'Vite'],
      },
      {
        title: 'Example Project',
        description: 'A sample project description',
        tech: ['React', 'Node.js'],
      },
    ], null, 2);
  }

  private getDefaultBlog(): string {
    return JSON.stringify({
      posts: [
        {
          title: 'Getting Started with Phaser 3',
          date: '2024-01-01',
          excerpt: 'An introduction to building games with Phaser 3...',
        },
        {
          title: 'Building Interactive Portfolios',
          date: '2024-01-15',
          excerpt: 'How to create engaging portfolio experiences...',
        },
      ],
    }, null, 2);
  }
}