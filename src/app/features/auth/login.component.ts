import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="login-section">
      <div class="container">
        <div class="login-card card">
          <div class="login-header">
            <div class="logo-icon">UX</div>
            <h1>Sign in to <span class="logo-text">UXwithAIway</span></h1>
            <p>Access your personalized UX workflow strategies</p>
          </div>

          @if (error()) {
            <div class="error-message">{{ error() }}</div>
          }

          <div class="social-buttons">
            <button class="social-btn google" (click)="signInWithGoogle()" [disabled]="loading()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button class="social-btn github" (click)="signInWithGithub()" [disabled]="loading()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>

            <button class="social-btn microsoft" (click)="signInWithMicrosoft()" [disabled]="loading()">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
                <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
                <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
                <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
              </svg>
              Continue with Microsoft
            </button>
          </div>

          <p class="login-footer">Free platform - sign in to save your strategies</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .login-section {
      min-height: calc(100vh - var(--header-height) - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      background: var(--bg-primary);
    }

    .login-card {
      max-width: 440px;
      width: 100%;
      margin: 0 auto;
      padding: 48px 36px;
    }

    .login-header {
      text-align: center;
      margin-bottom: 32px;

      .logo-icon {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        background: var(--accent-gradient);
        color: #fff;
        font-weight: 800;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
        font-family: var(--font-heading);
      }

      h1 {
        font-size: 1.4rem;
        font-family: var(--font-heading);
        margin-bottom: 8px;
        color: var(--text-primary);
        
        .logo-text {
          background: linear-gradient(135deg, #FF41F8, #7702FF, #FF8008);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      p {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin: 0;
      }
    }

    .error-message {
      background: rgba(239, 68, 68, 0.1);
      color: var(--danger);
      padding: 12px 16px;
      border-radius: var(--radius-md);
      font-size: 0.85rem;
      margin-bottom: 20px;
      text-align: center;
    }

    .social-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }

    .social-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: 100%;
      padding: 14px 20px;
      border-radius: var(--radius-md);
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid var(--border-color);
      transition: all 0.2s ease;

      svg {
        flex-shrink: 0;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: var(--shadow-md);
      }
    }

    .social-btn.google {
      background: #ffffff;
      color: #3c4043;
      border: 1px solid #dadce0;

      &:hover:not(:disabled) {
        background: #f8f9fa;
      }
    }

    .social-btn.github {
      background: #24292e;
      color: #ffffff;
      border-color: #24292e;

      &:hover:not(:disabled) {
        background: #2f363d;
      }
    }

    .social-btn.microsoft {
      background: #2f2f2f;
      color: #ffffff;
      border-color: #2f2f2f;

      &:hover:not(:disabled) {
        background: #3b3b3b;
      }
    }

    .login-footer {
      text-align: center;
      font-size: 0.8rem;
      color: var(--text-tertiary);
      margin: 0;
    }
  `],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly error = signal('');
  readonly loading = signal(false);

  async signInWithGoogle(): Promise<void> {
    await this.signIn(() => this.authService.signInWithGoogle());
  }

  async signInWithGithub(): Promise<void> {
    await this.signIn(() => this.authService.signInWithGithub());
  }

  async signInWithMicrosoft(): Promise<void> {
    await this.signIn(() => this.authService.signInWithMicrosoft());
  }

  private async signIn(providerFn: () => Promise<void>): Promise<void> {
    this.loading.set(true);
    this.error.set('');
    try {
      await providerFn();
      this.router.navigate(['/']);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Sign in failed. Please try again.';
      this.error.set(msg);
    } finally {
      this.loading.set(false);
    }
  }
}
