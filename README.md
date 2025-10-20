# CrazeeIvan's PZ Emporium - Assignment Version

A static website showcasing Project Zomboid mods, tools, and services built with HTML, CSS, and JavaScript.

## 📋 Assignment Requirements Met

### ✅ Required Elements

1. **Five HTML Pages**
   - `index.html` - Home page with site overview
   - `mods.html` - Mods portfolio showcase
   - `tools.html` - Tools and utilities listing
   - `shop.html` - Shop with tips and commissions
   - `about.html` - About page with contact info

2. **Shopping Cart** ✅
   - Fully functional shopping cart using LocalStorage
   - Add/remove items
   - Cart persists across page refreshes
   - Real-time cart badge updates
   - Modal interface

3. **Clear Imagery** ✅
   - Clean, professional design
   - Consistent visual hierarchy
   - Card-based layout for content presentation

4. **Animations** ✅
   - Page load fade-in animations
   - Card slide-in animations (staggered)
   - Navbar slide-down animation
   - Hover transitions on cards and buttons
   - Cart badge pop animation
   - Modal slide-in animation
   - Gradient text animation
   - Notification slide-in/fade-out

5. **Interactive Features** ✅
   - Shopping cart functionality
   - Modal system (cart overlay)
   - Active navigation highlighting
   - Add to cart buttons
   - Checkout simulation
   - Clear cart functionality
   - Click-outside-to-close modal

6. **HTML5 Features** ✅
   - **LocalStorage API** - Cart persistence
   - Semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<address>`)
   - ARIA labels for accessibility
   - Meta tags for SEO

### 🎨 Design Features

**CSS Implementation:**
- CSS Variables for theming
- Flexbox and Grid layouts
- Responsive design with media queries
- Dark theme color scheme
- Custom animations and transitions
- Modular component-based styling

**JavaScript Implementation:**
- Object-oriented design (ShoppingCart class)
- LocalStorage management
- DOM manipulation
- Event handling
- Dynamic content rendering

## 🔍 SEO Optimization Strategies

### 1. Meta Tags
Each page includes:
- Descriptive `<title>` tags
- Meta descriptions (150-160 characters)
- Keywords meta tags
- Author meta tags
- Viewport meta for mobile optimization

### 2. Semantic HTML
- Proper heading hierarchy (H1 → H2 → H3)
- Semantic HTML5 elements
- ARIA labels for accessibility
- Descriptive alt text (where applicable)

### 3. Content Structure
- Keyword-rich headings
- Descriptive URLs (mods.html, tools.html, etc.)
- Meaningful link text
- Organized content hierarchy
- Fast load times (minimal dependencies)

## 📁 Project Structure

```
PZ-Emporium-Assignment/
├── index.html          # Home page
├── about.html          # About page
├── mods.html           # Mods portfolio
├── shop.html           # Shop page
├── tools.html          # Tools page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   ├── cart.js         # Shopping cart functionality
│   └── data-loader.js  # Dynamic content loader
├── data/               # 🔥 Content source files
│   ├── mods.json       # Mods data
│   ├── tools.json      # Tools data
│   └── tips.json       # Tips data
├── images/             # Image assets (placeholder)
├── assets/             # Additional assets (placeholder)
├── sync-to-nextjs.js   # Sync script for Next.js
├── SYNC-GUIDE.md       # Content sync documentation
└── README.md           # This file
```

## 🔄 Content Management System

### Dynamic Content
All mods, tools, and tips are loaded **dynamically from JSON files** in the `data/` folder. This allows:
- Easy content updates without editing HTML
- Shared content between this assignment and the Next.js version
- Professional data-driven architecture

### Editing Content
To update mods, tools, or tips:
1. Edit the JSON files in the `data/` folder
2. Refresh your browser - changes appear immediately!
3. No need to touch HTML files

### Syncing to Next.js
If you also have the Next.js version (`CrazeeIvan's PZ Emporium`), you can sync content:
```bash
node sync-to-nextjs.js
```

See `SYNC-GUIDE.md` for detailed instructions.

## 🚀 How to Run

1. Open any HTML file in a modern web browser
2. No build process or dependencies required
3. Works offline (except for any external fonts if added)

### Recommended Browsers
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 💡 Features Breakdown

### Shopping Cart (HTML5 LocalStorage)
- **Add Items**: Click "Add to Cart" on shop page
- **View Cart**: Click cart button in navigation
- **Remove Items**: Click "Remove" on individual items
- **Clear Cart**: Clear all items at once
- **Persistent**: Cart data saved across sessions
- **Checkout**: Simulated checkout process

### Animations
1. **Page Load**: Fade-in animation (0.5s)
2. **Cards**: Staggered slide-in (0.1s delays)
3. **Navigation**: Slide-down from top (0.3s)
4. **Hover Effects**: Smooth transitions on interactive elements
5. **Cart Badge**: Pop animation when items added
6. **Modal**: Slide-in and scale animation
7. **Gradient Text**: Animated gradient shift on title

### Responsive Design
- Mobile-first approach
- Breakpoint at 768px
- Grid adjusts to single column on mobile
- Navigation text size reduces on small screens

## 🎯 Assignment Compliance

**HTML/CSS/JavaScript**: Pure vanilla implementation, no frameworks
**Pages**: 5 distinct pages with unique content
**Shopping Cart**: Fully functional with LocalStorage
**Animations**: Multiple CSS animations throughout
**Interactive**: Multiple interactive JavaScript features
**HTML5**: LocalStorage API and semantic elements
**SEO**: Comprehensive meta tags and semantic structure

## 🔧 Technical Highlights

- **No Dependencies**: Pure HTML/CSS/JS
- **Modular CSS**: Component-based styling
- **Accessible**: ARIA labels and semantic HTML
- **Modern**: ES6+ JavaScript
- **Organized**: Clear file structure
- **Documented**: Code comments throughout

## 📝 Notes for Grading

- Open `index.html` to start
- Try adding items from `shop.html` to test cart
- Cart persists when closing/reopening browser
- All pages are interconnected via navigation
- Responsive design - try resizing browser
- View browser console for cart operations logging

## 🎓 Learning Outcomes Demonstrated

1. HTML structure and semantics
2. CSS layout techniques (Flexbox, Grid)
3. CSS animations and transitions
4. JavaScript DOM manipulation
5. HTML5 API usage (LocalStorage)
6. Responsive web design
7. SEO best practices
8. Web accessibility
9. Object-oriented JavaScript
10. User experience design

---

**Created by**: [Your Name]
**Course**: [Course Name]
**Date**: October 2025
**Assignment**: Website Design & Implementation
