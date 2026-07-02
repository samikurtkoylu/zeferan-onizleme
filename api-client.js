(function () {
  'use strict';

  var base = (window.ZEFERAN_API_BASE || '/api').replace(/\/+$/, '');
  var csrfToken = '';

  function buildUrl(path) {
    var cleanPath = String(path || '').replace(/^\/+/, '');
    return base + '/' + cleanPath;
  }

  function isStateChanging(method) {
    var m = String(method || 'GET').toUpperCase();
    return m === 'POST' || m === 'PUT' || m === 'PATCH' || m === 'DELETE';
  }

  function notifyAuthRequired(path, response, payload) {
    var message = payload && (payload.message || payload.error);
    var isAuthRequired = response && response.status === 401 && message === 'Authentication required';
    if (!isAuthRequired) return;

    try {
      sessionStorage.removeItem('zeferan_session');
      sessionStorage.removeItem('zeferan_admin');
    } catch (_) {}

    try {
      window.dispatchEvent(new CustomEvent('zeferan:auth-required', {
        detail: { path: path, status: response.status, payload: payload || null },
      }));
    } catch (_) {}
  }

  async function parseResponse(response) {
    var contentType = response.headers.get('content-type') || '';
    if (contentType.indexOf('application/json') !== -1) {
      return response.json();
    }

    var text = await response.text();
    return { ok: response.ok, message: text };
  }

  async function request(path, options) {
    var settings = options || {};
    var method = settings.method || 'GET';
    var init = {
      method: method,
      credentials: 'same-origin',
      headers: Object.assign({ Accept: 'application/json' }, settings.headers || {}),
    };

    if (method === 'GET') {
      init.cache = 'no-store';
    }

    if (isStateChanging(method) && csrfToken) {
      init.headers['X-CSRF-Token'] = csrfToken;
    }

    if (settings.formData) {
      init.body = settings.formData;
    } else if (settings.body !== undefined) {
      init.headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(settings.body);
    }

    var response = await fetch(buildUrl(path), init);
    var payload = await parseResponse(response);

    // Server may rotate or refresh the token in any response — pick it up if present
    if (payload && typeof payload.csrfToken === 'string' && payload.csrfToken) {
      csrfToken = payload.csrfToken;
    }

    if (!response.ok || (payload && payload.ok === false)) {
      var message = payload && (payload.message || payload.error) ? (payload.message || payload.error) : ('HTTP ' + response.status);
      var error = new Error(message);
      error.status = response.status;
      error.payload = payload;
      notifyAuthRequired(path, response, payload);
      throw error;
    }

    return payload || { ok: true };
  }

  window.zeferanApi = {
    request: request,
    getCsrfToken: function () { return csrfToken; },
    setCsrfToken: function (token) { csrfToken = String(token || ''); },
    auth: {
      bootstrap: function () {
        return request('auth/seed.php', { method: 'POST' });
      },
      login: function (username, password) {
        return request('auth/login.php', {
          method: 'POST',
          body: { username: username, password: password },
        });
      },
      logout: function () {
        return request('auth/logout.php', { method: 'POST' }).finally(function () {
          csrfToken = '';
        });
      },
      session: function () {
        return request('auth/session.php');
      },
    },
    menu: {
      get: function () {
        return request('menu/get.php');
      },
      save: function (payload) {
        return request('menu/save.php', { method: 'POST', body: payload });
      },
      uploadImage: function (file, itemId, oldUrl) {
        var formData = new FormData();
        formData.append('image', file);
        if (itemId !== undefined && itemId !== null) {
          formData.append('itemId', String(itemId));
        }
        if (oldUrl) {
          formData.append('oldUrl', oldUrl);
        }
        return request('menu/upload-image.php', { method: 'POST', formData: formData });
      },
    },
    reservations: {
      list: function () {
        return request('reservations/list.php');
      },
      upsert: function (reservation) {
        return request('reservations/upsert.php', { method: 'POST', body: reservation });
      },
      remove: function (id) {
        return request('reservations/delete.php', { method: 'POST', body: { id: id } });
      },
      valeAck: function (id, action) {
        return request('reservations/vale-ack.php', {
          method: 'POST',
          body: { id: id, action: action },
        });
      },
    },
    settings: {
      get: function (key) {
        return request('settings/get.php?key=' + encodeURIComponent(key));
      },
      save: function (key, value) {
        return request('settings/save.php', {
          method: 'POST',
          body: { key: key, value: String(value) },
        });
      },
    },
    notify: {
      telegramConfigGet: function () {
        return request('notify/telegram-config.php');
      },
      telegramConfigSave: function (payload) {
        return request('notify/telegram-config.php', { method: 'POST', body: payload });
      },
      telegramSend: function (message, parseMode) {
        return request('notify/telegram.php', {
          method: 'POST',
          body: { message: message, parseMode: parseMode || 'HTML' },
        });
      },
    },
    users: {
      list: function () {
        return request('users/list.php');
      },
      get: function (id) {
        return request('users/get.php?id=' + encodeURIComponent(id));
      },
      save: function (payload) {
        return request('users/save.php', { method: 'POST', body: payload });
      },
      resetPassword: function (id, password) {
        return request('users/reset-password.php', {
          method: 'POST',
          body: { id: id, password: password },
        });
      },
      changePassword: function (currentPassword, newPassword) {
        return request('users/change-password.php', {
          method: 'POST',
          body: { currentPassword: currentPassword, newPassword: newPassword },
        });
      },
      toggleActive: function (id, active) {
        return request('users/toggle-active.php', {
          method: 'POST',
          body: { id: id, active: !!active },
        });
      },
    },
  };
})();
