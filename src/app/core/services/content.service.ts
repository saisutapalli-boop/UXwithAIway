import { Injectable } from '@angular/core';
import { WikiSection, WikiSectionContent } from '../models/wiki-section.model';
import { Tool } from '../models/tool.model';
import { GlossaryTerm } from '../models/glossary-term.model';
import { ImpactMetric, PhaseComparison } from '../models/impact-metric.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly wikiSections: WikiSection[] = [
    { id: '01', slug: 'introduction-to-ai-ml', title: 'Introduction to AI & ML', description: 'The intellectual foundation - history, LLMs, GANs, and what designers must know to evaluate AI tools critically.', icon: '\uD83E\uDDE0', skillLevels: ['junior', 'mid', 'senior'], color: '#6366f1' },
    { id: '02', slug: 'ai-ux-for-strategy', title: 'AI UX for Strategy', description: 'Problem brief synthesis, competitive landscape research, opportunity mapping, and assumption stress-testing with AI.', icon: '\uD83C\uDFAF', skillLevels: ['mid', 'senior'], color: '#8b5cf6' },
    { id: '03', slug: 'primary-research', title: 'Primary Research', description: 'AI-assisted interview guides, transcription, pattern identification, and insight synthesis across user interviews.', icon: '\uD83D\uDD0D', skillLevels: ['junior', 'mid', 'senior'], color: '#a855f7' },
    { id: '04', slug: 'secondary-research', title: 'Secondary Research', description: 'Cited web research, academic paper synthesis, trend signals, and structured competitive landscape briefs.', icon: '\uD83D\uDCDA', skillLevels: ['junior', 'mid'], color: '#ec4899' },
    { id: '05', slug: 'ideation-brainstorming', title: 'Ideation & Brainstorming', description: 'Using AI for divergence while protecting the creative phase - prompt sequences, analogous inspiration, concept stress-testing.', icon: '\uD83D\uDCA1', skillLevels: ['junior', 'mid', 'senior'], color: '#f59e0b' },
    { id: '06', slug: 'design-prototyping', title: 'Design & Prototyping', description: 'Scale-calibrated AI design tools - from solo v0 scaffolding to enterprise-level design system governance.', icon: '\uD83C\uDFA8', skillLevels: ['mid', 'senior'], color: '#10b981' },
    { id: '07', slug: 'usability-testing', title: 'Usability Testing & A/B', description: 'Unmoderated testing with AI summaries, predictive heatmaps, and A/B hypothesis generation from design variants.', icon: '\uD83E\uDDEA', skillLevels: ['mid', 'senior'], color: '#3b82f6' },
    { id: '08', slug: 'heuristic-evaluation', title: 'Heuristic Evaluation & UX Audit', description: 'AI-accelerated audit delivery - from 3 days to 6 hours. Custom checklists, severity-rated findings, executive summaries.', icon: '\uD83D\uDCCB', skillLevels: ['senior'], color: '#ef4444' },
    { id: '09', slug: 'how-to-use-llms-for-free', title: 'How to Use LLMs for Free', description: 'Comprehensive guide to accessing powerful LLMs without subscription costs. Open-source alternatives and free tiers.', icon: '\uD83D\uDCA1', skillLevels: ['junior', 'mid', 'senior'], color: '#10b981' },
  ];

  private readonly tools: Tool[] = [
    { slug: 'claude', name: 'Claude', category: 'AI Assistant', phases: ['Strategy', 'Research', 'Ideation', 'Testing', 'Audit'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Anthropic\'s AI assistant excels at long-context analysis, interview guide generation, heuristic checklists, and structured synthesis. Best-in-class for nuanced UX work.', link: 'https://claude.ai' },
    { slug: 'chatgpt', name: 'ChatGPT', category: 'AI Assistant', phases: ['Strategy', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'OpenAI\'s conversational AI. Good for brainstorming, cross-industry analogies, and quick prototyping of ideas. Use with awareness of hallucination risk.', link: 'https://chat.openai.com' },
    { slug: 'perplexity', name: 'Perplexity', category: 'AI Search', phases: ['Strategy', 'Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-powered search with cited sources. Preferred over ChatGPT for competitive research and market analysis where accuracy and source attribution matter.', link: 'https://perplexity.ai' },
    { slug: 'figma-ai', name: 'Figma AI', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Native AI features within Figma for component suggestions, inconsistency detection, and pattern compliance. Best for teams with maturing or established design systems.', link: 'https://figma.com' },
    { slug: 'v0-vercel', name: 'v0 by Vercel', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'Text-to-component scaffolding. Ideal for solo designers without a design system who need rapid prototyping of UI components.', link: 'https://v0.dev' },
    { slug: 'dovetail', name: 'Dovetail', category: 'Research', phases: ['Research'], freemium: true, clientSafe: false, approvalRequired: true, skillLevels: ['mid', 'senior'], description: 'AI-powered tagging and pattern identification across research transcripts. Excellent for synthesis but requires client approval for data handling.', link: 'https://dovetail.com' },
    { slug: 'otter-ai', name: 'Otter.ai', category: 'Research', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Real-time transcription with 300 free minutes/month. Auto-delete option makes it suitable for sensitive research contexts.', link: 'https://otter.ai' },
    { slug: 'miro-ai', name: 'Miro AI', category: 'Collaboration', phases: ['Strategy', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Post-brainstorm clustering and opportunity mapping on Miro whiteboards. 3 free boards. Best used after human-led sessions.', link: 'https://miro.com' },
    { slug: 'maze', name: 'Maze', category: 'Testing', phases: ['Testing'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Unmoderated usability testing with AI-generated summaries. Limited free responses per month. Reduces quantitative analysis time significantly.', link: 'https://maze.co' },
    { slug: 'microsoft-clarity', name: 'Microsoft Clarity', category: 'Analytics', phases: ['Testing'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Free heatmaps and AI session summaries with no response limits. Excellent for continuous usability monitoring post-launch.', link: 'https://clarity.microsoft.com' },
    { slug: 'attention-insight', name: 'Attention Insight', category: 'Testing', phases: ['Testing'], freemium: false, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Predictive heatmaps before launch - saves one testing round. AI predicts where users will look based on design composition.', link: 'https://attentioninsight.com' },
    { slug: 'notion-ai', name: 'Notion AI', category: 'Productivity', phases: ['Strategy', 'Research', 'Audit'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-powered writing, synthesis, and executive summary generation within the Notion workspace. Good for stakeholder-facing documentation.', link: 'https://notion.so' },
    { slug: 'elicit', name: 'Elicit', category: 'Research', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Academic paper synthesis using AI. Extracts key findings from research papers. Ideal for evidence-based UX decisions and literature reviews.', link: 'https://elicit.com' },
    { slug: 'relume', name: 'Relume', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'AI-generated sitemaps and wireframes. Useful for solo designers and small teams who need to quickly establish information architecture.', link: 'https://relume.io' },
    { slug: 'loom', name: 'Loom', category: 'Communication', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Async video communication - 25 free videos. Replaces live interview sessions for fixed-bid projects where stakeholder access is limited.', link: 'https://loom.com' },
    { slug: 'tally', name: 'Tally', category: 'Research', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'Free form builder perfect for screener surveys and quick research questionnaires. Clean interface, no watermark on free tier.', link: 'https://tally.so' },
    { slug: 'screaming-frog', name: 'Screaming Frog', category: 'Audit', phases: ['Audit'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Technical UX audit crawler - free under 500 URLs. Identifies broken links, missing meta, accessibility issues, and redirect chains.', link: 'https://screamingfrog.co.uk' },
    { slug: 'exploding-topics', name: 'Exploding Topics', category: 'Research', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Trend signals 6\u201318 months early. Useful for secondary research to identify emerging patterns before they become mainstream.', link: 'https://explodingtopics.com' },
  ];

  private readonly glossaryTerms: GlossaryTerm[] = [
    { term: 'LLM', definition: 'Large Language Model - neural network trained on text data to predict tokens. Powers Claude, GPT, Gemini.' },
    { term: 'GAN', definition: 'Generative Adversarial Network - two competing neural networks generating and discriminating synthetic outputs.' },
    { term: 'RFE', definition: 'Request for Enhancement - a scoped design task on an existing product or service.' },
    { term: 'Initiative', definition: 'Greenfield or strategic design project requiring broad discovery.' },
    { term: 'Fixed Bid', definition: 'Contract with defined scope and capped cost - the most constraint-intensive engagement type.' },
    { term: 'T&M', definition: 'Time & Material - flexible scope contract billed by time.' },
    { term: 'Strategy Builder', definition: 'Platform\'s core interactive feature - matrix input \u2192 tailored workflow output.' },
    { term: 'Constraint Surface', definition: 'The specific risks and constraints surfaced by the Strategy Builder based on a designer\'s project matrix inputs.' },
    { term: 'Freemium-first', definition: 'Tool recommendation approach that prioritises tools with no-cost tiers, particularly for consultant and fixed-bid workflows.' },
    { term: 'Design System Maturity', definition: 'The state of an organisation\'s design system - from none to established - which directly affects which AI design tools are appropriate.' },
    { term: 'Hallucination', definition: 'When an AI model generates plausible-sounding but factually incorrect information. Critical risk factor in UX research synthesis.' },
    { term: 'Transformer', definition: 'Neural network architecture using self-attention mechanisms. Foundation of all modern LLMs including GPT, Claude, and Gemini.' },
    { term: 'Prompt Engineering', definition: 'The practice of crafting specific inputs to AI models to produce desired outputs. Critical UX skill for effective AI-assisted workflows.' },
    { term: 'Token', definition: 'The basic unit of text processed by LLMs. Roughly equivalent to \u00BE of a word. Affects cost, context limits, and response quality.' },
    { term: 'Heuristic Evaluation', definition: 'A UX audit method where evaluators assess an interface against established usability principles (heuristics).' },
    { term: 'Design Token', definition: 'A named, reusable design decision (color, spacing, typography) stored as platform-agnostic data for consistent implementation.' },
    { term: 'Competitive Audit', definition: 'Systematic analysis of competitor products to identify patterns, gaps, and opportunities in a market space.' },
    { term: 'Async Research', definition: 'Research methods that don\'t require real-time participant interaction - surveys, Loom videos, unmoderated tests.' },
    { term: 'Synthesis', definition: 'The process of analyzing and combining raw research data into actionable insights, patterns, and themes.' },
    { term: 'Severity Rating', definition: 'Scale used in UX audits to prioritise findings by impact - typically Critical, Major, Minor, Enhancement.' },
    { term: 'Client-safe', definition: 'A tool designation indicating it can be used with real user or client data without violating data handling agreements.' },
    { term: 'Stakeholder Alignment', definition: 'Process of ensuring all project decision-makers share understanding of goals, constraints, and success criteria.' },
    { term: 'Lo-fi Prototype', definition: 'Low-fidelity representation of a design - wireframes, sketches, or basic interactive mockups used for early validation.' },
    { term: 'Unmoderated Testing', definition: 'Usability testing where participants complete tasks without a facilitator present, typically using tools like Maze.' },
    { term: 'Predictive Heatmap', definition: 'AI-generated visualization predicting where users will look on a design, based on attention models trained on eye-tracking data.' },
    { term: 'A/B Testing', definition: 'Controlled experiment comparing two design variants to determine which performs better against defined success metrics.' },
    { term: 'Information Architecture', definition: 'The structural design of shared information environments - how content is organized, labeled, and navigated.' },
    { term: 'Design System', definition: 'A collection of reusable components, patterns, and guidelines that ensure visual and functional consistency across products.' },
    { term: 'GROQ', definition: 'Sanity\'s query language for retrieving structured content. Used for search and content filtering in the platform.' },
    { term: 'Portable Text', definition: 'A JSON-based rich text specification used by Sanity CMS that supports custom embeds, annotations, and structured content.' },
  ];

  private readonly impactMetrics: ImpactMetric[] = [
    { label: 'Research Synthesis Reduction', value: 70, suffix: '%', icon: '\uD83D\uDD2C' },
    { label: 'Audit Delivery Acceleration', value: 60, suffix: '%', icon: '\u26A1' },
    { label: 'Prototyping Cycle Reduction', value: 40, suffix: '%', icon: '\uD83C\uDFA8' },
    { label: 'Solo Output Multiplier', value: 3, suffix: '\u00D7', icon: '\uD83D\uDE80' },
  ];

  private readonly phaseComparisons: PhaseComparison[] = [
    { phase: 'Competitive Research Brief', manual: '4\u20136 hrs', ai: '45 min', saving: '~80%', tool: 'Perplexity + Claude' },
    { phase: 'Interview Guide (5 sessions)', manual: '3 hrs', ai: '40 min', saving: '~78%', tool: 'Claude' },
    { phase: 'Transcript Synthesis (5 interviews)', manual: '8\u201310 hrs', ai: '2\u20133 hrs', saving: '~70%', tool: 'Dovetail + Otter' },
    { phase: 'UX Audit (Heuristic Eval)', manual: '2\u20133 days', ai: '4\u20136 hrs', saving: '~65%', tool: 'Claude + Screaming Frog' },
    { phase: 'Lo-fi Wireframes (10 screens)', manual: '1\u20132 days', ai: '4\u20136 hrs', saving: '~55%', tool: 'v0 / Relume / Figma AI' },
    { phase: 'Usability Test Plan + Script', manual: '4 hrs', ai: '1 hr', saving: '~75%', tool: 'Claude + Maze' },
    { phase: 'A/B Hypothesis Brief', manual: '2\u20133 hrs', ai: '30 min', saving: '~82%', tool: 'Claude' },
  ];

  private readonly sectionContent: Record<string, WikiSectionContent> = {
    'introduction-to-ai-ml': {
      overview: 'This section provides the intellectual foundation designers need to evaluate AI tools critically. Understanding how LLMs work - and why they hallucinate - is essential before relying on them in professional UX workflows.',
      workflow: [
        { step: 'Historical Context', tool: 'Reading', desc: 'Trace the AI timeline: Turing (1950) \u2192 Shannon \u2192 Rosenblatt \u2192 McCarthy & Minsky \u2192 Hinton \u2192 Transformers \u2192 LLM era' },
        { step: 'LLM Deep Dive', tool: 'Study', desc: 'Understand what LLMs are, how they generate text via token prediction, and why hallucination occurs' },
        { step: 'GAN Understanding', tool: 'Study', desc: 'Learn about generative image models and their implications for UX research and synthetic data' },
        { step: 'Practical Assessment', tool: 'Practice', desc: 'Evaluate specific AI tools against failure modes: overconfidence, premature convergence, hallucination' },
      ],
      tools: [
        { name: 'Claude', use: 'Conceptual Q&A about AI capabilities', freeTier: 'Free tier available', clientSafe: true },
        { name: 'ChatGPT', use: 'Interactive AI exploration', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: ['This is foundational content - no project-specific constraints apply. Suitable for all project types and contract structures.'],
      videos: [
        { title: 'Intro to Large Language Models', url: 'https://www.youtube.com/embed/zjkBMFhNj_g' },
        { title: 'How AI Works - Explained for Designers', url: 'https://www.youtube.com/embed/wCvtTQ-CTgU' },
        { title: 'AI for UX Designers - Crash Course', url: 'https://www.youtube.com/embed/sFq7F9gW23k' },
        { title: 'Google Stitch + Claude Code = Insane App Design', url: 'https://www.youtube.com/embed/sZQ7lqaOGMg' },
        { title: 'How to Start Any Design Project in 2026', url: 'https://www.youtube.com/embed/Re2xf0tSbXk' },
      ],
    },
    'ai-ux-for-strategy': {
      overview: 'AI-assisted strategy work starts with synthesis and competitive analysis. Use Claude or ChatGPT for problem brief synthesis from stakeholder notes, Perplexity for cited competitive research, and Miro AI for post-session opportunity mapping.',
      workflow: [
        { step: 'Problem Brief Synthesis', tool: 'Claude / ChatGPT', desc: 'Upload or paste stakeholder interview notes. Generate a structured problem brief with key themes, contradictions, and priority signals.' },
        { step: 'Competitive Landscape', tool: 'Perplexity', desc: 'Use Perplexity for cited competitive research - prefer it over ChatGPT when source accuracy matters.' },
        { step: 'Opportunity Mapping', tool: 'Miro AI', desc: 'After a human-led brainstorm session, use Miro AI to cluster and categorize opportunity areas.' },
        { step: 'Assumption Stress-Testing', tool: 'ChatGPT', desc: 'Challenge key assumptions and reframe the problem from multiple stakeholder perspectives.' },
      ],
      tools: [
        { name: 'Perplexity', use: 'Cited competitive research', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Claude.ai', use: 'Brief synthesis', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Miro AI', use: 'Opportunity mapping', freeTier: '3 boards free', clientSafe: true },
        { name: 'Notion', use: 'Strategy documentation', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: ['Fixed Bid: Focus on rapid competitive analysis. Keep strategy phase under 2 days.', 'Consultancy: Strategy outputs should be client-presentable. Use Perplexity for source-backed findings.'],
      videos: [
        { title: 'AI Tools for UX Designers - 2026 Workflow', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' },
        { title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' },
        { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' },
        { title: 'How to Build a Full Stack App with AI in 2026', url: 'https://www.youtube.com/embed/pRUJfTXdVfU' },
      ],
    },
    'primary-research': {
      overview: 'AI transforms primary research efficiency. Use Claude for interview guide generation and stress-testing against objectives, Otter.ai for transcription, Dovetail for AI-powered tagging, and Notion AI for insight synthesis.',
      workflow: [
        { step: 'Interview Guide Generation', tool: 'Claude', desc: 'Feed research objectives to Claude. Generate interview guides, then stress-test them: \"What blind spots does this guide have?\"' },
        { step: 'Session Transcription', tool: 'Otter.ai', desc: 'Real-time transcription. Free tier: 300 min/month. Auto-delete option for sensitive research contexts.' },
        { step: 'Pattern Identification', tool: 'Dovetail', desc: 'AI-powered tagging across transcripts. Identifies recurring themes, sentiments, and quotes automatically.' },
        { step: 'Insight Synthesis', tool: 'Notion AI', desc: 'Cluster findings into actionable insight themes. Generate stakeholder-ready summaries.' },
      ],
      tools: [
        { name: 'Claude', use: 'Interview guide creation', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Otter.ai', use: 'Transcription', freeTier: '300 min/month free', clientSafe: true },
        { name: 'Dovetail', use: 'AI tagging & patterns', freeTier: 'Free tier available', clientSafe: false },
        { name: 'Loom', use: 'Async interviews', freeTier: '25 videos free', clientSafe: true },
        { name: 'Tally', use: 'Screener surveys', freeTier: 'Unlimited free', clientSafe: true },
      ],
      constraints: ['Fixed Bid: Max 5 interviews. Use Loom for async sessions. AI synthesis compresses analysis from days to hours.', 'Consultancy: Verify client data handling rules before using Dovetail with real user data.'],
      videos: [
        { title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' },
        { title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' },
        { title: 'Top 7 AI Tools For UX Research', url: 'https://www.youtube.com/embed/Ns6mhkFV5yQ' },
        { title: 'Antigravity + Flutter: AI-Powered Research & Design', url: 'https://www.youtube.com/embed/bhPHwVsrTo0' },
      ],
    },
    'secondary-research': {
      overview: 'Secondary research is where AI provides the highest return with lowest risk - all public data, no client data concerns. Use Perplexity for cited research, Elicit for academic papers, and Claude for structured synthesis.',
      workflow: [
        { step: 'Web Research', tool: 'Perplexity', desc: 'Cited web research with source attribution. Use over ChatGPT when accuracy and references matter.' },
        { step: 'Academic Synthesis', tool: 'Elicit', desc: 'Extract key findings from research papers. Build evidence-based design rationale.' },
        { step: 'Trend Detection', tool: 'Exploding Topics', desc: 'Identify trend signals 6\u201318 months early. Spot emerging patterns before competitors.' },
        { step: 'Landscape Brief', tool: 'Claude', desc: 'Synthesize all secondary research into a structured competitive landscape brief.' },
      ],
      tools: [
        { name: 'Perplexity', use: 'Cited web research', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Elicit', use: 'Academic paper synthesis', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Exploding Topics', use: 'Trend signals', freeTier: 'Free basic access', clientSafe: true },
        { name: 'Claude', use: 'Synthesis & structuring', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: ['All public data - no client data risk. All tools usable without client approval.'],
      videos: [
        { title: 'How to Use AI for Quick Competitive Analysis', url: 'https://www.youtube.com/embed/63TfbSiSEzY' },
        { title: 'AI For Data Analysis - Perplexity, Claude & ChatGPT', url: 'https://www.youtube.com/embed/KMnx5LBzh-g' },
        { title: 'AI in UX Research - Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' },
      ],
    },
    'ideation-brainstorming': {
      overview: 'AI wants to converge. LLMs generate plausible, expected answers trained on the average of human output. Designers must use AI for divergence while protecting the human creative phase. Use \"yes and\" prompting, not \"give me 10 ideas.\"',
      workflow: [
        { step: 'Divergent Prompting', tool: 'Claude', desc: 'Use \"yes and\" prompting sequences. Ask Claude to build on ideas, not just list them. Push toward unexpected territory.' },
        { step: 'Cross-Industry Analogies', tool: 'ChatGPT', desc: 'Ask for solutions from completely different industries applied to your design challenge.' },
        { step: 'Post-Session Clustering', tool: 'Miro AI', desc: 'After a human brainstorm, use Miro AI to cluster, categorize, and find hidden connections.' },
        { step: 'Concept Stress-Testing', tool: 'Claude', desc: '\"What are the three most likely failure modes of this concept?\" - systematic challenge before commitment.' },
      ],
      tools: [
        { name: 'Claude', use: '\"Yes and\" ideation', freeTier: 'Free tier available', clientSafe: true },
        { name: 'ChatGPT', use: 'Cross-industry inspiration', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Miro AI', use: 'Post-brainstorm clustering', freeTier: '3 boards free', clientSafe: true },
      ],
      constraints: ['AI ideation must follow, not replace, human creative sessions.', 'Monitor for premature convergence - AI tends toward safe, averaged solutions.'],
      videos: [
        { title: 'Brainstorm and Ideate with Generative AI - Adobe', url: 'https://www.youtube.com/embed/vLQS24xc1WY' },
        { title: 'How to Use AI to Generate and Develop Ideas', url: 'https://www.youtube.com/embed/7xTGNjDFbEU' },
        { title: 'Learn AI for Brainstorming - Google AI Certificate', url: 'https://www.youtube.com/embed/I02_9V-xRLM' },
      ],
    },
    'design-prototyping': {
      overview: 'AI design tool selection depends entirely on scale. Solo designers benefit from scaffolding tools. Enterprise teams need governance-first approaches. Match the tool to your design system maturity.',
      workflow: [
        { step: 'Component Scaffolding', tool: 'v0 by Vercel', desc: 'Text-to-component for rapid prototyping. Ideal for solo designers without a design system.' },
        { step: 'Wireframe Generation', tool: 'Relume', desc: 'Generate sitemaps and wireframes from text descriptions. Quick information architecture.' },
        { step: 'Design System Check', tool: 'Figma AI', desc: 'Component suggestions and inconsistency detection for maturing design systems.' },
        { step: 'Token Audit', tool: 'Claude Code', desc: 'For enterprise teams: audit design tokens across 15+ file libraries for consistency.' },
      ],
      tools: [
        { name: 'v0 by Vercel', use: 'Component scaffolding', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Relume', use: 'Sitemap & wireframes', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Figma AI', use: 'Component suggestions', freeTier: 'Included in Figma', clientSafe: true },
        { name: 'Claude Code', use: 'Token audit', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: ['Governance before design at enterprise scale.', 'No new components without AI-assisted audit of existing coverage.'],
      videos: [
        { title: 'ChatGPT for UX Designers - Fast Prototyping Workflow', url: 'https://www.youtube.com/embed/P3R3fuHXCCA' },
        { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' },
        { title: 'Intro to AI for UX Design - Google Certificate', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' },
        { title: 'AntiGravity + Figma: Insane Mobile App Design', url: 'https://www.youtube.com/embed/n3o8MgaNRE4' },
        { title: 'How I’d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' },
        { title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' },
      ],
    },
    'usability-testing': {
      overview: 'AI is strongest at reducing quantitative analysis time. Weakest at interpreting why users behaved a certain way - that remains human judgment. Use AI for summaries, heatmaps, and hypothesis generation.',
      workflow: [
        { step: 'Unmoderated Testing', tool: 'Maze', desc: 'Set up unmoderated tests with AI-generated summaries of completion rates and task success.' },
        { step: 'Heatmap Analysis', tool: 'Microsoft Clarity', desc: 'Free heatmaps with AI session summaries. No response limits. Continuous monitoring.' },
        { step: 'Predictive Analysis', tool: 'Attention Insight', desc: 'Predictive heatmaps before launch - saves one testing round by predicting attention patterns.' },
        { step: 'A/B Hypothesis', tool: 'Claude', desc: 'Generate A/B test hypotheses from design variants and defined success metrics.' },
      ],
      tools: [
        { name: 'Maze', use: 'Unmoderated testing', freeTier: 'Limited free responses', clientSafe: true },
        { name: 'Microsoft Clarity', use: 'Heatmaps + AI summaries', freeTier: 'Completely free', clientSafe: true },
        { name: 'Attention Insight', use: 'Predictive heatmaps', freeTier: 'Paid only', clientSafe: true },
        { name: 'Claude', use: 'A/B hypothesis generation', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: ['AI summaries supplement, not replace, human interpretation of qualitative behavior.', 'Ensure sample sizes are statistically significant for A/B testing.'],
      videos: [
        { title: 'Optimize Designs with AI Attention Heatmaps', url: 'https://www.youtube.com/embed/zRCiMb-LVBY' },
        { title: 'Best AI Usability Testing Tools in 2024', url: 'https://www.youtube.com/embed/LfSqlnqFcuQ' },
        { title: 'Usability Testing for AI Systems - Exclusive Lesson', url: 'https://www.youtube.com/embed/2HLVLP_Htv4' },
      ],
    },
    'heuristic-evaluation': {
      overview: 'A UX audit is a directly billable engagement. AI-assisted audit delivery compresses a 3-day manual audit to 6 hours without reducing quality. This section provides the AI-accelerated delivery workflow.',
      workflow: [
        { step: 'Custom Heuristic Checklist', tool: 'Claude', desc: 'Generate a custom heuristic checklist from product brief and user goals - not generic Nielsen heuristics.' },
        { step: 'Findings Structuring', tool: 'Claude', desc: 'Severity-rate raw observations. Structure findings into categories with evidence and impact assessment.' },
        { step: 'Technical Crawl', tool: 'Screaming Frog', desc: 'Automated crawl for technical UX issues - broken links, missing meta, accessibility violations. Free under 500 URLs.' },
        { step: 'Executive Summary', tool: 'Notion AI', desc: 'Generate stakeholder-ready executive summary for non-design decision makers.' },
      ],
      tools: [
        { name: 'Claude', use: 'Heuristic checklist & structuring', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Screaming Frog', use: 'Technical audit', freeTier: 'Free under 500 URLs', clientSafe: true },
        { name: 'Notion AI', use: 'Executive summary', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: ['Consultant impact: 3-day audit \u2192 6 hours. Directly improves fixed-bid economics.', 'Deliverable: UX Audit Report Template - severity matrix, findings structure, executive summary, recommendation grid.'],
      videos: [
        { title: 'How to Do a UX/CRO Audit Step by Step with AI', url: 'https://www.youtube.com/embed/SJKJ_BmtvN8' },
        { title: 'Heuristic Evaluation - Nielsen Norman Group', url: 'https://www.youtube.com/embed/6Bw0n6Jvwxk' },
        { title: 'How to Conduct a Heuristic Evaluation', url: 'https://www.youtube.com/embed/0YL0xoSmyZI' },
      ],
    },
    'how-to-use-llms-for-free': {
      overview: 'Powerful LLMs like Claude, GPT-4, and Llama 3 are accessible without subscription costs if you know where to look. This section curates the best methods for using top-shelf AI for free.',
      workflow: [
        { step: 'Official Free Tiers', tool: 'Claude / ChatGPT', desc: 'Leverage the generous free tiers of industry leaders with daily limits.' },
        { step: 'Open Source Hosting', tool: 'Groq / Hugging Face', desc: 'Use Llama 3 and other open-source models at incredible speeds for free.' },
        { step: 'Local Execution', tool: 'Ollama', desc: 'Run models completely locally on your hardware for 100% privacy and no cost.' },
      ],
      tools: [
        { name: 'Claude.ai', use: 'Daily free messages of Sonnet 3.5', freeTier: 'Free tier available', clientSafe: true },
        { name: 'ChatGPT', use: 'Free access to GPT-4o mini', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Groq', use: 'Fastest Llama 3 hosting', freeTier: 'Free public access', clientSafe: true },
      ],
      constraints: ['Usage limits on official tiers apply.', 'Local execution requires compatible hardware (Apple Silicon or GPU).'],
      videos: [
        { title: 'How To Use Claude Code FREE Forever (Ollama Setup)', url: 'https://www.youtube.com/embed/gqYyZuO34x0' },
      ],
      resources: [
        { title: 'X: Expert tips on Free LLM Access', url: 'https://x.com/Ubermenscchh/status/2035390128819167502' },
      ],
    },
  };


  getWikiSections(): WikiSection[] {
    return this.wikiSections;
  }

  getWikiSectionBySlug(slug: string): WikiSection | undefined {
    return this.wikiSections.find(s => s.slug === slug);
  }

  getWikiSectionContent(slug: string): WikiSectionContent | undefined {
    return this.sectionContent[slug];
  }

  getTools(): Tool[] {
    return this.tools;
  }

  getToolBySlug(slug: string): Tool | undefined {
    return this.tools.find(t => t.slug === slug);
  }

  getGlossaryTerms(): GlossaryTerm[] {
    return this.glossaryTerms;
  }

  getImpactMetrics(): ImpactMetric[] {
    return this.impactMetrics;
  }

  getPhaseComparisons(): PhaseComparison[] {
    return this.phaseComparisons;
  }
}
