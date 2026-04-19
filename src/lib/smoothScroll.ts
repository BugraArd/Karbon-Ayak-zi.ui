/**
 * Custom smooth scroll with easing animation.
 * Uses requestAnimationFrame for reliable cross-browser smooth scrolling.
 */

const NAV_HEIGHT = 80; // fixed navbar height in px
const DURATION = 900;  // animation duration in ms

/** Ease-in-out cubic easing — starts slow, speeds up, then slows again */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Smoothly scrolls to a target Y position.
 * @param targetY - The final scroll position in pixels
 * @param duration - Animation duration in ms (default: 900)
 */
export function smoothScrollToY(targetY: number, duration = DURATION): void {
  const startY = window.scrollY;
  const distance = targetY - startY;

  // No scroll needed
  if (Math.abs(distance) < 2) return;

  const startTime = performance.now();

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

/**
 * Smoothly scrolls to a section identified by a CSS selector (e.g. "#contact").
 * Accounts for the fixed navbar height.
 * @param selector - CSS selector string, e.g. "#calculators"
 * @param duration - Animation duration in ms (default: 900)
 */
export function smoothScrollToSection(selector: string, duration = DURATION): void {
  if (selector === '#natural-gas' || selector === '#electricity' || selector === '#vehicle') {
    window.dispatchEvent(new CustomEvent('changeCalculator', { detail: selector }));
    selector = '#calculators';
  }

  const element = document.querySelector(selector);
  if (!element) return;

  const elementTop = element.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
  smoothScrollToY(elementTop, duration);
}
