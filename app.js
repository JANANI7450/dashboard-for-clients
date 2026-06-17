/**
 * app.js
 * Primary state manager, data source, and interactive event bindings
 * for the client-facing SEO Performance Dashboard.
 */

// --- SEO MOCK DATABASE (Client-Facing focus) ---
const SeoDashboardData = {
  clientName: "Tirumalai Eye Clinic (Jayanagar)",
  industry: "Ophthalmology & Healthcare",
  manager: "Anita Nair",
  reportingPeriod: "01 September 2026 – 30 September 2026",
  managerAvatar: "AN",
  
  // Deliverables status (Section 2)
  workSummary: [
    { label: "Blogs Published", value: 3, target: 4, pct: 75, icon: "✍️", color: "var(--color-blog)" },
    { label: "Pages Optimized", value: 6, target: 6, pct: 100, icon: "📊", color: "var(--color-opt)" },
    { label: "Backlinks Acquired", value: 4, target: 5, pct: 80, icon: "🔗", color: "var(--color-link)" },
    { label: "Technical Issues Fixed", value: 12, target: 12, pct: 100, icon: "🔧", color: "var(--color-tech)" },
    { label: "GBP Updates Postings", value: 8, target: 10, pct: 80, icon: "📍", color: "var(--color-gbp)" },
    { label: "Local Citations Built", value: 15, target: 20, pct: 75, icon: "🗺️", color: "var(--color-local)" }
  ],

  // September 2026 Calendar events (Section 1)
  // September 2026 starts on a Tuesday (2nd day of the calendar Sunday-aligned grid)
  activities: [
    { id: "act-1", day: 2, category: "blog", title: "Glaucoma Prevention Guide", desc: "Researched, drafted and published a patient-friendly guide on glaucoma symptoms and prevention measures. Internally linked to core clinics booking page.", status: "completed" },
    { id: "act-2", day: 4, category: "local", title: "Local Citation Syncing", desc: "Registered clinic address and contact details on 5 premium regional directories to strengthen local business algorithms.", status: "completed" },
    { id: "act-3", day: 5, category: "opt", title: "Lasik Landing Page Refresh", desc: "Updated meta page titles, descriptions, and headers on the /lasik-surgery-jayanagar landing page targeting 'Lasik surgery Jayanagar' search queries.", status: "completed" },
    { id: "act-4", day: 7, category: "tech", title: "Schema Markups Deployment", desc: "Deployed local business structured schema markup across clinic listing sites to improve rich snippet search results.", status: "completed" },
    { id: "act-5", day: 9, category: "gbp", title: "GBP Weekly Highlights Post", desc: "Published checkup campaigns graphics and safety steps on Google Business Profile updates page.", status: "completed" },
    { id: "act-6", day: 11, category: "link", title: "Health Directory Citation Link", desc: "Acquired a contextual, follow-through backlink placement on a high-domain authority Indian Medical Directory.", status: "completed" },
    { id: "act-7", day: 12, category: "opt", title: "Homepage Visual Tags Optimize", desc: "Optimized image tags, alt text and header text allocations on homepage core checkup layouts.", status: "completed" },
    { id: "act-8", day: 14, category: "blog", title: "Cataract FAQ Resource Live", desc: "Published a 15-question structured Q&A blog explaining cataracts laser procedure timeline details.", status: "completed" },
    { id: "act-9", day: 15, category: "local", title: "Maps Reviews Review Sync", desc: "Responded to 12 new five-star reviews on Google Maps listing, reinforcing user interaction algorithms.", status: "completed" },
    { id: "act-10", day: 16, category: "gbp", title: "GBP Photos Gallery Sync", desc: "Uploaded 5 high-resolution office interior and treatment suite graphics to client public profiles gallery.", status: "completed" },
    { id: "act-11", day: 18, category: "tech", title: "Image Compression Optimization", desc: "Optimized and converted 22 static site graphic formats into modern WebP versions to resolve mobile loading speeds.", status: "completed" },
    { id: "act-12", day: 20, category: "link", title: "Healthcare Blog guestpost", desc: "Secured a guest post insertion explaining digital screen strain mitigations on a regional wellness blog.", status: "completed" },
    { id: "act-13", day: 22, category: "opt", title: "Glaucoma Page Content Edits", desc: "Updated structural formatting and content body layouts on Glaucoma treatment page.", status: "completed" },
    { id: "act-14", day: 24, category: "gbp", title: "GBP Autumn Campaign Live", desc: "Configured promotional campaign banner ('Book Free Consultation') on Google search updates panel.", status: "completed" },
    { id: "act-15", day: 25, category: "blog", title: "Lasik Surgery Recovery Tips", desc: "Researched and posted actionable tips for visual recovery after corrective lasik treatment.", status: "completed" },
    { id: "act-16", day: 27, category: "link", title: "Regional Press release link", desc: "Acquired a backlink citation via regional healthcare news release covering advanced laser diagnostic tools.", status: "completed" },
    { id: "act-17", day: 28, category: "tech", title: "Broken Redirection audit fix", desc: "Audited site log files and redirected 8 old 404 links to current active service pages.", status: "completed" },
    { id: "act-18", day: 29, category: "local", title: "GBP Address Consistency Check", desc: "Validated NAP consistency across core medical search portals and directory databases.", status: "completed" }
  ],

  // Target Keyword Rankings (Section 3)
  keywords: [
    { keyword: "LASIK Surgery Jayanagar", rank: 3, intent: "Commercial", page: "/lasik-surgery-jayanagar" },
    { keyword: "Eye Clinic Jayanagar", rank: 2, intent: "Transactional", page: "/" },
    { keyword: "Cataract Specialist Bangalore", rank: 5, intent: "Commercial", page: "/cataract-specialist-bangalore" },
    { keyword: "Best Ophthalmologist Jayanagar", rank: 4, intent: "Commercial", page: "/our-doctors" },
    { keyword: "Eye Hospital near me Jayanagar", rank: 3, intent: "Transactional", page: "/" },
    { keyword: "Lasik Treatment Cost Bangalore", rank: 8, intent: "Commercial", page: "/lasik-surgery-jayanagar" },
    { keyword: "Cataract Surgery Jayanagar", rank: 4, intent: "Transactional", page: "/cataract-specialist-bangalore" }
  ],

  // Keyword Journey (Section 4)
  journey: [
    { keyword: "LASIK Surgery Jayanagar", start: 38, current: 3, sparkline: [38, 35, 29, 21, 14, 8, 3] },
    { keyword: "Eye Clinic Jayanagar", start: 15, current: 2, sparkline: [15, 14, 11, 8, 5, 3, 2] },
    { keyword: "Cataract Specialist Bangalore", start: 54, current: 5, sparkline: [54, 48, 36, 25, 18, 11, 5] },
    { keyword: "Best Ophthalmologist Jayanagar", start: 28, current: 4, sparkline: [28, 25, 22, 18, 12, 7, 4] }
  ],

  // Organic Growth Trends (Section 5)
  organicGrowth: {
    kpis: {
      traffic: 8420, trafficTrend: 24.2,
      leads: 184, leadsTrend: 15.3,
      clicks: 2410, clicksTrend: 18.5,
      gbp: 1920, gbpTrend: 22.0,
      page1: 42,
      enquiries: 148
    },
    // Historical trends
    historical: {
      "12m": {
        months: ["Oct 25", "Nov 25", "Dec 25", "Jan 26", "Feb 26", "Mar 26", "Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26"],
        traffic: [3100, 3250, 3500, 3900, 4200, 4800, 5200, 5800, 6200, 6900, 7500, 8420],
        clicks: [880, 920, 1020, 1150, 1280, 1450, 1600, 1780, 1920, 2050, 2210, 2410]
      },
      "6m": {
        months: ["Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26"],
        traffic: [5200, 5800, 6200, 6900, 7500, 8420],
        clicks: [1600, 1780, 1920, 2050, 2210, 2410]
      }
    }
  },

  // Top Pages (Section 6)
  topPages: [
    { title: "Advanced Lasik Surgery Jayanagar", url: "/lasik-surgery-jayanagar", visits: 2840, keywords: 12, leads: 82 },
    { title: "Tirumalai Eye Clinic - Homepage", url: "/", visits: 2420, keywords: 15, leads: 48 },
    { title: "Cataract Specialist & Laser Treatment", url: "/cataract-specialist-bangalore", visits: 1850, keywords: 8, leads: 38 },
    { title: "Glaucoma Prevention Guide & Checkups", url: "/blog/glaucoma-prevention-guide", visits: 820, keywords: 5, leads: 12 }
  ],

  // GBP metrics (Section 7)
  gbp: {
    calls: 480,
    directions: 840,
    clicks: 600,
    reviews: 18,
    rating: 4.8,
    views: 24000,
    // Historical stacked GBP actions over 6 months
    historical: {
      months: ["Apr 26", "May 26", "Jun 26", "Jul 26", "Aug 26", "Sep 26"],
      calls: [280, 310, 340, 380, 420, 480],
      directions: [510, 590, 640, 710, 780, 840],
      clicks: [380, 420, 460, 510, 550, 600]
    }
  },

  // Insights (Section 8)
  insights: {
    worked: [
      { title: "Lasik Surgery Service Page Optimization", desc: "Updating search intent headers and restructuring on-page text drove the LASIK surgery keyword to position #3, resulting in a 34% increase in online appointment enquiries." },
      { title: "Weekly GBP Highlights Posting", desc: "Adding weekly updates and clinic photos directly improved local map placement interactions, driving direction requests to an all-time high of 840 this month." }
    ],
    opportunities: [
      { title: "Target Neighborhood Location Keywords", desc: "Optimizing landing pages for adjacent areas (e.g., 'Lasik Clinic JP Nagar', 'Eye Hospital Banashankari') can capture surrounding high-intent local search queries." },
      { title: "Glaucoma Information Content Hub", desc: "Expanding informational blogs around glaucoma diagnostics and laser treatment timelines can drive additional top-of-funnel healthcare searches." }
    ],
    challenges: [
      { title: "Increased Local Clinic Ad Spends", desc: "New dental and vision group practices entering the Jayanagar area have increased map competition, which we are counteracting with our local citations plan." },
      { title: "Highly Competitive Laser Keywords", desc: "Generic terms like 'best eye hospital Bangalore' require substantial authority; our strategy remains focused on localized keywords to drive immediate clinic checkups." }
    ]
  },

  // Roadmap (Section 9)
  roadmap: [
    {
      week: 1,
      tasks: [
        { title: "Publish Glaucoma FAQ Hub", cat: "blog" },
        { title: "Target JP Nagar localized keywords", cat: "local" }
      ]
    },
    {
      week: 2,
      tasks: [
        { title: "Deploy mobile navigation optimizations", cat: "tech" },
        { title: "Publish GBP weekly checkup campaigns", cat: "gbp" }
      ]
    },
    {
      week: 3,
      tasks: [
        { title: "Publish Pediatric Eye Care Blog", cat: "blog" },
        { title: "Build healthcare directory links", cat: "link" }
      ]
    },
    {
      week: 4,
      tasks: [
        { title: "Optimize Doctors biography layouts", cat: "opt" },
        { title: "Verify local directories profile consistency", cat: "local" }
      ]
    }
  ]
};

// --- CONTROLLER LOGIC ---
const AppController = {
  init() {
    ChartsController.setupDefaults();
    this.bindEvents();
    this.renderAll();
  },

  bindEvents() {
    // Search filter for Activity Log table
    const searchInput = document.getElementById('activity-search');
    searchInput.addEventListener('input', (e) => {
      this.renderActivityLog(e.target.value);
    });

    // Close modal triggers
    const closeBtn = document.getElementById('mdl-close-trigger');
    const overlay = document.getElementById('activity-detail-modal');
    
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('show');
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('show');
    });

    // Organic Charts period selector
    const chartTabBtns = document.querySelectorAll('#organic-chart-tabs .chart-tab-btn');
    chartTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        chartTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const period = btn.getAttribute('data-period');
        this.updateOrganicChart(period);
      });
    });

    // Export PDF Report action
    const btnPdf = document.getElementById('btn-export-pdf');
    btnPdf.addEventListener('click', () => {
      // Direct high-fidelity PDF compile via native print dialog (combines Reports & styles)
      ReportsManager.printPDF();
    });
  },

  renderAll() {
    // Header
    document.getElementById('hdr-client-name').innerText = SeoDashboardData.clientName;
    document.getElementById('hdr-mgr-name').innerText = SeoDashboardData.manager;
    document.getElementById('hdr-mgr-avatar').innerText = SeoDashboardData.managerAvatar;

    this.renderActivityCalendar();
    this.renderActivityLog("");
    this.renderWorkSummary();
    this.renderTargetKeywords();
    this.renderKeywordJourney();
    this.renderGrowthKPIs();
    this.renderTopPages();
    this.renderGbpPerformance();
    this.renderInsights();
    this.renderRoadmap();

    // Init charts
    this.updateOrganicChart("12m");
    this.updateGbpChart();
  },

  // SECTION 1: CALENDAR
  renderActivityCalendar() {
    const container = document.getElementById('calendar-days-container');
    container.innerHTML = '';

    // September 2026 starts on a Tuesday (2)
    // Sunday (0), Monday (1) are empty offsets
    container.insertAdjacentHTML('beforeend', '<div class="calendar-day-cell empty"></div>');
    container.insertAdjacentHTML('beforeend', '<div class="calendar-day-cell empty"></div>');

    // Create day maps
    const dayEvents = {};
    SeoDashboardData.activities.forEach(act => {
      if (!dayEvents[act.day]) dayEvents[act.day] = [];
      dayEvents[act.day].push(act);
    });

    for (let day = 1; day <= 30; day++) {
      const isToday = day === 17 ? 'today' : ''; // Mock Sep 17 today
      let tagsHtml = '';

      if (dayEvents[day]) {
        dayEvents[day].forEach(act => {
          let label = "Blog";
          if (act.category === 'opt') label = "Optimize";
          if (act.category === 'tech') label = "Technical";
          if (act.category === 'gbp') label = "GBP";
          if (act.category === 'link') label = "Link";
          if (act.category === 'local') label = "Local";

          tagsHtml += `
            <div class="calendar-event-tag event-${act.category}" data-act-id="${act.id}">
              ${label}: ${act.title}
            </div>
          `;
        });
      }

      const dayCell = `
        <div class="calendar-day-cell ${isToday}">
          <span class="day-num-lbl">${day}</span>
          ${tagsHtml}
        </div>
      `;
      container.insertAdjacentHTML('beforeend', dayCell);
    }

    // Bind event detail click triggers
    const tags = container.querySelectorAll('.calendar-event-tag');
    tags.forEach(t => {
      t.addEventListener('click', (e) => {
        e.stopPropagation();
        const actId = t.getAttribute('data-act-id');
        this.openActivityModal(actId);
      });
    });
  },

  openActivityModal(actId) {
    const act = SeoDashboardData.activities.find(a => a.id === actId);
    if (!act) return;

    document.getElementById('mdl-activity-title').innerText = act.title;
    document.getElementById('mdl-activity-date').innerText = `September ${act.day}, 2026`;
    document.getElementById('mdl-activity-desc').innerText = act.desc;
    
    // Set category label and styles
    const catNode = document.getElementById('mdl-activity-cat');
    let label = "Blog Published";
    if (act.category === 'opt') label = "Page Optimization";
    if (act.category === 'tech') label = "Technical SEO Fix";
    if (act.category === 'gbp') label = "Google Business Profile Update";
    if (act.category === 'link') label = "Backlink Acquired";
    if (act.category === 'local') label = "Local SEO Activity";
    
    catNode.innerText = label;
    catNode.className = `calendar-event-tag event-${act.category}`;

    const overlay = document.getElementById('activity-detail-modal');
    overlay.classList.add('show');
  },

  renderActivityLog(searchQuery) {
    const tbody = document.querySelector('#activity-log-table tbody');
    tbody.innerHTML = '';

    const query = searchQuery.toLowerCase().trim();
    const filtered = SeoDashboardData.activities.filter(a => {
      return a.title.toLowerCase().includes(query) || 
             a.desc.toLowerCase().includes(query) ||
             a.category.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted); padding: 32px;">No completed activities found matching your search.</td></tr>`;
      return;
    }

    filtered.forEach(a => {
      let label = "Blog Published";
      if (a.category === 'opt') label = "Page Optimized";
      if (a.category === 'tech') label = "Technical SEO Fix";
      if (a.category === 'gbp') label = "GBP Profile Updated";
      if (a.category === 'link') label = "Backlink Acquired";
      if (a.category === 'local') label = "Local Citation Synced";

      const tr = `
        <tr style="cursor: pointer;" data-act-id="${a.id}">
          <td style="font-weight: 600; color: var(--text-primary);">Sept ${a.day}, 2026</td>
          <td>
            <span class="calendar-event-tag event-${a.category}">${label}</span>
          </td>
          <td>
            <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 2px;">${a.title}</div>
            <div style="color: var(--text-secondary); font-size: 12.5px;">${a.desc}</div>
          </td>
          <td>
            <span class="badge-status status-completed">${a.status}</span>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML('beforeend', tr);
    });

    // Row click opens modal
    const rows = tbody.querySelectorAll('tr[data-act-id]');
    rows.forEach(r => {
      r.addEventListener('click', () => {
        const actId = r.getAttribute('data-act-id');
        this.openActivityModal(actId);
      });
    });
  },

  // SECTION 2: WORK COMPLETED THIS MONTH
  renderWorkSummary() {
    const container = document.getElementById('work-completed-container');
    container.innerHTML = '';

    SeoDashboardData.workSummary.forEach(w => {
      // SVG progress circle properties
      // Length = 2 * PI * R = 2 * 3.14159 * 28 = 175.9
      const strokeOffset = 175.9 * (1 - w.pct / 100);

      const cardHtml = `
        <div class="card work-summary-card">
          <div class="work-summary-icon" style="background-color: ${w.color}08; color: ${w.color}">
            ${w.icon}
          </div>
          <span class="work-summary-title">${w.label}</span>
          <span class="work-summary-value">${w.value} / ${w.target}</span>
          
          <div class="work-progress-ring">
            <svg width="70" height="70" viewBox="0 0 70 70">
              <circle cx="35" cy="35" r="28" fill="none" stroke="var(--bg-tertiary)" stroke-width="6" />
              <circle cx="35" cy="35" r="28" fill="none" stroke="${w.color}" stroke-width="6"
                      stroke-dasharray="175.9" stroke-dashoffset="${strokeOffset}" stroke-linecap="round"
                      transform="rotate(-90 35 35)" style="transition: stroke-dashoffset 0.8s ease;" />
            </svg>
            <span class="work-progress-text">${w.pct}%</span>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', cardHtml);
    });
  },

  // SECTION 3: TARGET KEYWORD RANKINGS
  renderTargetKeywords() {
    const tbody = document.querySelector('#keyword-rankings-table tbody');
    tbody.innerHTML = '';

    SeoDashboardData.keywords.forEach(k => {
      const isPage1 = k.rank <= 10;
      const badgeClass = isPage1 ? 'page1' : 'other';
      const label = isPage1 ? `Page 1 (Pos #${k.rank})` : `Pos #${k.rank}`;

      const tr = `
        <tr>
          <td style="font-weight: 700; color: var(--text-primary); font-size: 14px;">${k.keyword}</td>
          <td>
            <span class="rank-badge ${badgeClass}">${label}</span>
          </td>
          <td>
            <span class="intent-tag">${k.intent}</span>
          </td>
          <td>
            <a href="#" style="color: var(--accent); font-family: monospace; font-size: 12px; font-weight: 500;">
              ${k.page}
            </a>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML('beforeend', tr);
    });
  },

  // SECTION 4: KEYWORD GROWTH JOURNEY
  renderKeywordJourney() {
    const container = document.getElementById('journey-container');
    container.innerHTML = '';

    SeoDashboardData.journey.forEach((j, idx) => {
      const diff = j.start - j.current;
      const progressPct = Math.round((diff / j.start) * 100);

      const cardHtml = `
        <div class="card journey-card">
          <span class="journey-keyword-title">${j.keyword}</span>
          <div class="journey-stats-row">
            <div class="journey-stat-block">
              <span class="journey-stat-lbl">Starting Rank</span>
              <span class="journey-stat-val" style="color: var(--text-muted);">Pos #${j.start}</span>
            </div>
            
            <!-- Visual rank rise arrow -->
            <div class="journey-progress-indicator">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 14px; height: 14px;">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              +${diff} Positions
            </div>
            
            <div class="journey-stat-block" style="text-align: right;">
              <span class="journey-stat-lbl">Current Rank</span>
              <span class="journey-stat-val" style="color: var(--success);">Pos #${j.current}</span>
            </div>
          </div>
          <div class="journey-chart-canvas">
            <canvas id="journey-sparkline-${idx}" height="60"></canvas>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', cardHtml);

      // Trigger sparkline render
      setTimeout(() => {
        ChartsController.renderJourneySparkline(`journey-sparkline-${idx}`, j.sparkline);
      }, 50);
    });
  },

  // SECTION 5: ORGANIC GROWTH OVERVIEW
  renderGrowthKPIs() {
    const container = document.getElementById('growth-kpis-container');
    container.innerHTML = '';

    const kpis = SeoDashboardData.organicGrowth.kpis;
    const items = [
      { label: "Organic Website Traffic", value: kpis.traffic.toLocaleString() + " visits", trend: kpis.trafficTrend, desc: "Monthly sessions" },
      { label: "Google Organic Clicks", value: kpis.clicks.toLocaleString() + " clicks", trend: kpis.clicksTrend, desc: "Search results clicks" },
      { label: "Google Business Actions", value: kpis.gbp.toLocaleString() + " actions", trend: kpis.gbpTrend, desc: "Map calls & direction clicks" },
      { label: "Keywords in Top 10 (Page 1)", value: kpis.page1 + " keywords", trend: null, desc: "Target terms driving traffic" },
      { label: "Total Online Leads Generated", value: kpis.leads + " leads", trend: kpis.leadsTrend, desc: "Booking enquiries received" }
    ];

    items.forEach(k => {
      let trendHtml = '';
      if (k.trend !== null) {
        trendHtml = `
          <span class="kpi-simple-trend">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 12px; height: 12px;">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
            +${k.trend}% <span class="trend-period">6-mo growth</span>
          </span>
        `;
      }

      const cardHtml = `
        <div class="card kpi-simple-card">
          <span class="kpi-simple-lbl">${k.label}</span>
          <span class="kpi-simple-val">${k.value}</span>
          ${trendHtml || `<span class="trend-period" style="font-size: 11px;">${k.desc}</span>`}
        </div>
      `;
      container.insertAdjacentHTML('beforeend', cardHtml);
    });
  },

  updateOrganicChart(period) {
    const hist = SeoDashboardData.organicGrowth.historical[period];
    if (!hist) return;

    ChartsController.renderOrganicGrowthChart(
      hist.months,
      hist.traffic,
      hist.clicks
    );
  },

  // SECTION 6: TOP PERFORMING PAGES
  renderTopPages() {
    const container = document.getElementById('top-pages-container');
    container.innerHTML = '';

    SeoDashboardData.topPages.forEach(p => {
      const cardHtml = `
        <div class="card top-page-card">
          <div class="top-page-header">
            <span class="top-page-title">${p.title}</span>
            <span class="top-page-url">${p.url}</span>
          </div>
          
          <div class="top-page-metrics-grid">
            <div class="top-page-metric">
              <span class="top-page-val">${p.visits.toLocaleString()}</span>
              <span class="top-page-lbl">Visits</span>
            </div>
            <div class="top-page-metric">
              <span class="top-page-val">${p.keywords}</span>
              <span class="top-page-lbl">Keywords</span>
            </div>
            <div class="top-page-metric">
              <span class="top-page-val" style="color: var(--success); font-weight: 700;">+${p.leads}</span>
              <span class="top-page-lbl">Leads</span>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', cardHtml);
    });
  },

  // SECTION 7: GBP PERFORMANCE
  renderGbpPerformance() {
    const container = document.getElementById('gbp-stats-container');
    container.innerHTML = '';

    const gbp = SeoDashboardData.gbp;
    const stats = [
      { label: "Phone Clicks", value: gbp.calls.toLocaleString() },
      { label: "Directions Requests", value: gbp.directions.toLocaleString() },
      { label: "Website Clicks", value: gbp.clicks.toLocaleString() },
      { label: "Map Profile Views", value: gbp.views.toLocaleString() },
      { label: "Reviews Received", value: `+${gbp.reviews} reviews` },
      { label: "Average Rating Stars", value: `${gbp.rating} / 5.0 ★` }
    ];

    stats.forEach(s => {
      const itemHtml = `
        <div class="gbp-mini-stat">
          <span class="gbp-mini-lbl">${s.label}</span>
          <span class="gbp-mini-val">${s.value}</span>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', itemHtml);
    });
  },

  updateGbpChart() {
    const hist = SeoDashboardData.gbp.historical;
    ChartsController.renderGbpActionsChart(
      hist.months,
      hist.calls,
      hist.directions,
      hist.clicks
    );
  },

  // SECTION 8: SEO INSIGHTS & OPPORTUNITIES
  renderInsights() {
    const container = document.getElementById('insights-container');
    container.innerHTML = '';

    const configs = [
      { key: "worked", label: "What Worked", color: "worked", icon: `<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.137-.089l4.009-5.61Z" clip-rule="evenodd" />` },
      { key: "opportunities", label: "Opportunities", color: "opp", icon: `<path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />` },
      { key: "challenges", label: "Challenges & Competitors", color: "risk", icon: `<path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.401 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />` }
    ];

    configs.forEach(cfg => {
      let bulletsHtml = '';
      SeoDashboardData.insights[cfg.key].forEach(bullet => {
        bulletsHtml += `
          <li class="insight-bullet-item">
            <span class="insight-bullet-title">${bullet.title}</span>
            <span class="insight-bullet-desc">${bullet.desc}</span>
          </li>
        `;
      });

      const cardHtml = `
        <div class="card insight-card">
          <div class="insight-header">
            <svg class="insight-icon insight-icon-${cfg.color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              ${cfg.icon}
            </svg>
            ${cfg.label}
          </div>
          <ul class="insight-bullets-list">
            ${bulletsHtml}
          </ul>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', cardHtml);
    });
  },

  // SECTION 9: ROADMAP
  renderRoadmap() {
    const container = document.getElementById('roadmap-timeline-container');
    container.innerHTML = '';

    SeoDashboardData.roadmap.forEach(r => {
      let tasksHtml = '';
      
      r.tasks.forEach(t => {
        let dotColor = "var(--color-blog)";
        if (t.cat === 'opt') dotColor = "var(--color-opt)";
        if (t.cat === 'tech') dotColor = "var(--color-tech)";
        if (t.cat === 'gbp') dotColor = "var(--color-gbp)";
        if (t.cat === 'link') dotColor = "var(--color-link)";
        if (t.cat === 'local') dotColor = "var(--color-local)";

        tasksHtml += `
          <div class="roadmap-activity-pill">
            <span class="roadmap-tag-indicator" style="background-color: ${dotColor};"></span>
            ${t.title}
          </div>
        `;
      });

      const nodeHtml = `
        <div class="roadmap-week-node">
          <div class="roadmap-week-dot"></div>
          <span class="roadmap-week-title">Week ${r.week} Priorities</span>
          <div class="roadmap-activity-grid">
            ${tasksHtml}
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', nodeHtml);
    });
  }
};

window.addEventListener('DOMContentLoaded', () => {
  AppController.init();
});
