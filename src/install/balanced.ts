import * as path from 'path';
import { getConfigDir, getTemplateDir } from '../config/paths';
import { TEMPLATE_FILES } from '../config/models';
import { BALANCED_MODELS } from '../config/models';
import { replacePlaceholders } from '../utils/replace';
import { readFile, writeFile, ensureDir } from '../utils/file';

export async function installBalanced(): Promise<void> {
  const configDir = getConfigDir();
  const templateDir = getTemplateDir();

  await ensureDir(configDir);

  for (const templateFile of TEMPLATE_FILES) {
    const templatePath = path.join(templateDir, templateFile);
    const configPath = path.join(configDir, templateFile);

    let content = await readFile(templatePath);
    content = replacePlaceholders(content, BALANCED_MODELS);
    await writeFile(configPath, content);
  }
}
