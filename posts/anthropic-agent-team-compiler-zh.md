---
title: "《Building a C compiler with a team of parallel Claudes》解读：Anthropic 的 agent team 实验"
date: "2026-02-06"
summary: "通过 Anthropic 的最新工程博客回顾 agent team 如何用多 Claude 实例协作，从零实现一个支持 SSA IR、多后端、能编译 Linux kernel 的 Rust C 编译器，以及他们为模型设计的测试与同步策略。"
---

## 背景与目标
Nicholas Carlini 在 2026 年 2 月 5 日的博客中，介绍了一个以 Opus 4.6 为核心的 agent team 实验：16 个 Claude 实例被要求合作开发一个 Rust 实现的 C 编译器，从零开始、具有 SSA 中间表示、面向多后端，最终能够编译 Linux 6.9，并兼容 x86/ARM/RISC-V。这个完全脱离互联网的干净实现依赖 Rust 标准库，既是对模型写出复杂系统的极限试验，也为我们观察后续自动化开发奠定信号。citeturn0search0

## “agent team”框架
为了让 Claude 不断推进、非依赖人工指示，工程团队构建了一个循环式的 harness：每当一个任务完成，新容器就用 Claude Code 重新读入当前 prompt 并接着干活；任务由模型把自己认为“下一步最明显”的子问题写入 lock 文件，其他 agent 因为 git 协调自然避开重复。并行运行时，每个 agent 都有自己的 Docker 容器、从 upstream 拉取、合并、推送，同时借助此类锁机制和无限循环不断刷新状态。针对不同工作，还能让几个 agent 专精文档、性能、重复代码检测、设计审查等岗位，让 parallel Claudes 能在同一个仓库里拥有自主协调的节奏。citeturn0search0

## 研发经验与工程考量
在这项实验里，最耗脑的反而不是写代码，而是为 Claude 设计“可理解的环境”。高质量测试、严格的持续集成、以及不断观察失败情况，确保模型不会把错误当作答案。隔离的容器意味着每次 Claude 进入上下文都会重新摸索，工程师要求它保持 README 与进度文档、在日志里写清 ERROR、避免上下文污染；同时靠 `--fast` 等抽样参数控制测试时间盲，使每个 agent 既能覆盖所有文件又不会在耗时验证里迷路。当 Linux 内核编译卡在同一个 bug 上时，他们还借助 GCC 作为“在线已知可行编译器”，先用 GCC 编译大部分文件，只让 Claude 处理一小部分，借此实现更易并行的 delta debugging。citeturn0search0

## 规模、成果与限制
这项实验一共耗费近 2,000 次 Claude Code 会话、输入 20 亿 tokens、输出 1.4 亿 tokens，总成本不到 20,000 美元。最终产出一份 10 万行的 C 编译器，能够构建 QEMU、FFmpeg、SQLite、Postgres、Redis、Doom 等项目，在多数编译器测试中达 99% 通过率，且能够编译 Linux 6.9 的多个架构版本。citeturn0search0

但 Carlini 也坦承该编译器仍受限：尚未自己实现 16 位 real mode 生成器（x86 32/64 代码自己可编译，但引导仍需调用 GCC）、汇编器与链接器还只能借助 GCC、生成代码效率不及 GCC，即使开启优化依旧落后，而且 Rust 代码可维护性也比不上人工专家的水平。这些限制印证了当前 agent team 仍然需要人类监督与外部已有工具辅助。citeturn0search0

## 更广义的观察与呼吁
Anthropic 把这次项目视为一个能力基准：每一代 Claude 都在把复杂任务的门槛往前推，从简单补全走到此刻的“自我规划 + 协作执行”。Carlini 警示，自动化开发带来的风险真实存在：人类很难针对每一次变更做深入验证，测试过关不等于安全；当模型可以独立完成大片代码时，若未有更严格的验证机制、审计流程与安全框架，人类就可能部署未经充分核验的软件。文章最后呼吁继续观察 agent team 的进展，并建立更清晰的策略，以便在欣喜能力进步的同时控制风险。citeturn0search0

## 参考链接与思考
- 原文：Anthropic，《Building a C compiler with a team of parallel Claudes》（2026 年 2 月 5 日）

