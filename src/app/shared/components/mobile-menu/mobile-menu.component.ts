import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen) {
      <div class="backdrop" (click)="close()"></div>
      <nav class="mobile-menu" [class.open]="isOpen">
        <div class="menu-header">
          <a routerLink="/" class="logo" (click)="close()">
            <div class="logo-icon">UX</div>
            <span class="logo-text">UXwithAIway</span>
          </a>
          <button class="close-btn" (click)="close()" aria-label="Close menu">
            <lucide-icon name="x"></lucide-icon>
          </button>
        </div>
        <div class="menu-links">
          @for (link of links; track link.href) {
            <a
              [routerLink]="link.href"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: link.href === '/' }"
              class="menu-link"
              (click)="close()"
            >{{ link.label }}</a>
          }
        </div>
      </nav>
    }
  `,
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  @Input() isOpen = false;
  @Input() links: { href: string; label: string }[] = [];
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
