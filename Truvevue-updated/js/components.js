/* =====================================================
   TrueVue Studio — Component Loader
   Injects nav, footer, and testimonials into every page.
   ===================================================== */

(async function () {

  /* ── Helpers ───────────────────────────────────── */
  async function fetchHTML(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}`);
    return res.text();
  }

  /* ── Detect current page ────────────────────────── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const pageMap = {
    'index.html': 'home',
    '': 'home',
    'services.html': 'services',
    'contact.html': 'contact',
  };
  const currentPage = pageMap[path] || 'home';

  /* ── Inject Nav ─────────────────────────────────── */
  const navSlot = document.getElementById('nav-slot');
  if (navSlot) {
    navSlot.innerHTML = await fetchHTML('components/nav.html');

    // Mark active link
    navSlot.querySelectorAll('[data-page]').forEach(a => {
      if (a.dataset.page === currentPage) a.classList.add('active');
    });

    // Scroll behaviour
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on link click inside mobile menu
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Inject Footer ──────────────────────────────── */
  const footerSlot = document.getElementById('footer-slot');
  if (footerSlot) {
    footerSlot.innerHTML = await fetchHTML('components/footer.html');
    // Set year
    footerSlot.querySelectorAll('.year').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ── Inject Testimonials ────────────────────────── */
  const testimonialSlots = document.querySelectorAll('[data-testimonials]');
  if (testimonialSlots.length > 0) {
    const res  = await fetch('components/testimonials.json');
    const data = await res.json();

    testimonialSlots.forEach(slot => {
      const track = slot.querySelector('.testimonials-track');
      if (!track) return;

      track.innerHTML = data.map(t => `
        <div class="testimonial-card">
          <div class="testimonial-stars">${'★'.repeat(t.stars)}</div>
          <p class="testimonial-text">"${t.text}"</p>
          <div class="testimonial-author">
            <div class="testimonial-avatar">
              ${t.avatar
                ? `<img src="${t.avatar}" alt="${t.name}">`
                : t.initials}
            </div>
            <div>
              <div class="testimonial-name">${t.name}</div>
              <div class="testimonial-role">${t.role}</div>
            </div>
          </div>
        </div>
      `).join('');

      // ── AUTO-SCROLL (infinite seamless loop) ─────
      track.innerHTML += track.innerHTML;
      track.style.scrollSnapType = 'none';

      let scrolling = true;
      let animId;

      // Wait for layout to settle so scrollWidth is accurate
      requestAnimationFrame(() => {
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

        // Pause on hover — NO snap change, NO position reset
        track.addEventListener('mouseenter', () => {
          scrolling = false;
          cancelAnimationFrame(animId);
        });
        track.addEventListener('mouseleave', () => {
          scrolling = true;
          autoScroll();
        });
        track.addEventListener('touchstart', () => {
          scrolling = false;
          cancelAnimationFrame(animId);
        }, { passive: true });
        track.addEventListener('touchend', () => {
          scrolling = true;
          autoScroll();
        });
      });
    });
  }

  /* ── Scroll Reveal ──────────────────────────────── */
  function initReveal() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }
  // Run after components are painted
  setTimeout(initReveal, 100);

})();