import { Injectable } from '@angular/core';
import { WikiSection, WikiSectionContent } from '../models/wiki-section.model';
import { Tool } from '../models/tool.model';
import { GlossaryTerm } from '../models/glossary-term.model';
import { ImpactMetric, PhaseComparison } from '../models/impact-metric.model';

@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly wikiSections: WikiSection[] = [
    { id: '01', slug: 'introduction-to-ai-ml', title: 'Introduction to AI & ML', description: 'The intellectual foundation, including history, LLMs, GANs, and what designers must know to evaluate AI tools critically.', icon: '\uD83E\uDDE0', skillLevels: ['junior', 'mid', 'senior'], color: '#6366f1' },
    { id: '02', slug: 'ai-ux-for-strategy', title: 'AI UX for Strategy', description: 'Problem brief synthesis, competitive landscape research, opportunity mapping, and assumption stress-testing with AI.', icon: '\uD83C\uDFAF', skillLevels: ['mid', 'senior'], color: '#8b5cf6' },
    { id: '03', slug: 'primary-research', title: 'Primary Research', description: 'AI-assisted interview guides, transcription, pattern identification, and insight synthesis across user interviews.', icon: '\uD83D\uDD0D', skillLevels: ['junior', 'mid', 'senior'], color: '#a855f7' },
    { id: '04', slug: 'secondary-research', title: 'Secondary Research', description: 'Cited web research, academic paper synthesis, trend signals, and structured competitive landscape briefs.', icon: '\uD83D\uDCDA', skillLevels: ['junior', 'mid'], color: '#ec4899' },
    { id: '05', slug: 'ideation-brainstorming', title: 'Ideation & Brainstorming', description: 'Using AI for divergence while protecting the creative phase, including prompt sequences, analogous inspiration, and concept stress-testing.', icon: '\uD83D\uDCA1', skillLevels: ['junior', 'mid', 'senior'], color: '#f59e0b' },
    { id: '06', slug: 'design-prototyping', title: 'Design & Prototyping', description: 'Scale-calibrated AI design tools, from solo v0 scaffolding to enterprise-level design system governance.', icon: '\uD83C\uDFA8', skillLevels: ['mid', 'senior'], color: '#10b981' },
    { id: '07', slug: 'usability-testing', title: 'Usability Testing & A/B', description: 'Unmoderated testing with AI summaries, predictive heatmaps, and A/B hypothesis generation from design variants.', icon: '\uD83E\uDDEA', skillLevels: ['mid', 'senior'], color: '#3b82f6' },
    { id: '08', slug: 'heuristic-evaluation', title: 'Heuristic Evaluation & UX Audit', description: 'AI-accelerated audit delivery, from 3 days to 6 hours. Custom checklists, severity-rated findings, executive summaries.', icon: '\uD83D\uDCCB', skillLevels: ['senior'], color: '#ef4444' },
    { id: '09', slug: 'how-to-use-llms-for-free', title: 'How to Use LLMs for Free', description: 'Comprehensive guide to accessing powerful LLMs without subscription costs. Open-source alternatives and free tiers.', icon: '\uD83D\uDCA1', skillLevels: ['junior', 'mid', 'senior'], color: '#10b981' },
    { id: '10', slug: 'foundations-of-ui-design', title: 'Foundations of UI Design', description: 'Core visual design principles every designer must master, including Laws of UX, Gestalt psychology, and perceptual rules that make design decisions defensible.', icon: '\uD83D\uDCD0', skillLevels: ['junior', 'mid'], color: '#f97316' },
    { id: '11', slug: 'design-thinking', title: 'Design Thinking', description: 'A structured, human-centered methodology for solving complex problems, Empathize, Define, Ideate, Prototype, Test. How AI accelerates every phase.', icon: '\uD83E\uDD14', skillLevels: ['junior', 'mid', 'senior'], color: '#0073c6' },
    { id: '12', slug: 'ux-psychology-research', title: 'UX Psychology in Research', description: 'Cognitive biases, mental models, emotional design, and behavioral patterns that underpin every user decision, and how to account for them in research.', icon: '\uD83D\uDCAD', skillLevels: ['mid', 'senior'], color: '#7c3aed' },
  ];

  private readonly tools: Tool[] = [
    { slug: 'claude', name: 'Claude', category: 'AI Assistant', phases: ['Strategy', 'Research', 'Ideation', 'Testing', 'Audit'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Anthropic\'s AI assistant excels at long-context analysis, interview guide generation, heuristic checklists, and structured synthesis. Best-in-class for nuanced UX work.', link: 'https://claude.ai', videos: [{ title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }, { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }] },
    { slug: 'chatgpt', name: 'ChatGPT', category: 'AI Assistant', phases: ['Strategy', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'OpenAI\'s conversational AI. Good for brainstorming, cross-industry analogies, and quick prototyping of ideas. Use with awareness of hallucination risk.', link: 'https://chat.openai.com', videos: [{ title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' }, { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }] },
    { slug: 'perplexity', name: 'Perplexity', category: 'AI Search', phases: ['Strategy', 'Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-powered search with cited sources. Preferred over ChatGPT for competitive research and market analysis where accuracy and source attribution matter.', link: 'https://perplexity.ai', videos: [{ title: 'Top 7 AI Tools for UX Research', url: 'https://www.youtube.com/embed/Ns6mhkFV5yQ' }, { title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' }] },
    { slug: 'figma-ai', name: 'Figma', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'The industry-standard collaborative design tool. Covers wireframing, hi-fi UI, prototyping, and design systems in one platform. Built-in AI features include component suggestions, inconsistency detection, and auto-layout assistance.', link: 'https://figma.com', videos: [{ title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' }, { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }] },
    { slug: 'v0-vercel', name: 'v0 by Vercel', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'Text-to-component scaffolding. Ideal for solo designers without a design system who need rapid prototyping of UI components.', link: 'https://v0.dev', videos: [{ title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' }, { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }] },
    { slug: 'google-antigravity', name: 'Google AntiGravity', category: 'Design', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Google Labs AI prototyping tool that generates interactive, animated UI prototypes from text and image prompts. Specialises in motion design and micro-interactions, go from a static screen to a fully animated prototype in minutes without code.', link: 'https://antigravity.dev', videos: [{ title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' }, { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }] },
    { slug: 'dovetail', name: 'Dovetail', category: 'Research', phases: ['Research'], freemium: true, clientSafe: false, approvalRequired: true, skillLevels: ['mid', 'senior'], description: 'AI-powered tagging and pattern identification across research transcripts. Excellent for synthesis but requires client approval for data handling.', link: 'https://dovetail.com', videos: [{ title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }, { title: 'Top 7 AI Tools for UX Research', url: 'https://www.youtube.com/embed/Ns6mhkFV5yQ' }] },
    { slug: 'otter-ai', name: 'Otter.ai', category: 'Research', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Real-time transcription with 300 free minutes/month. Auto-delete option makes it suitable for sensitive research contexts.', link: 'https://otter.ai', videos: [{ title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' }, { title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }] },
    { slug: 'miro-ai', name: 'Miro AI', category: 'Collaboration', phases: ['Strategy', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Post-brainstorm clustering and opportunity mapping on Miro whiteboards. 3 free boards. Best used after human-led sessions.', link: 'https://miro.com', videos: [{ title: 'Brainstorm and Ideate with Generative AI', url: 'https://www.youtube.com/embed/vLQS24xc1WY' }, { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }] },
    { slug: 'maze', name: 'Maze', category: 'Testing', phases: ['Testing'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Unmoderated usability testing with AI-generated summaries. Limited free responses per month. Reduces quantitative analysis time significantly.', link: 'https://maze.co', videos: [{ title: 'Best AI Usability Testing Tools in 2024', url: 'https://www.youtube.com/embed/LfSqlnqFcuQ' }, { title: 'Usability Testing for AI Systems - Exclusive Lesson', url: 'https://www.youtube.com/embed/2HLVLP_Htv4' }] },
    { slug: 'microsoft-clarity', name: 'Microsoft Clarity', category: 'Analytics', phases: ['Testing'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Free heatmaps and AI session summaries with no response limits. Excellent for continuous usability monitoring post-launch.', link: 'https://clarity.microsoft.com', videos: [{ title: 'Optimize Designs with AI Attention Heatmaps', url: 'https://www.youtube.com/embed/zRCiMb-LVBY' }, { title: 'Best AI Usability Testing Tools in 2024', url: 'https://www.youtube.com/embed/LfSqlnqFcuQ' }] },
    { slug: 'attention-insight', name: 'Attention Insight', category: 'Testing', phases: ['Testing'], freemium: false, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Predictive heatmaps before launch, saves one testing round. AI predicts where users will look based on design composition.', link: 'https://attentioninsight.com', videos: [{ title: 'Optimize Designs with AI Attention Heatmaps', url: 'https://www.youtube.com/embed/zRCiMb-LVBY' }, { title: 'Usability Testing for AI Systems - Exclusive Lesson', url: 'https://www.youtube.com/embed/2HLVLP_Htv4' }] },
    { slug: 'notion-ai', name: 'Notion AI', category: 'Productivity', phases: ['Strategy', 'Research', 'Audit'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-powered writing, synthesis, and executive summary generation within the Notion workspace. Good for stakeholder-facing documentation.', link: 'https://notion.so', videos: [{ title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }, { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }] },
    { slug: 'elicit', name: 'Elicit', category: 'Research', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Academic paper synthesis using AI. Extracts key findings from research papers. Ideal for evidence-based UX decisions and literature reviews.', link: 'https://elicit.com', videos: [{ title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' }, { title: 'Top 7 AI Tools for UX Research', url: 'https://www.youtube.com/embed/Ns6mhkFV5yQ' }] },
    { slug: 'relume', name: 'Relume', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'AI-generated sitemaps and wireframes. Useful for solo designers and small teams who need to quickly establish information architecture.', link: 'https://relume.io', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' }] },
    // -- Best Design Tools --
    { slug: 'framer', name: 'Framer', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Design-to-publish tool that bridges the gap between design and live website. Built-in AI can generate full pages from text, animate interactions, and produce production-ready responsive layouts.', link: 'https://framer.com', videos: [{ title: 'How I\'d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' }, { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }] },
    { slug: 'sketch', name: 'Sketch', category: 'Design', phases: ['Design'], freemium: false, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Mac-native vector design tool focused on UI and icon work. Strong plugin ecosystem and tight integration with developer handoff tools. Ideal for macOS-first design teams.', link: 'https://sketch.com', videos: [{ title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' }, { title: 'How I\'d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' }] },
    { slug: 'penpot', name: 'Penpot', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Open-source, self-hostable Figma alternative. Web-based, works on any OS, and supports SVG natively. Best for teams with data sovereignty requirements or budget constraints.', link: 'https://penpot.app', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' }] },
    { slug: 'webflow', name: 'Webflow', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Visual web design tool that outputs clean HTML/CSS. Combines design canvas with CMS and hosting. AI features assist with layout generation and copy. Strong for consultants delivering live sites.', link: 'https://webflow.com', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'How I\'d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' }] },
    { slug: 'canva', name: 'Canva', category: 'Design', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'Visual design platform for quick mockups, presentations, and stakeholder decks. AI features include text-to-image, Magic Design, and auto-resize. Not for product UI, excellent for communication assets.', link: 'https://canva.com', videos: [{ title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' }, { title: 'How I\'d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' }] },
    // -- Best AI Design Tools --
    { slug: 'uizard', name: 'Uizard', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'AI turns hand-drawn sketches, screenshots, or text prompts into editable wireframes and mockups. Fast concept-to-screen tool, best for rapid early-stage UI exploration without deep design tool expertise.', link: 'https://uizard.io', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' }] },
    { slug: 'figr-design', name: 'Figr Design', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'AI-powered design system and token management tool. Helps teams audit, generate, and maintain design tokens across platforms. Strong for teams scaling from partial to established design systems.', link: 'https://figr.design', videos: [{ title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' }, { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }] },
    { slug: 'galileo-ai', name: 'Galileo AI', category: 'Design', phases: ['Design'], freemium: false, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Text-to-UI generation that produces editable, high-fidelity screens directly in Figma. Describe a screen in plain language, Galileo builds production-quality component layouts automatically.', link: 'https://usegalileo.ai', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' }] },
    { slug: 'visily', name: 'Visily', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'AI wireframing tool that converts screenshots, templates, or text descriptions into structured wireframes. Collaborative and browser-based, lowers the barrier to wireframing for non-designers.', link: 'https://visily.ai', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' }] },
    { slug: 'locofy', name: 'Locofy', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'AI design-to-code tool that converts Figma and Adobe XD designs into production-ready React, Vue, HTML/CSS, and React Native code. Closes the designer-developer handoff gap significantly.', link: 'https://locofy.ai', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' }] },
    { slug: 'creatie', name: 'Creatie', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-native collaborative design tool that combines UI design with built-in AI generation, annotation, and design system management. Positioned as an AI-first alternative to Figma.', link: 'https://creatie.ai', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'How I\'d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' }] },
    { slug: 'motiff', name: 'Motiff', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-powered professional UI design tool with Figma-compatible workflows and built-in AI capabilities, AI wireframing, AI component generation, and Magic Fill. Designed as a performant, AI-first alternative for product teams.', link: 'https://motiff.com', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' }] },
    { slug: 'google-stitch', name: 'Google Stitch', category: 'Design', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Google Labs AI design tool that generates editable UI mockups and screens from text prompts and image inputs. Ideal for rapid concept exploration, describe a screen, get a structured layout back instantly. Part of the Google AI ecosystem.', link: 'https://stitch.withgoogle.com', videos: [{ title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }, { title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' }] },
    { slug: 'pomelo', name: 'Pomelo', category: 'Design', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'AI-assisted design and prototyping tool focused on fast UI generation from prompts and templates. Enables non-designers and product teams to go from idea to interactive mockup without extensive design tool expertise.', link: 'https://pomelo.design', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' }] },
    { slug: 'mixboard', name: 'Mixboard', category: 'Design', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-powered design exploration and moodboarding tool. Helps designers gather, remix, and synthesise visual references into coherent design directions. Bridges inspiration and execution by connecting moodboards to design system decisions.', link: 'https://mixboard.ai', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Brainstorm and Ideate with Generative AI - Adobe', url: 'https://www.youtube.com/embed/vLQS24xc1WY' }] },
    { slug: 'magician', name: 'Magician', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'AI Figma plugin for generating icons, images, copywriting, and UI elements directly inside Figma. Reduces context-switching by bringing AI generation into your existing design workflow.', link: 'https://magician.design', videos: [{ title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' }, { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }] },
    { slug: 'loom', name: 'Loom', category: 'Communication', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Async video communication, 25 free videos. Replaces live interview sessions for fixed-bid projects where stakeholder access is limited.', link: 'https://loom.com', videos: [{ title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' }, { title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }] },
    { slug: 'tally', name: 'Tally', category: 'Research', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'Free form builder perfect for screener surveys and quick research questionnaires. Clean interface, no watermark on free tier.', link: 'https://tally.so', videos: [{ title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' }, { title: 'Top 7 AI Tools for UX Research', url: 'https://www.youtube.com/embed/Ns6mhkFV5yQ' }] },
    { slug: 'screaming-frog', name: 'Screaming Frog', category: 'Audit', phases: ['Audit'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Technical UX audit crawler, free under 500 URLs. Identifies broken links, missing meta, accessibility issues, and redirect chains.', link: 'https://screamingfrog.co.uk', videos: [{ title: 'Usability Testing for AI Systems', url: 'https://www.youtube.com/embed/2HLVLP_Htv4' }, { title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' }] },
    { slug: 'exploding-topics', name: 'Exploding Topics', category: 'Research', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Trend signals 6 to 18 months early. Useful for secondary research to identify emerging patterns before they become mainstream.', link: 'https://explodingtopics.com', videos: [{ title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' }, { title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' }] },
    // -- Tools from Attachment 1 --
    { slug: 'qoqo', name: 'QoQo', category: 'AI Assistant', phases: ['Strategy', 'Research', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-powered UX companion that generates personas, user journeys, problem statements, and research plans on demand. Reduces time-to-artifact for junior and mid designers significantly.', link: 'https://qoqo.ai', videos: [{ title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }, { title: 'How I\u2019d Learn UI/UX Design in 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' }] },
    { slug: 'synthetic-users', name: 'Synthetic Users', category: 'Research', phases: ['Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Simulate user research without recruiting real participants. AI generates synthetic personas and predicts how target users would respond to designs, interview questions, and concepts.', link: 'https://syntheticusers.com', videos: [{ title: 'Top 7 AI Tools for UX Research', url: 'https://www.youtube.com/embed/Ns6mhkFV5yQ' }, { title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' }] },
    { slug: 'userdoc', name: 'Userdoc', category: 'Research', phases: ['Strategy', 'Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-assisted tool for creating user stories, personas, and journey maps from raw context. Translates briefs and notes into structured UX documentation faster than manual authoring.', link: 'https://userdoc.fyi', videos: [{ title: 'How I\u2019d Learn UI/UX Design in 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' }, { title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }] },
    { slug: 'kraftful', name: 'Kraftful', category: 'Research', phases: ['Research', 'Strategy'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'AI synthesis of product feedback, app store reviews, and support tickets. Surfaces recurring themes, user pain points, and feature demand signals from large qualitative datasets.', link: 'https://kraftful.com', videos: [{ title: 'Top 7 AI Tools for UX Research', url: 'https://www.youtube.com/embed/Ns6mhkFV5yQ' }, { title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' }] },
    { slug: 'notably', name: 'Notably', category: 'Research', phases: ['Research'], freemium: true, clientSafe: false, approvalRequired: true, skillLevels: ['mid', 'senior'], description: 'AI research repository for tagging, clustering, and extracting insights from user interviews and usability sessions. Collaborative synthesis platform, requires client approval before loading user data.', link: 'https://notably.ai', videos: [{ title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }, { title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' }] },
    { slug: 'claude-designer-skills', name: 'Claude Designer Skills', category: 'AI Assistant', phases: ['Strategy', 'Research', 'Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Anthropic\'s Claude with specialist design agent skills, structured critique, accessibility audits, component naming, and UX rationale generation through a design-focused AI persona.', link: 'https://claude.ai', videos: [{ title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }, { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }] },
    { slug: 'agent-skills-directory', name: 'Agent Skills Directory', category: 'AI Assistant', phases: ['Strategy', 'Research', 'Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Curated directory of specialist AI agent skills mapped to UX workflows. Find and deploy purpose-built agents for research synthesis, design critique, accessibility review, and stakeholder communication.', link: 'https://agentskillsdirectory.com', videos: [{ title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }, { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }] },
    { slug: 'ux-hints', name: 'UX Hints', category: 'AI Assistant', phases: ['Strategy', 'Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-powered product design knowledge base surfacing UX best practices, heuristics, and design principles on demand. Good for quick pattern validation and design rationale without leaving your workflow.', link: 'https://uxhints.com', videos: [{ title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' }, { title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' }] },
    // -- Build, Deploy & AI Dev Tools --
    { slug: 'google-ai-studio', name: 'Google AI Studio', category: 'AI Assistant', phases: ['Strategy', 'Ideation', 'Design'], freemium: true, clientSafe: true, approvalRequired: true, skillLevels: ['mid', 'senior'], description: 'Google\'s browser-based IDE for building and prototyping with Gemini models. Rapidly test multimodal prompts, build AI-powered UX flows, and connect generative AI to design prototypes, no local setup required. Approval needed before using client data.', link: 'https://aistudio.google.com', videos: [{ title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }, { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }] },
    { slug: 'firebase-studio', name: 'Firebase Studio', category: 'Productivity', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: true, skillLevels: ['mid', 'senior'], description: 'Google\'s AI-powered full-stack development environment (formerly Project IDX). Combines Firebase backend, AI code generation, and live preview, ideal for UX designers who want to prototype real, data-connected experiences without a dedicated dev. Approval required before processing client data.', link: 'https://firebase.studio', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' }] },
    { slug: 'replit', name: 'Replit', category: 'Productivity', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Browser-based coding environment with a built-in AI agent that writes, runs, and debugs code from natural language prompts. Lets designers build and share interactive HTML/CSS/JS prototypes instantly, no local setup, no handoff delay.', link: 'https://replit.com', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }] },
    { slug: 'rocket-new', name: 'Rocket', category: 'Productivity', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-powered rapid app generator, describe a product idea and Rocket scaffolds a working full-stack prototype in minutes. Ideal for concept validation and stakeholder demos before committing to full design and development cycles.', link: 'https://rocket.new', videos: [{ title: 'How I\u2019d Learn UI/UX Design in 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' }, { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }] },
    { slug: 'netlify', name: 'Netlify', category: 'Productivity', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Deployment and hosting platform for static sites and front-end applications. Designers can publish live prototypes (from v0, Replit, or Rocket) to a shareable URL in seconds, enabling real-device testing and stakeholder review without a development environment.', link: 'https://netlify.com', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }] },
    { slug: 'whisper', name: 'Whisper', category: 'Speech-to-Text', phases: ['Research', 'Audit', 'Strategy'], freemium: true, clientSafe: false, approvalRequired: true, skillLevels: ['junior', 'mid', 'senior'], description: 'OpenAI\'s highly robust open-source speech recognition system. Incredible accuracy for transcribing interviews or personal voice dictation.', link: 'https://openai.com/research/whisper', videos: [{ title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' }, { title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }] },
    { slug: 'voice-ink', name: 'Voice Ink', category: 'Speech-to-Text', phases: ['Strategy', 'Research', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Native dictation app for Mac. Excellent for rapidly speaking out UX briefs and notes instead of typing.', link: 'https://tryvoiceink.com/', videos: [{ title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' }, { title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }] },
    { slug: 'apple-dictation', name: 'Apple Dictation', category: 'Speech-to-Text', phases: ['Strategy', 'Research', 'Ideation', 'Audit'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Native built-in dictation on Apple devices. Entirely free, completely private with on-device processing, and zero setup required.', link: 'https://support.apple.com/guide/mac-help/dictate-messages-and-documents-mh40584/mac', videos: [{ title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' }, { title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }] },
    // -- Individual Tools --
    { slug: 'variant', name: 'Variant', category: 'Design', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI-powered design tool that generates multiple design variants from a single prompt or reference. Rapidly explore visual directions, layouts, and component options without manual duplication. Best for early-stage visual exploration and stakeholder alignment on design direction.', link: 'https://variant.com', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' }] },
    { slug: 'banani', name: 'Banani', category: 'Design', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'AI design tool focused on generating production-ready UI components and layouts. Combines prompt-based generation with a visual editor for rapid iteration. Useful for designers who want AI-generated starting points with full manual editing control.', link: 'https://www.banani.co/', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'How I\'d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' }] },
    // -- Claude Skills --
    { slug: 'claude-frontend-design-skill', name: 'Claude Frontend Design Skill', category: 'AI Assistant', phases: ['Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Gives Claude a design system before it touches any visual task. Install this skill and Claude will follow your typography, colour palette, spacing tokens, and component library conventions when generating UI code or design recommendations.', link: 'https://github.com/anthropics/skills/tree/main/skills/frontend-design', videos: [{ title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }, { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }] },
    { slug: 'claude-canvas-design-skill', name: 'Claude Canvas Design Skill', category: 'AI Assistant', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid', 'senior'], description: 'Describe what you want and get a social graphic, poster, or cover back. Claude generates visual assets from text descriptions using structured design principles. Ideal for quick stakeholder-facing visuals without opening a design tool.', link: 'https://github.com/anthropics/skills/tree/main/skills/canvas-design', videos: [{ title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }, { title: 'How I\'d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' }] },
    { slug: 'claude-brand-guidelines-skill', name: 'Claude Brand Guidelines Skill', category: 'AI Assistant', phases: ['Strategy', 'Design'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Encode your brand once and Claude never writes off-brand again. Define voice, tone, visual identity, and messaging guidelines as a skill. Every output Claude generates will follow your brand rules automatically.', link: 'https://github.com/anthropics/skills/tree/main/skills/brand-guidelines', videos: [{ title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }, { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }] },
    { slug: 'marketing-skills-pack', name: 'Marketing Skills by Corey Haines', category: 'AI Assistant', phases: ['Strategy', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: '20+ Claude skills for copywriting, email sequences, growth strategy, conversion rate optimisation, and content marketing. A comprehensive pack that turns Claude into a marketing specialist for UX-adjacent tasks like landing page copy and user onboarding flows.', link: 'https://github.com/coreyhaines31/marketingskills', videos: [{ title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }, { title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' }] },
    { slug: 'claude-skill-creator', name: 'Claude Skill Creator', category: 'AI Assistant', phases: ['Strategy', 'Research', 'Ideation', 'Design', 'Testing', 'Audit'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Build any custom Claude skill in under 5 minutes. Define a persona, instructions, and output format and Claude generates a reusable skill file. Use this to create bespoke UX workflow agents: research synthesiser, audit generator, design critic, or stakeholder communicator.', link: 'https://github.com/anthropics/skills/tree/main/skills/skill-creator', videos: [{ title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }, { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }] },
    // -- AI Stack Combos --
    { slug: 'combo-variant-stitch-aistudio', name: 'Variant + Google Stitch + AI Studio', category: 'AI Stack Combo', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Full functional prototyping stack. Use Variant to explore multiple design directions from prompts, Google Stitch to generate editable UI mockups, and Google AI Studio to add generative AI logic and test multimodal interactions. Goes from concept to interactive prototype in under 2 hours.', link: 'https://variant.com', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' }] },
    { slug: 'combo-stitch-claude', name: 'Google Stitch + Claude', category: 'AI Stack Combo', phases: ['Design', 'Strategy'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Design-to-intelligence combo. Use Google Stitch to generate UI layouts from text and image prompts, then Claude to add strategy layer: critique the design against heuristics, generate copy, write component specifications, and produce developer handoff documentation. From mockup to spec in one session.', link: 'https://stitch.withgoogle.com', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }] },
    { slug: 'combo-perplexity-claude-miro', name: 'Perplexity + Claude + Miro AI', category: 'AI Stack Combo', phases: ['Strategy', 'Research'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Full research-to-strategy stack. Perplexity for cited competitive intelligence, Claude for synthesis and problem brief generation, Miro AI for visual clustering and opportunity mapping. Compresses a 2-day strategy phase to 4-6 hours with source-backed outputs.', link: 'https://perplexity.ai', videos: [{ title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' }, { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' }] },
    { slug: 'combo-otter-dovetail-claude', name: 'Otter.ai + Dovetail + Claude', category: 'AI Stack Combo', phases: ['Research'], freemium: true, clientSafe: false, approvalRequired: true, skillLevels: ['mid', 'senior'], description: 'End-to-end primary research pipeline. Otter.ai for real-time interview transcription (300 min/month free), Dovetail for AI-powered pattern identification and tagging across transcripts, Claude for insight synthesis and stakeholder readout generation. Reduces research analysis from days to hours.', link: 'https://otter.ai', videos: [{ title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' }, { title: 'Top 7 AI Tools for UX Research', url: 'https://www.youtube.com/embed/Ns6mhkFV5yQ' }] },
    { slug: 'combo-figma-claude-maze', name: 'Figma + Claude + Maze', category: 'AI Stack Combo', phases: ['Design', 'Testing'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['mid', 'senior'], description: 'Design-test-iterate loop. Design in Figma with AI component suggestions, use Claude to generate usability test plans and A/B hypotheses, run unmoderated tests in Maze with AI summaries, then feed findings back to Claude for iteration priorities. Closes the design-test feedback loop in one day.', link: 'https://figma.com', videos: [{ title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' }, { title: 'Best AI Usability Testing Tools in 2024', url: 'https://www.youtube.com/embed/LfSqlnqFcuQ' }] },
    { slug: 'combo-v0-replit-netlify', name: 'v0 + Replit + Netlify', category: 'AI Stack Combo', phases: ['Design', 'Ideation'], freemium: true, clientSafe: true, approvalRequired: false, skillLevels: ['junior', 'mid'], description: 'Zero-to-live prototype in 30 minutes. v0 generates React components from text prompts, Replit provides a browser-based IDE to assemble and customize the code, Netlify deploys to a shareable URL instantly. No local dev environment needed. Ideal for solo designers and stakeholder demos.', link: 'https://v0.dev', videos: [{ title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' }, { title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' }] },
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
    { term: 'Severity Rating', definition: 'Scale used in UX audits to prioritise findings by impact, typically ranging from Critical and Major to Minor and Enhancement.' },
    { term: 'Client-safe', definition: 'A tool designation indicating it can be used with real user or client data without violating data handling agreements.' },
    { term: 'Stakeholder Alignment', definition: 'Process of ensuring all project decision-makers share understanding of goals, constraints, and success criteria.' },
    { term: 'Lo-fi Prototype', definition: 'Low-fidelity representation of a design, such as wireframes, sketches, or basic interactive mockups used for early validation.' },
    { term: 'Unmoderated Testing', definition: 'Usability testing where participants complete tasks without a facilitator present, typically using tools like Maze.' },
    { term: 'Predictive Heatmap', definition: 'AI-generated visualization predicting where users will look on a design, based on attention models trained on eye-tracking data.' },
    { term: 'A/B Testing', definition: 'Controlled experiment comparing two design variants to determine which performs better against defined success metrics.' },
    { term: 'Information Architecture', definition: 'The structural design of shared information environments, governing how content is organized, labeled, and navigated.' },
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
    { phase: 'Competitive Research Brief', manual: '4 to 6 hours', ai: '45 min', saving: '~80%', tool: 'Perplexity + Claude' },
    { phase: 'Interview Guide (5 sessions)', manual: '3 hours', ai: '40 min', saving: '~78%', tool: 'Claude' },
    { phase: 'Transcript Synthesis (5 interviews)', manual: '8 to 10 hours', ai: '2 to 3 hours', saving: '~70%', tool: 'Dovetail + Otter' },
    { phase: 'UX Audit (Heuristic Eval)', manual: '2 to 3 days', ai: '4 to 6 hours', saving: '~65%', tool: 'Claude + Screaming Frog' },
    { phase: 'Lo-fi Wireframes (10 screens)', manual: '1 to 2 days', ai: '4 to 6 hours', saving: '~55%', tool: 'v0 / Relume / Figma AI' },
    { phase: 'Usability Test Plan + Script', manual: '4 hours', ai: '1 hour', saving: '~75%', tool: 'Claude + Maze' },
    { phase: 'A/B Hypothesis Brief', manual: '2 to 3 hours', ai: '30 min', saving: '~82%', tool: 'Claude' },
  ];

  private readonly sectionContent: Record<string, WikiSectionContent> = {
    'introduction-to-ai-ml': {
      overview: 'Before you can use AI tools well, you need to understand how they actually work and where they reliably fail. LLMs predict the next token based on statistical patterns in training data. They do not reason, retrieve facts, or know when they are wrong. Hallucination is not a bug to be fixed - it is intrinsic to the architecture. Designers who understand this use AI as a powerful accelerant. Those who do not will ship flawed research, broken audit reports, and AI-generated copy that contradicts itself. This section gives you the critical foundation.',
      workflow: [
        { step: 'Trace the AI Timeline', tool: 'Self-directed reading', desc: 'From Turing (1950) and Shannon through the perceptron, symbolic AI winter, deep learning revival (Hinton 2006), ImageNet (2012), Transformers (2017), GPT-3 (2020), to the current LLM era. Context matters for evaluating AI capability claims.' },
        { step: 'Understand LLM Architecture', tool: 'Study + Claude Q&A', desc: 'LLMs are next-token predictors. They generate text by calculating probability distributions over a vocabulary. Ask Claude to explain its own architecture - the self-awareness is imperfect but instructive.' },
        { step: 'Map the Hallucination Risk', tool: 'Claude', desc: 'Prompt: "List 5 scenarios where you would hallucinate confidently in a UX research context." Use this output to build a personal hallucination risk checklist for your workflow.' },
        { step: 'Learn GAN and Diffusion Models', tool: 'Study', desc: 'Generative image models (Midjourney, DALL-E, Stable Diffusion) are Diffusion-based, not GANs. Understanding this helps you evaluate synthetic user research images and AI-generated personas critically.' },
        { step: 'Test the Limits of Free Tiers', tool: 'Claude / ChatGPT / Gemini', desc: 'Spend one hour deliberately trying to break each major model. Ask for citations (note hallucinations), ask for recent events (note training cutoffs), ask for competitor pricing (note confabulation). Document your findings.' },
        { step: 'Build Your AI Evaluation Framework', tool: 'Notion / Claude', desc: 'Create a personal scoring rubric: accuracy, citation reliability, context retention, instruction following, hallucination tendency. Apply it every time you adopt a new tool in your workflow.' },
      ],
      tools: [
        { name: 'Claude', use: 'Conceptual Q&A, architecture explanation, hallucination mapping', freeTier: 'Free tier available', clientSafe: true },
        { name: 'ChatGPT', use: 'Comparative testing, cross-model benchmarking', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Gemini', use: 'Google ecosystem AI, strong with Google Workspace integration', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Perplexity', use: 'AI with cited sources - use to validate LLM claims', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: [
        'Honest Assessment: No AI tool is reliable for factual lookups without source verification. Always treat LLM output as a strong first draft, not a finished artefact.',
        'Hallucination risk is highest in: specific statistics, competitor data, academic citations, recent events, and niche domain expertise.',
        'Suitable for all project types and seniority levels. No client data involved.',
      ],
      videos: [
        { title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' },
        { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' },
        { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' },
        { title: 'How I\'d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' },
      ],
      resources: [
        { title: 'Attention Is All You Need - Original Transformer Paper (2017)', url: 'https://arxiv.org/abs/1706.03762' },
        { title: 'Nielsen Norman Group - AI in UX Design: Current State', url: 'https://www.nngroup.com/articles/ai-ux/' },
        { title: 'Andrej Karpathy - Intro to Large Language Models (YouTube)', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g' },
        { title: 'AI Hallucination Explained - IBM Research', url: 'https://research.ibm.com/blog/ai-hallucinations' },
      ],
    },
    'ai-ux-for-strategy': {
      overview: 'Strategy is the UX phase most likely to be under-resourced and over-rushed. AI compresses the data-gathering and synthesis tasks that typically consume 60% of strategy time. Perplexity for competitive intelligence (cited, verifiable), Claude for brief synthesis and assumption stress-testing, Miro AI for post-session clustering. The human judgment layer stays in framing the right questions and prioritising what matters to this client, at this moment, in this market.',
      workflow: [
        { step: 'Stakeholder Note Synthesis', tool: 'Claude', desc: 'Paste raw stakeholder interview notes or meeting transcripts. Prompt: "Extract the key tensions, priority signals, unspoken assumptions, and success criteria from these notes. Structure as a problem brief." Review critically - AI surfaces patterns but may miss political subtext.' },
        { step: 'Competitive Landscape Research', tool: 'Perplexity', desc: 'Use Perplexity (not ChatGPT) for competitive research. It cites sources in real time. Prompt: "Analyse the competitive landscape for [product category] in [market]. Include pricing models, key differentiators, user sentiment from reviews, and recent product changes." Verify all claims.' },
        { step: 'Assumption Mapping', tool: 'Claude', desc: 'List your core project assumptions. Prompt Claude: "For each assumption, what is the strongest counter-argument? What data would disprove it? Rate each assumption by risk level." This de-risks strategy before design begins.' },
        { step: 'Opportunity Space Mapping', tool: 'Miro AI', desc: 'After a human-led workshop, paste sticky note content into Miro AI for automated clustering. Use the output as a starting point, not a final answer. AI clustering misses nuance - always do one human review pass.' },
        { step: 'Problem Brief Drafting', tool: 'Claude + Notion AI', desc: 'Draft the formal problem brief using Claude as a writing partner. Use Notion AI to restructure for client-readiness. Include: problem statement, user segment, success criteria, out-of-scope boundaries, and key assumptions.' },
        { step: 'HMW Question Generation', tool: 'Claude', desc: 'Prompt: "Generate 15 How Might We questions from this problem brief, ranging from narrow execution to broad systemic reframing." Use the widest ones as creative provocations in ideation sessions.' },
        { step: 'Strategy Stress-Test', tool: 'Claude', desc: 'Final check: "What are the three most likely ways this strategy fails? What early warning signals should we track? What assumptions are we most likely to be wrong about?" Build these into your project risk register.' },
      ],
      tools: [
        { name: 'Perplexity', use: 'Cited competitive research, market landscape', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Claude', use: 'Brief synthesis, assumption stress-testing, HMW generation', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Miro AI', use: 'Opportunity clustering post-workshop', freeTier: '3 boards free', clientSafe: true },
        { name: 'Notion AI', use: 'Client-ready strategy documentation', freeTier: 'Free tier available', clientSafe: true },
        { name: 'QoQo', use: 'Persona and problem statement generation', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Kraftful', use: 'Feedback and review synthesis for existing products', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: [
        'Honest Assessment: Perplexity Pro ($20/month) significantly outperforms the free tier for competitive research depth and source quality. The free tier is useful but limited.',
        'Fixed Bid: Cap strategy at 2 days maximum. AI compresses competitive research from 8 hours to 90 minutes. Use the saved time for stakeholder alignment, not more research.',
        'Consultancy: All strategy outputs should be client-presentable. Use Perplexity citations as evidence, not AI-generated text without sources.',
        'Warning: ChatGPT and Claude will fabricate competitor pricing, feature lists, and market share data. Always verify with primary sources.',
      ],
      videos: [
        { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' },
        { title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' },
        { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' },
        { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' },
      ],
      resources: [
        { title: 'Nielsen Norman Group - UX Strategy: Study Guide', url: 'https://www.nngroup.com/articles/ux-strategy/' },
        { title: 'UX Tigers - Learn UX Strategy', url: 'https://www.uxtigers.com/post/learn-ux-strategy' },
        { title: 'Strategyzer - Value Proposition Canvas', url: 'https://www.strategyzer.com/resources' },
        { title: 'Perplexity AI - Research use cases', url: 'https://perplexity.ai' },
        { title: 'UX Collective - AI in UX Strategy', url: 'https://uxdesign.cc/tagged/strategy' },
        { title: 'Google Stitch + Claude: AI Prototyping Combo (Instagram)', url: 'https://www.instagram.com/reel/DWIzCNxTDTN/?igsh=ZGxneGs2OXk4Z3l0' },
      ],
    },
    'primary-research': {
      overview: 'Primary research is the UX phase with the highest data sensitivity and the highest AI leverage. AI compresses the 70% of research time spent on logistics, transcription, and initial analysis, freeing practitioners to focus on the 30% that requires human interpretation: why users behave the way they do, what they cannot articulate, and what the data does not say. Critically, never run client user data through AI tools without explicit approval. Most platforms use your data for model training by default.',
      workflow: [
        { step: 'Research Objectives Definition', tool: 'Claude', desc: 'Before writing a single question, clarify objectives. Prompt: "Here are my project goals. What are the 5 most important questions I need answered to make informed design decisions? What would make this research fail to be actionable?" This prevents unfocused guides.' },
        { step: 'Interview Guide Generation', tool: 'Claude', desc: 'Feed objectives to Claude and generate a full interview guide. Then run the stress-test: "What are the 5 most common blind spots in interview guides like this? What leading questions did I accidentally include? What assumptions is this guide making about users?" Revise before the first session.' },
        { step: 'Screener Survey Creation', tool: 'Tally', desc: 'Build participant screeners in Tally - unlimited free forms, no watermark. Use Claude to write screening logic that identifies your target user profile without telegraphing who you want to recruit.' },
        { step: 'Session Transcription', tool: 'Otter.ai', desc: 'Real-time transcription: 300 minutes/month free. Enable auto-delete for sensitive sessions. Accuracy drops with strong accents and cross-talk - always review the first 5 minutes manually to catch systematic errors.' },
        { step: 'Async Research Sessions', tool: 'Loom', desc: '25 free videos per month. Replace synchronous interviews for fixed-bid projects. Send participants a structured video prompt, receive recorded responses. Saves 2-3 hours of scheduling per participant.' },
        { step: 'Pattern Identification', tool: 'Dovetail', desc: 'AI-powered tagging across transcripts. Upload multiple transcripts and use AI to surface recurring themes, sentiment patterns, and high-frequency quotes. Critical: Dovetail is NOT client-safe by default. Get explicit approval before loading real user data.' },
        { step: 'Insight Synthesis', tool: 'Claude + Notion AI', desc: 'Paste anonymised themes into Claude: "Here are 12 research themes from user interviews. Synthesize these into 5 actionable insight statements. For each, identify what it means for the design, what we are uncertain about, and what follow-up questions it raises." Use Notion AI to reformat for stakeholder delivery.' },
        { step: 'Research Readout Creation', tool: 'Notion AI', desc: 'Generate the stakeholder readout structure from synthesized insights. Include: key findings, design implications, confidence levels, and recommended next steps. Mark all AI-synthesized content for human review before sharing.' },
      ],
      tools: [
        { name: 'Claude', use: 'Research objectives, interview guides, insight synthesis', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Otter.ai', use: 'Real-time transcription', freeTier: '300 min/month free', clientSafe: true },
        { name: 'Dovetail', use: 'AI tagging, pattern identification across transcripts', freeTier: 'Free tier available', clientSafe: false },
        { name: 'Notably', use: 'Research repository, collaborative synthesis', freeTier: 'Free tier available', clientSafe: false },
        { name: 'Tally', use: 'Screener surveys, unlimited free', freeTier: 'Unlimited free', clientSafe: true },
        { name: 'Loom', use: 'Async video research sessions', freeTier: '25 videos free', clientSafe: true },
        { name: 'Synthetic Users', use: 'Simulated user feedback for early concept validation', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: [
        'Client Data Warning: Dovetail, Notably, and most AI research tools use uploaded data for model training by default. Check privacy settings and get explicit client approval before uploading real user transcripts.',
        'Honest Assessment: Synthetic Users is useful for early-stage directional validation but cannot replace real user research. Use it to pressure-test research plans, not as a substitute for human participants.',
        'Fixed Bid: Cap at 5 interviews maximum. Use Loom for async sessions to reduce scheduling cost. AI synthesis compresses analysis from 2 days to 4 hours.',
        'AI transcription accuracy is 85-92% on average. Always review before using quotes in deliverables - misattributed quotes in client reports are a serious credibility risk.',
      ],
      videos: [
        { title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' },
        { title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' },
        { title: 'Top 7 AI Tools for UX Research', url: 'https://www.youtube.com/embed/Ns6mhkFV5yQ' },
        { title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' },
      ],
      resources: [
        { title: 'Nielsen Norman Group - User Interviews: How to Conduct Them', url: 'https://www.nngroup.com/articles/user-interviews/' },
        { title: 'Dovetail - GDPR and data handling policy', url: 'https://dovetail.com/legal/privacy/' },
        { title: 'UX Research Cheat Sheet - NNGroup', url: 'https://www.nngroup.com/articles/ux-research-cheat-sheet/' },
        { title: 'Steve Portigal - Interviewing Users (book summary)', url: 'https://portigal.com/books/interviewing-users/' },
      ],
    },
    'secondary-research': {
      overview: 'Secondary research is the highest-leverage, lowest-risk AI use case in UX. All data is public, there are no client data concerns, and AI dramatically compresses research time without introducing meaningful quality risk. The critical skill is source verification: Perplexity cites sources, ChatGPT fabricates them. Use the right tool for each job. A well-executed secondary research phase eliminates entire categories of interview questions by revealing what is already known.',
      workflow: [
        { step: 'Competitive Landscape Scan', tool: 'Perplexity', desc: 'Start with Perplexity for cited competitive intelligence. Prompt: "Who are the top 6 competitors for [product type] in [market]? For each: pricing model, key differentiators, user-reported pain points from app store reviews and Reddit, and recent product changes." All claims come with sources - verify the top 5.' },
        { step: 'Academic Literature Review', tool: 'Elicit', desc: 'Elicit extracts key findings from academic papers. Search for relevant research on your user problem domain. Use it to build an evidence-based design rationale that elevates your work from opinion to research-backed decisions. Free tier: 5,000 papers.' },
        { step: 'Trend Signal Identification', tool: 'Exploding Topics', desc: 'Identify macro trends 6-18 months before they peak. Use for strategic framing: "This design decision aligns with an emerging behaviour pattern in [segment]." Free tier shows trending topics with limited historical depth.' },
        { step: 'Industry Report Synthesis', tool: 'Claude', desc: 'Upload or paste sections from industry reports (Gartner, Forrester, Statista PDFs). Prompt: "Extract the 10 most relevant findings for a UX designer working on [product domain]. Focus on user behaviour data, adoption rates, and friction points." Review all statistics before using in deliverables.' },
        { step: 'Reddit and Review Mining', tool: 'Claude + manual', desc: 'Manually collect 20-30 user reviews (App Store, G2, Reddit, Trustpilot) for competitors. Paste into Claude: "What are the top 5 recurring complaints, top 5 recurring praise points, and the 3 most emotionally charged user frustrations in these reviews?"' },
        { step: 'Structured Synthesis Brief', tool: 'Claude + Notion AI', desc: 'Combine all secondary research into a single structured brief. Claude: "Synthesize these research outputs into a secondary research brief with sections for: market context, user behaviour patterns, competitive gaps, and design opportunities." Use Notion AI to format for client presentation.' },
      ],
      tools: [
        { name: 'Perplexity', use: 'Cited web research, competitive landscape', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Elicit', use: 'Academic paper synthesis, evidence-based rationale', freeTier: 'Free tier (5,000 papers)', clientSafe: true },
        { name: 'Exploding Topics', use: 'Trend signals 6-18 months early', freeTier: 'Free basic access', clientSafe: true },
        { name: 'Claude', use: 'Report synthesis, review analysis, structured briefing', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Notion AI', use: 'Client-ready documentation and structuring', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: [
        'Honest Assessment: ChatGPT and Claude will fabricate academic citations if you ask them directly. Always use Elicit or Perplexity for source-backed research, not conversational LLMs.',
        'All tools in this phase are client-safe - no user data is processed. Secondary research can begin immediately on any project without approval gates.',
        'Fixed Bid: Secondary research can be completed in 4-6 hours with this workflow (vs. 2+ days manually). Time saving is highest here of any UX phase.',
        'Perplexity Pro ($20/month) gives access to academic papers and deeper research modes. The free tier is viable but caps depth significantly.',
      ],
      videos: [
        { title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' },
        { title: 'Top 7 AI Tools for UX Research', url: 'https://www.youtube.com/embed/Ns6mhkFV5yQ' },
        { title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' },
      ],
      resources: [
        { title: 'Nielsen Norman Group - Secondary Research in UX', url: 'https://www.nngroup.com/articles/secondary-research-in-ux/' },
        { title: 'Elicit - AI Research Assistant', url: 'https://elicit.com' },
        { title: 'Statista - Market and Consumer Data', url: 'https://statista.com' },
        { title: 'UX Collective - Secondary Research Methods', url: 'https://uxdesign.cc/tagged/research' },
      ],
    },
    'ideation-brainstorming': {
      overview: 'This is the phase where AI is most misused. LLMs are trained on the statistical average of human output. When you ask "give me 10 ideas," you get the 10 most expected, most averaged, least surprising ideas possible. That is not ideation - that is retrieval. Real ideation requires divergence, discomfort, and unexpected connections. Use AI as a provocation engine and a clustering tool, not as the idea generator. The human creative phase must come first.',
      workflow: [
        { step: 'Human-First Brainstorm', tool: 'Whiteboard / Miro', desc: 'Run a 25-minute human-only ideation session before touching AI. Individual ideation first (10 min), then share and build. This prevents the AI anchoring effect where everyone defaults to the first plausible AI suggestion.' },
        { step: 'Cross-Industry Provocation', tool: 'Claude / ChatGPT', desc: 'Prompt: "How would a hospital solve this problem? How would a game designer approach this? How would this work if the constraint [X] did not exist? What would the most counterintuitive solution look like?" Use these as provocations, not final ideas.' },
        { step: 'Divergent Prompt Sequences', tool: 'Claude', desc: 'Use chained "yes and" prompting. Start with a concept, then: "Yes and - take this further." Then: "Now invert the core assumption." Then: "What would the version for a completely different user segment look like?" Build idea trees, not idea lists.' },
        { step: 'Post-Session AI Clustering', tool: 'Miro AI', desc: 'After the human session, paste all sticky note content into Miro AI for automated thematic clustering. This surfaces patterns humans miss when they are close to the material. Treat as input to discussion, not final groupings.' },
        { step: 'Concept Stress-Testing', tool: 'Claude', desc: 'For the top 3-5 concepts: "What are the three most likely failure modes of this concept? Who would hate this and why? What assumptions must be true for this to work? What is the cheapest way to test the riskiest assumption?"' },
        { step: 'Concept Naming and Framing', tool: 'Claude', desc: 'Generate 10 names and one-sentence descriptions for each concept. Good naming accelerates stakeholder alignment. Prompt: "Name this concept in a way that makes the value proposition immediately clear. Avoid jargon."' },
        { step: 'Decision Matrix', tool: 'Claude + Notion', desc: 'Evaluate concepts against: user value, technical feasibility, business viability, time to prototype. Claude can populate the matrix from concept descriptions. Human team finalises scores and selects direction.' },
      ],
      tools: [
        { name: 'Claude', use: 'Divergent prompting, stress-testing, concept framing', freeTier: 'Free tier available', clientSafe: true },
        { name: 'ChatGPT', use: 'Cross-industry analogies, unconventional reframes', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Miro AI', use: 'Post-brainstorm clustering, affinity mapping', freeTier: '3 boards free', clientSafe: true },
        { name: 'QoQo', use: 'Persona and journey map generation to fuel ideation', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: [
        'Honest Assessment: AI ideation produces competent, safe, expected ideas. It is optimised for the average. If your goal is truly novel concepts, use AI for provocation and stress-testing, not primary generation.',
        'Anchoring Risk: If you show AI ideas to a team before human ideation, the team will unconsciously anchor to those ideas. Always human-first.',
        'AI ideation must follow, not replace, human creative sessions in any client-facing deliverable.',
        'Monitor for premature convergence: AI naturally narrows options. Build in explicit divergence gates before any convergence moves.',
      ],
      videos: [
        { title: 'Brainstorm and Ideate with Generative AI', url: 'https://www.youtube.com/embed/vLQS24xc1WY' },
        { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' },
        { title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' },
      ],
      resources: [
        { title: 'Stanford d.school - Ideation Methods', url: 'https://dschool.stanford.edu/resources/ideation' },
        { title: 'IDEO - Design Thinking Ideation Techniques', url: 'https://designthinking.ideo.com' },
        { title: 'NNGroup - Ideation for Everyday Design Challenges', url: 'https://www.nngroup.com/articles/ux-ideation/' },
        { title: 'UX Collective - AI Ideation: Honest Assessment', url: 'https://uxdesign.cc/tagged/ideation' },
      ],
    },
    'design-prototyping': {
      overview: 'AI design tool selection is entirely dependent on your context: team size, design system maturity, client type, and project scope. A solo consultant on a fixed-bid project has completely different needs than an enterprise design team managing 15 Figma libraries. This section maps tools to contexts honestly, including where each tool falls short and what the real cost is at scale.',
      workflow: [
        { step: 'Assess Design System Maturity', tool: 'Audit exercise', desc: 'Before selecting tools, audit your situation: No design system (use scaffolding tools: v0, Relume, Uizard). Partial system (use Figma AI with existing components). Established system (use Figma governance + token audit with Claude Code). Mismatched tools destroy more time than they save.' },
        { step: 'Information Architecture', tool: 'Relume + Claude', desc: 'Relume generates sitemaps and wireframe structures from text prompts. Paste the sitemap into Claude: "What navigation patterns are missing? What user journeys are not supported? Where would users most likely get lost?" Relume free tier supports basic sitemap generation.' },
        { step: 'Lo-fi Wireframe Scaffolding', tool: 'v0 / Uizard / Visily', desc: 'For rapid wireframing without a design system: v0 (Vercel) for React component generation; Uizard for sketch-to-wireframe conversion; Visily for screenshot-to-editable-wireframe. These tools produce starting points, not final designs. Expect to spend 30-40% of the saved time on corrections.' },
        { step: 'Hi-fi Design', tool: 'Figma AI', desc: 'Figma AI features: component suggestions, auto-layout assistance, design inconsistency detection, and text rewriting. Most useful for teams with established component libraries. Honest assessment: Figma AI saves 20-30 minutes per screen on component placement, not on design thinking.' },
        { step: 'Motion and Interaction', tool: 'Google AntiGravity / Framer', desc: 'For animated prototypes and micro-interactions: Google AntiGravity generates animated UI from text and image prompts. Framer bridges design and live website with built-in animation. Use for concept demos and stakeholder alignment, not production handoff.' },
        { step: 'Design-to-Code Handoff', tool: 'Locofy / Figma Dev Mode', desc: 'Locofy converts Figma designs to React, Vue, and HTML/CSS. Figma Dev Mode provides developer-ready annotations. Honest assessment: AI-generated code from design tools typically requires 40-60% developer refinement. It reduces, not eliminates, handoff friction.' },
        { step: 'Design System Token Audit', tool: 'Claude Code / Figr Design', desc: 'For enterprise teams: Claude Code can audit design token consistency across Figma files via the API. Figr Design manages token systems at scale. Run token audits before any significant new component work to avoid duplication.' },
      ],
      tools: [
        { name: 'Figma', use: 'Primary design tool, component libraries, prototyping', freeTier: 'Free tier available (limited files)', clientSafe: true },
        { name: 'v0 by Vercel', use: 'Text-to-component scaffolding for solo designers', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Relume', use: 'Sitemap and wireframe generation', freeTier: 'Free tier (limited exports)', clientSafe: true },
        { name: 'Google AntiGravity', use: 'Animated UI prototypes from text/image prompts', freeTier: 'Free (Google Labs)', clientSafe: true },
        { name: 'Framer', use: 'Design-to-publish with advanced animation', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Uizard', use: 'Sketch and screenshot to wireframe conversion', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Locofy', use: 'Design-to-code for React, Vue, HTML/CSS', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Penpot', use: 'Open-source Figma alternative, self-hostable', freeTier: 'Fully free and open-source', clientSafe: true },
      ],
      constraints: [
        'Honest Assessment: v0 and Uizard produce 60-70% quality output that requires significant refinement. They save time on structure, not on design quality.',
        'Enterprise Warning: No new components should be created without an AI-assisted audit of existing coverage. Component sprawl is the leading design system debt driver.',
        'Figma free tier limits you to 3 active projects. For client work, a professional plan ($15/editor/month) is effectively required.',
        'Locofy and design-to-code tools produce code that needs 40-60% developer review. Set accurate expectations with engineering partners.',
      ],
      videos: [
        { title: 'AI Design Workflow - From Concept to Deployed App', url: 'https://www.youtube.com/embed/GBl3H7bSwkE' },
        { title: 'Figma AI Features - Complete 2026 Guide', url: 'https://www.youtube.com/embed/s3unZGKIkWc' },
        { title: 'How I\'d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' },
        { title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' },
        { title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' },
      ],
      resources: [
        { title: 'NNGroup - Prototyping Study Guide', url: 'https://www.nngroup.com/articles/prototyping/' },
        { title: 'Figma - Design System Best Practices', url: 'https://www.figma.com/resource-library/design-systems/' },
        { title: 'Laws of UX - For design decision making', url: 'https://lawsofux.com' },
        { title: 'Design Systems Handbook - InVision', url: 'https://www.designbetter.co/design-systems-handbook' },
        { title: 'Claude Frontend Design Skill - Design system for Claude', url: 'https://github.com/anthropics/skills/tree/main/skills/frontend-design' },
        { title: 'Claude Canvas Design Skill - AI graphic generation', url: 'https://github.com/anthropics/skills/tree/main/skills/canvas-design' },
        { title: 'Claude Brand Guidelines Skill - Keep AI on-brand', url: 'https://github.com/anthropics/skills/tree/main/skills/brand-guidelines' },
        { title: 'Claude Skill Creator - Build custom AI skills in 5 min', url: 'https://github.com/anthropics/skills/tree/main/skills/skill-creator' },
        { title: 'Banani - AI design tool', url: 'https://www.banani.co/' },
      ],
    },
    'usability-testing': {
      overview: 'AI reduces the time cost of quantitative analysis and task measurement dramatically. It does not replace human interpretation of why users behaved a certain way. The most common misuse is treating AI test summaries as conclusions rather than starting points. An AI summary tells you what happened. Your job is to understand why and what it means for the design.',
      workflow: [
        { step: 'Test Plan Generation', tool: 'Claude', desc: 'Prompt: "I am testing [product] with [user segment]. My design hypotheses are [X, Y, Z]. Generate a usability test plan with 5 tasks, success criteria for each, and the key questions we need to answer. Include a realistic time estimate per task." Review and adjust before sending to participants.' },
        { step: 'Unmoderated Test Setup', tool: 'Maze', desc: 'Maze runs unmoderated tests with completion rates, time-on-task, misclick maps, and AI-generated summaries. Free tier: limited monthly responses. For most fixed-bid projects, this is sufficient. Honest assessment: Maze AI summaries are good for quantitative patterns but miss emotional nuance.' },
        { step: 'Live Session Heatmaps', tool: 'Microsoft Clarity', desc: 'Free, unlimited heatmaps and session recordings with AI-generated session summaries. Best for post-launch monitoring. Install early - data compounds over time. No response caps, no cost. The AI summary feature identifies sessions with rage-clicks and confusion patterns automatically.' },
        { step: 'Pre-Launch Predictive Testing', tool: 'Attention Insight', desc: 'Attention Insight uses AI trained on eye-tracking data to predict where users will look on your design. Use before launch to identify if critical CTAs and key content are within the predicted attention zone. Honest: paid-only, but can save one full testing round on high-stakes projects.' },
        { step: 'Session Recording Analysis', tool: 'Microsoft Clarity + Claude', desc: 'Export session summary data from Clarity. Paste patterns into Claude: "Users in 40% of sessions showed rage-click behaviour on [element]. What are the 5 most likely causes? What design changes would address each?" Use this as hypothesis generation, not diagnosis.' },
        { step: 'A/B Test Hypothesis Creation', tool: 'Claude', desc: 'Prompt: "Here are two design variants for [screen]. Generate 3 A/B test hypotheses, each with: the change being tested, the expected outcome, the success metric, and the minimum sample size needed for 95% confidence." Use a sample size calculator to verify Claude\'s estimates.' },
        { step: 'Findings Synthesis', tool: 'Claude + Notion AI', desc: 'Paste anonymised test observations into Claude: "Categorise these usability observations by severity (critical, major, minor). For each critical issue, suggest one design fix. For major issues, suggest two alternatives." Structure the final report in Notion AI for stakeholder delivery.' },
      ],
      tools: [
        { name: 'Maze', use: 'Unmoderated testing, AI summaries, task metrics', freeTier: 'Limited free responses/month', clientSafe: true },
        { name: 'Microsoft Clarity', use: 'Free heatmaps, session recordings, AI summaries', freeTier: 'Completely free, unlimited', clientSafe: true },
        { name: 'Attention Insight', use: 'Predictive pre-launch heatmaps', freeTier: 'Paid only', clientSafe: true },
        { name: 'Claude', use: 'Test plan, hypothesis generation, findings synthesis', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Loom', use: 'Participant think-aloud recording', freeTier: '25 videos free', clientSafe: true },
      ],
      constraints: [
        'Honest Assessment: Maze free tier is very limited. For more than 2 tests per month, UserTesting or Lookback are more appropriate but significantly more expensive.',
        'AI test summaries are pattern-detectors, not insight-generators. "40% of users clicked the wrong button" requires human interpretation: Was the label confusing? Was the visual hierarchy wrong? Was the mental model mismatched?',
        'Statistical significance: For A/B tests, you typically need 1,000+ users per variant for reliable results. Small sample tests generate directional signal, not decisions.',
        'Rage-click and dead-click data from Clarity is invaluable for audit and redesign projects. Install on all new projects from day one.',
      ],
      videos: [
        { title: 'Best AI Usability Testing Tools in 2024', url: 'https://www.youtube.com/embed/LfSqlnqFcuQ' },
        { title: 'Optimize Designs with AI Attention Heatmaps', url: 'https://www.youtube.com/embed/zRCiMb-LVBY' },
        { title: 'Usability Testing for AI Systems - Exclusive Lesson', url: 'https://www.youtube.com/embed/2HLVLP_Htv4' },
        { title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' },
      ],
      resources: [
        { title: 'NNGroup - Usability Testing 101', url: 'https://www.nngroup.com/articles/usability-testing-101/' },
        { title: 'Microsoft Clarity - Documentation', url: 'https://clarity.microsoft.com' },
        { title: 'Maze - Usability Testing Guide', url: 'https://maze.co/guides/usability-testing/' },
        { title: 'NNGroup - A/B Testing and Usability', url: 'https://www.nngroup.com/articles/ab-testing/' },
      ],
    },
    'heuristic-evaluation': {
      overview: 'A UX audit is one of the most directly billable engagements in UX consulting. Without AI, a comprehensive heuristic evaluation takes 2-3 days. With AI, the same quality of output is achievable in 4-6 hours. This is not about doing less work - it is about compressing the mechanical parts (checklist generation, severity rating, report structuring) so you spend more time on the high-judgment parts: prioritisation, stakeholder framing, and recommendation quality.',
      workflow: [
        { step: 'Context-Specific Heuristic Checklist', tool: 'Claude', desc: 'Do not use generic Nielsen heuristics. Prompt: "I am auditing a [product type] used by [user segment] for [primary task]. Generate a 40-point heuristic checklist specific to this context, organised by severity risk. Include mobile-specific heuristics if applicable." Generic checklists miss context-specific failure modes.' },
        { step: 'Technical Crawl', tool: 'Screaming Frog', desc: 'Run the free version (under 500 URLs) to identify broken links, redirect chains, missing meta descriptions, duplicate page titles, and accessibility flags. Export to CSV. This data feeds directly into the technical section of your audit report.' },
        { step: 'Accessibility Audit', tool: 'WAVE + Axe DevTools', desc: 'WAVE browser extension and Axe DevTools free tier both identify WCAG violations automatically. Run both because they catch different issues. Prompt Claude: "Here are the accessibility violations found. Prioritise by user impact for [disability type]. What are the legal risk implications for each Critical violation?"' },
        { step: 'Heuristic Evaluation Walk-through', tool: 'Manual + Claude', desc: 'Walk through the product manually against your custom checklist. Document raw observations as bullet points. Do not structure as findings yet - raw capture is faster and less biasing than structured capture.' },
        { step: 'Severity Rating and Structuring', tool: 'Claude', desc: 'Paste raw observations into Claude: "Rate each observation by UX severity: Critical (blocks task completion), Major (significantly impairs experience), Minor (annoyance), Enhancement (improvement opportunity). For each Critical and Major finding, write a one-sentence evidence statement and a one-sentence design recommendation." Review every rating before finalising.' },
        { step: 'Findings Categorisation', tool: 'Claude', desc: 'Group findings by heuristic category: Navigation, Content, Interaction, Visual Design, Accessibility, Performance. Generate a severity matrix showing finding count by category and severity. This becomes the executive visual in your report.' },
        { step: 'Executive Summary', tool: 'Notion AI', desc: 'Prompt Notion AI: "Write a 200-word executive summary for a UX audit with these key findings. Audience: non-design leadership. Include: top 3 business impact risks, most critical finding, and recommended immediate action." Use this as the opening page of the report.' },
        { step: 'Recommendation Roadmap', tool: 'Claude', desc: 'Generate a prioritised roadmap: Quick wins (under 1 day), short-term (1 sprint), medium-term (1-3 months). Prompt: "Organise these audit recommendations into a delivery roadmap by effort vs. impact. Prioritise by highest impact / lowest effort for the quick wins quadrant."' },
      ],
      tools: [
        { name: 'Claude', use: 'Custom heuristics, severity rating, structuring, recommendations', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Screaming Frog', use: 'Technical crawl, broken links, accessibility flags', freeTier: 'Free under 500 URLs', clientSafe: true },
        { name: 'Notion AI', use: 'Executive summary, report formatting', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Microsoft Clarity', use: 'Behavioural data, rage clicks, session evidence', freeTier: 'Completely free', clientSafe: true },
        { name: 'WAVE', use: 'WCAG accessibility violation detection', freeTier: 'Free browser extension', clientSafe: true },
      ],
      constraints: [
        'Honest Assessment: AI severity ratings are a starting point, not a final judgment. Always apply your own professional judgment to severity - AI has no context for business risk, legal exposure, or client priorities.',
        'Consultant impact: AI compresses a 3-day audit to 4-6 hours. This directly improves fixed-bid economics and allows more thorough coverage in the same budget.',
        'Screaming Frog free tier caps at 500 URLs. Most small-to-medium sites are under this limit. For enterprise sites, either the paid version ($259/year) or manual sampling is required.',
        'Accessibility audits expose legal liability. For any WCAG Critical violations, frame the risk in terms of ADA/WCAG compliance and legal exposure, not just user experience.',
      ],
      videos: [
        { title: 'Usability Testing for AI Systems - Exclusive Lesson', url: 'https://www.youtube.com/embed/2HLVLP_Htv4' },
        { title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' },
        { title: 'Best AI Usability Testing Tools in 2024', url: 'https://www.youtube.com/embed/LfSqlnqFcuQ' },
      ],
      resources: [
        { title: 'Nielsen Norman - 10 Usability Heuristics for User Interface Design', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/' },
        { title: 'WCAG 2.1 - Web Content Accessibility Guidelines', url: 'https://www.w3.org/TR/WCAG21/' },
        { title: 'Screaming Frog SEO Spider - Download', url: 'https://www.screamingfrog.co.uk/seo-spider/' },
        { title: 'WAVE Web Accessibility Evaluation Tool', url: 'https://wave.webaim.org' },
      ],
    },
    'how-to-use-llms-for-free': {
      overview: 'The most powerful AI models in the world are accessible at zero cost. Claude 3.5 Sonnet, GPT-4o, and Gemini 1.5 Pro all have generous free tiers. Open-source alternatives via Groq run Llama 3 at speeds that exceed paid cloud services. Local execution via Ollama gives you 100% private, 100% free AI on Apple Silicon. This section maps every viable free-tier strategy for UX practitioners.',
      workflow: [
        { step: 'Official Free Tiers - Daily Workflow', tool: 'Claude / ChatGPT / Gemini', desc: 'Claude free tier: ~20 messages/day on Sonnet 3.5. ChatGPT free tier: GPT-4o mini with unlimited usage, GPT-4o limited. Gemini free: Gemini 1.5 Flash unlimited, Pro limited. Strategy: use Claude for deep synthesis and long-context work, ChatGPT for ideation, Gemini for Google Workspace integration.' },
        { step: 'Open-Source Models via Groq', tool: 'Groq', desc: 'Groq hosts Llama 3 (Meta) and Mixtral (Mistral AI) on custom hardware (LPUs) at speeds faster than any cloud GPU. Free API access with daily rate limits. Llama 3 70B is competitive with GPT-3.5 on most UX tasks. Use for high-volume tasks that hit free tier limits.' },
        { step: 'Browser-Based Open Models', tool: 'HuggingFace Spaces', desc: 'HuggingFace hosts hundreds of open-source models via Spaces, many with free inference. Use for: image generation (Stable Diffusion), text summarisation, classification tasks, and code generation. Quality varies significantly - test before adopting in workflow.' },
        { step: 'Local Execution with Ollama', tool: 'Ollama', desc: 'Ollama runs LLMs locally on macOS, Linux, and Windows. Llama 3 8B runs on M1 MacBook Air. Llama 3 70B requires M2 Max or better. Zero cost, zero data risk - all processing stays on device. Best for: sensitive client data, offline work, unlimited usage without rate limits. Setup: 15 minutes.' },
        { step: 'Research-Grade Free Access', tool: 'Perplexity Free / Elicit Free', desc: 'Perplexity free tier gives cited web research with GPT-4 and Claude-class models. Elicit free tier processes 5,000 papers. For secondary research, these two tools eliminate the need for any paid subscriptions in most UX projects.' },
        { step: 'Prompt Efficiency to Extend Free Tiers', tool: 'Claude / ChatGPT', desc: 'Batch your requests: instead of 10 separate messages, send one structured prompt with 10 questions. Use system-level context in the first message to avoid repeating project context. This can 3-5x your effective free tier capacity.' },
      ],
      tools: [
        { name: 'Claude.ai', use: 'Best for synthesis, long-context, nuanced analysis', freeTier: '~20 messages/day on Sonnet 3.5', clientSafe: true },
        { name: 'ChatGPT', use: 'Best for ideation, code, and versatile tasks', freeTier: 'GPT-4o mini unlimited, GPT-4o limited', clientSafe: true },
        { name: 'Gemini', use: 'Best for Google Workspace integration, multimodal', freeTier: 'Gemini 1.5 Flash unlimited', clientSafe: true },
        { name: 'Groq', use: 'Fastest Llama 3 inference, free API', freeTier: 'Free with daily rate limits', clientSafe: true },
        { name: 'Ollama', use: '100% local, private, unlimited, no cost', freeTier: 'Completely free and open source', clientSafe: true },
        { name: 'Perplexity', use: 'Cited research with AI synthesis', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Elicit', use: 'Academic paper synthesis', freeTier: 'Free (5,000 papers)', clientSafe: true },
      ],
      constraints: [
        'Honest Assessment: Free tiers have meaningful limitations. Claude free hits daily limits quickly on intensive projects. GPT-4o free is rate-limited. For professional daily use, at least one paid subscription ($20/month) is practically necessary.',
        'Local execution (Ollama) requires Apple Silicon (M1+) or a dedicated GPU for practical performance. Intel Macs and older hardware will run models too slowly for workflow use.',
        'Open-source models (Llama 3, Mixtral) are excellent for many tasks but trail frontier models (Claude 3.5 Sonnet, GPT-4o) on nuanced synthesis and complex reasoning. Test on your specific use cases.',
      ],
      videos: [
        { title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' },
        { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' },
      ],
      resources: [
        { title: 'Groq - Fast AI Inference (Free API)', url: 'https://groq.com' },
        { title: 'Ollama - Run LLMs Locally', url: 'https://ollama.ai' },
        { title: 'HuggingFace Spaces - Free Model Inference', url: 'https://huggingface.co/spaces' },
        { title: 'X: Expert tips on Free LLM Access', url: 'https://x.com/Ubermenscchh/status/2035390128819167502' },
      ],
    },
    'foundations-of-ui-design': {
      overview: 'AI tools generate UI at the speed of thought. But speed without judgment produces fast, mediocre outputs. Laws of UX, Gestalt psychology, visual hierarchy, and accessibility principles are the quality filter that separates AI-accelerated work that is genuinely good from AI-generated work that merely looks plausible. You cannot critique AI output effectively without this foundation. You cannot defend design decisions to stakeholders without this vocabulary.',
      workflow: [
        { step: 'Laws of UX - Core 10', tool: 'lawsofux.com', desc: 'Study: Hick\'s Law (decision complexity), Fitts\'s Law (target acquisition), Jakob\'s Law (convention expectations), Miller\'s Law (cognitive chunking), Doherty Threshold (response time and engagement), Tesler\'s Law (conservation of complexity), and the Peak-End Rule (experience memory). Each maps directly to a design decision category.' },
        { step: 'Gestalt Principles Application', tool: 'Interaction Design Foundation', desc: 'The 7 principles - proximity, similarity, continuation, closure, figure/ground, symmetry, common fate - explain why layouts feel cohesive or broken. Apply one per screen: "What groupings am I communicating via proximity? Where does the figure/ground relationship create confusion?"' },
        { step: 'Visual Hierarchy Audit', tool: 'Claude', desc: 'Screenshot a design. Prompt Claude: "Describe the visual hierarchy of this layout. What does the eye see first, second, and third? Is this the intended reading order? What hinders the hierarchy?" Use this before every hi-fi review.' },
        { step: 'Colour and Contrast Foundations', tool: 'Colour Contrast Analyser / Figma', desc: 'WCAG AA requires 4.5:1 contrast for normal text, 3:1 for large text. Use the free Colour Contrast Analyser or Figma\'s built-in accessibility check. Study colour psychology: red urgency, blue trust, green success. These are not decorative choices.' },
        { step: 'Typography Fundamentals', tool: 'Self-directed + Figma', desc: 'Type scale (8pt grid), line height (1.4-1.6 for body), measure (45-75 characters per line), weight contrast for hierarchy. Prompt Claude: "Review this type system for readability issues. Reference WCAG text requirements and typographic best practices." Apply to every design review.' },
        { step: 'AI Design Critique Against Principles', tool: 'Claude', desc: 'Build a personal critique prompt template: "Review this design against: (1) Gestalt grouping principles, (2) Fitts\'s Law for interactive targets, (3) Hick\'s Law for decision points, (4) WCAG 2.1 contrast requirements. List violations and their user impact." Use at every review stage.' },
        { step: 'Component Decision Documentation', tool: 'Claude + Notion', desc: 'For every significant component decision, document the principle it applies: "This navigation pattern applies Jakob\'s Law - users expect [convention]. Departure from convention requires [justification]." This makes design rationale defensible and teachable.' },
      ],
      tools: [
        { name: 'lawsofux.com', use: 'Primary reference for psychology-backed design principles', freeTier: 'Free', clientSafe: true },
        { name: 'Claude', use: 'Design critique, principle application, rationale generation', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Figma', use: 'Implementation and accessibility checking', freeTier: 'Free tier available (limited)', clientSafe: true },
        { name: 'Interaction Design Foundation', use: 'Deep-dive learning on all foundational topics', freeTier: 'Limited free articles, paid courses', clientSafe: true },
        { name: 'WAVE', use: 'Live accessibility and contrast checking', freeTier: 'Free browser extension', clientSafe: true },
      ],
      constraints: [
        'Honest Assessment: No AI tool can tell you if a design is good. It can tell you if it violates measurable principles. Design quality requires human judgment informed by deep principle knowledge.',
        'Foundation-first rule: Do not use AI to generate UI until you can explain why a layout works using at least 3 principles. If you cannot explain it, you cannot critique AI output.',
        'Accessibility is not optional. WCAG 2.1 AA is the legal minimum in most jurisdictions. Treat contrast failures and missing ARIA labels as bugs, not style choices.',
      ],
      videos: [
        { title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' },
        { title: 'How I\'d Learn UI/UX Design In 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' },
        { title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' },
      ],
      resources: [
        { title: 'Laws of UX - lawsofux.com', url: 'https://lawsofux.com' },
        { title: 'Gestalt Principles - Interaction Design Foundation', url: 'https://www.interaction-design.org/literature/topics/gestalt-principles' },
        { title: 'WCAG 2.1 - Web Content Accessibility Guidelines (W3C)', url: 'https://www.w3.org/TR/WCAG21/' },
        { title: 'Refactoring UI - Visual Design for Developers and Designers', url: 'https://refactoringui.com' },
        { title: 'Google Material Design - Design Foundations', url: 'https://m3.material.io/foundations' },
      ],
    },
    'design-thinking': {
      overview: 'Design thinking is a human-centred, iterative methodology for solving complex problems. Its five phases - Empathize, Define, Ideate, Prototype, Test - are not a linear process; they are a thinking mode. AI accelerates execution within each phase but is structurally incapable of doing the one thing design thinking requires: genuine empathy with real humans. Use AI to move faster inside a framework you understand deeply. Do not use AI to skip the empathy phase.',
      workflow: [
        { step: 'Empathize - Research Planning', tool: 'Claude + QoQo', desc: 'Define who you are empathising with and what you need to understand. Use QoQo to generate initial proto-personas. Use Claude to identify what secondary research already exists and what gaps require primary research. Build empathy maps before writing any interview questions.' },
        { step: 'Empathize - Field Research', tool: 'Otter.ai + Loom', desc: 'Conduct 5-8 user interviews. Use Otter.ai for real-time transcription (300 min/month free). For fixed-bid projects, use Loom for async research (25 free videos). The goal: understand context, mental models, jobs-to-be-done, and emotional friction - things AI cannot simulate.' },
        { step: 'Define - Insight Synthesis', tool: 'Claude + Miro AI', desc: 'Paste anonymised interview themes into Claude: "Synthesize these research insights into a clear problem statement using the format: [User type] needs [need] because [insight]. Generate 5 How Might We questions at different scales of ambition." Use Miro AI to cluster themes visually.' },
        { step: 'Define - Problem Statement', tool: 'Claude', desc: 'A good problem statement is specific, human-centred, and leaves solution space open. Prompt: "Here is our current problem statement. Critique it: Is it too solution-oriented? Is it specific enough? Does it reflect a real user need or a business assumption? Rewrite it with these corrections."' },
        { step: 'Ideate - Divergence First', tool: 'Human session + Claude', desc: 'Human-only ideation for 25 minutes before using AI. Then use Claude as a provocation engine: "Apply extreme constraints to this concept. What if it were free? What if it worked offline? What if it were designed for 80-year-olds? Push toward unexpected territory."' },
        { step: 'Prototype - Fast and Purposeful', tool: 'v0 / Figma / Google Stitch', desc: 'Prototype to answer a specific question, not to impress. Define the learning goal before building. Use v0 or Google Stitch for 30-minute lo-fi scaffolding. Use Figma for higher fidelity when testing visual or interaction-specific hypotheses. Match fidelity to the question.' },
        { step: 'Test - Plan and Execute', tool: 'Maze + Claude', desc: 'Generate test plans with Claude: "Here is the prototype and the design hypothesis. Write a 5-task usability test with success criteria for each." Run with Maze for unmoderated testing or moderated sessions with Loom. Synthesize findings back into the Define phase.' },
        { step: 'Iterate - Close the Loop', tool: 'Claude + Notion', desc: 'After each test cycle: "Here are the usability findings from this round. What did we confirm, what did we disconfirm, and what new questions emerged? What is the highest-priority change for the next iteration?" Document the iteration rationale - this is what makes design work teachable.' },
      ],
      tools: [
        { name: 'Claude', use: 'Synthesis, HMW generation, ideation provocation, iteration planning', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Miro AI', use: 'Affinity mapping, opportunity clustering, visual synthesis', freeTier: '3 boards free', clientSafe: true },
        { name: 'Otter.ai', use: 'Empathy phase interview transcription', freeTier: '300 min/month free', clientSafe: true },
        { name: 'v0 by Vercel', use: 'Rapid prototype scaffolding', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Maze', use: 'Prototype testing with AI summaries', freeTier: 'Limited free responses', clientSafe: true },
        { name: 'QoQo', use: 'Persona generation, user journey mapping', freeTier: 'Free tier available', clientSafe: true },
      ],
      constraints: [
        'Design thinking is a mindset, not a checklist. The phases are a scaffold for thinking, not a waterfall process. Revisiting earlier phases mid-project is correct behaviour, not failure.',
        'AI cannot empathise. The Empathize phase requires real humans. Synthetic users (AI-simulated personas) are useful for early directional validation but are not a substitute for the discovery that comes from speaking with real people.',
        'Fixed Bid: Compress each phase to its minimum viable output. AI can halve the time of Define, Ideate, and Prototype phases. Empathize and Test phases require human time that AI cannot compress.',
        'Consultancy: Document AI-assisted outputs with the human judgment layer visible. Show clients the raw data, the AI synthesis, and the human interpretation as separate artefacts.',
      ],
      videos: [
        { title: 'How I\'d Learn UI/UX Design in 2026 with AI', url: 'https://www.youtube.com/embed/2OlT0n6JlUg' },
        { title: 'Brainstorm and Ideate with Generative AI', url: 'https://www.youtube.com/embed/vLQS24xc1WY' },
        { title: 'The New UX Tech Stack: How to Strategically Use AI', url: 'https://www.youtube.com/embed/rNTM-GcPAZ0' },
        { title: 'AI Tools for UX Designers 2026', url: 'https://www.youtube.com/embed/3dBbQhPLHVQ' },
        { title: 'Turning a Product Brief into UI with AI', url: 'https://www.youtube.com/embed/V6K-xHB3zGk' },
      ],
      resources: [
        { title: 'IDEO Design Thinking - Human-Centered Design Toolkit', url: 'https://www.ideo.com/post/design-thinking' },
        { title: 'Stanford d.school - Design Thinking Bootleg', url: 'https://dschool.stanford.edu/resources/design-thinking-bootleg' },
        { title: 'Nielsen Norman Group - Design Thinking 101', url: 'https://www.nngroup.com/articles/design-thinking/' },
        { title: 'Interaction Design Foundation - Design Thinking', url: 'https://www.interaction-design.org/literature/topics/design-thinking' },
        { title: 'Harvard Business Review - The Evolution of Design Thinking', url: 'https://hbr.org/2015/09/the-evolution-of-design-thinking' },
      ],
    },
    'ux-psychology-research': {
      overview: 'Every design decision is a hypothesis about human psychology. Cognitive load, attention, memory, motivation, and emotional response are the operating constraints of every user interface. Understanding these mechanisms does not constrain design - it makes your decisions defensible, your research more accurate, and your findings more actionable. AI accelerates the application of these frameworks, but the frameworks themselves require deep, practiced understanding before AI assistance adds value.',
      workflow: [
        { step: 'Cognitive Load Analysis', tool: 'Claude + Attention Insight', desc: 'Apply Miller\'s Law (7 +/- 2 chunks in working memory) and cognitive load theory to your designs. Prompt Claude: "Evaluate this screen against Miller\'s Law and Cognitive Load Theory. Where is intrinsic load highest? Where is extraneous load added unnecessarily? What progressive disclosure could reduce cognitive burden?" Use Attention Insight to validate attention distribution.' },
        { step: 'Bias-Aware Research Planning', tool: 'Claude', desc: 'Before writing interview guides, systematically map potential biases. Prompt: "What confirmation biases might I bring to this research? What social desirability biases might participants have? What leading questions do I risk asking? What questions would challenge my current hypotheses rather than confirm them?" Build the answers into your research plan.' },
        { step: 'Mental Model Mapping', tool: 'Miro AI + Claude', desc: 'After research synthesis, identify users\' mental models - their internal representation of how the system works. Prompt: "From these research themes, describe the mental model users have of [product/task]. Where does this mental model conflict with how the system actually works? Those conflicts are your UX failure points."' },
        { step: 'Emotional Design Review', tool: 'Claude', desc: 'Apply Don Norman\'s three levels - Visceral (appearance, first impression), Behavioural (usability, interaction quality), Reflective (meaning, identity, narrative). Prompt: "Review this design at each of Norman\'s three emotional levels. What emotional responses are likely at each level? What is misaligned between intended and probable emotional response?"' },
        { step: 'Motivation and Behaviour Mapping', tool: 'Claude', desc: 'Apply BJ Fogg\'s Behaviour Model (Motivation x Ability x Prompt) and Self-Determination Theory (autonomy, competence, relatedness) to your user flows. Prompt: "For each key user action in this flow, what is the motivation driver, what is the ability barrier, and where is the prompt? Where is the behaviour model weakest?"' },
        { step: 'Heuristic Cross-Reference', tool: 'Claude + lawsofux.com', desc: 'After every design review, cross-reference findings against: Hick\'s Law (decision complexity at choice points), Fitts\'s Law (target size and distance for critical interactions), and Jakob\'s Law (deviation from convention requiring justification). Generate design recommendations with explicit psychological rationale.' },
        { step: 'Stakeholder Psychology Framing', tool: 'Claude + Notion', desc: 'Translate psychological findings into stakeholder language. Prompt: "Reframe these UX psychology findings for a business audience. Connect each finding to: user drop-off risk, conversion impact, or support cost. Remove jargon." This skill separates senior practitioners from mid-level ones.' },
      ],
      tools: [
        { name: 'Claude', use: 'Bias analysis, cognitive load review, emotional design audit, stakeholder framing', freeTier: 'Free tier available', clientSafe: true },
        { name: 'Attention Insight', use: 'Predictive attention heatmaps (validates cognitive load hypotheses)', freeTier: 'Paid only', clientSafe: true },
        { name: 'Miro AI', use: 'Mental model mapping, affinity clustering', freeTier: '3 boards free', clientSafe: true },
        { name: 'lawsofux.com', use: 'Psychology principle quick reference', freeTier: 'Free', clientSafe: true },
        { name: 'Microsoft Clarity', use: 'Rage-click and confusion data as behavioural psychology evidence', freeTier: 'Completely free', clientSafe: true },
      ],
      constraints: [
        'Honest Assessment: Psychology frameworks are lenses, not algorithms. Two experienced designers applying Cognitive Load Theory to the same screen will reach different but valid conclusions. The framework guides, it does not decide.',
        'Confirmation bias is the most dangerous bias in UX research. It is also the most common. Actively seeking disconfirming evidence is a professional discipline, not a natural instinct.',
        'AI models are themselves biased systems. When using Claude to analyse cognitive and emotional design, the model reflects the average of the training data it was trained on - which may not represent your specific user population.',
        'Senior practitioners use psychology to make design decisions defensible to stakeholders and business partners, not only to users.',
      ],
      videos: [
        { title: 'Intro to AI for UX Design', url: 'https://www.youtube.com/embed/iFkBIJNUt7k' },
        { title: 'How to Use AI to Increase Efficiency in User Research', url: 'https://www.youtube.com/embed/pPgPFqrXMiw' },
        { title: 'How Our UX Studio Uses AI for Research', url: 'https://www.youtube.com/embed/yhHJRPDEhb4' },
        { title: 'AI in UX Research: Make Research Faster and Smarter', url: 'https://www.youtube.com/embed/sRBe1gzuFEg' },
      ],
      resources: [
        { title: 'Laws of UX - Psychology-backed design principles', url: 'https://lawsofux.com' },
        { title: 'Interaction Design Foundation - Cognitive Psychology in UX', url: 'https://www.interaction-design.org/literature/topics/cognitive-psychology' },
        { title: 'Nielsen Norman Group - Mental Models', url: 'https://www.nngroup.com/articles/mental-models/' },
        { title: 'BJ Fogg - Behaviour Model and Tiny Habits', url: 'https://behaviormodel.org' },
        { title: 'Don Norman - The Design of Everyday Things (summary)', url: 'https://medium.com/@InVisionApp/the-design-of-everyday-things-a-book-review-b1ff2bda5f50' },
        { title: 'Cognitive Biases in UX Research - UX Collective', url: 'https://uxdesign.cc/cognitive-biases-in-ux-research-1f23a0cfaa5a' },
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
