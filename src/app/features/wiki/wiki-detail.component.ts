import { Component, ChangeDetectionStrategy, inject, computed, signal, OnInit, DestroyRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { WikiSectionContent } from '../../core/models/wiki-section.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../core/services/auth.service';

type WikiVideo = { title: string; watchUrl: string; thumbUrl: string };

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
                @for (v of wikiVideos(); track v.watchUrl) {
                  <a [href]="v.watchUrl" target="_blank" rel="noopener noreferrer" class="video-card">
                    <div class="video-thumb-wrap">
                      <img [src]="v.thumbUrl" [alt]="v.title" class="video-thumb" loading="lazy" />
                      <div class="video-play-overlay">
                        <svg class="play-icon" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="68" height="48" rx="12" fill="rgba(0,0,0,0.7)"/>
                          <path d="M26 15L50 24L26 33V15Z" fill="white"/>
                        </svg>
                      </div>
                      <div class="video-watch-label">Watch on YouTube ↗</div>
                    </div>
                    <p class="video-item-title">{{ v.title }}</p>
                  </a>
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

            <!-- Contribute section -->
            <div class="content-block contribute-section">
              <div class="contribute-header">
                <div class="contribute-header-left">
                  <h2 class="content-heading">Contribute to This Section</h2>
                  <p class="contribute-subtitle">Help improve this wiki with your expertise and experience.</p>
                </div>
                @if (isLoggedIn() && !showContributeForm() && !contributeSubmitted()) {
                  <button class="btn-primary contribute-btn" (click)="showContributeForm.set(true)">+ Contribute</button>
                }
              </div>

              @if (!isLoggedIn()) {
                <div class="contribute-login-prompt">
                  <span class="contribute-lock">🔒</span>
                  <div>
                    <p class="contribute-login-text">Sign in to contribute your knowledge to this wiki section.</p>
                    <a routerLink="/auth/login" class="contribute-login-link">Sign in to contribute &rarr;</a>
                  </div>
                </div>
              } @else if (contributeSubmitted()) {
                <div class="contribute-success">
                  <span class="contribute-success-icon">✅</span>
                  <div>
                    <p class="contribute-success-title">Thank you for contributing!</p>
                    <p class="contribute-success-text">Your submission has been received and will be reviewed by our team.</p>
                    <button class="contribute-again-btn" (click)="resetContribution()">Submit Another</button>
                  </div>
                </div>
              } @else if (showContributeForm()) {
                <div class="card contribute-form-card">
                  <p class="contribute-user-note">Contributing as <strong>{{ currentUser()?.displayName || currentUser()?.email }}</strong></p>

                  <div class="contribute-field">
                    <label class="contribute-label">Contribution Type</label>
                    <div class="contribute-type-options">
                      @for (type of contributeTypes; track type) {
                        <button
                          class="contribute-type-btn"
                          [class.active]="contributeType() === type"
                          (click)="contributeType.set(type)"
                        >{{ type }}</button>
                      }
                    </div>
                  </div>

                  <div class="contribute-field">
                    <label class="contribute-label">Your Contribution</label>
                    <textarea
                      class="contribute-textarea"
                      [value]="contributeContent()"
                      (input)="contributeContent.set($any($event.target).value)"
                      placeholder="Share your knowledge, corrections, additional tools, or real-world examples..."
                      rows="5"
                    ></textarea>
                  </div>

                  <div class="contribute-actions">
                    <button class="contribute-cancel-btn" (click)="showContributeForm.set(false)">Cancel</button>
                    <button
                      class="btn-primary contribute-submit-btn"
                      (click)="submitContribution()"
                      [disabled]="!contributeType() || !contributeContent().trim() || contributeLoading()"
                    >
                      @if (contributeLoading()) { Submitting... } @else { Submit Contribution }
                    </button>
                  </div>
                </div>
              }
            </div>

            <!-- Template Download -->
            <div class="card template-card">
              <h3 class="template-title">Downloadable Template</h3>
              <p class="template-desc">Ready-to-use Figma and Notion templates for this phase.</p>
              <button class="btn-primary template-btn" disabled>Coming Soon. Phase 2</button>
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
      background: rgba(177, 0, 14, 0.06);
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
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }

    .video-card {
      text-decoration: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border-radius: var(--radius-md);
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-2px);

        .video-watch-label { opacity: 1; }
        .video-thumb { transform: scale(1.03); }
        .play-icon rect { fill: rgba(177,0,14,0.85); }
      }
    }

    .video-thumb-wrap {
      position: relative;
      aspect-ratio: 16 / 9;
      border-radius: var(--radius-md);
      overflow: hidden;
      background: var(--bg-tertiary);
      border: 1px solid var(--border-color);
    }

    .video-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.3s ease;
    }

    .video-play-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .play-icon {
      width: 60px;
      height: 42px;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.4));
      transition: all 0.2s ease;
    }

    .video-watch-label {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 8px 12px;
      background: linear-gradient(transparent, rgba(0,0,0,0.75));
      color: #fff;
      font-size: 0.75rem;
      font-weight: 600;
      opacity: 0;
      transition: opacity 0.2s ease;
      text-align: right;
    }

    .video-item-title {
      font-size: 0.83rem;
      font-weight: 600;
      color: var(--text-secondary);
      line-height: 1.45;
      margin: 0;
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
      background: rgba(177, 0, 14, 0.08);
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

    /* ── Contribute section ── */
    .contribute-section {
      border-top: 1px solid var(--border-color);
      padding-top: 32px;
    }

    .contribute-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .contribute-header-left .content-heading {
      margin-bottom: 4px;
    }

    .contribute-subtitle {
      font-size: 0.9rem;
      color: var(--text-tertiary);
      margin: 0;
    }

    .contribute-btn {
      padding: 10px 20px;
      font-size: 0.88rem;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .contribute-login-prompt {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px 24px;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
    }

    .contribute-lock {
      font-size: 1.8rem;
      flex-shrink: 0;
    }

    .contribute-login-text {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin: 0 0 6px;
    }

    .contribute-login-link {
      font-size: 0.88rem;
      font-weight: 600;
      color: var(--accent-primary);
      text-decoration: none;
    }

    .contribute-success {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px 24px;
      background: rgba(16, 185, 129, 0.06);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: var(--radius-lg);
    }

    .contribute-success-icon {
      font-size: 1.6rem;
      flex-shrink: 0;
    }

    .contribute-success-title {
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 4px;
      font-size: 0.95rem;
    }

    .contribute-success-text {
      font-size: 0.88rem;
      color: var(--text-secondary);
      margin: 0 0 12px;
    }

    .contribute-again-btn {
      background: none;
      border: none;
      color: var(--accent-primary);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      padding: 0;
      font-family: var(--font-sans);
    }

    .contribute-form-card {
      padding: 24px;
    }

    .contribute-user-note {
      font-size: 0.83rem;
      color: var(--text-tertiary);
      margin: 0 0 20px;

      strong {
        color: var(--text-secondary);
      }
    }

    .contribute-field {
      margin-bottom: 18px;
    }

    .contribute-label {
      display: block;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: var(--text-tertiary);
      margin-bottom: 8px;
    }

    .contribute-type-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .contribute-type-btn {
      padding: 7px 14px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-secondary);
      font-size: 0.83rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: var(--font-sans);

      &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }

      &.active {
        background: var(--accent-primary);
        border-color: var(--accent-primary);
        color: #fff;
      }
    }

    .contribute-textarea {
      width: 100%;
      padding: 12px 16px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: var(--bg-tertiary);
      color: var(--text-primary);
      font-size: 0.9rem;
      font-family: var(--font-sans);
      line-height: 1.6;
      resize: vertical;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.2s ease;

      &:focus {
        border-color: var(--accent-primary);
      }

      &::placeholder {
        color: var(--text-tertiary);
      }
    }

    .contribute-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 4px;
    }

    .contribute-cancel-btn {
      padding: 10px 20px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-secondary);
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      font-family: var(--font-sans);
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }
    }

    .contribute-submit-btn {
      padding: 10px 24px;
      font-size: 0.88rem;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    }
  `],
})
export class WikiDetailComponent implements OnInit {
  private readonly content = inject(ContentService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);

  readonly slug = signal('');

  readonly isLoggedIn = computed(() => this.authService.isLoggedIn());
  readonly currentUser = computed(() => this.authService.user());

  // Contribution form signals
  readonly showContributeForm = signal(false);
  readonly contributeType = signal('');
  readonly contributeContent = signal('');
  readonly contributeSubmitted = signal(false);
  readonly contributeLoading = signal(false);

  readonly contributeTypes = ['Additional Tool', 'Content Correction', 'New Example', 'Resource Link', 'Workflow Step'];

  readonly section = computed(() => {
    const s = this.slug();
    return s ? this.content.getWikiSectionBySlug(s) : undefined;
  });

  readonly sectionContent = computed((): WikiSectionContent | undefined => {
    const s = this.slug();
    return s ? this.content.getWikiSectionContent(s) : undefined;
  });

  readonly wikiVideos = computed((): WikiVideo[] => {
    const raw = this.sectionContent();
    if (!raw?.videos?.length) return [];
    return raw.videos.map(v => {
      const id = v.url.split('/embed/')[1]?.split('?')[0] ?? '';
      return {
        title: v.title,
        watchUrl: `https://www.youtube.com/watch?v=${id}`,
        thumbUrl: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
      };
    });
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

  submitContribution(): void {
    if (!this.contributeType() || !this.contributeContent().trim()) return;
    this.contributeLoading.set(true);
    // Simulate submission (Firestore integration ready for Phase 2)
    setTimeout(() => {
      this.contributeLoading.set(false);
      this.contributeSubmitted.set(true);
      this.contributeType.set('');
      this.contributeContent.set('');
    }, 800);
  }

  resetContribution(): void {
    this.contributeSubmitted.set(false);
    this.showContributeForm.set(false);
    this.contributeType.set('');
    this.contributeContent.set('');
  }
}
