// Mobile nav toggle
const header = document.getElementById('header');
const toggle = document.getElementById('navToggle');
toggle?.addEventListener('click', () => header.classList.toggle('menu-open'));
document.querySelectorAll('#nav a').forEach(a =>
  a.addEventListener('click', () => header.classList.remove('menu-open'))
);

// Reveal-on-scroll
const els = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
} else {
  els.forEach(el => el.classList.add('in'));
}

// Animated "live" hero screen — cycle beverage ad slides
(function () {
  const slides = Array.from(document.querySelectorAll('.ad-slide'));
  if (slides.length < 2) return;
  const dots = Array.from(document.querySelectorAll('.pl-dot'));
  const nowEl = document.getElementById('nowBrand');
  const bar = document.querySelector('.screen-progress');
  const DUR = 3800;
  let i = 0;

  function show(n) {
    slides.forEach((s, k) => s.classList.toggle('is-active', k === n));
    dots.forEach((d, k) => d.classList.toggle('on', k === n));
    if (nowEl) nowEl.textContent = slides[n].dataset.brand || '';
    if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = 'barFill ' + DUR + 'ms linear'; }
  }

  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  show(0);
  if (!reduce) setInterval(() => { i = (i + 1) % slides.length; show(i); }, DUR);
})();

// Contact form -> pre-filled email (no backend)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = (id) => (document.getElementById(id)?.value || '').trim();
    const name = val('name'), company = val('company'), email = val('email'), role = val('role'), message = val('message');
    if (!name || !email) { alert('Please add your name and email so we can reply.'); return; }
    const subject = `Bev Ads enquiry — ${role || 'General'}${company ? ' — ' + company : ''}`;
    const body =
      `Name: ${name}\n` +
      `Company: ${company}\n` +
      `Email: ${email}\n` +
      `I am a: ${role}\n\n` +
      `${message}`;
    window.location.href =
      `mailto:info@bevads.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
