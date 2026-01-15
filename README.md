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
> Before installing Redstone, make sure [Opencode](https://github.com/anomalyco/opencode) is installed!

Select one of the following options in the installation menu:

### 1. Balanced Mode
- Subordinate agents use Opencode's default free model
- Users can select a model (free or paid) for the Orchestrator
- Provides efficient token usage with reasonable quality

### 2. Professional Mode
- Uses paid models such as GPT or Claude
- Suitable for professional development requiring consistency, stability, and high reliability
- Choose from:
  - Codex: Uses OpenAI's Codex models
  - Claude: Uses Anthropic's Claude models

### 3. Manual Mode
- You can specify individual model IDs for each agent
- Use when custom models or fine-grained control is needed

## Agent Architecture
Redstone consists of the following specialized agents:

|Agent|Role|
|:-:|:--|
|Redstone-Orchestrator|Planning and main plugin development agent|
|Redstone-Document|Project documentation creation and updates|
|Redstone-ProjectInitialization|Plugin project creation and initialization|
|Redstone-Explore|Codebase exploration and feature discovery|
|Redstone-APISearch|API documentation and dependency research|

## Contributing
Thank you for contributing to Redstone!
For contribution guidelines and branch naming conventions, please refer to [CONTRIBUTING.md](./CONTRIBUTING.md).

![Contributors](https://contrib.rocks/image?repo=BackGwa/Redstone)

## License
This project is distributed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
