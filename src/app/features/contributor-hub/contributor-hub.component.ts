import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contributor-hub',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Header -->
    <section class="hub-header">
      <div class="container text-center">
        <span class="section-label">Join the Community</span>
        <h1 class="section-title">Contributor Hub</h1>
        <p class="section-subtitle centered">
          Invite-only practitioner contributors ensure the platform stays authoritative, honest, and vendor-free.
        </p>
      </div>
    </section>

    <section class="section-padding hub-body">
      <div class="container hub-container">

        <!-- How It Works -->
        <div class="hub-section">
          <h2 class="hub-heading">How It Works</h2>
          <div class="steps-grid">
            @for (s of howItWorks; track s.step) {
              <div class="card step-card">
                <span class="step-icon">{{ s.icon }}</span>
                <span class="step-num">Step {{ s.step }}</span>
                <h3 class="step-title">{{ s.title }}</h3>
                <p class="step-desc">{{ s.desc }}</p>
              </div>
            }
          </div>
        </div>

        <!-- Selection Criteria -->
        <div class="hub-section">
          <h2 class="hub-heading">Selection Criteria</h2>
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

        <!-- Editorial Voice -->
        <div class="hub-section">
          <h2 class="hub-heading">Editorial Voice</h2>
          <div class="voice-grid">
            @for (v of voiceCards; track v.label) {
              <div class="card voice-card">
                <h4 class="voice-label">{{ v.label }}</h4>
                <p class="voice-desc">{{ v.desc }}</p>
              </div>
            }
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-box">
          <h2 class="cta-title">Ready to Contribute?</h2>
          <p class="cta-desc">
            We're looking for practitioners who can share honest, workflow-grounded AI + UX knowledge.
          </p>
          <a routerLink="/about" class="btn-primary">Apply to Contribute &rarr;</a>
        </div>

      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .text-center { text-align: center; }
    .centered { margin: 0 auto; }

    .hub-header {
      padding: 48px 24px 40px;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .hub-body {
      background: var(--bg-primary);
    }

    .hub-container {
      max-width: 900px;
    }

    .hub-section {
      margin-bottom: 60px;
    }

    .hub-heading {
      font-size: 1.5rem;
      font-family: var(--font-heading);
      margin-bottom: 24px;
      color: var(--text-primary);
    }

    /* Steps grid */
    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
    }

    .step-card {
      padding: 28px;
      text-align: center;
    }

    .step-icon {
      font-size: 2rem;
      display: block;
      margin-bottom: 12px;
    }

    .step-num {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--accent-primary);
      display: block;
      margin-bottom: 8px;
    }

    .step-title {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 8px;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .step-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
    }

    /* Criteria */
    .criteria-card {
      padding: 28px;
    }

    .criteria-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .criteria-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 0.95rem;
      color: var(--text-primary);
      line-height: 1.6;
    }

    .check-circle {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.1);
      color: var(--success);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      margin-top: 2px;
    }

    /* Voice */
    .voice-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }

    .voice-card {
      padding: 20px;
    }

    .voice-label {
      font-size: 0.95rem;
      font-weight: 700;
      margin-bottom: 6px;
      font-family: var(--font-heading);
      color: var(--accent-primary);
    }

    .voice-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
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
  `],
})
export class ContributorHubComponent {
  readonly howItWorks = [
    { step: '01', title: 'Application', desc: 'Submit your application with portfolio, industry experience, and area of expertise.', icon: '\uD83D\uDCDD' },
    { step: '02', title: 'Review', desc: 'Our editorial team reviews your credentials and experience within 5 working days.', icon: '\uD83D\uDD0D' },
    { step: '03', title: 'Onboarding', desc: 'Access the style guide, content templates, and editorial standards documentation.', icon: '\uD83D\uDCD6' },
    { step: '04', title: 'Publish', desc: 'Submit articles for one round of editorial review. Published with your byline and profile.', icon: '\uD83D\uDE80' },
  ];

  readonly criteria = [
    'Active UX practitioner with minimum 3 years experience',
    'Demonstrable industry experience (portfolio, published writing, or specific projects)',
    'No vendor affiliation conflicts - independent, honest perspectives only',
    'Agreement with editorial voice guidelines - practitioner-first, opinionated, no marketing language',
  ];

  readonly voiceCards = [
    { label: 'Practitioner-first', desc: 'Sounds like a senior designer talking to peers. Not academic, not corporate.' },
    { label: 'Opinionated', desc: 'Takes positions on what works and what doesn\'t. No false balance.' },
    { label: 'Tool-specific', desc: 'Names real tools with honest assessments including limitations.' },
    { label: 'Honest about failure modes', desc: 'Hallucination, overconfidence, and premature convergence are discussed directly.' },
  ];
}
