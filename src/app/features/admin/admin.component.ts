import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { SubmissionsService } from '../../core/services/submissions.service';

const ADMIN_EMAIL = 'sai.sutapalli@globallogic.com';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!isAdmin()) {
      <!-- Access Denied -->
      <div class="section-padding access-denied">
        <div class="container" style="text-align:center">
          <div class="denied-icon">&#128274;</div>
          <h1 class="denied-title">Access Restricted</h1>
          <p class="denied-msg">This area is only accessible to administrators.</p>
          <a routerLink="/" class="btn-primary">Go Home</a>
        </div>
      </div>
    } @else {
      <!-- Admin Header -->
      <section class="admin-header">
        <div class="container admin-header-inner">
          <div class="admin-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Admin Dashboard
          </div>
          <h1 class="admin-title">Manage Submissions</h1>
          <p class="admin-subtitle">Review, approve, or reject community-submitted tools and contributions.</p>
        </div>
      </section>

      <!-- Tab Navigation -->
      <div class="admin-tabs-bar">
        <div class="container">
          <div class="admin-tabs">
            <button
              class="admin-tab"
              [class.active]="activeTab() === 'tools'"
              (click)="activeTab.set('tools')"
            >
              Pending Tools
              @if (pendingCount() > 0) {
                <span class="tab-badge">{{ pendingCount() }}</span>
              }
            </button>
            <button
              class="admin-tab"
              [class.active]="activeTab() === 'wiki'"
              (click)="activeTab.set('wiki')"
            >
              Wiki Contributions
            </button>
            <button
              class="admin-tab"
              [class.active]="activeTab() === 'all'"
              (click)="activeTab.set('all')"
            >
              All Submissions
            </button>
          </div>
        </div>
      </div>

      <!-- Content Area -->
      <section class="section-padding admin-content">
        <div class="container">

          <!-- Pending Tools Tab -->
          @if (activeTab() === 'tools') {
            @if (pendingTools().length === 0) {
              <div class="empty-admin">
                <div class="empty-icon">&#9989;</div>
                <h3>No pending tool submissions</h3>
                <p>New tool submissions will appear here for review.</p>
              </div>
            } @else {
              <div class="submissions-list">
                @for (tool of pendingTools(); track tool.id) {
                  <div class="submission-card card" [class.approved]="tool.status === 'approved'" [class.rejected]="tool.status === 'rejected'">
                    <div class="submission-top">
                      <div class="submission-info">
                        <div class="submission-name-row">
                          <h3 class="submission-name">{{ tool.name }}</h3>
                          <span class="submission-category-badge">{{ tool.category }}</span>
                          <span class="status-pill" [class.pending]="tool.status === 'pending'" [class.approved]="tool.status === 'approved'" [class.rejected]="tool.status === 'rejected'">
                            {{ tool.status }}
                          </span>
                        </div>
                        <p class="submission-desc">{{ tool.description }}</p>
                        <a [href]="tool.link" target="_blank" rel="noopener noreferrer" class="submission-link">{{ tool.link }} ↗</a>
                      </div>
                    </div>

                    <div class="submission-meta">
                      <div class="meta-row">
                        <span class="meta-item">
                          <strong>Phases:</strong>
                          @for (p of tool.phases; track p) {
                            <span class="mini-badge phase-b">{{ p }}</span>
                          }
                        </span>
                      </div>
                      <div class="meta-row">
                        <span class="meta-item">
                          @if (tool.freemium) { <span class="mini-badge green-b">Free Tier</span> }
                          @if (tool.clientSafe) { <span class="mini-badge green-b">Client-Safe</span> }
                          @if (tool.approvalRequired) { <span class="mini-badge amber-b">Approval Required</span> }
                        </span>
                      </div>
                      <div class="meta-row">
                        <span class="meta-label">Submitted by: <strong>{{ tool.submittedBy }}</strong></span>
                        <span class="meta-label">{{ tool.submittedAt | date:'mediumDate' }}</span>
                      </div>
                    </div>

                    @if (tool.status === 'pending') {
                      <div class="submission-actions">
                        <button class="action-btn approve-btn" (click)="approve(tool.id)">
                          &#10003; Approve
                        </button>
                        <button class="action-btn reject-btn" (click)="reject(tool.id)">
                          &#10005; Reject
                        </button>
                      </div>
                    } @else {
                      <div class="submission-actions">
                        <button class="action-btn undo-btn" (click)="resetStatus(tool.id)">
                          &#8635; Undo Decision
                        </button>
                      </div>
                    }
                  </div>
                }
              </div>
            }
          }

          <!-- Wiki Tab -->
          @if (activeTab() === 'wiki') {
            <div class="empty-admin">
              <div class="empty-icon">&#128218;</div>
              <h3>Wiki Contributions</h3>
              <p>User-submitted wiki contributions will appear here. Contributions from the wiki detail pages are reviewed here before going live.</p>
              <p class="coming-soon-note">Firestore integration coming in Phase 2 — submissions are currently stored per-session.</p>
            </div>
          }

          <!-- All Submissions Tab -->
          @if (activeTab() === 'all') {
            @if (allSubmissions().length === 0) {
              <div class="empty-admin">
                <div class="empty-icon">&#128203;</div>
                <h3>No submissions yet</h3>
                <p>All community submissions across tools, wiki, and other sections will appear here.</p>
              </div>
            } @else {
              <div class="all-submissions-grid">
                <div class="submissions-summary">
                  <div class="summary-card card">
                    <div class="summary-num">{{ allSubmissions().length }}</div>
                    <div class="summary-label">Total Submissions</div>
                  </div>
                  <div class="summary-card card">
                    <div class="summary-num pending-num">{{ pendingCount() }}</div>
                    <div class="summary-label">Pending Review</div>
                  </div>
                  <div class="summary-card card">
                    <div class="summary-num approved-num">{{ approvedCount() }}</div>
                    <div class="summary-label">Approved</div>
                  </div>
                  <div class="summary-card card">
                    <div class="summary-num rejected-num">{{ rejectedCount() }}</div>
                    <div class="summary-label">Rejected</div>
                  </div>
                </div>
              </div>
            }
          }

        </div>
      </section>
    }
  `,
  styles: [`
    /* ── Access Denied ── */
    .access-denied {
      min-height: 60vh;
      display: flex;
      align-items: center;
    }

    .denied-icon {
      font-size: 3rem;
      margin-bottom: 16px;
    }

    .denied-title {
      font-size: 2rem;
      font-family: var(--font-heading);
      margin-bottom: 12px;
    }

    .denied-msg {
      color: var(--text-secondary);
      margin-bottom: 28px;
    }

    /* ── Admin Header ── */
    .admin-header {
      padding: 48px 24px 36px;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .admin-header-inner { max-width: 900px; }

    .admin-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--accent-primary);
      margin-bottom: 12px;
    }

    .admin-title {
      font-size: clamp(1.8rem, 4vw, 2.4rem);
      font-family: var(--font-heading);
      font-weight: 800;
      margin-bottom: 8px;
    }

    .admin-subtitle {
      color: var(--text-secondary);
      font-size: 1rem;
      line-height: 1.6;
    }

    /* ── Tabs ── */
    .admin-tabs-bar {
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: var(--header-height, 72px);
      z-index: 10;
    }

    .admin-tabs {
      display: flex;
      gap: 0;
      overflow-x: auto;
    }

    .admin-tab {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 24px;
      border: none;
      border-bottom: 3px solid transparent;
      background: transparent;
      color: var(--text-tertiary);
      font-size: 0.9rem;
      font-weight: 600;
      font-family: var(--font-sans);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;

      &:hover { color: var(--text-primary); background: var(--bg-tertiary); }

      &.active {
        color: var(--accent-primary);
        border-bottom-color: var(--accent-primary);
      }
    }

    .tab-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      border-radius: var(--radius-full);
      background: var(--accent-primary);
      color: #fff;
      font-size: 0.72rem;
      font-weight: 700;
    }

    /* ── Admin Content ── */
    .admin-content { background: var(--bg-primary); }

    /* ── Empty state ── */
    .empty-admin {
      text-align: center;
      padding: 60px 20px;

      .empty-icon {
        font-size: 2.5rem;
        margin-bottom: 16px;
      }

      h3 {
        font-size: 1.2rem;
        font-family: var(--font-heading);
        margin-bottom: 8px;
      }

      p { color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; }
    }

    .coming-soon-note {
      margin-top: 12px;
      font-size: 0.8rem !important;
      color: var(--text-tertiary) !important;
      font-style: italic;
    }

    /* ── Submission Cards ── */
    .submissions-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .submission-card {
      padding: 24px;
      transition: all 0.25s ease;

      &.approved {
        border-color: rgba(16, 185, 129, 0.4);
        background: rgba(16, 185, 129, 0.03);
      }

      &.rejected {
        border-color: rgba(220, 38, 38, 0.3);
        background: rgba(220, 38, 38, 0.03);
        opacity: 0.7;
      }
    }

    .submission-top { margin-bottom: 16px; }

    .submission-name-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 10px;
    }

    .submission-name {
      font-size: 1.1rem;
      font-family: var(--font-heading);
      font-weight: 700;
      color: var(--text-primary);
    }

    .submission-category-badge {
      font-size: 0.72rem;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      background: var(--bg-tertiary);
      color: var(--text-tertiary);
    }

    .status-pill {
      font-size: 0.7rem;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      text-transform: uppercase;
      letter-spacing: 0.5px;

      &.pending  { background: rgba(245,158,11,0.12); color: var(--warning); border: 1px solid rgba(245,158,11,0.3); }
      &.approved { background: rgba(16,185,129,0.12); color: var(--success); border: 1px solid rgba(16,185,129,0.3); }
      &.rejected { background: rgba(220,38,38,0.1);   color: var(--danger);  border: 1px solid rgba(220,38,38,0.25); }
    }

    .submission-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 8px;
    }

    .submission-link {
      font-size: 0.8rem;
      color: var(--accent-primary);
      word-break: break-all;
    }

    .submission-meta {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 14px 0;
      border-top: 1px solid var(--border-light);
      border-bottom: 1px solid var(--border-light);
      margin-bottom: 16px;
    }

    .meta-row {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }

    .meta-item { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .meta-label { font-size: 0.78rem; color: var(--text-tertiary); }

    .mini-badge {
      font-size: 0.68rem;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: var(--radius-full);
    }

    .phase-b  { background: rgba(177, 0, 14, 0.08); color: var(--accent-primary); border: 1px solid rgba(177,0,14,0.18); }
    .green-b  { background: rgba(16,185,129,0.1);   color: var(--success);        border: 1px solid rgba(16,185,129,0.25); }
    .amber-b  { background: rgba(245,158,11,0.1);   color: var(--warning);        border: 1px solid rgba(245,158,11,0.25); }

    .submission-actions {
      display: flex;
      gap: 10px;
    }

    .action-btn {
      padding: 9px 20px;
      border-radius: var(--radius-full);
      font-size: 0.85rem;
      font-weight: 600;
      font-family: var(--font-sans);
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.2s ease;
    }

    .approve-btn {
      background: rgba(16,185,129,0.1);
      color: var(--success);
      border-color: rgba(16,185,129,0.3);
      &:hover { background: var(--success); color: #fff; }
    }

    .reject-btn {
      background: rgba(220,38,38,0.06);
      color: var(--danger);
      border-color: rgba(220,38,38,0.25);
      &:hover { background: var(--danger); color: #fff; }
    }

    .undo-btn {
      background: transparent;
      color: var(--text-tertiary);
      border-color: var(--border-color);
      &:hover { border-color: var(--text-tertiary); color: var(--text-primary); }
    }

    /* ── Summary Grid ── */
    .all-submissions-grid { display: flex; flex-direction: column; gap: 24px; }

    .submissions-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 16px;
    }

    .summary-card {
      padding: 24px;
      text-align: center;
    }

    .summary-num {
      font-size: 2rem;
      font-weight: 800;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .pending-num  { color: var(--warning); }
    .approved-num { color: var(--success); }
    .rejected-num { color: var(--danger); }

    .summary-label {
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--text-tertiary);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-top: 4px;
    }

    @media (max-width: 768px) {
      .submission-name-row { flex-direction: column; align-items: flex-start; }
      .submission-actions { flex-wrap: wrap; }
    }
  `],
})
export class AdminComponent {
  private readonly authService = inject(AuthService);
  private readonly submissionsService = inject(SubmissionsService);

  readonly activeTab = signal<'tools' | 'wiki' | 'all'>('tools');

  readonly isAdmin = computed(() => {
    const user = this.authService.user();
    return user?.email === ADMIN_EMAIL;
  });

  readonly pendingTools = computed(() => this.submissionsService.pendingTools());
  readonly pendingCount = computed(() => this.submissionsService.pendingCount());

  readonly allSubmissions = computed(() => this.submissionsService.pendingTools());
  readonly approvedCount  = computed(() => this.submissionsService.pendingTools().filter(t => t.status === 'approved').length);
  readonly rejectedCount  = computed(() => this.submissionsService.pendingTools().filter(t => t.status === 'rejected').length);

  approve(id: string):      void { this.submissionsService.approveTool(id); }
  reject(id: string):       void { this.submissionsService.rejectTool(id); }
  resetStatus(id: string):  void { this.submissionsService.resetToPending(id); }
}
