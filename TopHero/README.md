# 🌊 TopHero — Standalone WebGL Fluid Reveal Hero Section

A self-contained, drop-in hero section featuring a **Three.js Navier-Stokes liquid fluid simulation**, **interactive cursor hover reveal**, and a **seamless background video loop**.

This folder is designed to be handed directly to an **AI Agent** or **Frontend Developer** to integrate this exact top hero section into any website or web framework (HTML, React, Next.js, Vue, Webflow, Vite, etc.).

---

## 📁 Package Directory Structure

```text
TopHero/
├── index.html         # Complete, runnable standalone demonstration
├── css/
│   └── hero.css       # Isolated stylesheet (no third-party/Webflow bloat)
├── js/
│   └── hero-fluid.js  # Standalone WebGL Three.js fluid simulation engine
├── fonts/
│   ├── PPNeueMontreal-Medium.woff2
│   ├── PPNeueMontreal-Regular.woff2
│   └── PPNeueMontreal-Bold.woff2
├── video/
│   ├── Text_morph_animation_sequence_de1f8939_1080p.mp4  # Primary user morph video
│   ├── lifeevent-blue.mp4                                 # Alternative blue 3D text video
│   └── lifeevent-red.mp4                                  # Alternative red 3D text video
└── README.md          # Comprehensive integration & customization guide
```

---

## ⚡ Quick Start / Local Preview

To test this component immediately in your browser:

1. Open your terminal in this `TopHero` folder.
2. Start any local static file server:
   ```bash
   # Using Node (npx)
   npx serve .
   
   # Or using Python 3
   python -m http.server 8080
   ```
3. Open `http://localhost:8080` in Chrome/Edge/Safari.
4. Move your cursor across the "LifeEvent AI" text to trigger the liquid dye hover-reveal effect!

---

## 🤖 Instructions for AI Agents Integrating This Hero

If you are an **AI Agent** tasked with embedding this hero section into a target project, follow these 4 steps:

### Step 1: Copy Assets to Your Target Project
Copy the following directories into your target project's public/static root:
- `TopHero/fonts/` ➡️ `your-project/fonts/` (or `public/fonts/`)
- `TopHero/video/` ➡️ `your-project/video/` (or `public/video/`)
- `TopHero/css/hero.css` ➡️ `your-project/css/hero.css`
- `TopHero/js/hero-fluid.js` ➡️ `your-project/js/hero-fluid.js`

### Step 2: Include the Stylesheet
Link `hero.css` in the `<head>` of your HTML document:
```html
<link rel="stylesheet" href="css/hero.css">
```

### Step 3: Embed the Hero Section HTML Markup
Place this exact `<section class="section-w">` block at the top of your `<body>`:

```html
<!-- ======================================================== -->
<!-- TOP HERO SECTION                                        -->
<!-- ======================================================== -->
<section class="section-w">

  <!-- UI Overlay: Top tagline, CTA button, Corner branding -->
  <div class="section-fake-hero">
    <div class="section-fake-hero-top">
      <div class="div-block">
        <div class="p-l">Pas un style, une perspective.<br/>Parce que LifeEvent AI is Everythin’.</div>
        <div class="space-24"></div>
        <a href="#contact" class="btn black-blend">
          <span class="btn__text"><p class="btn__text-p">réserver un appel</p></span>
          <span class="arrow-w">
            <span class="arrow"><span class="line-arrow"></span><span class="shape-arrow"></span></span>
          </span>
        </a>
      </div>
      <div class="menu-toggle">MENU ::</div>
    </div>

    <div class="section-fake-hero-bottom">
      <div class="link-hero-bottom-w">
        <h1 class="h1">Studio créatif à Paris</h1>
      </div>
      <div class="hero-social-links">
        <a href="#" target="_blank" rel="noopener">LinkedIn</a>
        <span>/</span>
        <a href="#" target="_blank" rel="noopener">Instagram</a>
        <span>FR | ENG</span>
      </div>
    </div>
  </div>

  <!-- Background Morph Animation Video Layer -->
  <video 
    src="video/Text_morph_animation_sequence_de1f8939_1080p.mp4" 
    autoplay 
    loop 
    muted 
    playsinline 
    crossorigin="anonymous" 
    class="video-hero-bg">
  </video>

  <!-- Foreground SVG Typography Layer (Mask Source) -->
  <section class="section hero-home">
    <div class="container hero-home">
      <div class="nothin-hero-w">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1408 294" fill="none" class="nothin-hero-svg">
          <defs>
            <style>
              @font-face {
                font-family: 'Ppneuemontreal';
                src: url('../fonts/PPNeueMontreal-Medium.woff2') format('woff2');
                font-weight: 500;
                font-style: normal;
              }
            </style>
          </defs>
          <text x="50%" y="76%" text-anchor="middle" font-family="Ppneuemontreal, 'PP Neue Montreal', Arial, sans-serif" font-weight="500" font-size="246" fill="currentColor" letter-spacing="-0.02em">LifeEvent AI</text>
        </svg>
      </div>
    </div>
  </section>

</section>
<!-- ======================================================== -->
```

### Step 4: Include the Fluid Script
Place the script before the closing `</body>` tag:
```html
<script src="js/hero-fluid.js"></script>
```

> **Note:** `hero-fluid.js` initializes automatically on DOM ready. If you are using React, Vue, or an SPA router where content loads dynamically, you can manually trigger initialization at any time by calling:
> ```javascript
> if (window.initHeroFluid) {
>   window.initHeroFluid();
> }
> ```

---

## 🛠️ Architecture & Under the Hood

The hero operates through a **3-layer depth stack**:

| Layer | CSS / Element | Z-Index | Role |
| :--- | :--- | :---: | :--- |
| **0. Video Background** | `<video class="video-hero-bg">` | `0` | Runs the looping morph animation in the background. |
| **1. Fluid Canvas** | `<canvas class="mask-reveal-canvas">` | `1` | Dynamically created by `hero-fluid.js`. Computes Navier-Stokes velocity & dye advection via WebGL fragment shaders. It renders the white background with the "LifeEvent AI" text; cursor movement paints transparent dye that erases the text surface to reveal the background video underneath. |
| **2. Foreground UI** | `<div class="section-fake-hero">` | `2` | Houses the top-left tagline, pill button, bottom credits, and menu links. Set to `pointer-events: none` on the container and `pointer-events: auto` on interactive buttons so cursor movements pass through to the liquid simulation. |

---

## 🎨 Customization Guide

### 1. Swapping Background Videos
To change the video, simply update the `src` attribute of `<video class="video-hero-bg">`:
- **Primary Morph Animation:** `video/Text_morph_animation_sequence_de1f8939_1080p.mp4`
- **Blue 3D Glossy Text:** `video/lifeevent-blue.mp4`
- **Red 3D Glossy Text:** `video/lifeevent-red.mp4`

```html
<video src="video/lifeevent-blue.mp4" autoplay loop muted playsinline crossorigin="anonymous" class="video-hero-bg"></video>
```

### 2. Changing the Hero Headline Text
The main headline is rendered inside the SVG:
```xml
<text x="50%" y="76%" text-anchor="middle" font-family="Ppneuemontreal, Arial, sans-serif" font-weight="500" font-size="246" fill="currentColor" letter-spacing="-0.02em">Your Brand Name</text>
```
- **`font-size="246"`**: Calibrated to match the background video width exactly. Adjust up or down if your new text length differs.
- **`y="76%"`**: Calibrated vertical baseline to align the text vertically with the morph animation.
- **`letter-spacing="-0.02em"`**: Kerning adjustment.

### 3. Customizing UI Taglines and Button Text
In `.section-fake-hero`:
- `.p-l`: Change `"Pas un style, une perspective. Parce que LifeEvent AI is Everythin’."` to your project tagline.
- `.btn__text-p`: Change `"réserver un appel"` to `"Book a call"` or any call-to-action.
- `.h1`: Change `"Studio créatif à Paris"` to your company location or category.

### 4. Adjusting Fluid Physics Parameters
The default physics configuration inside `hero-fluid.js` is tuned for crisp liquid dispersion:
```javascript
{
  simResolution: 256,       // Simulation grid detail
  dyeResolution: 512,       // Dye visual texture fidelity
  velocityDissipation: 0.962,// How fast fluid momentum slows down
  dyeDissipation: 0.988,    // How long the liquid reveal mask lingers before fading back
  curlStrength: 0,          // Fluid vorticity
  splatRadius: 0.00006,     // Cursor brush size
  splatForce: 5900,         // Force applied when cursor moves
  revealSize: 3.9,          // Reveal mask multiplier
  edgeSoftness: 0.5,        // Smoothness of liquid eraser edges
  edgeWidth: 0.01           // Edge falloff width
}
```

---

## ⚛️ React / Next.js Integration Recipe

If you are using Next.js (App Router or Pages Router) or React:

```tsx
'use client';
import { useEffect } from 'react';
import Script from 'next/script';

export default function TopHero() {
  const handleScriptLoad = () => {
    if (typeof window !== 'undefined' && (window as any).initHeroFluid) {
      (window as any).initHeroFluid();
    }
  };

  return (
    <>
      <link rel="stylesheet" href="/css/hero.css" />
      
      <section className="section-w">
        <div className="section-fake-hero">
          {/* Overlay elements */}
        </div>

        <video
          src="/video/Text_morph_animation_sequence_de1f8939_1080p.mp4"
          autoPlay
          loop
          muted
          playsInline
          crossOrigin="anonymous"
          className="video-hero-bg"
        />

        <section className="section hero-home">
          <div className="container hero-home">
            <div className="nothin-hero-w">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1408 294" fill="none" className="nothin-hero-svg">
                <text x="50%" y="76%" textAnchor="middle" fontFamily="Ppneuemontreal, Arial, sans-serif" fontWeight="500" fontSize="246" fill="currentColor" letterSpacing="-0.02em">
                  LifeEvent AI
                </text>
              </svg>
            </div>
          </div>
        </section>
      </section>

      <Script 
        src="/js/hero-fluid.js" 
        strategy="afterInteractive" 
        onLoad={handleScriptLoad} 
      />
    </>
  );
}
```

---

## ✅ Quality Checklist Verified
- [x] Tested 100% standalone with zero external dependencies (no Webflow, Taxi.js, or Lenis dependencies).
- [x] Background video plays automatically on load with HTTP 206 range request support.
- [x] WebGL Three.js fluid simulation renders canvas dynamically without throwing exceptions.
- [x] Liquid hover erase reveals background video on mousemove.
- [x] SVG text perfectly aligned with morph video typography.
- [x] Clean, documented CSS and font paths.
