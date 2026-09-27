# my-aicode-project-template

个人项目脚手架模板,内置 grill 工作流技能、CLAUDE.md 模板和 tsc-spec 技术规范技能。

## 环境要求

- Node.js(LTS 即可)
- Git

## 使用方法

1. 在 GitHub 用这个模板创建新仓库("Use this template" 按钮,或 `gh repo create <新项目名> --template <你的用户名>/my-aicode-project-template --clone`)
2. clone 到本地后运行:
   node scripts\init.mjs
3. 安装过程会依次询问"装哪些技能"和"装到哪个 agent",参考下面两张表选择
4. 编辑自动生成的 CLAUDE.md,填写项目背景、需求
5. 在选定的 agent 里运行 grill,让它面试你、查漏补缺

## 技能选择参考

| 技能 | 作用 | 推荐 |
| --- | --- | --- |
| grill-with-docs | 面试你、把想法逼问清楚,同时把结果写成 CONTEXT.md 术语表和 ADR 决策记录 | 是(核心) |
| grilling | grill-with-docs 依赖的面试引擎;也可单独用于轻量面试,不写文档 | 是(grill-with-docs 依赖) |
| domain-modeling | grill-with-docs 依赖的术语维护;也可单独用于梳理项目术语 | 是(grill-with-docs 依赖) |
| ask-matt | 不确定该用哪个技能时,问它帮你路由 | 是 |
| to-prd | 把面试出的共识整理成 PRD | 是 |
| to-issues | 把 PRD 拆成可执行的 issue | 是 |
| implement | 按 issue 实现代码 | 是 |
| code-review | review 实现结果 | 是 |
| setup-matt-pocock-skills | 配置本仓库的 issue tracker、triage 标签、文档路径,是 triage/to-issues/to-prd 等技能的一次性前置设置 | 视情况(要用 triage,或想让这些技能认得你的 issue tracker 时装) |
| triage | 把外部提的 issue/PR 走一遍分诊流程:分类、核实、需要时触发面试、写成 agent 能接手的任务说明 | 可选(要正式管理 issue 列表的项目再装) |

## Agent 选择参考

| Agent | 说明 |
| --- | --- |
| claude-code | 本模板的默认场景,CLAUDE.md 和 tsc-spec 技能都是为它准备的,没有特殊需求选它 |
| 其他(cursor、codex 等) | 如果这个项目实际用别的 agent 开发,选对应的就行 |
