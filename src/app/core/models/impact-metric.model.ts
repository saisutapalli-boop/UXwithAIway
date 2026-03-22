export interface ImpactMetric {
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface PhaseComparison {
  phase: string;
  manual: string;
  ai: string;
  saving: string;
  tool: string;
}
