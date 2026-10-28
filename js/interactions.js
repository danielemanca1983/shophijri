/**
 * SHOP HIJRI — COMPONENT INTERACTIONS (interactions.js)
 * Handles:
 * 1. Featured Current Volume media gallery switcher (`_product-media-gallery.liquid`)
 * 2. Subscription vs. One-Time purchase selector (`Shopify Subscriptions` app block)
 * 3. Reader Testimonials manual accessible slideshow (`sections/slideshow.liquid`)
 * 4. Transparent prototype feedback for Add-to-Cart and Newsletter form
 */

window.ShopHijri = window.ShopHijri || {};

window.ShopHijri.initInteractions = function initInteractions(navController) {
  initProductGallery();
  initPurchasePlanSelector(navController);
  initTestimonialsSlideshow();
  initNewsletterForm();
};

function initProductGallery() {
  const mainImg = document.getElementById('featured-main-image');
  const mainCaption = document.getElementById('featured-main-caption');
  const thumbs = document.querySelectorAll('[data-gallery-thumb]');

  if (!mainImg || !thumbs.length) return;

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.getAttribute('data-src');
      const newAlt = thumb.getAttribute('data-alt');
      const newCaption = thumb.getAttribute('data-caption');

      thumbs.forEach((t) => t.setAttribute('aria-selected', 'false'));
      thumb.setAttribute('aria-selected', 'true');

      mainImg.style.opacity = '0.35';
      setTimeout(() => {
        mainImg.src = newSrc;
        if (newAlt) mainImg.alt = newAlt;
        if (mainCaption && newCaption) {
          mainCaption.textContent = newCaption;
        }
        mainImg.style.opacity = '1';
      }, 140);
    });
  });
}

function initPurchasePlanSelector(navController) {
  const planCards = document.querySelectorAll('[data-plan-option]');
  const radios = document.querySelectorAll('input[name="purchase_plan"]');
  const priceCurrent = document.getElementById('featured-price-current');
  const priceCompare = document.getElementById('featured-price-compare');
  const priceBadge = document.getElementById('featured-price-badge');
  const submitBtn = document.getElementById('featured-submit-btn');
  const submitBtnText = document.getElementById('featured-submit-text');

  const cartPlanLabel = document.getElementById('cart-preview-plan');
  const cartPriceLabel = document.getElementById('cart-preview-price');
  const cartSubtotalLabel = document.getElementById('cart-preview-subtotal');

  function updatePlanUI(selectedValue) {
    planCards.forEach((card) => {
      const planType = card.getAttribute('data-plan-option');
      if (planType === selectedValue) {
        card.classList.add('is-selected');
      } else {
        card.classList.remove('is-selected');
      }
    });

    if (selectedValue === 'subscription') {
      if (priceCurrent) priceCurrent.textContent = '£11.99 GBP';
      if (priceCompare) {
        priceCompare.textContent = '£14.99 GBP';
        priceCompare.hidden = false;
      }
      if (priceBadge) {
        priceBadge.textContent = 'Save 20% Monthly';
        priceBadge.hidden = false;
      }
      if (submitBtnText) {
        submitBtnText.textContent = 'Subscribe — £11.99 / month';
      }
      if (cartPlanLabel) {
        cartPlanLabel.textContent =
          'Monthly Subscription (Deliver every month • Auto-renews, skip or cancel anytime)';
      }
      if (cartPriceLabel) cartPriceLabel.textContent = '£11.99 GBP';
      if (cartSubtotalLabel) cartSubtotalLabel.textContent = '£11.99 GBP';
    } else {
      if (priceCurrent) priceCurrent.textContent = '£14.99 GBP';
      if (priceCompare) {
        priceCompare.hidden = true;
      }
      if (priceBadge) {
        priceBadge.textContent = 'Single Pre-Order Edition';
        priceBadge.hidden = false;
      }
      if (submitBtnText) {
        submitBtnText.textContent = 'Pre-Order Single Volume — £14.99';
      }
      if (cartPlanLabel) {
        cartPlanLabel.textContent =
          'One-Time Purchase (Single Pre-Order Issue • No subscription commitment)';
      }
      if (cartPriceLabel) cartPriceLabel.textContent = '£14.99 GBP';
      if (cartSubtotalLabel) cartSubtotalLabel.textContent = '£14.99 GBP';
    }
  }

  radios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      updatePlanUI(e.target.value);
    });
  });

  if (submitBtn && navController) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      navController.openDrawer('cart-drawer', submitBtn);
    });
  }
}

function initTestimonialsSlideshow() {
  const container = document.querySelector('[data-testimonial-slideshow]');
  if (!container) return;

  const slides = container.querySelectorAll('[data-testimonial-slide]');
  const dots = container.querySelectorAll('[data-testimonial-dot]');
  const prevBtn = container.querySelector('[data-testimonial-prev]');
  const nextBtn = container.querySelector('[data-testimonial-next]');
  const liveStatus = container.querySelector('[data-testimonial-status]');

  let currentIndex = 0;

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, idx) => {
      const isActive = idx === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    dots.forEach((dot, idx) => {
      const isSelected = idx === currentIndex;
      dot.setAttribute('aria-selected', String(isSelected));
    });

    if (liveStatus) {
      liveStatus.textContent = `Showing reader reflection ${currentIndex + 1} of ${slides.length}`;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => goToSlide(idx));
  });

  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goToSlide(currentIndex + 1);
    }
  });
}

function initNewsletterForm() {
  const form = document.getElementById('footer-newsletter-form');
  const feedback = document.getElementById('newsletter-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value.trim() : '';

    if (!email) return;

    feedback.hidden = false;
    feedback.textContent =
      `Thank you for subscribing with ${email}. Welcome to Hijri.`;
  });
}
