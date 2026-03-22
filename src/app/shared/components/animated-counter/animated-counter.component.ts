import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  OnInit,
  OnDestroy,
  signal,
  inject,
  NgZone,
} from '@angular/core';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="counter">{{ displayValue() }}{{ suffix }}</span>`,
  styles: [`
    .counter {
      font-variant-numeric: tabular-nums;
    }
  `],
})
export class AnimatedCounterComponent implements OnInit, OnDestroy {
  @Input({ required: true }) value = 0;
  @Input() suffix = '';

  readonly displayValue = signal(0);

  private readonly el = inject(ElementRef);
  private readonly ngZone = inject(NgZone);
  private observer: IntersectionObserver | null = null;
  private animationId: number | null = null;
  private hasAnimated = false;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.animate();
          }
        },
        { threshold: 0.1 }
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private animate(): void {
    const duration = 1500;
    const startTime = performance.now();
    const target = this.value;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Cubic ease-out: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      this.ngZone.run(() => {
        this.displayValue.set(current);
      });

      if (progress < 1) {
        this.animationId = requestAnimationFrame(step);
      }
    };

    this.animationId = requestAnimationFrame(step);
  }
}
