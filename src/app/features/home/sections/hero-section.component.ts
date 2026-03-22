import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>

      <div class="container hero-content">
        <div class="animate-fade-in" style="animation-delay: 0.1s">
          <div class="badge">Free Public Resource - Practitioner-First</div>
        </div>

        <h1 class="animate-fade-in" style="animation-delay: 0.2s">
          UX
          <br />
          <span class="subtitle-span">Knowledge Platform</span>
        </h1>

        <p class="hero-subtitle animate-fade-in" style="animation-delay: 0.3s">
          Workflow-grounded guidance for UX designers.
          Not vendor marketing. Not academic theory. Written by practitioners.
        </p>

        <div class="hero-ctas animate-fade-in" style="animation-delay: 0.4s">
          <a routerLink="/strategy-builder" class="btn-primary hero-btn-primary">
            Launch Strategy Builder
          </a>
          <a routerLink="/wiki" class="btn-secondary hero-btn-secondary">
            Explore Wiki
          </a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      overflow: hidden;
      padding: 100px 24px 80px;
      background: var(--bg-hero);
      background-size: 200% 200%;
      animation: gradientShift 12s ease infinite;
    }

    .floating-shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(40px);
    }

    .shape-1 {
      top: 10%;
      left: 5%;
      width: 300px;
      height: 300px;
      background: rgba(255, 255, 255, 0.05);
      filter: blur(40px);
      animation: float 6s ease-in-out infinite;
    }

    .shape-2 {
      bottom: 15%;
      right: 10%;
      width: 200px;
      height: 200px;
      background: rgba(255, 255, 255, 0.08);
      filter: blur(30px);
      animation: float 4s ease-in-out infinite 1s;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
    }

    .badge {
      display: inline-block;
      padding: 8px 20px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 24px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    h1 {
      font-size: clamp(2.2rem, 5vw, 4rem);
      font-weight: 800;
      color: #fff;
      max-width: 800px;
      margin: 0 auto 20px;
      line-height: 1.1;
      font-family: var(--font-heading);
    }

    .subtitle-span {
      opacity: 0.9;
    }

    .hero-subtitle {
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: rgba(255, 255, 255, 0.85);
      max-width: 600px;
      margin: 0 auto 40px;
      line-height: 1.7;
    }

    .hero-ctas {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero-btn-primary {
      background: #fff !important;
      color: #4f46e5 !important;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }

    .hero-btn-secondary {
      border-color: rgba(255, 255, 255, 0.5) !important;
      color: #fff !important;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }
  `],
})
export class HeroSectionComponent {}
