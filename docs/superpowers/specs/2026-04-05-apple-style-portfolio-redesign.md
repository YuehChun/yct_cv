# Apple-Style Portfolio Redesign — Design Spec

## Goal

Redesign the existing Bootstrap 3 + jQuery portfolio site into a modern Apple.com-inspired personal brand showcase. Target audience: broad professional network (LinkedIn extension). Must deploy on GitHub Pages with zero build step.

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| CSS | Tailwind CSS (CDN play mode) | Utility-first, no build step, modern defaults |
| Animations | GSAP 3 + ScrollTrigger (CDN) | Industry standard for scroll-driven animations (Apple/Nike/Stripe level) |
| Fonts | Inter (Google Fonts) | Closest free alternative to SF Pro Display |
| Icons | Heroicons or Lucide (inline SVG) | Minimal, Apple-aesthetic line icons |
| Deployment | GitHub Pages | Static HTML, push-to-deploy |

**Removed dependencies**: Bootstrap 3, jQuery, jQuery UI, Modernizr, Bourbon, "Get Shit Done" theme, custom SCSS pipeline.

## Color System

```
Background:       #000000 (pure black)
Surface:          #1d1d1f (card backgrounds)
Text Primary:     #f5f5f7 (white-ish)
Text Secondary:   #86868b (Apple gray)
Text Tertiary:    #424245 (muted)
Accent:           #667eea (indigo/purple, for active states + highlights)
Border:           rgba(255,255,255,0.08)
Hover glow:       rgba(102,126,234,0.15)
```

Category accent colors for Bento grid cards:
- LLM & GenAI: `#667eea` (indigo)
- MLOps: `#66ea7e` (green)
- Deep Learning: `#ea6666` (red)
- Data Engineering: `#eaea66` (yellow)
- RL: `#ea66d5` (pink)

## Typography

```
Font Family:      'Inter', sans-serif
Hero Name:        48–64px, weight 700, letter-spacing -0.02em
Section Title:    28–36px, weight 600
Section Label:    11px, uppercase, letter-spacing 0.1em, color #86868b
Body:             14–16px, weight 400, line-height 1.7
Card Title:       16px, weight 600
Card Subtitle:    13px, color #86868b
Tag Pills:        11px, color #f5f5f7, bg #1d1d1f, border-radius 6px
```

## Page Structure (7 Sections)

### 1. Hero
- Full viewport height, centered content
- Circular avatar (gradient border) with name, title, and social link pills
- Minimal — no background image, no motto
- Social links: GitHub, LinkedIn, Email as pill-shaped border buttons

### 2. About
- Section label: "ABOUT"
- One-liner headline (28px): personal positioning statement
- Secondary paragraph (14px, #86868b): career summary
- Max-width 600px, left-aligned

### 3. Experience
- Section label: "EXPERIENCE"
- Headline: "Where I've Made Impact"
- Stacked cards (surface color #1d1d1f, border-radius 16px)
- Each card shows: role title, company, date range
- Click to expand: reveals work detail bullets underneath (smooth height animation)
- Cards contain the content currently split between Timeline and myWork.html
- Order: Mal Bank → Polymer Capital → ChungHwa Telecom (AI Engineer) → ChungHwa Telecom (Data Engineer) → earlier roles

### 4. Featured Work
- Section label: "FEATURED WORK"
- Headline: "What I've Built"
- Bento grid layout (2 columns on desktop, 1 on mobile)
- Each card: category color gradient background, category label, project title, one-line description
- Click to expand: inline detail or modal with full description
- Curated selection of ~6–8 key projects from myWork.html content

### 5. Skills
- Section label: "SKILLS"
- Headline: "Technical Expertise"
- 2×2 grid of skill categories (Programming, ML/AI, Infrastructure, DevOps)
- Each category: label + flex-wrapped tag pills
- No star ratings — presence in the list implies proficiency
- Mobile: stack to single column

### 6. Publications & Awards
- Section label: "PUBLICATIONS & AWARDS"
- Headline: "Academic Contributions"
- Simple list with horizontal rule separators
- Each item: title + year on left, type badge on right (Publication / Award)
- Papers from myPaper.html + Awards from myAwards.html combined

### 7. Education
- Section label: "EDUCATION"
- Headline: "Academic Journey"
- Minimal vertical timeline (thin left border + dots)
- M.S. and B.S. entries with school name and dates
- Below education: collapsible "School Projects" section for the 2013-2014 academic projects (content from index.html project panels)

### Footer
- Centered: © 2026 Yueh-Chun Tsai
- Social links repeated (GitHub, LinkedIn, Email)
- Minimal, no background color change

## Navigation

- Sticky top navbar, appears after scrolling past Hero
- Glassmorphism: `background: rgba(0,0,0,0.8); backdrop-filter: blur(20px)`
- Links: About | Experience | Work | Skills | Publications | Education
- Active section indicator: bold text + underline accent color
- Click → smooth scroll to section
- Mobile: hamburger menu → full-screen overlay

## Animations (GSAP ScrollTrigger)

### Hero Entrance (on page load)
1. Avatar: `scale(0) → scale(1)` with elastic ease (duration 0.8s)
2. Name: `opacity(0), y(30) → opacity(1), y(0)` (duration 0.6s, delay 0.2s)
3. Title: fade in (delay 0.4s)
4. Social pills: stagger fade in 0.1s each (delay 0.6s)

### Section Reveal (ScrollTrigger, per section)
- Trigger: element enters viewport at 80% from top
- Label: `translateX(-20px), opacity(0) → translateX(0), opacity(1)` (0.4s)
- Headline: clip-path text reveal left-to-right (0.6s)
- Content: `translateY(20px), opacity(0) → translateY(0), opacity(1)` (0.5s, delay 0.2s)

### Experience Cards
- Enter: stagger `translateY(30px), opacity(0) → normal` (0.15s stagger)
- Hover: `translateY(-4px)` + border glow `box-shadow: 0 0 20px rgba(102,126,234,0.15)`
- Expand/collapse: GSAP height animation with ease

### Bento Grid Cards
- Enter: `scale(0.9), opacity(0) → scale(1), opacity(1)` stagger 0.1s
- Hover: `scale(1.02)` + background gradient brighten

### Navigation
- Appear: slide down from top when scroll position > hero height
- Active link: underline width animation (0 → 100%)

## Responsive Design

| Breakpoint | Behavior |
|-----------|----------|
| < 640px (sm) | Single column everything, hero text 36px, nav hamburger, bento 1-col |
| 640–768px (md) | Bento 1-col, skills 1-col, nav visible |
| 768–1024px (lg) | Bento 2-col, skills 2×2, experience cards full width |
| > 1024px (xl) | Max-width 1080px centered container, full layout |

## File Structure (New)

```
/
├── index.html              # Complete single-page site (new)
├── assets/
│   ├── img/
│   │   └── yct_sp.jpeg     # Keep existing profile photo
│   └── js/
│       └── animations.js   # GSAP ScrollTrigger animation code
├── .gitignore
├── CNAME                    # If custom domain
└── (old files preserved in /archive/ for reference)
```

All CSS is inline via Tailwind utility classes. External CDN links:
- `https://cdn.tailwindcss.com` (Tailwind play CDN)
- `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
- `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`
- `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap`

## Content Migration Notes

- All existing content is preserved — reorganized, not removed
- Professional work content (myWork.html) splits into Experience cards (role-level) and Featured Work (project-level)
- School timeline entries move into Education section with collapsible school projects
- Papers and Awards merge into a single Publications & Awards list
- English grammar fixes already applied (68 corrections across all files)

## Out of Scope

- Dark/light mode toggle (dark only)
- Blog or dynamic content
- Contact form
- Analytics integration
- Multi-page navigation
