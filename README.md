# my-aicode-project-template

个人项目脚手架模板,自带 grill 工作流技能、CLAUDE.md 模板和 tsc-spec 技术规范技能。

## 环境要求

- Node.js(LTS 即可,用于跑 npx 和 init 脚本)
- Git

## 使用方法

1. 在 GitHub 用这个模板创建新仓库("Use this template" 按钮,或 `gh repo create <新项目名> --template <你的用户名>/my-aicode-project-template --clone`)
2. clone 到本地后运行:
   node scripts\init.mjs
3. 编辑生成的 CLAUDE.md,填写这个项目的背景、需求
4. 在你的 agent(默认 Claude Code)里运行 grill,让它面试你、查漏补缺

## 技能安装说明

第 2 步的 `node scripts\init.mjs` 已经自动装好了所需技能,不用自己手敲 `npx skills add` 命令。下面只是说明脚本内部做了哪些选择,方便以后想改的时候知道去哪改:

- **装了哪些技能**(共 8 个,覆盖从面试到实现的完整链路,写死在脚本的 `--skill` 参数里):
  - grill-with-docs — 面试你 + 写 CONTEXT.md/ADR
  - grilling — grill-with-docs 依赖的面试引擎
  - domain-modeling — grill-with-docs 依赖的术语表维护
  - ask-matt — 不确定用哪个技能时的路由
  - to-prd — 把面试结果整理成 PRD
  - to-issues — 把 PRD 拆成 issue
  - implement — 按 issue 实现
  - code-review — review 实现结果
- **装到哪个 IDE/agent**:由命令行第一个参数决定,不传默认是 `claude-code`。想换,比如:
  - node scripts\init.mjs cursor
  - node scripts\init.mjs codex

  具体支持哪些 agent 标识,参考 skills CLI 自己的 Supported Agents 列表。

想换技能列表,直接改 `scripts/init.mjs` 里 `execSync(...)` 那一行的 `--skill` 参数就行。
