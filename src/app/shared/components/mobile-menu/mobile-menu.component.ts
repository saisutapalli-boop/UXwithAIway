import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen) {
      <div class="backdrop" (click)="close()"></div>
      <nav class="mobile-menu" [class.open]="isOpen">
        <div class="menu-header">
          <a routerLink="/" class="logo" (click)="close()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" width="32" height="32" aria-hidden="true" class="logo-icon">
              <rect width="40" height="40" rx="9" fill="#b1000e"/>
              <path d="M9 9 L9 22 Q9 32 20 32 Q31 32 31 22 L31 9" stroke="white" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="14.5" y1="18.5" x2="25.5" y2="18.5" stroke="rgba(255,255,255,0.55)" stroke-width="1.4" stroke-linecap="round"/>
              <line x1="14.5" y1="18.5" x2="20" y2="26.5" stroke="rgba(255,255,255,0.55)" stroke-width="1.4" stroke-linecap="round"/>
              <line x1="25.5" y1="18.5" x2="20" y2="26.5" stroke="rgba(255,255,255,0.55)" stroke-width="1.4" stroke-linecap="round"/>
              <circle cx="14.5" cy="18.5" r="2.3" fill="white"/>
              <circle cx="25.5" cy="18.5" r="2.3" fill="white"/>
              <circle cx="20" cy="26.5" r="2.3" fill="white"/>
            </svg>
            <span class="logo-text">UXwithAIway</span>
          </a>
          <button class="close-btn" (click)="close()" aria-label="Close menu">
            <lucide-icon name="x"></lucide-icon>
          </button>
        </div>
        <div class="menu-links">
          @for (link of links; track link.href) {
            <a
              [routerLink]="link.href"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: link.href === '/' }"
              class="menu-link"
              (click)="close()"
            >{{ link.label }}</a>
          }
        </div>

        <div class="menu-auth">
          @if (authService.user(); as user) {
            <div class="menu-user">
              @if (user.photoURL) {
                <img [src]="user.photoURL" [alt]="user.displayName || 'User'" class="menu-avatar-img" />
              } @else {
                <span class="menu-avatar-letter">{{ (user.displayName || user.email || 'U')!.charAt(0).toUpperCase() }}</span>
              }
              <div class="menu-user-info">
                <span class="menu-user-name">{{ user.displayName || 'My Account' }}</span>
                <span class="menu-user-email">{{ user.email }}</span>
              </div>
            </div>
            <a routerLink="/auth/profile" class="menu-link" (click)="close()">Profile</a>
            <button class="menu-link menu-signout-btn" (click)="onSignOut()">Sign Out</button>
          } @else {
            <a routerLink="/auth/login" class="menu-signin-btn" (click)="close()">Sign In</a>
          }
        </div>
      </nav>
    }
  `,
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  readonly authService = inject(AuthService);

  @Input() isOpen = false;
  @Input() links: { href: string; label: string }[] = [];
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }

  onSignOut(): void {
    this.authService.logout();
    this.close();
  }
}
