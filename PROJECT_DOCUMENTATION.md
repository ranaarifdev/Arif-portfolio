# Muhammad Arif Portfolio Documentation

## Project Overview

This is a static GitHub Pages compatible portfolio for Muhammad Arif / Rana Arif, a BS Cyber Security student focused on Mobile Application Security, Android Security Research, cybersecurity, networking, and software development.

The project is intentionally built with plain HTML, CSS, and JavaScript so it can run directly from GitHub Pages without a backend, build step, database, or server-only feature.

## Folder and File Structure

```text
My port filo/
|-- index.html
|-- style.css
|-- script.js
|-- cert-list.js
|-- rana.jpg
|-- cert-*.jpg / cert-*.jpeg / cert-*.png
|-- business_process-1.png
|-- sap_business_analyst-1.png
|-- strategic_analysis-1.png
|-- tools/
|   |-- check_cert_descriptions.py
|   |-- check_img_exists.py
|   |-- find_image_duplicates.py
|   `-- list_images.py
`-- PROJECT_DOCUMENTATION.md
```

## Main Features

- Premium dark/light cybersecurity portfolio theme.
- Sticky glass navigation with active section highlighting.
- Mobile hamburger navigation.
- Scroll progress indicator.
- Animated hero section with profile image, typewriter text, particles, grid, and CTA buttons.
- About, Skills, Tools, Projects, Education, Certifications, Goals, Languages, and Contact sections.
- Responsive cards and grids for desktop, tablet, and mobile.
- Certificate filtering, searching, dynamic count, and modal preview.
- Project detail modal.
- Back-to-top button.
- Contact form with validation and safe mail fallback.
- Reduced-motion support for accessibility and performance.

## Sections

- Hero: profile image, name, primary role, animated typing roles, contact chips, GitHub/LinkedIn/Project/Contact CTAs.
- About: complete profile summary, highlighted cybersecurity keywords, interest tags, education/location/focus/goal cards.
- Core Skills: 20 skill cards with filters.
- Tools & Libraries: 8 tool cards.
- Projects: 10 existing project cards with modal details.
- Education: BS Cyber Security, FSc Pre-Medical, and Matric Science.
- Certifications: static and dynamic certificate cards with category filtering and search.
- Career Goals: primary goal, career path, and long-term vision.
- Languages: Urdu, Punjabi, English.
- Contact: email, phone, location, GitHub, LinkedIn, form, copy buttons.

## Animations and Effects

Animations are implemented with CSS and lightweight JavaScript:

- CSS keyframes for hero entrance, floating profile image, grid drift, particles, profile orbit, modal transitions, and counters.
- `IntersectionObserver` reveals sections and staggered items when they enter the viewport.
- Desktop-only pointer effects include card tilt, cursor glow, and subtle magnetic movement.
- Mobile and reduced-motion users receive simpler animations for better performance.

Reusable animation classes include:

- `.reveal`
- `.fade-up`
- `.fade-down`
- `.fade-left`
- `.fade-right`
- `.slide-left`
- `.slide-right`
- `.scale-in`
- `.zoom-in`
- `.blur-in`
- `.rotate-in`
- `.stagger-item`

## Responsive Design

The layout uses CSS Grid, Flexbox, `clamp()`, responsive container widths, and media queries.

Important responsive behavior:

- Desktop navigation uses horizontal links.
- Mobile navigation uses a hamburger menu with large touch targets.
- Skills, Tools, Projects, Certifications, Contact, and Education collapse into single-column layouts on smaller screens.
- Expensive hover, cursor, and 3D effects are disabled or simplified on touch/mobile devices.
- Modals are constrained to viewport size and controls remain reachable on mobile.
- Back-to-top button uses safe bottom spacing to avoid covering content.

## Certificates System

Certificate data is preserved in two places:

- `index.html`: 39 static certificate cards with direct verification links.
- `cert-list.js`: 39 certificate image filenames tracked in `window.ADDED_CERTS`.

At runtime, `script.js` checks `window.ADDED_CERTS` and only adds a certificate image if it is not already rendered in the HTML. This protects against missing certificate files while avoiding duplicate visible cards for certificates already present.

Features:

- Category filters: All, Cybersecurity, Networking, IT & Gen Tech.
- Search by certificate text/category metadata.
- Dynamic count: `Showing X of Y certificates`.
- Modal/lightbox preview with next/previous controls.
- Direct external credential verification via `data-verify` on cards and modal.
- Keyboard support: Enter on focused certificate image, Escape to close, arrow keys for navigation.
- Mobile swipe support for previous/next certificate navigation.

Important certificate assets:

- `cert-enterprise-system-management-security.jpg` (University of Colorado System / Coursera)
- `cert-microsoft-networking-cloud.jpg` (Microsoft / Coursera)
- `cert-virtualmachines.jpg`
- `cert-ethical-hacking.jpg`
- `cert-ceh.jpg`
- `cert-network-security.png`
- `cert-google-network-security-specialization.jpg`
- `business_process-1.png`
- `sap_business_analyst-1.png`
- `strategic_analysis-1.png`

Note: `cert-penetrationtesting.jpg` was confirmed to be an exact duplicate of `cert-virtualmachines.jpg` by SHA-256 hash. The duplicate file and its registry reference were removed, while the valid `cert-virtualmachines.jpg` certificate remains available.

## Projects System

Projects are stored as existing `.project-card` elements in `index.html`. JavaScript enriches them at runtime by adding:

- Project visual icon.
- Status badge.
- Summary paragraph where needed.
- Technology chips.
- View Details action.
- GitHub/demo buttons only when existing data attributes provide links.

The project modal uses existing card data attributes such as:

- `data-title`
- `data-desc`
- `data-skills`
- `data-github`
- `data-demo`

No project URLs are invented.

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Font Awesome icons from CDN
- Google Fonts from CDN
- Optional EmailJS browser SDK from CDN
- Python utility scripts for local validation

## CSS Architecture

`style.css` is organized around:

- Theme variables in `:root` and `[data-theme="light"]`.
- Layout primitives such as `.container`, `.section`, `.card`, `.btn`.
- Section-specific styling for Hero, About, Skills, Tools, Projects, Education, Certifications, Goals, Contact, and Footer.
- Reusable animation classes.
- Responsive media queries for desktop, tablet, and mobile.
- `prefers-reduced-motion` rules.

Recent safety improvements include unified Skills/Tools icon sizing:

- `.skill-icon`
- `.card-icon`
- `.skill-icon i`
- `.skill-icon svg`
- `.card-icon i`
- `.card-icon svg`

Recent visual polish also includes:

- Safer global text wrapping for long labels, links, and certificate metadata.
- Improved section heading, card heading, paragraph, certificate, and project text sizing.
- Normalized icon alignment for navigation, theme/menu controls, buttons, Skills, Tools, Projects, Contact, Footer, and modal controls.
- Mobile typography and spacing refinements for cards, filters, badges, contact rows, and project visuals.

## JavaScript Architecture

`script.js` runs after `DOMContentLoaded` and controls:

- Theme toggle and localStorage persistence.
- Hero typewriter text.
- Smooth anchor scrolling.
- Mobile nav close behavior.
- Scroll progress and back-to-top visibility.
- Reveal animations via `IntersectionObserver`.
- Active navigation section tracking.
- Desktop cursor/card pointer effects.
- Contact validation and mail fallback.
- Copy email/phone actions.
- Tool/card icon injection without changing card content.
- Skill filters.
- Certificate rendering, filtering, searching, counting, and modal preview.
- Animated statistics.
- Project card enhancement and project modal.

Runtime hardening added:

- Safe localStorage wrapper for private/restricted browser modes.
- Guarded `Element.animate()` calls for older mobile browsers.

## GitHub Pages Deployment

This project is GitHub Pages safe because:

- It uses static files only.
- Asset paths are relative.
- There is no build step.
- There is no backend dependency.
- Contact form falls back to `mailto:` if EmailJS keys are not configured.

Typical deployment:

1. Push the repository to GitHub.
2. Enable GitHub Pages for the repository.
3. Serve from the repository root or selected Pages branch.
4. Open the published GitHub Pages URL.

## Important Asset Paths

- Main page: `index.html`
- Main stylesheet: `style.css`
- Main script: `script.js`
- Extra certificate image registry: `cert-list.js`
- Profile image/favicon/social image: `rana.jpg`
- Certificate images: project root, mostly `cert-*`
- Validation tools: `tools/`

## Testing and Validation Performed

Commands run:

```powershell
node --check script.js
python tools\check_img_exists.py
python tools\check_cert_descriptions.py
python tools\find_image_duplicates.py
```

Additional static checks performed:

- Duplicate HTML ID check.
- Local image and anchor reference check.
- Certificate card count.
- Project card count.
- Skill card count.
- Tool card count.
- Referenced image count.
- Unreferenced image check.

Results:

- JavaScript syntax: OK.
- Local references: 0 missing local references.
- Duplicate IDs: none.
- Static certificate cards: 39.
- `window.ADDED_CERTS` image registry: 39 filenames.
- Project cards: 10.
- Skill cards: 20.
- Tool cards: 8.
- Image files: 36.
- Referenced images: 36.
- Unreferenced images: none.
- Certificate descriptions: present.

## Fixes Made

- Hardened theme storage so localStorage restrictions do not crash the site.
- Guarded animation calls so missing `Element.animate()` support does not crash filters on older browsers.
- Rechecked and refined typography, line-height, card spacing, icon centering, mobile labels, project icons, contact icons, and responsive spacing.
- Removed the confirmed duplicate `cert-penetrationtesting.jpg` after verifying it matched `cert-virtualmachines.jpg` by SHA-256 hash, then removed its stale registry reference.
- Preserved all certificates, certificate images, profile data, projects, links, and assets.
- Kept GitHub Pages compatibility intact.

Previous visual/configuration improvements in this project include:

- Premium responsive theme.
- Hero animation system.
- Section reveal animations.
- Sticky responsive navigation.
- Certificate search/filter/modal system.
- Project modal system.
- Mobile spacing fixes for Skills, Tools, and Projects.
- Normalized Skills and Tools icon boxes.

## Known Limitations

- External CDN resources are required for Google Fonts, Font Awesome, and optional EmailJS. If a visitor is offline or a CDN is blocked, fonts/icons may fall back or EmailJS may be unavailable.
- EmailJS keys are intentionally blank, so the contact form safely opens the visitor's email client instead of pretending to send a message.
- Live browser testing with Playwright was not completed because no project dependency setup exists and `npx` was not available through PowerShell policy/cached tooling during this audit.
- No unreferenced image files remain after removing the confirmed duplicate `cert-penetrationtesting.jpg`.

## Maintenance Instructions

- Do not delete certificate images unless you first confirm they are not referenced in `index.html` or `cert-list.js`.
- When adding a certificate, add the image file to the project root and update either the Certifications HTML or `cert-list.js`.
- When adding certificate metadata, include title, issuer/platform, date, credential ID where available, and category.
- Keep asset filenames case-sensitive and relative for GitHub Pages.
- Run validation after edits:

```powershell
node --check script.js
python tools\check_img_exists.py
python tools\check_cert_descriptions.py
python tools\find_image_duplicates.py
```

- Test manually after visual changes:
  - Navigation and active states.
  - Mobile hamburger menu.
  - Theme toggle.
  - Skills filters.
  - Certificate filters/search/count/modal.
  - Project details modal.
  - Contact form validation and mail fallback.
  - Mobile widths around 320px, 360px, 390px, 412px, 480px.
  - Tablet/desktop widths around 768px, 1024px, 1366px, 1440px.
