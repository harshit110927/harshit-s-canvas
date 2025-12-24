# Harshit Shukla — Portfolio

A modern, animated portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion.

![Portfolio Preview](https://img.shields.io/badge/Status-Active-brightgreen) ![React](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-teal)

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📁 Project Structure

```
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── assets/                    # Static assets (images, fonts)
│   ├── components/
│   │   ├── ui/                    # Shadcn UI components
│   │   ├── Experience.tsx         # Work history timeline
│   │   ├── Footer.tsx             # Site footer
│   │   ├── Hero.tsx               # Hero section with name & quotes
│   │   ├── NavLink.tsx            # Navigation link component
│   │   ├── Projects.tsx           # Portfolio projects grid
│   │   ├── RollingIntro.tsx       # Welcome animation
│   │   ├── Testimonials.tsx       # Client testimonials marquee
│   │   └── ThemeToggle.tsx        # Light/Dark mode toggle
│   ├── hooks/
│   │   ├── use-mobile.tsx         # Mobile detection hook
│   │   └── use-toast.ts           # Toast notifications
│   ├── lib/
│   │   └── utils.ts               # Utility functions (cn, etc.)
│   ├── pages/
│   │   ├── AdminPanel.tsx         # Admin page (placeholder)
│   │   ├── Index.tsx              # Main page entry
│   │   └── NotFound.tsx           # 404 page
│   ├── App.tsx                    # App routing
│   ├── App.css                    # Global app styles
│   ├── index.css                  # Design system & theme
│   ├── main.tsx                   # React entry point
│   └── vite-env.d.ts              # Vite types
├── index.html                     # HTML template & fonts
├── tailwind.config.ts             # Tailwind configuration
├── vite.config.ts                 # Vite configuration
├── personalNote.md                # Content editing guide
└── README.md                      # This file
```

---

## 🧩 Components Overview

### Page Components (`src/pages/`)

| Component | Route | Description |
|-----------|-------|-------------|
| `Index.tsx` | `/` | Main portfolio page, orchestrates all sections |
| `AdminPanel.tsx` | `/admin` | Admin panel (placeholder for future CMS) |
| `NotFound.tsx` | `*` | 404 error page |

### Feature Components (`src/components/`)

| Component | Description | Key Features |
|-----------|-------------|--------------|
| `RollingIntro.tsx` | Welcome animation | Rolling text, auto-dismiss, configurable speed |
| `Hero.tsx` | Hero section | Name, tagline, social links, stoic quotes |
| `Projects.tsx` | Portfolio grid | Horizontal scroll, hover expand, modal details |
| `Experience.tsx` | Work timeline | Animated timeline, staggered entry |
| `Testimonials.tsx` | Client quotes | Infinite marquee, pause on hover, modal expand |
| `Footer.tsx` | Site footer | Social links, copyright |
| `ThemeToggle.tsx` | Dark/Light toggle | Persists preference, smooth transition |
| `NavLink.tsx` | Active link styling | Highlights current route |

---

## 🎨 Design System

### Theme Configuration

**File:** `src/index.css`

The design system uses CSS custom properties (variables) for theming:

```css
:root {
  /* Light Theme */
  --background: 30 100% 96%;      /* Warm cream #fff6ec */
  --foreground: 0 0% 13%;         /* Near black */
  --primary: 0 0% 13%;
  --muted-foreground: 0 0% 40%;
  /* ... more tokens */
}

.dark {
  /* Dark Theme */
  --background: 0 0% 13%;
  --foreground: 45 23% 95%;
  /* ... more tokens */
}
```

### Typography

**Fonts configured in:** `index.html` + `tailwind.config.ts`

| Font | Usage | Weight |
|------|-------|--------|
| Outfit | Headings (`font-display`) | 400-900 |
| Inter | Body text (`font-body`) | 300-600 |

### Key CSS Classes

| Class | Location | Purpose |
|-------|----------|---------|
| `.hero-name` | `index.css` | Large hero name styling |
| `.hero-headline` | `index.css` | Hero tagline styling |
| `.hero-subhead` | `index.css` | Hero subheading |
| `.project-card` | `index.css` | Project card base styles |
| `.timeline-item` | `index.css` | Experience timeline items |
| `.social-link` | `index.css` | Social icon links |
| `.animate-marquee` | `index.css` | Infinite scroll animation |
| `.glass` | `index.css` | Frosted glass effect |

---

## 🔧 Configuration Files

### `tailwind.config.ts`

```typescript
fontFamily: {
  display: ["Outfit", "sans-serif"],   // Headings
  body: ["Inter", "sans-serif"],        // Body text
}
```

### `index.html`

Contains:
- Meta tags (SEO, viewport)
- Google Fonts preload & import
- Favicon reference

### `vite.config.ts`

Standard Vite config with:
- React plugin
- Path aliases (`@/` → `src/`)
- Dev server settings

---

## 📝 Content Locations

For detailed editing instructions, see **`personalNote.md`**

| Content | File | Lines |
|---------|------|-------|
| Name & Tagline | `src/components/Hero.tsx` | 75-95 |
| Social Links | `src/components/Hero.tsx` | 50-54 |
| Stoic Quotes | `src/components/Hero.tsx` | 5-16 |
| Projects | `src/components/Projects.tsx` | 21-67 |
| Experience | `src/components/Experience.tsx` | 12-37 |
| Testimonials | `src/components/Testimonials.tsx` | 14-39 |
| Footer Info | `src/components/Footer.tsx` | 19-24 |
| Intro Words | `src/components/RollingIntro.tsx` | 4 |

---

## 🎬 Animations

All animations use **Framer Motion** (`framer-motion`).

### Key Animation Patterns

| Pattern | Used In | Description |
|---------|---------|-------------|
| `containerVariants` + `itemVariants` | Hero, sections | Staggered child animations |
| `whileInView` | All sections | Animate when scrolled into view |
| `whileHover` | Cards | Scale up on hover |
| `layoutId` | Projects, Testimonials | Smooth modal transitions |
| `AnimatePresence` | Modals | Exit animations |

### Intro Animation Timing

**File:** `src/components/RollingIntro.tsx`

```typescript
const ROLL_DURATION = 200;   // ms per word
const FINAL_DELAY = 1100;    // ms before exit
```

---

## 🧱 UI Components

Uses **shadcn/ui** components in `src/components/ui/`:

| Component | Usage |
|-----------|-------|
| `dialog.tsx` | Project & testimonial modals |
| `button.tsx` | Action buttons |
| `card.tsx` | Content cards |
| `toast.tsx` | Notifications |
| `tooltip.tsx` | Hover tooltips |

---

## 🌙 Theme Toggle

**Component:** `src/components/ThemeToggle.tsx`

- Uses `next-themes` for theme management
- Persists user preference in localStorage
- Positioned at top-right of viewport
- Smooth icon transition (Sun ↔ Moon)

---

## 📱 Responsive Breakpoints

Uses Tailwind's default breakpoints:

| Prefix | Min Width | Typical Device |
|--------|-----------|----------------|
| (none) | 0px | Mobile |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large screens |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3 | UI framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool & dev server |
| Tailwind CSS | 3.4 | Utility-first styling |
| Framer Motion | 12.x | Animations |
| shadcn/ui | Latest | UI component library |
| React Router | 6.x | Client-side routing |
| Lucide React | 0.462 | Icon library |

---

## 📦 Key Dependencies

```json
{
  "framer-motion": "^12.23.26",      // Animations
  "lucide-react": "^0.462.0",        // Icons
  "next-themes": "^0.3.0",           // Theme toggle
  "react-router-dom": "^6.30.1",     // Routing
  "tailwind-merge": "^2.6.0",        // Class merging
  "class-variance-authority": "^0.7.1" // Component variants
}
```

---

## 🚢 Deployment

### Via Lovable
1. Open project in Lovable
2. Click **Publish** (top-right)
3. Configure custom domain (optional)

### Via Other Platforms

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Output folder: `dist/`

Compatible with: Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.

---

## 📄 Additional Documentation

- **`personalNote.md`** — Step-by-step content editing guide
- **[Tailwind Docs](https://tailwindcss.com/docs)** — CSS utilities
- **[Framer Motion](https://www.framer.com/motion/)** — Animation API
- **[shadcn/ui](https://ui.shadcn.com/)** — Component docs
- **[Lucide Icons](https://lucide.dev/icons/)** — Icon reference

---

## 📜 License

© 2024-2025 Harshit Shukla. All rights reserved.

---

*Built with ❤️ using [Lovable](https://lovable.dev)*
