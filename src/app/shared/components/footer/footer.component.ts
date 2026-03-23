import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-grid">
          <!-- Brand column -->
          <div class="footer-brand">
            <a routerLink="/" class="footer-logo">
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
            <p class="footer-tagline">
              Empowering designers and product teams to harness AI
              for better user experiences.
            </p>
          </div>

          <!-- Link columns -->
          @for (column of columns; track column.title) {
            <div class="footer-column">
              <h4 class="footer-column-title">{{ column.title }}</h4>
              <ul class="footer-links">
                @for (link of column.links; track link.href) {
                  <li>
                    @if (link.external) {
                      <a [href]="link.href" target="_blank" rel="noopener noreferrer" class="footer-link">
                        {{ link.label }}
                      </a>
                    } @else {
                      <a [routerLink]="link.href" class="footer-link">
                        {{ link.label }}
                      </a>
                    }
                  </li>
                }
              </ul>
            </div>
          }
        </div>

        <div class="footer-bottom">
          <p class="copyright">&copy; {{ currentYear }} UXwithAIway. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();

  readonly columns: FooterColumn[] = [
    {
      title: 'Platform',
      links: [
        { label: 'Strategy Builder', href: '/strategy-builder' },
        { label: 'Wiki', href: '/wiki' },
        { label: 'Tools', href: '/tools' },
        { label: 'Glossary', href: '/glossary' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'About & Contribute', href: '/about' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Our Approach', href: '/approach' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];
}
