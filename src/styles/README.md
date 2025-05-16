# CHODE TAPPER: CSS/SCSS Structure Guide

## Overview

This project uses SCSS modules for component-specific styling, along with global styles for shared elements. This guide explains the proper structure and how to maintain it.

## 📂 CSS File Structure

### Global Styles
- **`/src/styles/global.scss`**: Main global styles, imported in layout.tsx
- **`/src/styles/_variables.scss`**: Color variables and other global design tokens
- **`/src/styles/_mixins.scss`**: Reusable SCSS mixins

### Component-Specific Styles
- Each component has its own module.scss file co-located with the component:
  - Example: `/src/components/sections/HeroSection.tsx` imports styles from `/src/components/sections/HeroSection.module.scss`

## ✅ Resolved Duplicate Files Issue

Previously, there were duplicate `.module.scss` files in two locations:

1. **Active/Used Files**:
   - Location: `/src/components/sections/*.module.scss` 
   - These are the ones actively imported and used by the components

2. **Legacy/Deprecated Files**:
   - Location: `/src/styles/modules/*.module.scss`
   - These files are **no longer being used**

As of the latest update, we have:
- Created local module files for all components in their respective directories
- Updated all component import statements to use their local module files
- Fixed SCSS deprecation warnings by updating to CSS custom properties
- **Note**: We've kept the old files in `/src/styles/modules/` for reference, but they can be safely deleted in the future

## 🔄 Importing Styles

When creating new components, follow this pattern:

```tsx
// In your component file (e.g., MyComponent.tsx)
import styles from './MyComponent.module.scss';

// Then use the styles with className={styles.someClass}
```

And create your SCSS module in the same directory:

```scss
// In MyComponent.module.scss
@import '../../styles/variables'; // Access global variables

.someClass {
  color: var(--color-pink-girth);
  // other styles...
}
```

## 📝 Best Practices

1. Keep component-specific styles in `.module.scss` files next to their components
2. Use global styles for app-wide styling patterns
3. Import variables and mixins from the global style files when needed
4. Use CSS custom properties (variables) instead of SCSS functions like `lighten()` or `darken()`
5. When adding new sections, create the component and its module file in the same directory 