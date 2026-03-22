import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (authService.user(); as user) {
      <div class="auth-wrapper">
        <button class="avatar-btn" (click)="dropdownOpen.set(!dropdownOpen())">
          @if (user.photoURL) {
            <img [src]="user.photoURL" [alt]="user.displayName || 'User'" class="avatar-img" />
          } @else {
            <span class="avatar-letter">{{ (user.displayName || user.email || 'U')!.charAt(0).toUpperCase() }}</span>
          }
        </button>
        @if (dropdownOpen()) {
          <div class="dropdown">
            <a routerLink="/auth/profile" class="dropdown-item" (click)="dropdownOpen.set(false)">Profile</a>
            <button class="dropdown-item" (click)="onSignOut()">Sign Out</button>
          </div>
        }
      </div>
    } @else {
      <a routerLink="/auth/login" class="sign-in-btn">Sign In</a>
    }
  `,
  styleUrl: './auth-button.component.scss',
})
export class AuthButtonComponent {
  readonly authService = inject(AuthService);
  readonly dropdownOpen = signal(false);

  onSignOut(): void {
    this.dropdownOpen.set(false);
    this.authService.logout();
  }
}
