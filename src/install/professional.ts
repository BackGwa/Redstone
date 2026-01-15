import * as path from 'path';
import { getConfigDir, getTemplateDir } from '../config/paths';
import { TEMPLATE_FILES, PROFESSIONAL_CODEX_MODELS, PROFESSIONAL_CLAUDE_MODELS } from '../config/models';
import { replacePlaceholders } from '../utils/replace';
import { readFile, writeFile, ensureDir } from '../utils/file';

export type ProfessionalMode = 'codex' | 'claude';

export async function installProfessional(mode: ProfessionalMode): Promise<void> {
  const configDir = getConfigDir();
  const templateDir = getTemplateDir();
  const modelConfig = mode === 'codex' ? PROFESSIONAL_CODEX_MODELS : PROFESSIONAL_CLAUDE_MODELS;

  await ensureDir(configDir);

  for (const templateFile of TEMPLATE_FILES) {
    const templatePath = path.join(templateDir, templateFile);
    const configPath = path.join(configDir, templateFile);

    let content = await readFile(templatePath);
    content = replacePlaceholders(content, modelConfig);
    await writeFile(configPath, content);
  }
}
