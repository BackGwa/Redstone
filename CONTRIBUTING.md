# Contributing
Thank you for your interest in contributing to Redstone!

## Branch

### Branch Naming Convention
We follow a specific naming convention for branches to maintain clarity and organization

|Prefix|Purpose|
|:-:|:--|
|`bugs/`|Bug fixes|
|`features/`|New features|
|`document/`|Adding or modifying documents|

### Branch Naming Guidelines
- Specify what feature or bug is being addressed
- Use lowercase with hyphens to separate words
- Clearly identify the specific component, feature, or issue
- Avoid using issue numbers in branch names

### Reserved Branches
- `develop` is reserved for maintainers and is not available for external contributors
- It is used for integration testing and small development-stage changes
- `develop` changes are fast-moving and may be unstable

### Branch Flow Policy
- In general, avoid direct commits to `main`. Most work lands in `develop` first and is later promoted to `main`
- Start new feature branches from the stable `main` baseline
- `develop` → `main` merges are handled by a repository maintainer without a PR
- Any branch that merges into `develop` goes through a PR
