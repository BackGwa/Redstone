import prompts from 'prompts';

export type MainMenuChoice = 'install' | 'status' | 'uninstall' | 'exit';

export async function showMainMenu(): Promise<MainMenuChoice | null> {
  const response = await prompts({
    type: 'select',
    name: 'choice',
    message: 'Redstone Installer',
    choices: [
      { title: 'Install Redstone', value: 'install' },
      { title: 'View Redstone Status', value: 'status' },
      { title: 'Uninstall Redstone', value: 'uninstall' },
      { title: 'Exit', value: 'exit' }
    ]
  });

  if (response.choice === undefined) {
    return null;
  }

  return response.choice;
}

export async function confirmOverwrite(): Promise<boolean> {
  const response = await prompts({
    type: 'confirm',
    name: 'overwrite',
    message: 'Redstone is already installed. Overwrite?',
    initial: true
  });

  return response.overwrite ?? false;
}

export type InstallMode = 'balanced' | 'professional' | 'manual';

export async function selectInstallMode(): Promise<InstallMode | null> {
  const response = await prompts({
    type: 'select',
    name: 'mode',
    message: 'Select installation mode',
    choices: [
      {
        title: 'Balanced',
        description: 'Some subordinate agents of Redstone are configured using Opencode\'s default free model.\nUsers can choose between free or paid models for the Orchestrator, allowing efficient token usage while maintaining a reasonable level of plugin quality.\n(When using the free model, usage limits may be reached more easily, and code may be used for model training.)',
        value: 'balanced'
      },
      {
        title: 'Professional',
        description: 'Some subordinate agents of Redstone are configured using paid models such as GPT or Claude.\nThis configuration is suitable for professional plugin development and tasks where consistency, stability, and high reliability are essential.',
        value: 'professional'
      },
      {
        title: 'Manual',
        description: 'You can specify a model ID individually for each agent.',
        value: 'manual'
      }
    ]
  });

  if (response.mode === undefined) {
    return null;
  }

  return response.mode;
}

export type ProfessionalModel = 'codex' | 'claude';

export async function selectProfessionalModel(): Promise<ProfessionalModel | null> {
  const response = await prompts({
    type: 'select',
    name: 'model',
    message: 'Select professional model',
    choices: [
      {
        title: 'Codex',
        description: 'Redstone is configured using OpenAI\'s Codex models.',
        value: 'codex'
      },
      {
        title: 'Claude',
        description: 'Redstone is configured using Anthropic\'s Claude models.',
        value: 'claude'
      }
    ]
  });

  if (response.model === undefined) {
    return null;
  }

  return response.model;
}

export async function inputManualModelIds(): Promise<{
  orchestrator: string;
  document: string;
  projectInit: string;
  explore: string;
  apiSearch: string;
} | null> {
  const questions = [
    {
      type: 'text' as const,
      name: 'orchestrator',
      message: 'Orchestrator Model ID (leave empty to skip):',
      initial: ''
    },
    {
      type: 'text' as const,
      name: 'document',
      message: 'Document Model ID (leave empty to skip):',
      initial: ''
    },
    {
      type: 'text' as const,
      name: 'projectInit',
      message: 'Project Init Model ID (leave empty to skip):',
      initial: ''
    },
    {
      type: 'text' as const,
      name: 'explore',
      message: 'Explore Model ID (leave empty to skip):',
      initial: ''
    },
    {
      type: 'text' as const,
      name: 'apiSearch',
      message: 'API Search Model ID (leave empty to skip):',
      initial: ''
    }
  ];

  const response = await prompts(questions);

  if (Object.keys(response).length === 0) {
    return null;
  }

  return {
    orchestrator: response.orchestrator || '',
    document: response.document || '',
    projectInit: response.projectInit || '',
    explore: response.explore || '',
    apiSearch: response.apiSearch || ''
  };
}

export async function confirmUninstall(): Promise<boolean> {
  const response = await prompts({
    type: 'confirm',
    name: 'uninstall',
    message: 'Uninstall Redstone?',
    initial: false
  });

  return response.uninstall ?? false;
}
