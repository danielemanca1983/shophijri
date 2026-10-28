# Shopify Horizon Implementation Mapping (`HORIZON-MAPPING.md`)

## 1. Executive Summary & Live Theme Verification

During the live technical audit of **`https://shophijri.com/`**, we verified that the store is **already running Shopify Horizon v3.5.1**:
```json
{
  "name": "Horizon - Redesign draft Oct 2026",
  "id": 199519764864,
  "schema_name": "Horizon",
  "schema_version": "3.5.1",
  "theme_store_id": 2481
}
```
This prototype was architected specifically so **every single section on the homepage (Sections 01–12) maps directly to verified native Shopify Horizon sections (`sections/*.liquid`) and Theme Blocks (`blocks/*.liquid`)**, requiring **0 custom Liquid section rebuilds** and **0 paid third-party page builders**.

> **Repository Verification & Access Note:** Around May 2026, Shopify restricted direct unauthenticated directory browsing on `https://github.com/Shopify/horizon`. All exact file paths, block types, and schema attributes below were cross-verified against the live `shophijri.com` Horizon v3.5.1 DOM output, indexed `Shopify/horizon` source files, and Shopify's official Horizon architecture documentation (39 native sections and 94 theme blocks).

---

## 2. Native Horizon Colour Schemes Configuration

### Why the Live Site's Colour Scheme Needed Urgent Remediation
On the live store (`shophijri.com`), almost every section is assigned to `color-scheme-679dc1a8-f98c-45c1-8040-0739347096f5`, which currently has:
- `--color-background`: `rgb(241 236 223)` (`#F1ECDF`)
- `--color-foreground-heading`: `rgb(241 236 223)` (`#F1ECDF` — **identical to the background, rendering all `<h1>–<h4>` headings invisible**)
- `--color-foreground`: `rgb(200 146 68)` (`#C89244` on `#F1ECDF` — **2.3:1 contrast ratio, failing WCAG AA**)
- `--color-primary-button-hover-background` and `--color-primary-button-hover-text` both set to `rgb(200 146 68)` (**making button text vanish on hover**).

### Proposed 4 Native Horizon Colour Schemes (`config/settings_data.json`)
Configure the following four schemes in **Theme Settings → Colors** (supported natively in Horizon v3.5.1 `color_schemes` and Horizon v4.x `color_palette`):

| Scheme ID | Name | Background (`--color-background`) | Headings (`--color-foreground-heading`) | Body Text (`--color-foreground`) | Primary Button BG / Text | Primary Button Hover BG / Text | Secondary Button Border / Text | Borders / Hairlines |Assigned Homepage Sections |
|---|---|---|---|---|---|---|---|---|---|
| `scheme-1` | **Main Light** *(Default)* | Soft Ivory `#F7F4EE` | Soft Ink `#252824` (13.9:1 AAA) | Soft Ink `#252824` | Deep Forest `#34483F` / Ivory `#F7F4EE` | Forest Hover `#273730` / White `#FFFFFF` | Soft Ink `#252824` | `rgba(37,40,36,0.12)` | **01 Header**, **03 What's Inside**, **07 Behind the Themes**, **09 Testimonials** |
| `scheme-2` | **Warm Alternate** | Warm Oat `#E8DFD1` | Soft Ink `#252824` (11.6:1 AAA) | Soft Ink `#252824` | Deep Forest `#34483F` / Ivory `#F7F4EE` | Forest Hover `#273730` / White `#FFFFFF` | Soft Ink `#252824` | `rgba(37,40,36,0.14)` | **05 How It Works**, **08 Meet the Founder** |
| `scheme-3` | **Dark Forest** | Deep Forest `#34483F` | Soft Ivory `#F7F4EE` (8.9:1 AAA) | Soft Ivory `#F7F4EE` | Soft Ivory `#F7F4EE` / Forest `#34483F` | Pure White `#FFFFFF` / Deep Forest `#1E2B25` | `rgba(247,244,238,0.38)` / Ivory `#F7F4EE` | `rgba(247,244,238,0.16)` | **01 Announcement Bar**, **02 Editorial Hero**, **06 Collector's Journey**, **11 Final CTA**, **12 Footer** |
| `scheme-4` | **Clean White** | Pure White `#FFFFFF` | Soft Ink `#252824` (15.1:1 AAA) | Soft Ink `#252824` | Deep Forest `#34483F` / Ivory `#F7F4EE` | Forest Hover `#273730` / White `#FFFFFF` | Soft Ink `#252824` | `rgba(37,40,36,0.12)` | **04 Featured Current Volume**, **10 FAQs** |

> **Decorative Accent (`Muted Gold #B79B6A`):** Used exclusively for eyebrow hairlines, subtle card borders on dark sections, and editorial pull-quote rules via lightweight CSS custom properties (`--color-gold: #B79B6A`). Never used as body copy on light backgrounds.

---

## 3. Typography Settings in Shopify Horizon

In **Theme Settings → Typography** (`config/settings_schema.json` → `snippets/theme-styles-variables.liquid`):

| Horizon Font Setting | CSS Variable Output | Assigned Font in Shopify Font Library | Fallback / Google Fonts Notes |
|---|---|---|---|
| `type_heading_font` | `--font-heading--family` | **Cormorant Garamond** (Medium 500 / Regular 400) | Available natively in Shopify's Font Picker (`cormorant_garamond_n5` / `n4`). Close native Shopify serif alternatives if desired: *Instrument Serif* or *Newsreader*. |
| `type_subheading_font` | `--font-subheading--family` | **Cormorant Garamond** (Italic 400 / Medium 500) | Used for volume subtitles (`"What Patience Planted"`), pull quotes, and tier epigraphs. |
| `type_body_font` | `--font-body--family` | **DM Sans** (Regular 400 / Medium 500) | Available natively in Shopify's Font Picker (`dm_sans_n4` / `n5`). Replaces `Inter` for a warmer humanist feel. |
| `type_accent_font` | `--font-accent--family` | **DM Sans** (SemiBold 600) | Used for uppercase eyebrows, badges, and metadata labels. |

---

## 4. Section-by-Section Horizon Implementation Blueprint

### Section 01: Announcement Bar & Header
- **Horizon Section Files**:
  - `sections/header-group.json`
  - `sections/header-announcements.liquid`
  - `sections/header.liquid`
- **Horizon Theme Blocks Used**:
  - `blocks/_announcement.liquid` (inside `header-announcements`)
  - `blocks/_header-logo.liquid` (static block in `header.liquid`, linked to `IMG_3140.png`)
  - `blocks/_header-menu.liquid` (static block in `header.liquid` with `variant: 'desktop'` and `variant: 'mobile'`)
- **Native Settings**:
  - Set Announcement Bar colour scheme to **Scheme 3 (`Dark Forest`)**.
  - Fix the live announcement text discrepancy (`V7 SHUKR` → `VOLUME 6 SHUKR PRE-ORDERS NOW OPEN • CLOSES 12 NOV`) and attach the URL link to `/products/volume-6-jumada-al-thani-shukr`.
  - Set Header colour scheme to **Scheme 1 (`Main Light`)** with sticky header enabled (`sticky_header_type: "on-scroll-up"` or `"always"`).
  - **Navigation Menu Optimization (`Online Store → Navigation → Main menu`)**: Keep all 7 destinations on a clean, non-wrapping single row by tightening the verbose labels while keeping identical URLs:
    - `Home` (`/`)
    - `Shop` (`/collections/all`)
    - `Collector's Journey` (`/pages/hijri-collector-s-journey`)
    - `Midway Moments` (`/pages/midway-moments`)
    - `Journal` (`/blogs/behind-the-themes` — shortened from *Behind the Themes*)
    - `About` (`/pages/about` — shortened from *About Hijri*)
    - `Contact` (`/pages/contact` — shortened from *Contact Us*)
  - Retain native Country/Currency localization selector (`GBP £`, `USD $`, `CAD $`, `AUD $`), Search modal (`#search-modal`), Account icon, and `<cart-drawer-component>`.

---

### Section 02: Editorial Hero
- **Horizon Section File**: `sections/section.liquid` (or `sections/hero.liquid`)
- **Colour Scheme**: **Scheme 3 (`Dark Forest`)**
- **Horizon Block Nesting Tree** (Max nesting depth: 3 of 8 allowed):
  ```text
  sections/section.liquid (2-column horizontal layout-panel-flex on desktop, stacked on mobile)
  ├── blocks/group.liquid (Left Column: Content, width 55%)
  │   ├── blocks/text.liquid (Eyebrow: "A Monthly Print Periodical for the Lunar Year")
  │   ├── blocks/_heading.liquid (H1: "Twelve months. One journey back to yourself.")
  │   ├── blocks/text.liquid (Supporting lead paragraph)
  │   ├── blocks/group.liquid (Row: Primary & Secondary CTAs)
  │   │   ├── blocks/button.liquid ("Start Your Journey" -> #featured-volume, style: Primary)
  │   │   └── blocks/button.liquid ("Discover What's Inside" -> #whats-inside, style: Text Link)
  │   └── blocks/group.liquid (Reassurance row with 3 icon+text items)
  └── blocks/group.liquid (Right Column: Publication Visual Composition, width 45%)
      ├── blocks/image.liquid (Primary cover: IMG-3815.png — Vol 6 Shukr, fetchpriority="high")
      └── blocks/group.liquid (Overlapping inset card with interior spread 473235F8...png)
  ```
- **Custom CSS Required**: ~25 lines in section Custom CSS for the overlapping inset spread card (`grid-column` overlap) and subtle vertical gold hairline divider.

---

### Section 03: What's Inside Every Volume
- **Horizon Section File**: `sections/section.liquid`
- **Colour Scheme**: **Scheme 1 (`Main Light`)**
- **Horizon Block Nesting Tree**:
  ```text
  sections/section.liquid (2-column layout)
  ├── blocks/group.liquid (Left Column: Media + Print Spec Strip)
  │   ├── blocks/image.liquid (IMG_3809.png flatlay of magazine, token, welcome letter & journey print)
  │   └── blocks/text.liquid ("40 A4 Pages • 120gsm Inner Stock • 350gsm Matte Cover • Scholar Checked")
  └── blocks/group.liquid (Right Column: Editorial Breakdown)
      ├── blocks/text.liquid (Eyebrow: "What Comes With Every Order")
      ├── blocks/_heading.liquid (H2: "A meaningful moment, delivered every month.")
      ├── blocks/text.liquid (Introductory paragraph)
      ├── blocks/group.liquid (2x2 Grid of 4 Inclusions)
      │   ├── blocks/group.liquid (Icon + H3 "The 40-Page A4 Magazine" + Text)
      │   ├── blocks/group.liquid (Icon + H3 "Guided Journaling & Rhythm" + Text)
      │   ├── blocks/group.liquid (Icon + H3 "Token & Twelve-Month Print" + Text)
      │   └── blocks/group.liquid (Icon + H3 "Midway Moments Video" + Text)
      └── blocks/button.liquid ("Explore Volume 6: Jumada al-Thani | Shukr", style: Text Link)
  ```
- **Custom Liquid Required**: None (100% native Horizon `section.liquid` + `group` / `image` / `icon` / `text` blocks).

---

### Section 04: Featured Current Volume
- **Horizon Section File**: `sections/featured-product.liquid` (or `sections/product-information.liquid`)
- **Assigned Product**: `Volume 6 - Jumada al-Thani | SHUKR` (`products/volume-6-jumada-al-thani-shukr`, ID `15991554376064`)
- **Colour Scheme**: **Scheme 4 (`Clean White`)**
- **Horizon Static & App Blocks Used**:
  - `blocks/_product-media-gallery.liquid` (Left Column: renders Cover `IMG-3815.png`, Flatlay `IMG-3809.png`, and interior spreads)
  - `blocks/_product-details.liquid` (Right Column: renders product title, price, description excerpt, `@app` block for **Shopify Subscriptions**, Buy Buttons, and dispatch callout)
- **Critical Subscription App Configuration Fix**:
  - The store currently uses the official **Shopify Subscriptions** app (`subscriptions-remix-95`, Selling Plan Group: `Monthly Subscription – UK`, Selling Plan ID `738968437120` at `£11.99/month`, 20% off `£14.99`).
  - **Issue on Live Store**: On Volume 6, "Offer product as subscription only" is accidentally toggled ON in the Shopify Admin product selling plan configuration, which hides the `"One-time purchase (£14.99)"` radio button while the main price still shows `£14.99`.
  - **Fix in Shopify Admin**: In **Products → Volume 6 - Jumada al-Thani | SHUKR → Subscriptions**, uncheck *"Sell product as subscription only"* so the native Shopify Subscriptions app block renders **both** radio options (`Monthly Subscription — £11.99/mo` and `One-time purchase — £14.99`), matching our prototype selector without any custom app code.

---

### Section 05: How the Hijri Journey Works
- **Horizon Section File**: `sections/section.liquid`
- **Colour Scheme**: **Scheme 2 (`Warm Alternate` — `#E8DFD1`)**
- **Horizon Block Nesting Tree**:
  ```text
  sections/section.liquid
  ├── blocks/group.liquid (Section Header Row: Eyebrow + H2 + Subtitle + Button)
  └── blocks/group.liquid (4-Column Horizontal Row on Desktop / Vertical Stack on Mobile)
      ├── blocks/group.liquid (Step 01: Icon + "1. Subscribe" + Text)
      ├── blocks/group.liquid (Step 02: Icon + "2. We post it" + Text)
      ├── blocks/group.liquid (Step 03: Icon + "3. Read and reflect" + Text)
      └── blocks/group.liquid (Step 04: Icon + "4. Midway Moments" + Text)
  ```
- **Improvement Over Live Site**: Replaces the live site's duplicate stock `Person` SVG icons on Steps 3 & 4 with distinct, meaningful editorial icons (Calendar, Envelope, Open Book, Play Circle) and a subtle horizontal progression line.

---

### Section 06: The Collector's Journey
- **Horizon Section File**: `sections/section.liquid`
- **Colour Scheme**: **Scheme 3 (`Dark Forest` — `#34483F`)**
- **Horizon Block Nesting Tree**:
  ```text
  sections/section.liquid
  ├── blocks/group.liquid (2-Column Top Intro: Left Heading/Copy/Quote + Right Token Flatlay Image)
  ├── blocks/group.liquid (3-Column Milestone Row)
  │   ├── blocks/group.liquid (Tier One · 4 Volumes · "The Wayfarer" — border-style with Muted Gold)
  │   ├── blocks/group.liquid (Tier Two · 8 Volumes · "The Traveller" — border-style with Muted Gold)
  │   └── blocks/group.liquid (Tier Three · 12 Volumes · "The Companion" — border-style with Muted Gold)
  └── blocks/group.liquid (Bottom Claim Instructions + Button -> /pages/hijri-collector-s-journey)
  ```
- **Why This Works in Native Horizon**: Each milestone card uses `blocks/group.liquid`'s native border (`border-style`) and padding (`spacing-style`) controls—avoiding any complex interactive reward tracker that would require custom Liquid or paid loyalty apps.

---

### Section 07: Behind the Themes (Editorial Articles)
- **Horizon Section File**: `sections/featured-blog-posts.liquid`
- **Assigned Blog**: `Behind the Themes` (`/blogs/behind-the-themes`)
- **Colour Scheme**: **Scheme 1 (`Main Light` — `#F7F4EE`)**
- **Horizon Native Blocks Used**:
  - `blocks/_featured-blog-posts-title.liquid`
  - `blocks/_featured-blog-posts-card.liquid` (configured to display `3` articles in a 3-column grid with `blocks/_blog-post-image.liquid` aspect ratio `4:5`, article date, author `Masuma Abdul-Muhit`, title, and excerpt).

---

### Section 08: Meet the Founder
- **Horizon Section File**: `sections/section.liquid` (or `sections/image-with-text.liquid`)
- **Colour Scheme**: **Scheme 2 (`Warm Alternate` — `#E8DFD1`)**
- **Horizon Block Nesting Tree**:
  ```text
  sections/section.liquid (2-column layout)
  ├── blocks/group.liquid (Left Column: Framed Editorial Study Photography + Caption)
  └── blocks/group.liquid (Right Column: Eyebrow + H2 + Pullquote + Bio Paragraphs + Signature + Button -> /pages/about)
  ```
- **Content Note**: Since the live site does not currently host a personal portrait photo of Masuma Abdul-Muhit, the left frame displays an authentic Hijri study photograph (`BDCEA80F-6150-4252-AFFB-64C2B7363E07.jpg`) and can be swapped in one click inside the Horizon Theme Editor if the founder chooses to upload a portrait later.

---

### Section 09: Reader Testimonials
- **Horizon Section File**: `sections/slideshow.liquid`
- **Colour Scheme**: **Scheme 1 (`Main Light` — `#F7F4EE`)**
- **Horizon Native Blocks Used**:
  - `blocks/_slide.liquid` (3 slides corresponding to the 3 verified reader testimonials: **Abida, 28**, **Safa, 34**, and **F.R., 30** alongside their authentic reader photos `IMG_2950.jpg`, `IMG_2496.jpg`, and `IMG_2731.jpg`).
- **Why Replace the Live Site's AI Block**: The live site currently uses an unmaintainable AI-generated block (`<ai-carousel-1791483083a8e4f24c>`) alongside a second empty `<ai-editorial-slideshow-...>` block with 0 slides. Migrating this to Horizon's native `sections/slideshow.liquid` (with `autoplay: false`, manual arrows, and keyboard accessibility) keeps the theme 100% native and cleanly editable.

---

### Section 10: Frequently Asked Questions
- **Horizon Section File**: `sections/section.liquid`
- **Colour Scheme**: **Scheme 4 (`Clean White` — `#FFFFFF`)**
- **Horizon Native Blocks Used**:
  - Left Column: `blocks/group.liquid` (`_heading`, `text`, and contact support box)
  - Right Column: `blocks/accordion.liquid` containing 6 `blocks/_accordion-row.liquid` items with the store's 6 verified FAQ pairs.

---

### Section 11: Final Subscription CTA
- **Horizon Section File**: `sections/section.liquid`
- **Colour Scheme**: **Scheme 3 (`Dark Forest` — `#34483F`)**
- **Horizon Native Blocks Used**:
  - Centered `blocks/group.liquid` containing `blocks/text.liquid` (Eyebrow), `blocks/_heading.liquid` (`"Your next chapter begins here."`), `blocks/text.liquid` (Supporting copy), `blocks/button.liquid` (`"Start Your Subscription"` + `"Explore All Volumes"`), and reassurance bullet text.

---

### Section 12: Newsletter & Footer
- **Horizon Section File**: `sections/footer.liquid` (inside `sections/footer-group.json`)
- **Colour Scheme**: **Scheme 3 (`Dark Forest` — `#34483F`)**
- **Horizon Native Blocks Used**:
  - `blocks/logo.liquid` (Hijri logo with CSS invert filter on dark background)
  - `blocks/text.liquid` (Brand summary & `info@shophijri.com`)
  - `blocks/menu.liquid` (2 navigation columns: *The Publication* and *The Journey*)
  - `blocks/email-signup.liquid` (Native Shopify newsletter signup integrated with Klaviyo)
  - Footer utilities bar (`footer-utilities`): Copyright & native store policy links.
- **Live Footer Cleanup**: Removes the broken `<product-card data-placeholder="true">` block currently sitting in the left column of the live footer and removes the empty `.social-icons__wrapper` container until social URLs are added in Theme Settings.
