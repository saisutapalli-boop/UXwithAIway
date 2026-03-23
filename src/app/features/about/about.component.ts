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
        <div class="hero-anchors">
          <a routerLink="." fragment="mission" class="hero-anchor">Mission</a>
          <a routerLink="." fragment="contributors" class="hero-anchor">Contribute</a>
          <a routerLink="." fragment="roadmap" class="hero-anchor">Roadmap</a>
        </div>
      </div>
    </section>

    <section class="section-padding about-body">
      <div class="container about-container">

        <!-- ── Mission ── -->
        <div id="mission" class="about-section">
          <h2 class="about-heading">Our Mission</h2>
          <div class="mission-text">
            <p>
              AI tool adoption in UX is fragmented and poorly supported. Over 100 AI tools launched in 2024 relevant to UX,
              yet no trusted curation layer exists. There is no practitioner-curated framework that connects AI tools to
              the actual phases of a UX process.
            </p>
            <p>
              Most existing resources assume in-house product teams. Service design consultants face client data rules,
              procurement delays, compliance environments, and fixed-bid billing constraints that existing wikis completely ignore.
            </p>
            <p>
              UXwithAIway closes this gap with opinionated, workflow-grounded guidance. We move beyond vendor marketing
              and academic theory, providing insights written by invite-only practitioners and structured around the actual shape of a UX project.
            </p>
          </div>
        </div>

        <!-- ── What Makes Us Different ── -->
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

        <!-- ══════════════════════════════════════════════════
             CONTRIBUTORS (big section)
        ══════════════════════════════════════════════════ -->
        <div id="contributors" class="about-section contributors-section">
          <div class="section-eyebrow">Join the Community</div>
          <h2 class="about-heading contributors-heading">Contributor Hub</h2>
          <p class="contributors-intro">
            Invite-only practitioner contributors ensure the platform stays authoritative, honest, and vendor-free.
            Every article is written by active UX designers. We do not allow vendor-influenced content or marketing language.
          </p>

          <!-- How It Works -->
          <h3 class="sub-heading">How It Works</h3>
          <div class="steps-grid">
            @for (s of howItWorks; track s.step) {
              <div class="card step-card">
                <span class="step-icon">{{ s.icon }}</span>
                <span class="step-num">Step {{ s.step }}</span>
                <h4 class="step-title">{{ s.title }}</h4>
                <p class="step-desc">{{ s.desc }}</p>
              </div>
            }
          </div>

          <!-- Selection Criteria + Editorial Voice side by side -->
          <div class="contrib-columns">
            <div class="contrib-col">
              <h3 class="sub-heading">Selection Criteria</h3>
              <div class="card criteria-card">
                <ul class="criteria-list">
                  @for (c of criteria; track c) {
                    <li class="criteria-item">
                      <span class="check-circle">&#10003;</span>
                      {{ c }}
                    </li>
                  }
                </ul>
              </div>
            </div>

            <div class="contrib-col">
              <h3 class="sub-heading">Editorial Voice</h3>
              <div class="voice-grid">
                @for (v of voiceCards; track v.label) {
                  <div class="card voice-card">
                    <h4 class="voice-label">{{ v.label }}</h4>
                    <p class="voice-desc">{{ v.desc }}</p>
                  </div>
                }
              </div>
            </div>
          </div>

          <!-- Apply CTA -->
          <div class="contrib-cta">
            <div class="contrib-cta-text">
              <h3 class="contrib-cta-title">Ready to Contribute?</h3>
              <p class="contrib-cta-desc">
                We're looking for practitioners who can share honest, workflow-grounded AI + UX knowledge.
              </p>
            </div>
            <a routerLink="/auth/login" class="btn-primary contrib-cta-btn">Apply to Contribute &rarr;</a>
          </div>
        </div>

        <!-- ── Roadmap ── -->
        <div id="roadmap" class="about-section">
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

        <!-- ── CTA ── -->
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

    /* ── Hero ── */
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
      color: rgba(255,255,255,0.85);
      max-width: 600px;
      margin: 0 auto 28px;
      line-height: 1.7;
    }

    .hero-anchors {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero-anchor {
      padding: 8px 20px;
      border-radius: var(--radius-full);
      background: rgba(255,255,255,0.15);
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      text-decoration: none;
      border: 1px solid rgba(255,255,255,0.3);
      transition: background 0.2s ease;

      &:hover { background: rgba(255,255,255,0.25); }
    }

    /* ── Body ── */
    .about-body { background: var(--bg-primary); }
    .about-container { max-width: 940px; }
    .about-section { margin-bottom: 72px; }

    .about-heading {
      font-size: 1.6rem;
      font-family: var(--font-heading);
      margin-bottom: 24px;
      color: var(--text-primary);
    }

    /* ── Mission ── */
    .mission-text {
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.8;

      p { margin: 0 0 16px; &:last-child { margin-bottom: 0; } }
    }

    /* ── Differentiators ── */
    .diff-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .diff-card { padding: 28px; }
    .diff-icon { font-size: 2rem; display: block; margin-bottom: 12px; }

    .diff-title {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 8px;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .diff-desc { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; margin: 0; }

    /* ════════════════════════════════════════
       CONTRIBUTOR HUB SECTION
    ════════════════════════════════════════ */
    .section-eyebrow {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--accent-primary);
      margin-bottom: 8px;
    }

    .contributors-section {
      border-top: 2px solid var(--border-color);
      padding-top: 60px;
      margin-top: 20px;
    }

    .contributors-heading { font-size: 2rem; margin-bottom: 16px; }

    .contributors-intro {
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.7;
      max-width: 680px;
      margin-bottom: 40px;
    }

    .sub-heading {
      font-size: 1.15rem;
      font-family: var(--font-heading);
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 20px;
      margin-top: 40px;
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
      gap: 20px;
    }

    .step-card { padding: 28px; text-align: center; }
    .step-icon { font-size: 2rem; display: block; margin-bottom: 12px; }

    .step-num {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent-primary);
      display: block;
      margin-bottom: 8px;
    }

    .step-title {
      font-size: 1.02rem;
      font-weight: 700;
      margin-bottom: 8px;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .step-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }

    .contrib-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }

    .criteria-card { padding: 28px; }
    .criteria-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 14px; }

    .criteria-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 0.92rem;
      color: var(--text-primary);
      line-height: 1.6;
    }

    .check-circle {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(16,185,129,0.1);
      color: var(--success);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      margin-top: 2px;
    }

    .voice-grid { display: flex; flex-direction: column; gap: 12px; }
    .voice-card { padding: 18px 20px; }

    .voice-label {
      font-size: 0.92rem;
      font-weight: 700;
      margin-bottom: 5px;
      font-family: var(--font-heading);
      color: var(--accent-primary);
    }

    .voice-desc { font-size: 0.84rem; color: var(--text-secondary); line-height: 1.6; margin: 0; }

    .contrib-cta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
      padding: 36px 40px;
      margin-top: 40px;
      background: var(--accent-gradient);
      border-radius: var(--radius-xl);
      flex-wrap: wrap;
    }

    .contrib-cta-title {
      font-size: 1.3rem;
      font-family: var(--font-heading);
      font-weight: 800;
      color: #fff;
      margin-bottom: 6px;
    }

    .contrib-cta-desc {
      font-size: 0.9rem;
      color: rgba(255,255,255,0.82);
      margin: 0;
      max-width: 460px;
      line-height: 1.6;
    }

    .contrib-cta-btn {
      background: #fff;
      color: var(--accent-primary) !important;
      white-space: nowrap;
      text-decoration: none;
      font-weight: 700;
      flex-shrink: 0;
    }

    /* ── Roadmap ── */
    .roadmap-list { display: flex; flex-direction: column; gap: 16px; }
    .roadmap-card { padding: 24px; }

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

      &.current { background: rgba(16,185,129,0.1); color: var(--success); }
      &.planned  { background: rgba(59,130,246,0.1);  color: var(--info); }
      &.future   { background: rgba(107,111,148,0.1); color: var(--text-tertiary); }
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

    .roadmap-dot { color: var(--text-tertiary); &.active { color: var(--success); } }

    /* ── CTA ── */
    .cta-box {
      text-align: center;
      padding: 48px 32px;
      background: var(--bg-secondary);
      border-radius: var(--radius-xl);
      border: 1px solid var(--border-color);
    }

    .cta-title { font-size: 1.5rem; font-family: var(--font-heading); margin-bottom: 12px; color: var(--text-primary); }
    .cta-desc { font-size: 0.95rem; color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px; }
    .cta-actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .contrib-columns { grid-template-columns: 1fr; }
      .contrib-cta { flex-direction: column; text-align: center; }
      .hero-anchors { gap: 8px; }
    }
  `],
})
export class AboutComponent {
  readonly differentiators = [
    { icon: '\uD83C\uDFAF', title: 'Strategy Builder', desc: 'The only tool that takes your project context, including type, contract, timeline, team, and design system, to output a tailored AI workflow.' },
    { icon: '\u270D\uFE0F', title: 'Practitioner-Written', desc: 'Every article is written by active UX designers with real industry experience. We provide honest perspectives without vendor influence or marketing speak.' },
    { icon: '\uD83C\uDD93', title: 'Free Forever', desc: 'The core platform is free. We have no paywalls and no premium tiers for essential content. This is built as a public resource for the design community.' },
    { icon: '\uD83D\uDD0D', title: 'Honest Assessments', desc: 'We name real tools with honest reviews including limitations. We discuss hallucination, overconfidence, and failure modes directly.' },
  ];

  readonly howItWorks = [
    { step: '01', title: 'Application',  desc: 'Submit your application with portfolio, industry experience, and area of expertise.',         icon: '\uD83D\uDCDD' },
    { step: '02', title: 'Review',       desc: 'Our editorial team reviews your credentials and experience within 5 working days.',          icon: '\uD83D\uDD0D' },
    { step: '03', title: 'Onboarding',   desc: 'Access the style guide, content templates, and editorial standards documentation.',         icon: '\uD83D\uDCD6' },
    { step: '04', title: 'Publish',      desc: 'Submit articles for one round of editorial review. Published with your byline and profile.', icon: '\uD83D\uDE80' },
  ];

  readonly criteria = [
    'Active UX practitioner with minimum 3 years experience',
    'Demonstrable industry experience (portfolio, published writing, or specific projects)',
    'No vendor affiliation conflicts. We provide independent and honest perspectives only.',
    'Agreement with editorial voice guidelines. Our content is practitioner-first, opinionated, and free of marketing language.',
  ];

  readonly voiceCards = [
    { label: 'Practitioner-first',        desc: 'Sounds like a senior designer talking to peers. Not academic, not corporate.' },
    { label: 'Opinionated',               desc: 'Takes positions on what works and what doesn\'t. No false balance.' },
    { label: 'Tool-specific',             desc: 'Names real tools with honest assessments including limitations.' },
    { label: 'Honest about failure modes', desc: 'Hallucination, overconfidence, and premature convergence are discussed directly.' },
  ];

  readonly roadmapPhases = [
    {
      phase: 'Phase 1: Foundation',
      status: 'Current',
      items: ['CMS and Frontend setup', 'Sections 01 to 05 content', 'Strategy Builder v1', 'Tool Directory (20+ tools)', 'Glossary (30 terms)', 'Contributor Hub'],
    },
    {
      phase: 'Phase 2: Depth',
      status: 'Planned',
      items: ['Sections 06 to 08 content', 'All downloadable templates', 'Interactive calculators', 'Prompt Builder tool', 'Tool Directory (60+ tools)', 'Video production'],
    },
    {
      phase: 'Phase 3: Intelligence',
      status: 'Future',
      items: ['Claude API integration', 'Semantic search', 'Newsletter and community', 'Analytics dashboard', 'Premium layer option'],
    },
  ];
}
