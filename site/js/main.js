'use strict';

const header = document.querySelector('.header');
const toggle = document.querySelector('.menu-toggle');
const panel = document.querySelector('#mobile-navigation');
const desktop = matchMedia('(min-width: 1024px)');
let previousOverflow = '';

function setMenu(open, restoreFocus = false) {
  if (open === !panel.hidden) return;
  panel.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  toggle.innerHTML = open
    ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m18 6-12 12M6 6l12 12"/></svg>'
    : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  if (open) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.querySelector('a').focus();
  } else {
    document.body.style.overflow = previousOverflow;
    if (restoreFocus) toggle.focus();
  }
}

toggle.addEventListener('click', () => setMenu(panel.hidden));
header.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
desktop.addEventListener('change', () => { if (desktop.matches) setMenu(false); });
document.addEventListener('keydown', event => {
  if (panel.hidden) return;
  if (event.key === 'Escape') setMenu(false, true);
  if (event.key === 'Tab') {
    const links = [...panel.querySelectorAll('a')];
    const items = [toggle, ...links];
    const index = items.indexOf(document.activeElement);
    if (event.shiftKey && index <= 0) {
      event.preventDefault(); items.at(-1).focus();
    } else if (!event.shiftKey && index === items.length - 1) {
      event.preventDefault(); toggle.focus();
    }
  }
});
function updateHeader() { header.classList.toggle('scrolled', scrollY > 20); }
addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const motion = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal-enter');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll('.hero-copy,.about-visual,.about-copy,.section-heading-row,.specialty,.journey-intro,.timeline-item,.center-heading,.differences-grid > div,.care-values > div,.regions-grid > div,.contact-content').forEach((el, index) => {
    el.style.animationDelay = `${(index % 3) * .05}s`;
    observer.observe(el);
  });
}
