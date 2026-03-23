import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-wiki-list',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Header -->
    <section class="wiki-header">
      <div class="container wiki-header-content">
        <span class="section-label">Knowledge Wiki</span>
        <h1 class="section-title">Practitioner-Authored UX + AI Guides</h1>
        <p class="section-subtitle">
          Opinionated, workflow-grounded content, each section with AI tools, templates, and honest assessments.
        </p>

      </div>
    </section>

    <!-- Grid -->
    <section class="section-padding wiki-grid-section">
      <div class="container">
        <div class="wiki-grid">
          @for (s of sections; track s.id) {
            <a [routerLink]="['/wiki', s.slug]" class="wiki-card-link">
              <div class="card wiki-card">
                <div class="wiki-card-top">
                  <div class="wiki-card-meta">
                    <span class="wiki-icon">{{ s.icon }}</span>
                    <span class="wiki-badge" [style.color]="s.color" [style.background]="s.color + '22'" [style.border]="'1px solid ' + s.color + '55'">
                      Section {{ s.id }}
                    </span>
                  </div>
                  <span class="wiki-arrow">&rarr;</span>
                </div>

                <h3 class="wiki-card-title">{{ s.title }}</h3>
                <p class="wiki-card-desc">{{ s.description }}</p>

                <div class="skill-badges">
                  @for (l of s.skillLevels; track l) {
                    <span class="skill-badge" [class.junior]="l === 'junior'" [class.mid]="l === 'mid'" [class.senior]="l === 'senior'">
                      {{ l }}
                    </span>
                  }
                </div>
              </div>
            </a>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .wiki-header {
      padding: 48px 24px 32px;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .wiki-header-content {
      text-align: center;
    }

    .section-subtitle {
      margin: 0 auto 32px;
    }

    .wiki-grid-section {
      background: var(--bg-primary);
    }

    .wiki-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 24px;
    }

    .wiki-card-link {
      text-decoration: none;
    }

    .wiki-card {
      padding: 28px;
      height: 100%;
    }

    .wiki-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    .wiki-card-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .wiki-icon {
      font-size: 2rem;
    }

    .wiki-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      /* border is applied inline via [style.border] for per-color theming */
    }

    .wiki-arrow {
      color: var(--accent-primary);
      font-size: 1.2rem;
    }

    .wiki-card-title {
      font-size: 1.15rem;
      font-weight: 700;
      margin-bottom: 10px;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .wiki-card-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 16px;
    }

    .skill-badges {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .skill-badge {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      text-transform: capitalize;
    }

    .skill-badge.junior {
      background: rgba(16, 185, 129, 0.12);
      color: var(--success);
      border: 1px solid rgba(16, 185, 129, 0.25);
    }

    .skill-badge.mid {
      background: rgba(59, 130, 246, 0.12);
      color: var(--info);
      border: 1px solid rgba(59, 130, 246, 0.25);
    }

    .skill-badge.senior {
      background: rgba(139, 92, 246, 0.12);
      color: #7c3aed;
      border: 1px solid rgba(139, 92, 246, 0.28);
    }

    :host-context([data-theme="dark"]) .skill-badge.junior {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border-color: rgba(16, 185, 129, 0.3);
    }

    :host-context([data-theme="dark"]) .skill-badge.mid {
      background: rgba(59, 130, 246, 0.15);
      color: #60a5fa;
      border-color: rgba(59, 130, 246, 0.3);
    }

    :host-context([data-theme="dark"]) .skill-badge.senior {
      background: rgba(139, 92, 246, 0.18);
      color: #c4b5fd;
      border-color: rgba(139, 92, 246, 0.35);
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: var(--text-tertiary);
    }

    .empty-state p {
      font-size: 1.1rem;
    }
  `],
})
export class WikiListComponent {
  private readonly content = inject(ContentService);

  readonly sections = this.content.getWikiSections();
}
