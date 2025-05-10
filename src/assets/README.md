# Assets Directory Structure

This directory contains all the static assets used in the application.

## Directory Structure

```
assets/
├── images/          # Image files
│   ├── products/    # Product images
│   ├── icons/       # Icon images
│   └── backgrounds/ # Background images
├── videos/          # Video files
│   ├── hero/        # Hero section videos
│   └── features/    # Feature demonstration videos
└── fonts/          # Custom font files
```

## Usage Guidelines

1. **Images**:
   - Use `.webp` format for better performance
   - Keep original files in high resolution
   - Optimize images before adding them
   - Use descriptive filenames

2. **Videos**:
   - Use `.mp4` format for maximum compatibility
   - Keep file sizes reasonable
   - Use appropriate compression
   - Include fallback images

3. **Fonts**:
   - Use WOFF2 format for modern browsers
   - Include fallback formats (WOFF, TTF)
   - Document font usage in components

## Importing Assets

```typescript
// Importing images
import productImage from '@/assets/images/products/headphone-1.webp';

// Importing videos
import heroVideo from '@/assets/videos/hero/headphones.mp4';

// Using in components
<img src={productImage} alt="Product" />
<video src={heroVideo} />
``` 