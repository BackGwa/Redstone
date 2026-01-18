import * as path from 'path';
import { getConfigDir, getTemplateDir, getToolsConfigDir, getToolsTemplateDir } from '../config/paths';
import { TEMPLATE_FILES, TOOL_FILES } from '../config/models';
import { BALANCED_MODELS } from '../config/models';
import { replacePlaceholders } from '../utils/replace';
import { readFile, writeFile, ensureDir, copyFile } from '../utils/file';

export async function installBalanced(): Promise<void> {
  const configDir = getConfigDir();
  const templateDir = getTemplateDir();
  const toolsConfigDir = getToolsConfigDir();
  const toolsTemplateDir = getToolsTemplateDir();

  await ensureDir(configDir);
  await ensureDir(toolsConfigDir);

  for (const templateFile of TEMPLATE_FILES) {
    const templatePath = path.join(templateDir, templateFile);
    const configPath = path.join(configDir, templateFile);

    let content = await readFile(templatePath);
    content = replacePlaceholders(content, BALANCED_MODELS);
    await writeFile(configPath, content);
  }

  for (const toolFile of TOOL_FILES) {
    const toolTemplatePath = path.join(toolsTemplateDir, toolFile);
    const toolConfigPath = path.join(toolsConfigDir, toolFile);
    await copyFile(toolTemplatePath, toolConfigPath);
  }
}
