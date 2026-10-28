# Shop Hijri — Interactive Three-Theme Homepage Comparison Prototype

An interactive, multi-theme homepage prototype for **Shop Hijri** (`https://shophijri.com/`), presenting three distinct Shopify theme design directions in a single self-contained application:

1. **Option 1: Horizon (Shopify Free Theme)** — Modern, flexible, modular, and conversion-focused.
2. **Option 2: Prestige (Maestrooo Paid Theme • $380 USD)** — High-end luxury, immersive full-bleed imagery, floating glassmorphic panels, and refined editorial pacing.
3. **Option 3: Publisher (Shopify Free Theme)** — Avant-garde independent publishing aesthetic, asymmetrical display typography, bookshop catalogue merchandising, and literary indexing.

---

## 1. Interactive Theme Switcher

The prototype features a persistent, accessible floating control pinned at the bottom-right of the viewport:
- **Instant Live Switching**: Toggle between Horizon, Prestige, and Publisher without page reloads.
- **State Persistence**: Remembers the selected theme across browser refreshes via `localStorage` (defaulting to Horizon on first visit).
- **Architectural Details Popover**: Click the `(i)` info icon on the switcher bar to view the price tier, key strengths, and Shopify architectural specifications of the active theme.
- **Accessibility & Mobile Optimized**: Fully keyboard navigatable (`Tab`, `Enter`, `Space`), equipped with `aria-live` screen-reader announcements, and responsive across desktop, tablet, and mobile devices.

---

## 2. Content & Brand Consistency Guarantee

All three homepage options use **identical brand identity, copy, pricing, photography, and approved colors**:
- **Palette**: Soft Ivory (`#F7F4EE`), Warm Oat (`#E8DFD1`), Deep Forest Green (`#34483F`), Muted Gold (`#B79B6A`), Soft Ink (`#252824`), and Pure White (`#FFFFFF`).
- **Typography Pairing**: Cormorant Garamond (Serif Headings) + DM Sans (Humanist UI & Body).
- **Current Volume**: Volume 6 — Jumada al-Thani | SHUKR (“What Patience Planted”).
- **Verified Pricing**: **£11.99/month** subscription (save 20%) vs. **£14.99** single issue.
- **Delivery**: Free worldwide shipping, dispatching within 7–12 working days after pre-orders close on the 12th.
- **Twelve Content Areas**: Announcement/Header, Hero, What's Inside, Featured Volume, How It Works, Collector's Journey (4, 8, 12 volumes), Behind the Themes (3 articles), Meet the Founder, Testimonials, FAQs, Final CTA, and Footer.

---

## 3. Implementation Mapping Documentation

Each design option has a dedicated Shopify Online Store 2.0 implementation guide:
- [`HORIZON-MAPPING.md`](./HORIZON-MAPPING.md) — Native sections and theme blocks for Shopify Horizon v3.5.1+.
- [`PRESTIGE-MAPPING.md`](./PRESTIGE-MAPPING.md) — Native sections and settings for Maestrooo Prestige.
- [`PUBLISHER-MAPPING.md`](./PUBLISHER-MAPPING.md) — Native sections and styling for Shopify Publisher.

---

## 4. Quick Start (No Build Process Required)

Built purely with **HTML5, CSS3, and Vanilla JavaScript (ES6+)**:
1. Open [`index.html`](./index.html) directly in any browser (works out of the box over the `file://` protocol).
2. Use the floating bar at the bottom to compare all three theme options in real-time.

```text
shop-hijri-prototype/
├── index.html
├── css/
│   ├── variables.css     # Approved 6-colour palette, 4 Horizon schemes, fluid typography & spacing tokens
│   ├── base.css          # Reset, editorial typography rules, layout containers & accessibility utilities
│   ├── components.css    # Buttons, badges, native <details> accordion, side drawers & scroll-reveal states
│   ├── sections.css      # Dedicated styles for Homepage Sections 01 through 12
│   └── responsive.css    # Tablet (<=1024px), Mobile (<=768px), and Small Mobile (<=480px) breakpoints
├── js/
│   ├── main.js           # Application entrypoint
│   ├── navigation.js     # Sticky header, mobile menu drawer, search drawer & cart drawer controller
│   ├── interactions.js   # Product media gallery, subscription vs one-time selector & testimonial carousel
│   └── animations.js     # Lightweight IntersectionObserver reveals (respects prefers-reduced-motion)
├── assets/
│   ├── images/           # 18 genuine product, spread, article & reader images from shophijri.com
│   ├── icons/            # SVG emblems & icons
│   └── fonts/            # Webfont documentation & fallbacks
├── HORIZON-MAPPING.md    # Complete section-by-section & block-by-block Shopify Horizon implementation guide
└── README.md             # Live site audit findings, CRO strategy, and prototype overview
```

---

## 2. Live Website Research & UX/CRO Audit (`shophijri.com`)

Before designing a single pixel, we inspected the live `shophijri.com` store (which currently runs **Shopify Horizon v3.5.1**, theme ID `199519764864`). Below are the critical technical, visual, and conversion issues discovered on the live store and resolved in this prototype:

### Critical Technical & Accessibility Bugs Observed on the Live Site
1. **Invisible Headings Across the Entire Site (Critical Colour Scheme Bug)**:
   - On the live site, the active colour scheme (`color-scheme-679dc1a8-f98c-45c1-8040-0739347096f5`) sets `--color-foreground-heading: rgb(241 236 223)` (`#F1ECDF`), which is **100% identical to `--color-background: rgb(241 236 223)`**.
   - Consequently, major section headings (*"What comes with every order"*, *"How it works"*, *"Meet the founder"*, *"Behind the Themes"*, *"Frequently asked questions"*, and product `<h1>` titles) are **completely invisible** (cream text on a cream background).
2. **Low-Contrast Body Copy & Vanishing Button Hovers**:
   - Live body text uses golden ochre (`#C89244`) on cream (`#F1ECDF`), yielding a **2.3:1 contrast ratio** (failing WCAG AA 4.5:1).
   - Live primary button hover sets both background and text to `rgb(200 146 68)`, causing button text to disappear on hover.
3. **Subscription vs. Single-Purchase Radio Bug on Volume 6**:
   - On `/products/volume-6-jumada-al-thani-shukr`, the **Shopify Subscriptions** widget renders *only* the `"Deliver every month, £11.99"` radio button with no option to select a one-time purchase, while the main product price immediately below the title displays `£14.99` and the description invites readers to *"Start with this single volume, no subscription, no commitment."*
4. **Broken Homepage Product Link & Volume Numbering Mismatch**:
   - The homepage featured banner links to `/products/volume-5-jumada-al-thani-shukr?variant=60098234614144` (which returns a **404 Page Not Found** because the actual handle is `volume-6-jumada-al-thani-shukr`).
   - The announcement bar reads `V7 SHUKR PRE-ORDERS NOW OPEN • V6 SABR DISPATCH FROM 19/10`, whereas *Shukr* is **Volume 6** and *Sabr* is **Volume 5**.
5. **Unconfigured / Empty Theme Blocks Left in the Live DOM**:
   - An empty AI slideshow block (`<ai-editorial-slideshow-...>`) with 0 slides renders blank space on the homepage.
   - An unconfigured `<product-card data-placeholder="true">` placeholder sits in the left column of the live footer.
   - A standalone *"Subscribe to save"* email form appears immediately underneath the Hero before the visitor even understands what Hijri is.

---

## 3. How the Redesign Elevates Conversion & Brand Storytelling

| Area | Live Website (`shophijri.com`) | Proposed Redesign Prototype |
|---|---|---|
| **Colour System & Contrast** | Monotonous cream (`#F1ECDF`) on every section with invisible cream headings and 2.3:1 gold body text. | 4 intentional Horizon colour schemes (**Soft Ivory `#F7F4EE`**, **Warm Oat `#E8DFD1`**, **Deep Forest Green `#34483F`**, **Pure White `#FFFFFF`**, plus **Muted Gold `#B79B6A`** accents), all passing WCAG AA/AAA contrast. |
| **Typography** | `Gilda Display` + `Inter` at uniform weights with weak visual hierarchy. | **Cormorant Garamond** (editorial serif headings & italic pull-quotes) paired with **DM Sans** (clean humanist UI & body copy) using fluid `clamp()` sizing. |
| **Editorial Hero (Section 02)** | Unclear what the physical product is at first glance; followed immediately by a premature email popup block. | Deep Forest Green two-column editorial hero showcasing the real **Vol. 6 Shukr** cover + interior spread inset, clear value proposition, primary/secondary CTAs, and verified subscription reassurance (`£11.99/mo`, free delivery, cancel anytime). |
| **What's Inside (Section 03)** | Heading is invisible; four plain text lines with no hierarchy. | Magazine-style composition pairing the authentic parcel flatlay + print spec bar (`40 A4 Pages • 120gsm • 350gsm • Scholar Checked`) with a structured 2×2 breakdown of the Magazine, Guided Journaling, Collector's Token, and Midway Moments. |
| **Featured Volume (Section 04)** | Broken 404 banner link on homepage; confusing £11.99 vs £14.99 pricing on product page. | Full interactive `featured-product` showcase for **Volume 6 — Jumada al-Thani \| SHUKR** with a 4-image gallery switcher and a transparent Selling Plan selector clearly contrasting **Monthly Subscription (£11.99/mo — Save 20%)** vs. **One-Time Purchase (£14.99)**. |
| **Collector's Journey (Section 06)** | Hidden on an unstyled text-only interior page; barely mentioned on homepage. | Signature Deep Forest Green + Muted Gold homepage showcase highlighting the physical Collector's Token and the three verified milestone tiers (**Tier One: The Wayfarer [4 Vols]**, **Tier Two: The Traveller [8 Vols]**, **Tier Three: The Companion [12 Vols]**). |
| **Reader Social Proof (Section 09)** | Cramped custom AI block (`<ai-carousel-...>`). | Editorial split-frame slideshow (`sections/slideshow.liquid`) pairing genuine reader photography with the exact quotes from **Abida (28)**, **Safa (34)**, and **F.R. (30)**, complete with keyboard and button controls. |

---

## 4. Verified Commercial Details Used in Prototype

- **Monthly Subscription Price**: **£11.99 GBP / month** (saves 20% off single-issue price; auto-renews; pause, skip a month, or cancel anytime before the 12th).
- **Single-Volume Purchase Price**: **£14.99 GBP** (available only while the monthly pre-order window is open).
- **Delivery Policy**: **Free delivery on all orders** (UK & international). Pre-orders close on the **12th of each month** and dispatch within **7–12 working days** (Royal Mail 2nd Class in the UK).
- **Physical Specifications**: **40 pages, A4 size, 120gsm inner pages, 350gsm cover**, authored, edited, and designed by **Masuma Abdul-Muhit** (qualified Aalimah & life coach) and checked by scholars.
