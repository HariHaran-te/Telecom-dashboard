/* =========================================================
   operator-detail.js — Page 4: Individual Operator Drilldown
   ========================================================= */

const OperatorDetailPage = (() => {

  function render(container, opId) {
    const op = DB.getOperator(opId) || DB.operators[0];
    const trend  = DB.availabilityTrend;
    const traffic = DB.trafficTrend;
    const regions = DB.regions[op.id] || [];
    const alerts  = DB.alerts.filter(a => a.operator === op.id).slice(0, 4);

    container.innerHTML = `
      <!-- Operator Header -->
      <div class="op-header">
        <div class="op-logo-wrap" style="background:${op.color}22;color:${op.color}">
          <i class="fa-solid ${UI.operatorIcon(op.id)}" style="font-size:26px"></i>
        </div>
        <div class="op-header-info">
          <h2>${op.name}</h2>
          <span>${op.fullName}</span>
        </div>
        <div style="margin-left:auto;display:flex;gap:8px">
          <button class="btn btn-outline" onclick="location.hash='operators'">
            <i class="fa-solid fa-arrow-left"></i> Back
          </button>
          <button class="btn btn-primary" onclick="UI.toast('Report downloaded!','success')">
            <i class="fa-solid fa-download"></i> Download Report
          </button>
        </div>
      </div>

      <!-- KPI Row -->
      <div class="kpi-grid" style="margin-bottom:20px">
        <div class="kpi-card">
          <div class="kpi-label">Active Sites</div>
          <div class="kpi-value">${op.activeSites.toLocaleString()}</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Availability</div>
          <div class="kpi-value" style="color:var(--green)">${op.availability}%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Avg. Download</div>
          <div class="kpi-value">${op.downloadSpeed} <small style="font-size:14px;color:var(--text-muted)">Mbps</small></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Growing Sites</div>
          <div class="kpi-value" style="color:var(--accent)">${op.growingSites.toLocaleString()}</div>
        </div>
      </div>

      <!-- Charts + Alerts Grid -->
      <div class="op-detail-grid">
        <!-- Left column -->
        <div style="display:flex;flex-direction:column;gap:16px">
          <div class="card">
            <div class="card-header">
              <span class="card-title">Availability Trend (%)</span>
              <span class="date-chip" style="font-size:11px"><i class="fa-regular fa-calendar"></i> May 20 – May 26</span>
            </div>
            <div class="chart-wrap"><canvas id="op-avail-chart"></canvas></div>
          </div>

          <div class="card">
            <div class="card-header">
              <span class="card-title">Traffic Volume (TB)</span>
            </div>
            <div class="chart-wrap"><canvas id="op-traffic-chart"></canvas></div>
          </div>

          <!-- Top Regions -->
          <div class="card">
            <div class="card-header"><span class="card-title">Top Regions</span></div>
            <div class="overflow-x-auto">
              <table class="data-table">
                <thead>
                  <tr><th>State</th><th>Sites</th><th>Availability</th><th>Avg Speed</th><th>Growing</th></tr>
                </thead>
                <tbody>
                  ${regions.map(r => `
                    <tr>
                      <td>${r.state}</td>
                      <td>${r.sites.toLocaleString()}</td>
                      <td style="color:var(--green);font-weight:600">${r.avail}</td>
                      <td>${r.speed}</td>
                      <td style="color:var(--accent)">+${r.growing}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right column: Recent Alerts -->
        <div class="card" style="align-self:start">
          <div class="card-header">
            <span class="card-title">Recent Alerts</span>
            <span class="card-action" onclick="location.hash='alerts'">View All</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${alerts.length ? alerts.map(a => `
              <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-md);padding:12px">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
                  <span style="font-weight:600;font-size:13px">${a.alert}</span>
                  ${UI.statusBadge(a.status, a.statusLabel)}
                </div>
                <div style="font-size:12px;color:var(--text-muted)">${a.location} · ${a.time}</div>
              </div>
            `).join('') : `<p class="text-muted">No recent alerts.</p>`}

            <button class="btn btn-outline full-width mt-16" onclick="location.hash='alerts'">
              View All Alerts
            </button>
          </div>
        </div>
      </div>
    `;

    _renderCharts(op, trend, traffic);
  }

  function _renderCharts(op, trend, traffic) {
    const labels = trend.labels;
    const color  = op.color;
    const opKey  = op.id;

    Charts.createAreaChart('op-avail-chart', labels, trend[opKey] || [], color, {
      extraOptions: {
        scales: {
          y: { min: 98, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892a4', callback: v => v + '%' } },
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892a4' } },
        },
      },
    });

    Charts.createAreaChart('op-traffic-chart', labels, traffic[opKey] || [], color, {
      extraOptions: {
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892a4', callback: v => v + ' TB' } },
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892a4' } },
        },
      },
    });
  }

  return { render };
})();
