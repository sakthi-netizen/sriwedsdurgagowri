// Sri Sakthi weds Durgagowri — site interactions
// 1) Cover "tap to enter"  2) Countdown  3) Scroll-reveal  4) Falling petals

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- Cover screen ---------------- */
  const cover = document.getElementById('cover');
  const enterBtn = document.getElementById('enterBtn');

  const openInvitation = () => {
    cover.classList.add('hide');
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') openInvitation();
  };

  if (enterBtn) enterBtn.addEventListener('click', openInvitation);
  document.addEventListener('keydown', onKey);

  /* ---------------- Countdown ---------------- */
  const target = new Date('2026-11-11T06:00:00+05:30').getTime();
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  const pad = (n) => String(n).padStart(2, '0');

  const tick = () => {
    const now = Date.now();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = pad(days);
    if (hoursEl) hoursEl.textContent = pad(hours);
    if (minsEl) minsEl.textContent = pad(mins);
    if (secsEl) secsEl.textContent = pad(secs);
  };

  tick();
  setInterval(tick, 1000);

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => observer.observe(el));

  /* ---------------- Falling petals ---------------- */
  const field = document.getElementById('petal-field');
  const petalGlyphs = ['🌸', '🌺', '❁'];

  const spawnPetal = () => {
    if (!field) return;
    const petal = document.createElement('span');
    petal.className = 'petal';
    petal.textContent = petalGlyphs[Math.floor(Math.random() * petalGlyphs.length)];
    const left = Math.random() * 100;
    const duration = 9 + Math.random() * 7;
    const drift = (Math.random() - 0.5) * 160;
    const size = 0.8 + Math.random() * 0.9;

    petal.style.left = left + 'vw';
    petal.style.fontSize = size + 'rem';
    petal.style.setProperty('--drift', drift + 'px');
    petal.style.animationDuration = duration + 's';

    field.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000 + 500);
  };

  setInterval(spawnPetal, 1400);
  for (let i = 0; i < 4; i++) setTimeout(spawnPetal, i * 400);
});
