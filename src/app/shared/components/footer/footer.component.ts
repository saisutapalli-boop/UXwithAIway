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
              <div class="logo-icon">UX</div>
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
        { label: 'Contributor Hub', href: '/contributor-hub' },
        { label: 'About', href: '/about' },
        { label: 'GitHub', href: 'https://github.com/UXwithAIway', external: true },
        { label: 'Discord', href: 'https://discord.gg/UXwithAIway', external: true },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/wiki' },
        { label: 'Blog', href: '/blog' },
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
      ],
    },
  ];
}
