<div align="center"><br>

![Redstone](.github/assets/logo.png)

<br>

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

> [!IMPORTANT]
> For plugin development, you must have:
> - JDK version matching your target Minecraft version installed
> - Gradle for building the project

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

<details>
<summary>Suggested Models</summary>

**Orchestrator** » *(Skip)*  
**Document** » *(Skip)*  
**Planner** » *(Skip)*  
**Project Initialization** » `opencode/grok-code` || ``openai/gpt-5.1-codex-mini``  
**Explore** » `openai/gpt-5.1-codex-mini`  
**API Search** » `openai/gpt-5.2-codex`  

> It is recommended to skip the orchestrator, planner, and documentation models during the setup phase. However, internal testing has confirmed that Anthropic's Claude models[^3] demonstrate the most outstanding performance.

> While using the same model provider is generally recommended, it can lead to rapid token consumption. If multiple model providers are available, we recommend using different providers for subordinate agents as shown in Suggested Models. Internal testing has confirmed that OpenAI's Codex model series is optimized for exploration and search tasks.
</details>

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
|Redstone-Planner|Creates and maintains implementation plans|
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
[^2]: The Document and Planner agents inherit their model from the Orchestrator.
[^3]: Among Claude models, most tasks can be successfully completed with Sonnet 4.5. However, if you need to work with larger codebases and require deeper understanding, consider using Opus 4.5. Since this model has higher usage costs, it is recommended to alternate between Sonnet 4.5 and Opus 4.5.