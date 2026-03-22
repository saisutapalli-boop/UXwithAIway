import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  NgZone,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true,
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  /** Threshold(s) at which to trigger. Default: 0.1 */
  @Input() intersectionThreshold: number | number[] = 0.1;

  /** Root margin string (e.g., '0px 0px -50px 0px'). Default: '0px' */
  @Input() intersectionRootMargin = '0px';

  /** If true, only emit once and then disconnect. Default: true */
  @Input() intersectionOnce = true;

  /** Emits true when element enters viewport, false when it leaves. */
  @Output() intersected = new EventEmitter<boolean>();

  private readonly el = inject(ElementRef);
  private readonly ngZone = inject(NgZone);
  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.ngZone.run(() => {
              this.intersected.emit(entry.isIntersecting);
            });

            if (entry.isIntersecting && this.intersectionOnce) {
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: this.intersectionThreshold,
          rootMargin: this.intersectionRootMargin,
        }
      );
      this.observer.observe(this.el.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
