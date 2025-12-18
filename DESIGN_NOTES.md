# Cam Hack 2025 - New Splash Page Design

## Overview
A completely redesigned splash page featuring Three.js animations, cyberpunk-inspired aesthetics, and a green color palette.

## Color Palette
### Primary Colors
- **Emerald Green**: `#10b981` - Main brand color
- **Mint Green**: `#34d399` - Secondary accent
- **Light Green**: `#6ee7b7` - Highlights and text
- **Lime Green**: `#84cc16` - Additional accent
- **Dark Green**: `#059669` - Deeper tones

### Background Colors
- **Pure Black**: `#000` - Main background
- **Dark variants**: Used for section backgrounds with transparency

### Accent Colors
- **Cyan**: `#06b6d4` - Additional particle color

## Typography
- **Font Family**: Ubuntu Mono (monospace) - Technical, hackathon aesthetic
- **Hero Title**: 3rem - 6rem (responsive)
- **Section Titles**: 2.5rem - 4rem (responsive)
- **Body Text**: 1rem - 1.2rem

## Key Features

### Three.js Background (`ThreeBackground.svelte`)
- **5000 particles** in spherical distribution with green color variations
- **Animated particle system** with sine/cosine wave motion
- **400 connecting lines** creating a network effect
- **4 geometric shapes** (torus, octahedron, icosahedron, ring) floating in 3D space
- **Mouse-responsive camera** that follows cursor movement
- **Fog effect** for depth perception
- **Additive blending** for glow effects

### Hero Section
- **Full viewport height** with centered content
- **Animated logo** with float effect (3s cycle)
- **Glitch text effect** on hover for title
- **Countdown badge** showing days since event (Nov 2, 2025)
- **Pulsing glow animation** on countdown
- **Gradient grid overlay** with animated movement
- **Radial pulse effect** behind content
- **CTA buttons** with ripple effects and glow

### Featured Project Section
- **"Unintended Behaviour"** showcase
- **Triple border glow** effect on hover
- **Sweep animation** on card hover
- **Holographic overlay** effect

### Sponsors Section
- **Grid layout** (auto-fit, min 250px)
- **Individual sponsor cards** with:
  - Sweep animation on hover
  - Lift and scale effect
  - Glow shadow effect

### About Section
- **Content card** with:
  - Animated gradient border
  - Hover glow effect
  - Semi-transparent background

### Schedule Section
- **Two-column grid** for Saturday/Sunday
- **Timeline-style layout** with:
  - Time badges
  - Event names with emphasis for meals
  - Radial glow on card hover
  - Slide-in effect on item hover

### FAQ Section
- **Grid layout** for FAQ cards
- **Cyberpunk corner accents** that appear on hover
- **Pulse glow animation** on hover
- **Question/answer formatting** with green highlights

### Organizers Section
- **5 organizer profiles** in responsive grid
- **Circular images** with:
  - Rotating border animation
  - Radial glow effect on hover
  - Shine effect across image
  - Scale and rotate on hover
  - Background radial pulse

## Animations

### Scroll Animations
- **Intersection Observer** triggers for sections
- **Fade-in and slide-up** on scroll into view
- **Staggered animations** for grid items

### Continuous Animations
- **Float**: Logo floating motion
- **Glitch**: RGB offset text effect
- **Shimmer**: Gradient text animation on section titles
- **Pulse Glow**: Breathing glow effect
- **Scanlines**: CRT screen effect overlay
- **Grid Move**: Animated background grid
- **Pulse Circle**: Radial pulse in hero section
- **Text Flicker**: Neon sign effect
- **Matrix Rain**: Particle animation
- **Rotate Border**: Hue rotation on organizer images
- **Gradient Border**: Moving gradient on content cards

### Interactive Animations
- **Button ripple**: Expanding circle on hover
- **Card lift**: Transform and shadow on hover
- **Sweep effects**: Light sweep across cards
- **Shine effects**: Highlight sweep on images

## Technical Implementation

### Structure
- **No shared footer** (removed from layout)
- **Dark theme** throughout (black background, light text)
- **Fixed Three.js canvas** (z-index: -1)
- **Layered overlays** for visual effects

### Performance Considerations
- **WebGL rendering** for Three.js
- **CSS transforms** for hardware acceleration
- **Intersection Observer** for efficient scroll detection
- **Optimized particle count** (5000) for balance

### Responsive Design
- **Mobile-first approach** with breakpoints at 768px
- **Flexible grid layouts** with auto-fit
- **Responsive typography** using clamp()
- **Adjusted animations** for mobile devices

## Design Philosophy
The design embraces a cyberpunk/tech aesthetic fitting for a hackathon:
- **Dark, immersive environment** with glowing green accents
- **Particle effects** suggesting data flow and connectivity
- **Geometric shapes** representing technology and structure
- **Holographic effects** for futuristic feel
- **Interactive elements** encouraging exploration
- **Scanline overlay** for retro-futuristic CRT effect

## Browser Compatibility
- Modern browsers with WebGL support
- CSS Grid and Flexbox
- CSS custom properties
- Intersection Observer API
- RequestAnimationFrame

## Content Preserved
All original content maintained:
- Event details (date, location, schedule)
- Sponsor information
- FAQ entries
- Organizer profiles
- Featured project "Unintended Behaviour"
- Links to Discord and signup

## Accessibility Notes
- Semantic HTML structure
- Keyboard navigation support
- Sufficient color contrast for text
- Reduced motion considerations could be added with prefers-reduced-motion
