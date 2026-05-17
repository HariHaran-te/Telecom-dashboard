/* =========================================================
   settings.js — Page 8: Settings
   ========================================================= */

const SettingsPage = (() => {

  const NAV_ITEMS = [
    { id: 'general',      icon: 'fa-gear',           label: 'General' },
    { id: 'alert-rules',  icon: 'fa-bell',           label: 'Alert Rules' },
    { id: 'integrations', icon: 'fa-plug',           label: 'Integrations' },
    { id: 'system',       icon: 'fa-users',          label: 'System' },
  ];
  let activeSection = 'general';

  function render(container) {
    activeSection = 'general';
    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Settings</h1>
      </div>

      <div class="settings-layout">
        <!-- Settings nav -->
        <div class="card settings-nav" id="settings-nav">
          ${NAV_ITEMS.map(item => `
            <div class="settings-nav-item ${item.id === activeSection ? 'active' : ''}" data-section="${item.id}">
              <i class="fa-solid ${item.icon}"></i> ${item.label}
            </div>
          `).join('')}
        </div>

        <!-- Settings panel -->
        <div class="card" id="settings-panel"></div>
      </div>
    `;

    document.getElementById('settings-nav').addEventListener('click', e => {
      const item = e.target.closest('.settings-nav-item');
      if (!item) return;
      activeSection = item.dataset.section;
      document.querySelectorAll('.settings-nav-item').forEach(el => el.classList.remove('active'));
      item.classList.add('active');
      _renderPanel();
    });

    _renderPanel();
  }

  function _renderPanel() {
    const panel = document.getElementById('settings-panel');
    const s = DB.settings;

    if (activeSection === 'general') {
      panel.innerHTML = `
        <h3 style="font-size:16px;font-weight:600;margin-bottom:4px">General Settings</h3>
        <p class="text-muted" style="margin-bottom:20px">Configure general dashboard preferences</p>

        <div class="form-row">
          <label class="form-label">Dashboard Refresh Interval</label>
          <select class="form-select" id="refresh-select">
            ${['1 Minute','5 Minutes','10 Minutes','30 Minutes'].map(v =>
              `<option ${v===s.refreshInterval?'selected':''}>${v}</option>`).join('')}
          </select>
        </div>

        <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:4px 16px;margin-bottom:20px">
          ${_toggle('email-notif',  'Email Notifications',  'Receive email alerts for critical events', s.emailNotifications)}
          ${_toggle('auto-reports', 'Auto-generate Reports','Automatically generate weekly reports',     s.autoReports)}
        </div>

        <div class="form-row">
          <label class="form-label">Default Time Zone</label>
          <select class="form-select" id="timezone-select">
            <option value="Pacific/Honolulu">(UTC-10:00) Hawaii</option>
            <option value="America/Anchorage">(UTC-09:00) Alaska</option>
            <option value="America/Los_Angeles">(UTC-08:00) Pacific Time (US & Canada)</option>
            <option value="America/Denver">(UTC-07:00) Mountain Time (US & Canada)</option>
            <option value="America/Chicago">(UTC-06:00) Central Time (US & Canada)</option>
            <option value="America/New_York">(UTC-05:00) Eastern Time (US & Canada)</option>
            <option value="America/Sao_Paulo">(UTC-03:00) Brasilia</option>
            <option value="UTC">(UTC) Coordinated Universal Time</option>
            <option value="Europe/London">(UTC+00:00) London</option>
            <option value="Europe/Paris">(UTC+01:00) Paris, Berlin, Rome</option>
            <option value="Africa/Cairo">(UTC+02:00) Cairo</option>
            <option value="Europe/Moscow">(UTC+03:00) Moscow</option>
            <option value="Asia/Dubai">(UTC+04:00) Dubai</option>
            <option value="Asia/Kolkata" selected>(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
            <option value="Asia/Dhaka">(UTC+06:00) Dhaka</option>
            <option value="Asia/Bangkok">(UTC+07:00) Bangkok, Hanoi, Jakarta</option>
            <option value="Asia/Singapore">(UTC+08:00) Singapore</option>
            <option value="Asia/Tokyo">(UTC+09:00) Tokyo, Seoul</option>
            <option value="Australia/Sydney">(UTC+10:00) Sydney</option>
            <option value="Pacific/Auckland">(UTC+12:00) Auckland</option>
          </select>
        </div>

        <button class="btn btn-primary" onclick="_saveGeneral()">
          <i class="fa-solid fa-floppy-disk"></i> Save Changes
        </button>
      `;

    } else if (activeSection === 'alert-rules') {
      const t = s.thresholds;
      panel.innerHTML = `
        <h3 style="font-size:16px;font-weight:600;margin-bottom:4px">Alert Thresholds</h3>
        <p class="text-muted" style="margin-bottom:20px">Set threshold values that trigger alerts</p>

        ${_range('pkt-loss',  'High Packet Loss Threshold (%)', t.packetLoss, 0, 20)}
        ${_range('latency',   'High Latency Threshold (ms)',    t.latency,    0, 200)}
        ${_range('site-down', 'Site Down Timeout (minutes)',    t.siteDown,   1, 60)}
        ${_range('low-bat',   'Low Battery Threshold (%)',      t.lowBattery, 0, 50)}

        <button class="btn btn-primary" onclick="_saveThresholds()">
          <i class="fa-solid fa-floppy-disk"></i> Save Thresholds
        </button>
      `;

      // attach range listeners
      ['pkt-loss','latency','site-down','low-bat'].forEach(id => {
        const el = document.getElementById(`range-${id}`);
        if (el) el.addEventListener('input', () => {
          document.getElementById(`val-${id}`).textContent = el.value;
        });
      });

    } else if (activeSection === 'integrations') {
      panel.innerHTML = `
        <h3 style="font-size:16px;font-weight:600;margin-bottom:4px">Integrations</h3>
        <p class="text-muted" style="margin-bottom:20px">Connect external services and APIs</p>
        ${[
          { name: 'Slack', desc: 'Send alerts to Slack channels', icon: 'fa-slack', connected: false },
          { name: 'PagerDuty', desc: 'Incident management integration', icon: 'fa-pager', connected: true },
          { name: 'DataDog', desc: 'Infrastructure monitoring', icon: 'fa-chart-area', connected: false },
          { name: 'Webhook', desc: 'Custom HTTP webhook endpoints', icon: 'fa-code-branch', connected: false },
        ].map(item => `
          <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-bottom:1px solid var(--border)">
            <div style="display:flex;align-items:center;gap:12px">
              <div style="width:40px;height:40px;background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--accent)">
                <i class="fa-brands ${item.icon}" style="font-size:18px"></i>
              </div>
              <div>
                <div style="font-weight:600;font-size:14px">${item.name}</div>
                <div style="font-size:12px;color:var(--text-muted)">${item.desc}</div>
              </div>
            </div>
            <button class="btn ${item.connected ? 'btn-outline' : 'btn-primary'}" style="font-size:12px;padding:6px 14px"
              onclick="UI.toast('${item.name} ${item.connected ? 'disconnected' : 'connected'}!', '${item.connected ? 'info' : 'success'}')">
              ${item.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        `).join('')}
      `;

    } else {
      // System — User Management
      panel.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
          <div>
            <h3 style="font-size:16px;font-weight:600;margin-bottom:4px">User Management</h3>
            <p class="text-muted">Manage dashboard users and permissions</p>
          </div>
          <button class="btn btn-primary" onclick="UI.toast('Add user modal coming soon','info')">
            <i class="fa-solid fa-user-plus"></i> Add User
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="data-table">
            <thead>
              <tr><th>User</th><th>Role</th><th>Last Login</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${DB.users.map(u => `
                <tr>
                  <td style="font-weight:500">${u.email}</td>
                  <td style="color:var(--text-secondary)">${u.role}</td>
                  <td style="font-size:12px;color:var(--text-muted)">${u.lastLogin}</td>
                  <td>${UI.statusBadge(u.status, u.status.charAt(0).toUpperCase()+u.status.slice(1))}</td>
                  <td>
                    <div style="display:flex;gap:8px">
                      <button class="btn btn-ghost" style="padding:4px 10px;font-size:12px"
                        onclick="UI.toast('Edit user: ${u.email}','info')">
                        <i class="fa-solid fa-pen"></i>
                      </button>
                      <button class="btn btn-ghost" style="padding:4px 10px;font-size:12px;color:var(--red)"
                        onclick="UI.toast('User deleted','error')">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  }

  function _toggle(id, label, sub, checked) {
    return `
      <div class="toggle-row">
        <div class="toggle-label-group">
          <div class="toggle-label-main">${label}</div>
          <div class="toggle-label-sub">${sub}</div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="${id}" ${checked ? 'checked' : ''} />
          <span class="toggle-slider"></span>
        </label>
      </div>
    `;
  }

  function _range(id, label, value, min, max) {
    return `
      <div class="range-row">
        <div class="range-header">
          <span>${label}</span>
          <span class="range-val" id="val-${id}">${value}</span>
        </div>
        <input type="range" id="range-${id}" min="${min}" max="${max}" value="${value}" />
      </div>
    `;
  }

  window._saveGeneral = () => {
    DB.settings.refreshInterval = document.getElementById('refresh-select').value;
    DB.settings.emailNotifications = document.getElementById('email-notif').checked;
    DB.settings.autoReports        = document.getElementById('auto-reports').checked;
    DB.settings.timezone           = document.getElementById('timezone-select').value;
    UI.toast('Settings saved!', 'success');
  };

  window._saveThresholds = () => {
    DB.settings.thresholds.packetLoss = parseInt(document.getElementById('range-pkt-loss').value);
    DB.settings.thresholds.latency    = parseInt(document.getElementById('range-latency').value);
    DB.settings.thresholds.siteDown   = parseInt(document.getElementById('range-site-down').value);
    DB.settings.thresholds.lowBattery = parseInt(document.getElementById('range-low-bat').value);
    UI.toast('Thresholds saved!', 'success');
  };

  return { render };
})();
