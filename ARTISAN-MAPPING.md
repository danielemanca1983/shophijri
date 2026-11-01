# Shopify Implementation Assessment: Option 04 | The Artisan Edition (`ARTISAN-MAPPING.md`)

## 1. Executive Summary & Architectural Philosophy

* **Design Direction**: **04 | The Artisan Edition**
* **Creative Objective**: Make the Shop Hijri storefront feel as thoughtfully created, intimate, and handcrafted as the 40-page A4 lunar publications it sells—resembling the digital studio of an independent publishing house rather than a mass-produced e-commerce template.
* **Shopify Online Store 2.0 Strategy**: Built as a **Hybrid Shopify OS 2.0 Architecture** on top of Shopify's modern theme foundation (such as Horizon or Dawn), combining **100% native Shopify commerce infrastructure** (Header/Navigation menus, Featured Product form, Shopify Subscriptions app block, Blog Articles, Collapsible FAQs, Customer Newsletter, and Cart Drawer) with **modular custom Liquid/CSS presentation layers** for the bespoke paper frames, botanical SVG dividers, and interactive open-book spread preview.

---

## 2. Visual Design System & Theme Settings (`settings_schema.json`)

### Exclusive Artisan Colour Palette
Configured as dedicated OS 2.0 Color Schemes so they remain editable in the Shopify Theme Editor:

| Token Name | Hex | Role in The Artisan Edition | Contrast & Accessibility Notes |
|---|---|---|---|
| **Unbleached Paper** | `#F4EBDD` | Dominant primary canvas background | Warm tactile cotton-rag paper surface |
| **Warm Ivory** | `#FFF9EF` | Secondary elevated sheets, folio cards, open-book right page | High-contrast paper sheet layering |
| **Ink Brown** | `#342B27` | Primary typography, borders, imprint announcement bar, dark open-book section, and footer | **10.8:1 AAA contrast** on Unbleached Paper (`#F4EBDD`) and **12.4:1 AAA** on Warm Ivory (`#FFF9EF`) |
| **Oxide Red** | `#A34E3F` | Primary buttons, editorial stamps, active states, and bookmark ribbons | **5.1:1 AA contrast** with Warm Ivory (`#FFF9EF`) button text |
| **Sage Green** | `#87947A` | Botanical leaf illustrations, secondary stamps, and rhythm offset borders | Used sparingly as an organic natural pigment |
| **Faded Ochre** | `#C9A56C` | Corner bookbinding marks, double rules, quotation ornaments, and dark-section highlights | Warm traditional printmaking accent |

### Editorial Typography System
- **Primary Headings (`--art-font-serif`)**: **Fraunces** (Variable optical size `9..144`, weights `400`–`600`, Roman & Italic) — expressive old-style serif with warm, human printmaking character.
- **Body & Functional UI (`--art-font-sans`)**: **DM Sans** (`400`, `500`, `600`) — clean, legible humanist sans-serif for navigation, pricing, and body copy.
- **Handwritten Marginalia (`--art-font-hand`)**: **Caveat** (`500`) — restricted strictly to 4 deliberate marginal annotations across the entire page so it feels like a genuine pen note rather than clutter.

---

## 3. Section-by-Section Shopify Implementation Breakdown

| Section | Homepage Component | Native Shopify vs. Custom Liquid Assessment | JavaScript Requirements | CSS & SVG Implementation | Editable in Shopify Theme Editor? |
|---|---|---|---|---|---|
| **01** | **Editorial Navigation & Imprint Bar** | **Native Shopify Section** (`sections/header.liquid` + `sections/announcement-bar.liquid`) styled with custom CSS rules. Uses `linklists.main-menu` to preserve the exact 7-item navigation hierarchy (`Home`, `Shop`, `Collector's Journey`, `Midway Moments`, `Journal`, `About`, `Contact`). | Reuses native mobile drawer (`navigation.js`), currency selector, search drawer, and cart drawer. | Double-ruled bottom border (`box-shadow` + `border-bottom`) and ink-drawn link hover underline (`transform: scaleX`). | **Yes (100%)**: Menu links, logo image, announcement text, and currency toggle are managed natively. |
| **02** | **Signature Editorial Hero** | **Custom Liquid Section** (`sections/artisan-hero.liquid`) with schema settings for headline, lead copy, primary/secondary CTAs, 3 colophon ledger items, main cover `image_picker`, overlapping spread `image_picker`, and handwritten marginal note. | None (pure CSS hover elevation and scroll reveal). | Layered paper backing sheet (`transform: rotate(2.2deg)`), overlapping spread card, custom SVG botanical sprig, and letterpress stamp. | **Yes (100%)**: All text, links, cover/spread images, and colophon specs are Theme Editor blocks/settings. |
| **03** | **A Personal Introduction (Our Story)** | **Native `image-with-text.liquid` or Custom Liquid Section** (`sections/artisan-studio-intro.liquid`). | None. | Double-ruled bookbinding inner frame (`::after`), offset ochre shadow (`6px 6px 0 #C9A56C`), and handwritten sign-off note. | **Yes (100%)**: Study desk image, pull-quote, biography paragraphs, and signature are editable. |
| **04** | **Discover the Publications (Folio + Archive Trio)** | **Hybrid Native + Custom Section**: Primary Folio uses native `sections/featured-product.liquid` + **Shopify Subscriptions App Block** (`@app`), paired with a 3-card `collection` or `product_list` block below for Vol. 5, Vol. 4, and the Complete Parcel. | Minimal Vanilla JS (`initArtisanInteractions` in `interactions.js`, ~65 lines) for thumbnail switching and dynamic subscription vs. one-time price updates. | Paper-mounted folio box, dashed perk dividers, and staggered 3-column archive cards. | **Yes (100%)**: Product assignment, gallery media, selling plans, and complementary archive products are managed in Shopify Admin & Theme Editor. |
| **05** | **The Story Behind the Work (Essays & Rhythm)** | **Native `featured-blog.liquid`** (pulling 3 articles from `/blogs/behind-the-themes`) + **Native `multicolumn.liquid`** for the 4-step monthly rhythm. | None. | Paper-framed essay cards with top-left issue tags; 4-step Roman numeral (`I`–`IV`) rhythm box with sage offset border. | **Yes (100%)**: Articles pull automatically from Shopify Blog; 4 rhythm steps are editable blocks. |
| **06** | **Explore by Collection (Collector's Journey Bookmarks)** | **Custom Liquid Section** (`sections/artisan-bookmarks.liquid`) with 3 `tier` blocks for *The Wayfarer (4 Vols)*, *The Traveller (8 Vols)*, and *The Companion (12 Vols)*. | None. | Bookmark ribbon notches created purely with CSS `clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 78%, 0 100%)` and corner bookbinding ornaments. | **Yes (100%)**: Intro copy, archive banner image, and all 3 milestone tiers are editable blocks. |
| **07** | **A Closer Look Inside (Open Book Spread Preview)** | **Custom Liquid Section** (`sections/artisan-open-book.liquid`) with 4 `spread_tab` blocks (`image_picker` + `caption`) on the left page and 4 `inclusion_item` blocks on the right page. | Lightweight Vanilla JS tab switcher (~25 lines) updating the active spread image and caption with `aria-selected`. | Open-book two-page container with a central spine crease gradient (`linear-gradient`) and ink-brown studio background. | **Yes (100%)**: Merchants can upload new interior spread images and edit all 4 inclusion descriptions in the Theme Editor. |
| **08** | **Reader Feedback (Letters From Readers)** | **Native `multicolumn.liquid` or `testimonials.liquid`** styled as paper-mounted reader letters with photography. | None (all 3 letters are visible simultaneously in an editorial layout without hiding social proof behind a carousel). | Custom SVG quotation marks, framed reader photos (`testimonial-1.jpg`, `testimonial-3.jpg`, `testimonial-2.jpg`), and staggered middle card. | **Yes (100%)**: Reader photos, quotes, names, and badges are editable blocks. |
| **09** | **Thoughtful Gifting & Studio FAQs** | **Native `image-with-text.liquid`** (Gifting feature) + **Native `collapsible-content.liquid`** (6 FAQ rows using native `<details>`). | Zero JS required (uses native HTML5 `<details name="artisan-faq">` + `<summary>`). | Oxide Red offset shadow (`7px 7px 0 #A34E3F`) on the gifting callout; clean hairline rules on the accordion. | **Yes (100%)**: Gifting copy/image and all 6 FAQ question/answer pairs are editable blocks. |
| **10** | **Newsletter Epistle & Colophon Footer** | **Native `newsletter.liquid`** + **Native `footer.liquid`** using Shopify's native `{% form 'customer' %}` and `linklists` for footer columns and store policies. | Progressive enhancement form feedback handler. | Dashed ochre inner epistle border (`1px dashed #C9A56C`) and Ink Brown (`#342B27`) footer with double ochre top rule. | **Yes (100%)**: Newsletter copy, footer menus, colophon box, and policy links are editable natively. |

---

## 4. Summary of Native vs. Custom Effort for Production Build

- **100% Native Shopify Infrastructure**:
  - Navigation menus (`main-menu` and footer `linklists`)
  - Product catalog, variants, and pricing (`Volume 6 — Shukr`, `Volume 5 — Sabr`, `Volume 4 — Tazkiya`)
  - **Shopify Subscriptions** selling plan integration (`£11.99/mo` vs `£14.99` single issue)
  - Blog post feed (`/blogs/behind-the-themes`)
  - Customer newsletter capture (`{% form 'customer' %}`)
  - Cart drawer and predictive search drawer
- **Custom Liquid & CSS Layer (3 Bespoke Sections + Scoped Stylesheet)**:
  - `sections/artisan-hero.liquid` (Asymmetrical layered studio hero)
  - `sections/artisan-bookmarks.liquid` (Bookmark-notched Collector's Journey tiers)
  - `sections/artisan-open-book.liquid` (Two-page open-book interactive spread viewer)
  - `assets/artisan.css` (Scoped design tokens, letterpress stamps, corner frames, and SVG flourishes)
