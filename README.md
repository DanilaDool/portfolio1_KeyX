# KeyX Gaming Keyboards Landing Page

Premium gaming mechanical keyboards landing page with cyberpunk aesthetics and RGB effects.

## Features

✅ **Performance Optimizations**
- Lazy loading for all major components
- Reduce motion support for accessibility
- Preloading of critical resources
- Code splitting and optimized bundle size

✅ **SEO & Metadata**
- Open Graph tags for social media
- Structured data (Schema.org)
- Sitemap.xml and robots.txt
- Comprehensive meta tags

✅ **Interactive Features**
- 3D keyboard model with Three.js (drag to rotate, scroll to zoom)
- Interactive keyboard configurator (switches, RGB colors, layouts)
- Real-time RGB effects demo with 6 different effects
- Mechanical switch sound effects (Web Audio API)
- Smooth animations with Framer Motion

✅ **Sections**
- Hero with animated RGB keyboard
- Product catalog (6 keyboards)
- 3D Configurator
- RGB Effects Demo
- About KeyX brand
- FAQ with accordion
- Contact form with validation
- Responsive footer

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Three.js + React Three Fiber
- Web Audio API

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx           # Hero section
│   ├── Products.jsx       # Product catalog
│   ├── Configurator.jsx   # 3D keyboard configurator
│   ├── Keyboard3D.jsx     # 3D keyboard model
│   ├── RGBDemo.jsx        # Interactive RGB demo
│   ├── About.jsx          # About section
│   ├── FAQ.jsx            # FAQ accordion
│   └── Contact.jsx        # Contact form
├── utils/
│   ├── motion.js          # Motion utilities
│   └── sound.js           # Sound manager
├── App.jsx                # Main app component
├── main.jsx               # Entry point
└── index.css              # Global styles

public/
├── robots.txt             # SEO robots file
└── sitemap.xml            # SEO sitemap
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

© 2026 KeyX. All rights reserved.
