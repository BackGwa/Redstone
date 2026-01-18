import * as path from 'path';
import { getConfigDir, getTemplateDir, getToolsConfigDir, getToolsTemplateDir } from '../config/paths';
import { TEMPLATE_FILES, TOOL_FILES } from '../config/models';
import { replacePlaceholders, createManualModelConfig } from '../utils/replace';
import { readFile, writeFile, ensureDir, copyFile } from '../utils/file';

export interface ManualInput {
  orchestrator: string;
  document: string;
  planner: string;
  projectInit: string;
  explore: string;
  apiSearch: string;
}

export async function installManual(input: ManualInput): Promise<void> {
  const configDir = getConfigDir();
  const templateDir = getTemplateDir();
  const toolsConfigDir = getToolsConfigDir();
  const toolsTemplateDir = getToolsTemplateDir();
  const modelConfig = createManualModelConfig(input);

  await ensureDir(configDir);
  await ensureDir(toolsConfigDir);

  for (const templateFile of TEMPLATE_FILES) {
    const templatePath = path.join(templateDir, templateFile);
    const configPath = path.join(configDir, templateFile);

    let content = await readFile(templatePath);
    content = replacePlaceholders(content, modelConfig);
    await writeFile(configPath, content);
  }

  for (const toolFile of TOOL_FILES) {
    const toolTemplatePath = path.join(toolsTemplateDir, toolFile);
    const toolConfigPath = path.join(toolsConfigDir, toolFile);
    await copyFile(toolTemplatePath, toolConfigPath);
  }
}
