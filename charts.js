/**
 * charts.js
 * Visualizations manager for the SEO Client Dashboard.
 * Integrates Chart.js with executive-friendly, clean designs.
 */

const ChartInstances = {
  organicGrowth: null,
  gbpActions: null,
  journeySparklines: {}
};

const ChartsController = {
  setupDefaults() {
    if (typeof Chart === 'undefined') return;

    Chart.defaults.font.family = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    Chart.defaults.font.size = 11;
    Chart.defaults.color = '#94a3b8'; // text-muted
    Chart.defaults.plugins.legend.labels.boxWidth = 10;
    Chart.defaults.plugins.legend.labels.usePointStyle = true;
    Chart.defaults.plugins.legend.labels.padding = 16;
  },

  /**
   * Renders the organic traffic and clicks trendlines (6m or 12m)
   */
  renderOrganicGrowthChart(months, traffic, clicks) {
    const canvas = document.getElementById('organicGrowthChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Gradients
    const gradTraffic = ctx.createLinearGradient(0, 0, 0, 250);
    gradTraffic.addColorStop(0, 'rgba(79, 70, 229, 0.08)');
    gradTraffic.addColorStop(1, 'rgba(79, 70, 229, 0)');

    const gradClicks = ctx.createLinearGradient(0, 0, 0, 250);
    gradClicks.addColorStop(0, 'rgba(15, 23, 42, 0.05)');
    gradClicks.addColorStop(1, 'rgba(15, 23, 42, 0)');

    const chartData = {
      labels: months,
      datasets: [
        {
          label: 'Organic Traffic (Visits)',
          data: traffic,
          borderColor: '#4f46e5', // Indigo
          backgroundColor: gradTraffic,
          borderWidth: 2,
          pointBackgroundColor: '#4f46e5',
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true,
          tension: 0.35
        },
        {
          label: 'Organic Clicks',
          data: clicks,
          borderColor: '#0f172a', // Slate/Black
          backgroundColor: gradClicks,
          borderWidth: 2,
          pointBackgroundColor: '#0f172a',
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true,
          tension: 0.35
        }
      ]
    };

    if (ChartInstances.organicGrowth) {
      ChartInstances.organicGrowth.data = chartData;
      ChartInstances.organicGrowth.update();
    } else {
      ChartInstances.organicGrowth = new Chart(canvas, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'end'
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              padding: 12,
              backgroundColor: '#0f172a',
              titleColor: '#fff',
              bodyColor: '#94a3b8',
              borderColor: 'rgba(255,255,255,0.08)',
              borderWidth: 1
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#94a3b8' }
            },
            y: {
              grid: { color: 'rgba(15, 23, 42, 0.04)' },
              ticks: { color: '#94a3b8' }
            }
          }
        }
      });
    }
  },

  /**
   * Renders stacked bars representing Local actions on Google Business Profile
   */
  renderGbpActionsChart(months, calls, directions, clicks) {
    const canvas = document.getElementById('gbpActionsChart');
    if (!canvas) return;

    const chartData = {
      labels: months,
      datasets: [
        {
          label: 'Phone Calls',
          data: calls,
          backgroundColor: '#4f46e5', // Indigo
          borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
          barThickness: 12
        },
        {
          label: 'Direction Requests',
          data: directions,
          backgroundColor: '#8b5cf6', // Purple
          borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
          barThickness: 12
        },
        {
          label: 'Website Clicks',
          data: clicks,
          backgroundColor: '#10b981', // Green
          borderRadius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 },
          barThickness: 12
        }
      ]
    };

    if (ChartInstances.gbpActions) {
      ChartInstances.gbpActions.data = chartData;
      ChartInstances.gbpActions.update();
    } else {
      ChartInstances.gbpActions = new Chart(canvas, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'end'
            }
          },
          scales: {
            x: {
              stacked: true,
              grid: { display: false },
              ticks: { color: '#94a3b8' }
            },
            y: {
              stacked: true,
              grid: { color: 'rgba(15, 23, 42, 0.04)' },
              ticks: { color: '#94a3b8' }
            }
          }
        }
      });
    }
  },

  /**
   * Mini sparkline for Keyword journey cards
   */
  renderJourneySparkline(canvasId, historicalRanks) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    if (ChartInstances.journeySparklines[canvasId]) {
      ChartInstances.journeySparklines[canvasId].destroy();
    }

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.1)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ChartInstances.journeySparklines[canvasId] = new Chart(canvas, {
      type: 'line',
      data: {
        labels: historicalRanks.map((_, i) => i),
        datasets: [{
          data: historicalRanks,
          borderColor: '#10b981', // Success green
          borderWidth: 1.5,
          pointRadius: 0,
          backgroundColor: gradient,
          fill: true,
          tension: 0.35
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: { display: false },
          y: {
            display: false,
            reverse: true // Invert scale because position #1 is better than #50
          }
        }
      }
    });
  }
};
