# Shopify Prestige Theme Implementation Mapping (`PRESTIGE-MAPPING.md`)

## 1. Executive Summary & Theme Overview

* **Theme Name**: **Prestige**
* **Theme Developer**: **Maestrooo** (Shopify Official Theme Partner)
* **Pricing Tier**: Paid (~$380 USD on the Shopify Theme Store)
* **Design Philosophy**: High-end luxury, editorial storytelling, and product-focused visual merchandising.
* **Architecture**: Shopify Online Store 2.0 (OS 2.0) with support for up to 21 custom color schemes, deep typography tracking, image hotspots ("Shop the Look"), and high-resolution media galleries.

This document outlines how the **Prestige option** (Option 2) in the Shop Hijri prototype maps into native Prestige sections and blocks when configured within the Shopify Theme Editor.

---

## 2. Colour Scheme & Typography Mapping in Prestige

### Color Configuration (Maestrooo Theme Settings → Colors)
Prestige supports customizable color schemes applied per section:
- **Main Surface**: Soft Ivory (`#F7F4EE`) — assigned to primary editorial storytelling and background containers.
- **Alternate Section**: Warm Oat (`#E8DFD1`) — assigned to process timelines and founder origin sections.
- **Dark Editorial Panels**: Deep Forest Green (`#34483F`) — assigned to the collector's journey and final CTA sections.
- **Text & Headings**: Soft Ink (`#252824`) with high-contrast Ivory (`#F7F4EE`) on dark backgrounds.
- **Accents**: Muted Gold (`#B79B6A`) applied to eyebrows, borders, and pull-quote markers.

### Typography Settings (Maestrooo Theme Settings → Typography)
- **Headings**: Cormorant Garamond (Serif) with expanded letter-spacing (`-0.02em` on display titles, `0.14em` to `0.22em` on uppercase kicker labels).
- **Body & Controls**: DM Sans / Century Gothic fallback with refined uppercase button tracking (`letter-spacing: 0.16em`).

---

## 3. Section-by-Section Prestige Native Mapping

| # | Prototype Content Area | Native Prestige Section | Native Blocks Used | Configuration & Settings Notes | Custom Liquid Needed? |
|---|---|---|---|---|---|
| **01** | Announcement Bar & Header | `announcement-bar.liquid` + `header.liquid` | `announcement`, `mega-menu`, `cart-icon` | Set header to sticky with background blur; upload high-resolution `logo.png` (`180px` width); enable currency selector; links to unified 7-destination main menu (`Home`, `Shop`, `Collector's Journey`, `Midway Moments`, `Journal`, `About`, `Contact`). | **No** (100% Native) |
| **02** | Immersive Hero Banner | `slideshow.liquid` or `image-with-text-overlay.liquid` | `slide`, `heading`, `subheading`, `button` | Set media to full-bleed lifestyle flatlay (`vol6-flatlay.png`); configure content alignment to bottom-left with glassmorphic panel overlay. | **No** (Native section setting) |
| **03** | What's Inside Every Volume | `image-with-text.liquid` | `image`, `heading`, `text`, `icon-with-text` | Split lookbook layout (image on left at 55% width, structured inclusion features on right). | **No** (100% Native) |
| **04** | Featured Current Volume | `featured-product.liquid` | `product-meta`, `price`, `variant-picker`, `buy-buttons`, `description`, `@app` | Assign `Volume 6 — Jumada al-Thani \| SHUKR`; inject **Shopify Subscriptions** app block; enable thumbnail carousel gallery. | **No** (Native OS 2.0 App Block) |
| **05** | How It Works | `timeline.liquid` or `multi-column.liquid` | `column` (4 items) | 4-column phase layout with phase numbers (`Phase 01`–`Phase 04`) and top hairline dividers. | **No** (Native Prestige section) |
| **06** | Collector's Journey | `rich-text.liquid` + `multi-column.liquid` (or `mosaic.liquid`) | `column` (3 tier cards) | Deep Forest Green color scheme with gold borders; displays 3 tiers (The Wayfarer, The Traveller, The Companion). | **No** (Native Prestige styling) |
| **07** | Behind the Themes Journal | `featured-blog.liquid` | `article-card` (3 articles) | 3-column editorial grid linking to `/blogs/behind-the-themes` with smooth zoom hover transitions. | **No** (100% Native) |
| **08** | Meet the Founder | `image-with-text.liquid` | `image`, `heading`, `text`, `button` | Editorial portrait/desk study layout with Warm Oat background and italic pull-quote. | **No** (100% Native) |
| **09** | Reader Testimonials | `testimonials.liquid` | `testimonial-item` | Large centered quotation hero layout with customer attribution (`Abida, 28`). | **No** (100% Native) |
| **10** | Frequently Asked Questions | `collapsible-content.liquid` (or `faq.liquid`) | `collapsible-row` (6 items) | Minimalist single-column accordion with thin dividers. | **No** (100% Native) |
| **11** | Final Subscription CTA | `image-with-text-overlay.liquid` | `heading`, `text`, `button` | Deep Forest Green closing banner highlighting Volume 6 Shukr with primary subscription button. | **No** (100% Native) |
| **12** | Newsletter & Footer | `footer.liquid` | `menu`, `text`, `newsletter` | Multi-column luxury dark footer with policy links and Klaviyo newsletter integration. | **No** (100% Native) |

---

## 4. Subscription & Commercial Implementation Notes
- **App Compatibility**: Maestrooo Prestige is fully certified for **Shopify Subscriptions** and third-party subscription apps (Recharge, Skio, Appstle).
- **Selling Plan Rendering**: Prestige automatically renders subscription radio pickers and pricing discounts when the product is assigned to a Shopify Subscriptions Selling Plan.
