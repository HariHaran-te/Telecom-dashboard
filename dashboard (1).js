/* =========================================================
   dashboard.js — Page 2: Network Overview Dashboard
   ========================================================= */

const DashboardPage = (() => {

  let _updateInterval = null;

  function render(container) {
    const { kpis, availabilityTrend, trafficTrend, operators } = DB;

    // Clear any existing interval
    if (_updateInterval) clearInterval(_updateInterval);

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Network Overview <span class="live-indicator"><span class="pulse"></span> LIVE</span></h1>
        <div class="page-actions">
          <div class="date-chip"><i class="fa-regular fa-calendar"></i> ${dateStr}</div>
          <button class="btn btn-primary" onclick="UI.toast('Report exported!','success')">
            <i class="fa-solid fa-download"></i> Export
          </button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div id="dashboard-kpis">
        ${_renderKPIs(kpis)}
      </div>

      <!-- Charts Row -->
      <div class="section-grid-2">
        <div class="card">
          <div class="card-header">
            <span class="card-title">Network Availability (%)</span>
            <span class="card-action" onclick="location.hash='operators'">View All</span>
          </div>
          <div class="chart-wrap"><canvas id="avail-chart"></canvas></div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="card-title">Traffic Volume (TB)</span>
            <span class="card-action" onclick="location.hash='reports'">View All</span>
          </div>
          <div class="chart-wrap"><canvas id="traffic-chart"></canvas></div>
        </div>
      </div>

      <!-- Operators Performance -->
      <div class="card">
        <div class="card-header">
          <span class="card-title">Operators Performance</span>
          <span class="card-action" onclick="location.hash='operators'">View All</span>
        </div>
        <div class="overflow-x-auto" id="dashboard-operators">
          ${_renderOperatorTable(operators)}
        </div>
      </div>
    `;

    _renderCharts(availabilityTrend, trafficTrend);
    _startLiveUpdates(container);
  }

  function _renderKPIs(kpis) {
    return `
      <div class="kpi-grid" style="grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));">
        <div class="kpi-card">
          <div class="kpi-label">Total Sites</div>
          <div class="kpi-value">${kpis.totalSites.toLocaleString()}</div>
          ${UI.deltaHtml(kpis.totalSitesDelta)}
          <span class="kpi-sub">vs last week</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Avg. Availability</div>
          <div class="kpi-value">${kpis.avgAvailability}%</div>
          ${UI.deltaHtml(kpis.avgAvailabilityDelta)}
          <span class="kpi-sub">vs last week</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Traffic Volume</div>
          <div class="kpi-value">${kpis.trafficVolume}</div>
          ${UI.deltaHtml(kpis.trafficVolumeDelta)}
          <span class="kpi-sub">vs last week</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Active Alerts</div>
          <div class="kpi-value" style="color:var(--red)">${kpis.activeAlerts}</div>
          ${UI.deltaHtml(kpis.activeAlertsDelta)}
          <span class="kpi-sub">vs last week</span>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">Call Quality</div>
          <div class="kpi-value" style="color:var(--yellow)">${kpis.callQuality} <span style="font-size:14px;color:var(--text-muted)">/ 5.0</span></div>
          ${UI.deltaHtml(kpis.callQualityDelta)}
          <span class="kpi-sub">vs last week</span>
        </div>
      </div>
    `;
  }

  function _renderOperatorTable(operators) {
    return `
      <table class="data-table">
        <thead>
          <tr>
            <th>Operator</th>
            <th>Availability</th>
            <th>Avg. Speed</th>
            <th>Active Sites</th>
          </tr>
        </thead>
        <tbody>
          ${operators.map(op => `
            <tr style="cursor:pointer" onclick="Router.navigate('operator-detail?id=${op.id}')">
              <td>
                <div class="op-chip">
                  <span class="op-dot" style="background:${op.color}"></span>
                  ${op.name}
                </div>
              </td>
              <td>
                <span class="${op.availability >= 99.5 ? 'text-green' : 'text-accent'}" style="font-weight:600">${op.availability}%</span>
              </td>
              <td>${op.avgSpeed} Mbps</td>
              <td>${op.activeSites.toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  function _startLiveUpdates(container) {
    _updateInterval = setInterval(() => {
      // Check if dashboard is still in DOM
      if (!document.getElementById('dashboard-kpis')) {
        clearInterval(_updateInterval);
        return;
      }

      DB.simulateFluctuations();

      // Refresh parts of the UI
      document.getElementById('dashboard-kpis').innerHTML = _renderKPIs(DB.kpis);
      document.getElementById('dashboard-operators').innerHTML = _renderOperatorTable(DB.operators);
      
      // Update charts
      _renderCharts(DB.availabilityTrend, DB.trafficTrend);
      
      console.log('Dashboard values updated (5s)');
    }, 5000);
  }

  function _renderCharts(avail, traffic) {
    const labels = avail.labels;
    const opColors = Charts.DEFAULTS.color;

    Charts.createLineChart('avail-chart', labels, [
      { label: 'Airtel',   data: avail.airtel,   color: opColors.airtel },
      { label: 'Jio',      data: avail.jio,      color: opColors.jio },
      { label: 'BSNL',     data: avail.bsnl,     color: opColors.bsnl },
      { label: 'Vodafone', data: avail.vodafone, color: opColors.vodafone },
    ], {
      extraOptions: {
        scales: {
          y: {
            min: 98, max: 100,
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#8892a4', callback: v => v + '%' },
          },
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892a4' } },
        },
      },
    });

    Charts.createBarChart('traffic-chart', labels, [
      { label: 'Airtel',   data: traffic.airtel,   color: opColors.airtel },
      { label: 'Jio',      data: traffic.jio,      color: opColors.jio },
      { label: 'BSNL',     data: traffic.bsnl,     color: opColors.bsnl },
      { label: 'Vodafone', data: traffic.vodafone, color: opColors.vodafone },
    ]);
  }

  return { render };
})();
