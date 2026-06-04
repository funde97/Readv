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

  const input  = document.getElementById('readerNameInput');
  const btn    = document.getElementById('nameSubmitBtn');
  const skip   = document.getElementById('nameSkip');

  function submitName() {
    const rawName = input ? input.value.trim() : '';
    const name = rawName || 'Anonymous Reader';
    localStorage.setItem(KEY_NAME, name);
    sendReaderName(name);  // submit to FormSubmit
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.classList.add('hidden');
      revealMainSite(name);
    }, 600);
  }

  if (btn) btn.addEventListener('click', submitName);
  if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });
  if (skip) skip.addEventListener('click', submitName); // "skip" still saves "Anonymous"
}

/* ═══════════════════════════════════════════════════════════
   SEND READER NAME TO FORMSUBMIT
   (Free, no signup — just replace YOUR_EMAIL_HERE)
   ═══════════════════════════════════════════════════════════ */
async function sendReaderName(name) {
  // Only send once per device
  if (localStorage.getItem(KEY_NAME_SENT)) return;

  // ╔══════════════════════════════════════════════════════════╗
  // ║  SETUP: Replace YOUR_EMAIL_HERE with your actual email  ║
  // ║  e.g., "yourname@gmail.com"                             ║
  // ║  First submission will ask you to verify your email.    ║
  // ╚══════════════════════════════════════════════════════════╝
  const EMAIL = 'YOUR_EMAIL_HERE';

  if (EMAIL === 'YOUR_EMAIL_HERE') {
    console.info('[Friction] FormSubmit not configured. Add your email in assets/js/app.js');
    return;
  }

  try {
    await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `📖 New Reader on World of Friction`,
        reader_name: name,
        visited_at: new Date().toLocaleString(),
        user_agent: navigator.userAgent.substring(0, 80)
      })
    });
    localStorage.setItem(KEY_NAME_SENT, '1');
  } catch (err) {
    // Silently fail — don't disrupt the reading experience
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

  // Set greeting
  const greetEl = document.getElementById('headerGreeting');
  if (greetEl && name && name !== 'Anonymous Reader') {
    greetEl.innerHTML = `Welcome back, <span class="greeting-name">${escapeHtml(name)}</span>`;
  }

  // Show reading progress on book cards
  updateBookCardProgress();
}

/* ═══════════════════════════════════════════════════════════
   READING PROGRESS — SAVE & RESTORE
   Used by chapter pages
   ═══════════════════════════════════════════════════════════ */

/**
 * Save the current chapter to localStorage.
 * Call this on every chapter page load.
 * @param {string} storyId   - e.g. "story1"
 * @param {number} chapterNum - e.g. 3
 * @param {string} chapterTitle - e.g. "Chapter 3: The Storm"
 * @param {string} chapterUrl - relative URL to return to
 */
function saveChapterProgress(storyId, chapterNum, chapterTitle, chapterUrl) {
  const key = `friction_progress_${storyId}`;
  const data = { chapter: chapterNum, title: chapterTitle, url: chapterUrl, savedAt: Date.now() };
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Get saved progress for a story.
 * Returns null if no progress saved.
 */
function getChapterProgress(storyId) {
  const key = `friction_progress_${storyId}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Show "Continue Reading" banner on story index pages.
 * Call this from story index pages.
 */
function initContinueBanner(storyId) {
  const progress = getChapterProgress(storyId);
  const banner = document.getElementById('continueBanner');
  if (!banner) return;

  if (progress && progress.chapter > 0) {
    const titleEl = banner.querySelector('.continue-chapter-name');
    const linkEl  = banner.querySelector('.btn-continue');
    if (titleEl) titleEl.textContent = progress.title || `Chapter ${progress.chapter}`;
    if (linkEl)  linkEl.href = progress.url;
    banner.classList.remove('hidden');

    // Highlight current chapter in list
    const entries = document.querySelectorAll('.chapter-entry');
    entries.forEach(entry => {
      if (parseInt(entry.dataset.chapter) === progress.chapter) {
        entry.classList.add('current');
      }
    });
  }
}

/**
 * Update progress labels on home page book cards.
 */
function updateBookCardProgress() {
  const cards = document.querySelectorAll('[data-story-id]');
  cards.forEach(card => {
    const storyId = card.dataset.storyId;
    const progress = getChapterProgress(storyId);
    const progressEl = card.querySelector('.book-progress');
    if (progressEl && progress) {
      progressEl.textContent = `Reading: ${progress.title || 'Chapter ' + progress.chapter}`;
      progressEl.classList.remove('hidden');
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   READING PROGRESS BAR (chapter pages)
   ═══════════════════════════════════════════════════════════ */
function initReadingProgressBar() {
  const bar = document.getElementById('readingBar');
  if (!bar) return;

  function update() {
    const scrollTop    = window.scrollY || document.documentElement.scrollTop;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct.toFixed(1) + '%';
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ═══════════════════════════════════════════════════════════
   SCROLL POSITION SAVE/RESTORE (chapter pages)
   ═══════════════════════════════════════════════════════════ */
function saveScrollPosition(storyId, chapterNum) {
  const key = `friction_scroll_${storyId}_ch${chapterNum}`;
  localStorage.setItem(key, window.scrollY.toString());
}

function restoreScrollPosition(storyId, chapterNum) {
  const key = `friction_scroll_${storyId}_ch${chapterNum}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    setTimeout(() => window.scrollTo({ top: parseInt(saved), behavior: 'smooth' }), 100);
  }
}

/* ═══════════════════════════════════════════════════════════
   CHAPTER PAGE INIT
   Call this on every chapter HTML page
   ═══════════════════════════════════════════════════════════ */
function initChapterPage(config) {
  // config = { storyId, storyName, chapterNum, chapterTitle, chapterUrl,
  //            prevUrl, nextUrl, totalChapters }

  // 1. Save progress
  saveChapterProgress(config.storyId, config.chapterNum, config.chapterTitle, config.chapterUrl);

  // 2. Restore scroll position
  restoreScrollPosition(config.storyId, config.chapterNum);

  // 3. Reading progress bar
  initReadingProgressBar();

  // 4. Auto-save scroll as user reads (debounced every 1.5s)
  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      saveScrollPosition(config.storyId, config.chapterNum);
    }, 1500);
  }, { passive: true });

  // 5. Wire prev/next buttons
  const prevBtn = document.getElementById('prevChapterBtn');
  const nextBtn = document.getElementById('nextChapterBtn');
  const prevBtnEnd = document.getElementById('prevChapterBtnEnd');
  const nextBtnEnd = document.getElementById('nextChapterBtnEnd');

  function goTo(url) { window.location.href = url; }

  [prevBtn, prevBtnEnd].forEach(btn => {
    if (!btn) return;
    if (config.prevUrl) {
      btn.href = config.prevUrl;
    } else {
      btn.classList.add('disabled');
    }
  });

  [nextBtn, nextBtnEnd].forEach(btn => {
    if (!btn) return;
    if (config.nextUrl) {
      btn.href = config.nextUrl;
    } else {
      btn.classList.add('disabled');
      btn.textContent = 'More coming soon…';
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   UTILITY
   ═══════════════════════════════════════════════════════════ */
function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ═══════════════════════════════════════════════════════════
   INIT ON LOAD
   ═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('splash')) {
    initSplash();
  }
});
