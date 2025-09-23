# AAID : Augmented AI Development

_Professional TDD for AI-Augmented Software Development_

🔻

![AAID Banner](https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fqgjees84mjbbq1xh083w.jpg)

> **📋 Repository Purpose**: This repository contains support resources for developers who want to follow the `AAID` framework. The main methodology is introduced in our [dev.to article](https://dev.to/placeholder-link), with detailed resources, templates, and tools provided here.

## What is AAID?

**AUGMENTED AI DEVELOPMENT `AAID`** (**/eɪd/** - pronounced like "aid") is a disciplined approach where developers augment their capabilities by integrating with AI, while maintaining full architectural control. You direct the agent to generate tests and implementation code, reviewing every line and ensuring alignment with business requirements.

**You're not being replaced. You're being augmented.**

This separates professional software development from "vibe coding." While vibe coders blindly accept AI output and ship buggy, untested code they can't understand, `AAID` practitioners use TDD (Test-Driven Development) to ensure reliable agentic assistance.

## The AAID Advantage

- **Predictable Development**: TDD discipline prevents AI-generated bugs
- **Full Understanding**: You review and understand every line of code
- **Production Quality**: Tests ensure code meets business requirements
- **Speed + Stability**: AI accelerates development while TDD ensures reliability

Built on proven foundations from Kent Beck's TDD, Dave Farley's Continous Delivery & Four Layer Model, Robert C. Martin's Three Laws of TDD, and other battle-tested practices.

## Quick Links

- **📖 [Complete AAID Guide](docs/aidd-workflow.md)** - The full methodology and workflow
- **📝 [Dev.to Article](https://dev.to/placeholder-link)** _(Coming Soon)_ - Introduction and overview
- **🔄 [Workflow Diagram](aaid-workflow-diagram.mermaid)** - Visual representation of the AAID process

## Repository Structure

```
├── docs/              # Complete AAID methodology and workflow guide
├── appendices/        # Supporting documentation (testing, prompts, rules, technical details)
├── .cursor/commands/  # Cursor slash commands (copy markdown to other tools' custom-command folders)
│   ├── planning/
│   ├── tdd/
│   ├── investigation/
│   └── misc/
└── rules/             # AI workflow rules (drop into .cursor/rules/ or CLAUDE.md)
```

## Core Components

### 🎯 **Main Guide**

- **[`docs/aidd-workflow.md`](docs/aidd-workflow.md)**: The complete `AAID` methodology with detailed explanations, examples, and step-by-step workflows

### 📚 **Appendices**

- **Appendix A**: Unit Testing vs Acceptance Testing
- **Appendix B**: Reusable prompts and AI commands
- **Appendix C**: AI workflow rules for your IDE
- **Appendix D**: Handling technical implementation details

### ⚡ **Reusable Prompts**

Pre-written AI commands organized by purpose:

- **Setup & Planning**: Context setting, roadmap generation
- **TDD Cycle**: Red/Green/Refactor phase commands
- **Problem Solving**: Debug, analyze, and fix commands
- **Utilities**: Git commits, code formatting

### 🤖 **AI Integration**

- **Workflow Rules**: Ready-to-use rules for Cursor, Claude Code, and other AI IDEs
- **Phase Management**: Structured commands that enforce TDD discipline

## Getting Started

1. **Read the Guide**: Start with [`docs/aidd-workflow.md`](docs/aidd-workflow.md) for the complete methodology
2. **Set Up AI Rules**: Copy [`rules/aaid/aaid-development-rules.mdc`](rules/aaid/aaid-development-rules.mdc) into Cursor's `.cursor/rules/` or your tool's equivalent (e.g., `CLAUDE.md`)
3. **Use Reusable Prompts**: Use the markdown in [`.cursor/commands/`](.cursor/commands/) for Cursor slash commands, or copy them into your tool's custom-command location
4. **Follow the Workflow**: Apply the 4-stage `AAID` process to your development

## The AAID Workflow

See the full diagram: [AAID Workflow Diagram](aaid-workflow-diagram.mermaid)

1. **📚 Context Providing**: Give AI comprehensive project understanding
2. **🎯 Planning**: Collaborate on high-level approach and test roadmap
3. **✅ TDD Development Starts**: Create test structure
4. **🔄 TDD Cycle**: Disciplined Red → Green → Refactor cycles with mandatory reviews

Each phase includes specific commands, review checkpoints, and quality gates to ensure AI augmentation enhances rather than compromises your development process.

> The diagram shows three distinct development paths, distinguished by colored arrows:
>
> - **Blue arrows**: Common workflow and Domain/Business Logic (including shared TDD stages)
> - **Orange arrows**: Technical Implementation specific branches (see [Appendix D](./appendices/appendix-d-handling-technical-implementation-details.md))
> - **Purple arrows**: Presentation/UI specific branches (no TDD - see [Appendix D](./appendices/appendix-d-handling-technical-implementation-details.md))

## Who This Is For

AAID is for developers building **maintainable software** - whether professional engineers or personal project builders expecting longevity. If you need quick scripts or throwaway prototypes, simpler AI approaches work better.

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
