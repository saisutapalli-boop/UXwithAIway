import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-approach',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero -->
    <section class="approach-hero">
      <div class="container approach-hero-inner">
        <span class="section-label light">Our Methodology</span>
        <h1 class="approach-title">Incorporating Generative AI<br>into the UX Workflow</h1>
        <p class="approach-subtitle">
          How AI helps design teams work faster, better, and more effectively to deliver
          experiences that genuinely serve users - grounded in evidence, not hype.
        </p>
      </div>
    </section>

    <!-- Why AI in UX -->
    <section class="section-padding why-section">
      <div class="container">
        <span class="section-label">Why AI in UX</span>
        <h2 class="section-title">Four ways AI elevates UX practice</h2>
        <p class="section-subtitle">
          AI does not replace the designer. It removes friction, expands capacity, and
          surfaces insights that would take days to uncover manually.
        </p>

        <div class="why-grid">
          @for (item of whyItems; track item.title) {
            <div class="card why-card">
              <div class="why-icon">{{ item.icon }}</div>
              <h3 class="why-title">{{ item.title }}</h3>
              <p class="why-desc">{{ item.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Our Approach -->
    <section class="section-padding approach-section">
      <div class="container">
        <span class="section-label">Our Approach</span>
        <h2 class="section-title">How we evaluate and integrate AI tools</h2>
        <p class="section-subtitle">
          We explore, evaluate, and integrate selected AI tools based on six criteria - ensuring
          every recommendation is grounded in real-world design practice.
        </p>

        <div class="criteria-grid">
          @for (c of criteria; track c.title; let i = $index) {
            <div class="card criteria-card">
              <div class="criteria-number">{{ (i + 1).toString().padStart(2, '0') }}</div>
              <h3 class="criteria-title">{{ c.title }}</h3>
              <p class="criteria-desc">{{ c.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Impact -->
    <section class="section-padding impact-section">
      <div class="container">
        <span class="section-label">The Impact</span>
        <h2 class="section-title">What the evidence shows</h2>
        <div class="impact-stat-card card">
          <div class="stat-highlight">
            <span class="stat-number">40%</span>
            <div class="stat-info">
              <p class="stat-text">
                A McKinsey study indicates that integrating AI into design processes can boost
                productivity by up to 40%, enabling faster project turnarounds without
                compromising quality.
              </p>
              <span class="stat-source">Source: McKinsey & Company</span>
            </div>
          </div>
        </div>

        <div class="impact-grid">
          @for (item of impactItems; track item.title) {
            <div class="card impact-card">
              <div class="impact-icon">{{ item.icon }}</div>
              <h3 class="impact-title">{{ item.title }}</h3>
              <p class="impact-desc">{{ item.desc }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Strategy & Next Steps -->
    <section class="section-padding next-steps-section">
      <div class="container">
        <span class="section-label">Strategy & Next Steps</span>
        <h2 class="section-title">How we scale AI adoption</h2>
        <p class="section-subtitle">
          A structured, incremental approach to embedding AI into the design practice
          - starting with quick wins and building toward team-wide fluency.
        </p>

        <div class="steps-list">
          @for (step of nextSteps; track step.step; let i = $index) {
            <div class="card step-card">
              <div class="step-number" aria-hidden="true">{{ i + 1 }}</div>
              <div class="step-body">
                <h3 class="step-title">{{ step.step }}</h3>
                <p class="step-desc">{{ step.desc }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA row -->
    <section class="approach-cta">
      <div class="container approach-cta-inner">
        <div>
          <h2 class="cta-heading">Ready to apply these principles?</h2>
          <p class="cta-sub">Use the Strategy Builder to get a tailored AI workflow for your next project.</p>
        </div>
        <div class="cta-btns">
          <a routerLink="/strategy-builder" class="btn-primary">Launch Strategy Builder</a>
          <a routerLink="/wiki" class="btn-secondary">Explore Wiki</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Hero */
    .approach-hero {
      padding: 80px 24px 64px;
      background: var(--bg-hero);
      text-align: center;
    }

    .approach-hero-inner { max-width: 780px; margin: 0 auto; }

    .section-label.light {
      color: rgba(255,255,255,0.75);
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      display: block;
      margin-bottom: 14px;
    }

    .approach-title {
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      font-weight: 800;
      font-family: var(--font-heading);
      color: #fff;
      line-height: 1.2;
      margin-bottom: 20px;
    }

    .approach-subtitle {
      font-size: 1.05rem;
      color: rgba(255,255,255,0.82);
      line-height: 1.75;
      margin: 0;
    }

    /* Why section */
    .why-section { background: var(--bg-primary); }

    .why-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 24px;
      margin-top: 8px;
    }

    .why-card { padding: 32px 28px; }

    .why-icon { font-size: 2rem; margin-bottom: 14px; }

    .why-title {
      font-size: 1.05rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
      margin-bottom: 10px;
    }

    .why-desc {
      font-size: 0.9rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin: 0;
    }

    /* Approach / criteria */
    .approach-section { background: var(--bg-secondary); }

    .criteria-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 8px;
    }

    .criteria-card { padding: 28px 24px; }

    .criteria-number {
      font-size: 2rem;
      font-weight: 800;
      font-family: var(--font-heading);
      color: var(--accent-primary);
      opacity: 0.35;
      line-height: 1;
      margin-bottom: 12px;
    }

    .criteria-title {
      font-size: 1rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .criteria-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin: 0;
    }

    /* Impact */
    .impact-section { background: var(--bg-primary); }

    .impact-stat-card {
      padding: 36px 32px;
      margin-bottom: 32px;
      background: linear-gradient(135deg, rgba(177,0,14,0.06) 0%, rgba(50,55,60,0.06) 100%);
      border: 1px solid rgba(177,0,14,0.15);
    }

    .stat-highlight {
      display: flex;
      align-items: center;
      gap: 32px;
      flex-wrap: wrap;
    }

    .stat-number {
      font-size: 4rem;
      font-weight: 800;
      font-family: var(--font-heading);
      color: var(--accent-primary);
      line-height: 1;
      flex-shrink: 0;
    }

    .stat-text {
      font-size: 1rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin-bottom: 8px;
    }

    .stat-source {
      font-size: 0.78rem;
      color: var(--text-tertiary);
      font-style: italic;
    }

    .impact-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
    }

    .impact-card { padding: 24px; }

    .impact-icon { font-size: 1.6rem; margin-bottom: 10px; }

    .impact-title {
      font-size: 0.95rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
      margin-bottom: 8px;
    }

    .impact-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin: 0;
    }

    /* Next steps */
    .next-steps-section { background: var(--bg-secondary); }

    .steps-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 8px;
    }

    .step-card {
      padding: 24px 28px;
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }

    .step-number {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--accent-gradient);
      color: #fff;
      font-size: 0.9rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-family: var(--font-heading);
    }

    .step-title {
      font-size: 1rem;
      font-weight: 700;
      font-family: var(--font-heading);
      color: var(--text-primary);
      margin-bottom: 6px;
    }

    .step-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.7;
      margin: 0;
    }

    /* CTA */
    .approach-cta {
      padding: 64px 24px;
      background: var(--accent-gradient);
    }

    .approach-cta-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
      flex-wrap: wrap;
    }

    .cta-heading {
      font-size: clamp(1.4rem, 3vw, 1.8rem);
      font-weight: 800;
      font-family: var(--font-heading);
      color: #fff;
      margin-bottom: 8px;
    }

    .cta-sub {
      font-size: 0.95rem;
      color: rgba(255,255,255,0.82);
      margin: 0;
    }

    .cta-btns {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-primary {
      background: #fff !important;
      color: #b1000e !important;
    }

    .btn-secondary {
      border-color: rgba(255,255,255,0.5) !important;
      color: #fff !important;
    }

    @media (max-width: 640px) {
      .approach-cta-inner { flex-direction: column; align-items: flex-start; }
      .stat-highlight { flex-direction: column; gap: 16px; }
    }
  `],
})
export class ApproachComponent {
  readonly whyItems = [
    {
      icon: '\uD83D\uDCCA',
      title: 'Enhance User Experience',
      desc: 'AI tools can quickly analyze vast amounts of user data to identify patterns and trends that inform design decisions and improve the user experience at scale.',
    },
    {
      icon: '\uD83C\uDFA5',
      title: 'AI-Powered Content',
      desc: 'AI can optimize the design process by quickly creating videos, visualizations, and wireframes directly from designer ideas - compressing days of work into hours.',
    },
    {
      icon: '\u26A1',
      title: 'Automation',
      desc: 'The automation of repetitive tasks optimizes the research and design phases of UX, freeing designers to focus on creative judgment and stakeholder communication.',
    },
    {
      icon: '\uD83D\uDCCA',
      title: 'Improve Presentations',
      desc: 'AI can help reframe content, summarize core findings, and turn insights into easy-to-read, digestible infographics that resonate with non-design stakeholders.',
    },
  ];

  readonly criteria = [
    {
      title: 'Time Efficiency',
      desc: 'Measure how much time the AI tool saves compared to manual work. Only tools with demonstrable time savings enter the recommended stack.',
    },
    {
      title: 'Output Quality',
      desc: 'Assess whether AI-generated designs and outputs meet design standards with minimal adjustments. Speed without quality is not a win.',
    },
    {
      title: 'Seamless Integration',
      desc: 'Check if the tool fits into existing design workflows without extra setup overhead or context switching that negates the time saving.',
    },
    {
      title: 'User Experience Impact',
      desc: 'Analyze whether the tool enhances innovation, usability, creativity, and the ultimate experience delivered to end users.',
    },
    {
      title: 'Team Feedback',
      desc: 'Get feedback from designers on the tool\'s usability, learning curve, and day-to-day value. Adoption depends on real practitioner buy-in.',
    },
    {
      title: 'Cost-Effectiveness',
      desc: 'Weigh the tool\'s cost against the time and resources it saves. Freemium-first tools are prioritised for consultancy and fixed-bid contexts.',
    },
  ];

  readonly impactItems = [
    {
      icon: '\uD83E\uDD16',
      title: 'Automation',
      desc: 'AI automatically gathers and processes data faster, saving UX professionals time and resources on repetitive research and documentation tasks.',
    },
    {
      icon: '\uD83D\uDD2C',
      title: 'Better User Experience',
      desc: 'AI uncovers hidden insights - spotting patterns and trends in data that humans might overlook, leading to more evidence-based design decisions.',
    },
    {
      icon: '\u26A1',
      title: 'Rapid Content Creation',
      desc: 'AI enables rapid creation of videos, wireframes, visual designs, and prototypes from text prompts, speeding up artifact generation significantly.',
    },
    {
      icon: '\u2713',
      title: 'Improved Quality',
      desc: 'AI helps reduce design errors, leading to better quality and user experience. This cuts revision time, speeds up launch, and delivers competitive advantage.',
    },
    {
      icon: '\uD83D\uDCB0',
      title: 'Cost Saving',
      desc: 'Automated data analysis and content creation reduce design costs - particularly valuable in fixed-bid and consultancy engagements with tight budgets.',
    },
  ];

  readonly nextSteps = [
    {
      step: 'Form a Core Exploration Team',
      desc: 'Assemble a small team to explore AI tools and use cases. Start with 2-3 practitioners who are comfortable with experimentation and can champion adoption.',
    },
    {
      step: 'Identify Quick Wins and Pilot Opportunities',
      desc: 'Select one or two high-friction phases in your current workflow - research synthesis and audit delivery are the best starting points - and pilot AI tools there first.',
    },
    {
      step: 'Conduct Monthly Knowledge-Sharing Sessions',
      desc: 'Run regular internal sessions where team members share what worked, what failed, and what surprised them. Collective learning accelerates adoption.',
    },
    {
      step: 'Define Success Metrics and Track Impact',
      desc: 'Set baseline measurements before introducing AI tools - time per deliverable, revision cycles, stakeholder satisfaction. Track changes to build the business case.',
    },
    {
      step: 'Gradually Scale Adoption Across the Team',
      desc: 'Once quick wins are validated and documented, scale tool adoption incrementally. Avoid wholesale changes - layer AI into existing workflows phase by phase.',
    },
  ];
}
