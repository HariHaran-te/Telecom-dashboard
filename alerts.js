/* =========================================================
   alerts.js — Page 6: Alerts & Notifications (role-based)
   ========================================================= */

const AlertsPage = (() => {

  function render(container) {
    const { alerts, alertSummary } = DB;

    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Alerts &amp; Notifications</h1>
        <div class="page-actions">
          ${AppState.isEngineer() ? `
            <button class="btn btn-ghost" id="mark-all-btn">
              <i class="fa-regular fa-circle-check"></i> Mark All as Read
            </button>
          ` : `
            <span class="status-badge acknowledged" style="padding:6px 14px;font-size:12px">
              <i class="fa-solid fa-eye"></i> View-only mode
            </span>
          `}
        </div>
      </div>

      <!-- Role info banner for viewers -->
      ${!AppState.isEngineer() ? `
        <div style="background:var(--yellow-dim);border:1px solid var(--yellow);border-radius:var(--radius-md);padding:12px 16px;margin-bottom:20px;display:flex;align-items:center;gap:10px">
          <i class="fa-solid fa-triangle-exclamation" style="color:var(--yellow)"></i>
          <span style="font-size:13px">You are logged in as <strong>${AppState.currentUser ? AppState.currentUser.role : 'viewer'}</strong>. Only Network Engineers can acknowledge or resolve alerts.</span>
        </div>
      ` : ''}

      <!-- Summary counts -->
      <div class="alert-summary-grid">
        <div class="alert-count-card">
          <div class="alert-count-icon critical"><i class="fa-solid fa-circle-exclamation"></i></div>
          <div>
            <div class="alert-count-num">${alertSummary.critical}</div>
            <div class="alert-count-type">Critical</div>
          </div>
        </div>
        <div class="alert-count-card">
          <div class="alert-count-icon major"><i class="fa-solid fa-triangle-exclamation"></i></div>
          <div>
            <div class="alert-count-num">${alertSummary.major}</div>
            <div class="alert-count-type">Major</div>
          </div>
        </div>
        <div class="alert-count-card">
          <div class="alert-count-icon minor"><i class="fa-solid fa-circle-info"></i></div>
          <div>
            <div class="alert-count-num">${alertSummary.minor}</div>
            <div class="alert-count-type">Minor</div>
          </div>
        </div>
        <div class="alert-count-card">
          <div class="alert-count-icon total"><i class="fa-solid fa-bell"></i></div>
          <div>
            <div class="alert-count-num">${alertSummary.total}</div>
            <div class="alert-count-type">Total</div>
          </div>
        </div>
      </div>

      <!-- Alerts Table -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Active Alerts</span>
          <button class="btn btn-outline" style="font-size:12px;padding:5px 12px">
            <i class="fa-solid fa-filter"></i> Filter
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="data-table" id="alerts-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Operator</th>
                <th>Alert</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="alerts-tbody">
              ${_renderRows(alerts)}
            </tbody>
          </table>
        </div>
        <div style="margin-top:16px;text-align:center">
          <button class="btn btn-outline" onclick="UI.toast('All alerts loaded','info')">
            View All Alerts
          </button>
        </div>
      </div>
    `;

    // Mark all as read — only for engineers/admins
    const markAllBtn = document.getElementById('mark-all-btn');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', () => {
        DB.alerts.forEach(a => { a.status = 'acknowledged'; a.statusLabel = 'Acknowledged'; });
        document.getElementById('alerts-tbody').innerHTML = _renderRows(DB.alerts);
        document.getElementById('alert-badge').textContent = '0';
        // Persist to Firebase
        FirebaseDB.set('alerts', DB.alerts).catch(err => console.error('Alert sync error:', err));
        UI.toast('All alerts marked as read', 'success');
      });
    }

    // Delegate action buttons (only rendered for engineers)
    document.getElementById('alerts-tbody').addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      // Guard — should never be visible to viewers, but extra safety
      if (!AppState.isEngineer()) {
        UI.toast('You do not have permission to perform this action.', 'error');
        return;
      }

      const id  = parseInt(btn.dataset.id);
      const act = btn.dataset.action;
      const alert = DB.alerts.find(a => a.id === id);
      if (!alert) return;

      if (act === 'ack') {
        alert.status = 'acknowledged'; alert.statusLabel = 'Acknowledged';
      } else if (act === 'resolve') {
        alert.status = 'resolved'; alert.statusLabel = 'Resolved';
      }

      // Persist status update to Firebase
      const alertKey = `alert_${alert.id}`;
      FirebaseDB.patch(`alertStatuses/${alertKey}`, {
        status: alert.status,
        statusLabel: alert.statusLabel,
        updatedBy: AppState.currentUser ? AppState.currentUser.email : 'unknown',
        updatedAt: new Date().toISOString(),
      });

      document.getElementById('alerts-tbody').innerHTML = _renderRows(DB.alerts);
      UI.toast(`Alert ${act === 'ack' ? 'acknowledged' : 'resolved'} by ${AppState.currentUser ? AppState.currentUser.name || AppState.currentUser.email : 'Engineer'}!`, 'success');
    });

    _startLiveUpdates();
  }

  let _alertInterval = null;

  function _startLiveUpdates() {
    if (_alertInterval) clearInterval(_alertInterval);
    _alertInterval = setInterval(() => {
      const tbody = document.getElementById('alerts-tbody');
      if (!tbody) {
        clearInterval(_alertInterval);
        return;
      }
      tbody.innerHTML = _renderRows(DB.alerts);
      
      const summaryCards = document.querySelectorAll('.alert-count-num');
      if (summaryCards.length === 4) {
        summaryCards[0].textContent = DB.alertSummary.critical;
        summaryCards[1].textContent = DB.alertSummary.major;
        summaryCards[2].textContent = DB.alertSummary.minor;
        summaryCards[3].textContent = DB.alertSummary.total;
      }
    }, 5000);
  }

  function _renderRows(alerts) {
    const isEngineer = AppState.isEngineer();
    return alerts.map(a => {
      const op = DB.getOperator(a.operator);
      return `
        <tr>
          <td style="color:var(--text-muted);font-size:12px;white-space:nowrap">${a.time}</td>
          <td>
            <div class="op-chip">
              <span class="op-dot" style="background:${op ? op.color : '#888'}"></span>
              ${op ? op.name : a.operator}
            </div>
          </td>
          <td style="font-weight:600">${a.alert}</td>
          <td style="color:var(--text-secondary)">${a.location}</td>
          <td>${UI.statusBadge(a.status, a.statusLabel)}</td>
          <td>
            ${isEngineer ? `
              <div style="display:flex;gap:6px">
                ${a.status === 'new' ? `
                  <button class="btn btn-ghost" style="padding:4px 10px;font-size:12px" data-action="ack" data-id="${a.id}">
                    <i class="fa-solid fa-check"></i> Acknowledge
                  </button>
                ` : ''}
                ${a.status !== 'resolved' ? `
                  <button class="btn btn-ghost" style="padding:4px 10px;font-size:12px;color:var(--green)" data-action="resolve" data-id="${a.id}">
                    <i class="fa-solid fa-circle-check"></i> Resolve
                  </button>
                ` : `<span style="color:var(--green);font-size:12px"><i class="fa-solid fa-check"></i> Done</span>`}
              </div>
            ` : `
              <span style="font-size:12px;color:var(--text-muted)">
                <i class="fa-solid fa-lock" style="margin-right:4px"></i>Engineer only
              </span>
            `}
          </td>
        </tr>
      `;
    }).join('');
  }

  return { render };
})();
