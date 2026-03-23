import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentService } from '../../core/services/content.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wiki-detail',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (section(); as s) {
      <!-- Header -->
      <section class="detail-header">
        <div class="container detail-header-inner">
          <a routerLink="/wiki" class="back-link">&larr; Back to Wiki</a>
          <div class="section-meta">
            <span class="section-icon">{{ s.icon }}</span>
            <div>
              <span class="section-badge" [style.color]="s.color" [style.background]="s.color + '15'">
                Section {{ s.id }}
              </span>
            </div>
          </div>
          <h1 class="detail-title">{{ s.title }}</h1>
          <p class="detail-desc">{{ s.description }}</p>
          <div class="skill-badges">
            @for (l of s.skillLevels; track l) {
              <span class="skill-badge" [class.junior]="l === 'junior'" [class.mid]="l === 'mid'" [class.senior]="l === 'senior'">
                {{ l }}
              </span>
            }
          </div>
        </div>
      </section>

      <!-- Content -->
      <section class="section-padding detail-content-section">
        <div class="container detail-content-inner">
          @if (sectionContent(); as c) {
            <!-- Overview -->
            <div class="content-block">
              <h2 class="content-heading">Overview</h2>
              <p class="content-text">{{ c.overview }}</p>
            </div>

            <!-- AI Workflow -->
            <div class="content-block">
              <h2 class="content-heading">AI Workflow</h2>
              <div class="workflow-list">
                @for (w of c.workflow; track w.step; let i = $index) {
                  <div class="card workflow-card">
                    <div class="workflow-item">
                      <span class="workflow-number" [style.background]="s.color">{{ i + 1 }}</span>
                      <div class="workflow-body">
                        <div class="workflow-header">
                          <strong class="workflow-step">{{ w.step }}</strong>
                          <span class="workflow-tool">{{ w.tool }}</span>
                        </div>
                        <p class="workflow-desc">{{ w.desc }}</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Tools Table -->
            <div class="content-block">
              <h2 class="content-heading">Freemium Tools</h2>
              <div class="table-wrapper">
                <table class="tools-table">
                  <thead>
                    <tr>
                      <th>Tool</th>
                      <th>Use Case</th>
                      <th>Free Tier</th>
                      <th class="center-col">Client-Safe</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (t of c.tools; track t.name) {
                      <tr>
                        <td class="tool-name">{{ t.name }}</td>
                        <td class="tool-use">{{ t.use }}</td>
                        <td class="tool-free">{{ t.freeTier }}</td>
                        <td class="center-col">
                          @if (t.clientSafe) {
                            <span class="safe-yes">&#10003;</span>
                          } @else {
                            <span class="safe-warn">Review</span>
                          }
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Constraints -->
            <div class="content-block">
              <h2 class="content-heading">Constraints</h2>
              @for (c of sectionContent()!.constraints; track c) {
                <div class="constraint-box">{{ c }}</div>
              }
            </div>

            <!-- Videos -->
            <div class="content-block">
              <h2 class="content-heading">Watch It In Action</h2>
              <div class="videos-grid">
                @for (v of c.videos; track v.url) {
                  <div class="video-item">
                    <p class="video-item-title">{{ v.title }}</p>
                    <div class="video-wrapper">
                      <iframe
                        width="100%"
                        height="100%"
                        [src]="$any(v).safeUrl"
                        [title]="v.title"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- Resources -->
            @if (c.resources && c.resources.length > 0) {
              <div class="content-block">
                <h2 class="content-heading">Related Resources</h2>
                <div class="resources-list">
                  @for (r of c.resources; track r.url) {
                    <a [href]="r.url" target="_blank" rel="noopener noreferrer" class="card resource-card">
                      <div class="resource-item">
                        <span class="resource-icon">🔗</span>
                        <div class="resource-info">
                          <strong class="resource-title">{{ r.title }}</strong>
                          <span class="resource-link">{{ r.url }}</span>
                        </div>
                      </div>
                    </a>
                  }
                </div>
              </div>
            }

            <!-- Template Download -->
            <div class="card template-card">
              <h3 class="template-title">Downloadable Template</h3>
              <p class="template-desc">Ready-to-use Figma and Notion templates for this phase.</p>
              <button class="btn-primary template-btn" disabled>Coming Soon - Phase 2</button>
            </div>
          } @else {
            <div class="no-content">
              <p>Detailed content for this section is under development.</p>
            </div>
          }

          <!-- Prev/Next Navigation -->
          <div class="prev-next">
            @if (prevSection(); as prev) {
              <a [routerLink]="['/wiki', prev.slug]" class="card nav-card nav-prev">
                <span class="nav-label">&larr; Previous</span>
                <div class="nav-title">{{ prev.icon }} {{ prev.title }}</div>
              </a>
            } @else {
              <div></div>
            }
            @if (nextSection(); as next) {
              <a [routerLink]="['/wiki', next.slug]" class="card nav-card nav-next">
                <span class="nav-label">Next &rarr;</span>
                <div class="nav-title">{{ next.icon }} {{ next.title }}</div>
              </a>
            } @else {
              <div></div>
            }
          </div>
        </div>
      </section>
    } @else {
      <div class="section-padding not-found">
        <div class="container" style="text-align: center">
          <h1 class="not-found-title">Section Not Found</h1>
          <a routerLink="/wiki" class="btn-primary">&larr; Back to Wiki</a>
        </div>
      </div>
    }
  `,
  styles: [`
    .detail-header {
      padding: 48px 24px 40px;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .detail-header-inner {
      max-width: 860px;
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

    .section-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }

    .section-icon {
      font-size: 2.5rem;
    }

    .section-badge {
      font-size: 0.75rem;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: var(--radius-full);
    }

    .detail-title {
      font-size: clamp(1.8rem, 4vw, 2.5rem);
      font-family: var(--font-heading);
      font-weight: 800;
      margin-bottom: 12px;
      color: var(--text-primary);
    }

    .detail-desc {
      color: var(--text-secondary);
      font-size: 1.05rem;
      line-height: 1.7;
    }

    .skill-badges {
      display: flex;
      gap: 6px;
      margin-top: 16px;
      flex-wrap: wrap;
    }

    .skill-badge {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      text-transform: capitalize;
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

    .detail-content-section {
      background: var(--bg-primary);
    }

    .detail-content-inner {
      max-width: 860px;
    }

    .content-block {
      margin-bottom: 40px;
    }

    .content-heading {
      font-size: 1.3rem;
      font-family: var(--font-heading);
      margin-bottom: 12px;
      color: var(--text-primary);
    }

    .content-text {
      color: var(--text-secondary);
      line-height: 1.8;
      font-size: 1rem;
    }

    .workflow-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .workflow-card {
      padding: 20px;
    }

    .workflow-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
    }

    .workflow-number {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      font-weight: 700;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .workflow-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
      flex-wrap: wrap;
    }

    .workflow-step {
      color: var(--text-primary);
      font-size: 0.95rem;
    }

    .workflow-tool {
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--accent-primary);
      background: rgba(99, 102, 241, 0.08);
      padding: 3px 8px;
      border-radius: var(--radius-full);
    }

    .workflow-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.6;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .tools-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }

    .tools-table thead tr {
      border-bottom: 2px solid var(--border-color);
    }

    .tools-table th {
      padding: 12px;
      text-align: left;
      color: var(--text-primary);
    }

    .tools-table tbody tr {
      border-bottom: 1px solid var(--border-light);
    }

    .center-col {
      text-align: center;
    }

    .tool-name {
      padding: 12px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .tool-use, .tool-free {
      padding: 12px;
      color: var(--text-secondary);
    }

    .safe-yes {
      color: var(--success);
    }

    .safe-warn {
      color: var(--warning);
    }

    .constraint-box {
      padding: 14px 18px;
      border-radius: var(--radius-md);
      background: rgba(245, 158, 11, 0.06);
      border: 1px solid rgba(245, 158, 11, 0.15);
      margin-bottom: 8px;
      font-size: 0.9rem;
      color: var(--text-primary);
      line-height: 1.6;
    }

    .videos-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .video-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .video-item-title {
      font-size: 0.8rem;
      font-weight: 600;
      color: var(--text-secondary);
      line-height: 1.4;
      min-height: 2.8em;
    }

    .video-wrapper {
      aspect-ratio: 16 / 9;
      border-radius: var(--radius-lg);
      overflow: hidden;
      border: 1px solid var(--border-color);
      box-shadow: var(--shadow-md);
      background: var(--bg-tertiary);
    }

    .video-wrapper iframe {
      border: none;
      display: block;
    }

    .resources-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .resource-card {
      padding: 16px 20px;
      text-decoration: none;
      transition: all 0.2s ease;
      border: 1px solid var(--border-color);
    }

    .resource-card:hover {
      transform: translateY(-2px);
      border-color: var(--accent-primary);
      box-shadow: var(--shadow-md);
    }

    .resource-item {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .resource-icon {
      font-size: 1.5rem;
      background: rgba(99, 102, 241, 0.1);
      width: 44px;
      height: 44px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .resource-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .resource-title {
      color: var(--text-primary);
      font-size: 1rem;
    }

    .resource-link {
      font-size: 0.8rem;
      color: var(--text-tertiary);
      word-break: break-all;
    }

    @media (max-width: 768px) {
      .videos-grid {
        grid-template-columns: 1fr;
      }

      .video-item-title {
        min-height: unset;
      }
    }

    .template-card {
      padding: 24px;
      margin-bottom: 40px;
      text-align: center;
    }

    .template-title {
      font-size: 1.1rem;
      font-family: var(--font-heading);
      margin-bottom: 8px;
      color: var(--text-primary);
    }

    .template-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .template-btn {
      opacity: 0.7;
      cursor: default;
    }

    .no-content {
      text-align: center;
      padding: 40px;
    }

    .no-content p {
      color: var(--text-secondary);
      font-size: 1rem;
    }

    .prev-next {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding-top: 32px;
      border-top: 1px solid var(--border-color);
      flex-wrap: wrap;
    }

    .nav-card {
      padding: 16px 20px;
      flex: 1;
      min-width: 200px;
      text-decoration: none;
    }

    .nav-next {
      text-align: right;
    }

    .nav-label {
      font-size: 0.75rem;
      color: var(--text-tertiary);
    }

    .nav-title {
      font-weight: 600;
      color: var(--text-primary);
      margin-top: 4px;
    }

    .not-found-title {
      font-size: 2rem;
      margin-bottom: 16px;
    }
  `],
})
export class WikiDetailComponent implements OnInit {
  private readonly content = inject(ContentService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  readonly slug = signal('');

  readonly section = computed(() => {
    const s = this.slug();
    return s ? this.content.getWikiSectionBySlug(s) : undefined;
  });

  readonly sectionContent = computed(() => {
    const s = this.slug();
    const content = s ? this.content.getWikiSectionContent(s) : undefined;
    if (content && content.videos) {
      return {
        ...content,
        videos: content.videos.map(v => ({
          ...v,
          safeUrl: this.sanitizer.bypassSecurityTrustResourceUrl(v.url)
        }))
      };
    }
    return content;
  });

  readonly prevSection = computed(() => {
    const sections = this.content.getWikiSections();
    const idx = sections.findIndex(s => s.slug === this.slug());
    return idx > 0 ? sections[idx - 1] : undefined;
  });

  readonly nextSection = computed(() => {
    const sections = this.content.getWikiSections();
    const idx = sections.findIndex(s => s.slug === this.slug());
    return idx >= 0 && idx < sections.length - 1 ? sections[idx + 1] : undefined;
  });

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => this.slug.set(params['slug'] ?? ''));
  }
}
