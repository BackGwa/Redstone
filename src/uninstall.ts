import * as path from 'path';
import { getConfigDir, getToolsConfigDir } from './config/paths';
import { TEMPLATE_FILES, TOOL_FILES } from './config/models';
import { fileExists, deleteFile, deleteDir, readDir } from './utils/file';

export async function uninstallRedstone(): Promise<void> {
  const configDir = getConfigDir();
  const toolsConfigDir = getToolsConfigDir();

  for (const templateFile of TEMPLATE_FILES) {
    const configPath = path.join(configDir, templateFile);
    if (await fileExists(configPath)) {
      await deleteFile(configPath);
    }
  }

  for (const toolFile of TOOL_FILES) {
    const toolPath = path.join(toolsConfigDir, toolFile);
    if (await fileExists(toolPath)) {
      await deleteFile(toolPath);
    }
  }

  if (await fileExists(configDir)) {
    const files = await readDir(configDir);
    if (files.length === 0) {
      await deleteDir(configDir);
    }
  }
}

export async function isRedstoneInstalled(): Promise<boolean> {
  const configDir = getConfigDir();
  const orchestratorPath = path.join(configDir, 'Redstone-Orchestrator.md');
  return await fileExists(orchestratorPath);
}
