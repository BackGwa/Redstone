#!/usr/bin/env node

import { showMainMenu, selectInstallMode, selectProfessionalModel, inputManualModelIds, confirmOverwrite, confirmUninstall } from './menu/main';
import { installBalanced } from './install/balanced';
import { installProfessional, ProfessionalMode } from './install/professional';
import { installManual, ManualInput } from './install/manual';
import { uninstallRedstone, isRedstoneInstalled } from './uninstall';
import { getRedstoneStatus, getDisplayName } from './status';

async function main(): Promise<void> {
  while (true) {
    const choice = await showMainMenu();

    if (choice === null) {
      process.exit(0);
    }

    switch (choice) {
      case 'install':
        await handleInstall();
        break;
      case 'status':
        await handleStatus();
        break;
      case 'uninstall':
        await handleUninstall();
        break;
      case 'exit':
        process.exit(0);
    }
  }
}

async function handleInstall(): Promise<void> {
  try {
    const installed = await isRedstoneInstalled();

    if (installed) {
      const shouldOverwrite = await confirmOverwrite();
      if (!shouldOverwrite) {
        console.log('Installation cancelled.');
        console.log('');
        return;
      }
    }

    const mode = await selectInstallMode();

    if (mode === null) {
      console.log('Installation cancelled.');
      console.log('');
      return;
    }

    console.log('');
    console.log(`Installing Redstone with ${mode} mode...`);
    console.log('');

    switch (mode) {
      case 'balanced':
        await installBalanced();
        break;
      case 'professional':
        await handleProfessionalInstall();
        break;
      case 'manual':
        await handleManualInstall();
        break;
    }

    console.log('Redstone installed successfully!');
    console.log('');
  } catch (error) {
    console.error('Error during installation:', error instanceof Error ? error.message : String(error));
    console.error('Installation failed. Please try again.');
    console.log('');
  }
}

async function handleProfessionalInstall(): Promise<void> {
  const model = await selectProfessionalModel();

  if (model === null) {
    throw new Error('Model selection cancelled');
  }

  await installProfessional(model as ProfessionalMode);
}

async function handleManualInstall(): Promise<void> {
  const modelIds = await inputManualModelIds();

  if (modelIds === null) {
    throw new Error('Model ID input cancelled');
  }

  await installManual(modelIds as ManualInput);
}

async function handleStatus(): Promise<void> {
  try {
    const status = await getRedstoneStatus();
    const installed = status.some(s => s.exists && !s.corrupted);

    if (!installed) {
      console.log('Redstone is not installed.');
      console.log('');
      return;
    }

    console.log('Current Redstone Installation:');
    console.log('');

    for (const agent of status) {
      const name = getDisplayName(agent.name);
      if (agent.corrupted) {
        console.log(`  \x1b[36m\x1b[1m${name}\x1b[0m: \x1b[31mCorrupted\x1b[0m`);
      } else if (agent.exists) {
        if (agent.model) {
          console.log(`  \x1b[36m\x1b[1m${name}\x1b[0m: ${agent.model}`);
        } else {
          console.log(`  \x1b[36m\x1b[1m${name}\x1b[0m: \x1b[33mUser-selected model\x1b[0m \x1b[90m\x1b[2m(Parent Model)\x1b[0m`);
        }
      }
    }

    console.log('');
  } catch (error) {
    console.error('Error getting status:', error instanceof Error ? error.message : String(error));
    console.log('');
  }
}

async function handleUninstall(): Promise<void> {
  try {
    if (!(await isRedstoneInstalled())) {
      console.log('Redstone is not installed.');
      console.log('');
      return;
    }

    const shouldUninstall = await confirmUninstall();

    if (!shouldUninstall) {
      console.log('Uninstallation cancelled.');
      console.log('');
      return;
    }

    console.log('');
    console.log('Uninstalling Redstone...');
    console.log('');

    await uninstallRedstone();

    console.log('Redstone uninstalled successfully!');
    console.log('');
  } catch (error) {
    console.error('Error during uninstallation:', error instanceof Error ? error.message : String(error));
    console.error('Uninstallation failed. Please try again.');
    console.log('');
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error instanceof Error ? error.message : String(error));
  process.exit(1);
});
