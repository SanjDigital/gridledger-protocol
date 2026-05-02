/**
 * Decision Friction Tracking
 * 
 * Tracks where institutional belief breaks:
 * - Section dwell time (especially sections 6 & 8)
 * - Hover events on critical comparisons
 * - CTA hesitation (form start vs form submit)
 * 
 * Insight Goal: Identify "Where does belief break?"
 */

interface FrictionEvent {
  type: 'section_dwell' | 'hover_comparison' | 'form_start' | 'form_submit' | 'form_abandon';
  section?: string;
  element?: string;
  timestamp: number;
  duration?: number;
}

class FrictionTracker {
  private events: FrictionEvent[] = [];
  private sectionEnterTime: Record<string, number> = {};

  trackSectionEnter(sectionName: string) {
    this.sectionEnterTime[sectionName] = Date.now();
  }

  trackSectionExit(sectionName: string) {
    if (this.sectionEnterTime[sectionName]) {
      const duration = Date.now() - this.sectionEnterTime[sectionName];
      this.events.push({
        type: 'section_dwell',
        section: sectionName,
        timestamp: Date.now(),
        duration,
      });
      delete this.sectionEnterTime[sectionName];
    }
  }

  trackHoverComparison(element: string) {
    this.events.push({
      type: 'hover_comparison',
      element,
      timestamp: Date.now(),
    });
  }

  trackFormStart() {
    this.events.push({
      type: 'form_start',
      timestamp: Date.now(),
    });
  }

  trackFormSubmit() {
    this.events.push({
      type: 'form_submit',
      timestamp: Date.now(),
    });
  }

  trackFormAbandon() {
    this.events.push({
      type: 'form_abandon',
      timestamp: Date.now(),
    });
  }

  // Analyze where belief breaks
  analyzeDecisionFriction() {
    const analysis = {
      totalEvents: this.events.length,
      sectionDwellTimes: {} as Record<string, number[]>,
      comparisonHovers: [] as string[],
      formConversionRate: 0,
      criticalFrictionPoints: [] as string[],
    };

    for (const event of this.events) {
      if (event.type === 'section_dwell' && event.section && event.duration) {
        if (!analysis.sectionDwellTimes[event.section]) {
          analysis.sectionDwellTimes[event.section] = [];
        }
        analysis.sectionDwellTimes[event.section].push(event.duration);
      } else if (event.type === 'hover_comparison' && event.element) {
        analysis.comparisonHovers.push(event.element);
      }
    }

    // Calculate form conversion
    const formStarts = this.events.filter((e) => e.type === 'form_start').length;
    const formSubmits = this.events.filter((e) => e.type === 'form_submit').length;
    analysis.formConversionRate = formStarts > 0 ? formSubmits / formStarts : 0;

    // Identify friction points
    for (const [section, times] of Object.entries(analysis.sectionDwellTimes)) {
      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      // Friction = unusually high dwell time (>30 seconds)
      if (avgTime > 30000) {
        analysis.criticalFrictionPoints.push(
          `${section} (avg ${(avgTime / 1000).toFixed(1)}s)`
        );
      }
    }

    return analysis;
  }

  // Send to analytics endpoint
  async sendAnalytics() {
    const analysis = this.analyzeDecisionFriction();
    try {
      await fetch('/api/friction-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          events: this.events,
          analysis,
          timestamp: Date.now(),
        }),
      });
    } catch (error) {
      console.log('Friction tracking logged locally');
    }
  }

  getEvents() {
    return this.events;
  }

  clear() {
    this.events = [];
    this.sectionEnterTime = {};
  }
}

export const frictionTracker = new FrictionTracker();
