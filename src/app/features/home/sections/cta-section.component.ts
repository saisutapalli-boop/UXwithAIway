import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

@Component({
  selector: 'app-cta-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="newsletter-section">
      <div class="container newsletter-inner">

        <!-- Left: About the platform -->
        <div class="newsletter-about">
          <span class="section-label light">Free Platform</span>
          <h2 class="newsletter-heading">The UX + AI knowledge hub built by practitioners, for practitioners.</h2>
          <p class="newsletter-desc">
            UXwithAIway is a free, practitioner-first platform covering AI-assisted UX workflows,
            curated tools with honest ratings, and research-backed guides for every skill level and project type.
            No vendor influence. No paywalls. Just what works.
          </p>
          <ul class="platform-highlights">
            <li>
              <span class="highlight-icon">&#127919;</span>
              Strategy Builder with tailored AI workflow outputs
            </li>
            <li>
              <span class="highlight-icon">&#128214;</span>
              12-section knowledge wiki with embedded video guides
            </li>
            <li>
              <span class="highlight-icon">&#128736;</span>
              51+ curated AI tools with freemium flags and client-safety ratings
            </li>
            <li>
              <span class="highlight-icon">&#9889;</span>
              Free forever - no paywall, no vendor influence
            </li>
          </ul>
        </div>

        <!-- Right: Newsletter signup -->
        <div class="newsletter-form-col">
          @if (!submitted()) {
            <div class="newsletter-card card">
              <h3 class="form-heading">Stay ahead in UX + AI</h3>
              <p class="form-subtext">
                Get notified when new guides, tools, workflows, and wiki sections are added.
              </p>

              <form class="subscribe-form" (submit)="subscribe($event)">
                <input
                  type="email"
                  class="email-input"
                  [value]="email()"
                  (input)="email.set($any($event.target).value)"
                  placeholder="your@email.com"
                  autocomplete="email"
                />
                @if (error()) {
                  <span class="form-error">{{ error() }}</span>
                }
                <button type="submit" class="subscribe-btn" [disabled]="!email()">
                  Subscribe - it's free
                </button>
              </form>

              <p class="form-note">No spam. Unsubscribe any time. We respect your inbox.</p>
            </div>
          } @else {
            <div class="success-card card">
              <div class="success-icon">&#10003;</div>
              <h3 class="success-heading">You're in!</h3>
              <p class="success-text">Thanks for subscribing. We will let you know when new content drops.</p>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .newsletter-section {
      padding: 80px 24px;
      background: var(--bg-secondary);
      border-top: 1px solid var(--border-color);
    }

    .newsletter-inner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 64px;
      align-items: center;
      max-width: 1100px;
      margin: 0 auto;
    }

    /* About column */
    .newsletter-about {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .section-label.light {
      color: var(--accent-primary);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .newsletter-heading {
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 800;
      font-family: var(--font-heading);
      color: var(--text-primary);
      line-height: 1.3;
      margin: 0;
    }

    .newsletter-desc {
      font-size: 0.95rem;
      color: var(--text-secondary);
      line-height: 1.75;
      margin: 0;
    }

    .platform-highlights {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;

      li {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.9rem;
        color: var(--text-secondary);
      }
    }

    .highlight-icon {
      font-size: 1rem;
      flex-shrink: 0;
    }

    /* Form column */
    .newsletter-form-col {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .newsletter-card {
      width: 100%;
      max-width: 420px;
      padding: 36px 32px;
    }

    .form-heading {
      font-size: 1.25rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .form-subtext {
      font-size: 0.875rem;
      color: var(--text-secondary);
      margin-bottom: 24px;
      line-height: 1.6;
    }

    .subscribe-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .email-input {
      width: 100%;
      padding: 14px 16px;
      border-radius: var(--radius-md);
      border: 2px solid var(--border-color);
      background: var(--bg-primary);
      color: var(--text-primary);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
      font-family: var(--font-sans);

      &:focus {
        border-color: var(--accent-primary);
      }

      &::placeholder {
        color: var(--text-tertiary);
      }
    }

    .form-error {
      font-size: 0.8rem;
      color: var(--danger);
    }

    .subscribe-btn {
      width: 100%;
      padding: 14px 20px;
      border-radius: var(--radius-md);
      border: none;
      background: var(--accent-gradient);
      color: #fff;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: var(--font-heading);
      letter-spacing: 0.01em;

      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .form-note {
      font-size: 0.75rem;
      color: var(--text-tertiary);
      margin: 8px 0 0;
      text-align: center;
    }

    /* Success state */
    .success-card {
      width: 100%;
      max-width: 420px;
      padding: 48px 32px;
      text-align: center;
    }

    .success-icon {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(16, 185, 129, 0.12);
      color: var(--success);
      font-size: 1.5rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      border: 2px solid rgba(16, 185, 129, 0.25);
    }

    .success-heading {
      font-size: 1.25rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
      margin-bottom: 10px;
    }

    .success-text {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin: 0;
    }

    @media (max-width: 768px) {
      .newsletter-inner {
        grid-template-columns: 1fr;
        gap: 40px;
      }

      .newsletter-form-col {
        justify-content: flex-start;
      }

      .newsletter-card,
      .success-card {
        max-width: 100%;
      }
    }
  `],
})
export class CtaSectionComponent {
  readonly email = signal('');
  readonly submitted = signal(false);
  readonly error = signal('');

  subscribe(event: Event): void {
    event.preventDefault();
    const val = this.email().trim();
    if (!val || !val.includes('@') || !val.includes('.')) {
      this.error.set('Please enter a valid email address.');
      return;
    }
    this.error.set('');
    this.submitted.set(true);
  }
}
