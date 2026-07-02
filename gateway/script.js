/* ──────────────────────────────────────────────────────────────────
   ZEFERAN — GATEWAY (static HTML)
   Vanilla JS: 4-language switcher + bottom drawer.
   ────────────────────────────────────────────────────────────────── */

/* ─────────────── Translations ─────────────── */

const translations = {
  en: {
    iso: 'Istanbul · Cappadocia',
    lede: 'Savour the true taste of Azerbaijani cuisine with a panoramic view of Istanbul’s Historic Peninsula, and in a fairytale oasis amid the ancient rocks of Cappadocia.',
    picker: 'Choose a destination',
    drawerTitle: 'Where shall we host you?',
    sultanahmet: {
      name: 'Sultanahmet',
      line: 'Historic elegance in the heart of the city.',
    },
    cappadocia: {
      name: 'Cappadocia',
      line: 'Gastronomic masterpieces and an unforgettable atmosphere.',
    },
  },
  tr: {
    iso: 'İstanbul · Kapadokya',
    lede: 'Azerbaycan mutfağının gerçek lezzetlerinin keyfini İstanbul’da Tarihi Yarımada’nın panoramik manzarası eşliğinde, Kapadokya’da ise kadim kayaların ortasındaki masalsı bir vahada çıkarın.',
    picker: 'Destinasyon Seçin',
    drawerTitle: 'Sizi nerede ağırlayalım?',
    sultanahmet: {
      name: 'Sultanahmet',
      line: 'Şehrin kalbinde tarihî zarafet.',
    },
    cappadocia: {
      name: 'Cappadocia',
      line: 'Gastronomi şaheserleri ve unutulmaz bir atmosfer.',
    },
  },
  ru: {
    iso: 'Стамбул · Каппадокия',
    lede: 'Насладитесь настоящим вкусом азербайджанской кухни с панорамным видом на исторический полуостров Стамбула и в сказочном оазисе посреди древних скал Каппадокии.',
    picker: 'Выберите направление',
    drawerTitle: 'Где нас найти',
    sultanahmet: {
      name: 'Султанахмет',
      line: 'Изысканный ужин в самом сердце Стамбула.',
    },
    cappadocia: {
      name: 'Каппадокия',
      line: 'Гастрономические шедевры и незабываемая атмосфера.',
    },
  },
  az: {
    iso: 'İstanbul · Kapadokya',
    copyright: '© MMXXVI Zəfəran',
    lede: 'Azərbaycan mətbəxinin əsl dadından İstanbulda tarixi yarımadanın panoram mənzərəsi ilə, Kapadokyada isə qədim qayaların arasındakı nağılvari vahədə həzz alın.',
    picker: 'İstiqamət seçin',
    drawerTitle: 'Sizi harada qarşılayaq?',
    sultanahmet: {
      name: 'Sultanahmet',
      line: 'Şəhərin qəlbində tarixi zəriflik.',
    },
    cappadocia: {
      name: 'Cappadocia',
      line: 'Qastronomik şahəsərlər və unudulmaz atmosfer.',
    },
  },
};

/* ─────────────── Language switcher ─────────────── */

const LANG_STORAGE_KEY = 'zeferan-lang';
const SUPPORTED_LANGS  = ['en', 'tr', 'az'];
const DEFAULT_LANG     = 'en';

function resolveKey(dict, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), dict);
}

function detectInitialLang() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (SUPPORTED_LANGS.indexOf(stored) !== -1) return stored;
  } catch (_) {}

  const candidates = (navigator.languages && navigator.languages.length)
    ? navigator.languages
    : [navigator.language || navigator.userLanguage || ''];

  for (const raw of candidates) {
    const base = String(raw).toLowerCase().split('-')[0];
    if (SUPPORTED_LANGS.indexOf(base) !== -1) return base;
  }
  return DEFAULT_LANG;
}

const langButtons = document.querySelectorAll('.lang-btn');
const i18nNodes   = document.querySelectorAll('[data-i18n]');

function applyLang(code, persist) {
  const dict = translations[code];
  if (!dict) return;

  document.documentElement.lang = code;

  langButtons.forEach((btn) => {
    const active = btn.dataset.lang === code;
    btn.classList.toggle('lang-btn--active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  i18nNodes.forEach((node) => {
    const value = resolveKey(dict, node.dataset.i18n);
    if (typeof value === 'string') node.textContent = value;
  });

  if (persist) {
    try { localStorage.setItem(LANG_STORAGE_KEY, code); } catch (_) {}
  }
}

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => applyLang(btn.dataset.lang, true));
});

/* ─────────────── Theme toggle ─────────────── */

const themeToggle = document.getElementById('theme-toggle');
const themeMeta   = document.querySelector('meta[name="theme-color"]');

function applyTheme(next) {
  const theme = next === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  if (themeMeta) themeMeta.setAttribute('content', theme === 'light' ? '#F5F0E8' : '#0A0A0A');
  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
    );
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

// Sync aria-label on initial load (theme attr is already set by the inline head script)
applyTheme(document.documentElement.getAttribute('data-theme'));

/* ─────────────── Drawer ─────────────── */

const drawer   = document.getElementById('destinations');
const openBtn  = document.getElementById('open-destinations');
const closers  = drawer.querySelectorAll('[data-close]');
let lastFocus  = null;

function openDrawer() {
  if (drawer.dataset.open === 'true') return;
  lastFocus = document.activeElement;
  drawer.dataset.open = 'true';
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Move focus to the first card after the slide-up animation settles
  window.setTimeout(() => {
    const first = drawer.querySelector('.drawer-card');
    if (first) first.focus({ preventScroll: true });
  }, 380);
}

function closeDrawer() {
  if (drawer.dataset.open !== 'true') return;
  drawer.dataset.open = 'false';
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocus && typeof lastFocus.focus === 'function') {
    lastFocus.focus({ preventScroll: true });
  }
}

openBtn.addEventListener('click', openDrawer);
closers.forEach((el) => el.addEventListener('click', closeDrawer));

// Escape closes the drawer
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && drawer.dataset.open === 'true') {
    e.preventDefault();
    closeDrawer();
  }
});

/* ─────────────── Init ─────────────── */

applyLang(detectInitialLang(), false);
