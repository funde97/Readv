/**
 * app.js — Home page logic for Friction Stories
 * Handles: splash screen, stars animation, name modal, book grid, visitor tracking
 */

const App = {

  // ── Internal state ─────────────────────────────────────────
  _starsRaf: null,
  _stars:    [],


  // ══════════════════════════════════════════════════════════
  //  INIT
  // ══════════════════════════════════════════════════════════
  init() {
    // Populate text from SITE config
    this._applyConfig();

    // Start star animation on the splash canvas
    this._initStars();

    // Keyboard: Enter on splash → enter site
    document.addEventListener('keydown', (e) => {
      const splash = document.getElementById('splash-screen');
      if (e.key === 'Enter' && splash && !splash.classList.contains('fade-out')) {
        this.enter();
      }
    });
  },


  // ══════════════════════════════════════════════════════════
  //  CONFIG → DOM
  // ══════════════════════════════════════════════════════════
  _applyConfig() {
    const S = SITE;
    this._setText('splash-eyebrow',     S.splashLine  || '');
    this._setText('splash-word',        S.splashWord  || '');
    this._setText('splash-sub',         S.splashSub   || '');
    this._setText('header-brand-name',  S.brandName   || '');
    this._setText('hero-main-title',    S.heroTitle   || '');
    this._setText('hero-main-desc',     S.heroDesc    || '');
    this._setText('footer-main-text',   S.footerText  || '');
    this._setText('footer-year',        new Date().getFullYear());
    document.title = `${S.brandName || 'Friction'} — Stories`;
  },


  // ══════════════════════════════════════════════════════════
  //  SPLASH SCREEN — Star Canvas Animation
  // ══════════════════════════════════════════════════════════
  _initStars() {
    const canvas = document.getElementById('stars-canvas');
    if (!canvas) return;
    const ctx   = canvas.getContext('2d');
    let W, H;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Generate stars — varied sizes and twinkle speeds
    this._stars = Array.from({ length: 260 }, () => ({
      x:  Math.random(),          // 0–1 (relative)
      y:  Math.random(),          // 0–1 (relative)
      r:  Math.random() * 1.4 + 0.2,
      a:  Math.random(),          // current opacity
      da: (Math.random() * 0.006 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      this._stars.forEach(s => {
        // Update twinkle
        s.a += s.da;
        if (s.a <= 0.05 || s.a >= 0.95) s.da *= -1;
        s.a = Math.max(0.05, Math.min(0.95, s.a));

        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240, 225, 185, ${s.a * 0.7})`;
        ctx.fill();
      });
      this._starsRaf = requestAnimationFrame(draw);
    };
    draw();
  },

  _stopStars() {
    if (this._starsRaf) cancelAnimationFrame(this._starsRaf);
  },


  // ══════════════════════════════════════════════════════════
  //  ENTER SITE  (button click on splash)
  // ══════════════════════════════════════════════════════════
  enter() {
    const splash = document.getElementById('splash-screen');
    splash.classList.add('fade-out');

    setTimeout(() => {
      splash.style.display = 'none';
      this._stopStars();
      this._showHome();
    }, 600);
  },

  _showHome() {
    document.getElementById('home-page').classList.remove('hidden');

    // Decide whether to show name modal
    const visitor = this._getVisitor();
    if (!visitor.name) {
      setTimeout(() => this.showNameModal(), 400);
    } else {
      this._updateGreeting(visitor.name);
    }

    // Render books grid
    this._renderBooks();
  },


  // ══════════════════════════════════════════════════════════
  //  NAME MODAL
  // ══════════════════════════════════════════════════════════
  showNameModal() {
    const modal = document.getElementById('name-modal');
    modal.classList.remove('hidden');
    setTimeout(() => {
      document.getElementById('name-input').focus();
    }, 200);
  },

  _hideModal() {
    document.getElementById('name-modal').classList.add('hidden');
  },

  _saveName() {
    const input = document.getElementById('name-input');
    const name  = (input.value || '').trim();
    if (!name) { input.focus(); input.classList.add('shake'); setTimeout(() => input.classList.remove('shake'), 400); return; }

    const visitor = this._getVisitor();
    visitor.name = name;
    visitor.namedAt = new Date().toISOString();
    this._saveVisitor(visitor);

    this._updateGreeting(name);
    this._hideModal();

    // Track in Firebase if enabled and not already tracked
    if (!visitor.tracked) {
      this._track(name);
      visitor.tracked = true;
      this._saveVisitor(visitor);
    }
  },

  _updateGreeting(name) {
    const el = document.getElementById('visitor-greeting');
    if (el && name) {
      el.textContent = `Hello, ${name}`;
    }
  },


  // ══════════════════════════════════════════════════════════
  //  BOOKS GRID RENDERER
  // ══════════════════════════════════════════════════════════
  _renderBooks() {
    const grid = document.getElementById('books-grid');
    if (!grid || !Array.isArray(BOOKS)) return;
    grid.innerHTML = '';

    BOOKS.forEach(book => {
      const card  = document.createElement('div');
      card.className = `book-card ${book.status === 'available' ? 'available' : 'locked'}`;
      card.setAttribute('role', 'listitem');

      const progress       = this._getProgress(book.id);
      const chapterCount   = book.chapters ? book.chapters.length : 0;
      const isAvailable    = book.status === 'available';
      const hasContinue    = isAvailable && progress;
      const readerUrl      = hasContinue
        ? `reader.html?book=${book.id}&chapter=${progress.chapterId}`
        : `reader.html?book=${book.id}`;

      // Build badge
      const badgeLabel = isAvailable ? 'Available' : 'Coming Soon';
      const badgeClass = isAvailable ? 'available' : 'coming-soon';

      // Lock overlay (only for coming-soon)
      const lockOverlay = !isAvailable ? `
        <div class="book-lock-overlay">
          <span class="lock-icon">🔒</span>
          <span class="lock-label">Under Construction</span>
        </div>` : '';

      // CTA button
      let ctaHtml;
      if (isAvailable) {
        const btnClass = hasContinue ? 'book-read-btn continue-badge' : 'book-read-btn';
        const btnLabel = hasContinue ? '↩ Continue Reading' : 'Start Reading →';
        ctaHtml = `<a href="${readerUrl}" class="${btnClass}">${btnLabel}</a>`;
      } else {
        ctaHtml = `<span class="book-locked-btn">🔒 Coming Soon</span>`;
      }

      // Chapter count text
      const chText = isAvailable
        ? (chapterCount === 1 ? '1 chapter' : `${chapterCount} chapters`)
        : '— chapters';

      card.innerHTML = `
        <div class="book-cover-wrap">
          <img
            class="book-cover-img"
            src="${book.cover || 'covers/placeholder.svg'}"
            alt="${book.title} cover"
            loading="lazy"
            onerror="this.src='covers/placeholder.svg'"
          >
          <span class="book-status-badge ${badgeClass}">${badgeLabel}</span>
          ${lockOverlay}
        </div>
        <div class="book-card-body">
          ${book.genre ? `<p class="book-genre-tag">${book.genre}</p>` : ''}
          <h3 class="book-title">${book.title}</h3>
          <p class="book-desc">${book.description || ''}</p>
          <div class="book-card-footer">
            <span class="book-chapter-count">${chText}</span>
            ${ctaHtml}
          </div>
        </div>`;

      grid.appendChild(card);
    });
  },


  // ══════════════════════════════════════════════════════════
  //  VISITOR TRACKING  (Firebase Realtime Database REST API)
  // ══════════════════════════════════════════════════════════
  _track(name) {
    if (!TRACKING || !TRACKING.enabled || !TRACKING.firebaseURL) return;

    const url = TRACKING.firebaseURL.replace(/\/$/, '') + '/visitors.json';
    fetch(url, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({
        name:      name,
        visited:   new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 80),
      }),
    }).catch(() => { /* silent fail — tracking should never break the site */ });
  },


  // ══════════════════════════════════════════════════════════
  //  LOCALSTORAGE HELPERS
  // ══════════════════════════════════════════════════════════

  /** Get visitor object from localStorage */
  _getVisitor() {
    try {
      return JSON.parse(localStorage.getItem('friction_visitor') || '{}');
    } catch { return {}; }
  },

  /** Save visitor object to localStorage */
  _saveVisitor(obj) {
    try { localStorage.setItem('friction_visitor', JSON.stringify(obj)); } catch {}
  },

  /** Get reading progress for a specific book */
  _getProgress(bookId) {
    try {
      const all = JSON.parse(localStorage.getItem('friction_progress') || '{}');
      return all[bookId] || null;
    } catch { return null; }
  },

  // ── Utility ────────────────────────────────────────────────
  _setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  },
};


// ── EVENT LISTENERS ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  // Name modal: submit on button click
  document.getElementById('name-submit-btn')
    .addEventListener('click', () => App._saveName());

  // Name modal: submit on Enter key in input
  document.getElementById('name-input')
    .addEventListener('keydown', (e) => { if (e.key === 'Enter') App._saveName(); });

  // Name modal: skip button
  document.getElementById('name-skip-btn')
    .addEventListener('click', () => {
      App._hideModal();
      App._updateGreeting('');
    });

  // Close modal on overlay click (but not box click)
  document.getElementById('name-modal')
    .addEventListener('click', (e) => {
      if (e.target === e.currentTarget) App._hideModal();
    });
});
