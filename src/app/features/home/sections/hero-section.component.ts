import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
      <div class="glow glow-3"></div>
      <div class="grid-overlay"></div>

      <div class="container hero-content">
        <div class="animate-fade-in" style="animation-delay: 0.1s">
          <div class="badge">
            <span class="badge-dot"></span>
            Built with AI · Led by practitioners
          </div>
        </div>

        <h1 class="animate-fade-in" style="animation-delay: 0.2s">
          The UX Strategy Builder
          <br />
          <span class="subtitle-span">for AI-native workflows.</span>
        </h1>

        <p class="hero-subtitle animate-fade-in" style="animation-delay: 0.3s">
          Answer three prompts. Get a tailored workflow, a curated AI tool stack,
          and an action plan you can ship to stakeholders — in minutes, not weeks.
        </p>

        <div class="hero-ctas animate-fade-in" style="animation-delay: 0.4s">
          <a routerLink="/strategy-builder" class="btn-primary hero-btn-primary">
            Launch Strategy Builder
            <span class="arrow">↗</span>
          </a>
          <a routerLink="/wiki" class="btn-secondary hero-btn-secondary">
            Explore the Wiki
          </a>
        </div>

        <div class="proof-strip animate-fade-in" style="animation-delay: 0.5s">
          <div class="proof-stat">
            <div class="proof-num">3 min</div>
            <div class="proof-label">to a complete strategy</div>
          </div>
          <div class="proof-divider"></div>
          <div class="proof-stat">
            <div class="proof-num">26</div>
            <div class="proof-label">UX workflow stages</div>
          </div>
          <div class="proof-divider"></div>
          <div class="proof-stat">
            <div class="proof-num">50+</div>
            <div class="proof-label">curated AI tools</div>
          </div>
          <div class="proof-divider"></div>
          <div class="proof-stat">
            <div class="proof-num">~70%</div>
            <div class="proof-label">research time saved</div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      overflow: hidden;
      padding: 120px 24px 96px;
      background:
        radial-gradient(ellipse at 20% 10%, rgba(124, 58, 237, 0.22) 0%, transparent 45%),
        radial-gradient(ellipse at 80% 0%, rgba(59, 130, 246, 0.18) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 100%, rgba(177, 0, 14, 0.28) 0%, transparent 55%),
        linear-gradient(180deg, #07060d 0%, #0b0a14 55%, #110814 100%);
    }

    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
      background-size: 48px 48px;
      mask-image: radial-gradient(ellipse at center, #000 0%, transparent 70%);
      pointer-events: none;
    }

    .glow {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }

    .glow-1 {
      top: -80px;
      left: -60px;
      width: 420px;
      height: 420px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.55) 0%, transparent 70%);
      animation: float 8s ease-in-out infinite;
    }

    .glow-2 {
      top: 20%;
      right: -80px;
      width: 360px;
      height: 360px;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, transparent 70%);
      animation: float 10s ease-in-out infinite 1.5s;
    }

    .glow-3 {
      bottom: -120px;
      left: 30%;
      width: 480px;
      height: 480px;
      background: radial-gradient(circle, rgba(177, 0, 14, 0.45) 0%, transparent 70%);
      animation: float 12s ease-in-out infinite 0.8s;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: var(--radius-full);
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255,255,255,0.85);
      font-size: 0.82rem;
      font-weight: 500;
      letter-spacing: 0.02em;
      margin-bottom: 28px;
      backdrop-filter: blur(14px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #4ade80;
      box-shadow: 0 0 8px rgba(74, 222, 128, 0.8);
    }

    h1 {
      font-size: clamp(2.4rem, 5.6vw, 4.4rem);
      font-weight: 700;
      color: #fff;
      max-width: 900px;
      margin: 0 auto 22px;
      line-height: 1.08;
      letter-spacing: -0.02em;
      font-family: var(--font-heading);
    }

    .subtitle-span {
      background: linear-gradient(135deg, #c4b5fd 0%, #93c5fd 50%, #fca5a5 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-subtitle {
      font-size: clamp(1rem, 1.6vw, 1.15rem);
      color: rgba(255, 255, 255, 0.68);
      max-width: 620px;
      margin: 0 auto 40px;
      line-height: 1.7;
    }

    .hero-ctas {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 64px;
    }

    .hero-btn-primary {
      display: inline-flex !important;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #6366f1 0%, #3b82f6 100%) !important;
      color: #fff !important;
      border: none !important;
      box-shadow: 0 8px 32px rgba(99, 102, 241, 0.45), inset 0 1px 0 rgba(255,255,255,0.25);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .hero-btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 12px 40px rgba(99, 102, 241, 0.6), inset 0 1px 0 rgba(255,255,255,0.3);
    }

    .arrow {
      font-size: 1rem;
      opacity: 0.9;
    }

    .hero-btn-secondary {
      background: rgba(255,255,255,0.04) !important;
      border: 1px solid rgba(255, 255, 255, 0.18) !important;
      color: rgba(255,255,255,0.9) !important;
      backdrop-filter: blur(10px);
    }

    .hero-btn-secondary:hover {
      background: rgba(255,255,255,0.08) !important;
    }

    .proof-strip {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 36px;
      flex-wrap: wrap;
      padding: 20px 28px;
      max-width: 820px;
      margin: 0 auto;
      background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      backdrop-filter: blur(16px);
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
    }

    .proof-stat {
      text-align: center;
    }

    .proof-num {
      font-family: var(--font-heading);
      font-size: 1.5rem;
      font-weight: 700;
      color: #fff;
      letter-spacing: -0.01em;
      line-height: 1.1;
    }

    .proof-label {
      font-size: 0.78rem;
      color: rgba(255,255,255,0.55);
      margin-top: 4px;
      letter-spacing: 0.02em;
    }

    .proof-divider {
      width: 1px;
      height: 32px;
      background: linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent);
    }

    @media (max-width: 640px) {
      .proof-divider { display: none; }
      .proof-strip { gap: 18px; padding: 16px; }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0) translateX(0); }
      50% { transform: translateY(-28px) translateX(10px); }
    }
  `],
})
export class HeroSectionComponent {}
