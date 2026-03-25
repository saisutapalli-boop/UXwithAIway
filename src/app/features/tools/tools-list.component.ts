import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { AuthService } from '../../core/services/auth.service';
import { SubmissionsService } from '../../core/services/submissions.service';

const ALL_PHASES = ['Strategy', 'Research', 'Ideation', 'Design', 'Testing', 'Audit'];
const ALL_CATEGORIES = ['AI Assistant', 'AI Search', 'AI Stack Combo', 'Research', 'Design', 'Testing', 'Analytics', 'Collaboration', 'Productivity', 'Audit', 'Communication', 'Speech-to-Text'];

@Component({
  selector: 'app-tools-list',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Header -->
    <section class="tools-header">
      <div class="container tools-header-content">
        <span class="section-label">Curated for UX</span>
        <h1 class="section-title">AI Tool Directory</h1>
        <p class="section-subtitle">
          {{ allTools.length }}+ tools curated by practitioners and with honest assessments, freemium flags, and client-safety ratings.
        </p>

        <div class="search-action-row">
          <input
            type="text"
            [value]="search()"
            (input)="search.set($any($event.target).value)"
            placeholder="Search tools by name or description..."
            class="search-input"
          />
          <button class="btn-submit-tool" (click)="openForm()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Submit a Tool
          </button>
        </div>
      </div>
    </section>

    <!-- Submit Tool Modal -->
    @if (showForm()) {
      <div class="modal-backdrop" (click)="closeForm()"></div>
      <div class="modal-panel" role="dialog" aria-modal="true" aria-label="Submit a Tool">
        <div class="modal-header">
          <h2 class="modal-title">Submit a Tool</h2>
          <button class="modal-close-btn" (click)="closeForm()" aria-label="Close">&#10005;</button>
        </div>

        @if (formSubmitted()) {
          <div class="form-success">
            <div class="success-icon">&#10003;</div>
            <h3>Thank you for your submission!</h3>
            <p>Your tool has been submitted for review. Our team will evaluate it and add it to the directory if it meets our criteria.</p>
            <button class="btn-primary" (click)="resetForm()">Submit Another</button>
          </div>
        } @else {
          <form class="submit-form" (submit)="submitTool($event)">

            <!-- Tool Name -->
            <div class="form-group">
              <label class="form-label" for="tool-name">Tool Name <span class="required">*</span></label>
              <input
                id="tool-name"
                type="text"
                class="form-input"
                [value]="formName()"
                (input)="formName.set($any($event.target).value)"
                placeholder="e.g. Maze, Figma, Miro"
                required
              />
            </div>

            <!-- Combo Toggle -->
            <div class="form-group">
              <label class="toggle-item combo-toggle">
                <button type="button" class="toggle-btn" [class.on]="formIsCombo()" (click)="formIsCombo.set(!formIsCombo())">
                  <span class="toggle-knob"></span>
                </button>
                <span class="toggle-label">This is an AI Stack Combo (multiple tools combined)</span>
              </label>
            </div>

            <!-- Category -->
            <div class="form-group">
              <label class="form-label" for="tool-category">Category <span class="required">*</span></label>
              <select
                id="tool-category"
                class="form-input form-select"
                [value]="formCategory()"
                (change)="formCategory.set($any($event.target).value)"
                required
              >
                <option value="" disabled>Select a category</option>
                @for (cat of allCategories; track cat) {
                  <option [value]="cat">{{ cat }}</option>
                }
              </select>
            </div>

            <!-- Description -->
            <div class="form-group">
              <label class="form-label" for="tool-desc">Description <span class="required">*</span></label>
              <textarea
                id="tool-desc"
                class="form-textarea"
                [value]="formDescription()"
                (input)="formDescription.set($any($event.target).value)"
                placeholder="Briefly describe what this tool does and why it's useful for UX practitioners..."
                rows="3"
                required
              ></textarea>
            </div>

            <!-- Link -->
            <div class="form-group">
              <label class="form-label" for="tool-link">Tool URL <span class="required">*</span></label>
              <input
                id="tool-link"
                type="url"
                class="form-input"
                [value]="formLink()"
                (input)="formLink.set($any($event.target).value)"
                placeholder="https://..."
                required
              />
            </div>

            <!-- UX Phases -->
            <div class="form-group">
              <label class="form-label">UX Phases Supported <span class="required">*</span></label>
              <div class="checkbox-grid">
                @for (phase of allPhases; track phase) {
                  <label class="checkbox-item">
                    <input
                      type="checkbox"
                      [checked]="formPhases().includes(phase)"
                      (change)="togglePhase(phase)"
                    />
                    <span>{{ phase }}</span>
                  </label>
                }
              </div>
            </div>

            <!-- Toggles -->
            <div class="toggles-row">
              <label class="toggle-item">
                <button type="button" class="toggle-btn" [class.on]="formFreemium()" (click)="formFreemium.set(!formFreemium())">
                  <span class="toggle-knob"></span>
                </button>
                <span class="toggle-label">Free Tier Available</span>
              </label>

              <label class="toggle-item">
                <button type="button" class="toggle-btn" [class.on]="formClientSafe()" (click)="formClientSafe.set(!formClientSafe())">
                  <span class="toggle-knob"></span>
                </button>
                <span class="toggle-label">Client-Safe (no data sharing)</span>
              </label>

              <label class="toggle-item">
                <button type="button" class="toggle-btn" [class.on]="formApprovalRequired()" (click)="formApprovalRequired.set(!formApprovalRequired())">
                  <span class="toggle-knob"></span>
                </button>
                <span class="toggle-label">Client Approval Required</span>
              </label>
            </div>

            @if (formError()) {
              <p class="form-error-msg">{{ formError() }}</p>
            }

            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="closeForm()">Cancel</button>
              <button type="submit" class="btn-primary">Submit for Review</button>
            </div>
          </form>
        }
      </div>
    }

    <!-- Main -->
    <section class="section-padding tools-main">
      <div class="container">
        <div class="tools-layout">

          <!-- Sidebar Filters -->
          <aside class="card filters-sidebar">

            <!-- Header row with clear icon -->
            <div class="filters-header">
              <h3 class="filters-title">Filters</h3>
              @if (hasActiveFilters()) {
                <button class="clear-icon-btn" (click)="clearAll()" title="Clear all filters">&#10005;</button>
              }
            </div>

            <!-- UX Phase (with inline search) -->
            <div class="filter-group">
              <label class="filter-label">UX Phase</label>
              <input
                type="text"
                class="phase-search"
                [value]="phaseSearch()"
                (input)="phaseSearch.set($any($event.target).value)"
                placeholder="Search phases…"
              />
              <div class="filter-options">
                @for (opt of filteredPhaseOptions(); track opt) {
                  <button
                    class="filter-option"
                    [class.active]="phaseFilter() === opt"
                    (click)="phaseFilter.set(opt)"
                  >{{ opt }}</button>
                }
              </div>
            </div>

            <!-- Category (new) -->
            <div class="filter-group">
              <label class="filter-label">Category</label>
              <div class="filter-options">
                @for (opt of categories; track opt) {
                  <button
                    class="filter-option"
                    [class.active]="categoryFilter() === opt"
                    (click)="categoryFilter.set(opt)"
                  >{{ opt }}</button>
                }
              </div>
            </div>

            <!-- Pricing -->
            <div class="filter-group">
              <label class="filter-label">Pricing</label>
              <div class="filter-options">
                @for (opt of pricingFilters; track opt) {
                  <button
                    class="filter-option"
                    [class.active]="pricingFilter() === opt"
                    (click)="pricingFilter.set(opt)"
                  >{{ opt }}</button>
                }
              </div>
            </div>

            <!-- Data Safety -->
            <div class="filter-group">
              <label class="filter-label">Data Safety</label>
              <div class="filter-options">
                @for (opt of safeFilters; track opt) {
                  <button
                    class="filter-option"
                    [class.active]="safeFilter() === opt"
                    (click)="safeFilter.set(opt)"
                  >{{ opt }}</button>
                }
              </div>
            </div>

            <!-- Approval -->
            <div class="filter-group">
              <label class="filter-label">Approval Required</label>
              <div class="filter-options">
                @for (opt of approvalFilters; track opt) {
                  <button
                    class="filter-option"
                    [class.active]="approvalFilter() === opt"
                    (click)="approvalFilter.set(opt)"
                  >{{ opt }}</button>
                }
              </div>
            </div>

          </aside>

          <!-- Tool Grid -->
          <div class="tools-grid-wrapper">
            <p class="tools-count">Showing {{ filteredTools().length }} of {{ allTools.length }} tools</p>
            <div class="tools-grid">
              @for (t of filteredTools(); track t.slug) {
                <a [routerLink]="['/tools', t.slug]" class="tool-card-link">
                  <div class="card tool-card" [class.combo-card]="t.category === 'AI Stack Combo'">
                    <div class="tool-card-top">
                      <h3 class="tool-name">{{ t.name }}</h3>
                      <span class="tool-category" [class.combo-category]="t.category === 'AI Stack Combo'">{{ t.category }}</span>
                    </div>

                    <p class="tool-desc">{{ t.description }}</p>

                    <div class="tool-phases">
                      @for (p of t.phases; track p) {
                        <span class="phase-badge">{{ p }}</span>
                      }
                    </div>

                    <div class="tool-status-badges">
                      @if (t.freemium) {
                        <span class="status-badge free-badge">&#10003; Free Tier</span>
                      }
                      <span class="status-badge" [class.safe-badge]="t.clientSafe" [class.review-badge]="!t.clientSafe">
                        @if (t.clientSafe) { &#10003; Client-Safe } @else { &#9888; Review Required }
                      </span>
                      @if (t.approvalRequired) {
                        <span class="status-badge approval-badge">&#9432; Approval Needed</span>
                      }
                    </div>
                  </div>
                </a>
              }
            </div>

            @if (filteredTools().length === 0) {
              <div class="empty-state">
                <p>No tools match your filters. Try adjusting your criteria.</p>
              </div>
            }
          </div>

        </div>
      </div>
    </section>
  `,
  styles: [`
    .tools-header {
      padding: 48px 24px 32px;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .tools-header-content { text-align: center; }

    .section-subtitle { margin: 0 auto 28px; }

    .search-action-row {
      display: flex;
      align-items: stretch;
      gap: 12px;
      max-width: 680px;
      margin: 0 auto;
      width: 100%;
      height: 50px;
    }

    .search-input {
      flex: 1;
      height: 50px;
      padding: 0 22px;
      border-radius: var(--radius-full);
      border: 2px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-primary);
      font-size: 0.95rem;
      font-family: var(--font-sans);
      outline: none;
      transition: border-color 0.2s ease;
      box-sizing: border-box;
      min-width: 0;

      &:focus { border-color: var(--accent-primary); }
      &::placeholder { color: var(--text-tertiary); }
    }

    .tools-main { background: var(--bg-primary); }

    .tools-layout {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 32px;
      align-items: start;
    }

    /* ── Filters sidebar ── */
    .filters-sidebar {
      padding: 20px;
      position: sticky;
      top: 96px;
    }

    .filters-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .filters-title {
      font-size: 1rem;
      font-family: var(--font-heading);
      color: var(--text-primary);
      margin: 0;
    }

    .clear-icon-btn {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-tertiary);
      cursor: pointer;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      flex-shrink: 0;

      &:hover {
        border-color: var(--danger, #ef4444);
        color: var(--danger, #ef4444);
        background: rgba(239, 68, 68, 0.06);
      }
    }

    .filter-group { margin-bottom: 18px; }

    .filter-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-tertiary);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.07em;
    }

    /* Phase search inside the filter group */
    .phase-search {
      width: 100%;
      padding: 7px 10px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: var(--bg-tertiary);
      color: var(--text-primary);
      font-size: 0.8rem;
      outline: none;
      margin-bottom: 8px;
      box-sizing: border-box;
      transition: border-color 0.2s ease;

      &:focus { border-color: var(--accent-primary); }

      &::placeholder { color: var(--text-tertiary); }
    }

    .filter-options {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .filter-option {
      padding: 7px 10px;
      border-radius: var(--radius-sm);
      border: none;
      cursor: pointer;
      font-size: 0.83rem;
      font-weight: 500;
      text-align: left;
      background: transparent;
      color: var(--text-secondary);
      transition: all 0.2s ease;

      &:hover { background: var(--bg-tertiary); }

      &.active {
        background: rgba(177, 0, 14, 0.08);
        color: var(--accent-primary);
        font-weight: 600;
      }
    }

    /* ── Tool grid ── */
    .tools-count {
      font-size: 0.85rem;
      color: var(--text-tertiary);
      margin-bottom: 16px;
    }

    .tools-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .tool-card-link { text-decoration: none; }

    .tool-card { padding: 24px; height: 100%; }

    .tool-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      gap: 8px;
    }

    .tool-name {
      font-size: 1.05rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .tool-category {
      font-size: 0.68rem;
      font-weight: 600;
      padding: 3px 9px;
      border-radius: var(--radius-full);
      background: var(--bg-tertiary);
      color: var(--text-tertiary);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .combo-card {
      border-left: 3px solid var(--accent-primary);
    }

    .combo-category {
      background: rgba(177, 0, 14, 0.1);
      color: var(--accent-primary);
    }

    .combo-toggle {
      padding: 10px 14px;
      border-radius: var(--radius-md);
      background: var(--bg-tertiary);
    }

    .tool-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .tool-phases {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    .phase-badge {
      font-size: 0.68rem;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: var(--radius-full);
      background: rgba(177, 0, 14, 0.08);
      color: var(--accent-primary);
      border: 1px solid rgba(177, 0, 14, 0.18);
    }

    :host-context([data-theme="dark"]) .phase-badge {
      background: rgba(232, 24, 42, 0.15);
      border-color: rgba(232, 24, 42, 0.3);
    }

    .tool-status-badges {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }

    .status-badge {
      font-size: 0.68rem;
      font-weight: 600;
      padding: 2px 7px;
      border-radius: var(--radius-full);
    }

    .free-badge     { background: rgba(16,185,129,0.12); color: var(--success); border: 1px solid rgba(16,185,129,0.25); }
    .safe-badge     { background: rgba(16,185,129,0.12); color: var(--success); border: 1px solid rgba(16,185,129,0.25); }
    .review-badge   { background: rgba(245,158,11,0.12); color: var(--warning); border: 1px solid rgba(245,158,11,0.25); }
    .approval-badge { background: rgba(59,130,246,0.12); color: var(--info, #3b82f6); border: 1px solid rgba(59,130,246,0.25); }

    :host-context([data-theme="dark"]) .free-badge,
    :host-context([data-theme="dark"]) .safe-badge     { background: rgba(16,185,129,0.18); color: #34d399; border-color: rgba(16,185,129,0.3); }
    :host-context([data-theme="dark"]) .review-badge   { background: rgba(245,158,11,0.18); color: #fbbf24; border-color: rgba(245,158,11,0.3); }
    :host-context([data-theme="dark"]) .approval-badge { background: rgba(59,130,246,0.18); color: #60a5fa; border-color: rgba(59,130,246,0.3); }

    .empty-state {
      text-align: center;
      padding: 60px 20px;

      p { color: var(--text-tertiary); font-size: 1rem; }
    }

    .btn-submit-tool {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      flex-shrink: 0;
      height: 50px;
      padding: 0 24px;
      border-radius: var(--radius-full);
      border: 2px solid var(--accent-primary);
      background: transparent;
      color: var(--accent-primary);
      font-size: 0.9rem;
      font-weight: 700;
      font-family: var(--font-sans);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.22s ease;
      letter-spacing: 0.01em;
      box-sizing: border-box;

      &:hover {
        background: var(--accent-primary);
        color: #fff;
        box-shadow: 0 4px 16px var(--accent-glow);
        transform: translateY(-1px);
      }
    }

    /* ── Modal ── */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.45);
      z-index: 1000;
      backdrop-filter: blur(2px);
      -webkit-backdrop-filter: blur(2px);
    }

    .modal-panel {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      max-width: 520px;
      background: var(--bg-secondary);
      z-index: 1001;
      overflow-y: auto;
      padding: 0;
      box-shadow: -8px 0 40px rgba(0,0,0,0.18);
      animation: slideInRight 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes slideInRight {
      from { transform: translateX(100%); }
      to   { transform: translateX(0); }
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px 28px 20px;
      border-bottom: 1px solid var(--border-color);
      position: sticky;
      top: 0;
      background: var(--bg-secondary);
      z-index: 2;
    }

    .modal-title {
      font-size: 1.3rem;
      font-family: var(--font-heading);
      font-weight: 800;
      color: var(--text-primary);
    }

    .modal-close-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-tertiary);
      cursor: pointer;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--danger, #dc2626);
        color: var(--danger, #dc2626);
        background: rgba(220, 38, 38, 0.06);
      }
    }

    .submit-form {
      padding: 24px 28px;
    }

    .form-input {
      width: 100%;
      padding: 11px 14px;
      border-radius: var(--radius-md);
      border: 2px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-primary);
      font-size: 0.9rem;
      font-family: var(--font-sans);
      outline: none;
      transition: border-color 0.2s ease;
      box-sizing: border-box;

      &:focus { border-color: var(--accent-primary); }
      &::placeholder { color: var(--text-tertiary); }
    }

    .form-select {
      appearance: none;
      -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b6b6b' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
      padding-right: 36px;
    }

    .required { color: var(--accent-primary); }

    .checkbox-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 8px 10px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      transition: all 0.15s ease;

      input[type="checkbox"] {
        accent-color: var(--accent-primary);
        width: 14px;
        height: 14px;
        flex-shrink: 0;
        cursor: pointer;
      }

      &:has(input:checked) {
        border-color: var(--accent-primary);
        background: rgba(177, 0, 14, 0.05);
        color: var(--accent-primary);
        font-weight: 600;
      }
    }

    .toggles-row {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 20px;
    }

    .toggle-item {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }

    .toggle-btn {
      position: relative;
      width: 40px;
      height: 22px;
      border-radius: var(--radius-full);
      border: none;
      background: var(--border-color);
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition: background 0.2s ease;

      &.on {
        background: var(--accent-primary);
        .toggle-knob { left: 20px; }
      }
    }

    .toggle-knob {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
      transition: left 0.2s ease;
    }

    .toggle-label {
      font-size: 0.87rem;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .form-error-msg {
      color: var(--danger, #dc2626);
      font-size: 0.85rem;
      margin-bottom: 16px;
      padding: 10px 14px;
      background: rgba(220, 38, 38, 0.06);
      border-radius: var(--radius-md);
      border: 1px solid rgba(220, 38, 38, 0.2);
    }

    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 8px;
    }

    /* ── Success state ── */
    .form-success {
      padding: 48px 28px;
      text-align: center;

      .success-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(16, 185, 129, 0.12);
        color: var(--success);
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        border: 2px solid rgba(16, 185, 129, 0.3);
      }

      h3 {
        font-size: 1.25rem;
        font-family: var(--font-heading);
        margin-bottom: 12px;
        color: var(--text-primary);
      }

      p {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 28px;
      }
    }

    @media (max-width: 768px) {
      .tools-layout { grid-template-columns: 1fr; }
      .filters-sidebar { position: relative; top: 0; }
      .modal-panel { max-width: 100%; }
      .checkbox-grid { grid-template-columns: 1fr; }
      .search-action-row { flex-direction: column; align-items: stretch; }
      .btn-submit-tool { width: 100%; justify-content: center; }
    }
  `],
})
export class ToolsListComponent {
  private readonly content = inject(ContentService);
  private readonly auth = inject(AuthService);
  private readonly submissions = inject(SubmissionsService);

  readonly allTools = this.content.getTools();
  readonly allPhases = ALL_PHASES;
  readonly allCategories = ALL_CATEGORIES;

  // ── Filter options ──
  readonly phases     = ['All', 'Strategy', 'Research', 'Ideation', 'Design', 'Testing', 'Audit'];
  readonly categories = ['All', 'AI Assistant', 'AI Search', 'AI Stack Combo', 'Research', 'Design', 'Testing', 'Analytics', 'Collaboration', 'Productivity', 'Audit', 'Communication', 'Speech-to-Text'];
  readonly pricingFilters  = ['All', 'Free Tier', 'Paid Only'];
  readonly safeFilters     = ['All', 'Client-Safe', 'Review Required'];
  readonly approvalFilters = ['All', 'No Approval Needed', 'Approval Required'];

  // ── Filter signals ──
  readonly phaseFilter    = signal('All');
  readonly phaseSearch    = signal('');
  readonly categoryFilter = signal('All');
  readonly pricingFilter  = signal('All');
  readonly safeFilter     = signal('All');
  readonly approvalFilter = signal('All');
  readonly search         = signal('');

  // ── Phase options filtered by inline search ──
  readonly filteredPhaseOptions = computed(() => {
    const q = this.phaseSearch().toLowerCase().trim();
    if (!q) return this.phases;
    return this.phases.filter(p => p === 'All' || p.toLowerCase().includes(q));
  });

  // ── Whether any filter is active (drives the × icon visibility) ──
  readonly hasActiveFilters = computed(() =>
    this.phaseFilter()    !== 'All' ||
    this.categoryFilter() !== 'All' ||
    this.pricingFilter()  !== 'All' ||
    this.safeFilter()     !== 'All' ||
    this.approvalFilter() !== 'All' ||
    this.search()         !== ''
  );

  // ── Filtered tools ──
  readonly filteredTools = computed(() => {
    const phase    = this.phaseFilter();
    const category = this.categoryFilter();
    const pricing  = this.pricingFilter();
    const safe     = this.safeFilter();
    const approval = this.approvalFilter();
    const q        = this.search().toLowerCase();

    return this.allTools.filter(t => {
      if (phase    !== 'All' && !t.phases.includes(phase))                       return false;
      if (category !== 'All' && t.category !== category)                         return false;
      if (pricing  === 'Free Tier'           && !t.freemium)                     return false;
      if (pricing  === 'Paid Only'           &&  t.freemium)                     return false;
      if (safe     === 'Client-Safe'         && !t.clientSafe)                   return false;
      if (safe     === 'Review Required'     &&  t.clientSafe)                   return false;
      if (approval === 'No Approval Needed'  &&  t.approvalRequired)             return false;
      if (approval === 'Approval Required'   && !t.approvalRequired)             return false;
      if (q && !t.name.toLowerCase().includes(q) &&
               !t.description.toLowerCase().includes(q) &&
               !t.category.toLowerCase().includes(q))                            return false;
      return true;
    });
  });

  clearAll(): void {
    this.phaseFilter.set('All');
    this.phaseSearch.set('');
    this.categoryFilter.set('All');
    this.pricingFilter.set('All');
    this.safeFilter.set('All');
    this.approvalFilter.set('All');
    this.search.set('');
  }

  // ── Submit Tool form ──
  readonly showForm       = signal(false);
  readonly formSubmitted  = signal(false);
  readonly formName       = signal('');
  readonly formCategory   = signal('');
  readonly formDescription = signal('');
  readonly formLink       = signal('');
  readonly formPhases     = signal<string[]>([]);
  readonly formFreemium   = signal(true);
  readonly formClientSafe = signal(false);
  readonly formApprovalRequired = signal(false);
  readonly formIsCombo    = signal(false);
  readonly formError      = signal('');

  openForm(): void { this.showForm.set(true); }

  closeForm(): void { this.showForm.set(false); }

  togglePhase(phase: string): void {
    this.formPhases.update(phases =>
      phases.includes(phase) ? phases.filter(p => p !== phase) : [...phases, phase]
    );
  }

  submitTool(event: Event): void {
    event.preventDefault();
    this.formError.set('');

    if (!this.formName().trim()) { this.formError.set('Tool name is required.'); return; }
    if (!this.formCategory()) { this.formError.set('Please select a category.'); return; }
    if (!this.formDescription().trim()) { this.formError.set('Description is required.'); return; }
    if (!this.formLink().trim()) { this.formError.set('Tool URL is required.'); return; }
    if (this.formPhases().length === 0) { this.formError.set('Please select at least one UX phase.'); return; }

    const user = this.auth.user();
    this.submissions.submitTool({
      name: this.formName().trim(),
      category: this.formCategory(),
      description: this.formDescription().trim(),
      link: this.formLink().trim(),
      phases: this.formPhases(),
      freemium: this.formFreemium(),
      clientSafe: this.formClientSafe(),
      approvalRequired: this.formApprovalRequired(),
      submittedBy: user?.email ?? 'anonymous',
    });
    this.formSubmitted.set(true);
  }

  resetForm(): void {
    this.formSubmitted.set(false);
    this.formName.set('');
    this.formCategory.set('');
    this.formDescription.set('');
    this.formLink.set('');
    this.formPhases.set([]);
    this.formFreemium.set(true);
    this.formClientSafe.set(false);
    this.formApprovalRequired.set(false);
    this.formIsCombo.set(false);
    this.formError.set('');
  }
}
