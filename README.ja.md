<div align="center">

<br>

![Redstone](.github/assets/logo.png)

<br>

Redstoneは[Opencode](https://github.com/anomalyco/opencode)をベースにしたAIエージェントシステムで、Minecraftプラグイン開発の全工程を自動化し、シンプルにします。

Minecraftプラグイン開発は、複雑なAPIの理解、ビルド設定、依存関係の管理、そして多数のライブラリドキュメントの把握が必要な、難易度の高い作業です。RedstoneはAIベースの特化型エージェントシステムで、これらの複雑さを解消します。
<br>

[![GitHub Contributors](https://img.shields.io/github/contributors/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/graphs/contributors)
[![GitHub Forks](https://img.shields.io/github/forks/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/network/members)
[![GitHub Stars](https://img.shields.io/github/stars/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/stargazers)
[![License](https://img.shields.io/github/license/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/blob/main/LICENSE)

[🇺🇸 English](./README.md) | [🇰🇷 한국어](./README.ko.md) | **🇯🇵 日本語**

<br>
</div>

## はじめに
```bash
npm install -g opencode-redstone
redstone
```
> [!IMPORTANT]
> Redstoneをインストールする前に、[Opencode](https://github.com/anomalyco/opencode)がインストールされていることを確認してください。

> [!IMPORTANT]
> プラグイン開発のために、以下が必要です:
> - 対象Minecraftバージョンに合ったJDKのインストール
> - プロジェクトをビルドするためのGradle

Redstoneインストーラーを起動したら、「Install Redstone」を選択し、次のオプションのいずれかを選んでください。

### 1. Balancedモード
- 一部のサブエージェント[^1]はOpencodeのデフォルト無料モデルを使用し、オーケストレーターおよびオーケストレーターからモデルを継承するエージェント[^2]はユーザーが設定できます。
- このモードは、トークン消費を抑えつつ妥当な品質の結果を提供します。ただし、一部のプロンプトはモデル学習目的で利用される可能性があります。

### 2. Professionalモード
- このモードは、GPTやClaudeなどのクローズドモデルをサブエージェントに使用するため、一貫性や安定性など高い信頼性が求められる作業に最適です。
- オーケストレーターのモデル、およびオーケストレーターからモデルを継承するエージェントは、引き続きユーザーが選択できます。ただし、可能な限り同一プロバイダーのモデルを使用することを推奨します。
- 選択肢:
  - Codex: OpenAIのCodexモデルを使用
  - Claude: AnthropicのClaudeモデルを使用

### 3. Manualモード
- 各エージェントごとに個別のモデルIDを指定できます
- カスタムモデルや、より細かな制御が必要な場合に使用してください

<details>
<summary>推奨モデル</summary>

**Orchestrator** » *(スキップ)*  
**Document** » *(スキップ)*  
**Planner** » *(スキップ)*  
**Project Initialization** » `openai/gpt-5.1-codex-mini`  
**Explore** » `openai/gpt-5.1-codex-mini`  
**API Search** » `openai/gpt-5.2-codex`

> セットアップ段階では、オーケストレーター、プランナー、ドキュメント用モデルはスキップすることを推奨します。ただし、社内テストではAnthropicのClaudeモデル[^3]が最も優れた性能を示しました。

> 同一のモデルプロバイダーを使用することは一般的に推奨されますが、トークン消費が急増する場合があります。複数プロバイダーを利用できる場合は、推奨モデルに示すようにサブエージェントでプロバイダーを分けることを推奨します。社内テストではOpenAIのCodexモデル系列が探索・検索タスクに最適化されていることが確認されています。
</details>

<br>

> [!TIP]
> オープンソースモデルも優れた結果を出しますが、プロプライエタリモデルで得られる品質には確かな魅力があります。

<br>

## エージェントアーキテクチャ
Redstoneは、次の特化エージェントで構成されます:

|エージェント|役割|
|:-:|:--|
|Redstone-Orchestrator|計画立案およびメインのプラグイン開発エージェント|
|Redstone-Document|プロジェクトドキュメントの作成と更新|
|Redstone-Planner|実装計画の作成と維持|
|Redstone-ProjectInitialization|プラグインプロジェクトの作成と初期化|
|Redstone-Explore|コードベースの探索と機能の発見|
|Redstone-APISearch|APIドキュメントと依存関係の調査|

<br>

## コントリビュート
Redstoneへのコントリビュートありがとうございます。
コントリビュートガイドラインおよびブランチ命名規則は、[CONTRIBUTING.md](./CONTRIBUTING.md)を参照してください。

![Contributors](https://contrib.rocks/image?repo=BackGwa/Redstone)

<br>

## ライセンス
このプロジェクトはMITライセンスの下で配布されています。詳細は[LICENSE](./LICENSE)ファイルを参照してください。

<br>

[^1]: ProjectInitialization、Explore、APISearchエージェントは、オーケストレーターとは別のモデルを使用します。
[^2]: DocumentとPlannerエージェントは、オーケストレーターからモデルを継承します。
[^3]: Claudeモデルの中では、多くのタスクをSonnet 4.5で成功させることができます。ただし、より大きなコードベースを扱い、より深い理解が必要な場合はOpus 4.5の使用を検討してください。このモデルは利用コストが高いため、Sonnet 4.5とOpus 4.5を交互に使うことを推奨します。
