# Product Requirements Document
## UXwiththeAIway — AI-Augmented UX Knowledge Platform

**Version:** 1.0 — MVP  
**Status:** Draft for Leadership Review  
**Author:** UX Strategy  
**Last Updated:** March 2026  

---

## 1. Executive Summary

UXwiththeAIway is a free, practitioner-first knowledge wiki and interactive strategy platform for UX designers navigating AI-augmented workflows. It serves designers at all seniority levels — junior to senior — across product design companies and service design consultancies.

The platform closes a critical gap: UX designers are adopting AI tools without a structured framework, leading to inconsistent quality, duplicated effort, and missed efficiency gains. UXwiththeAIway provides opinionated, workflow-grounded guidance — not vendor marketing, not academic theory — written by invite-only practitioners and structured around the actual shape of a UX project.

The core differentiator is the **Strategy Builder** — an interactive tool that takes a designer's project context as input (type, contract, timeline, team, organisation, design system maturity) and outputs a tailored AI workflow, tool stack, and constraint surface specific to their situation.

---

## 2. Problem Statement

### 2.1 The Market Gap

AI tool adoption in UX is fragmented and poorly supported. The problems are structural:

- No practitioner-curated framework exists that connects AI tools to the actual phases of a UX process
- Over 100 AI tools launched in 2024 relevant to UX — with no trusted curation layer
- Most existing resources assume in-house product teams; service design consultants face client data rules, procurement delays, compliance environments, and fixed-bid billing constraints that existing wikis completely ignore
- Junior designers are overwhelmed. Senior designers lack strategic frameworks for org-level AI adoption
- Manual research synthesis, redundant competitive analysis, and late-stage design inconsistencies cost teams an estimated 30–40% of project time that AI-assisted workflows can recover

### 2.2 The Opportunity

A free, authoritative, practitioner-written platform that:
- Maps AI capability to each phase of the UX process with honest assessments
- Adapts recommendations to project type, scale, and constraints
- Serves all skill levels without dumbing down for juniors or ignoring the needs of seniors
- Builds industry authority through invite-only editorial control

---

## 3. Goals & Success Metrics

### 3.1 Product Goals

| Goal | Description |
|------|-------------|
| **Trusted resource** | Become the go-to AI + UX reference for practitioners — cited in team onboarding, linked in design communities |
| **Immediate utility** | Every visit produces a useful output — a workflow, a tool recommendation, a template, a reading path |
| **Practitioner authority** | Editorial voice and contributor selection build credibility that vendor-produced content cannot match |
| **Sustainable platform** | Free forever model with a contributor community that reduces editorial cost over time |

### 3.2 Success Metrics — Phase 1 (MVP)

| Metric | Target |
|--------|--------|
| Strategy Builder completions | 500+ in first 90 days |
| Return visit rate | >40% within 30 days |
| Time on wiki article (avg) | >4 minutes |
| Tool directory page views | Top 3 traffic source |
| Contributor applications received | 20+ in first 60 days |
| Newsletter sign-ups (Phase 2) | 1,000+ in first 6 months |

---

## 4. Target Audience

### 4.1 Primary Users

**Service and product design companies** — UX designers at all levels actively working on client or internal product projects.

### 4.2 User Personas

#### Junior Designer
- **Need:** Understand what AI tools exist and how to start using them without looking lost in team meetings
- **Entry point:** Wiki articles filtered by Junior level, video embeds, downloadable templates
- **Key value:** Confidence and a starting vocabulary for AI-assisted UX

#### Mid-Level Designer
- **Need:** Upgrade research and testing workflows. Find templates deployable immediately on live projects
- **Entry point:** Strategy Builder — inputs project parameters, gets tool stack and workflow
- **Key value:** Time recovery — 30–70% reduction on manual synthesis and reporting tasks

#### Senior Designer / Design Lead
- **Need:** Build AI-augmented practice at org level. Evaluate tools critically. Lead team adoption
- **Entry point:** Strategy Builder (enterprise path), constraint surface outputs, contributor network
- **Key value:** Defensible frameworks for org-level AI tool decisions and governance

#### Service Design Consultant
- **Need:** AI tools that work within client constraints — data rules, procurement limits, billing structures
- **Entry point:** Consultant constraint layer in Strategy Builder, async-first method recommendations
- **Key value:** Improved fixed-bid economics — audit delivery from 3 days to 6 hours without quality loss

---

## 5. Platform Architecture

### 5.1 Site Structure

```
Home
├── Strategy Builder (core interactive feature)
├── Wiki
│   ├── 01 — Introduction to AI & ML
│   ├── 02 — AI UX for Strategy
│   ├── 03 — Primary Research
│   ├── 04 — Secondary Research
│   ├── 05 — Ideation & Brainstorming
│   ├── 06 — Design & Prototyping
│   ├── 07 — Usability Testing & A/B
│   └── 08 — Heuristic Evaluation & UX Audit
├── Tool Directory
├── Contributor Hub
├── Glossary
└── About
```

### 5.2 Content Formats Per Section

Each wiki section contains:
- **Written guide** — practitioner-authored, opinionated, workflow-grounded
- **Video embed** — curated third-party + original content
- **Downloadable template** — Figma or Notion format, ready to deploy
- **Interactive tool** — calculators, prompt builders, stage selectors (varies by section)

---

## 6. The Strategy Builder — Core Feature Specification

### 6.1 Overview

The Strategy Builder is the platform's primary differentiating feature. It takes a designer's project context as structured input and generates a specific, actionable AI workflow recommendation — not a generic checklist.

### 6.2 Input Flow — 5 Steps

#### Step 1 — Problem Framing
Two open-text / selection inputs:
1. "What is the core problem you've been asked to solve?" (free text)
2. "Who identified this problem?" (Business / Client | End Users | Both)

**Logic:** A business-identified problem requires validation research before design begins. A user-identified problem can move faster into solution space. Both requires stakeholder alignment work first.

#### Step 2 — Project Matrix (6 Axes)

| Axis | Options |
|------|---------|
| **Project Type** | RFE (Request for Enhancement) · Initiative · UX Audit |
| **Contract Type** | Fixed Bid · Time & Material · Retainer |
| **Timeline** | Sprint (1–2 weeks) · Short-term (1–3 months) · Long-term (3 months+) |
| **Team Size** | Solo · Small (2–5) · Mid (6–15) · Enterprise (15+) |
| **Organisation Type** | In-house Product · Service Design Consultancy · Agency · Freelance |
| **Design System Maturity** | None · Partial / Inconsistent · Established |

#### Step 3 — Stage Selection (Recommend + Override)

System generates recommended process stages based on matrix inputs. Designer sees each stage as a toggle card — recommended stages pre-selected, all others available to activate. Each deselected recommended stage shows a consequence note.

**Available stages:**
Problem Framing · Stakeholder Alignment · Secondary Research · Primary Research · Insight Synthesis · UX Strategy & Direction · Ideation & Concepts · Lo-fi Prototyping · Hi-fi Design & System Integration · Usability Testing · A/B Testing · Heuristic Evaluation · Handoff & Documentation · Measurement & Continuous Improvement

#### Step 4 — Strategy Output

Generated output has five components:

1. **Recommended Workflow** — phase map with time estimates calibrated to timeline and team size inputs. Each phase links to the relevant wiki section
2. **AI Tool Stack** — tools per phase with: free tier status, client-safe flag, consultant approval flag, time saving estimate vs manual method
3. **Constraint Surface** — plain-language risk and constraint flags specific to their matrix combination (not generic best practices)
4. **Reading Path** — sequenced wiki articles matched to selected stages and skill level
5. **Downloadable Strategy Canvas** — single-page Figma or PDF template summarising their context, selected stages, recommended tools, and timeline skeleton

### 6.3 Strategy Builder — Matrix Logic Rules

**RFE projects:** Skip broad discovery. Lead with constraint mapping and targeted research. Surface risk flag: "Solving the stated problem rather than the real problem."

**Initiative projects:** Full discovery arc recommended. Flag: "Stakeholder alignment is the highest-risk phase."

**Audit projects:** Entirely different workflow — evaluation framework, AI-assisted checklist, findings documentation, severity rating, report structure. No prototyping or testing phases.

**Fixed Bid modifier:** Lean filter applied to all recommendations. Max 5 interviews recommended. All tool recommendations default to freemium. Scope risk section included in output.

**Sprint modifier:** Only methods producing insight within 72 hours qualify. Lo-fi prototype and 5-person test by day 8.

**Consultancy org type:** Activates 4 constraint flags automatically — client data handling, async method alternatives, procurement delay warnings, stakeholder access limits.

**Enterprise + Established system:** Activates Claude Code for design token audit, Figma AI for component compliance across 15+ file libraries.

**Solo team:** Tools that multiply individual output. AI handles second-person work — synthesis, critique, documentation.

### 6.4 Phase 2 Upgrade — Claude API Integration

Strategy Builder v2 connects to Claude API to generate a personalised strategy narrative from the matrix inputs — a written strategic brief the designer can share with clients or stakeholders, not just a structured list. The v1 decision tree logic is designed to be extended to this without a rebuild.

---

## 7. Wiki Content Specification

### 7.1 Section 01 — Introduction to AI & ML

**Purpose:** Intellectual foundation. The history designers need to evaluate AI tools critically and anticipate failure modes.

**Key content:**
- Historical timeline: Turing (1950) → Shannon (1948) → Rosenblatt (1958) → McCarthy & Minsky (1956) → Hinton (1986–2012) → Goodfellow / GANs (2014) → Transformers (2017) → LLM era
- LLM explainer — what they are, how they work, why they hallucinate, what that means for UX workflows
- GAN explainer — generative image and synthetic data implications for UX research and testing
- Skill-level filter: Junior sees explainers first. Senior sees historical implications for design practice.

### 7.2 Section 02 — AI UX for Strategy

**AI Workflow:**
- Claude / ChatGPT → problem brief synthesis from stakeholder notes
- Perplexity → competitive landscape with cited sources
- Miro AI → opportunity mapping post human-led session
- ChatGPT → assumption stress-testing and challenge reframing

**Freemium tools:** Perplexity (free), Claude.ai (free), Miro (3 boards free), Notion (free)

### 7.3 Section 03 — Primary Research

**AI Workflow:**
- Claude → interview guide generation and stress-testing against research objectives
- Otter.ai → transcription (free 300 min/month)
- Dovetail → AI tagging and pattern identification across transcripts
- Notion AI → insight synthesis and clustering

**Constraint (Fixed Bid):** Max 5 interviews. Async via Loom replaces live sessions. AI synthesis compresses analysis from days to hours.

**Freemium tools:** Otter.ai, Dovetail, Notion, Loom (25 videos free), Tally (screener surveys)

### 7.4 Section 04 — Secondary Research

**AI Workflow:**
- Perplexity → cited web research (use over ChatGPT for accuracy)
- Elicit → academic paper synthesis
- Exploding Topics → trend signals 6–18 months early
- Claude → synthesis into structured competitive landscape brief

**Compliance note:** Public data only — no client data risk. All tools usable without client approval.

### 7.5 Section 05 — Ideation & Brainstorming

**Core editorial angle:** AI wants to converge. LLMs generate plausible, expected answers trained on the average of human output. Designers must use AI for divergence while protecting the human creative phase.

**AI Workflow:**
- Claude → "yes and" prompting, not "give me 10 ideas"
- ChatGPT → cross-industry analogous inspiration
- Miro AI → post-brainstorm clustering
- Claude → concept stress-testing ("what are the three most likely failure modes?")

**Interactive tool:** Prompt Builder — designer selects challenge type and gets a structured prompt sequence that guides through divergent → challenging → convergent phases.

### 7.6 Section 06 — Design & Prototyping

**Scale-calibrated sub-paths:**

| Context | Tool | Use |
|---------|------|-----|
| Solo / No design system | v0 by Vercel | Component scaffolding from text prompts |
| Solo / No design system | Relume | Sitemap and wireframe generation |
| Small team / Maturing system | Figma AI | Component suggestions, inconsistency detection |
| Enterprise / Established system (15+ files) | Claude Code | Token audit, component documentation across file library |
| Enterprise / Established system | Figma AI | Pattern compliance, component suggestion against existing library |

**Editorial angle:** Governance before design at enterprise scale. No new components added without AI-assisted audit of existing component coverage.

### 7.7 Section 07 — Usability Testing & A/B

**AI Workflow:**
- Maze → unmoderated testing with AI summaries (free tier: limited responses/month)
- Microsoft Clarity → free heatmaps + AI session summaries, no response limits
- Attention Insight → predictive heatmaps pre-launch, saves one testing round
- Claude → A/B hypothesis generation from design variants and success metrics

**Interactive tool:** Sample size calculator for A/B tests. Usability test task scenario generator.

**Editorial angle:** AI is strongest at reducing quantitative analysis time. Weakest at interpreting why users behaved a certain way — that remains human judgment.

### 7.8 Section 08 — Heuristic Evaluation & UX Audit

**This is a standalone category.** Directly commercially valuable for consultants — a UX audit is a billable engagement and this section provides the AI-accelerated delivery workflow.

**AI Workflow:**
- Claude → custom heuristic checklist from product brief and user goals
- Claude → severity-rated findings structuring from raw observations
- Screaming Frog → technical UX issues, free under 500 URLs
- Notion AI → executive summary for non-design stakeholders

**Consultant impact:** AI-assisted audit compresses 3-day manual audit to 6 hours without reducing quality. Directly improves fixed-bid economics.

**Deliverable:** UX Audit Report Template (Notion + Figma versions) — severity matrix, findings structure, executive summary framework, recommendation prioritisation grid.

---

## 8. Tool Directory Specification

### 8.1 Structure

Each tool profile page contains:
- Tool name and category
- UX phases supported
- Freemium tier details (storage limits, response caps, feature restrictions)
- Paid tier summary
- **Client-safe flag** — can real user data be processed through this tool?
- **Client-approval-required flag** — relevant for consultant workflows
- One-paragraph honest description (no marketing language)
- Link to tool
- Inline links to wiki sections where the tool is referenced

### 8.2 Launch Scope

20+ tools at MVP launch. Expanded to 60+ in Phase 2.

### 8.3 Filter Dimensions

- UX phase (Strategy / Research / Ideation / Design / Testing / Audit)
- Pricing (Free tier available / Paid only)
- Client safe (Yes / No)
- Skill level relevance (Junior / Mid / Senior)

---

## 9. Skill Level Filter System

Skill level filter is a tag on every content document — not a separate content tree. One article can be tagged Junior + Mid, or Senior only. The front-end filters accordingly.

**Filter behaviour:**
- Junior: explainers and context-setting content surfaces first. Step-by-step guides prioritised.
- Mid: workflow-focused content, templates, and Strategy Builder outputs
- Senior: strategic frameworks, governance content, org-level adoption articles
- Unfiltered (default): all content visible, ordered by section sequence

---

## 10. Contributor System

### 10.1 Invite-Only Model

Selection criteria:
- Active UX practitioners with minimum 3 years experience
- Demonstrable AI tool experience (portfolio, published writing, or tool-specific projects)
- No vendor affiliation conflicts
- Agreement with editorial voice guidelines

### 10.2 Contributor Hub Features (Phase 1)

- Style guide (voice, formatting, citation standards)
- Content templates per section type
- Submission form with editorial review workflow
- Byline and contributor profile page (prominent — part of contributor value proposition)

### 10.3 Editorial Review Process

1. Contributor submits via Contributor Hub form
2. Editorial review within 5 working days
3. One round of revisions with editorial notes
4. Final approval and publication with byline

---

## 11. Content Format Standards

### 11.1 Voice & Tone

- Practitioner-first — sounds like a senior designer talking to peers
- Opinionated — takes positions on what works and what doesn't
- Tool-specific — names real tools with honest assessments including limitations
- Honest about AI failure modes — hallucination, overconfidence, premature convergence are discussed directly
- Not neutral — false balance in a fast-moving space is its own form of misinformation

### 11.2 Article Structure Template

```
Section label + number
Title (problem-framing or workflow-focused, not generic)
One-paragraph overview (the honest editorial angle)
AI Workflow (step-by-step with named tools and specific prompts)
Freemium tools table (tool / use case / free tier details / client-safe flag)
Constraints section (what changes under different project conditions)
Watch it in action (YouTube embed — curated or original)
Downloadable template (where applicable)
Related articles (auto-linked by section and stage tags)
```

---

## 12. Technology Stack

### 12.1 Recommended Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | Next.js (App Router) | SEO-optimised, fast, strong Sanity integration |
| **CMS** | Sanity.io | Flexible content modelling, portable text for rich embeds, Studio-based contributor editing |
| **Strategy Builder v1** | React + decision tree logic | No API cost. Pure conditional logic sufficient for v1 |
| **Strategy Builder v2** | React + Claude API | Personalised narrative output. Upgrade path without rebuild |
| **Hosting** | Vercel | One-click Next.js deploy, edge functions, free tier for launch |
| **Search (Phase 1)** | Sanity GROQ | Built-in, no additional cost |
| **Search (Phase 3)** | Algolia | Semantic search with skill-level and phase filtering |

### 12.2 Sanity Content Model — Document Types

| Type | Key Fields |
|------|-----------|
| **Article** | title, slug, section tag, stage tags, skill level tags, format tags, author ref, body (portable text), related tools array, YouTube embed URL, matrix applicability tags |
| **Tool Profile** | name, category, UX phases, freemium tier, paid tier, client data safe flag, client approval required flag, link, related articles |
| **Template** | title, stage, file type, download link, skill level, description |
| **Video Embed** | title, YouTube URL, associated article, skill level, stage tags |
| **Glossary Term** | term, definition, related articles (auto-links across content) |
| **Contributor Profile** | name, bio, expertise tags, articles array |
| **Strategy Builder Config** | decision tree logic as editable JSON — allows tool recommendation updates without developer involvement |

The Strategy Builder Config as an editable Sanity document is critical. The AI tool landscape changes fast. Tool recommendations must be updatable from Sanity Studio without code deployment.

---

## 13. Service Design Consultant Constraint Layer

When a user selects "Service Design Consultancy" as organisation type, four constraint flags activate automatically in the Strategy Builder output.

### 13.1 Client Budget & Tool Licensing

Every tool recommendation includes a freemium flag and a "client-approval-required" flag. A "tools you can use today without client approval" fast lane is surfaced at the top of the tool stack output. No tool requiring enterprise procurement appears in the recommended stack without a freemium alternative alongside it.

### 13.2 Stakeholder Access & Availability

Method recommendations shift toward async by default. Every synchronous method recommended surfaces an async AI-assisted equivalent. Stakeholder availability is noted as typically limited to 2–3 touchpoints per phase — methods are designed around this constraint, not against it.

### 13.3 Design System Maturity

Three paths:
- **No system:** Workflow includes lightweight component foundation step. AI-assisted pattern identification from existing brand materials
- **Partial / inconsistent:** Audit-first before design. Figma AI for inconsistency detection
- **Established:** AI-governed compliance. Claude Code for token audit across file library. Figma AI for component suggestion against existing library

### 13.4 Regulatory & Compliance Environment

Healthcare, finance, government, children's product flags activate a data handling warning layer. Surfaces which AI tools cannot be used with real user data. Recommends anonymisation workflows before AI-assisted analysis. Surfaces compliance-aware alternatives (Otter.ai with auto-delete, local LLM options for sensitive synthesis).

---

## 14. Impact & Time Reduction — Business Case

### 14.1 Headline Metrics

| Metric | Value |
|--------|-------|
| Research synthesis time reduction | up to 70% |
| UX audit delivery acceleration | up to 60% |
| Prototyping iteration cycle reduction | up to 40% |
| Individual designer output multiplier (solo) | ~3× |

### 14.2 Phase-by-Phase Time Comparison

| UX Phase | Manual | AI-Assisted | Saving | Tool |
|----------|--------|-------------|--------|------|
| Competitive research brief | 4–6 hrs | 45 min | ~80% | Perplexity + Claude |
| Interview guide (5 sessions) | 3 hrs | 40 min | ~78% | Claude |
| Transcript synthesis (5 interviews) | 8–10 hrs | 2–3 hrs | ~70% | Dovetail + Otter |
| UX audit (heuristic eval) | 2–3 days | 4–6 hrs | ~65% | Claude + Screaming Frog |
| Lo-fi wireframes (10 screens) | 1–2 days | 4–6 hrs | ~55% | v0 / Relume / Figma AI |
| Usability test plan + script | 4 hrs | 1 hr | ~75% | Claude + Maze |
| A/B hypothesis brief | 2–3 hrs | 30 min | ~82% | Claude |

---

## 15. MVP Build Scope — Phase 1

### 15.1 In Scope

- Sanity CMS setup with full content model (all document types)
- Next.js frontend with skill-level filter across all content
- Strategy Builder v1 — full 6-axis matrix with decision tree logic and output UI
- Sections 01–05 fully written with workflow content
- Tool Directory — 20+ tools with freemium and client-safe flags
- Glossary — 30 AI + UX terms, auto-linked across all content
- Contributor Hub — invite-only onboarding portal
- Downloadable strategy canvas template (Figma + PDF)
- YouTube embed slots per article (curated third-party)
- Mobile-responsive, SEO-optimised launch build
- Analytics baseline (pageviews, Strategy Builder completions, return rate)

### 15.2 Out of Scope — Phase 2

- Sections 06–08 full content
- All downloadable templates live (Notion + Figma versions)
- Interactive calculators (sample size, timeline estimator)
- Prompt Builder interactive tool (Section 05)
- Tool Directory expanded to 60+ tools
- Contributor submission portal and editorial review workflow
- Original video content production

### 15.3 Out of Scope — Phase 3

- Strategy Builder v2 connected to Claude API
- Semantic search with skill-level and phase filtering
- Newsletter — weekly AI tool landscape digest
- Community contributor features (peer review, ratings)
- Analytics dashboard — usage, most-read, drop-off by section
- A/B content path optimisation
- Potential premium layer — advanced templates, courses

---

## 16. Phased Roadmap

```
PHASE 1 — Foundation        PHASE 2 — Depth             PHASE 3 — Intelligence
─────────────────────       ──────────────────           ──────────────────────
CMS + Frontend setup        Sections 06–08 written       Claude API integration
Sections 01–05              All templates live            Semantic search
Strategy Builder v1         Calculators + tools          Newsletter + community
Tool Directory (20)         Prompt Builder               Analytics dashboard
Glossary (30 terms)         Tool Directory (60)          Premium layer option
Contributor Hub             Video production starts      A/B content testing
Strategy Canvas PDF         Editorial workflow live      Retention optimisation
Launch (SEO-ready)
```

No fixed timeline. Phase 1 is the sole priority. Build and test Strategy Builder first — it is the platform's core value. Everything else supports it.

---

## 17. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| AI tool landscape changes faster than content updates | High | High | Strategy Builder Config as editable Sanity JSON — tool recommendations updatable without dev deployment |
| Contributor quality inconsistency | Medium | High | Invite-only model, style guide, mandatory editorial review before publication |
| Strategy Builder recommendations feel too generic | Medium | High | Test with 5 designers across seniority and project types before launch. Matrix must produce noticeably different outputs for different inputs |
| Figma AI / Claude Code features change | High | Medium | Tool profiles and article recommendations are CMS-managed — updatable without code changes |
| Competitor launches similar platform | Low | Medium | Practitioner voice + editorial credibility + contributor network cannot be replicated quickly. Speed of execution matters |
| Client data compliance issues with AI tool recommendations | Medium | High | Compliance flag system in Strategy Builder. Data handling section per tool profile. Legal review of compliance language before launch |

---

## 18. Open Questions

1. **Original video content timeline** — what is the production capacity and who leads video for Phase 2?
2. **Contributor selection process** — who makes the invitation decisions and on what criteria beyond the spec above?
3. **Analytics stack** — Plausible (privacy-first) vs Google Analytics vs Vercel Analytics for launch?
4. **Domain and brand** — is `uxwiththeaiway.com` available and confirmed?
5. **Phase 2 funding** — template production, video equipment, contributor honoraria — what is the Phase 2 budget envelope?
6. **Strategy Builder v2 Claude API cost model** — at scale, API calls per Strategy Builder completion need cost modelling before Phase 3 commitment

---

## 19. Glossary of Key Terms

| Term | Definition |
|------|-----------|
| **LLM** | Large Language Model — neural network trained on text data to predict tokens. Powers Claude, GPT, Gemini |
| **GAN** | Generative Adversarial Network — two competing neural networks generating and discriminating synthetic outputs |
| **RFE** | Request for Enhancement — a scoped design task on an existing product or service |
| **Initiative** | Greenfield or strategic design project requiring broad discovery |
| **Fixed Bid** | Contract with defined scope and capped cost — the most constraint-intensive engagement type |
| **T&M** | Time & Material — flexible scope contract billed by time |
| **Strategy Builder** | Platform's core interactive feature — matrix input → tailored workflow output |
| **Constraint Surface** | The specific risks and constraints surfaced by the Strategy Builder based on a designer's project matrix inputs |
| **Freemium-first** | Tool recommendation approach that prioritises tools with no-cost tiers, particularly for consultant and fixed-bid workflows |
| **Design System Maturity** | The state of an organisation's design system — from none to established — which directly affects which AI design tools are appropriate |

---

*UXwiththeAIway — Free Public Resource · Practitioner-First · Invite-Only Contributors*  
*PRD Version 1.0 — For Leadership Review*
