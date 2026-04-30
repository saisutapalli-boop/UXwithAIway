import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-roi-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="roi-section" id="roi">
      <div class="container">
        <div class="section-header">
          <span class="badge">Investor Friendly</span>
          <h2>The <span class="highlight">ROI</span> of AI-First UX</h2>
          <p>Quantifying the impact for every stakeholder in the ecosystem.</p>
        </div>

        <div class="roi-toggle">
          <button [class.active]="tab() === 'user'" (click)="tab.set('user')">For End Users</button>
          <button [class.active]="tab() === 'business'" (click)="tab.set('business')">For Business Owners</button>
        </div>

        <div class="roi-grid">
          @if (tab() === 'user') {
            @for (item of userRoi; track item.title) {
              <div class="roi-card">
                <div class="stat">{{ item.stat }}</div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
              </div>
            }
          } @else {
            @for (item of businessRoi; track item.title) {
              <div class="roi-card business">
                <div class="stat">{{ item.stat }}</div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
              </div>
            }
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .roi-section { padding: 100px 0; background: var(--bg-secondary); }
    .section-header { text-align: center; margin-bottom: 48px; }
    .badge { background: rgba(0, 164, 239, 0.1); color: #00A4EF; padding: 6px 16px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
    h2 { font-size: 2.5rem; margin-top: 16px; }
    .highlight { color: #b1000e; }

    .roi-toggle { display: flex; justify-content: center; gap: 16px; margin-bottom: 48px; }
    .roi-toggle button {
      padding: 12px 32px; border-radius: 30px; border: 1px solid var(--border-color); background: var(--bg-primary); color: var(--text-secondary); cursor: pointer; font-weight: 600; transition: all 0.3s;
      &.active { background: #b1000e; color: white; border-color: #b1000e; box-shadow: 0 10px 20px rgba(177, 0, 14, 0.2); }
    }

    .roi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
    .roi-card {
      padding: 40px; background: var(--bg-primary); border-radius: 24px; border: 1px solid var(--border-color); text-align: center; transition: transform 0.3s;
      &:hover { transform: scale(1.02); }
      .stat { font-size: 3rem; font-weight: 800; color: #b1000e; margin-bottom: 16px; font-family: var(--font-heading); }
      &.business .stat { color: #00A4EF; }
      h3 { font-size: 1.25rem; margin-bottom: 12px; }
      p { color: var(--text-secondary); line-height: 1.6; font-size: 0.95rem; }
    }
  `],
})
export class RoiSectionComponent {
  tab = signal<'user' | 'business'>('user');

  userRoi = [
    { stat: '40%', title: 'Reduced Cognitive Load', desc: 'Predictive layouts reduce the effort users spend navigating and finding information.' },
    { stat: '2x', title: 'Faster Goal Completion', desc: 'AI-optimized user journeys eliminate friction, letting users finish tasks in half the time.' },
    { stat: '0.0g', title: 'Carbon Neutral Session', desc: 'Sustainable design choices ensure the user\'s interaction has zero environmental impact.' }
  ];

  businessRoi = [
    { stat: '300%', title: 'Dev Efficiency', desc: 'Identify UX issues during simulation, reducing expensive post-launch code changes and refactoring.' },
    { stat: '25%', title: 'Higher Retention', desc: 'Frictionless, sustainable experiences build deeper brand loyalty and long-term user value.' },
    { stat: 'ESG', title: 'Investor Compliance', desc: 'Real-time carbon tracking provides the data needed for modern ESG investor reporting.' }
  ];
}
