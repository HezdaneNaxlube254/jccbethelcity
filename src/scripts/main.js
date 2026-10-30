const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Hero image rotation (home) ---------- */
(() => {
  const hero = document.getElementById('hero-rotating');
  if (!hero || REDUCED) return;
  const slides = hero.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 5000);
})();

/* ---------- Reveal on scroll ---------- */
if (!REDUCED && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => {
    el.classList.add('will-reveal');
    io.observe(el);
  });
}

/* ---------- Time-aware next service chip ---------- */
(() => {
  const chip = document.querySelector('[data-status-chip]');
  if (!chip) return;
  const services = [
    { day: 2, hour: 18, minute: 0, label: 'Home Bible Churches', time: '6:00 PM', durationMin: 120 },
    { day: 3, hour: 18, minute: 0, label: 'Bible Focus', time: '6:00 PM', durationMin: 120 },
    { day: 4, hour: 18, minute: 0, label: 'Family Fellowship', time: '6:00 PM', durationMin: 120 },
    { day: 5, hour: 22, minute: 0, label: 'Overnight Prayers', time: '10:00 PM', durationMin: 300 },
    { day: 0, hour: 7, minute: 0, label: 'Sunday Prayers', time: '7:00 AM', durationMin: 60 },
    { day: 0, hour: 8, minute: 0, label: 'First Service', time: '8:00 AM', durationMin: 120 },
    { day: 0, hour: 10, minute: 0, label: 'Main Service', time: '10:00 AM', durationMin: 180 },
  ];
  function nairobiNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })); }
  function update() {
    const now = nairobiNow();
    for (const s of services) {
      if (now.getDay() === s.day) {
        const startM = s.hour * 60 + s.minute;
        const curM = now.getHours() * 60 + now.getMinutes();
        if (curM >= startM && curM <= startM + s.durationMin) {
          chip.classList.add('live');
          chip.innerHTML = '<span class="dot"></span> LIVE NOW · Watch';
          chip.onclick = () => (window.location.href = '/watch/');
          chip.style.cursor = 'pointer';
          return;
        }
      }
    }
    const events = [];
    for (const s of services) {
      for (let d = 0; d < 8; d++) {
        const when = new Date(now);
        when.setDate(now.getDate() + d);
        when.setHours(s.hour, s.minute, 0, 0);
        if (when.getDay() === s.day && when > now) { events.push({ ...s, when }); break; }
      }
    }
    events.sort((a, b) => a.when - b.when);
    const next = events[0];
    if (!next) return;
    const diff = next.when - now;
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    let when = days > 0 ? `in ${days}d ${hrs}h` : hrs > 0 ? `in ${hrs}h ${mins}m` : `in ${mins}m`;
    chip.classList.remove('live');
    chip.innerHTML = `<span class="dot"></span> Next: ${next.label} · ${next.time} · ${when}`;
  }
  update();
  setInterval(update, 60000);
})();

/* ---------- Copy-to-clipboard ---------- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  const text = btn.getAttribute('data-copy');
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.classList.add('copied');
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.classList.remove('copied'); btn.textContent = original; }, 1800);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
  });
});

/* ---------- Ministry drawer ---------- */
(() => {
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  if (!drawer || !backdrop) return;
  let lastFocus = null;
  function open(id) {
    const data = window.__MINISTRIES__?.[id];
    if (!data) return;
    lastFocus = document.activeElement;
    drawer.querySelector('[data-title]').textContent = data.title;
    drawer.querySelector('[data-desc]').textContent = data.description;
    drawer.querySelector('[data-leader]').textContent = data.leader;
    drawer.querySelector('[data-meets]').textContent = data.meets;
    const img = drawer.querySelector('[data-img]');
    if (img) { img.src = data.image; img.alt = data.title; }
    const join = drawer.querySelector('[data-join]');
    if (join) join.href = `/connect/?type=volunteer&ministry=${encodeURIComponent(data.title)}`;
    drawer.classList.add('open'); backdrop.classList.add('open');
    drawer.querySelector('.drawer-close').focus();
    document.body.style.overflow = 'hidden';
  }
  function close() {
    drawer.classList.remove('open'); backdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('[data-ministry]').forEach((el) => el.addEventListener('click', () => open(el.getAttribute('data-ministry'))));
  backdrop.addEventListener('click', close);
  drawer.querySelector('.drawer-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) close();
    if (e.key === 'Tab' && drawer.classList.contains('open')) {
      const f = drawer.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])');
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();

/* ---------- Lite YouTube ---------- */
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-yt]');
  if (!trigger) return;
  const id = trigger.getAttribute('data-yt');
  if (!id) return;
  const wrap = trigger.closest('[data-yt-wrap]');
  if (!wrap) return;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('title', 'YouTube video player');
  iframe.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;border:0;';
  wrap.innerHTML = ''; wrap.appendChild(iframe);
});

/* ---------- Forms ---------- */
document.addEventListener('submit', async (e) => {
  const form = e.target.closest('form[data-form]');
  if (!form) return;
  e.preventDefault();
  const msg = form.querySelector('.form-msg');
  const btn = form.querySelector('button[type=submit]');
  const orig = btn.textContent;
  const hp = form.querySelector('input[name="website"]');
  if (hp && hp.value) return;
  let endpoint = form.getAttribute('data-endpoint') || '';
  const fd = new FormData(form);
  const body = Object.fromEntries(fd);
  const key = form.getAttribute('data-key');
  if (endpoint.includes('web3forms') && key) body.access_key = key;
  if (!endpoint || endpoint.includes('TODO_CONFIRM') || !key || key.includes('TODO_CONFIRM')) {
    msg.className = 'form-msg ok';
    msg.textContent = 'Thank you! Form delivery is not yet configured — see README to enable emails.';
    form.reset();
    return;
  }
  btn.disabled = true; btn.textContent = 'Sending…';
  try {
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error('failed');
    msg.className = 'form-msg ok';
    msg.textContent = 'Thank you — we have received your message and will be in touch soon.';
    form.reset();
  } catch {
    msg.className = 'form-msg err';
    msg.textContent = 'Sorry, something went wrong. Please try again or WhatsApp us directly.';
  } finally { btn.disabled = false; btn.textContent = orig; }
});

/* ---------- Filters ---------- */
document.addEventListener('click', (e) => {
  const chip = e.target.closest('[data-filter]');
  if (!chip) return;
  const group = chip.closest('[data-filter-group]');
  if (!group) return;
  group.querySelectorAll('[data-filter]').forEach((c) => c.setAttribute('aria-pressed', 'false'));
  chip.setAttribute('aria-pressed', 'true');
  const val = chip.getAttribute('data-filter');
  const target = group.getAttribute('data-filter-target');
  if (!target) return;
  document.querySelectorAll(`[data-filter-item="${target}"]`).forEach((item) => {
    const tags = (item.getAttribute('data-tags') || '').split(',');
    item.style.display = val === 'all' || tags.includes(val) ? '' : 'none';
  });
});

/* ---------- Tabs (connect) ---------- */
document.addEventListener('click', (e) => {
  const tab = e.target.closest('[data-tab]');
  if (!tab) return;
  const id = tab.getAttribute('data-tab');
  document.querySelectorAll('[data-tab]').forEach((t) => t.setAttribute('aria-pressed', 'false'));
  tab.setAttribute('aria-pressed', 'true');
  document.querySelectorAll('[data-form]').forEach((f) => f.style.display = f.getAttribute('data-form') === id ? '' : 'none');
});
