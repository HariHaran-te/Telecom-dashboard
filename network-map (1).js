/* =========================================================
   network-map.js — Page 5: Network Coverage Map (Leaflet)
   ========================================================= */

const NetworkMapPage = (() => {

  let _map = null;
  let _markers = [];
  let _currentFilters = { operator: 'all', techs: ['2G','3G','4G','5G'], status: 'all' };

  function render(container) {
    container.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">Network Coverage Map</h1>
        <div class="page-actions">
          <button class="btn btn-ghost"><i class="fa-solid fa-expand"></i> Full Screen</button>
        </div>
      </div>

      <div class="map-layout">
        <!-- Filter panel -->
        <div class="map-filters">
          <div class="map-controls">
            <div class="search-bar" style="max-width:300px">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" id="map-city-search" placeholder="Search city…" />
            </div>
          </div>

          <div class="card">
            <div class="filter-group-title"><i class="fa-solid fa-filter"></i> Filters</div>

            <div style="margin-bottom:16px">
              <div class="filter-group-title">Technology</div>
              <div class="filter-checks">
                ${['2G','3G','4G','5G'].map(t => `
                  <label class="cb-label">
                    <input type="checkbox" class="tech-cb" value="${t}" checked /> ${t}
                  </label>
                `).join('')}
              </div>
            </div>

            <div style="margin-bottom:16px">
              <div class="filter-group-title">Status</div>
              <div class="filter-checks">
                ${['all','normal','warning','critical'].map(s => `
                  <label class="cb-label">
                    <input type="radio" name="map-status" value="${s}" ${s==='all'?'checked':''} /> 
                    ${s.charAt(0).toUpperCase()+s.slice(1)}
                  </label>
                `).join('')}
              </div>
            </div>

            <button class="btn btn-primary full-width" id="apply-filters-btn">
              <i class="fa-solid fa-check"></i> Apply Filters
            </button>
            <button class="btn btn-outline full-width mt-16" id="reset-filters-btn">Reset</button>
          </div>

          <!-- Legend -->
          <div class="card map-legend">
            <div class="filter-group-title">Site Status</div>
            <div class="legend-item"><span class="legend-dot" style="background:#38d9a9"></span> Normal</div>
            <div class="legend-item"><span class="legend-dot" style="background:#fbbf24"></span> Warning</div>
            <div class="legend-item"><span class="legend-dot" style="background:#ff5c7c"></span> Critical</div>
          </div>
        </div>

        <!-- Map -->
        <div class="map-container">
          <div id="leaflet-map"></div>
        </div>
      </div>
    `;

    setTimeout(_initMap, 50);

    document.getElementById('apply-filters-btn').addEventListener('click', _applyFilters);
    document.getElementById('reset-filters-btn').addEventListener('click', _resetFilters);
    document.getElementById('map-city-search').addEventListener('input', _applyFilters);
  }

  function _initMap() {
    if (_map) { _map.remove(); _map = null; }
    _map = L.map('leaflet-map', { center: [20.5937, 78.9629], zoom: 5, zoomControl: true });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap | © CartoDB',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(_map);
    _plotMarkers(DB.mapSites);
  }

  function _statusColor(s) {
    return s === 'normal' ? '#38d9a9' : s === 'warning' ? '#fbbf24' : '#ff5c7c';
  }

  function _plotMarkers(sites) {
    _markers.forEach(m => m.remove());
    _markers = [];
    sites.forEach(city => {
      // Determine overall city status (worst status among networks)
      const hasCritical = city.networks.some(n => n.status === 'critical');
      const hasWarning = city.networks.some(n => n.status === 'warning');
      const cityStatus = hasCritical ? 'critical' : (hasWarning ? 'warning' : 'normal');
      const color = _statusColor(cityStatus);

      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background:${color};width:12px;height:12px;border:2px solid white;border-radius:50%;box-shadow:0 0 10px ${color}"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      const networksHtml = city.networks.map(n => `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid #eee">
          <div style="display:flex;align-items:center;gap:6px">
            <span class="op-dot" style="background:${UI.operatorColor(n.id)};width:8px;height:8px"></span>
            <span style="font-weight:500;font-size:12px">${n.name}</span>
          </div>
          <div style="text-align:right">
            <div style="font-size:10px;color:#888">${n.tech}</div>
            <div style="font-size:11px;font-weight:600;color:${_statusColor(n.status)}">${n.status.charAt(0).toUpperCase() + n.status.slice(1)}</div>
          </div>
        </div>
      `).join('');

      const m = L.marker([city.lat, city.lng], { icon })
        .addTo(_map)
        .bindPopup(`
          <div style="font-family:Inter,sans-serif;min-width:200px">
            <div style="font-weight:700;font-size:16px;margin-bottom:10px;display:flex;align-items:center;gap:8px">
              <i class="fa-solid fa-city" style="color:var(--accent)"></i>
              ${city.city}
            </div>
            <div style="background:var(--bg-surface);border-radius:8px;padding:4px 8px">
              ${networksHtml}
            </div>
            <div style="margin-top:10px;font-size:11px;color:var(--text-muted);text-align:center">
              <i class="fa-solid fa-tower-cell"></i> 4 Stations Monitored
            </div>
          </div>
        `);
      _markers.push(m);
    });
  }

  function _applyFilters() {
    const searchVal = document.getElementById('map-city-search').value.toLowerCase();
    const techCbs = [...document.querySelectorAll('.tech-cb:checked')].map(cb => cb.value);
    const statusEl = document.querySelector('input[name="map-status"]:checked');
    const statusVal = statusEl ? statusEl.value : 'all';

    const filtered = DB.mapSites.filter(city => {
      const searchOk = !searchVal || city.city.toLowerCase().includes(searchVal);
      
      // A city matches if any of its networks match the tech filter
      const techOk = city.networks.some(n => techCbs.includes(n.tech));
      
      // Determine overall city status
      const hasCritical = city.networks.some(n => n.status === 'critical');
      const hasWarning = city.networks.some(n => n.status === 'warning');
      const cityStatus = hasCritical ? 'critical' : (hasWarning ? 'warning' : 'normal');
      const statusOk = statusVal === 'all' || cityStatus === statusVal;

      return searchOk && techOk && statusOk;
    });

    _plotMarkers(filtered);
    UI.toast(`Showing ${filtered.length} cities`, 'info', 1500);
  }

  function _resetFilters() {
    document.getElementById('map-city-search').value = '';
    document.querySelectorAll('.tech-cb').forEach(cb => cb.checked = true);
    document.querySelector('input[name="map-status"][value="all"]').checked = true;
    _plotMarkers(DB.mapSites);
  }

  return { render };
})();
