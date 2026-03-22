import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-tool-detail',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (tool(); as t) {
      <!-- Header -->
      <section class="tool-header">
        <div class="container tool-header-inner">
          <a routerLink="/tools" class="back-link">&larr; Back to Tool Directory</a>

          <div class="tool-title-row">
            <h1 class="tool-title">{{ t.name }}</h1>
            <span class="tool-category-badge">{{ t.category }}</span>
          </div>

          <p class="tool-description">{{ t.description }}</p>
        </div>
      </section>

      <!-- Content -->
      <section class="section-padding tool-content-section">
        <div class="container tool-content-inner">
          <!-- Detail Cards -->
          <div class="detail-cards">
            <div class="card detail-card">
              <div class="detail-label">Pricing</div>
              <div class="detail-value" [class.success]="t.freemium" [class.warning]="!t.freemium">
                @if (t.freemium) {
                  &#10003; Free Tier Available
                } @else {
                  Paid Only
                }
              </div>
            </div>

            <div class="card detail-card">
              <div class="detail-label">Client Data Safety</div>
              <div class="detail-value" [class.success]="t.clientSafe" [class.warning]="!t.clientSafe">
                @if (t.clientSafe) {
                  &#10003; Client-Safe
                } @else {
                  &#9888; Approval Required
                }
              </div>
            </div>

            <div class="card detail-card">
              <div class="detail-label">Approval</div>
              <div class="detail-value" [class.success]="!t.approvalRequired" [class.warning]="t.approvalRequired">
                @if (t.approvalRequired) {
                  &#9888; Client Approval Required
                } @else {
                  &#10003; Use Without Approval
                }
              </div>
            </div>
          </div>

          <!-- Phases -->
          <div class="card info-card">
            <h3 class="info-card-title">UX Phases Supported</h3>
            <div class="badges-row">
              @for (p of t.phases; track p) {
                <span class="phase-badge">{{ p }}</span>
              }
            </div>
          </div>

          <!-- Skill Levels -->
          <div class="card info-card">
            <h3 class="info-card-title">Skill Level Relevance</h3>
            <div class="badges-row">
              @for (l of t.skillLevels; track l) {
                <span class="skill-badge" [class.junior]="l === 'junior'" [class.mid]="l === 'mid'" [class.senior]="l === 'senior'">
                  {{ l }}
                </span>
              }
            </div>
          </div>

          <!-- CTA -->
          <div class="cta-wrapper">
            <a [href]="t.link" target="_blank" rel="noopener noreferrer" class="btn-primary">
              Visit {{ t.name }} &rarr;
            </a>
          </div>
        </div>
      </section>
    } @else {
      <div class="section-padding not-found">
        <div class="container" style="text-align: center">
          <h1 class="not-found-title">Tool Not Found</h1>
          <a routerLink="/tools" class="btn-primary">&larr; Back to Tools</a>
        </div>
      </div>
    }
  `,
  styles: [`
    .tool-header {
      padding: 48px 24px 40px;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .tool-header-inner {
      max-width: 800px;
    }

    .back-link {
      font-size: 0.85rem;
      color: var(--text-tertiary);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 20px;
      text-decoration: none;
    }

    .tool-title-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .tool-title {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-family: var(--font-heading);
      font-weight: 800;
      color: var(--text-primary);
    }

    .tool-category-badge {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: var(--radius-full);
      background: var(--bg-tertiary);
      color: var(--text-tertiary);
    }

    .tool-description {
      color: var(--text-secondary);
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .tool-content-section {
      background: var(--bg-primary);
    }

    .tool-content-inner {
      max-width: 800px;
    }

    .detail-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }

    .detail-card {
      padding: 20px;
      text-align: center;
    }

    .detail-label {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-tertiary);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .detail-value {
      font-size: 1rem;
      font-weight: 700;
    }

    .detail-value.success {
      color: var(--success);
    }

    .detail-value.warning {
      color: var(--warning);
    }

    .info-card {
      padding: 24px;
      margin-bottom: 24px;
    }

    .info-card-title {
      font-size: 1rem;
      font-family: var(--font-heading);
      margin-bottom: 14px;
      color: var(--text-primary);
    }

    .badges-row {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .phase-badge {
      padding: 8px 16px;
      border-radius: var(--radius-full);
      background: rgba(99, 102, 241, 0.08);
      color: var(--accent-primary);
      font-size: 0.85rem;
      font-weight: 600;
    }

    .skill-badge {
      padding: 8px 16px;
      border-radius: var(--radius-full);
      text-transform: capitalize;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .skill-badge.junior {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success);
    }

    .skill-badge.mid {
      background: rgba(59, 130, 246, 0.1);
      color: var(--info);
    }

    .skill-badge.senior {
      background: rgba(139, 92, 246, 0.1);
      color: var(--accent-secondary);
    }

    .cta-wrapper {
      text-align: center;
      padding: 32px 0;
    }

    .not-found-title {
      font-size: 2rem;
      margin-bottom: 16px;
    }
  `],
})
export class ToolDetailComponent implements OnInit {
  private readonly content = inject(ContentService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  readonly slug = signal('');

  readonly tool = computed(() => {
    const s = this.slug();
    return s ? this.content.getToolBySlug(s) : undefined;
  });

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => this.slug.set(params['slug'] ?? ''));
  }
}
