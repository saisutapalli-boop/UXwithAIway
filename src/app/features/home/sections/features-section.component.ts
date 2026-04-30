import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section-padding features-section">
      <div class="container features-content">
        <span class="section-label">What You Get</span>
        <h2 class="section-title">Everything a UX Designer Needs for AI Workflows</h2>
        <p class="section-subtitle">
          Structured, opinionated, and immediately useful - every visit produces actionable output.
        </p>

        <!-- Featured: Strategy Builder -->
        <a routerLink="/strategy-builder" class="featured-card">
          <div class="featured-glow"></div>
          <div class="featured-inner">
            <div class="featured-meta">
              <span class="featured-pill">★ Featured</span>
              <span class="featured-sub">Start here</span>
            </div>
            <h3 class="featured-title">AI UX Strategy Builder</h3>
            <p class="featured-desc">
              Input your project context — get a tailored AI workflow, curated tool stack,
              constraint surface, and action plan you can ship to stakeholders.
            </p>
            <div class="featured-ctas">
              <span class="featured-cta">Launch builder <span class="arrow">↗</span></span>
              <div class="featured-chips">
                <span class="chip">Workflow</span>
                <span class="chip">Tool stack</span>
                <span class="chip">Action plan</span>
              </div>
            </div>
          </div>
        </a>

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

    .featured-card {
      position: relative;
      display: block;
      text-align: left;
      padding: 2px;
      margin: 0 auto 32px;
      max-width: 1100px;
      border-radius: 24px;
      background: linear-gradient(135deg, rgba(139,92,246,0.55), rgba(59,130,246,0.5) 50%, rgba(177,0,14,0.5));
      text-decoration: none;
      overflow: hidden;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .featured-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 20px 60px rgba(99, 102, 241, 0.25);
    }

    .featured-glow {
      position: absolute;
      inset: -40%;
      background: radial-gradient(circle at 20% 20%, rgba(139,92,246,0.35), transparent 50%),
                  radial-gradient(circle at 80% 80%, rgba(59,130,246,0.3), transparent 50%);
      filter: blur(40px);
      pointer-events: none;
    }

    .featured-inner {
      position: relative;
      background: linear-gradient(180deg, #0d0b1a 0%, #120a1f 100%);
      border-radius: 22px;
      padding: 36px 40px;
      color: #fff;
    }

    .featured-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }

    .featured-pill {
      display: inline-flex;
      align-items: center;
      padding: 5px 12px;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #e9d5ff;
    }

    .featured-sub {
      font-size: 0.78rem;
      color: rgba(255,255,255,0.5);
      letter-spacing: 0.05em;
      text-transform: uppercase;
    }

    .featured-title {
      font-family: var(--font-heading);
      font-size: clamp(1.6rem, 3vw, 2.2rem);
      font-weight: 700;
      letter-spacing: -0.015em;
      margin: 0 0 10px;
      background: linear-gradient(135deg, #fff 0%, #c4b5fd 60%, #93c5fd 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .featured-desc {
      font-size: 1rem;
      color: rgba(255,255,255,0.72);
      line-height: 1.6;
      max-width: 680px;
      margin: 0 0 22px;
    }

    .featured-ctas {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
    }

    .featured-cta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      border-radius: 999px;
      background: linear-gradient(135deg, #6366f1, #3b82f6);
      color: #fff;
      font-weight: 600;
      font-size: 0.92rem;
      box-shadow: 0 6px 24px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.25);
    }

    .featured-cta .arrow { font-size: 0.95rem; }

    .featured-chips {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .chip {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.65);
      padding: 5px 10px;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 999px;
      background: rgba(255,255,255,0.03);
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
    { icon: '🌱', title: 'Eco-Friendly Carbon Tracker', desc: 'Futuristic sustainability: Measure and reduce the digital carbon footprint of your designs. Optimized for investor-friendly ESG reporting.' },
    { icon: '🔮', title: 'AI Behavioral Simulator', desc: 'Predictive UX: Simulate thousands of user interactions using advanced AI to identify friction before development. Futuristic risk mitigation.' },
    { icon: '\u{1F4D6}', title: 'Practitioner Wiki', desc: '8 sections covering every UX phase, with AI workflows, real tool recommendations, and honest assessments.' },
    { icon: '\u{1F6E0}\uFE0F', title: 'Tool Directory', desc: '50+ AI tools curated for UX - with freemium flags, client-safety ratings, and phase-specific recommendations.' },
    { icon: '\u{1F4CA}', title: 'Business ROI Metrics', desc: 'Investor-ready ROI: 70% research reduction, 60% audit acceleration, 3\u00D7 solo output. Proven business impact.' },
  ];
}
