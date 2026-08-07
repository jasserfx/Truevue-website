/* =====================================================
   TrueVue Studio — Component Loader
   Requires i18n.js to be loaded first (plain <script> tag).
   ===================================================== */

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
    'services': 'services', 'about': 'about', 'contact': 'contact',
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
  TVi18n.init();

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
        track.innerHTML = data.map(function(t) {
          return '<div class="testimonial-card">' +
            '<div class="testimonial-stars">' + '★'.repeat(t.stars) + '</div>' +
            '<p class="testimonial-text">"' + t.text + '"</p>' +
            '<div class="testimonial-author">' +
              '<div class="testimonial-avatar">' + (t.avatar ? '<img src="' + t.avatar + '" alt="' + t.name + '">' : t.initials) + '</div>' +
              '<div><div class="testimonial-name">' + t.name + '</div><div class="testimonial-role">' + t.role + '</div></div>' +
            '</div></div>';
        }).join('');
        track.innerHTML += track.innerHTML;
        track.style.scrollSnapType = 'none';
        let scrolling = true, animId;
        requestAnimationFrame(function() {
          const half = track.scrollWidth / 2;
          let pos = track.scrollLeft;
          function autoScroll() {
            if (!scrolling) return;
            pos += 0.3;
            if (pos >= half) pos -= half;
            track.scrollLeft = pos;
            animId = requestAnimationFrame(autoScroll);
          }
          animId = requestAnimationFrame(autoScroll);
          track.addEventListener('mouseenter', function() { scrolling = false; cancelAnimationFrame(animId); });
          track.addEventListener('mouseleave', function() { scrolling = true; autoScroll(); });
          track.addEventListener('touchstart', function() { scrolling = false; cancelAnimationFrame(animId); }, { passive: true });
          track.addEventListener('touchend',   function() { scrolling = true; autoScroll(); });
        });
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
