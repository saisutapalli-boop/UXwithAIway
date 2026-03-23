import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';

@Component({
  selector: 'app-glossary',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Breadcrumb -->
    <div class="breadcrumb-bar">
      <div class="container">
        <nav class="breadcrumb">
          <a routerLink="/about" class="breadcrumb-link">About</a>
          <span class="breadcrumb-sep">›</span>
          <span class="breadcrumb-current">Glossary</span>
        </nav>
      </div>
    </div>

    <!-- Header -->
    <section class="glossary-header">
      <div class="container text-center">
        <span class="section-label">Reference</span>
        <h1 class="section-title">Glossary</h1>
        <p class="section-subtitle centered">
          {{ allTerms.length }} AI and UX terms defined in plain language.
        </p>

        <input
          type="text"
          class="search-input"
          [value]="search()"
          (input)="search.set($any($event.target).value)"
          placeholder="Search terms..."
        />
      </div>
    </section>

    <section class="section-padding glossary-body">
      <div class="container glossary-container">

        <!-- Letter quick nav -->
        <div class="letter-nav">
          @for (letter of letters(); track letter) {
            <a [routerLink]="[]" [fragment]="'letter-' + letter" class="letter-circle">{{ letter }}</a>
          }
        </div>

        @for (letter of letters(); track letter) {
          <div [id]="'letter-' + letter" class="letter-group">
            <h2 class="letter-heading">{{ letter }}</h2>
            <div class="terms-list">
              @for (term of groups()[letter]; track term.term) {
                <div class="card term-card">
                  <h3 class="term-name">{{ term.term }}</h3>
                  <p class="term-def">{{ term.definition }}</p>
                </div>
              }
            </div>
          </div>
        }

        @if (filtered().length === 0) {
          <div class="empty-state">
            <p>No terms match your search.</p>
          </div>
        }

      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }

    .text-center { text-align: center; }
    .centered { margin: 0 auto 28px; }

    /* ── Breadcrumb ── */
    .breadcrumb-bar {
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
      padding: 12px 24px;
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .breadcrumb-link {
      font-size: 0.84rem;
      color: var(--accent-primary);
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.2s ease;

      &:hover { opacity: 0.75; }
    }

    .breadcrumb-sep {
      font-size: 0.84rem;
      color: var(--text-tertiary);
    }

    .breadcrumb-current {
      font-size: 0.84rem;
      color: var(--text-secondary);
      font-weight: 600;
    }

    /* ── Header ── */
    .glossary-header {
      padding: 48px 24px 32px;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border-color);
    }

    .search-input {
      width: 100%;
      max-width: 420px;
      padding: 14px 20px;
      border-radius: var(--radius-full);
      border: 2px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-primary);
      font-size: 0.95rem;
      outline: none;
      transition: border-color 0.2s ease;
      box-sizing: border-box;

      &:focus { border-color: var(--accent-primary); }
    }

    /* ── Body ── */
    .glossary-body { background: var(--bg-primary); }
    .glossary-container { max-width: 860px; }

    .letter-nav {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 32px;
      justify-content: center;
    }

    .letter-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 700;
      background: var(--bg-tertiary);
      color: var(--accent-primary);
      text-decoration: none;
      transition: all 0.2s ease;

      &:hover { background: var(--accent-primary); color: #fff; }
    }

    .letter-group { margin-bottom: 32px; }

    .letter-heading {
      font-size: 1.5rem;
      font-family: var(--font-heading);
      color: var(--accent-primary);
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--border-color);
    }

    .terms-list { display: flex; flex-direction: column; gap: 12px; }

    .term-card { padding: 20px; }

    .term-name {
      font-size: 1rem;
      font-weight: 700;
      margin-bottom: 6px;
      font-family: var(--font-heading);
      color: var(--text-primary);
    }

    .term-def {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin: 0;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;

      p { color: var(--text-tertiary); font-size: 1rem; margin: 0; }
    }
  `],
})
export class GlossaryComponent {
  private readonly contentService = inject(ContentService);

  readonly allTerms = this.contentService.getGlossaryTerms();
  readonly search = signal('');

  readonly filtered = computed(() => {
    const q = this.search().toLowerCase();
    if (!q) return this.allTerms;
    return this.allTerms.filter(
      t => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
    );
  });

  readonly sorted = computed(() =>
    [...this.filtered()].sort((a, b) => a.term.localeCompare(b.term))
  );

  readonly groups = computed(() => {
    const map: Record<string, typeof this.allTerms> = {};
    for (const t of this.sorted()) {
      const letter = t.term[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(t);
    }
    return map;
  });

  readonly letters = computed(() =>
    Object.keys(this.groups()).sort()
  );
}
