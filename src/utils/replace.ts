import { ModelConfig, PLACEHOLDERS } from '../config/models';

export function replacePlaceholders(
  content: string,
  modelConfig: ModelConfig
): string {
  let result = content;

  if (modelConfig.orchestrator !== undefined) {
    result = result.replace(PLACEHOLDERS.ORCHESTRATOR_MODEL_ID, modelConfig.orchestrator);
  } else {
    result = result.replace(new RegExp(`^${PLACEHOLDERS.ORCHESTRATOR_MODEL_ID}\\s*\\n?`, 'gm'), '');
  }

  if (modelConfig.document !== undefined) {
    result = result.replace(PLACEHOLDERS.DOCUMENT_MODEL_ID, modelConfig.document);
  } else {
    result = result.replace(new RegExp(`^${PLACEHOLDERS.DOCUMENT_MODEL_ID}\\s*\\n?`, 'gm'), '');
  }

  if (modelConfig.planner !== undefined) {
    result = result.replace(PLACEHOLDERS.PLANNER_MODEL_ID, modelConfig.planner);
  } else {
    result = result.replace(new RegExp(`^${PLACEHOLDERS.PLANNER_MODEL_ID}\\s*\\n?`, 'gm'), '');
  }

  if (modelConfig.projectInit !== undefined) {
    result = result.replace(PLACEHOLDERS.PROJECT_INIT_MODEL_ID, modelConfig.projectInit);
  } else {
    result = result.replace(new RegExp(`^${PLACEHOLDERS.PROJECT_INIT_MODEL_ID}\\s*\\n?`, 'gm'), '');
  }

  if (modelConfig.explore !== undefined) {
    result = result.replace(PLACEHOLDERS.EXPLORE_MODEL_ID, modelConfig.explore);
  } else {
    result = result.replace(new RegExp(`^${PLACEHOLDERS.EXPLORE_MODEL_ID}\\s*\\n?`, 'gm'), '');
  }

  if (modelConfig.apiSearch !== undefined) {
    result = result.replace(PLACEHOLDERS.API_SEARCH_MODEL_ID, modelConfig.apiSearch);
  } else {
    result = result.replace(new RegExp(`^${PLACEHOLDERS.API_SEARCH_MODEL_ID}\\s*\\n?`, 'gm'), '');
  }

  return result;
}

export function createManualModelConfig(input: {
  orchestrator?: string;
  document?: string;
  planner?: string;
  projectInit?: string;
  explore?: string;
  apiSearch?: string;
}): ModelConfig {
  const config: ModelConfig = {};

  if (input.orchestrator && input.orchestrator.trim() !== '') {
    config.orchestrator = `model: ${input.orchestrator.trim()}`;
  }

  if (input.document && input.document.trim() !== '') {
    config.document = `model: ${input.document.trim()}`;
  }

  if (input.planner && input.planner.trim() !== '') {
    config.planner = `model: ${input.planner.trim()}`;
  }

  if (input.projectInit && input.projectInit.trim() !== '') {
    config.projectInit = `model: ${input.projectInit.trim()}`;
  }

  if (input.explore && input.explore.trim() !== '') {
    config.explore = `model: ${input.explore.trim()}`;
  }

  if (input.apiSearch && input.apiSearch.trim() !== '') {
    config.apiSearch = `model: ${input.apiSearch.trim()}`;
  }

  return config;
}
