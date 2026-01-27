<div align="center">

<br>

![Redstone](.github/assets/logo.png)

<br>

Redstone은 [Opencode](https://github.com/anomalyco/opencode) 기반의 에이전트로, 마인크래프트 플러그인 개발의 전 과정을 자동화하고 단순화합니다.

마인크래프트 플러그인 개발은 복잡한 API 이해, 빌드 설정, 의존성 관리, 그리고 수많은 라이브러리 문서 파악을 요구하는 복잡한 작업입니다. Redstone은 전문화된 에이전트 시스템으로 이러한 복잡성을 해결합니다.
<br>

[![GitHub Contributors](https://img.shields.io/github/contributors/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/graphs/contributors)
[![GitHub Forks](https://img.shields.io/github/forks/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/network/members)
[![GitHub Stars](https://img.shields.io/github/stars/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/stargazers)
[![License](https://img.shields.io/github/license/BackGwa/Redstone)](https://github.com/BackGwa/Redstone/blob/main/LICENSE)

[🇺🇸 English](./README.md) | **🇰🇷 한국어** | [🇯🇵 日本語](./README.ja.md)

<br>
</div>

## 시작하기
```bash
npm install -g opencode-redstone
redstone
```
> [!IMPORTANT]
> Redstone을 설치하기 전에 [Opencode](https://github.com/anomalyco/opencode)가 설치되어 있어야 합니다!

> [!IMPORTANT]
> 플러그인 개발을 위해서는 다음이 필요합니다:
> - 대상 마인크래프트 버전과 일치하는 JDK
> - 프로젝트 빌드를 위한 Gradle

Redstone 설치 프로그램을 실행한 후, "Install Redstone"을 선택하고 다음 옵션 중 하나를 선택하세요.

### 1. Balanced 모드
- 일부 하위 에이전트[^1]는 Opencode의 기본 무료 모델을 사용하고, 오케스트레이터와 그로부터 상속받는 에이전트[^2]는 사용자가 설정할 수 있습니다.
- 이 모드는 효율적인 토큰 사용으로 합리적인 품질의 결과를 제공합니다. 단, 일부 프롬프트는 모델 학습 목적으로 사용될 수 있습니다.

> [!NOTE]
> Opencode는 더 이상 일부 모델을 무료로 제공하지 않습니다.
> 따라서 Balanced 모드에서는 하위 에이전트가 opencode/big-pickle 모델을 사용합니다.

### 2. Professional 모드
- 이 모드는 GPT나 Claude와 같은 독점 모델을 하위 에이전트에 사용하여, 일관성과 안정성을 포함한 높은 신뢰성이 요구되는 작업에 가장 적합합니다.
- 오케스트레이터 모델과 그로부터 상속받는 에이전트는 여전히 사용자가 선택할 수 있습니다. 하지만, 가능하면 동일한 제공업체의 모델을 사용하는 것이 권장됩니다.
- 선택 가능:
  - Codex: OpenAI의 Codex 모델을 사용합니다.
  - Claude: Anthropic의 Claude 모델을 사용합니다.

### 3. Manual 모드
- 각 에이전트에 대해 개별 모델 ID를 지정할 수 있습니다
- 커스텀 모델이나 세밀한 제어가 필요할 때 사용하세요

<details>
<summary>권장 모델</summary>

**Orchestrator** » *(건너뛰기)*  
**Document** » *(건너뛰기)*  
**Planner** » *(건너뛰기)*  
**Project Initialization** » `openai/gpt-5.1-codex-mini`  
**Explore** » `openai/gpt-5.1-codex-mini`  
**API Search** » `openai/gpt-5.2-codex`

> 설정 단계에서는 Orchestrator, Planner, Document 모델을 건너뛰는 것이 권장됩니다. 내부 테스트 결과, Anthropic의 Claude 모델[^3]이 가장 뛰어난 성능을 보여주었습니다.

> 동일한 모델 제공업체를 사용하는 것이 일반적으로 권장되지만, 토큰 소비가 급격히 증가할 수 있습니다. 여러 모델 제공업체를 사용할 수 있다면, 권장 모델에 표시된 대로 하위 에이전트에는 다른 제공업체를 사용하는 것을 권장합니다. 내부 테스트 결과, OpenAI의 Codex 모델 시리즈가 탐색 및 검색 작업에 최적화되어 있음이 확인되었습니다.
</details>

<br>

> [!TIP]
> 오픈소스 모델도 충분히 뛰어나지만, 독점 모델이 제공하는 품질은 부인할 수 없을 만큼 매력적입니다.

<br>

## 에이전트 아키텍처
Redstone은 다음과 같은 전문화된 에이전트로 구성됩니다:

|에이전트|역할|
|:-:|:--|
|Redstone-Orchestrator|계획 수립 및 메인 플러그인 개발 에이전트|
|Redstone-Document|프로젝트 문서 생성 및 업데이트|
|Redstone-Planner|구현 계획 생성 및 관리|
|Redstone-ProjectInitialization|플러그인 프로젝트 생성 및 초기화|
|Redstone-Explore|코드베이스 탐색 및 기능 발견|
|Redstone-APISearch|API 문서 및 의존성 조사|

<br>

## 기여하기
Redstone에 기여해 주셔서 감사합니다!
기여 가이드라인과 브랜치 명명 규칙은 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참조하세요.

![Contributors](https://contrib.rocks/image?repo=BackGwa/Redstone)

<br>

## 라이선스
이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.

<br>

[^1]: ProjectInitialization, Explore, APISearch 에이전트는 오케스트레이터와 다른 별도의 모델을 사용합니다.
[^2]: Document와 Planner 에이전트는 오케스트레이터로부터 모델을 상속받습니다.
[^3]: Claude 모델 중에서 대부분의 작업은 Sonnet 4.5로 성공적으로 완료할 수 있습니다. 그러나 더 큰 코드베이스를 다루고 더 깊은 이해가 필요하다면 Opus 4.5 사용을 고려하세요. 이 모델은 사용 비용이 더 높으므로, Sonnet 4.5와 Opus 4.5를 번갈아 사용하는 것이 권장됩니다.
