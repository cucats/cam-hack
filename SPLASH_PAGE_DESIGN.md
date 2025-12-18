# Cam Hack 2025 - New Splash Page Design

## Overview
A futuristic, cyberpunk-themed splash page featuring extensive Three.js animations and multiple layered visual effects.

## Color Palette
- **Primary Green**: `#86e293` (bright mint green)
- **Secondary**: `#10b981` (emerald green)
- **Accent**: `#86e6c6` (aqua mint)
- **Background**: `#0a0f1a` (deep space blue)
- **Surface**: `#1e293b` (slate)

## Typography
- **Display Font**: Orbitron (futuristic, geometric)
- **Body Font**: Ubuntu Mono (existing)

## Key Features

### 1. Three.js 3D Background
- Animated particle system (1500+ particles)
- Geometric wireframe shapes:
  - Octahedron
  - Torus
  - Icosahedron
  - Tetrahedron
- Dynamic lighting with point lights
- Mouse-reactive camera movement
- Scroll-based parallax effects

### 2. Layered Visual Effects
- **Data Stream**: Matrix-style falling binary digits
- **Hexagon Pattern**: Dynamic hexagonal grid overlay
- **Circuit Lines**: Animated circuit board patterns
- **Hologram Effect**: Horizontal scan lines
- **Floating Elements**: Glowing particles
- **Energy Pulses**: Expanding circle ripples
- **Cyberpunk Overlay**: Scanlines, grid, and vignette
- **Cursor Glow**: Radial gradient following cursor
- **Particle Trail**: Mouse-following particle system

### 3. Hero Section
- **Logo**: Floating animation with 3D rotation and glow effects
- **Title**: Glitch text effect with animated glitches
- **Countdown Timer**: 
  - Displays days since event
  - Holographic borders
  - Animated corner brackets
  - Pulsing glow effects
- **Buttons**:
  - Gradient backgrounds
  - Ripple hover effects
  - Shimmer animations

### 4. Featured Project Section
- Title with bracket decorators `[ ]`
- Animated corner brackets on hover
- Shimmer overlay effect
- Gradient border animations

### 5. Sponsors Section
- Animated underline on title
- Gradient rotating borders on cards
- Scale and glow effects on hover
- Radial gradient overlays

### 6. Content Sections
- Scroll reveal animations
- Blinking cursor on titles
- Hover effects on text paragraphs
- Enhanced schedule with styled cards

### 7. Schedule Section
- Individual day cards with gradients
- Left border accent stripe
- Hover animations
- Arrow indicators on list items

### 8. Loading Screen
- Hexagonal loader animation
- Pulsing hex patterns
- Animated progress bar
- Glowing text effects
- 2-second display duration

### 9. Scroll Interactions
- Smooth scroll reveals
- Parallax camera movement
- Animated scroll indicator with trail effect
- Section fade-in animations

## Component Architecture

### Background Components
- `ThreeBackground.svelte` - Main 3D scene
- `DataStream.svelte` - Matrix-style effect
- `HexagonPattern.svelte` - Hexagonal grid
- `CircuitLines.svelte` - Circuit board lines
- `HologramEffect.svelte` - Scan lines
- `FloatingElements.svelte` - Floating particles
- `EnergyPulse.svelte` - Pulse waves
- `CyberpunkOverlay.svelte` - Scanlines & grid
- `CursorGlow.svelte` - Cursor spotlight
- `ParticleTrail.svelte` - Mouse trail

### UI Components
- `LoadingScreen.svelte` - Initial loading animation
- `SplashHero.svelte` - Main hero section
- `GlitchText.svelte` - Animated glitch effect
- `CountdownTimer.svelte` - Days counter
- `FeaturedProject.svelte` - Featured project display
- `SponsorsSection.svelte` - Sponsor grid
- `ContentSection.svelte` - Reusable content wrapper
- `ScrollReveal.svelte` - Scroll-triggered animations

## Animations Summary

### Keyframe Animations
- `glitch-main` - Text glitch effect
- `pulse` - Pulsing glow
- `float` - Vertical floating
- `glow` - Intensity variation
- `rotate3d` - 3D rotation
- `shimmer` - Moving highlight
- `hologram-rotate` - Rotating gradient
- `corner-glow` - Corner bracket pulse
- `bracket-pulse` - Featured section brackets
- `scan-line` - Holographic scanning
- `hex-pulse` - Hexagon loader
- `progress` - Loading bar
- `bounce` - Scroll indicator

### Transition Effects
- Scale transforms
- Opacity fades
- Position translations
- Color shifts
- Shadow expansions

## Technical Details

### Dependencies
- `three` - 3D graphics library
- Standard SvelteKit setup
- No additional CSS frameworks

### Performance Considerations
- Canvas-based effects run at 60fps
- Particle counts optimized
- Intersection Observer for scroll reveals
- RAF (RequestAnimationFrame) for smooth animations

### Browser Compatibility
- Modern browsers with WebGL support
- CSS Grid and Flexbox layouts
- ES6+ JavaScript features

## Design Philosophy
The design embraces a cyberpunk aesthetic with:
- High contrast neon greens against dark backgrounds
- Layered transparency effects
- Geometric patterns and shapes
- Sci-fi UI elements (brackets, corners, scanlines)
- Constant subtle motion and animation
- Interactive hover states
- Depth through multiple z-index layers

## No Footer
As requested, the shared footer has been removed. The layout only includes the main content area without any footer navigation or information.
