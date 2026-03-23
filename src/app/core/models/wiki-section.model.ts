export interface WikiSection {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  skillLevels: string[];
  color: string;
}

export interface WikiSectionContent {
  overview: string;
  workflow: { step: string; tool: string; desc: string }[];
  tools: { name: string; use: string; freeTier: string; clientSafe: boolean }[];
  constraints: string[];
  videos: { title: string; url: string }[];
  resources?: { title: string; url: string }[];
}
