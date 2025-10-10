# AAID : Augmented AI Development

_Professional TDD for AI-Augmented Software Development_

🔻

![AAID Augmented Being](https://raw.githubusercontent.com/dawid-dahl-umain/augmented-ai-development/refs/heads/main/assets/aaid-ai-workflow-h.webp)

> **📋 Repository Purpose**: This repository contains support resources for developers who want to follow the `AAID` framework. The main methodology is introduced in our [dev.to article](https://dev.to/dawiddahl/aaid-augmented-ai-development-50c9) (also available in the repo [here](./docs/aidd-workflow.md)) with detailed resources, templates, and tools provided here.

## What is AAID?

**AUGMENTED AI DEVELOPMENT `AAID`** (**/eɪd/** - pronounced like "aid") is a disciplined approach where developers augment their capabilities by integrating with AI, while maintaining full architectural control. You direct the agent to generate tests and implementation code, reviewing every line and ensuring alignment with business requirements.

**You're not being replaced. You're being augmented.**

This separates professional software development from "vibe coding." While vibe coders blindly accept AI output and ship buggy, untested code they can't understand, `AAID` practitioners use TDD (Test-Driven Development) to ensure reliable agentic assistance.

## The AAID Advantage

- **Predictable Development**: TDD discipline keeps the AI under control - _your_ control
- **Full Understanding**: You review and understand every line of code
- **Production Quality**: Tests ensure code meets business and technical requirements
- **Comprehensive Testing**: Unit tests (TDD) and acceptance tests (ATDD/BDD) ensure every aspect of the application is fully tested
- **Speed + Stability**: AI accelerates development while TDD ensures reliability

Built on proven foundations from Kent Beck's TDD, Dave Farley's Continuous Delivery, Acceptance Testing and Four-Layer Model, Robert C. Martin's Three Laws of TDD, and other battle-tested practices.

## Quick Links

- **[🚀 Start Here: Onboarding Guide](docs/onboarding/guide.md)** - Gentle introduction to AAID (~60 minutes, 7 progressive levels)
- **[Complete AAID Guide](docs/aidd-workflow.md)** - The full methodology and workflow
- **[Complete AAID Acceptance Testing Guide](appendices/appendix-a/docs/aaid-acceptance-testing-workflow.md)** - Using Dave Farley's Four-Layer Model for ATDD/BDD
  - **[Acceptance Testing Workflow Diagram](appendices/appendix-a/aaid-at-workflow.diagram.mermaid)** - Visual representation of the `AAID` Acceptance Testing process
- **[Demo Repository](https://github.com/dawid-dahl-umain/augmented-ai-development-demo)** - TicTacToe CLI developed using the `AAID` workflow, demonstrating the Four-Layer Model, test isolation patterns, and hexagonal architecture
- **[Workflow Diagram](aaid-workflow-diagram.mermaid)** - Visual representation of the `AAID` process

## Repository Structure

```
├── docs/
│   ├── onboarding/       # Gentle introduction to AAID
│   └── aidd-workflow.md  # Complete AAID methodology guide
├── appendices/           # Supporting documentation
├── .cursor/commands/     # Cursor slash commands (copy to other tools' custom-command folders)
│   ├── planning/
│   ├── tdd/
│   ├── investigation/
│   └── misc/
└── rules/                # AI workflow rules (drop into .cursor/rules/ or CLAUDE.md)
```

## Core Components

### 🚀 **Onboarding**

- **[`docs/onboarding/guide.md`](docs/onboarding/guide.md)**: Gentle introduction to AAID with 7 progressive levels (~60 minutes total)
  - Start here if you're new to AAID or TDD

### 📙 **Main Guide**

- **[`docs/aidd-workflow.md`](docs/aidd-workflow.md)**: The complete `AAID` methodology with detailed explanations, examples, and step-by-step workflows

### 📚 **Appendices**

- **Appendix A**: [Acceptance Testing with Four-Layer Model](appendices/appendix-a/docs/aaid-acceptance-testing-workflow.md)
  - Complete workflow for ATDD/BDD using Dave Farley's architecture
- **Appendix B**: [Reusable prompts and AI commands](appendices/appendix-b/reusable-prompts.md)
  - Pre-written AI commands organized by purpose to speed up development
- **Appendix C**: [AI workflow rules for your IDE](appendices/appendix-c/aaid-ai-workflow-rules.md)
  - Ready-to-use AI agent instructions that enforce the AAID TDD workflow discipline
- **Appendix D**: [Handling technical implementation details](appendices/appendix-d/handling-technical-implementation-details.md)
  - Understanding the three Implementation Categories and how to apply AAID to technical implementation details
- **Appendix E**: [Dependencies and Mocking](appendices/appendix-e/dependencies-and-mocking.md)
  - Understanding the four Dependency Categories and how to handle them in different test types

### ⚡ **Reusable Prompts**

Pre-written AI commands organized by purpose:

- **Setup & Planning**: Context setting, roadmap generation
- **TDD Cycle**: Red/Green/Refactor phase commands
- **Problem Solving**: Debug, analyze, and fix commands
- **Utilities**: Git commits, code formatting

### 🤖 **AI Integration**

- **Workflow Rules**: Ready-to-use rules for Cursor (and easily adaptable for Claude Code or other AI IDEs/CLIs)
- **Phase Management**: Custom slash commands that enforce TDD discipline, if AI fails to follow rules/instructions properly

## Getting Started

1. **🚀 New to AAID?**: Start with the [Onboarding Guide](docs/onboarding/guide.md) (~60 minutes) for a gentle introduction
2. **Read the Complete Guide**: [`docs/aidd-workflow.md`](docs/aidd-workflow.md) for the full methodology and reference material
3. **Have BDD Specs Available**: `AAID` is a spec-driven methodology. No specs, no `AAID`.
4. **Set up a project/Select a project**: To build new features in a new or existing project, set up or select one with which to work
5. **Add AI Rules**: Copy [`rules/aaid/aaid-development-rules.mdc`](rules/aaid/aaid-development-rules.mdc) into Cursor's `.cursor/rules/` or your tool's equivalent (e.g., `CLAUDE.md`)
   - (Optional) Add Custom Slash Commands [.cursor/commands](.cursor/commands) into Cursor's `.cursor/commands/` or your tool's equivalent.
6. **Follow the Workflow**: Apply the 4-stage `AAID` process to your development. Use [diagram](aaid-workflow-diagram.mermaid) as a visual guide

## The AAID Workflow

See the full diagram: [AAID Workflow Diagram](aaid-workflow-diagram.mermaid)

1. **📚 Context Providing**: Give AI comprehensive project understanding
2. **🤝 Planning**: Collaborate on high-level approach and test roadmap
3. **📝 TDD Development Starts**: Create test structure
4. **🔄 TDD Cycle**: Disciplined Red → Green → Refactor cycles with mandatory reviews

Each phase includes specific commands, review checkpoints, and quality gates to ensure AI augmentation enhances rather than compromises your development process.

> The diagram shows three distinct development paths, distinguished by colored arrows:
>
> - **Blue arrows**: Common workflow and Domain/Business Logic (including shared TDD stages)
> - **Orange arrows**: Technical Implementation specific branches (see [Appendix D](./appendices/appendix-d/handling-technical-implementation-details.md))
> - **Purple arrows**: Presentation/UI specific branches (no TDD - see [Appendix D](./appendices/appendix-d/handling-technical-implementation-details.md))

## Who This Is For

`AAID` is for developers building **maintainable software**; whether professional engineers or personal project builders expecting longevity. If you need quick scripts or throwaway prototypes, simpler AI approaches work better.

**You need:**

- Basic understanding of AI prompts and context
- Some experience with automated testing
- Patience to review AI-generated code

**You don't need:**

- Prior TDD experience
- Specific tech stack knowledge
- Deep AI expertise

---

_**AAID**: Professional TDD for AI-Augmented Software Development_
