import * as path from 'path';
import { getConfigDir, getTemplateDir } from '../config/paths';
import { TEMPLATE_FILES } from '../config/models';
import { replacePlaceholders, createManualModelConfig } from '../utils/replace';
import { readFile, writeFile, ensureDir } from '../utils/file';

export interface ManualInput {
  orchestrator: string;
  document: string;
  projectInit: string;
  explore: string;
  apiSearch: string;
}

export async function installManual(input: ManualInput): Promise<void> {
  const configDir = getConfigDir();
  const templateDir = getTemplateDir();
  const modelConfig = createManualModelConfig(input);

  await ensureDir(configDir);

  for (const templateFile of TEMPLATE_FILES) {
    const templatePath = path.join(templateDir, templateFile);
    const configPath = path.join(configDir, templateFile);

    let content = await readFile(templatePath);
    content = replacePlaceholders(content, modelConfig);
    await writeFile(configPath, content);
  }
}
