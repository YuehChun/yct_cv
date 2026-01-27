# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal portfolio/CV website for Yueh-Chun (Hugo) Tsai, built as a static HTML site with Bootstrap 3. The site showcases professional experience, skills, projects, and academic background in a modern single-page application format.

## Architecture

**Static HTML Structure**: The site uses a modular HTML approach where `index.html` serves as the main container and dynamically loads content sections via jQuery:
- Main sections are loaded from separate HTML files (`aboutMe.html`, `mySkill.html`, `myPaper.html`, `myAwards.html`, `myWork.html`)
- Content is injected into placeholder divs with matching IDs
- This separation allows for easier content updates without modifying the main layout

**Key Components**:
- `index.html` - Main entry point with hero section, timeline, and dynamic content placeholders
- `index2.html` - Alternative layout/version
- `components.html` - UI component showcase/reference
- Content modules: `aboutMe.html`, `mySkill.html`, `myWork.html`, `myExperience.html`, `myProjects.html`, `myPaper.html`, `myAwards.html`
- `HugoTsai.tech-algo.tex` - LaTeX resume focused on ML/AI engineering experience

**Styling**:
- Bootstrap 3 framework (`bootstrap3/`)
- Custom theme: "Get Shit Done" (`assets/css/get-shit-done.css`)
- Custom styles in `assets/css/my.css`
- SCSS source files in `scss/` and `partials/`
- Timeline component styles in `timeline/vertical-timeline/`

**JavaScript Dependencies**:
- jQuery 1.10.2 (`jquery/jquery-1.10.2.js`)
- jQuery UI (`assets/js/jquery-ui-1.10.4.custom.min.js`)
- Bootstrap 3 JS (`bootstrap3/js/bootstrap.js`)
- Custom theme scripts (`assets/js/get-shit-done.js`)
- GSDK components for enhanced UI (`assets/js/gsdk-checkbox.js`, `gsdk-radio.js`, `gsdk-bootstrapswitch.js`)

## Resume Formats

Two primary resume versions are maintained:

1. **Web Version** (`index.html` + modules): Interactive HTML portfolio with timeline, collapsible sections, and dynamic content loading
2. **LaTeX Version** (`HugoTsai.tech-algo.tex`): Formal resume for ML/AI engineering roles, emphasizing technical expertise in MLOps, LLMs, and quantitative finance

When updating professional experience or skills, both versions should be kept in sync.

## Development Workflow

**Making Content Changes**:
- Edit individual HTML module files for section-specific updates
- Update `HugoTsai.tech-algo.tex` for resume content changes
- LaTeX compilation: `pdflatex HugoTsai.tech-algo.tex` (requires LaTeX distribution)

**Testing Locally**:
- Open `index.html` in a browser
- Note: Dynamic content loading via jQuery requires serving from a web server (not file:// protocol) due to CORS restrictions
- Simple local server: `python -m http.server 8000` or `python3 -m http.server 8000`

**Styling Changes**:
- Modify SCSS files in `scss/` and `partials/`
- Compile SCSS to CSS (requires SASS compiler): `sass scss/style.scss assets/css/style.css`
- Direct CSS edits can be made to `assets/css/my.css` for quick customization

## File Organization

```
/
├── index.html              # Main landing page
├── index2.html             # Alternative layout
├── components.html         # UI component reference
├── HugoTsai.tech-algo.tex  # LaTeX resume
├── aboutMe.html            # About section module
├── mySkill.html            # Skills showcase module
├── myWork.html             # Work experience module
├── myExperience.html       # Experience timeline module
├── myProjects.html         # Projects module
├── myPaper.html            # Publications module
├── myAwards.html           # Awards module
├── bootstrap3/             # Bootstrap 3 framework
├── assets/
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   └── img/                # Images and photos
├── jquery/                 # jQuery library
├── scss/                   # SCSS source files
├── partials/               # SCSS partials
└── timeline/               # Timeline component
```

## Content Update Guidelines

**Professional Experience**: Timeline in `index.html` (lines 201-365) and LaTeX resume should reflect the same positions and dates

**Skills**: Technical skills are displayed in `mySkill.html` with star ratings. LaTeX resume technical skills section should align with web version

**Projects and Publications**: Collapsible panels in `index.html` (lines 83-162) use Bootstrap collapse component. Each project requires:
- Unique panel heading ID
- Corresponding collapse div with matching data-target
- Year label and project type label (color-coded)
