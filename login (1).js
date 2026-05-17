/* =========================================================
   login.js — Login Page  (Role-selector + open registration)
   =========================================================
   Flow:
     1. Landing: two big role buttons — "User" and "Network Engineer"
     2. Clicking one slides to a login/register form for that role
     3. Any email works:
        - If email exists in Firebase → verify password, use stored role
        - If email NOT found → auto-create account with the chosen role
     4. After successful login → phone modal (if no phone set) → dashboard
   ========================================================= */

const LoginPage = (() => {

  let _selectedRole = null; // 'viewer' | 'engineer'

  /* ─────────── Public: render ─────────── */
  function render() {
    // Seed some known emails for demo purposes if empty
    if (!localStorage.getItem('telecom_known_emails')) {
      localStorage.setItem('telecom_known_emails', JSON.stringify(['admin@telecom.com', 'engineer@telecom.com', 'user@telecom.com']));
    }

    const root = document.getElementById('login-root');
    root.innerHTML = `
      <div class="login-wrap" style="max-width:420px">

        <!-- Brand -->
        <div class="login-brand">
          <div class="login-brand-icon"><i class="fa-solid fa-tower-cell"></i></div>
          <h1>Telecom Dashboard</h1>
          <p>MONITOR · ANALYZE · OPTIMIZE</p>
        </div>

        <!-- ══ STEP 1: Role selector ══ -->
        <div id="login-step-role" class="login-card">
          <h2>Who are you?</h2>
          <p class="login-sub">Choose your login type to continue</p>

          <div style="display:flex;flex-direction:column;gap:14px;margin-top:8px">

            <button id="btn-role-user" class="role-select-btn">
              <div class="role-btn-icon" style="background:linear-gradient(135deg,#3b9eff,#7c3aed)">
                <i class="fa-solid fa-user"></i>
              </div>
              <div class="role-btn-text">
                <span class="role-btn-label">User</span>
                <span class="role-btn-sub">View dashboards &amp; reports</span>
              </div>
              <i class="fa-solid fa-chevron-right" style="color:var(--text-muted);margin-left:auto"></i>
            </button>

            <button id="btn-role-engineer" class="role-select-btn">
              <div class="role-btn-icon" style="background:linear-gradient(135deg,#38d9a9,#0073e6)">
                <i class="fa-solid fa-screwdriver-wrench"></i>
              </div>
              <div class="role-btn-text">
                <span class="role-btn-label">Network Engineer</span>
                <span class="role-btn-sub">Manage alerts &amp; network operations</span>
              </div>
              <i class="fa-solid fa-chevron-right" style="color:var(--text-muted);margin-left:auto"></i>
            </button>

          </div>

          <p class="login-footer" style="margin-top:20px">© 2024 Telecom Dashboard. All rights reserved.</p>
        </div>

        <!-- ══ STEP 2: Login / Register form ══ -->
        <div id="login-step-form" class="login-card hidden">

          <button id="back-btn" class="role-back-btn">
            <i class="fa-solid fa-arrow-left"></i> Back
          </button>

          <div id="form-role-badge" style="display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:99px;margin-bottom:16px;font-size:13px;font-weight:600"></div>

          <h2 id="form-title">Sign In</h2>
          <p class="login-sub" id="form-sub">Enter your credentials to continue</p>

          <form id="login-form" novalidate>
            <div class="login-field" style="position:relative">
              <label for="login-email">Email</label>
              <input id="login-email" type="email" placeholder="you@example.com" autocomplete="off" />
              <div id="email-suggestions" class="suggestions-list hidden"></div>
            </div>
            <div class="login-field">
              <label for="login-password">Password</label>
              <input id="login-password" type="password" placeholder="••••••••" autocomplete="current-password" />
              <span class="pw-toggle" id="pw-toggle"><i class="fa-solid fa-eye"></i></span>
            </div>
            <!-- Name field (shown for auto-register) -->
            <div class="login-field hidden" id="name-field">
              <label for="login-name">Full Name</label>
              <input id="login-name" type="text" placeholder="Your full name" />
            </div>

            <div id="login-error" style="color:var(--red);font-size:12px;margin-bottom:12px;display:none;background:var(--red-dim);padding:8px 12px;border-radius:var(--radius-sm);border-left:3px solid var(--red)"></div>

            <a href="#" class="forgot-link">Forgot Password?</a>
            <button type="submit" class="login-btn" id="login-btn">Sign In</button>
          </form>

          <p class="login-footer">New here? Just enter your email — we'll create your account automatically.</p>
        </div>

      </div>
    `;

    _attachRoleEvents();
  }

  /* ─────────── Step 1: Role selection ─────────── */
  function _attachRoleEvents() {
    document.getElementById('btn-role-user').addEventListener('click', () => {
      _selectedRole = 'viewer';
      _showForm('User', 'linear-gradient(135deg,#3b9eff,#7c3aed)', 'fa-user');
    });

    document.getElementById('btn-role-engineer').addEventListener('click', () => {
      _selectedRole = 'engineer';
      _showForm('Network Engineer', 'linear-gradient(135deg,#38d9a9,#0073e6)', 'fa-screwdriver-wrench');
    });
  }

  /* ─────────── Step 2: Show login form ─────────── */
  function _showForm(roleLabel, gradient, icon) {
    document.getElementById('login-step-role').classList.add('hidden');
    const formStep = document.getElementById('login-step-form');
    formStep.classList.remove('hidden');

    // Badge
    const badge = document.getElementById('form-role-badge');
    badge.style.background = gradient + '33';
    badge.style.border = '1px solid ' + gradient.match(/#[a-f0-9]+/i)[0] + '55';
    badge.innerHTML = `<i class="fa-solid ${icon}"></i> ${roleLabel}`;

    // Back button
    document.getElementById('back-btn').onclick = () => {
      formStep.classList.add('hidden');
      document.getElementById('login-step-role').classList.remove('hidden');
      document.getElementById('login-error').style.display = 'none';
      document.getElementById('login-form').reset();
    };

    // Password toggle
    const pwToggle = document.getElementById('pw-toggle');
    const pwInput  = document.getElementById('login-password');
    pwToggle.onclick = () => {
      const show = pwInput.type === 'password';
      pwInput.type = show ? 'text' : 'password';
      pwToggle.innerHTML = show
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    };

    // Form submit — only attach once
    const form = document.getElementById('login-form');
    const newForm = form.cloneNode(true); // strip old listeners
    form.parentNode.replaceChild(newForm, form);

    // Re-grab references after clone
    const pwToggle2 = document.getElementById('pw-toggle');
    const pwInput2  = document.getElementById('login-password');
    pwToggle2.onclick = () => {
      const show = pwInput2.type === 'password';
      pwInput2.type = show ? 'text' : 'password';
      pwToggle2.innerHTML = show
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    };

    document.getElementById('login-form').addEventListener('submit', _handleSubmit);

    // --- Suggestion Logic ---
    const emailInput = document.getElementById('login-email');
    const suggList   = document.getElementById('email-suggestions');

    emailInput.addEventListener('focus', () => {
      _showSuggestions(emailInput.value.trim().toLowerCase());
    });

    emailInput.addEventListener('input', () => {
      _showSuggestions(emailInput.value.trim().toLowerCase());
    });

    function _showSuggestions(val) {
      if (!val) {
        suggList.classList.add('hidden');
        return;
      }

      const knownEmails = JSON.parse(localStorage.getItem('telecom_known_emails') || '[]');
      const matches = knownEmails.filter(e => e.startsWith(val));

      if (matches.length > 0) {
        suggList.innerHTML = matches.map(e => `
          <div class="suggestion-item" data-email="${e}">
            <i class="fa-solid fa-clock-rotate-left"></i> ${e}
          </div>
        `).join('');
        suggList.classList.remove('hidden');
      } else {
        suggList.classList.add('hidden');
      }
    }

    suggList.addEventListener('click', e => {
      const item = e.target.closest('.suggestion-item');
      if (item) {
        emailInput.value = item.dataset.email;
        suggList.classList.add('hidden');
        document.getElementById('login-password').focus();
      }
    });

    // Close suggestions on outside click
    document.addEventListener('click', e => {
      if (!emailInput.contains(e.target) && !suggList.contains(e.target)) {
        suggList.classList.add('hidden');
      }
    });
  }

  /* ─────────── Form submit ─────────── */
  async function _handleSubmit(e) {
    e.preventDefault();
    const btn    = document.getElementById('login-btn');
    const errEl  = document.getElementById('login-error');
    const email  = document.getElementById('login-email').value.trim().toLowerCase();
    const pass   = document.getElementById('login-password').value;
    const nameEl = document.getElementById('login-name');
    const name   = nameEl ? nameEl.value.trim() : '';

    errEl.style.display = 'none';

    // Store in history for suggestions (even if login fails later)
    if (email && email.includes('@')) {
      const knownEmails = JSON.parse(localStorage.getItem('telecom_known_emails') || '[]');
      if (!knownEmails.includes(email)) {
        knownEmails.push(email);
        localStorage.setItem('telecom_known_emails', JSON.stringify(knownEmails));
      }
    }

    if (!email || !pass) {
      errEl.textContent = 'Please enter your email and password.';
      errEl.style.display = 'block';
      return;
    }

    // --- Email Format Validation ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errEl.textContent = 'Please enter a valid email address (e.g. user@example.com).';
      errEl.style.display = 'block';
      return;
    }
    if (pass.length < 4) {
      errEl.textContent = 'Password must be at least 4 characters.';
      errEl.style.display = 'block';
      return;
    }

    btn.textContent = 'Verifying…';
    btn.disabled = true;

    try {
      const key = UserDB.emailToKey(email);

      // Try to find existing user
      let user = await FirebaseDB.get(`users/${key}`);

      if (user) {
        /* ── Existing user: verify password ── */
        if (user.password !== pass) {
          errEl.textContent = 'Incorrect password. Please try again.';
          errEl.style.display = 'block';
          btn.textContent = 'Sign In';
          btn.disabled = false;
          return;
        }
        user.key = key;

      } else {
        /* ── New user: auto-register (First time login) ── */
        const newUser = {
          email,
          password: pass,
          role: _selectedRole || 'viewer',
          name: name || email.split('@')[0],
          phone: '',
          createdAt: new Date().toISOString(),
          lastLogin: null,
        };
        await FirebaseDB.set(`users/${key}`, newUser);
        user = { ...newUser, key };
        UI.toast('Account created successfully!', 'success', 2500);
      }

      // Set global state
      AppState.currentUser = user;

      // Record login timestamp
      await UserDB.recordLogin(key);

      // Enter the app
      _enterApp(user);

    } catch (err) {
      console.error('Login error:', err);
      errEl.textContent = 'Connection error — please check your network.';
      errEl.style.display = 'block';
      btn.textContent = 'Sign In';
      btn.disabled = false;
    }
  }

  /* ─────────── Enter the app ─────────── */
  function _enterApp(user) {
    const overlay = document.getElementById('login-overlay');
    const shell   = document.getElementById('app-shell');
    overlay.classList.add('hidden');
    shell.classList.remove('hidden');

    // Update topbar user chip
    const avatarEl = document.querySelector('.user-chip .avatar');
    if (avatarEl) avatarEl.textContent = (user.name || user.email).charAt(0).toUpperCase();
    const nameChipEl = document.querySelector('.user-chip span');
    if (nameChipEl) nameChipEl.textContent = user.name || user.email;

    _navigateToDashboard();
  }

  /* ─────────── Navigate ─────────── */
  function _navigateToDashboard() {
    if (!location.hash || location.hash === '#') {
      location.hash = '#dashboard';
    } else {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  }

  return { render };
})();


/* =========================================================
   Global UI utilities
   ========================================================= */
const UI = {
  toast(msg, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    const t = document.createElement('div');
    const icons = { success: 'fa-check-circle', error: 'fa-circle-xmark', info: 'fa-circle-info' };
    t.className = `toast ${type}`;
    t.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}" style="color:var(--${type === 'success' ? 'green' : type === 'error' ? 'red' : 'accent'})"></i> ${msg}`;
    container.appendChild(t);
    setTimeout(() => t.remove(), duration);
  },
  operatorColor(id) {
    const map = { airtel: '#e8102a', jio: '#0073e6', bsnl: '#ff8c00', vodafone: '#38d9a9' };
    return map[id] || '#8892a4';
  },
  operatorIcon(id) {
    const map = { airtel: 'fa-signal', jio: 'fa-wifi', bsnl: 'fa-tower-broadcast', vodafone: 'fa-circle-nodes' };
    return map[id] || 'fa-signal';
  },
  deltaHtml(val, suffix = '%') {
    const dir = val >= 0 ? 'up' : 'down';
    const icon = val >= 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down';
    return `<span class="kpi-delta ${dir}"><i class="fa-solid ${icon}"></i> ${Math.abs(val)}${suffix} vs last week</span>`;
  },
  statusBadge(status, label) {
    return `<span class="status-badge ${status}">${label}</span>`;
  },
};
