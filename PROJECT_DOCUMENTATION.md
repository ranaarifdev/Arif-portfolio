# Muhammad Arif Portfolio - Project Documentation

## 1. Project purpose

This repository is a single-page professional portfolio for **Muhammad Arif (Rana Arif)**, a BS Cyber Security student at Emerson University Multan. It presents his focus on mobile application security, Android security research, malware analysis, network security, ethical hacking, and secure software development.

The site is intentionally static. It can be opened locally in a browser or hosted directly on GitHub Pages without a server, database, package manager, or build step.

## 2. Technology stack

| Area | Technology |
|---|---|
| Page structure | HTML5 |
| Styling and layout | CSS3, CSS Grid, Flexbox, custom properties, media queries |
| Interactions | Vanilla JavaScript (no framework) |
| Icons | Font Awesome 6.5.0 CDN |
| Fonts | Inter and Outfit from Google Fonts |
| Optional email delivery | EmailJS browser SDK |
| Local validation | Python standard-library scripts and Node.js syntax check |
| Hosting target | GitHub Pages or any static web host |

## 3. Repository structure

```text
My port filo/
|-- index.html                         Main page, portfolio content, metadata, and modals
|-- style.css                          Theme, layout, animations, responsive rules, and accessibility styles
|-- script.js                          All browser-side interactions
|-- cert-list.js                       Certificate image registry and optional certificate metadata
|-- PROJECT_DOCUMENTATION.md           This documentation
|-- rana.jpg                           Original profile photograph and site icon/social preview image
|-- cert-*.jpg / cert-*.jpeg / cert-*.png
|-- business_process-1.png             Certificate images
|-- sap_business_analyst-1.png
|-- strategic_analysis-1.png
`-- tools/
    |-- validate_all.py                Combined HTML/CSS/certificate reference validator
    |-- check_img_exists.py            Image-reference validator
    |-- check_cert_descriptions.py     Static certificate-description validator
    |-- find_image_duplicates.py       SHA-256 duplicate image detector
    `-- list_images.py                 Lists root-level image assets as JSON
```

## 4. Runtime files and responsibilities

### `index.html`

`index.html` contains the complete page markup and static content. It also contains:

- SEO and social metadata, including description, keywords, Open Graph, and Twitter image metadata.
- A small early theme script that applies the saved or preferred color theme before the page paints.
- The responsive navigation, hero, portfolio sections, contact form, certificate modal, and project modal.
- Relative paths for all local assets, which keeps the project safe for GitHub Pages hosting.
- CDN links for Google Fonts, Font Awesome, and the optional EmailJS SDK.

### `style.css`

`style.css` defines the dark and light themes, reusable components, page sections, responsive behavior, and motion rules. It includes:

- CSS custom properties for colors, spacing, shadows, radii, timing, and container widths.
- A glass-style sticky navigation bar, cyber-themed background, cards, buttons, chips, tabs, filters, modals, and toast notifications.
- Desktop, tablet, and mobile media queries.
- `prefers-reduced-motion` handling to reduce animations for users who request it.
- Visible keyboard-focus styling via `:focus-visible`.
- Hover pointer effects only for devices with a fine pointer.
- Original-color profile photos. The former hue-rotation filters were removed from the profile and About photo frames so `rana.jpg` keeps its natural colors.

### `script.js`

`script.js` runs after `DOMContentLoaded`. It is written defensively: optional elements are checked before use, storage access is protected with `try/catch`, and `Element.animate()` is only used when supported.

It provides:

1. System-theme detection through `prefers-color-scheme`, including live updates when the device theme changes.
2. Call and Gmail header actions.
3. The hero typewriter role sequence.
4. Smooth internal-anchor scrolling with sticky-navigation offset.
5. Mobile menu open/close behavior, outside-click close, Escape close, and keyboard operation with Enter/Space.
6. Scroll progress, sticky-nav state, and Back to Top visibility.
7. IntersectionObserver reveal animations and active navigation highlighting.
8. Desktop-only cursor glow, hero parallax, card tilt, and button magnetic movement.
9. Contact form validation, toast messages, optional EmailJS delivery, and a `mailto:` fallback.
10. Copy-to-clipboard buttons for email and phone, including a legacy-copy fallback.
11. Automatic Font Awesome icon injection for selected existing cards.
12. Skill filtering.
13. Certificate enhancement, category filtering, search, result count, modal preview, next/previous controls, keyboard control, and touch swipe navigation.
14. Animated statistics for certificate and project totals.
15. Project-card enhancement and a project-details modal.
16. Automatic footer year update.

### `cert-list.js`

`cert-list.js` exposes two globals:

- `window.ADDED_CERTS`: 39 root-relative certificate image filenames.
- `window.ADDED_CERT_DETAILS`: supplemental title, description, and category data for four certificate filenames.

At page load, `script.js` compares the registry with the images already rendered in the certification section. An image is added only when it is not already rendered. At present, all 39 registry images are already represented by static certificate cards, so no duplicate cards are added.

Note: `tools/validate_all.py` reports **41 quoted image references** in `cert-list.js`. This is expected because its regular expression counts the 39 array entries plus the two image-file keys in `window.ADDED_CERT_DETAILS`; the actual registry contains 39 entries.

## 5. Page content

### Navigation and hero

The fixed navigation links to About, Skills, Tools, Projects, Education, Certifications, Goals, and Contact. It includes:

- Dark/light theme toggle.
- Desktop Gmail and Call buttons.
- A mobile menu with Gmail and Call actions.
- A keyboard-operable hamburger control that exposes its expanded state to assistive technology.

The hero presents the profile image, portfolio name, professional focus, animated role text, contact chips, and links to Projects, Contact, GitHub, and LinkedIn. The profile image uses the original `rana.jpg` file without CSS color filters.

### About

The About section describes the portfolio owner as a BS Cyber Security student (2023-2027) with a target role of Mobile Application Security Engineer / Android Security Researcher. It covers academic focus, Android research, static and dynamic APK analysis, malware indicators, network protocols, reverse engineering, certification work, and practical security projects.

It also lists education, location, core focus, target role, and ten technical-interest tags.

### Skills

There are **20 skill cards**, each assigned one or more filter categories:

- Cybersecurity
- Network Security
- Mobile Application Security
- Android Security
- Android Malware Analysis
- Vulnerability Assessment
- Penetration Testing
- Static & Dynamic APK Analysis
- Network Traffic Analysis
- Security Testing
- Threat Analysis
- Security Risk Assessment
- Technical Documentation & Reporting
- Git & GitHub
- Linux & Windows
- System Configuration & Firewall Configuration
- Networking Troubleshooting
- Cisco Packet Tracer
- MS Word & Excel
- Communication & Teamwork

Available filters are All, Cybersecurity, Networking, Mobile Security, Testing, Tools, and Professional. A technology strip below the cards summarizes the stack and is duplicated at runtime for a desktop animation.

### Tools and libraries

There are **8 tool cards**:

1. MobSF
2. Wireshark
3. KFSensor
4. Nmap / Zenmap
5. Hydra
6. Android Emulator / AVD
7. Cisco Packet Tracer
8. Kali Linux

### Projects

There are **10 project cards**. JavaScript adds a visual icon, status badge, description, technology chips, and a details action based on each card's data attributes.

| Project | Category | Status |
|---|---|---|
| Attendance, Quiz & Assignment Status | Academic Tool | Completed / Practice |
| CGPA Calculator | Student Utility | Completed / Practice |
| Roll Number Slip Generator | Automation | Completed / Practice |
| Date Sheet System | Automation | Completed / Practice |
| Honey Pot System | Cybersecurity | Completed / Practice |
| MobSF Mobile Security Analysis | Mobile Security | Completed / Practice |
| Network Scanning Labs | Network Security | Completed / Practice |
| Penetration Testing Labs | Cybersecurity | Completed / Practice |
| Cisco Packet Tracer Network Designs | Networking | Completed / Practice |
| Spyware Detector | Final Year Project | In Progress |

Project cards use `data-title`, `data-desc`, `data-skills`, and optional `data-github` / `data-demo` attributes. The current cards do not supply GitHub or demo URLs, so the script does not invent any external project links.

### Education, goals, languages, and contact

- Education: BS Cyber Security, FSc Pre-Medical, and Matric Science.
- Career goals: mobile application security engineering, Android security research, malware analysis, and application-security research.
- Languages: Urdu (Native), Punjabi (Fluent), English (Intermediate).
- Contact: email, phone, Multan location, GitHub, LinkedIn, contact form, and copy buttons.

## 6. Certifications and assets

### Counts

| Item | Count |
|---|---:|
| Static certificate cards in `index.html` | 39 |
| Entries in `window.ADDED_CERTS` | 39 |
| Certificate image files | 39 |
| Profile image files | 1 |
| Root-level image files | 40 |
| Duplicate images detected by SHA-256 | 0 |

### Certificate categories

The filter tabs are All, Cybersecurity, Networking, and IT & Gen Tech.

- Cybersecurity: 19 cards.
- Networking: 7 cards.
- IT & Gen Tech: 13 cards.

### Certificate catalog

**Cybersecurity**

1. Enterprise System Management and Security
2. Certified Ethical Hacker (CEH): Unit 1
3. Certified Ethical Hacker (CEH): Unit 2
4. Certified Ethical Hacker (CEH) v12 Specialization
5. Introduction to Ethical Hacking and Recon Techniques
6. Cyber Threat Management
7. Foundations of Cybersecurity
8. Play It Safe: Manage Security Risks
9. Connect and Protect: Networks and Network Security
10. Introduction to Computers, Operating Systems and Security
11. Introduction to Cybersecurity (Cisco)
12. Introduction to Cybersecurity - Student Level
13. Introduction to Penetration Testing
14. Mental Health in Cybersecurity
15. System Hacking, Malware Threats, and Network Attacks
16. Network Monitoring and Analysis
17. Google Network Security Specialization
18. Network Traffic and Logs Using IDS and SIEM Tools
19. Windows Server Management and Security

**Networking**

1. Introduction to Networking and Cloud Computing
2. CCNA: Networking Basics, Switching, Addressing, and Routing
3. Introduction to Network Analysis
4. Network Architecture Fundamentals
5. Overview of Important Protocols
6. CCNA Expert - Network Automation, Cloud, and Emerging Technologies
7. Network Fundamentals Specialization

**IT & Gen Tech**

1. IoT for Everyone
2. Introduction to IoT and Digital Transformation
3. Introduction to IoT - Student Level
4. Foundations: Data, Data, Everywhere
5. Foundations of Business Analysis
6. Business Process Modeling and Analysis
7. SAP Business Analyst Professional Certificate
8. Strategic Analysis and Solution Design
9. Introduction to Computers
10. Work Smarter with Microsoft Word
11. Introduction to Virtual Machines
12. The Complete Artificial Intelligence (AI) for Professionals
13. How to Write a Research Paper

### Certificate behavior

Every certificate card has a title, description, image, category badge, and View Certificate button. Where `data-verify` is present, the script adds a Verify Credential link. The modal supports:

- Mouse or keyboard opening from an image or View Certificate action.
- Enter to open a focused image.
- Escape to close.
- Left and Right Arrow keys for previous/next navigation.
- Previous and Next buttons.
- Horizontal touch swipes on mobile.
- Focus return to the element that opened the modal.

### Certificate image inventory

The certificate image registry contains:

```text
business_process-1.png
cert-business-analysis-foundations.png
cert-ccna-basic.jpg
cert-ccna-network-automation.png
cert-ceh-unit-2.png
cert-ceh-v12-specialization.png
cert-ceh.jpg
cert-computers-operating-systems-security.png
cert-coursera-iot.jpg
cert-cyber-threat-management.jpeg
cert-cybersecurity1.jpg
cert-cybersecurity2.jpg
cert-enterprise-system-management-security.jpg
cert-ethical-hacking.jpg
cert-foundation-cybersecurity.jpeg
cert-google-data-foundation.jpg
cert-google-network-security-specialization.jpg
cert-how-to-write-research-paper.jpg
cert-important-network-protocols.png
cert-iot1.jpg
cert-iot2.jpg
cert-manage-security-risks.png
cert-mentalhealth.jpg
cert-microsoft-computer.jpg
cert-microsoft-networking-cloud.jpg
cert-microsoft-word.jpg
cert-network-architecture.jpeg
cert-network-fundamentals-specialization.png
cert-network-monitoring-analysis.jpg
cert-network-security.png
cert-network-traffic-logs-ids-siem.jpg
cert-network.jpg
cert-penetration.jpg
cert-system-analysis.jpg
cert-udemy-ai-professionals.jpg
cert-virtualmachines.jpg
cert-windows-server-management-security.jpg
sap_business_analyst-1.png
strategic_analysis-1.png
```

## 7. User interaction and accessibility

The site includes the following accessibility and usability support:

- Semantic landmarks: navigation, header, sections, aside navigation, form, and footer.
- Descriptive `alt` text for the profile and certificate images.
- `aria-label`, `aria-live`, `aria-expanded`, and `aria-controls` where needed.
- Keyboard-operable header actions, mobile menu, certificate images, certificate modal controls, project cards, and Back to Top button.
- Focus restoration after closing either modal.
- Visible focus rings.
- Reduced-motion fallback.
- Responsive layouts and large mobile touch targets.
- Safe external links with `target="_blank"` and `rel="noopener noreferrer"`.

## 8. Themes, styling, and motion

The site uses the visitor's operating-system light/dark preference by default through `prefers-color-scheme`. The palette is controlled by custom properties in `:root` and `[data-theme="light"]`. The theme button changes the appearance for the current visit; a refresh returns to the system preference.

Visual features include:

- Sticky translucent navigation.
- Background grid, color blobs, hero network, particles, and decorative orbits.
- Responsive card grids and section reveal effects.
- Button, chip, and card hover effects on desktop-class pointers.
- Certificate and project modal transitions.
- Scroll progress bar and Back to Top button.
- Original-color profile image: the source photograph is not hue-rotated or recolored.

## 9. Contact form and EmailJS configuration

The form validates name, email, and message in the browser. It has three configuration constants near the contact-form section of `script.js`:

```js
const PUBLIC_KEY = '';
const SERVICE_ID = '';
const TEMPLATE_ID = '';
```

All values are intentionally blank in the current project. Therefore, a valid submission opens the visitor's configured email client with a prefilled email to the portfolio owner. The site does not claim that the message has been delivered through EmailJS.

To enable EmailJS, add valid public EmailJS values to those three constants and configure the EmailJS template to receive `from_name`, `from_email`, and `message`. Do not commit private keys or sensitive credentials to this repository.

## 10. Local validation tools

Run these commands from the repository root in PowerShell:

```powershell
node --check script.js
python tools\validate_all.py
python tools\check_img_exists.py
python tools\check_cert_descriptions.py
python tools\find_image_duplicates.py
python tools\list_images.py
```

### What each tool checks

| Command | Validation |
|---|---|
| `node --check script.js` | JavaScript syntax only |
| `validate_all.py` | HTML image paths, internal anchor targets, CSS brace balance, and quoted image references in `cert-list.js` |
| `check_img_exists.py` | Image paths referenced by HTML and the certificate registry |
| `check_cert_descriptions.py` | Static certificate cards have both headings and descriptions |
| `find_image_duplicates.py` | Exact duplicate image bytes using SHA-256 |
| `list_images.py` | Root-level image filenames as JSON |

### Latest validation result

The current project passes all included static checks:

- JavaScript syntax: valid.
- Referenced local images: all present.
- Internal anchor targets: present.
- CSS braces: balanced.
- Certificate descriptions: present.
- Exact duplicate images: none.

These checks do not replace visual browser testing. After a UI change, also test the site at approximately 320px, 360px, 390px, 412px, 480px, 768px, 1024px, 1366px, and 1440px widths.

## 11. Deployment

The project is ready for GitHub Pages because all project assets use relative paths and there is no server-side dependency.

1. Push the repository to GitHub.
2. In GitHub, open **Settings > Pages**.
3. Select the branch and repository root as the publishing source.
4. Save and wait for GitHub Pages to publish.
5. Open the published URL and test navigation, theme switching, certificate filtering, modals, and the contact fallback.

For another static host, upload the repository files without changing their relative folder structure.

## 12. Maintenance guide

### Adding or replacing a certificate

1. Add the image to the repository root with a descriptive filename.
2. Prefer adding a complete static certificate card in `index.html` with title, description, category, image `alt` text, and a `data-verify` URL when one exists.
3. Add the image filename to `window.ADDED_CERTS` in `cert-list.js` if it is not already represented in the registry.
4. For generated cards, add a `window.ADDED_CERT_DETAILS` entry with `title`, `description`, and `category`.
5. Run the validation commands in section 10.
6. Confirm filters, search, count, image preview, keyboard navigation, and mobile swipe behavior in a browser.

### Adding a project

1. Add a `.project-card.clickable` element in the Projects grid.
2. Supply `data-title`, `data-desc`, and comma-separated `data-skills`.
3. Add `active-project` when the project is in progress.
4. Only add `data-github` or `data-demo` when a real public URL exists.
5. Confirm the project details modal and keyboard operation.

### Updating theme or photo styling

- Keep profile image colors original. Do not apply `filter`, `hue-rotate`, `mix-blend-mode`, or color-overlay effects to `.profile-frame`, `.profile-pic`, `.about-photo-frame`, or `.about-photo-frame img`.
- Decorative borders, shadows, and orbit effects can be changed as long as they do not recolor the photograph.

### Before publishing changes

- Run the validation commands.
- Test all navigation links and mobile menu behavior.
- Test both themes.
- Test skill filters and certificate filters/search.
- Test certificate and project modals with mouse, keyboard, and a mobile viewport.
- Test the contact form's validation and mail fallback.
- Confirm no unrelated image assets were removed or recolored.

## 13. Current limitations

- Google Fonts, Font Awesome, and EmailJS load from external CDNs. Fonts and icons can fall back if a visitor is offline or a CDN is blocked.
- EmailJS is not configured, so contact submissions use the visitor's mail application.
- Validation is static and does not perform a full browser-based visual or interaction test.
- Certificate data appears both in static HTML and in `cert-list.js`; additions must keep both locations synchronized when the card is rendered statically.
