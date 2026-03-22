import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero -->
    <section class="about-hero">
      <div class="container">
        <h1 class="hero-title">About UXwithAIway</h1>
        <p class="hero-subtitle">
          A free, practitioner-first knowledge platform for UX designers navigating AI-augmented workflows.
        </p>
      </div>
    </section>

    <section class="section-padding about-body">
      <div class="container about-container">

        <!-- Mission -->
        <div class="about-section">
          <h2 class="about-heading">Our Mission</h2>
          <div class="mission-text">
            <p>
              AI tool adoption in UX is fragmented and poorly supported. Over 100 AI tools launched in 2024 relevant to UX
              - with no trusted curation layer. No practitioner-curated framework exists that connects AI tools to
              the actual phases of a UX process.
            </p>
            <p>
              Most existing resources assume in-house product teams. Service design consultants face client data rules,
              procurement delays, compliance environments, and fixed-bid billing constraints that existing wikis completely ignore.
            </p>
            <p>
              UXwithAIway closes this gap with opinionated, workflow-grounded guidance - not vendor marketing,
              not academic theory - written by invite-only practitioners and structured around the actual shape of a UX project.
            </p>
          </div>
        </div>

        <!-- What Makes Us Different -->
        <div class="about-section">
          <h2 class="about-heading">What Makes Us Different</h2>
          <div class="diff-grid">
            @for (d of differentiators; track d.title) {
              <div class="card diff-card">
                <span class="diff-icon">{{ d.icon }}</span>
                <h3 class="diff-title">{{ d.title }}</h3>
                <p class="diff-desc">{{ d.desc }}</p>
              </div>
            }
          </div>
        </div>

        <!-- Roadmap -->
        <div class="about-section">
          <h2 class="about-heading">Roadmap</h2>
          <div class="roadmap-list">
            @for (p of roadmapPhases; track p.phase) {
              <div class="card roadmap-card">
                <div class="roadmap-header">
                  <h3 class="roadmap-title">{{ p.phase }}</h3>
                  <span
                    class="roadmap-badge"
                    [class.current]="p.status === 'Current'"
                    [class.planned]="p.status === 'Planned'"
                    [class.future]="p.status === 'Future'"
                  >
                    {{ p.status }}
                  </span>
                </div>
                <div class="roadmap-items">
                  @for (item of p.items; track item) {
                    <span class="roadmap-item">
                      <span class="roadmap-dot" [class.active]="p.status === 'Current'">
                        {{ p.status === 'Current' ? '\u25CF' : '\u25CB' }}
                      </span>
                      {{ item }}
                    </span>
                  }
                </div>
              </div>
            }
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-box">
          <h2 class="cta-title">Get Started</h2>
          <p class="cta-desc">
            Launch the Strategy Builder to get your first tailored AI workflow, or explore the Wiki.
          </p>
          <div class="cta-actions">
            <a routerLink="/strategy-builder" class="btn-primary">Strategy Builder</a>
            <a routerLink="/wiki" class="btn-secondary">Explore Wiki</a>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    /* Hero */
    .about-hero {
      padding: 60px 24px 48px;
      background: var(--accent-gradient);
      text-align: center;
    }

    .hero-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      color: #fff;
      font-family: var(--font-heading);
      margin-bottom: 16px;
    }

    .hero-subtitle {
      font-size: 1.1rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.7;
    }

    .about-body {
      background: var(--bg-primary);
    }

    .about-container {
      max-width: 860px;
    }

    .about-section {
      margin-bottom: 60px;
    }

    .about-heading {
      font-size: 1.5rem;
      font-family: var(--font-heading);
      margin-bottom: 20px;
      color: var(--text-primary);
    }

    /* Mission */
    .mission-text {
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.8;

      p {
        margin: 0 0 16px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    /* Differentiators */
    .diff-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .diff-card {
      padding: 28px;
    }

    .diff-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: 12px;
    }

    .diff-title {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 8px;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .diff-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin: 0;
    }

    /* Roadmap */
    .roadmap-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .roadmap-card {
      padding: 24px;
    }

    .roadmap-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
      flex-wrap: wrap;
    }

    .roadmap-title {
      font-size: 1.05rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .roadmap-badge {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: var(--radius-full);

      &.current {
        background: rgba(16, 185, 129, 0.1);
        color: var(--success);
      }

      &.planned {
        background: rgba(59, 130, 246, 0.1);
        color: var(--info);
      }

      &.future {
        background: rgba(107, 111, 148, 0.1);
        color: var(--text-tertiary);
      }
    }

    .roadmap-items {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 6px;
    }

    .roadmap-item {
      font-size: 0.85rem;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .roadmap-dot {
      color: var(--text-tertiary);

      &.active {
        color: var(--success);
      }
    }

    /* CTA */
    .cta-box {
      text-align: center;
      padding: 48px 32px;
      background: var(--bg-secondary);
      border-radius: var(--radius-xl);
      border: 1px solid var(--border-color);
    }

    .cta-title {
      font-size: 1.5rem;
      font-family: var(--font-heading);
      margin-bottom: 12px;
      color: var(--text-primary);
    }

    .cta-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      max-width: 480px;
      margin: 0 auto 24px;
    }

    .cta-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
  `],
})
export class AboutComponent {
  readonly differentiators = [
    { icon: '\uD83C\uDFAF', title: 'Strategy Builder', desc: 'The only tool that takes your project context - type, contract, timeline, team, org, design system - and outputs a tailored AI workflow.' },
    { icon: '\u270D\uFE0F', title: 'Practitioner-Written', desc: 'Every article written by active UX designers with real industry experience. No vendor-influenced content. No marketing language.' },
    { icon: '\uD83C\uDD93', title: 'Free Forever', desc: 'The core platform is free - no paywalls, no premium tiers for essential content. Built as a public resource for the design community.' },
    { icon: '\uD83D\uDD0D', title: 'Honest Assessments', desc: 'We name real tools with honest reviews including limitations. We discuss hallucination, overconfidence, and failure modes directly.' },
  ];

  readonly roadmapPhases = [
    {
      phase: 'Phase 1 - Foundation',
      status: 'Current',
      items: ['CMS + Frontend setup', 'Sections 01\u201305 content', 'Strategy Builder v1', 'Tool Directory (20+ tools)', 'Glossary (30 terms)', 'Contributor Hub'],
    },
    {
      phase: 'Phase 2 - Depth',
      status: 'Planned',
      items: ['Sections 06\u201308 content', 'All downloadable templates', 'Interactive calculators', 'Prompt Builder tool', 'Tool Directory (60+ tools)', 'Video production'],
    },
    {
      phase: 'Phase 3 - Intelligence',
      status: 'Future',
      items: ['Claude API integration', 'Semantic search', 'Newsletter + community', 'Analytics dashboard', 'Premium layer option'],
    },
  ];
}
