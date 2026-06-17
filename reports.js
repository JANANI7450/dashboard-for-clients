/**
 * reports.js
 * Handles client report exports and print trigger bindings.
 */

const ReportsManager = {
  /**
   * Triggers the browser's native print interface.
   * Works in tandem with @media print CSS styling rules.
   */
  printPDF() {
    window.print();
  },

  /**
   * Generates a downloadable Markdown summary of the SEO performance report.
   * @param {Object} data - The active client SEO dataset
   */
  downloadSummaryReport(data) {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let doc = `====================================================
IUGALE SEO CLIENT PERFORMANCE REPORT - ${data.clientName.toUpperCase()}
====================================================
Date Compiled: ${today}
Reporting Period: 01 September 2026 – 30 September 2026
Assigned Manager: ${data.manager}
Services Checked: On-Page, Technical, Local SEO, GBP, Content, Backlinks

====================================================
1. COMPLETED DELIVERABLES & PROGRESS
====================================================
Total completed deliverables in September 2026:
`;

    data.workSummary.forEach(w => {
      doc += `- ${w.label}: ${w.value} completed (${w.pct}% progress against monthly schedule)\n`;
    });

    doc += `
====================================================
2. MONTHLY SEO ACTIVITY LOG
====================================================
`;

    data.activities.forEach(a => {
      doc += `[Sept ${String(a.day).padStart(2, '0')}] (${a.category.toUpperCase()}) - ${a.title}\n  Details: ${a.desc} [${a.status.toUpperCase()}]\n\n`;
    });

    doc += `
====================================================
3. TARGET KEYWORD RANKINGS
====================================================
High-intent organic search positions:
`;

    data.keywords.forEach(k => {
      doc += `- ${k.keyword}: Position #${k.rank} (${k.intent.toUpperCase()} - Target Page: ${k.page})\n`;
    });

    doc += `
====================================================
4. KEYWORD GROWTH JOURNEY (STARTING VS TODAY)
====================================================
Long-term organic visibility increases:
`;

    data.journey.forEach(j => {
      const diff = j.start - j.current;
      doc += `- ${j.keyword}: Started at #${j.start} -> Now at #${j.current} (Improved by ${diff} spots)\n`;
    });

    doc += `
====================================================
5. ORGANIC GROWTH TRENDS (LAST 12 MONTHS)
====================================================
- Monthly Organic Traffic: ${data.organicGrowth.kpis.traffic.toLocaleString()} (+${data.organicGrowth.kpis.trafficTrend}% trend)
- Organic Monthly Clicks: ${data.organicGrowth.kpis.clicks.toLocaleString()} (+${data.organicGrowth.kpis.clicksTrend}% trend)
- Monthly Organic Leads: ${data.organicGrowth.kpis.leads.toLocaleString()} (+${data.organicGrowth.kpis.leadsTrend}% trend)
- Google Business Profile Actions: ${data.organicGrowth.kpis.gbp.toLocaleString()} (+${data.organicGrowth.kpis.gbpTrend}% trend)
- Keywords on Page 1: ${data.organicGrowth.kpis.page1.toLocaleString()} keywords
- Website Organic Enquiries: ${data.organicGrowth.kpis.enquiries.toLocaleString()} leads

====================================================
6. GOOGLE BUSINESS PROFILE ACTIONS
====================================================
- Call Clicks: ${data.gbp.calls.toLocaleString()}
- Direction Requests: ${data.gbp.directions.toLocaleString()}
- Website Click Actions: ${data.gbp.clicks.toLocaleString()}
- Customer Reviews Received: ${data.gbp.reviews} reviews
- Average Customer Rating: ${data.gbp.rating} / 5.0 Stars
- Profile Views: ${data.gbp.views.toLocaleString()}

====================================================
7. SEO INSIGHTS & INTERPRETATIONS
====================================================
* WHAT WORKED:
${data.insights.worked.map(i => `  - ${i.title}: ${i.desc}`).join('\n')}

* OPPORTUNITIES FOR ACTION:
${data.insights.opportunities.map(i => `  - ${i.title}: ${i.desc}`).join('\n')}

* CHALLENGES & ROADBLOCKS:
${data.insights.challenges.map(i => `  - ${i.title}: ${i.desc}`).join('\n')}

====================================================
8. NEXT MONTH SEO ROADMAP
====================================================
`;

    data.roadmap.forEach(r => {
      doc += `* Week ${r.week}:\n`;
      r.tasks.forEach(t => {
        doc += `  - [ ] ${t.title} (${t.cat.toUpperCase()})\n`;
      });
    });

    doc += `\n====================================================
End of Report. Compiled by IUGALE Organic Search Intelligence Engine.
====================================================`;

    const blob = new Blob([doc], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `IUGALE_SEO_Report_${data.clientName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
