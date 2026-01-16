import * as path from 'path';
import { getConfigDir } from './config/paths';
import { TEMPLATE_FILES } from './config/models';
import { readFile, fileExists } from './utils/file';

export interface AgentStatus {
  name: string;
  model?: string;
  exists: boolean;
  corrupted: boolean;
}

export async function getRedstoneStatus(): Promise<AgentStatus[]> {
  const configDir = getConfigDir();
  const status: AgentStatus[] = [];

  for (const templateFile of TEMPLATE_FILES) {
    const configPath = path.join(configDir, templateFile);
    const exists = await fileExists(configPath);

    if (!exists) {
      status.push({
        name: templateFile,
        exists: false,
        corrupted: true
      });
      continue;
    }

    try {
      const content = await readFile(configPath);
      const modelMatch = content.match(/^model:\s*(.+)$/m);
      const model = modelMatch ? modelMatch[1] : undefined;

      status.push({
        name: templateFile,
        model: model,
        exists: true,
        corrupted: false
      });
    } catch {
      status.push({
        name: templateFile,
        exists: false,
        corrupted: true
      });
    }
  }

  return status;
}

export function getDisplayName(fileName: string): string {
  const nameMap: Record<string, string> = {
    'Redstone-Orchestrator.md': 'Orchestrator',
    'Redstone-ProjectInitialization.md': 'Project Initialization',
    'Redstone-Explore.md': 'Explore',
    'Redstone-APISearch.md': 'API Search',
    'Redstone-Document.md': 'Document',
    'Redstone-Planner.md': 'Planner'
  };

  return nameMap[fileName] || fileName;
}
