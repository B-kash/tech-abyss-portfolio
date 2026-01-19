import { inject } from "@vercel/analytics";
import './styles/main.css';

inject();

function injectGoogleAnalytics() {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!gaId) return;

  if (!document.querySelector(`script[src*="gtag/js?id=${gaId}"]`)) {
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gtagScript);
  }

  const inlineScript = document.createElement('script');
  inlineScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', { anonymize_ip: true });
  `;
  document.head.appendChild(inlineScript);
}

injectGoogleAnalytics();

// Set current year in footer
const yearElement = document.getElementById('current-year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear().toString();
}

// Load and display projects
async function loadProjects() {
  try {
    const response = await fetch('/content/projects.json');
    const projects = await response.json();
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectsGrid) return;
    
    // Inject structured data for projects
    projects.forEach((project: any, index: number) => {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": project.title,
        "description": project.description,
        "applicationCategory": "WebApplication",
        "programmingLanguage": project.tech,
        "url": project.try_now || project.link || "https://tech-abyss.com#projects",
        "author": {
          "@type": "Person",
          "name": "Bikash Chapagain",
          "url": "https://tech-abyss.com"
        }
      };
      
      const scriptId = `project-schema-${index}`;
      const existingScript = document.getElementById(scriptId);
      if (existingScript) existingScript.remove();
      
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    });
    
    projectsGrid.innerHTML = projects.map((project: any) => {
      const techTags = project.tech.map((tech: string) => 
        `<span class="tech-tag">${tech}</span>`
      ).join('');
      
      const links = [
        project.link ? `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Code</a>` : '',
        project.try_now ? `<a href="${project.try_now}" target="_blank" rel="noopener noreferrer" class="project-link">Try Now</a>` : ''
      ].filter(Boolean).join('');
      
      return `
        <div class="project-card fade-in" itemscope itemtype="https://schema.org/SoftwareApplication">
          <h3 class="project-title" itemprop="name">${project.title}</h3>
          <p class="project-description" itemprop="description">${project.description}</p>
          <div class="project-tech">${techTags}</div>
          ${links ? `<div class="project-links">${links}</div>` : ''}
        </div>
      `;
    }).join('');
  } catch (error) {
    console.error('Error loading projects:', error);
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
      projectsGrid.innerHTML = '<p>Unable to load projects at this time.</p>';
    }
  }
}

// Load and display about content
async function loadAbout() {
  try {
    const response = await fetch('/content/about.md');
    const markdown = await response.text();
    const aboutContent = document.getElementById('about-content');
    
    if (!aboutContent) return;
    
    // Simple markdown to HTML conversion (basic)
    let html = markdown
      .replace(/^# (.+)$/gm, '<h2>$1</h2>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^\- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
      .replace(/^(.+)$/gm, (line) => {
        if (line.startsWith('<') || line.trim() === '') return line;
        return `<p>${line}</p>`;
      })
      .replace(/<p><\/p>/g, '')
      .replace(/<p>(<[h|u])/g, '$1')
      .replace(/(<\/[h|u]>)<\/p>/g, '$1');
    
    aboutContent.innerHTML = html;
  } catch (error) {
    console.error('Error loading about content:', error);
    const aboutContent = document.getElementById('about-content');
    if (aboutContent) {
      aboutContent.innerHTML = '<p>Unable to load about content at this time.</p>';
    }
  }
}

// Load and display contact content
async function loadContact() {
  try {
    const response = await fetch('/content/contact.json');
    const contact = await response.json();
    const contactContent = document.getElementById('contact-content');
    
    if (!contactContent) return;
    
    const links = [
      contact.email ? `<a href="mailto:${contact.email}" class="contact-link">Email</a>` : '',
      contact.github ? `<a href="${contact.github}" target="_blank" rel="noopener noreferrer" class="contact-link">GitHub</a>` : '',
      contact.linkedin ? `<a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-link">LinkedIn</a>` : ''
    ].filter(Boolean).join('');
    
    contactContent.innerHTML = `
      ${contact.message ? `<p>${contact.message}</p>` : ''}
      <div class="contact-links">
        ${links}
      </div>
    `;
  } catch (error) {
    console.error('Error loading contact content:', error);
    const contactContent = document.getElementById('contact-content');
    if (contactContent) {
      contactContent.innerHTML = '<p>Unable to load contact information at this time.</p>';
    }
  }
}

// Mobile navigation toggle
function setupMobileNav() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (!navToggle || !navLinks) return;
  
  // Initialize menu as hidden on mobile
  if (window.innerWidth <= 768) {
    navLinks.setAttribute('aria-hidden', 'true');
  }
  
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    const newExpanded = !isExpanded;
    navToggle.setAttribute('aria-expanded', String(newExpanded));
    navLinks.setAttribute('aria-hidden', String(!newExpanded));
  });
  
  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('aria-hidden', 'true');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (window.innerWidth <= 768 && !navLinks.contains(target) && !navToggle.contains(target)) {
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('aria-hidden', 'true');
    }
  });
}

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
  // Load all content
  loadProjects();
  loadAbout();
  loadContact();
  
  // Setup mobile navigation
  setupMobileNav();
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (href === '#' || !href) return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = (target as HTMLElement).offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.card, .process-step, .project-card').forEach(el => {
    observer.observe(el);
  });
});
