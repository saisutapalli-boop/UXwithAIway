import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../core/services/content.service';

@Component({
  selector: 'app-wiki-preview-section',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section-padding wiki-preview-section">
      <div class="container wiki-preview-content">
        <span class="section-label">Knowledge Wiki</span>
        <h2 class="section-title">8 Sections Covering Every UX Phase</h2>
        <p class="section-subtitle">
          Practitioner-authored, opinionated, workflow-grounded - each with AI tools, templates, and video guides.
        </p>

        <div class="wiki-grid">
          @for (section of wikiSections; track section.id) {
            <a [routerLink]="['/wiki', section.slug]" class="wiki-card-link">
              <div class="card wiki-card">
                <div class="wiki-card-header">
                  <span class="wiki-icon">{{ section.icon }}</span>
                  <span class="wiki-badge" [style.color]="section.color" [style.background]="section.color + '15'">
                    {{ section.id }}
                  </span>
                </div>
                <h3 class="wiki-card-title">{{ section.title }}</h3>
                <p class="wiki-card-desc">{{ section.description }}</p>
              </div>
            </a>
          }
        </div>

        <a routerLink="/wiki" class="btn-primary wiki-cta">Explore Full Wiki &rarr;</a>
      </div>
    </section>
  `,
  styles: [`
    .wiki-preview-section {
      background: var(--bg-primary);
    }

    .wiki-preview-content {
      text-align: center;
    }

    .section-subtitle {
      margin: 0 auto 48px;
    }

    .wiki-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
    }

    .wiki-card-link {
      text-decoration: none;
    }

    .wiki-card {
      padding: 24px;
      text-align: left;
      height: 100%;
    }

    .wiki-card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .wiki-icon {
      font-size: 1.5rem;
    }

    .wiki-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: var(--radius-full);
    }

    .wiki-card-title {
      font-size: 1.05rem;
      font-weight: 700;
      margin-bottom: 8px;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .wiki-card-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .wiki-cta {
      margin-top: 40px;
      display: inline-flex;
    }
  `],
})
export class WikiPreviewSectionComponent {
  private readonly content = inject(ContentService);

  readonly wikiSections = this.content.getWikiSections();
}
