# Shopify Publisher Theme Implementation Mapping (`PUBLISHER-MAPPING.md`)

## 1. Executive Summary & Theme Overview

* **Theme Name**: **Publisher**
* **Theme Developer**: **Shopify** (Official Free Theme)
* **Pricing Tier**: Free ($0 USD on the Shopify Theme Store)
* **Design Philosophy**: Avant-garde independent publishing, literary typography, brutalist editorial precision, and progressive content-led layouts.
* **Architecture**: Shopify Online Store 2.0 (OS 2.0) built on Shopify's Dawn/OS 2.0 core architecture with custom publishing-oriented presets.

This document outlines how the **Publisher option** (Option 3) in the Shop Hijri prototype maps into native Publisher sections and blocks within the Shopify Theme Editor.

---

## 2. Colour Scheme & Typography Mapping in Publisher

### Color Configuration (Publisher Theme Settings → Colors)
Publisher typically defaults to high-contrast monochrome and stark palettes. For Shop Hijri, we have adapted Publisher's structural rhythm strictly to the approved brand palette:
- **Primary Canvas**: Soft Ivory (`#F7F4EE`) — creates a warm independent magazine paper feel.
- **Catalogue & Inclusions**: Pure White (`#FFFFFF`) with stark `1px solid #252824` editorial borders.
- **Supporting Sections**: Warm Oat (`#E8DFD1`) — methodology and colophon sections.
- **Editorial Contrast**: Deep Forest Green (`#34483F`) — keepsake anthology and final lunar chapter banners.
- **Typography & Hairlines**: Soft Ink (`#252824`) for headlines, body, and fine ruling lines.

### Typography Settings (Publisher Theme Settings → Typography)
- **Headings**: Cormorant Garamond with tight leading (`line-height: 1.04`) and oversized display sizing (`clamp(2.8rem, 5.5vw, 5.25rem)`), paired with italic emphasis words (`<em>One journey</em>`).
- **Body & Colophon**: DM Sans paired with monospace accents for issue metadata, colophon lines, and volume numbers (`ISSUE NO. 06 / 1448`, `40PP / 120GSM`).

---

## 3. Section-by-Section Publisher Native Mapping

| # | Prototype Content Area | Native Publisher Section | Native Blocks Used | Configuration & Settings Notes | Custom Liquid Needed? |
|---|---|---|---|---|---|
| **01** | Announcement Bar & Literary Header | `announcement-bar.liquid` + `header.liquid` | `announcement`, `menu`, `cart-icon` | Announcement bar with issue metadata; 2px solid border underneath minimalist header; uppercase menu typography; links to unified 7-destination main menu (`Home`, `Shop`, `Collector's Journey`, `Midway Moments`, `Journal`, `About`, `Contact`). | **No** (100% Native) |
| **02** | Asymmetrical Typography Hero | `image-with-text.liquid` | `heading`, `text`, `button`, `caption` | Asymmetrical grid with large display headline, vertical hairline lead text, and framed A4 publication photography. | **No** (Native section settings) |
| **03** | What's Inside (Editorial Table of Contents) | `multicolumn.liquid` or `image-with-text.liquid` | `heading`, `text`, `column` (4 items) | Structured table-of-contents index with numbered rows (`01`–`04`) and publication inclusions flatlay. | **No** (100% Native) |
| **04** | Featured Volume (Bookshop Catalogue Box) | `featured-product.liquid` | `title`, `price`, `variant_picker`, `buy_buttons`, `description`, `collapsible_tab`, `@app` | Bookshop catalogue styling with prominent framed cover, colophon specs box, and **Shopify Subscriptions** selling plan selector. | **No** (Native OS 2.0 App Block) |
| **05** | How It Works (Numbered Chronology) | `multicolumn.liquid` | `column` (4 items) | Large display numerals (`01`–`04`), top forest hairline rules, and structured four-step subscription rhythm. | **No** (100% Native) |
| **06** | Collector's Journey (Keepsake Anthology) | `multicolumn.liquid` or `rich-text.liquid` | `column` (3 items) | Forest Green background with framed triptych cards for The Wayfarer, The Traveller, and The Companion. | **No** (100% Native) |
| **07** | Behind the Themes (Essays Index) | `featured-blog.liquid` | `article` (3 cards) | Magazine index layout with bold top divider line, 4:5 article portrait photography, and author credits. | **No** (100% Native) |
| **08** | Meet the Founder (Colophon & Bio) | `image-with-text.liquid` | `heading`, `text`, `image` | Two-column feature article layout resembling a print magazine colophon page. | **No** (100% Native) |
| **09** | Reader Epigraph | `rich-text.liquid` | `heading`, `text` | Minimalist literary quotation layout centered with an italicized customer epigraph. | **No** (100% Native) |
| **10** | Frequently Asked Questions | `collapsible-content.liquid` | `collapsible_row` (6 items) | Clean single-column accordion layout with editorial typography. | **No** (100% Native) |
| **11** | Final Subscription CTA | `image-with-text.liquid` or `rich-text.liquid` | `heading`, `text`, `button` | Deep Forest Green closing panel with display typography and high-contrast ivory button. | **No** (100% Native) |
| **12** | Colophon & Footer | `footer.liquid` | `brand_information`, `link_list` | Brutalist dark footer with monospace copyright and publishing credits. | **No** (100% Native) |

---

## 4. Subscription & Commercial Implementation Notes
- **App Compatibility**: As an official Shopify theme, Publisher offers native, turn-key compatibility with **Shopify Subscriptions** via Theme App Extensions (`@app` block inside `featured-product.liquid`).
- **Zero Ongoing Theme Fee**: Publisher is completely free, making it a compelling alternative for independent periodicals prioritizing high editorial style without commercial theme costs.
