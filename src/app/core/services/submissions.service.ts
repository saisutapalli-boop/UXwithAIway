import { Injectable, signal, computed } from '@angular/core';

export interface PendingTool {
  id: string;
  name: string;
  category: string;
  description: string;
  link: string;
  phases: string[];
  freemium: boolean;
  clientSafe: boolean;
  approvalRequired: boolean;
  submittedAt: Date;
  submittedBy: string;
  status: 'pending' | 'approved' | 'rejected';
}

@Injectable({ providedIn: 'root' })
export class SubmissionsService {
  private readonly _pendingTools = signal<PendingTool[]>([]);

  readonly pendingTools = computed(() => this._pendingTools());
  readonly pendingCount  = computed(() => this._pendingTools().filter(t => t.status === 'pending').length);

  submitTool(tool: Omit<PendingTool, 'id' | 'submittedAt' | 'status'>): void {
    const newTool: PendingTool = {
      ...tool,
      id: crypto.randomUUID(),
      submittedAt: new Date(),
      status: 'pending',
    };
    this._pendingTools.update(tools => [...tools, newTool]);
  }

  approveTool(id: string): void {
    this._pendingTools.update(tools =>
      tools.map(t => t.id === id ? { ...t, status: 'approved' } : t)
    );
  }

  rejectTool(id: string): void {
    this._pendingTools.update(tools =>
      tools.map(t => t.id === id ? { ...t, status: 'rejected' } : t)
    );
  }

  resetToPending(id: string): void {
    this._pendingTools.update(tools =>
      tools.map(t => t.id === id ? { ...t, status: 'pending' } : t)
    );
  }
}
