<div align="center"><br>

# Redstone

Redstone is an AI agent system based on [Opencode](https://github.com/anomalyco/opencode) that automates and simplifies the entire Minecraft plugin development process.

Minecraft plugin development is a complex task that involves understanding complex APIs, build configurations, dependency management, and numerous library documentation. Redstone solves these complexities with an AI-based specialized agent system.
<br>

[![GitHub Contributors](https://img.shields.io/github/contributors/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/graphs/contributors)
[![GitHub Forks](https://img.shields.io/github/forks/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/network/members)
[![GitHub Stars](https://img.shields.io/github/stars/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/stargazers)
[![License](https://img.shields.io/github/license/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/blob/main/LICENSE)

<br>
</div>

## Getting Started
```bash
npm install -g opencode-redstone
redstone
```
> [!IMPORTANT]
> Before installing Redstone, make sure [Opencode](https://github.com/anomalyco/opencode) is installed!

Once the Redstone installer is launched, select “Install Redstone” and choose one of the following options.

### 1. Balanced Mode
- Some subordinate agents[^1] use Opencode’s default free model, while the Orchestrator and agents that inherit the model from the Orchestrator[^2] can be configured by the user.
- This mode provides results of reasonable quality with efficient token usage. However, some prompts may be used for model training purposes.

### 2. Professional Mode
- This mode uses closed models such as GPT or Claude for subordinate agents, making it best suited for tasks that require a high level of reliability, including consistency and stability.
- The Orchestrator model and agents that inherit the model from the Orchestrator can still be selected by the user. However, it is recommended to use models from the same provider whenever possible.
- Choose from:
  - Codex: Uses OpenAI's Codex models
  - Claude: Uses Anthropic's Claude models

### 3. Manual Mode
- You can specify individual model IDs for each agent
- Use when custom models or fine-grained control is needed

<br>

> [!TIP]
> While open source models also deliver impressive results, the quality achieved with proprietary models is undeniably compelling.

<br>

## Agent Architecture
Redstone consists of the following specialized agents:

|Agent|Role|
|:-:|:--|
|Redstone-Orchestrator|Planning and main plugin development agent|
|Redstone-Document|Project documentation creation and updates|
|Redstone-ProjectInitialization|Plugin project creation and initialization|
|Redstone-Explore|Codebase exploration and feature discovery|
|Redstone-APISearch|API documentation and dependency research|

<br>

## Contributing
Thank you for contributing to Redstone!
For contribution guidelines and branch naming conventions, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

![Contributors](https://contrib.rocks/image?repo=BackGwa/Redstone)

<br>

## License
This project is distributed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

<br>

[^1]: The ProjectInitialization, Explore, and APISearch agents use separate models that are different from the orchestrator.
[^2]: The Document agent inherits its model from the Orchestrator.