export interface Tool {
  slug: string;
  name: string;
  category: string;
  phases: string[];
  freemium: boolean;
  clientSafe: boolean;
  approvalRequired: boolean;
  skillLevels: string[];
  description: string;
  link: string;
}

export interface ToolRec {
  name: string;
  phase: string;
  freemium: boolean;
  clientSafe: boolean;
  timeSaving: string;
}
