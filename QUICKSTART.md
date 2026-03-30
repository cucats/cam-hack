# Quick Start Guide - New Cam Hack Design

## Running the Development Server

```bash
npm install
npm run dev
```

Visit `http://localhost:5173` to see the new design.

## Building for Production

```bash
npm run build
npm run preview
```

## What Changed

### Removed
- ❌ Header navigation bar
- ❌ Shared footer
- ❌ Old component files (Hero.svelte, About.svelte, etc.)
- ❌ Default styling

### Added
- ✅ Three.js 3D animated background
- ✅ Matrix rain effect
- ✅ Interactive cursor trail
- ✅ Loading screen animation
- ✅ Countdown timer (days since Nov 1, 2025)
- ✅ Green cyberpunk color scheme
- ✅ Glassmorphism design elements
- ✅ Advanced hover animations
- ✅ Scroll-triggered animations
- ✅ Space Grotesk & Inter fonts

## Key Visual Features

1. **3D Background**: Rotating geometric shapes, 5000+ particles, dynamic lighting
2. **Matrix Effect**: Cascading "CAMHACK2025" characters
3. **Cursor Trail**: Green particle trail following mouse
4. **Loading Screen**: Animated logo with progress bar
5. **Hero Section**: Floating logo, glitch text effects, gradient buttons
6. **Featured Project**: Rotating border animation on hover
7. **Sponsors**: Staggered reveal animations, glow effects
8. **Organizers**: Circular profiles with radial glow

## Performance Notes

- Bundle size: ~508KB (includes three.js)
- Target: 60fps animations
- WebGL required for full experience
- Optimized for modern browsers

## Color Scheme

```
Primary:   #00ff88 (Electric Emerald)
Neon:      #0dff00 (Bright Lime)
Accent:    #00ffaa (Aqua Green)
Dark BG:   #0a0f0a (Deep Forest)
Text:      #e0ffe0 (Light Mint)
```

## Typography

- **Headings**: Space Grotesk (weights: 300-900)
- **Body**: Inter (weights: 300-700)
- **Mono**: System monospace

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Requires WebGL support

## Troubleshooting

### Animations not smooth?
- Check GPU acceleration is enabled
- Close other heavy browser tabs
- Reduce particle count in ThreeBackground.svelte

### Three.js not loading?
- Clear browser cache
- Run `npm install` again
- Check console for WebGL errors

### Build warnings?
- Minor performance warnings are expected
- They don't affect functionality
- Can be safely ignored

## File Structure

```
src/
├── lib/components/
│   ├── ThreeBackground.svelte       (3D scene)
│   ├── MatrixRain.svelte            (Matrix effect)
│   ├── CursorTrail.svelte           (Cursor particles)
│   ├── LoadingScreen.svelte         (Initial loader)
│   ├── CountdownTimer.svelte        (Days counter)
│   ├── NewHero.svelte               (Hero section)
│   ├── FeaturedProjects.svelte      (Project showcase)
│   ├── NewAbout.svelte              (About section)
│   ├── NewSponsors.svelte           (Sponsors grid)
│   ├── NewOrganisers.svelte         (Team section)
│   └── ScrollReveal.svelte          (Scroll animations)
├── routes/
│   ├── +page.svelte                 (Main page)
│   └── +layout.svelte               (Layout wrapper)
└── app.css                          (Global styles)
```

## Customization Tips

### Change Primary Color
Edit `app.css` and update all `#00ff88` references

### Adjust Particle Count
In `ThreeBackground.svelte`, change `particlesCount = 5000`

### Modify Animation Speed
In component files, adjust animation duration values

### Disable Effects
Comment out components in `+page.svelte`:
```svelte
<!-- <MatrixRain /> -->
<!-- <CursorTrail /> -->
```

## Contact

For questions about the design:
- Check DESIGN_NOTES.md for detailed documentation
- Review component source code
- Test in multiple browsers
