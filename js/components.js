/* =====================================================
   TrueVue Studio — Component Loader
   Requires js/i18n.js to be loaded BEFORE this file.
   ===================================================== */

/* ── Component Loader ─────────────────────────────── */

(async function () {

  function getBase() {
    const { protocol, host } = window.location;
    return protocol + '//' + host;
  }

  function url(path) {
    return getBase() + '/' + path;
  }

  async function fetchHTML(path) {
    const res = await fetch(url(path));
    if (!res.ok) throw new Error('Failed to load ' + path);
    return res.text();
  }

  /* ── Detect current page ── */
  const raw = window.location.pathname
    .replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/i, '').toLowerCase();

  const pageMap = {
    '': 'home', 'home': 'home', 'index': 'home',
    'services': 'services', 'contact': 'contact', 'about': 'about',
  };
  const currentPage = pageMap[raw] || 'home';

  /* ── Inject Nav ── */
  const navSlot = document.getElementById('nav-slot');
  if (navSlot) {
    try {
      navSlot.innerHTML = await fetchHTML('components/nav.html');
      navSlot.querySelectorAll('[data-page]').forEach(function(a) {
        if (a.dataset.page === currentPage) a.classList.add('active');
      });
      const navbar = document.getElementById('navbar');
      if (navbar) {
        window.addEventListener('scroll', function() {
          navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
      }
      const hamburger  = document.getElementById('hamburger');
      const mobileMenu = document.getElementById('mobileMenu');
      if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function() {
          const isOpen = mobileMenu.classList.toggle('open');
          hamburger.classList.toggle('is-open', isOpen);
          document.body.style.overflow = isOpen ? 'hidden' : '';
        });
        mobileMenu.querySelectorAll('a').forEach(function(a) {
          a.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            hamburger.classList.remove('is-open');
            document.body.style.overflow = '';
          });
        });
      }
    } catch(e) { console.error('Nav load failed:', e); }
  }

  /* ── Inject Footer ── */
  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) {
    try {
      footerSlot.innerHTML = await fetchHTML('components/footer.html');
      footerSlot.querySelectorAll('.year').forEach(function(el) {
        el.textContent = new Date().getFullYear();
      });
    } catch(e) { console.error('Footer load failed:', e); }
  }

  /* ── Apply i18n to everything now in DOM ── */
  if (window.TVi18n) { TVi18n.init(); } else { console.error('i18n.js not loaded before components.js'); }

  /* ── Inject Testimonials ── */
  const testimonialSlots = document.querySelectorAll('[data-testimonials]');
  if (testimonialSlots.length > 0) {
    try {
      const res = await fetch(url('components/testimonials.json'));
      if (!res.ok) throw new Error('testimonials.json not found');
      const data = await res.json();
      testimonialSlots.forEach(function(slot) {
        const track = slot.querySelector('.testimonials-track');
        if (!track) return;
        const cards = data.map(function(t) {
          return '<div class="testimonial-card">' +
            '<div class="testimonial-stars">' + '\u2605'.repeat(t.stars) + '</div>' +
            '<p class="testimonial-text">"' + t.text + '"</p>' +
            '<div class="testimonial-author">' +
              '<div class="testimonial-avatar">' + (t.avatar ? '<img src="' + t.avatar + '" alt="' + t.name + '">' : t.initials) + '</div>' +
              '<div><div class="testimonial-name">' + t.name + '</div><div class="testimonial-role">' + t.role + '</div></div>' +
            '</div></div>';
        }).join('');
        // Duplicate the set so the marquee can loop seamlessly
        track.innerHTML = '<div class="testimonials-marquee">' + cards + cards + '</div>';
        track.style.scrollSnapType = 'none';
        track.scrollLeft = 0;

        const marquee = track.querySelector('.testimonials-marquee');
        const SPEED = 40; // px per second
        let offset = 0, last = null, paused = false, animId = null;

        function halfWidth() {
          // width of one full set (marquee holds two identical sets)
          return marquee.scrollWidth / 2;
        }
        function step(ts) {
          if (last === null) last = ts;
          let dt = (ts - last) / 1000;
          last = ts;
          if (dt > 0.1) dt = 0.1; // skip huge jumps after tab switches
          if (!paused) {
            const half = halfWidth();
            if (half > 0) {
              offset += SPEED * dt;
              if (offset >= half) offset -= half;
              marquee.style.transform = 'translate3d(' + (-offset) + 'px,0,0)';
            }
          }
          animId = requestAnimationFrame(step);
        }
        function start() { if (animId === null) { last = null; animId = requestAnimationFrame(step); } }
        function stop() { if (animId !== null) { cancelAnimationFrame(animId); animId = null; } }

        const pause = function() { paused = true; };
        const resume = function() { paused = false; last = null; };
        track.addEventListener('mouseenter', pause);
        track.addEventListener('mouseleave', resume);
        track.addEventListener('touchstart', pause, { passive: true });
        track.addEventListener('touchend', resume);
        document.addEventListener('visibilitychange', function() {
          if (document.hidden) { stop(); } else { start(); }
        });
        // Only animate while the section is on screen
        if ('IntersectionObserver' in window) {
          new IntersectionObserver(function(entries) {
            entries.forEach(function(e) { e.isIntersecting ? start() : stop(); });
          }, { threshold: 0 }).observe(track);
        }
        start();
      });
    } catch(e) { console.error('Testimonials load failed:', e); }
  }

  /* ── Scroll Reveal ── */
  function initReveal() {
    const obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
  }
  setTimeout(initReveal, 100);

})();
