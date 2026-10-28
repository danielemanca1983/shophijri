/**
 * SHOP HIJRI — NAVIGATION & DRAWERS (navigation.js)
 * Mirrors Shopify Horizon's sticky header, mobile menu drawer, search modal, and cart drawer.
 * Exposes window.ShopHijri.initNavigation for direct file:// browser execution without a server.
 */

window.ShopHijri = window.ShopHijri || {};

window.ShopHijri.initNavigation = function initNavigation() {
  const header = document.querySelector('[data-site-header]');
  const backdrop = document.querySelector('[data-drawer-backdrop]');
  const drawers = document.querySelectorAll('[data-drawer]');
  const openTriggers = document.querySelectorAll('[data-drawer-open]');
  const closeTriggers = document.querySelectorAll('[data-drawer-close]');

  let activeDrawer = null;
  let lastFocusedTrigger = null;

  // 1. Sticky Header Scroll Elevation
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 18) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Open / Close Drawer Helpers
  function openDrawer(drawerId, triggerEl = null) {
    const targetDrawer = document.getElementById(drawerId);
    if (!targetDrawer) return;

    drawers.forEach((d) => {
      d.classList.remove('is-open');
      d.setAttribute('aria-hidden', 'true');
    });

    activeDrawer = targetDrawer;
    lastFocusedTrigger = triggerEl;

    targetDrawer.classList.add('is-open');
    targetDrawer.setAttribute('aria-hidden', 'false');
    if (backdrop) {
      backdrop.classList.add('is-active');
    }
    document.body.classList.add('drawer-open');

    if (triggerEl) {
      triggerEl.setAttribute('aria-expanded', 'true');
    }

    const firstFocusable = targetDrawer.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 60);
    }
  }

  function closeAllDrawers() {
    drawers.forEach((d) => {
      d.classList.remove('is-open');
      d.setAttribute('aria-hidden', 'true');
    });
    openTriggers.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
    });
    if (backdrop) {
      backdrop.classList.remove('is-active');
    }
    document.body.classList.remove('drawer-open');

    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
    activeDrawer = null;
  }

  openTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-drawer-open');
      openDrawer(targetId, btn);
    });
  });

  closeTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAllDrawers();
    });
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeAllDrawers);
  }

  document.querySelectorAll('[data-mobile-nav-link]').forEach((link) => {
    link.addEventListener('click', () => {
      closeAllDrawers();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeDrawer) {
      closeAllDrawers();
    }
  });

  return {
    openDrawer,
    closeAllDrawers
  };
};
