import * as path from 'path';
import * as os from 'os';

export function getHomeDir(): string {
  return os.homedir();
}

export function getConfigDir(): string {
  const home = getHomeDir();
  const configPath = path.join(home, '.config', 'opencode', 'agent');
  return configPath;
}

export function getTemplateDir(): string {
  return path.join(__dirname, '../../agents');
}

export function getToolsConfigDir(): string {
  const home = getHomeDir();
  const toolsPath = path.join(home, '.config', 'opencode', 'tools');
  return toolsPath;
}

export function getToolsTemplateDir(): string {
  return path.join(__dirname, '../../tools');
}

export function resolvePath(...segments: string[]): string {
  return path.resolve(...segments);
}
