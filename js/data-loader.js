/**
 * Data Loader - Dynamically loads content from JSON files
 * This allows both the static and Next.js sites to share the same content
 */

class DataLoader {
  constructor() {
    this.cache = {};
    this.content = null;
  }

  /**
   * Load JSON data from a file
   * Note: Data is stored in the Next.js project's shared-data folder
   */
  async loadJSON(filename) {
    // Skip cache in development to always get fresh data
    const useCache = false; // Set to true for production

    if (useCache && this.cache[filename]) {
      return this.cache[filename];
    }

    try {
      // Fetch from the shared-data folder in the Next.js project
      // Add cache-busting for development
      const timestamp = useCache ? '' : `?t=${Date.now()}`;
      const response = await fetch(`../CrazeeIvan's PZ Emporium/shared-data/${filename}${timestamp}`, {
        cache: 'no-store' // Disable browser cache
      });
      if (!response.ok) {
        throw new Error(`Failed to load ${filename}`);
      }
      const data = await response.json();

      if (useCache) {
        this.cache[filename] = data;
      }
      return data;
    } catch (error) {
      console.error(`Error loading ${filename}:`, error);
      return filename === 'content.json' ? {} : [];
    }
  }

  /**
   * Load site content
   */
  async loadContent() {
    if (!this.content) {
      this.content = await this.loadJSON('content.json');
    }
    if (typeof window !== 'undefined') {
      window.siteContent = this.content;
    }
    return this.content;
  }

  /**
   * Load mods data
   */
  async loadMods() {
    return await this.loadJSON('mods.json');
  }

  /**
   * Load tools data
   */
  async loadTools() {
    return await this.loadJSON('tools.json');
  }

  /**
   * Load tips data
   */
  async loadTips() {
    return await this.loadJSON('tips.json');
  }

  /**
   * Apply content to elements with data-content attributes
   */
  async applyContent() {
    const content = await this.loadContent();

    // Apply all elements with data-content attribute
    document.querySelectorAll('[data-content]').forEach(element => {
      const path = element.getAttribute('data-content');
      const attr = element.getAttribute('data-content-attr');
      const value = this.getNestedValue(content, path);

      if (value === undefined || value === null) {
        return;
      }

      if (attr) {
        if (attr === 'text') {
          element.textContent = value;
        } else if (attr === 'html') {
          element.innerHTML = value;
        } else {
          element.setAttribute(attr, value);
        }
      } else {
        element.textContent = value;
      }
    });
  }

  /**
   * Get nested value from object using dot notation
   * Example: "site.name" returns content.site.name
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
}

// Create global instance
const dataLoader = new DataLoader();
if (typeof window !== 'undefined') {
  window.dataLoader = dataLoader;
}

/**
 * Render mods on the mods page
 */
async function renderMods() {
  const container = document.getElementById('mods-container');
  if (!container) return;

  const mods = await dataLoader.loadMods();

  container.innerHTML = mods.map(mod => `
    <article class="card">
      <h2 class="card-title">${mod.name}</h2>
      <p class="card-description">${mod.description}</p>
      <div class="card-footer">
        <span class="card-meta">Downloads: ${mod.downloads}</span>
        <span class="card-meta">Rating: ${mod.rating}/5</span>
      </div>
    </article>
  `).join('');
}

/**
 * Render tools on the tools page
 */
async function renderTools() {
  const container = document.getElementById('tools-container');
  if (!container) return;

  const tools = await dataLoader.loadTools();

  container.innerHTML = tools.map(tool => `
    <article class="card">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
        <h2 class="card-title" style="margin: 0;">${tool.name}</h2>
        <span class="badge">${tool.type}</span>
      </div>
      <p class="card-description">${tool.description}</p>
    </article>
  `).join('');
}

/**
 * Render tips on the shop page
 */
async function renderTips() {
  const container = document.getElementById('tips-container');
  if (!container) return;

  const content = await dataLoader.loadContent();
  const tips = await dataLoader.loadTips();
  const cart = content.cart || {};
  const pricePrefix = cart.pricePrefix || '$';
  const addButtonText = cart.addButton || 'Add to Cart';

  container.innerHTML = tips
    .map((tip) => {
      const safeName = JSON.stringify(tip.name);
      const safeDescription = JSON.stringify(tip.description);
      return `
    <article class="card">
      <h3 class="card-title">${tip.name}</h3>
      <p class="card-description">${tip.description}</p>
      <div class="card-footer">
        <span class="price">${pricePrefix}${tip.price}</span>
        <button
          class="btn btn-primary"
          onclick="addToCart(${safeName}, ${tip.price}, ${safeDescription})"
        >
          ${addButtonText}
        </button>
      </div>
    </article>
  `;
    })
    .join('');
}

/**
 * Initialize data loading on page load
 */
document.addEventListener('DOMContentLoaded', async function() {
  // Apply static content first
  await dataLoader.applyContent();

  // Render dynamic content based on which page we're on
  await renderMods();
  await renderTools();
  await renderTips();
});






