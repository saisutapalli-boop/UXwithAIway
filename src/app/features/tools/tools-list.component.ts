import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';

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
          {{ allTools.length }}+ tools curated by practitioners - with honest assessments, freemium flags, and client-safety ratings.
        </p>

        <input
          type="text"
          [value]="search()"
          (input)="search.set($any($event.target).value)"
          placeholder="Search tools..."
          class="search-input"
        />
      </div>
    </section>

    <!-- Main -->
    <section class="section-padding tools-main">
      <div class="container">
        <div class="tools-layout">
          <!-- Sidebar Filters -->
          <aside class="card filters-sidebar">
            <h3 class="filters-title">Filters</h3>

            <div class="filter-group">
              <label class="filter-label">UX Phase</label>
              <div class="filter-options">
                @for (opt of phases; track opt) {
                  <button
                    class="filter-option"
                    [class.active]="phaseFilter() === opt"
                    (click)="phaseFilter.set(opt)"
                  >{{ opt }}</button>
                }
              </div>
            </div>

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

            <div class="filter-group">
              <label class="filter-label">Skill Level</label>
              <div class="filter-options">
                @for (opt of skillFilters; track opt) {
                  <button
                    class="filter-option"
                    [class.active]="skillFilter() === opt"
                    (click)="skillFilter.set(opt)"
                  >{{ opt }}</button>
                }
              </div>
            </div>

            <button class="clear-btn" (click)="clearAll()">Clear All Filters</button>
          </aside>

          <!-- Tool Grid -->
          <div class="tools-grid-wrapper">
            <p class="tools-count">Showing {{ filteredTools().length }} of {{ allTools.length }} tools</p>
            <div class="tools-grid">
              @for (t of filteredTools(); track t.slug) {
                <a [routerLink]="['/tools', t.slug]" class="tool-card-link">
                  <div class="card tool-card">
                    <div class="tool-card-top">
                      <h3 class="tool-name">{{ t.name }}</h3>
                      <span class="tool-category">{{ t.category }}</span>
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
                        @if (t.clientSafe) {
                          &#10003; Client-Safe
                        } @else {
                          &#9888; Review Required
                        }
                      </span>
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

    .tools-header-content {
      text-align: center;
    }

    .section-subtitle {
      margin: 0 auto 32px;
    }

    .search-input {
      width: 100%;
      max-width: 480px;
      padding: 14px 20px;
      border-radius: var(--radius-full);
      border: 2px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-primary);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .search-input:focus {
      border-color: var(--accent-primary);
    }

    .tools-main {
      background: var(--bg-primary);
    }

    .tools-layout {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: 32px;
      align-items: start;
    }

    .filters-sidebar {
      padding: 24px;
      position: sticky;
      top: 96px;
    }

    .filters-title {
      font-size: 1rem;
      font-family: var(--font-heading);
      margin-bottom: 20px;
      color: var(--text-primary);
    }

    .filter-group {
      margin-bottom: 20px;
    }

    .filter-label {
      display: block;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-tertiary);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .filter-options {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .filter-option {
      padding: 8px 12px;
      border-radius: var(--radius-sm);
      border: none;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      text-align: left;
      background: transparent;
      color: var(--text-secondary);
      transition: all 0.2s ease;
    }

    .filter-option.active {
      background: rgba(99, 102, 241, 0.1);
      color: var(--accent-primary);
    }

    .clear-btn {
      width: 100%;
      padding: 10px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: transparent;
      color: var(--text-secondary);
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s ease;
    }

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

    .tool-card-link {
      text-decoration: none;
    }

    .tool-card {
      padding: 24px;
      height: 100%;
    }

    .tool-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .tool-name {
      font-size: 1.1rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .tool-category {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: var(--radius-full);
      background: var(--bg-tertiary);
      color: var(--text-tertiary);
    }

    .tool-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.6;
      margin-bottom: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .tool-phases {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    .phase-badge {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: var(--radius-full);
      background: rgba(99, 102, 241, 0.08);
      color: var(--accent-primary);
    }

    .tool-status-badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .status-badge {
      font-size: 0.7rem;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: var(--radius-full);
    }

    .free-badge {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success);
    }

    .safe-badge {
      background: rgba(16, 185, 129, 0.1);
      color: var(--success);
    }

    .review-badge {
      background: rgba(245, 158, 11, 0.1);
      color: var(--warning);
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
    }

    .empty-state p {
      color: var(--text-tertiary);
      font-size: 1rem;
    }

    @media (max-width: 768px) {
      .tools-layout {
        grid-template-columns: 1fr;
      }

      .filters-sidebar {
        position: relative;
        top: 0;
      }
    }
  `],
})
export class ToolsListComponent {
  private readonly content = inject(ContentService);

  readonly allTools = this.content.getTools();

  readonly phases = ['All', 'Strategy', 'Research', 'Ideation', 'Design', 'Testing', 'Audit'];
  readonly pricingFilters = ['All', 'Free Tier', 'Paid Only'];
  readonly safeFilters = ['All', 'Client-Safe', 'Review Required'];
  readonly skillFilters = ['All', 'Junior', 'Mid', 'Senior'];

  readonly phaseFilter = signal('All');
  readonly pricingFilter = signal('All');
  readonly safeFilter = signal('All');
  readonly skillFilter = signal('All');
  readonly search = signal('');

  readonly filteredTools = computed(() => {
    const phase = this.phaseFilter();
    const pricing = this.pricingFilter();
    const safe = this.safeFilter();
    const skill = this.skillFilter();
    const q = this.search().toLowerCase();

    return this.allTools.filter(t => {
      if (phase !== 'All' && !t.phases.includes(phase)) return false;
      if (pricing === 'Free Tier' && !t.freemium) return false;
      if (pricing === 'Paid Only' && t.freemium) return false;
      if (safe === 'Client-Safe' && !t.clientSafe) return false;
      if (safe === 'Review Required' && t.clientSafe) return false;
      if (skill !== 'All' && !t.skillLevels.includes(skill.toLowerCase())) return false;
      if (q && !t.name.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      return true;
    });
  });

  clearAll(): void {
    this.phaseFilter.set('All');
    this.pricingFilter.set('All');
    this.safeFilter.set('All');
    this.skillFilter.set('All');
    this.search.set('');
  }
}
