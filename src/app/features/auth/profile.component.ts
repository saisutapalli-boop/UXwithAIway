import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="profile-section">
      <div class="container">
        @if (authService.user(); as user) {
          <div class="profile-card card">
            <div class="profile-header">
              @if (user.photoURL) {
                <img [src]="user.photoURL" [alt]="user.displayName || 'User'" class="avatar" />
              } @else {
                <div class="avatar-placeholder">
                  {{ (user.displayName || user.email || 'U').charAt(0).toUpperCase() }}
                </div>
              }
              <h1 class="profile-name">{{ user.displayName || 'User' }}</h1>
              <p class="profile-email">{{ user.email }}</p>
            </div>

            <div class="profile-details">
              <div class="detail-row">
                <span class="detail-label">Provider</span>
                <span class="detail-value provider-badge">{{ user.provider }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">User ID</span>
                <span class="detail-value uid">{{ user.uid }}</span>
              </div>
            </div>

            <button class="btn-secondary signout-btn" (click)="signOut()">Sign Out</button>
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .profile-section {
      min-height: calc(100vh - var(--header-height) - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      background: var(--bg-primary);
    }

    .profile-card {
      max-width: 480px;
      width: 100%;
      margin: 0 auto;
      padding: 48px 36px;
    }

    .profile-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 16px;
      border: 3px solid var(--accent-primary);
    }

    .avatar-placeholder {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: var(--accent-gradient);
      color: #fff;
      font-size: 2rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-family: var(--font-heading);
    }

    .profile-name {
      font-size: 1.5rem;
      font-family: var(--font-heading);
      margin-bottom: 4px;
      color: var(--text-primary);
    }

    .profile-email {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin: 0;
    }

    .profile-details {
      border-top: 1px solid var(--border-color);
      padding-top: 24px;
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .detail-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-tertiary);
    }

    .detail-value {
      font-size: 0.85rem;
      color: var(--text-primary);
    }

    .provider-badge {
      background: rgba(177, 0, 14, 0.08);
      color: var(--accent-primary);
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-weight: 600;
      font-size: 0.8rem;
      text-transform: capitalize;
    }

    .uid {
      font-family: monospace;
      font-size: 0.75rem;
      color: var(--text-tertiary);
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .signout-btn {
      width: 100%;
      justify-content: center;
    }
  `],
})
export class ProfileComponent {
  readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  constructor() {
    effect(() => {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/auth/login']);
      }
    });
  }

  async signOut(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
