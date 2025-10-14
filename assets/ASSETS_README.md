# Assets Directory

## Required Assets

Place the following files in this directory:

### Icons
- `icon.png` - App icon (1024x1024px)
- `adaptive-icon.png` - Android adaptive icon (1024x1024px)
- `favicon.png` - Web favicon (48x48px)

### Splash Screen
- `splash.png` - Splash screen (1284x2778px for iPhone 14 Pro Max)

### Images
Place product and design images in `images/` subdirectory

### Fonts
Place custom fonts in `fonts/` subdirectory:
- Manrope (Regular, Medium, Bold, ExtraBold)
- Plus Jakarta Sans (Regular, Medium, Bold, ExtraBold)
- Spline Sans (Regular, Medium, Bold)

### Lottie Animations
Place Lottie JSON files in `lottie/` subdirectory for:
- Loading spinner
- Success animations
- Empty state illustrations

## Image Guidelines

- Use PNG for icons
- Use WebP or optimized JPEG for photos
- Maximum file size: 500KB per image
- Compress all images before adding
- Use descriptive filenames

## Generating Icons

Use a tool like:
- https://www.appicon.co
- https://makeappicon.com
- Figma with export scripts

Or use the Expo icon generator:
```bash
npx expo-icon-builder
```

