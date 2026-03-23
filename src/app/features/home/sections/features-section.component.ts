import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-features-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section-padding features-section">
      <div class="container features-content">
        <span class="section-label">What You Get</span>
        <h2 class="section-title">Everything a UX Designer Needs for AI Workflows</h2>
        <p class="section-subtitle">
          Structured, opinionated, and immediately useful - every visit produces actionable output.
        </p>

        <div class="features-grid">
          @for (feature of features; track feature.title; let i = $index) {
            <div class="card feature-card" [style.animation-delay]="i * 0.1 + 's'">
              <div class="feature-icon">{{ feature.icon }}</div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-desc">{{ feature.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .features-section {
      background: var(--bg-primary);
    }

    .features-content {
      text-align: center;
    }

    .section-subtitle {
      margin: 0 auto 48px;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .feature-card {
      padding: 32px;
      text-align: left;
    }

    .feature-icon {
      font-size: 2rem;
      margin-bottom: 16px;
    }

    .feature-title {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 8px;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .feature-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.7;
    }
  `],
})
export class FeaturesSectionComponent {
  readonly features = [
    { icon: '\u{1F3AF}', title: 'Strategy Builder', desc: 'Input your project context - get a tailored AI workflow, tool stack, and constraint surface specific to your situation.' },
    { icon: '\u{1F4D6}', title: 'Practitioner Wiki', desc: '8 sections covering every UX phase, with AI workflows, real tool recommendations, and honest assessments.' },
    { icon: '\u{1F6E0}\uFE0F', title: 'Tool Directory', desc: '50+ AI tools curated for UX - with freemium flags, client-safety ratings, and phase-specific recommendations.' },
    { icon: '\u{1F4D0}', title: 'Skill Level Filters', desc: 'Content tagged Junior, Mid, or Senior. See what matters for your experience level.' },
    { icon: '\u{1F91D}', title: 'Contributor Hub', desc: 'Invite-only practitioner contributors ensure quality. No vendor influence, no marketing language.' },
    { icon: '\u{1F4CA}', title: 'Impact Metrics', desc: 'Real numbers: 70% research reduction, 60% audit acceleration, 3\u00D7 solo output. Proven by practitioners.' },
  ];
}
