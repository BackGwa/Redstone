export interface ModelConfig {
  orchestrator?: string;
  document?: string;
  planner?: string;
  projectInit?: string;
  explore?: string;
  apiSearch?: string;
}

export const BALANCED_MODELS: ModelConfig = {
  projectInit: 'model: opencode/big-pickle',
  explore: 'model: opencode/big-pickle',
  apiSearch: 'model: opencode/big-pickle'
};

export const PROFESSIONAL_CODEX_MODELS: ModelConfig = {
  projectInit: 'model: openai/gpt-5.1-codex-mini',
  explore: 'model: openai/gpt-5.1-codex-mini',
  apiSearch: 'model: openai/gpt-5.2-codex'
};

export const PROFESSIONAL_CLAUDE_MODELS: ModelConfig = {
  projectInit: 'model: anthropic/claude-haiku-4-5',
  explore: 'model: anthropic/claude-haiku-4-5',
  apiSearch: 'model: anthropic/claude-sonnet-4-5'
};

export const TEMPLATE_FILES = [
  'Redstone-Orchestrator.md',
  'Redstone-Document.md',
  'Redstone-Planner.md',
  'Redstone-ProjectInitialization.md',
  'Redstone-Explore.md',
  'Redstone-APISearch.md'
];

export const TOOL_FILES = [
  'Redstone-ProjectGenerator.ts'
];

export const PLACEHOLDERS = {
  ORCHESTRATOR_MODEL_ID: '{ORCHESTRATOR-MODEL-ID}',
  DOCUMENT_MODEL_ID: '{DOCUMENT-MODEL-ID}',
  PLANNER_MODEL_ID: '{PLANNER-MODEL-ID}',
  PROJECT_INIT_MODEL_ID: '{PROJECT-INIT-MODEL-ID}',
  EXPLORE_MODEL_ID: '{EXPLORE-MODEL-ID}',
  API_SEARCH_MODEL_ID: '{APISEARCH-MODEL-ID}'
};
