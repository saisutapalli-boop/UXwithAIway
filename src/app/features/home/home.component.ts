import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroSectionComponent } from './sections/hero-section.component';
import { FeaturesSectionComponent } from './sections/features-section.component';
import { ImpactMetricsSectionComponent } from './sections/impact-metrics-section.component';
import { CtaSectionComponent } from './sections/cta-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroSectionComponent,
    FeaturesSectionComponent,
    ImpactMetricsSectionComponent,
    CtaSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
