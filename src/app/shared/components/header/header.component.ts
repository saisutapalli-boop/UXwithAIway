import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { AuthButtonComponent } from '../auth-button/auth-button.component';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { AuthService } from '../../../core/services/auth.service';

export interface NavLink {
  href: string;
  label: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    ThemeToggleComponent,
    AuthButtonComponent,
    MobileMenuComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header glass">
      <div class="header-inner">
        <a routerLink="/" class="logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" width="36" height="36" aria-hidden="true" class="logo-icon">
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

        <nav class="desktop-nav">
          @for (link of navLinks; track link.href) {
            <a
              [routerLink]="link.href"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: link.href === '/' }"
              class="nav-link"
            >{{ link.label }}</a>
          }
          @if (isAdmin()) {
            <a
              routerLink="/admin"
              routerLinkActive="active"
              class="nav-link admin-nav-link"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-1px"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Admin
            </a>
          }
        </nav>

        <div class="header-actions">
          <app-theme-toggle />
          <app-auth-button />
          <button
            class="mobile-menu-btn"
            (click)="mobileOpen = true"
            aria-label="Open menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <app-mobile-menu
      [isOpen]="mobileOpen"
      [links]="navLinks"
      (closed)="mobileOpen = false"
    />
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);

  mobileOpen = false;

  readonly navLinks: NavLink[] = [
    { href: '/strategy-builder', label: 'Strategy Builder' },
    { href: '/wiki', label: 'Wiki' },
    { href: '/tools', label: 'Tools' },
    { href: '/about', label: 'About' },
  ];

  readonly isAdmin = computed(() => this.authService.user()?.email === 'sai.sutapalli@globallogic.com');
}
