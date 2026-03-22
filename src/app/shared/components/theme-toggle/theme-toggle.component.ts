import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { LucideAngularModule, Moon, Sun } from 'lucide-angular';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="theme-toggle"
      (click)="themeService.toggle()"
      [attr.aria-label]="themeService.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      @if (themeService.theme() === 'dark') {
        <lucide-icon name="sun"></lucide-icon>
      } @else {
        <lucide-icon name="moon"></lucide-icon>
      }
    </button>
  `,
  styles: [`
    .theme-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: var(--radius-full);
      border: 1px solid var(--border-color);
      background: var(--bg-secondary);
      cursor: pointer;
      color: var(--text-primary);
      transition: all 0.2s ease;

      &:hover {
        background: var(--bg-tertiary);
        border-color: var(--accent-primary);
        color: var(--accent-primary);
      }
    }
  `],
})
export class ThemeToggleComponent {
  readonly themeService = inject(ThemeService);
}
