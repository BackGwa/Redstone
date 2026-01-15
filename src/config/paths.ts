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
  return path.join(__dirname, '../../template');
}

export function resolvePath(...segments: string[]): string {
  return path.resolve(...segments);
}
