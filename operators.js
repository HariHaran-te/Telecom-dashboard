/* =========================================================
   operators.js — Page 3: Operators Comparison
   ========================================================= */

const OperatorsPage = (() => {

  const TABS = ['Overview', 'Speed Test', 'Availability', 'Coverage', 'Call'];
  let activeTab = 0;

  function render(container) {
    activeTab = 0;
    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Operators Comparison</h1>
        <div class="page-actions">
          <div class="date-chip"><i class="fa-regular fa-calendar"></i> May 20 – May 26</div>
          <button class="btn btn-ghost" id="export-ops-btn">
            <i class="fa-solid fa-download"></i> Export
          </button>
        </div>
      </div>

      <div class="tab-bar" id="ops-tabs">
        ${TABS.map((t, i) => `<button class="tab-btn ${i === 0 ? 'active' : ''}" data-tab="${i}">${t}</button>`).join('')}
      </div>

      <div class="card" id="ops-content"></div>
    `;

    document.getElementById('export-ops-btn').addEventListener('click', () =>
      UI.toast('Comparison report exported!', 'success'));

    document.getElementById('ops-tabs').addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      activeTab = parseInt(btn.dataset.tab);
      document.querySelectorAll('#ops-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      _renderTabContent();
    });

    _renderTabContent();
  }

  function _renderTabContent() {
    const content = document.getElementById('ops-content');
    const ops = DB.operators;

    if (activeTab === 0) {
      // Overview — sortable table
      content.innerHTML = `
        <div class="overflow-x-auto">
          <table class="data-table" id="ops-table">
            <thead>
              <tr>
                <th>Operator</th>
                <th class="sortable" data-col="downloadSpeed" style="cursor:pointer">
                  Download Speed <i class="fa-solid fa-sort" style="color:var(--text-muted);font-size:10px"></i>
                </th>
                <th class="sortable" data-col="uploadSpeed" style="cursor:pointer">
                  Upload Speed <i class="fa-solid fa-sort" style="color:var(--text-muted);font-size:10px"></i>
                </th>
                <th class="sortable" data-col="latency" style="cursor:pointer">
                  Latency <i class="fa-solid fa-sort" style="color:var(--text-muted);font-size:10px"></i>
                </th>
                <th class="sortable" data-col="packetLoss" style="cursor:pointer">
                  Packet Loss <i class="fa-solid fa-sort" style="color:var(--text-muted);font-size:10px"></i>
                </th>
              </tr>
            </thead>
            <tbody id="ops-tbody">
              ${_operatorsRows(ops)}
            </tbody>
          </table>
        </div>
      `;

      document.getElementById('ops-table').addEventListener('click', e => {
        const th = e.target.closest('.sortable');
        if (!th) return;
        const col = th.dataset.col;
        const sorted = [...DB.operators].sort((a, b) => b[col] - a[col]);
        document.getElementById('ops-tbody').innerHTML = _operatorsRows(sorted);
      });

    } else if (activeTab === 1) {
      // Speed Test — bar chart
      content.innerHTML = `
        <div class="card-header"><span class="card-title">Speed Test Comparison (Mbps)</span></div>
        <div style="height:300px;position:relative"><canvas id="speed-chart"></canvas></div>
      `;
      setTimeout(() => {
        Charts.createBarChart('speed-chart',
          ops.map(o => o.name),
          [
            { label: 'Download (Mbps)', data: ops.map(o => o.downloadSpeed), color: '#3b9eff' },
            { label: 'Upload (Mbps)',   data: ops.map(o => o.uploadSpeed),   color: '#38d9a9' },
          ],
          { beginAtZero: true }
        );
      }, 50);

    } else if (activeTab === 2) {
      // Availability — line chart
      const trend = DB.availabilityTrend;
      content.innerHTML = `
        <div class="card-header"><span class="card-title">Availability Trend (%)</span></div>
        <div style="height:300px;position:relative"><canvas id="avail-cmp-chart"></canvas></div>
      `;
      setTimeout(() => {
        Charts.createLineChart('avail-cmp-chart', trend.labels, [
          { label: 'Airtel',   data: trend.airtel,   color: Charts.DEFAULTS.color.airtel },
          { label: 'Jio',      data: trend.jio,      color: Charts.DEFAULTS.color.jio },
          { label: 'BSNL',     data: trend.bsnl,     color: Charts.DEFAULTS.color.bsnl },
          { label: 'Vodafone', data: trend.vodafone, color: Charts.DEFAULTS.color.vodafone },
        ], {
          extraOptions: {
            scales: {
              y: { min: 98, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892a4', callback: v => v + '%' } },
              x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8892a4' } },
            },
          },
        });
      }, 50);

    } else if (activeTab === 3) {
      // Coverage — doughnut
      content.innerHTML = `
        <div class="card-header"><span class="card-title">Active Site Distribution</span></div>
        <div style="height:300px;position:relative;max-width:400px;margin:auto"><canvas id="coverage-chart"></canvas></div>
      `;
      setTimeout(() => {
        Charts.createDoughnutChart(
          'coverage-chart',
          ops.map(o => o.name),
          ops.map(o => o.activeSites),
          ops.map(o => o.color)
        );
      }, 50);

    } else {
      // Call — placeholder table
      content.innerHTML = `
        <div class="card-header"><span class="card-title">Call Quality Metrics</span></div>
        <div class="overflow-x-auto">
          <table class="data-table">
            <thead><tr><th>Operator</th><th>Call Drop Rate</th><th>Call Setup Success</th><th>Voice MOS</th></tr></thead>
            <tbody>
              ${ops.map(op => `
                <tr>
                  <td><div class="op-chip"><span class="op-dot" style="background:${op.color}"></span>${op.name}</div></td>
                  <td>${(Math.random()*2+0.5).toFixed(2)}%</td>
                  <td>${(Math.random()*5+94).toFixed(1)}%</td>
                  <td>${(Math.random()*0.5+3.8).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }
  }

  function _operatorsRows(ops) {
    return ops.map(op => `
      <tr style="cursor:pointer" onclick="Router.navigate('operator-detail?id=${op.id}')">
        <td>
          <div class="op-chip" style="gap:10px">
            <div style="width:32px;height:32px;border-radius:6px;background:${op.color}22;display:flex;align-items:center;justify-content:center;color:${op.color}">
              <i class="fa-solid ${UI.operatorIcon(op.id)}"></i>
            </div>
            <div>
              <div style="font-weight:600">${op.name}</div>
              <div style="font-size:11px;color:var(--text-muted)">${op.fullName}</div>
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight:600">${op.downloadSpeed} Mbps</div>
          <div class="delta ${op.downloadDelta >= 0 ? 'up' : 'down'}" style="font-size:11px">
            <i class="fa-solid ${op.downloadDelta >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}"></i> ${Math.abs(op.downloadDelta)}%
          </div>
        </td>
        <td>
          <div style="font-weight:600">${op.uploadSpeed} Mbps</div>
          <div class="delta ${op.uploadDelta >= 0 ? 'up' : 'down'}" style="font-size:11px">
            <i class="fa-solid ${op.uploadDelta >= 0 ? 'fa-arrow-up' : 'fa-arrow-down'}"></i> ${Math.abs(op.uploadDelta)}%
          </div>
        </td>
        <td>${op.latency} ms</td>
        <td>${op.packetLoss}%</td>
      </tr>
    `).join('');
  }

  return { render };
})();
