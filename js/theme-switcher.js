/**
 * SHOP HIJRI — THEME SWITCHER CONTROLLER (theme-switcher.js)
 * Controls switching between:
 * 1. Horizon (Free)
 * 2. Prestige (Paid)
 * 3. Publisher (Free)
 * 4. The Artisan Edition (Bespoke)
 * Persists selection via localStorage, maintains scroll context, and provides ARIA announcements.
 */

window.ShopHijri = window.ShopHijri || {};

window.ShopHijri.initThemeSwitcher = function initThemeSwitcher() {
  const switcherBar = document.getElementById('theme-switcher-bar');
  if (!switcherBar) return;

  const buttons = switcherBar.querySelectorAll('[data-theme-target]');
  const containers = document.querySelectorAll('[data-theme-container]');
  const announcer = document.getElementById('theme-switcher-announcer');
  const infoTrigger = document.getElementById('theme-info-trigger');
  const infoPopover = document.getElementById('theme-info-popover');
  const popoverTitle = document.getElementById('theme-popover-title');
  const popoverSummary = document.getElementById('theme-popover-summary');
  const popoverSpecs = document.getElementById('theme-popover-specs');

  const THEME_DATA = {
    horizon: {
      name: 'Option 1: Horizon',
      tier: 'Free • Official Shopify Theme',
      summary: 'Clean, modular, and conversion-focused. Balanced two-column compositions, native Shopify section blocks, and structured subscription journeys.',
      specs: [
        'Architecture: Shopify Horizon v3.5.1+ (OS 2.0 Theme Blocks)',
        'Key Strength: 100% native Theme Editor maintainability with zero custom Liquid required',
        'Conversion Focus: Clear product pricing hierarchy and modular inclusion cards'
      ]
    },
    prestige: {
      name: 'Option 2: Prestige',
      tier: 'Paid • By Maestrooo ($380 USD)',
      summary: 'High-end luxury and product-led editorial ecommerce. Features large immersive imagery, floating glassmorphism panels, refined typography tracking, and lookbook merchandising.',
      specs: [
        'Architecture: Maestrooo Prestige (Online Store 2.0)',
        'Key Strength: Elevates perceived luxury through full-bleed media and high-jewelry editorial pacing',
        'Conversion Focus: Prominent lifestyle showcase with streamlined luxury quick-buy pathways'
      ]
    },
    publisher: {
      name: 'Option 3: Publisher',
      tier: 'Free • Official Shopify Theme',
      summary: 'Avant-garde, literary, and independent publishing studio aesthetic. Features asymmetrical display typography, fine bookshop dividers, and table-of-contents editorial indexing.',
      specs: [
        'Architecture: Shopify Publisher (Online Store 2.0)',
        'Key Strength: Distinctive literary identity tailored for independent magazines and print journals',
        'Conversion Focus: Editorial storytelling with prominent bookshop catalogue merchandising'
      ]
    },
    artisan: {
      name: '04 | The Artisan Edition',
      tier: 'Bespoke • Handcrafted Editorial Direction',
      summary: 'Warm, tactile independent publishing house aesthetic. Features unbleached paper surfaces, ink brown & oxide red pigments, Fraunces editorial typography, original botanical SVG illustrations, and open-book spread previews.',
      specs: [
        'Architecture: Hybrid Shopify OS 2.0 (Native product/header/footer + Custom Liquid editorial sections)',
        'Key Strength: Unmistakably handcrafted human personality that feels like visiting an independent studio',
        'Conversion Focus: Paper-framed folio showcase, interactive interior spread reader, and transparent subscription selector'
      ]
    }
  };

  const STORAGE_KEY = 'shop_hijri_active_theme';

  function applyTheme(themeKey, shouldScroll = false) {
    if (!THEME_DATA[themeKey]) themeKey = 'horizon';

    // 1. Update Buttons State
    buttons.forEach((btn) => {
      const isTarget = btn.getAttribute('data-theme-target') === themeKey;
      btn.classList.toggle('is-active', isTarget);
      btn.setAttribute('aria-pressed', String(isTarget));
    });

    // 2. Toggle Theme Containers
    containers.forEach((container) => {
      const isMatch = container.getAttribute('data-theme-container') === themeKey;
      container.classList.toggle('is-active-theme', isMatch);
      container.setAttribute('aria-hidden', String(!isMatch));
    });

    // 3. Update Popover Info Content
    const data = THEME_DATA[themeKey];
    if (popoverTitle) popoverTitle.textContent = `${data.name} (${data.tier})`;
    if (popoverSummary) popoverSummary.textContent = data.summary;
    if (popoverSpecs) {
      popoverSpecs.innerHTML = data.specs.map(spec => `<div>• ${spec}</div>`).join('');
    }

    // 4. Update Document Attribute for Styling
    document.documentElement.setAttribute('data-active-theme', themeKey);

    // 5. Accessible Screen-Reader Announcement
    if (announcer) {
      announcer.textContent = `Switched to ${data.name}. ${data.summary}`;
    }

    // 6. Save in LocalStorage
    try {
      localStorage.setItem(STORAGE_KEY, themeKey);
    } catch (e) {
      // LocalStorage might be restricted; continue gracefully
    }

    // 7. Optional scroll alignment
    if (shouldScroll) {
      const currentScroll = window.scrollY;
      if (currentScroll > 200) {
        // Keep user in relative context without jarring jump
        window.scrollTo({ top: currentScroll, behavior: 'instant' });
      }
    }

    // 8. Trigger scroll animations in new layout
    if (window.ShopHijri.initAnimations) {
      window.ShopHijri.initAnimations();
    }
  }

  // Bind Buttons
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTheme = btn.getAttribute('data-theme-target');
      applyTheme(targetTheme, true);
    });
  });

  // Toggle Popover
  if (infoTrigger && infoPopover) {
    infoTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = infoPopover.classList.toggle('is-visible');
      infoTrigger.classList.toggle('is-open', isExpanded);
      infoTrigger.setAttribute('aria-expanded', String(isExpanded));
    });

    document.addEventListener('click', (e) => {
      if (!switcherBar.contains(e.target) && !infoPopover.contains(e.target)) {
        infoPopover.classList.remove('is-visible');
        infoTrigger.classList.remove('is-open');
        infoTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Initial Load from LocalStorage or default to Horizon
  let initialTheme = 'horizon';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && THEME_DATA[saved]) {
      initialTheme = saved;
    }
  } catch (e) {}

  applyTheme(initialTheme, false);
};
