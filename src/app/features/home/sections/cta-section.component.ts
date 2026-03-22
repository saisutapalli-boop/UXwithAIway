import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta-section">
      <div class="container">
        <h2 class="cta-heading">Ready to Transform Your UX Workflow?</h2>
        <p class="cta-subtitle">
          Start with the Strategy Builder - input your project context and get a tailored AI workflow in minutes.
        </p>
        <a routerLink="/strategy-builder" class="btn-primary cta-btn">
          Launch Strategy Builder
        </a>
      </div>
    </section>
  `,
  styles: [`
    .cta-section {
      padding: 80px 24px;
      background: var(--accent-gradient);
      text-align: center;
    }

    .cta-heading {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-weight: 800;
      color: #fff;
      max-width: 600px;
      margin: 0 auto 16px;
      font-family: var(--font-heading);
    }

    .cta-subtitle {
      font-size: 1.05rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 500px;
      margin: 0 auto 32px;
    }

    .cta-btn {
      background: #fff !important;
      color: #4f46e5 !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
  `],
})
export class CtaSectionComponent {}
