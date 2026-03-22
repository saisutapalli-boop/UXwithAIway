import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
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
          <div class="logo-icon">UX</div>
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
    { href: '/', label: 'Home' },
    { href: '/strategy-builder', label: 'Strategy Builder' },
    { href: '/wiki', label: 'Wiki' },
    { href: '/tools', label: 'Tools' },
    { href: '/contributor-hub', label: 'Contributors' },
    { href: '/glossary', label: 'Glossary' },
    { href: '/about', label: 'About' },
  ];
}
