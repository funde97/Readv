/* ═══════════════════════════════════════════════════════════
   WORLD OF FRICTION — MAIN JAVASCRIPT
   ═══════════════════════════════════════════════════════════ */

/* ── STORAGE KEYS ── */
const KEY_NAME        = 'friction_reader_name';
const KEY_VISITED     = 'friction_visited';
const KEY_NAME_SENT   = 'friction_name_sent';

/* ═══════════════════════════════════════════════════════════
   SPLASH SCREEN
   ═══════════════════════════════════════════════════════════ */
function initSplash() {
  const splash = document.getElementById('splash');
  if (!splash) return;

  function dismissSplash() {
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
      showAfterSplash();
    }, 900);
  }

  // Auto-dismiss after 3.5s, or on click/keypress
  setTimeout(dismissSplash, 3500);
  splash.addEventListener('click', dismissSplash);
  document.addEventListener('keydown', function handler(e) {
    dismissSplash();
    document.removeEventListener('keydown', handler);
  });
}

/* ═══════════════════════════════════════════════════════════
   AFTER SPLASH: show name modal or main site
   ═══════════════════════════════════════════════════════════ */
function showAfterSplash() {
  const name = localStorage.getItem(KEY_NAME);

  if (!name) {
    // First-time visitor — ask for name
    showNameModal();
  } else {
    // Returning visitor — go straight to site
    revealMainSite(name);
  }
}

/* ═══════════════════════════════════════════════════════════
   NAME MODAL
   ═══════════════════════════════════════════════════════════ */
function showNameModal() {
  const overlay = document.getElementById('nameModal');
  if (!overlay) return;
  overlay.classList.remove('hidden');

  const input = document.getElementById('readerNameInput');
  const btn   = document.getElementById('nameSubmitBtn');
  const skip  = document.getElementById('nameSkip');

  function submitName() {
    const rawName = input ? input.value.trim() : '';
    const name = rawName || 'Anonymous Reader';
    localStorage.setItem(KEY_NAME, name);
    sendReaderName(name);  // submit to Web3Forms
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.classList.add('hidden');
      revealMainSite(name);
    }, 600);
  }

  if (btn)   btn.addEventListener('click', submitName);
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });
  if (skip)  skip.addEventListener('click', submitName);
}

/* ═══════════════════════════════════════════════════════════
   SEND READER NAME — via Web3Forms
   ─────────────────────────────────────────────────────────
   HOW TO SET UP (takes 1 minute, completely free):
   1. Go to  https://web3forms.com
   2. Type your email address and click "Create Access Key"
   3. Copy the key they give you (looks like: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
   4. Paste it below replacing  YOUR_ACCESS_KEY_HERE
   5. Save and push to GitHub — done. No verification email needed.
      Web3Forms will email you instantly every time a reader signs in.
   ═══════════════════════════════════════════════════════════ */
async function sendReaderName(name) {
  // Only send once per device (won't spam you for repeat visits)
  if (localStorage.getItem(KEY_NAME_SENT)) return;

  // ┌─────────────────────────────────────────────────────┐
  // │  PASTE YOUR WEB3FORMS KEY HERE  ↓                   │
  const ACCESS_KEY = 'a1e1f5d2-e4ee-46c2-aaea-67bafeb0a7f7';
  // └─────────────────────────────────────────────────────┘

  if (ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
    console.info('[Friction] Web3Forms not configured yet. Get your free key at https://web3forms.com and paste it into assets/js/app.js');
    return;
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key:  ACCESS_KEY,
        subject:     '📖 New Reader — World of Friction',
        from_name:   'World of Friction',
        reader_name: name,
        visited_at:  new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        device:      navigator.userAgent.substring(0, 100),
        // Stops Web3Forms from showing their default thank-you page
        botcheck:    ''
      })
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem(KEY_NAME_SENT, '1');
      console.info('[Friction] Reader name sent successfully.');
    } else {
      console.warn('[Friction] Web3Forms responded with error:', data.message);
    }
  } catch (err) {
    // Silently fail — never block the reader's experience
    console.warn('[Friction] Could not send reader name:', err);
  }
}

/* ═══════════════════════════════════════════════════════════
   REVEAL MAIN SITE
   ═══════════════════════════════════════════════════════════ */
function revealMainSite(name) {
  const site = document.getElementById('mainSite');
  if (!site) return;
  site.classList.remove('hidden');
  site.style.animation = 'fadeUp 0.7s ease both';

  // Set greeting in header
  const greetEl = document.getElementById('headerGreeting');
  if (greetEl && name && name !== 'Anonymous Reader') {
    greetEl.innerHTML = `Welcome back, <span class="greeting-name">${escapeHtml(name)}</span>`;
  }

  // Show reading progress labels on book cards
  updateBookCardProgress();
}

/* ═══════════════════════════════════════════════════════════
   READING PROGRESS — SAVE & RESTORE
   Used by chapter pages
   ═══════════════════════════════════════════════════════════ */

/**
 * Save the current chapter to localStorage.
 * Called automatically on every chapter page load.
 * @param {string} storyId      - e.g. "story1"
 * @param {number} chapterNum   - e.g. 3
 * @param {string} chapterTitle - e.g. "Chapter 3: The Storm"
 * @param {string} chapterUrl   - relative URL to return to
 */
function saveChapterProgress(storyId, chapterNum, chapterTitle, chapterUrl) {
  const key  = `friction_progress_${storyId}`;
  const data = { chapter: chapterNum, title: chapterTitle, url: chapterUrl, savedAt: Date.now() };
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Get saved progress for a story.
 * Returns null if no progress saved yet.
 */
function getChapterProgress(storyId) {
  const key = `friction_progress_${storyId}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Show "Continue Reading" banner on story index pages.
 * Call this from each story's index.html.
 */
function initContinueBanner(storyId) {
  const progress = getChapterProgress(storyId);
  const banner   = document.getElementById('continueBanner');
  if (!banner) return;

  if (progress && progress.chapter > 0) {
    const titleEl = banner.querySelector('.continue-chapter-name');
    const linkEl  = banner.querySelector('.btn-continue');
    if (titleEl) titleEl.textContent = progress.title || `Chapter ${progress.chapter}`;
    if (linkEl)  linkEl.href = progress.url;
    banner.classList.remove('hidden');

    // Highlight the last-read chapter in the chapter list
    const entries = document.querySelectorAll('.chapter-entry');
    entries.forEach(entry => {
      if (parseInt(entry.dataset.chapter) === progress.chapter) {
        entry.classList.add('current');
      }
    });
  }
}

/**
 * Update "Reading: Chapter X" labels on home page book cards.
 */
function updateBookCardProgress() {
  const cards = document.querySelectorAll('[data-story-id]');
  cards.forEach(card => {
    const storyId    = card.dataset.storyId;
    const progress   = getChapterProgress(storyId);
    const progressEl = card.querySelector('.book-progress');
    if (progressEl && progress) {
      progressEl.textContent = `Reading: ${progress.title || 'Chapter ' + progress.chapter}`;
      progressEl.classList.remove('hidden');
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   READING PROGRESS BAR (thin gold line at top of chapter pages)
   ═══════════════════════════════════════════════════════════ */
function initReadingProgressBar() {
  const bar = document.getElementById('readingBar');
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct.toFixed(1) + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ═══════════════════════════════════════════════════════════
   SCROLL POSITION SAVE / RESTORE  (chapter pages)
   So readers pick up exactly where they stopped scrolling
   ═══════════════════════════════════════════════════════════ */
function saveScrollPosition(storyId, chapterNum) {
  const key = `friction_scroll_${storyId}_ch${chapterNum}`;
  localStorage.setItem(key, window.scrollY.toString());
}

function restoreScrollPosition(storyId, chapterNum) {
  const key   = `friction_scroll_${storyId}_ch${chapterNum}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    setTimeout(() => window.scrollTo({ top: parseInt(saved), behavior: 'smooth' }), 150);
  }
}

/* ═══════════════════════════════════════════════════════════
   CHAPTER PAGE INIT
   Call initChapterPage({...}) at the bottom of every chapter HTML
   ═══════════════════════════════════════════════════════════ */
function initChapterPage(config) {
  // config = { storyId, chapterNum, chapterTitle, chapterUrl,
  //            prevUrl, nextUrl, totalChapters }

  // 1. Save which chapter the reader is on
  saveChapterProgress(config.storyId, config.chapterNum, config.chapterTitle, config.chapterUrl);

  // 2. Restore scroll position from last visit to this chapter
  restoreScrollPosition(config.storyId, config.chapterNum);

  // 3. Animated reading progress bar
  initReadingProgressBar();

  // 4. Auto-save scroll every 1.5s while reading
  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      saveScrollPosition(config.storyId, config.chapterNum);
    }, 1500);
  }, { passive: true });

  // 5. Wire Prev / Next buttons (top nav bar + bottom nav)
  const prevBtns = [
    document.getElementById('prevChapterBtn'),
    document.getElementById('prevChapterBtnEnd')
  ];
  const nextBtns = [
    document.getElementById('nextChapterBtn'),
    document.getElementById('nextChapterBtnEnd')
  ];

  prevBtns.forEach(btn => {
    if (!btn) return;
    if (config.prevUrl) {
      btn.href = config.prevUrl;
    } else {
      btn.classList.add('disabled');
      btn.removeAttribute('href');
    }
  });

  nextBtns.forEach(btn => {
    if (!btn) return;
    if (config.nextUrl) {
      btn.href = config.nextUrl;
    } else {
      btn.classList.add('disabled');
      btn.removeAttribute('href');
      btn.textContent = 'More coming soon…';
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   UTILITY
   ═══════════════════════════════════════════════════════════ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;');
}

/* ═══════════════════════════════════════════════════════════
   INIT ON LOAD
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('splash')) {
    initSplash();
  }
});
