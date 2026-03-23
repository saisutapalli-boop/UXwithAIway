import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface ToolRec {
  name: string;
  phase: string;
  freemium: boolean;
  clientSafe: boolean;
  timeSaving: string;
}

interface ReadingPathArticle {
  title: string;
  slug: string;
}

const PROJECT_TYPES = ['RFE (Request for Enhancement)', 'Initiative', 'UX Audit'];
const CONTRACT_TYPES = ['Fixed Bid', 'Time & Material', 'Retainer'];
const TIMELINES = ['Sprint (1\u20132 weeks)', 'Short-term (1\u20133 months)', 'Long-term (3 months+)'];
const TEAM_SIZES = ['Solo', 'Small (2\u20135)', 'Mid (6\u201315)', 'Enterprise (15+)'];
const ORG_TYPES = ['In-house Product', 'Service Design Consultancy', 'Agency', 'Freelance'];
const DESIGN_SYSTEM_OPTIONS = ['None', 'Partial / Inconsistent', 'Established'];

const ALL_STAGES = [
  'Problem Framing', 'Stakeholder Alignment', 'Secondary Research', 'Primary Research',
  'Insight Synthesis', 'UX Strategy & Direction', 'Ideation & Concepts',
  'Lo-fi Prototyping', 'Hi-fi Design & System Integration', 'Usability Testing',
  'A/B Testing', 'Heuristic Evaluation', 'Handoff & Documentation',
  'Measurement & Continuous Improvement',
];

const STEP_LABELS = ['Problem Framing', 'Project Matrix', 'Stage Selection'];

function getRecommendedStages(projectType: string, timeline: string): string[] {
  if (projectType.startsWith('UX Audit')) {
    return ['Problem Framing', 'Stakeholder Alignment', 'Secondary Research', 'Heuristic Evaluation', 'Handoff & Documentation'];
  }
  if (projectType.startsWith('RFE')) {
    return ['Problem Framing', 'Secondary Research', 'Primary Research', 'Insight Synthesis',
      'Ideation & Concepts', 'Lo-fi Prototyping', 'Usability Testing', 'Handoff & Documentation'];
  }
  // Initiative
  if (timeline.startsWith('Sprint')) {
    return ['Problem Framing', 'Secondary Research', 'Primary Research', 'Insight Synthesis',
      'Ideation & Concepts', 'Lo-fi Prototyping', 'Usability Testing'];
  }
  return ALL_STAGES;
}

function getToolStack(stages: string[], contract: string, org: string): ToolRec[] {
  const tools: ToolRec[] = [];
  const isFreemiumFirst = contract === 'Fixed Bid' || org === 'Freelance';

  if (stages.includes('Secondary Research')) {
    tools.push({ name: 'Perplexity', phase: 'Research', freemium: true, clientSafe: true, timeSaving: '~80%' });
    tools.push({ name: 'Elicit', phase: 'Research', freemium: true, clientSafe: true, timeSaving: '~60%' });
  }
  if (stages.includes('Primary Research')) {
    tools.push({ name: 'Claude', phase: 'Research', freemium: true, clientSafe: true, timeSaving: '~78%' });
    tools.push({ name: 'Otter.ai', phase: 'Transcription', freemium: true, clientSafe: true, timeSaving: '~70%' });
    if (!isFreemiumFirst) {
      tools.push({ name: 'Dovetail', phase: 'Analysis', freemium: true, clientSafe: false, timeSaving: '~65%' });
    }
  }
  if (stages.includes('Insight Synthesis')) {
    tools.push({ name: 'Notion AI', phase: 'Synthesis', freemium: true, clientSafe: true, timeSaving: '~60%' });
  }
  if (stages.includes('Ideation & Concepts')) {
    tools.push({ name: 'ChatGPT', phase: 'Ideation', freemium: true, clientSafe: true, timeSaving: '~50%' });
    tools.push({ name: 'Miro AI', phase: 'Clustering', freemium: true, clientSafe: true, timeSaving: '~40%' });
  }
  if (stages.includes('Lo-fi Prototyping') || stages.includes('Hi-fi Design & System Integration')) {
    tools.push({ name: 'v0 by Vercel', phase: 'Design', freemium: true, clientSafe: true, timeSaving: '~55%' });
    tools.push({ name: 'Figma AI', phase: 'Design', freemium: true, clientSafe: true, timeSaving: '~45%' });
  }
  if (stages.includes('Usability Testing') || stages.includes('A/B Testing')) {
    tools.push({ name: 'Maze', phase: 'Testing', freemium: true, clientSafe: true, timeSaving: '~60%' });
    tools.push({ name: 'Microsoft Clarity', phase: 'Analytics', freemium: true, clientSafe: true, timeSaving: '~50%' });
  }
  if (stages.includes('Heuristic Evaluation')) {
    tools.push({ name: 'Claude', phase: 'Audit', freemium: true, clientSafe: true, timeSaving: '~65%' });
    tools.push({ name: 'Screaming Frog', phase: 'Technical Audit', freemium: true, clientSafe: true, timeSaving: '~50%' });
  }
  return tools;
}

interface ActionPlan {
  now: string[];
  week1: string[];
  month1: string[];
}

interface SlideData {
  title: string;
  subtitle?: string;
  bullets: string[];
}

function getActionPlan(
  stages: string[], projectType: string, timeline: string,
  orgType: string, problemSource: string
): ActionPlan {
  const now: string[] = ['Define success metrics and share with the team', 'Set up shared workspace (Notion / Miro / Figma)'];
  const week1: string[] = [];
  const month1: string[] = [];

  if (stages.includes('Problem Framing') || stages.includes('Stakeholder Alignment')) {
    now.push('Schedule a 30-min stakeholder kickoff to align on problem scope');
    week1.push('Run problem framing workshop — map assumptions vs. knowns');
  }
  if (stages.includes('Secondary Research')) {
    now.push('Set up Perplexity / Elicit research prompts for desk research');
    week1.push('Synthesise secondary research into a 1-page landscape summary');
  }
  if (stages.includes('Primary Research')) {
    week1.push('Draft research plan: recruit 5–8 participants, prepare discussion guide');
    week1.push('Use Claude to generate interview questions from the problem statement');
    month1.push('Complete interview rounds and transcribe with Otter.ai');
  }
  if (stages.includes('Insight Synthesis')) {
    week1.push('Cluster findings with Miro AI affinity mapping');
    month1.push('Write insight statements — problem → insight → opportunity format');
  }
  if (stages.includes('Ideation & Concepts')) {
    month1.push('Run ideation sprint with ChatGPT for rapid concept generation');
    month1.push('Dot-vote on top 3 concepts with stakeholders');
  }
  if (stages.includes('Lo-fi Prototyping')) {
    month1.push('Build lo-fi wireframes in Figma or v0 by Vercel');
    month1.push('Validate prototype with 3–5 users before hi-fi investment');
  }
  if (stages.includes('Hi-fi Design & System Integration')) {
    month1.push('Apply design system tokens and hand off annotated specs');
  }
  if (stages.includes('Heuristic Evaluation')) {
    now.push('Use Claude to generate a heuristic evaluation checklist for the product');
    week1.push('Score product against Nielsen\'s 10 heuristics');
    week1.push('Prioritise issues: critical / major / minor');
  }
  if (stages.includes('Usability Testing') || stages.includes('A/B Testing')) {
    month1.push('Set up Maze unmoderated test or A/B experiment via Microsoft Clarity');
    month1.push('Report findings in a prioritised recommendation matrix');
  }
  if (stages.includes('Handoff & Documentation')) {
    month1.push('Produce annotated Figma specs and developer-ready documentation');
  }
  if (stages.includes('Measurement & Continuous Improvement')) {
    month1.push('Define north-star metric and set up analytics dashboard');
  }

  if (projectType.startsWith('UX Audit')) {
    now.unshift('Request access to live product and analytics data');
  }
  if (orgType === 'Service Design Consultancy') {
    now.unshift('Confirm client data-handling policy before using AI tools with user data');
  }
  if (problemSource === 'Business / Client') {
    now.push('Schedule user validation session before solution design begins');
  }
  if (timeline.startsWith('Sprint')) {
    month1.length = 0;
    month1.push('Wrap deliverables and present findings at sprint review');
  }

  return { now, week1, month1 };
}

function buildSlides(
  problem: string, problemSource: string, problemSourceHint: string,
  projectType: string, contractType: string, timeline: string,
  teamSize: string, orgType: string, designSystem: string,
  stages: string[], tools: ToolRec[], constraints: string[],
  actionPlan: ActionPlan, readingPath: ReadingPathArticle[]
): SlideData[] {
  const problemTitle = problem.length > 60 ? problem.slice(0, 57) + '…' : problem;
  return [
    {
      title: `UX Strategy: ${problemTitle}`,
      subtitle: `${orgType}  ·  ${projectType}  ·  ${timeline}`,
      bullets: [],
    },
    {
      title: 'The Problem',
      subtitle: `Identified by: ${problemSource}`,
      bullets: [problem, problemSourceHint].filter(Boolean),
    },
    {
      title: 'Project Context',
      subtitle: 'Project Matrix',
      bullets: [
        `Project Type: ${projectType}`,
        `Contract: ${contractType}`,
        `Timeline: ${timeline}`,
        `Team Size: ${teamSize}`,
        `Organisation: ${orgType}`,
        `Design System: ${designSystem}`,
      ],
    },
    {
      title: `Recommended Workflow  (${stages.length} Stages)`,
      subtitle: 'AI-assisted UX process',
      bullets: stages.map((s, i) => `${i + 1}. ${s}`),
    },
    {
      title: 'AI Tool Stack',
      subtitle: 'Tools matched to your context',
      bullets: tools.map(t => `${t.name}  –  ${t.phase}  (saves ${t.timeSaving})`),
    },
    ...(constraints.length > 0
      ? [{
          title: 'Constraints & Risks',
          subtitle: 'Surface these early with stakeholders',
          bullets: constraints,
        }]
      : []),
    {
      title: 'Action Plan — What To Do Now',
      subtitle: 'Immediate actions (Day 1)',
      bullets: actionPlan.now,
    },
    {
      title: 'Action Plan — Week 1',
      subtitle: 'First-week milestones',
      bullets: actionPlan.week1,
    },
    ...(actionPlan.month1.length > 0
      ? [{
          title: 'Action Plan — Month 1',
          subtitle: 'Delivery milestones',
          bullets: actionPlan.month1,
        }]
      : []),
    {
      title: 'Reading Path',
      subtitle: 'Learn the methods behind this strategy',
      bullets: readingPath.map((a, i) => `${i + 1}. ${a.title}`),
    },
  ];
}

function escapeSingleQuote(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function generateAppsScript(slides: SlideData[], presentationTitle: string): string {
  const slideLines: string[] = [];
  slides.forEach((slide, idx) => {
    if (idx === 0) {
      slideLines.push(`  // Slide 1 – Title`);
      slideLines.push(`  var s0 = pres.getSlides()[0];`);
      slideLines.push(`  s0.getShapes()[0].getText().setText('${escapeSingleQuote(slide.title)}');`);
      if (slide.subtitle) {
        slideLines.push(`  s0.getShapes()[1].getText().setText('${escapeSingleQuote(slide.subtitle)}');`);
      }
    } else {
      const sVar = `s${idx}`;
      slideLines.push(`  // Slide ${idx + 1}`);
      slideLines.push(`  var ${sVar} = pres.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);`);
      slideLines.push(`  ${sVar}.getShapes()[0].getText().setText('${escapeSingleQuote(slide.title)}');`);
      const body = [slide.subtitle, ...slide.bullets].filter(Boolean).join('\\n');
      slideLines.push(`  ${sVar}.getShapes()[1].getText().setText('${escapeSingleQuote(body)}');`);
    }
    slideLines.push('');
  });

  return `// ─────────────────────────────────────────────────
// UX Strategy Builder — Google Slides Generator
// Generated by UX with AI
//
// HOW TO USE:
//  1. Go to https://script.google.com
//  2. Create a new project
//  3. Paste this entire script
//  4. Click ▶ Run (you may be asked to authorise)
//  5. Open the URL logged in the Execution log
// ─────────────────────────────────────────────────

function createUXStrategyPresentation() {
  var pres = SlidesApp.create('${escapeSingleQuote(presentationTitle)}');

${slideLines.join('\n')}
  Logger.log('✅ Presentation created: ' + pres.getUrl());
  Logger.log('Open it here → ' + pres.getUrl());
}
`;
}

function getConstraints(projectType: string, contract: string, org: string, designSystem: string): string[] {
  const constraints: string[] = [];
  if (projectType.startsWith('RFE')) {
    constraints.push('Warning: Solving the stated problem rather than the real problem. Validate with users before designing.');
  }
  if (projectType.startsWith('Initiative')) {
    constraints.push('Warning: Stakeholder alignment is the highest-risk phase. Build consensus before design begins.');
  }
  if (contract === 'Fixed Bid') {
    constraints.push('Fixed Bid: Max 5 interviews recommended. All tools default to freemium. Include scope risk section.');
  }
  if (org === 'Service Design Consultancy') {
    constraints.push('Consultancy: Verify client data handling requirements before using any AI tool with user data.');
    constraints.push('Async-first: Shift to async methods by default. Stakeholder access typically limited to 2\u20133 touchpoints per phase.');
    constraints.push('Procurement: No tool requiring enterprise procurement appears without a freemium alternative.');
    constraints.push('Stakeholder limits: Methods designed around limited availability, not against it.');
  }
  if (designSystem === 'None') {
    constraints.push('No design system: Include lightweight component foundation step. AI-assisted pattern identification from brand materials.');
  } else if (designSystem === 'Partial / Inconsistent') {
    constraints.push('Partial system: Audit-first before design. Use Figma AI for inconsistency detection.');
  } else if (designSystem === 'Established') {
    constraints.push('Established system: AI-governed compliance. Use Claude Code for token audit across file library.');
  }
  return constraints;
}

@Component({
  selector: 'app-strategy-builder',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './strategy-builder.component.html',
  styleUrl: './strategy-builder.component.scss',
})
export class StrategyBuilderComponent {
  private authService = inject(AuthService);

  // Auth state
  readonly isLoggedIn = computed(() => this.authService.isLoggedIn());
  readonly currentUser = computed(() => this.authService.user());

  // Constants exposed to template
  readonly projectTypes = PROJECT_TYPES;
  readonly contractTypes = CONTRACT_TYPES;
  readonly timelines = TIMELINES;
  readonly teamSizes = TEAM_SIZES;
  readonly orgTypes = ORG_TYPES;
  readonly designSystemOptions = DESIGN_SYSTEM_OPTIONS;
  readonly allStages = ALL_STAGES;
  readonly stepLabels = STEP_LABELS;

  // Step 1
  readonly step = signal(1);
  readonly problem = signal('');
  readonly problemSource = signal('');

  // Step 2
  readonly projectType = signal('');
  readonly contractType = signal('');
  readonly timeline = signal('');
  readonly teamSize = signal('');
  readonly orgType = signal('');
  readonly designSystem = signal('');

  // Step 3
  readonly selectedStages = signal<string[]>([]);
  private stagesInitialized = false;

  // Computed
  readonly canProceedStep1 = computed(() =>
    this.problem().trim().length > 5 && this.problemSource() !== ''
  );

  readonly canProceedStep2 = computed(() =>
    !!(this.projectType() && this.contractType() && this.timeline() &&
       this.teamSize() && this.orgType() && this.designSystem())
  );

  readonly recommended = computed(() =>
    getRecommendedStages(this.projectType(), this.timeline())
  );

  readonly toolStack = computed(() =>
    getToolStack(this.selectedStages(), this.contractType(), this.orgType())
  );

  readonly constraints = computed(() =>
    getConstraints(this.projectType(), this.contractType(), this.orgType(), this.designSystem())
  );

  readonly problemSourceHint = computed(() => {
    switch (this.problemSource()) {
      case 'Business / Client':
        return 'A business-identified problem requires validation research before design begins.';
      case 'End Users':
        return 'A user-identified problem can move faster into solution space.';
      case 'Both':
        return 'Both: Stakeholder alignment work should come first.';
      default:
        return '';
    }
  });

  readonly scriptCopied = signal(false);
  readonly showSlidePreview = signal(false);

  readonly readingPath = computed((): ReadingPathArticle[] => {
    const stages = this.selectedStages();
    const articles: ReadingPathArticle[] = [
      { title: 'Introduction to AI & ML', slug: 'introduction-to-ai-ml' },
    ];
    if (stages.includes('Secondary Research') || stages.includes('Primary Research')) {
      articles.push(
        { title: 'AI UX for Strategy', slug: 'ai-ux-for-strategy' },
        { title: 'Primary Research', slug: 'primary-research' },
        { title: 'Secondary Research', slug: 'secondary-research' },
      );
    }
    if (stages.includes('Ideation & Concepts')) {
      articles.push({ title: 'Ideation & Brainstorming', slug: 'ideation-brainstorming' });
    }
    if (stages.includes('Lo-fi Prototyping') || stages.includes('Hi-fi Design & System Integration')) {
      articles.push({ title: 'Design & Prototyping', slug: 'design-prototyping' });
    }
    if (stages.includes('Usability Testing') || stages.includes('A/B Testing')) {
      articles.push({ title: 'Usability Testing & A/B', slug: 'usability-testing' });
    }
    if (stages.includes('Heuristic Evaluation')) {
      articles.push({ title: 'Heuristic Evaluation & UX Audit', slug: 'heuristic-evaluation' });
    }
    return articles;
  });

  readonly actionPlan = computed(() =>
    getActionPlan(this.selectedStages(), this.projectType(), this.timeline(), this.orgType(), this.problemSource())
  );

  readonly slides = computed(() =>
    buildSlides(
      this.problem(), this.problemSource(), this.problemSourceHint(),
      this.projectType(), this.contractType(), this.timeline(),
      this.teamSize(), this.orgType(), this.designSystem(),
      this.selectedStages(), this.toolStack(), this.constraints(),
      this.actionPlan(), this.readingPath()
    )
  );

  readonly appsScript = computed(() => {
    const title = `UX Strategy: ${this.problem().slice(0, 60)}`;
    return generateAppsScript(this.slides(), title);
  });

  readonly matrixAxes = computed(() => [
    { label: 'Project Type', options: this.projectTypes, value: this.projectType, setter: (v: string) => this.projectType.set(v) },
    { label: 'Contract Type', options: this.contractTypes, value: this.contractType, setter: (v: string) => this.contractType.set(v) },
    { label: 'Timeline', options: this.timelines, value: this.timeline, setter: (v: string) => this.timeline.set(v) },
    { label: 'Team Size', options: this.teamSizes, value: this.teamSize, setter: (v: string) => this.teamSize.set(v) },
    { label: 'Organisation Type', options: this.orgTypes, value: this.orgType, setter: (v: string) => this.orgType.set(v) },
    { label: 'Design System Maturity', options: this.designSystemOptions, value: this.designSystem, setter: (v: string) => this.designSystem.set(v) },
  ]);

  goToStep(s: number): void {
    if (s === 3 && !this.stagesInitialized) {
      this.selectedStages.set(getRecommendedStages(this.projectType(), this.timeline()));
      this.stagesInitialized = true;
    }
    this.step.set(s);
  }

  toggleStage(stage: string): void {
    this.selectedStages.update(prev =>
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
  }

  copyScript(): void {
    navigator.clipboard.writeText(this.appsScript()).then(() => {
      this.scriptCopied.set(true);
      setTimeout(() => this.scriptCopied.set(false), 3000);
    });
  }

  resetAll(): void {
    this.step.set(1);
    this.problem.set('');
    this.problemSource.set('');
    this.projectType.set('');
    this.contractType.set('');
    this.timeline.set('');
    this.teamSize.set('');
    this.orgType.set('');
    this.designSystem.set('');
    this.selectedStages.set([]);
    this.stagesInitialized = false;
  }
}
