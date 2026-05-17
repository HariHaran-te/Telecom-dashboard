/* =========================================================
   charts.js — Chart.js factory helpers
   ========================================================= */

const Charts = (() => {

  const DEFAULTS = {
    color: {
      airtel:   '#e8102a',
      jio:      '#0073e6',
      bsnl:     '#ff8c00',
      vodafone: '#38d9a9',
    },
    gridColor: 'rgba(255,255,255,0.05)',
    textColor: '#8892a4',
    font: 'Inter',
  };

  function _baseOptions(opts = {}) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 600, easing: 'easeInOutQuart' },
      plugins: {
        legend: {
          display: opts.legend !== undefined ? opts.legend : true,
          labels: {
            color: DEFAULTS.textColor,
            font: { family: DEFAULTS.font, size: 11 },
            boxWidth: 10, boxHeight: 10, borderRadius: 3,
            padding: 14,
          },
        },
        tooltip: {
          backgroundColor: '#1a2238',
          borderColor: 'rgba(255,255,255,0.08)',
          borderWidth: 1,
          titleColor: '#e8eaf0',
          bodyColor: DEFAULTS.textColor,
          padding: 10,
          cornerRadius: 8,
        },
      },
      scales: opts.noScales ? {} : {
        x: {
          grid: { color: DEFAULTS.gridColor, drawBorder: false },
          ticks: { color: DEFAULTS.textColor, font: { family: DEFAULTS.font, size: 11 } },
        },
        y: {
          grid: { color: DEFAULTS.gridColor, drawBorder: false },
          ticks: { color: DEFAULTS.textColor, font: { family: DEFAULTS.font, size: 11 } },
          beginAtZero: opts.beginAtZero || false,
        },
      },
    };
  }

  function destroyIfExists(canvasId) {
    const existing = Chart.getChart(canvasId);
    if (existing) existing.destroy();
  }

  /* ---- Line chart (multi-series) ---- */
  function createLineChart(canvasId, labels, datasets, opts = {}) {
    destroyIfExists(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const chartDatasets = datasets.map(ds => ({
      label: ds.label,
      data: ds.data,
      borderColor: ds.color,
      backgroundColor: ds.fill
        ? ds.color.replace(')', ',0.12)').replace('rgb', 'rgba')
        : 'transparent',
      fill: !!ds.fill,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
    }));

    return new Chart(ctx, {
      type: 'line',
      data: { labels, datasets: chartDatasets },
      options: { ..._baseOptions(opts), ...opts.extraOptions },
    });
  }

  /* ---- Area chart (single series) ---- */
  function createAreaChart(canvasId, labels, data, color, opts = {}) {
    return createLineChart(canvasId, labels, [{ label: opts.label || '', data, color, fill: true }], { ...opts, legend: false });
  }

  /* ---- Bar chart ---- */
  function createBarChart(canvasId, labels, datasets, opts = {}) {
    destroyIfExists(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    const chartDatasets = datasets.map(ds => ({
      label: ds.label,
      data: ds.data,
      backgroundColor: ds.color + 'bb',
      borderColor: ds.color,
      borderWidth: 1,
      borderRadius: 4,
    }));

    return new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: chartDatasets },
      options: { ..._baseOptions({ beginAtZero: true, ...opts }), ...opts.extraOptions },
    });
  }

  /* ---- Doughnut chart ---- */
  function createDoughnutChart(canvasId, labels, data, colors) {
    destroyIfExists(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;

    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data, backgroundColor: colors, borderWidth: 0, hoverOffset: 8 }],
      },
      options: {
        ..._baseOptions({ noScales: true }),
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: DEFAULTS.textColor, font: { family: DEFAULTS.font, size: 11 }, boxWidth: 10, padding: 12 },
          },
        },
      },
    });
  }

  return { createLineChart, createAreaChart, createBarChart, createDoughnutChart, DEFAULTS };
})();
