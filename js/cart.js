/**
 * Shopping Cart Implementation using HTML5 LocalStorage
 * This demonstrates the use of HTML5 LocalStorage API for persistent data
 */

class ShoppingCart {
  constructor() {
    this.storageKey = 'pz-emporium-cart';
    this.cart = this.loadCart();
    this.updateCartDisplay();
  }

  /**
   * Load cart from LocalStorage (HTML5 Feature)
   */
  loadCart() {
    try {
      const cartData = localStorage.getItem(this.storageKey);
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  }

  /**
   * Save cart to LocalStorage (HTML5 Feature)
   */
  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  /**
   * Add item to cart
   */
  addItem(item) {
    this.cart.push({
      id: item.id || `item-${Date.now()}`,
      name: item.name,
      price: parseFloat(item.price),
      description: item.description || '',
      type: item.type || 'product'
    });

    this.saveCart();
    this.updateCartDisplay();
    this.showNotification(`${item.name} added to cart!`);
  }

  /**
   * Remove item from cart by index
   */
  removeItem(index) {
    if (index >= 0 && index < this.cart.length) {
      const removedItem = this.cart.splice(index, 1)[0];
      this.saveCart();
      this.updateCartDisplay();
      this.showNotification(`${removedItem.name} removed from cart`);
    }
  }

  /**
   * Clear entire cart
   */
  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartDisplay();
    this.showNotification('Cart cleared');
  }

  /**
   * Get total number of items
   */
  getItemCount() {
    return this.cart.length;
  }

  /**
   * Get total price
   */
  getTotal() {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  /**
   * Update cart badge display
   */
  updateCartDisplay() {
    const badge = document.getElementById('cart-badge');
    const count = this.getItemCount();

    if (badge) {
      if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  }

  /**
   * Render cart modal content
   */
  renderCartModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const emptyCart = document.getElementById('empty-cart');

    if (!cartItemsContainer) return;

    // Clear current content
    cartItemsContainer.innerHTML = '';

    if (this.cart.length === 0) {
      if (emptyCart) emptyCart.classList.remove('hidden');
      if (cartTotal) cartTotal.classList.add('hidden');
      return;
    }

    if (emptyCart) emptyCart.classList.add('hidden');
    if (cartTotal) cartTotal.classList.remove('hidden');

    // Render each cart item
    this.cart.forEach((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <div class="cart-item-info">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span class="cart-item-price">$${item.price.toFixed(2)}</span>
          <button class="cart-remove" onclick="cart.removeItem(${index})">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
    });

    // Update total
    if (cartTotal) {
      cartTotal.innerHTML = `
        <span>Total:</span>
        <span class="price">$${this.getTotal().toFixed(2)}</span>
      `;
    }
  }

  /**
   * Show notification (simple implementation)
   */
  showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
      existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background-color: var(--accent-primary);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: var(--shadow-lg);
      z-index: 3000;
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize cart
const cart = new ShoppingCart();

/**
 * Cart Modal Functions
 */
function openCart() {
  cart.renderCartModal();
  const modal = document.getElementById('cart-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeCart() {
  const modal = document.getElementById('cart-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

function checkout() {
  if (cart.getItemCount() === 0) {
    alert('Your cart is empty!');
    return;
  }

  alert(`Thank you for your order!\n\nTotal: $${cart.getTotal().toFixed(2)}\n\nThis is a demo - no actual payment will be processed.`);
  cart.clearCart();
  closeCart();
}

/**
 * Helper function to add item from HTML button
 */
function addToCart(name, price, description) {
  cart.addItem({
    name: name,
    price: price,
    description: description
  });
}

/**
 * Close modal when clicking outside
 */
document.addEventListener('click', function(event) {
  const modal = document.getElementById('cart-modal');
  if (event.target === modal) {
    closeCart();
  }
});

/**
 * Set active navigation link based on current page
 */
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Set active nav on page load
document.addEventListener('DOMContentLoaded', setActiveNav);

// Add CSS animation for notification
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(1rem);
    }
  }
`;
document.head.appendChild(style);
