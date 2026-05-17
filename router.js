/* =========================================================
   router.js — SPA hash-based router + sidebar logic
   ========================================================= */

const Router = (() => {

  const ROUTES = {
    'dashboard':       { page: DashboardPage },
    'operators':       { page: OperatorsPage },
    'network-map':     { page: NetworkMapPage },
    'alerts':          { page: AlertsPage },
    'settings':        { page: SettingsPage },
    'operator-detail': { page: OperatorDetailPage, param: true },
  };

  const NAV_MAP = {
    'dashboard':       'nav-dashboard',
    'operators':       'nav-operators',
    'operator-detail': 'nav-operators',
    'network-map':     'nav-network-map',
    'alerts':          'nav-alerts',
    'settings':        'nav-settings',
  };

  function _parseHash() {
    const hash = location.hash.replace('#', '') || 'dashboard';
    const [route, queryStr] = hash.split('?');
    const params = {};
    if (queryStr) {
      queryStr.split('&').forEach(pair => {
        const [k, v] = pair.split('=');
        params[k] = decodeURIComponent(v || '');
      });
    }
    return { route, params };
  }

  function _setActiveNav(route) {
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navId = NAV_MAP[route];
    if (navId) {
      const el = document.getElementById(navId);
      if (el) el.classList.add('active');
    }
  }

  function _render() {
    const { route, params } = _parseHash();
    const container = document.getElementById('page-content');

    // Scroll to top
    container.scrollTop = 0;

    const routeConfig = ROUTES[route];
    if (!routeConfig) {
      container.innerHTML = `
        <div style="text-align:center;padding:80px 20px">
          <div style="font-size:64px;margin-bottom:16px">🔍</div>
          <h2>Page Not Found</h2>
          <p class="text-muted" style="margin:8px 0 24px">The page <code>#${route}</code> doesn't exist.</p>
          <a href="#dashboard" class="btn btn-primary">Go to Dashboard</a>
        </div>
      `;
      return;
    }

    _setActiveNav(route);

    if (routeConfig.param) {
      routeConfig.page.render(container, params.id || DB.operators[0].id);
    } else {
      routeConfig.page.render(container);
    }
  }

  function navigate(hash) {
    location.hash = '#' + hash;
  }

  function init() {
    window.addEventListener('hashchange', _render);
    // Initial render — triggered after login, but also handle direct hash loads
    _render();

    /* ---- Sidebar toggle ---- */
    const sidebar     = document.getElementById('sidebar');
    const toggleBtn   = document.getElementById('sidebar-toggle');
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      // Relayout any active chart after sidebar motion
      setTimeout(() => window.dispatchEvent(new Event('resize')), 250);
    });

    /* ---- Logout ---- */
    document.getElementById('logout-btn').addEventListener('click', () => {
      AppState.currentUser = null;
      document.getElementById('app-shell').classList.add('hidden');
      const overlay = document.getElementById('login-overlay');
      overlay.classList.remove('hidden');
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = '';
      LoginPage.render();
      location.hash = '';
    });
  }

  return { init, navigate };
})();

/* =========================================================
   Bootstrap — run on DOMContentLoaded
   ========================================================= */
document.addEventListener('DOMContentLoaded', async () => {
  // Seed default users in Firebase (no-op if already seeded)
  await UserDB.seedDefaultUsers().catch(err => console.warn('Seed skipped:', err));

  // Render login page first
  LoginPage.render();

  // Router is initialized after successful login (triggered by LoginPage)
  Router.init();
});
