# Apple-Style Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio site as a single-page Apple-style dark theme with Tailwind CSS + GSAP scroll animations, deployable on GitHub Pages with zero build step.

**Architecture:** Single `index.html` file with Tailwind CDN for styling and GSAP CDN for scroll-triggered animations. All content inline (no dynamic loading). A separate `assets/js/animations.js` handles all GSAP ScrollTrigger logic. Old files archived to `/archive/`.

**Tech Stack:** Tailwind CSS (CDN play mode), GSAP 3 + ScrollTrigger (CDN), Inter font (Google Fonts), Vanilla JS

---

## File Structure

```
/
├── index.html              # NEW: Complete single-page site
├── assets/
│   ├── img/
│   │   └── yct_sp.jpeg     # KEEP: Existing profile photo
│   └── js/
│       └── animations.js   # NEW: All GSAP ScrollTrigger code
├── archive/                # NEW: Old files moved here
│   ├── index-old.html
│   ├── aboutMe.html
│   ├── mySkill.html
│   ├── myWork.html
│   ├── myExperience.html
│   ├── myProjects.html
│   ├── myPaper.html
│   ├── myAwards.html
│   ├── index2.html
│   ├── components.html
│   └── (old CSS/JS/Bootstrap/jQuery folders)
├── .gitignore
├── CLAUDE.md
└── docs/
```

---

### Task 1: Archive old files and set up new index.html shell

**Files:**
- Create: `archive/` (move old files here)
- Create: `index.html` (new, replaces old)

- [ ] **Step 1: Create archive directory and move old files**

```bash
mkdir -p archive
mv index.html archive/index-old.html
mv index2.html archive/ 2>/dev/null; true
mv components.html archive/ 2>/dev/null; true
mv aboutMe.html archive/
mv mySkill.html archive/
mv myWork.html archive/
mv myExperience.html archive/
mv myProjects.html archive/
mv myPaper.html archive/
mv myAwards.html archive/
mv bootstrap3 archive/
mv jquery archive/
mv scss archive/
mv partials archive/
mv timeline archive/
# Keep assets/img/ and assets/js/ in place
mv assets/css archive/old-css
mv assets/js/get-shit-done.js archive/ 2>/dev/null; true
mv assets/js/gsdk-checkbox.js archive/ 2>/dev/null; true
mv assets/js/gsdk-radio.js archive/ 2>/dev/null; true
mv assets/js/gsdk-bootstrapswitch.js archive/ 2>/dev/null; true
mv assets/js/jquery-ui-1.10.4.custom.min.js archive/ 2>/dev/null; true
mv assets/js/modernizr.js archive/ 2>/dev/null; true
mv assets/js/main.js archive/ 2>/dev/null; true
```

- [ ] **Step 2: Create new index.html with CDN dependencies and empty section structure**

Write new `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Yueh-Chun (Hugo) Tsai — Senior AI Engineer</title>
  <meta name="description" content="Senior AI Engineer & MLOps Specialist with 10+ years of ML experience. LLM, Reinforcement Learning, and distributed ML infrastructure.">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            surface: '#1d1d1f',
            'text-primary': '#f5f5f7',
            'text-secondary': '#86868b',
            'text-tertiary': '#424245',
            accent: '#667eea',
          },
          fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
          },
        }
      }
    }
  </script>

  <!-- Google Fonts: Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- GSAP + ScrollTrigger -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>

  <style>
    html { scroll-behavior: smooth; }
    body { background: #000; color: #f5f5f7; }
    .clip-reveal { clip-path: inset(0 100% 0 0); }
    .clip-reveal.revealed { clip-path: inset(0 0% 0 0); transition: clip-path 0.6s ease; }
    .card-expand-content { max-height: 0; overflow: hidden; transition: max-height 0.5s ease; }
    .card-expand-content.open { max-height: 1000px; }
    .nav-link-active { color: #f5f5f7 !important; font-weight: 600; }
    .nav-underline { width: 0; transition: width 0.3s ease; }
    .nav-link-active .nav-underline { width: 100%; }
  </style>
</head>
<body class="font-sans antialiased">

  <!-- Navigation (sticky, hidden initially) -->
  <nav id="navbar"></nav>

  <!-- Section 1: Hero -->
  <section id="hero"></section>

  <!-- Section 2: About -->
  <section id="about"></section>

  <!-- Section 3: Experience -->
  <section id="experience"></section>

  <!-- Section 4: Featured Work -->
  <section id="work"></section>

  <!-- Section 5: Skills -->
  <section id="skills"></section>

  <!-- Section 6: Publications & Awards -->
  <section id="publications"></section>

  <!-- Section 7: Education -->
  <section id="education"></section>

  <!-- Footer -->
  <footer id="footer"></footer>

  <script src="assets/js/animations.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: Verify the page loads in browser**

Run: `cd /Users/birdtasi/Documents/Projects/yct_cv && python3 -m http.server 8000`

Open http://localhost:8000 — should see a blank black page with no console errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: archive old site, scaffold new Apple-style index.html with CDN deps"
```

---

### Task 2: Build Hero section

**Files:**
- Modify: `index.html` (replace `<section id="hero">` placeholder)

- [ ] **Step 1: Replace the hero section placeholder with full content**

Replace `<section id="hero"></section>` with:

```html
<section id="hero" class="min-h-screen flex flex-col items-center justify-center px-6 text-center">
  <div id="hero-avatar" class="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 mb-6 opacity-0 scale-0">
    <img src="assets/img/yct_sp.jpeg" alt="Yueh-Chun Tsai" class="w-full h-full object-cover">
  </div>
  <h1 id="hero-name" class="text-5xl md:text-7xl font-bold tracking-tight opacity-0 translate-y-8">
    Yueh-Chun Tsai
  </h1>
  <p id="hero-title" class="text-lg md:text-xl text-text-secondary mt-4 opacity-0">
    Senior AI Engineer &amp; MLOps Specialist
  </p>
  <div id="hero-links" class="flex gap-3 mt-8">
    <a href="https://github.com/yuehchun" target="_blank" class="px-4 py-2 border border-white/20 rounded-full text-xs text-text-secondary hover:text-text-primary hover:border-white/40 transition opacity-0">GitHub</a>
    <a href="https://www.linkedin.com/in/hugotsai" target="_blank" class="px-4 py-2 border border-white/20 rounded-full text-xs text-text-secondary hover:text-text-primary hover:border-white/40 transition opacity-0">LinkedIn</a>
    <a href="mailto:birdtasi@gmail.com" class="px-4 py-2 border border-white/20 rounded-full text-xs text-text-secondary hover:text-text-primary hover:border-white/40 transition opacity-0">Email</a>
  </div>
  <div class="mt-16 text-text-tertiary text-xs animate-bounce">↓ Scroll</div>
</section>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:8000 — hero should display centered name, avatar, links (no animations yet, just layout).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Hero section with avatar, name, title, and social links"
```

---

### Task 3: Build Navigation bar

**Files:**
- Modify: `index.html` (replace `<nav id="navbar">` placeholder)

- [ ] **Step 1: Replace the nav placeholder with full content**

Replace `<nav id="navbar"></nav>` with:

```html
<nav id="navbar" class="fixed top-0 left-0 right-0 z-50 -translate-y-full transition-transform duration-300"
     style="background: rgba(0,0,0,0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);">
  <div class="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
    <span class="text-sm font-semibold text-text-primary">Hugo Tsai</span>
    <!-- Desktop links -->
    <div class="hidden md:flex gap-8">
      <a href="#about" class="nav-link text-xs text-text-tertiary hover:text-text-primary transition relative">
        About<div class="nav-underline h-0.5 bg-accent mt-1"></div>
      </a>
      <a href="#experience" class="nav-link text-xs text-text-tertiary hover:text-text-primary transition relative">
        Experience<div class="nav-underline h-0.5 bg-accent mt-1"></div>
      </a>
      <a href="#work" class="nav-link text-xs text-text-tertiary hover:text-text-primary transition relative">
        Work<div class="nav-underline h-0.5 bg-accent mt-1"></div>
      </a>
      <a href="#skills" class="nav-link text-xs text-text-tertiary hover:text-text-primary transition relative">
        Skills<div class="nav-underline h-0.5 bg-accent mt-1"></div>
      </a>
      <a href="#publications" class="nav-link text-xs text-text-tertiary hover:text-text-primary transition relative">
        Publications<div class="nav-underline h-0.5 bg-accent mt-1"></div>
      </a>
      <a href="#education" class="nav-link text-xs text-text-tertiary hover:text-text-primary transition relative">
        Education<div class="nav-underline h-0.5 bg-accent mt-1"></div>
      </a>
    </div>
    <!-- Mobile hamburger -->
    <button id="nav-toggle" class="md:hidden text-text-primary" aria-label="Menu">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>
  </div>
  <!-- Mobile overlay -->
  <div id="nav-mobile" class="md:hidden hidden fixed inset-0 bg-black/95 flex flex-col items-center justify-center gap-8 z-50">
    <button id="nav-close" class="absolute top-6 right-6 text-text-primary" aria-label="Close">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <a href="#about" class="mobile-nav-link text-2xl text-text-secondary hover:text-text-primary transition">About</a>
    <a href="#experience" class="mobile-nav-link text-2xl text-text-secondary hover:text-text-primary transition">Experience</a>
    <a href="#work" class="mobile-nav-link text-2xl text-text-secondary hover:text-text-primary transition">Work</a>
    <a href="#skills" class="mobile-nav-link text-2xl text-text-secondary hover:text-text-primary transition">Skills</a>
    <a href="#publications" class="mobile-nav-link text-2xl text-text-secondary hover:text-text-primary transition">Publications</a>
    <a href="#education" class="mobile-nav-link text-2xl text-text-secondary hover:text-text-primary transition">Education</a>
  </div>
</nav>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add sticky glassmorphism navbar with mobile hamburger menu"
```

---

### Task 4: Build About section

**Files:**
- Modify: `index.html` (replace `<section id="about">` placeholder)

- [ ] **Step 1: Replace the about section placeholder**

Replace `<section id="about"></section>` with:

```html
<section id="about" class="py-24 md:py-32 px-6">
  <div class="max-w-3xl mx-auto">
    <div class="section-label text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-3 opacity-0">About</div>
    <h2 class="section-title text-3xl md:text-4xl font-semibold leading-tight opacity-0">
      A believer in data.<br>
      <span class="text-text-secondary">55% Scientist. 25% Analyst. 10% Engineer. 10% Dreamer.</span>
    </h2>
    <div class="section-content mt-8 opacity-0">
      <p class="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl">
        Senior Machine Learning Engineer &amp; MLOps Specialist with 10+ years of ML experience. Currently building production-ready AI agent systems with LLM and multi-agent orchestration at Mal Bank, UAE. Previously focused on reinforcement learning for quant-trading, MLOps platform architecture, and large-scale distributed training at Polymer Capital Management.
      </p>
      <div class="mt-8 space-y-2 text-sm text-text-secondary">
        <p class="font-medium text-text-primary mb-3">Interested in researching and developing:</p>
        <p>→ LLM Applications &amp; Agentic AI Systems</p>
        <p>→ MLOps &amp; ML Infrastructure (Kubernetes, Ray, Distributed Training)</p>
        <p>→ Reinforcement Learning for Quantitative Trading</p>
        <p>→ Real-world AI/ML Applications (Finance, Manufacturing, NLP, Computer Vision)</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add About section with personal positioning statement"
```

---

### Task 5: Build Experience section

**Files:**
- Modify: `index.html` (replace `<section id="experience">` placeholder)

- [ ] **Step 1: Replace the experience section placeholder**

Replace `<section id="experience"></section>` with:

```html
<section id="experience" class="py-24 md:py-32 px-6">
  <div class="max-w-3xl mx-auto">
    <div class="section-label text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-3 opacity-0">Experience</div>
    <h2 class="section-title text-3xl md:text-4xl font-semibold mb-12 opacity-0">Where I've Made Impact</h2>

    <div class="space-y-4">
      <!-- Mal Bank -->
      <div class="exp-card bg-surface rounded-2xl p-6 cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,126,234,0.15)] opacity-0" onclick="this.querySelector('.card-expand-content').classList.toggle('open')">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-base font-semibold">Senior AI Engineer</h3>
            <p class="text-[13px] text-text-secondary mt-1">Mal Bank · Abu Dhabi, UAE</p>
          </div>
          <span class="text-xs text-text-secondary whitespace-nowrap ml-4">2025 — Present</span>
        </div>
        <div class="card-expand-content">
          <div class="pt-4 mt-4 border-t border-white/[0.06] text-sm text-text-secondary leading-relaxed space-y-2">
            <p>• Built <strong class="text-text-primary">Personal Secretary Agent</strong> with ReAct framework and Supervisor pattern for multi-agent orchestration</p>
            <p>• Integrated memory functionality, GraphDB for user profiles, and RAG for tool selection</p>
            <p>• Architected <strong class="text-text-primary">gRPC-based microservices infrastructure</strong> with Protocol Buffers, supporting high concurrency and low latency</p>
          </div>
        </div>
      </div>

      <!-- Polymer Capital -->
      <div class="exp-card bg-surface rounded-2xl p-6 cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,126,234,0.15)] opacity-0" onclick="this.querySelector('.card-expand-content').classList.toggle('open')">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-base font-semibold">ML Researcher (MLOps &amp; Quant Infrastructure)</h3>
            <p class="text-[13px] text-text-secondary mt-1">Polymer Capital Management · Taipei</p>
          </div>
          <span class="text-xs text-text-secondary whitespace-nowrap ml-4">2023 — 2025</span>
        </div>
        <div class="card-expand-content">
          <div class="pt-4 mt-4 border-t border-white/[0.06] text-sm text-text-secondary leading-relaxed space-y-2">
            <p>• Developed <strong class="text-text-primary">RL (PPO) strategy enhancement</strong> for futures trading, achieving 2x RoMaD</p>
            <p>• Built <strong class="text-text-primary">Variational Autoencoder</strong> for noise reduction and synthetic market data generation</p>
            <p>• Created <strong class="text-text-primary">knowledge-based LLM tool</strong> using OpenAI API, cutting daily report preparation by 1+ hour</p>
            <p>• Architected <strong class="text-text-primary">end-to-end MLOps platform with Ray</strong>, scaling RL workloads to 1k GPU nodes, reducing training time by 90%</p>
          </div>
        </div>
      </div>

      <!-- ChungHwa Telecom - AI -->
      <div class="exp-card bg-surface rounded-2xl p-6 cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,126,234,0.15)] opacity-0" onclick="this.querySelector('.card-expand-content').classList.toggle('open')">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-base font-semibold">Data Scientist — AI Engineer</h3>
            <p class="text-[13px] text-text-secondary mt-1">ChungHwa Telecom · Taipei</p>
          </div>
          <span class="text-xs text-text-secondary whitespace-nowrap ml-4">2016 — 2023</span>
        </div>
        <div class="card-expand-content">
          <div class="pt-4 mt-4 border-t border-white/[0.06] text-sm text-text-secondary leading-relaxed space-y-2">
            <p>• Applied <strong class="text-text-primary">adversarial inverse RL</strong> to energy control policy optimization, achieving 10% energy consumption reduction</p>
            <p>• Deployed <strong class="text-text-primary">edge anomaly detection (Inception V3)</strong> on Jetson Nano with MQTT + AWS Greengrass</p>
            <p>• Improved <strong class="text-text-primary">CTR by 50%</strong> through refined feature selection and enhanced label granularity in telecom AdTech</p>
            <p>• Optimized production lines in manufacturing, reducing MAE by more than 55%</p>
            <p>• Engineered <strong class="text-text-primary">high-throughput Spark/HiveQL ELT pipeline</strong> for TB-scale logs, reducing latency to under 10 minutes</p>
            <p>• Built automated analysis applications for COVID-19 contact tracing, traffic analysis, and dynamic reporting</p>
          </div>
        </div>
      </div>

      <!-- ITRI Intern -->
      <div class="exp-card bg-surface rounded-2xl p-6 cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,126,234,0.15)] opacity-0" onclick="this.querySelector('.card-expand-content').classList.toggle('open')">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-base font-semibold">Intern</h3>
            <p class="text-[13px] text-text-secondary mt-1">Industrial Technology Research Institute</p>
          </div>
          <span class="text-xs text-text-secondary whitespace-nowrap ml-4">2015</span>
        </div>
        <div class="card-expand-content">
          <div class="pt-4 mt-4 border-t border-white/[0.06] text-sm text-text-secondary leading-relaxed space-y-2">
            <p>• Coded in Ruby on Rails, accessing web APIs from Facebook, Google, Dropbox, Nexmo</p>
            <p>• Learned collaboration workflows using Git version control</p>
          </div>
        </div>
      </div>

      <!-- Earlier roles -->
      <div class="exp-card bg-surface rounded-2xl p-6 cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,126,234,0.15)] opacity-0" onclick="this.querySelector('.card-expand-content').classList.toggle('open')">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-base font-semibold">Earlier Roles</h3>
            <p class="text-[13px] text-text-secondary mt-1">Part-time MIS &amp; Associate Programmer</p>
          </div>
          <span class="text-xs text-text-secondary whitespace-nowrap ml-4">2009 — 2013</span>
        </div>
        <div class="card-expand-content">
          <div class="pt-4 mt-4 border-t border-white/[0.06] text-sm text-text-secondary leading-relaxed space-y-2">
            <p>• Part-time MIS at NUTC-CSIE: managed department server, established support systems (project exhibition, voting service)</p>
            <p>• Associate Programmer at 嵐宇科技: PHP development, database schema design, customer communication</p>
            <p>• Associate Programmer at 網通數位科技: built front-to-end web services independently, learned MySQL, PHP, JavaScript, HTML, CSS</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify cards render and expand/collapse on click**

Open http://localhost:8000 — click any card to see expand/collapse (CSS transition, no JS needed yet).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add Experience section with expandable role cards"
```

---

### Task 6: Build Featured Work section (Bento grid)

**Files:**
- Modify: `index.html` (replace `<section id="work">` placeholder)

- [ ] **Step 1: Replace the work section placeholder**

Replace `<section id="work"></section>` with:

```html
<section id="work" class="py-24 md:py-32 px-6">
  <div class="max-w-3xl mx-auto">
    <div class="section-label text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-3 opacity-0">Featured Work</div>
    <h2 class="section-title text-3xl md:text-4xl font-semibold mb-12 opacity-0">What I've Built</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <!-- Card 1: Personal Secretary Agent -->
      <div class="bento-card rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300 opacity-0"
           style="background: linear-gradient(135deg, #1a1a2e, #16213e);"
           onclick="this.querySelector('.card-expand-content').classList.toggle('open')">
        <div class="text-[10px] uppercase tracking-widest text-[#667eea]">LLM &amp; GenAI</div>
        <h3 class="text-[15px] font-semibold mt-2">Personal Secretary Agent</h3>
        <p class="text-xs text-text-secondary mt-2">Multi-agent orchestration with ReAct framework, memory, GraphDB, and RAG</p>
        <div class="card-expand-content">
          <p class="text-xs text-text-secondary mt-3 pt-3 border-t border-white/[0.06]">Production-ready AI agent system at Mal Bank with Supervisor pattern for multi-agent coordination. Integrated memory functionality and GraphDB for user profiles.</p>
        </div>
      </div>

      <!-- Card 2: MLOps Platform -->
      <div class="bento-card rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300 opacity-0"
           style="background: linear-gradient(135deg, #1a2e1a, #162116);">
        <div class="text-[10px] uppercase tracking-widest text-[#66ea7e]">MLOps</div>
        <h3 class="text-[15px] font-semibold mt-2">Ray/MLOps Platform</h3>
        <p class="text-xs text-text-secondary mt-2">End-to-end ML platform scaling RL workloads to 1k GPU nodes, reducing training time by 90%</p>
      </div>

      <!-- Card 3: RL Trading Strategy -->
      <div class="bento-card rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300 opacity-0"
           style="background: linear-gradient(135deg, #2e1a2e, #211621);">
        <div class="text-[10px] uppercase tracking-widest text-[#ea66d5]">Reinforcement Learning</div>
        <h3 class="text-[15px] font-semibold mt-2">PPO Trading Strategy</h3>
        <p class="text-xs text-text-secondary mt-2">RL-based futures trading with custom reward shaping, achieving 2x RoMaD</p>
      </div>

      <!-- Card 4: VAE for Finance -->
      <div class="bento-card rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300 opacity-0"
           style="background: linear-gradient(135deg, #2e1a1a, #211616);">
        <div class="text-[10px] uppercase tracking-widest text-[#ea6666]">Deep Learning</div>
        <h3 class="text-[15px] font-semibold mt-2">Variational Autoencoder</h3>
        <p class="text-xs text-text-secondary mt-2">Noise reduction + unlimited synthetic market data generation for backtesting</p>
      </div>

      <!-- Card 5: TB-Scale Pipeline -->
      <div class="bento-card rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300 opacity-0"
           style="background: linear-gradient(135deg, #2e2e1a, #212116);">
        <div class="text-[10px] uppercase tracking-widest text-[#eaea66]">Data Engineering</div>
        <h3 class="text-[15px] font-semibold mt-2">TB-Scale ELT Pipeline</h3>
        <p class="text-xs text-text-secondary mt-2">High-throughput Spark/HiveQL pipeline reducing ingestion-to-reporting latency to under 10 min</p>
      </div>

      <!-- Card 6: Edge Anomaly Detection -->
      <div class="bento-card rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300 opacity-0"
           style="background: linear-gradient(135deg, #2e1a1a, #211616);">
        <div class="text-[10px] uppercase tracking-widest text-[#ea6666]">Deep Learning</div>
        <h3 class="text-[15px] font-semibold mt-2">Edge Anomaly Detection</h3>
        <p class="text-xs text-text-secondary mt-2">Inception V3 on Jetson Nano with MQTT + AWS Greengrass IoT automated deployment</p>
      </div>

      <!-- Card 7: LLM Knowledge Tool -->
      <div class="bento-card rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300 opacity-0"
           style="background: linear-gradient(135deg, #1a1a2e, #16213e);">
        <div class="text-[10px] uppercase tracking-widest text-[#667eea]">LLM &amp; GenAI</div>
        <h3 class="text-[15px] font-semibold mt-2">Knowledge-based LLM Tool</h3>
        <p class="text-xs text-text-secondary mt-2">OpenAI-powered report aggregation cutting daily report prep time by 1+ hour</p>
      </div>

      <!-- Card 8: CTR Optimization -->
      <div class="bento-card rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300 opacity-0"
           style="background: linear-gradient(135deg, #2e2e1a, #212116);">
        <div class="text-[10px] uppercase tracking-widest text-[#eaea66]">Machine Learning</div>
        <h3 class="text-[15px] font-semibold mt-2">AdTech CTR Optimization</h3>
        <p class="text-xs text-text-secondary mt-2">Improved click-through rate by 50% via refined feature selection and label granularity</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: add Featured Work section with bento grid cards"
```

---

### Task 7: Build Skills, Publications & Awards, Education, and Footer sections

**Files:**
- Modify: `index.html` (replace remaining section placeholders)

- [ ] **Step 1: Replace the skills section placeholder**

Replace `<section id="skills"></section>` with:

```html
<section id="skills" class="py-24 md:py-32 px-6">
  <div class="max-w-3xl mx-auto">
    <div class="section-label text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-3 opacity-0">Skills</div>
    <h2 class="section-title text-3xl md:text-4xl font-semibold mb-12 opacity-0">Technical Expertise</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 section-content opacity-0">
      <div>
        <h3 class="text-[13px] font-semibold mb-3">Programming</h3>
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">Python</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">SQL</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">TypeScript</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">Terraform</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">Java</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">PHP</span>
        </div>
      </div>
      <div>
        <h3 class="text-[13px] font-semibold mb-3">ML / AI</h3>
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">LLM &amp; GenAI</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">Transformer</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">RL (PPO)</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">GraphRAG</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">XGBoost</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">LSTM</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">VAE</span>
        </div>
      </div>
      <div>
        <h3 class="text-[13px] font-semibold mb-3">Infrastructure</h3>
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">Kubernetes</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">Ray &amp; Spark</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">AWS</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">gRPC</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">HiveSQL</span>
        </div>
      </div>
      <div>
        <h3 class="text-[13px] font-semibold mb-3">DevOps</h3>
        <div class="flex flex-wrap gap-2">
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">MLflow &amp; DVC</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">Neo4j</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">Docker &amp; CI/CD</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">FastAPI</span>
          <span class="px-3 py-1 bg-surface rounded-md text-[11px]">CDK8s</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Replace the publications section placeholder**

Replace `<section id="publications"></section>` with:

```html
<section id="publications" class="py-24 md:py-32 px-6">
  <div class="max-w-3xl mx-auto">
    <div class="section-label text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-3 opacity-0">Publications &amp; Awards</div>
    <h2 class="section-title text-3xl md:text-4xl font-semibold mb-12 opacity-0">Academic Contributions</h2>

    <div class="section-content space-y-0 opacity-0">
      <div class="flex justify-between items-baseline py-4 border-b border-white/[0.06]">
        <div class="text-[13px] pr-4">基於社群媒體的代表性新聞提取方法:以 3D 列印為例 — <span class="text-text-secondary">CCBDA 2016</span></div>
        <span class="text-[11px] text-text-secondary whitespace-nowrap">Publication</span>
      </div>
      <div class="flex justify-between items-baseline py-4 border-b border-white/[0.06]">
        <div class="text-[13px] pr-4">Mining Web Browsing Behavior on Tourism Sites in Taiwan — <span class="text-text-secondary">ACEAT 2014</span></div>
        <span class="text-[11px] text-text-secondary whitespace-nowrap">Publication</span>
      </div>
      <div class="flex justify-between items-baseline py-4 border-b border-white/[0.06]">
        <div class="text-[13px] pr-4">關聯式規則平行化效能比較之研究 — <span class="text-text-secondary">IMP 2013</span></div>
        <span class="text-[11px] text-text-secondary whitespace-nowrap">Publication</span>
      </div>
      <div class="flex justify-between items-baseline py-4 border-b border-white/[0.06]">
        <div class="text-[13px] pr-4">MapReduce 架構下循序樣本探勘演算法之效能分析 — <span class="text-text-secondary">TANET 2013</span></div>
        <span class="text-[11px] text-text-secondary whitespace-nowrap">Publication</span>
      </div>
      <div class="flex justify-between items-baseline py-4 border-b border-white/[0.06]">
        <div class="text-[13px] pr-4">102 學年度台中市大學模範生</div>
        <span class="text-[11px] text-text-secondary whitespace-nowrap">Award · 2014</span>
      </div>
      <div class="flex justify-between items-baseline py-4 border-b border-white/[0.06]">
        <div class="text-[13px] pr-4">103 學年度大專優秀青年</div>
        <span class="text-[11px] text-text-secondary whitespace-nowrap">Award · 2014</span>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Replace the education section placeholder**

Replace `<section id="education"></section>` with:

```html
<section id="education" class="py-24 md:py-32 px-6">
  <div class="max-w-3xl mx-auto">
    <div class="section-label text-[11px] uppercase tracking-[0.1em] text-text-secondary mb-3 opacity-0">Education</div>
    <h2 class="section-title text-3xl md:text-4xl font-semibold mb-12 opacity-0">Academic Journey</h2>

    <div class="section-content opacity-0">
      <!-- Timeline -->
      <div class="relative pl-6 border-l-2 border-white/10 space-y-10">
        <div class="relative">
          <div class="absolute -left-[calc(1.5rem+5px)] top-1 w-[10px] h-[10px] rounded-full bg-text-primary"></div>
          <h3 class="text-[15px] font-semibold">M.S. Computer Science &amp; Engineering</h3>
          <p class="text-xs text-text-secondary mt-1">National Chung Hsing University · 2014 — 2016</p>
        </div>
        <div class="relative">
          <div class="absolute -left-[calc(1.5rem+5px)] top-1 w-[10px] h-[10px] rounded-full bg-text-secondary"></div>
          <h3 class="text-[15px] font-semibold">B.S. Computer Science &amp; Information Engineering</h3>
          <p class="text-xs text-text-secondary mt-1">National Taichung University of Science and Technology · 2010 — 2014</p>
        </div>
      </div>

      <!-- School Projects (collapsible) -->
      <div class="mt-12">
        <button onclick="document.getElementById('school-projects').classList.toggle('hidden')" class="text-sm text-text-secondary hover:text-text-primary transition flex items-center gap-2">
          <span>School Research Projects</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div id="school-projects" class="hidden mt-4 space-y-3 pl-4 border-l border-white/[0.06]">
          <div class="text-xs text-text-secondary">
            <span class="text-text-primary font-medium">2013</span> — 大專學生研究計畫：網路惡意行為分析與防禦之研究 <span class="text-text-tertiary">(Ministry of Science and Technology)</span>
          </div>
          <div class="text-xs text-text-secondary">
            <span class="text-text-primary font-medium">2013</span> — 運用訊號源編碼技術提升雲端計算XML文件相似度比對及分群模式效能研究 <span class="text-text-tertiary">(MOST)</span>
          </div>
          <div class="text-xs text-text-secondary">
            <span class="text-text-primary font-medium">2014</span> — 資通訊技術趨勢追蹤系統之設計與開發 <span class="text-text-tertiary">(MOST)</span>
          </div>
          <div class="text-xs text-text-secondary">
            <span class="text-text-primary font-medium">2014</span> — 應用資料探勘技術分析大台灣旅遊網巨量資訊創新服務研發計畫 <span class="text-text-tertiary">(Collaboration)</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Replace the footer placeholder**

Replace `<footer id="footer"></footer>` with:

```html
<footer id="footer" class="py-12 px-6 text-center">
  <p class="text-[13px] text-text-secondary">&copy; 2026 Yueh-Chun Tsai</p>
  <div class="flex gap-6 justify-center mt-4">
    <a href="https://github.com/yuehchun" target="_blank" class="text-xs text-text-tertiary hover:text-text-primary transition">GitHub</a>
    <a href="https://www.linkedin.com/in/hugotsai" target="_blank" class="text-xs text-text-tertiary hover:text-text-primary transition">LinkedIn</a>
    <a href="mailto:birdtasi@gmail.com" class="text-xs text-text-tertiary hover:text-text-primary transition">Email</a>
  </div>
</footer>
```

- [ ] **Step 5: Verify all sections render correctly in browser**

Open http://localhost:8000 — all 7 sections + footer should be visible. Dark theme, proper spacing, cards clickable.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "feat: add Skills, Publications, Education, and Footer sections"
```

---

### Task 8: Build GSAP animations (animations.js)

**Files:**
- Create: `assets/js/animations.js`

- [ ] **Step 1: Create the animations.js file**

Write to `assets/js/animations.js`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // ── Hero Entrance (on page load) ──
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .to('#hero-avatar', {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    })
    .to('#hero-name', {
      opacity: 1,
      y: 0,
      duration: 0.6,
    }, '-=0.4')
    .to('#hero-title', {
      opacity: 1,
      duration: 0.5,
    }, '-=0.3')
    .to('#hero-links a', {
      opacity: 1,
      stagger: 0.1,
      duration: 0.4,
    }, '-=0.2');

  // ── Navbar show/hide on scroll ──
  const navbar = document.getElementById('navbar');
  const heroSection = document.getElementById('hero');

  ScrollTrigger.create({
    trigger: heroSection,
    start: 'bottom top',
    onEnterBack: () => gsap.to(navbar, { yPercent: -100, duration: 0.3 }),
    onLeave: () => gsap.to(navbar, { yPercent: 0, duration: 0.3 }),
  });

  // ── Active nav link tracking ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onToggle: ({ isActive }) => {
        if (isActive) {
          navLinks.forEach((link) => link.classList.remove('nav-link-active'));
          const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
          if (activeLink) activeLink.classList.add('nav-link-active');
        }
      },
    });
  });

  // ── Section reveal animations ──
  document.querySelectorAll('.section-label').forEach((label) => {
    gsap.from(label, {
      x: -20,
      opacity: 0,
      duration: 0.4,
      scrollTrigger: {
        trigger: label,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
    // Remove the initial opacity-0 once animated
    label.style.opacity = '';
  });

  document.querySelectorAll('.section-title').forEach((title) => {
    gsap.from(title, {
      clipPath: 'inset(0 100% 0 0)',
      opacity: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
    title.style.opacity = '';
  });

  document.querySelectorAll('.section-content').forEach((content) => {
    gsap.from(content, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.2,
      scrollTrigger: {
        trigger: content,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
    content.style.opacity = '';
  });

  // ── Experience cards stagger ──
  gsap.from('.exp-card', {
    y: 30,
    opacity: 0,
    stagger: 0.15,
    duration: 0.5,
    scrollTrigger: {
      trigger: '#experience',
      start: 'top 60%',
      toggleActions: 'play none none none',
    },
  });

  // ── Bento grid cards stagger ──
  gsap.from('.bento-card', {
    scale: 0.9,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5,
    scrollTrigger: {
      trigger: '#work',
      start: 'top 60%',
      toggleActions: 'play none none none',
    },
  });

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('nav-toggle');
  const navMobile = document.getElementById('nav-mobile');
  const navClose = document.getElementById('nav-close');

  if (navToggle && navMobile && navClose) {
    navToggle.addEventListener('click', () => navMobile.classList.remove('hidden'));
    navClose.addEventListener('click', () => navMobile.classList.add('hidden'));
    navMobile.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => navMobile.classList.add('hidden'));
    });
  }
});
```

- [ ] **Step 2: Verify animations work in browser**

Open http://localhost:8000 — Hero should animate in on load. Scroll down to see sections fade/slide in. Navbar should appear after scrolling past hero. Active nav link should highlight.

- [ ] **Step 3: Commit**

```bash
git add assets/js/animations.js
git commit -m "feat: add GSAP ScrollTrigger animations for all sections"
```

---

### Task 9: Responsive polish and final testing

**Files:**
- Modify: `index.html` (minor responsive tweaks if needed)

- [ ] **Step 1: Test at all breakpoints**

Open http://localhost:8000 and test at these widths using browser DevTools:
- 375px (iPhone SE) — single column, hamburger nav, hero text smaller
- 640px (sm) — still single column
- 768px (md) — bento 2-col, skills 2-col, nav links visible
- 1024px (lg) — full layout, max-width container
- 1440px (xl) — centered, no content stretching

Check for:
- Text overflow / wrapping issues
- Card padding on mobile
- Hamburger menu open/close
- Scroll animations still trigger correctly
- No horizontal scrollbar

- [ ] **Step 2: Fix any responsive issues found**

Apply fixes directly in `index.html` using Tailwind responsive prefixes (e.g., `md:text-4xl`, `sm:grid-cols-1`).

- [ ] **Step 3: Update .gitignore to include archive folder patterns if needed**

Verify `.gitignore` includes:
```
.claude/
.superpowers/
```

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete Apple-style portfolio redesign with responsive polish"
```

- [ ] **Step 5: Verify deployment readiness**

Confirm the site works by opening `index.html` directly in a browser (file:// protocol should work since there's no dynamic content loading anymore — all content is inline).
