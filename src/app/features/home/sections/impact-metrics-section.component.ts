import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ContentService } from '../../../core/services/content.service';
import { AnimatedCounterComponent } from '../../../shared/components/animated-counter/animated-counter.component';

@Component({
  selector: 'app-impact-metrics-section',
  standalone: true,
  imports: [AnimatedCounterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section-padding metrics-section">
      <div class="container metrics-content">
        <span class="section-label">Business Case</span>
        <h2 class="section-title">Measurable Impact on Design Delivery</h2>
        <p class="section-subtitle">
          AI-assisted UX workflows don't just feel faster - they produce measurable time savings.
        </p>

        <div class="metrics-grid">
          @for (metric of metrics; track metric.label) {
            <div class="card metric-card">
              <div class="metric-icon">{{ metric.icon }}</div>
              <div class="metric-value">
                @if (metric.suffix !== '\u00D7') {
                  <span class="metric-prefix">up to </span>
                }
                <app-animated-counter [value]="metric.value" [suffix]="metric.suffix" />
              </div>
              <p class="metric-label">{{ metric.label }}</p>
            </div>
          }
        </div>

        <div class="table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>UX Phase</th>
                <th>Manual</th>
                <th>AI-Assisted</th>
                <th>Saving</th>
                <th>Tool</th>
              </tr>
            </thead>
            <tbody>
              @for (row of comparisons; track row.phase) {
                <tr>
                  <td class="phase-cell">{{ row.phase }}</td>
                  <td class="manual-cell">{{ row.manual }}</td>
                  <td class="ai-cell">{{ row.ai }}</td>
                  <td><span class="saving-badge">{{ row.saving }}</span></td>
                  <td class="tool-cell">{{ row.tool }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .metrics-section {
      background: var(--bg-secondary);
    }

    .metrics-content {
      text-align: center;
    }

    .section-subtitle {
      margin: 0 auto 48px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
      margin-bottom: 60px;
    }

    .metric-card {
      padding: 32px;
      text-align: center;
    }

    .metric-icon {
      font-size: 2rem;
      margin-bottom: 12px;
    }

    .metric-value {
      font-size: 3rem;
      font-weight: 800;
      font-family: var(--font-heading);
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 4px;
    }

    .metric-value ::ng-deep .counter {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 3rem;
      font-weight: 800;
      font-family: var(--font-heading);
    }

    .metric-prefix {
      font-size: 1rem;
      font-weight: 400;
      color: var(--text-secondary);
    }

    .metric-label {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin-top: 8px;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .comparison-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
      text-align: left;
    }

    .comparison-table thead tr {
      border-bottom: 2px solid var(--border-color);
    }

    .comparison-table th {
      padding: 14px 16px;
      font-weight: 700;
      color: var(--text-primary);
      font-family: var(--font-heading);
      white-space: nowrap;
    }

    .comparison-table tbody tr {
      border-bottom: 1px solid var(--border-light);
    }

    .phase-cell {
      padding: 14px 16px;
      font-weight: 500;
      color: var(--text-primary);
    }

    .manual-cell {
      padding: 14px 16px;
      color: var(--text-tertiary);
    }

    .ai-cell {
      padding: 14px 16px;
      color: var(--success);
      font-weight: 600;
    }

    .saving-badge {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success);
      padding: 4px 10px;
      border-radius: var(--radius-full);
      font-size: 0.8rem;
      font-weight: 600;
    }

    .tool-cell {
      padding: 14px 16px;
      color: var(--text-secondary);
      font-size: 0.85rem;
    }
  `],
})
export class ImpactMetricsSectionComponent {
  private readonly content = inject(ContentService);

  readonly metrics = this.content.getImpactMetrics();
  readonly comparisons = this.content.getPhaseComparisons();
}
