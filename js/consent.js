/**
 * KVKK / GDPR Cookie Consent
 * - Honors the user's choice in localStorage
 * - Wires Google Consent Mode v2 (works once GTM is configured with a real ID)
 * - No tracking cookies until the user accepts
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'zeferan_consent_v1';
  var LANG_STORAGE_KEY = 'zeferan-lang';
  var EXPIRY_MS = 1000 * 60 * 60 * 24 * 180; // 180 days
  var URL_TO_LANG = { en: 'en', eng: 'en', az: 'tr', tr: 'tk' };
  var LANG_TO_URL = { en: 'en', tr: 'az', tk: 'tr' };
  var currentLang = 'en';

  // ---------- Google Consent Mode v2 default (deny) ----------
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  // ---------- State ----------
  function readState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      if (Date.now() - (parsed.ts || 0) > EXPIRY_MS) return null;
      return parsed;
    } catch (e) {
      return null;
    }
  }

  function writeState(choice) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: choice, ts: Date.now() }));
    } catch (e) {}
  }

  function applyConsent(choice) {
    if (choice === 'accept') {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
    } else {
      gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied'
      });
    }
    window.dataLayer.push({ event: 'consent_decision', consent: choice });
  }

  // ---------- UI ----------
  var TEXT = {
    en: {
      msg: 'We use cookies to provide essential site functionality, measure performance, and improve our service. See our',
      privacy: 'Privacy Policy',
      kvkk: 'KVKK Notice',
      accept: 'Accept all',
      reject: 'Reject non-essential'
    },
    tr: {
      msg: 'Saytın əsas funksionallığını təmin etmək, performansı ölçmək və xidmətimizi yaxşılaşdırmaq üçün cookie istifadə edirik. Daha çox üçün:',
      privacy: 'Məxfilik Siyasəti',
      kvkk: 'KVKK Bildirişi',
      accept: 'Hamısını qəbul et',
      reject: 'Yalnız zəruri olanlar'
    },
    ru: {
      msg: 'Мы используем cookie для основной работы сайта, оценки производительности и улучшения сервиса. Подробнее в:',
      privacy: 'Политике конфиденциальности',
      kvkk: 'Уведомлении KVKK',
      accept: 'Принять все',
      reject: 'Только необходимые'
    },
    tk: {
      msg: 'Sitenin temel işlevlerini sağlamak, performansı ölçmek ve hizmetimizi iyileştirmek için çerez kullanıyoruz. Detaylar için:',
      privacy: 'Gizlilik Politikası',
      kvkk: 'KVKK Aydınlatma Metni',
      accept: 'Tümünü kabul et',
      reject: 'Sadece zorunlu olanlar'
    }
  };

  function detectLang() {
    try {
      var seg = (location.pathname.split('/').filter(Boolean)[0] || '').toLowerCase();
      if (URL_TO_LANG[seg]) return URL_TO_LANG[seg];
      var stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (stored !== 'ru' && TEXT[stored]) return stored;
      var htmlLang = (document.documentElement.lang || '').slice(0, 2).toLowerCase();
      if (htmlLang === 'az') return 'tr';
      if (htmlLang === 'tr') return 'tk';
      if (htmlLang === 'en') return 'en';
      var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
      if (nav === 'az') return 'tr';
      if (nav === 'tr') return 'tk';
      return 'en';
    } catch (e) { return 'en'; }
  }

  function legalHref(page, lang) {
    var activeLang = TEXT[lang] ? lang : 'en';
    var slug = LANG_TO_URL[activeLang] || 'en';
    if (activeLang === 'en') return '/' + page;
    return '/' + slug + '/' + page;
  }

  function bannerMarkup(lang) {
    var t = TEXT[lang] || TEXT.en;
    return '' +
      '<div class="consent-banner-inner">' +
        '<p class="consent-text">' + t.msg +
          ' <a href="' + legalHref('privacy', lang) + '">' + t.privacy + '</a> · ' +
          '<a href="' + legalHref('kvkk', lang) + '">' + t.kvkk + '</a>.' +
        '</p>' +
        '<div class="consent-actions">' +
          '<button type="button" class="consent-btn consent-btn--reject" id="consent-reject">' + t.reject + '</button>' +
          '<button type="button" class="consent-btn consent-btn--accept" id="consent-accept">' + t.accept + '</button>' +
        '</div>' +
      '</div>';
  }

  function setBannerLanguage(banner, lang) {
    var safeLang = TEXT[lang] ? lang : 'en';
    var t = TEXT[safeLang] || TEXT.en;
    banner.setAttribute('aria-label', t.msg);
    banner.innerHTML = bannerMarkup(safeLang);
  }

  function buildBanner(lang) {
    var t = TEXT[lang] || TEXT.en;
    var banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.id = 'consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', t.msg);
    banner.innerHTML =
      '<div class="consent-banner-inner">' +
        '<p class="consent-text">' + t.msg +
          ' <a href="/privacy">' + t.privacy + '</a> · ' +
          '<a href="/kvkk">' + t.kvkk + '</a>.' +
        '</p>' +
        '<div class="consent-actions">' +
          '<button type="button" class="consent-btn consent-btn--reject" id="consent-reject">' + t.reject + '</button>' +
          '<button type="button" class="consent-btn consent-btn--accept" id="consent-accept">' + t.accept + '</button>' +
        '</div>' +
      '</div>';
    setBannerLanguage(banner, lang);
    return banner;
  }

  function showBanner() {
    if (document.getElementById('consent-banner')) return;
    currentLang = detectLang();
    var banner = buildBanner(currentLang);
    document.body.appendChild(banner);
    requestAnimationFrame(function () { banner.classList.add('is-visible'); });

    function decide(choice) {
      writeState(choice);
      applyConsent(choice);
      banner.classList.remove('is-visible');
      setTimeout(function () { if (banner.parentNode) banner.parentNode.removeChild(banner); }, 400);
    }

    banner.addEventListener('click', function (event) {
      var target = event.target;
      if (!target) return;
      if (target.id === 'consent-accept') decide('accept');
      if (target.id === 'consent-reject') decide('reject');
    });
  }

  function setLanguage(lang) {
    if (!TEXT[lang]) return;
    currentLang = lang;
    var banner = document.getElementById('consent-banner');
    if (banner) setBannerLanguage(banner, currentLang);
  }

  // ---------- Bootstrap ----------
  function init() {
    var prior = readState();
    if (prior && prior.choice) {
      applyConsent(prior.choice);
      return;
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showBanner);
    } else {
      showBanner();
    }
  }

  // Expose for "manage cookies" footer link if needed
  window.zeferanConsent = {
    show: showBanner,
    setLanguage: setLanguage,
    reset: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      showBanner();
    },
    state: readState
  };

  window.addEventListener('zeferan:languagechange', function (event) {
    if (event && event.detail && event.detail.lang) {
      setLanguage(event.detail.lang);
    }
  });

  init();
})();
