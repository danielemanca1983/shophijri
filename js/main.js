/**
 * SHOP HIJRI — MAIN ENTRYPOINT (main.js)
 * Initializes navigation, interactive components, and scroll reveal animations.
 * Works directly via local file:// protocol without requiring a build server.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (!window.ShopHijri) return;
  const navController = window.ShopHijri.initNavigation
    ? window.ShopHijri.initNavigation()
    : null;
  if (window.ShopHijri.initInteractions) {
    window.ShopHijri.initInteractions(navController);
  }
  if (window.ShopHijri.initAnimations) {
    window.ShopHijri.initAnimations();
  }
  if (window.ShopHijri.initThemeSwitcher) {
    window.ShopHijri.initThemeSwitcher();
  }
});
