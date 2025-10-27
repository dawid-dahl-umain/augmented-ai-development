# AAID: Augmented AI Development

_Professional TDD for AI-Augmented Software Development_

🔻

![AAID Augmented Being](https://raw.githubusercontent.com/dawid-dahl-umain/augmented-ai-development/refs/heads/main/assets/aaid-ai-workflow-h.webp)

## Table of Contents

- [What Is AAID and Why It Matters](#what-is-aaid)
- [The Business Case: What Performance Research Shows](#the-business-case)
- [Who This Guide Is For](#who-this-guide-is-for)
- [Built on Proven Foundations](#built-on-proven-foundations)
- [Developer Mindset](#developer-mindset)
- [Prerequisite: Product Discovery & Specification Phase](#prerequisite)
  - [From Specification to Development](#prerequisite-spec-to-dev)
- [Getting Started With AAID](#getting-started-with-aaid)
- [AAID Workflow Diagram](#workflow-diagram)
- [AAID Development Stages](#development-stages)
  - [Stage 1: Context Providing](#stage-1-context)
  - [Stage 2: Planning](#stage-2-planning)
  - [Stage 3: TDD Development Begins](#stage-3-tdd-begins)
  - [Stage 4: The TDD Cycle](#stage-4-tdd-cycle)
- [Continuing the TDD Cycle](#continuing-tdd-cycle)
- [Conclusion: The Augmented Advantage](#conclusion)
- [Example Implementation](#example-implementation)
- [Appendices (Optional)](#appendices)
  - [Appendix A: Unit Testing and Acceptance Testing](#appendix-a)
  - [Appendix B: Helpful Commands (Reusable Prompts)](#appendix-b)
    - [Setup & Planning Commands](#appendix-b-setup-commands)
    - [TDD Development Commands](#appendix-b-tdd-commands)
    - [Investigation & Problem Solving Commands](#appendix-b-investigation-commands)
    - [Misc Commands](#appendix-b-misc-commands)
  - [Appendix C: AAID AI Workflow Rules](#appendix-c)
  - [Appendix D: Handling Technical Implementation Details](#appendix-d)
  - [Appendix E: Dependencies and Mocking](#appendix-e)
- [About the Author](#about-author)

---

<a id="what-is-aaid"></a>

## What Is AAID and Why It Matters

**AUGMENTED AI DEVELOPMENT `AAID`** (**/eɪd/** - pronounced like "aid") is a disciplined approach where developers augment their capabilities by integrating with AI, while maintaining full architectural control. You direct the agent to generate tests and implementation code, reviewing every line and ensuring alignment with business requirements.

**You're not being replaced. You're being augmented.**

This separates professional software development from "vibe coding." While vibe coders blindly accept AI output and ship buggy, untested code they can't understand, `AAID` practitioners use proper TDD (Test-Driven Development) to ensure reliable agentic assistance.

<a id="the-business-case"></a>

## The Business Case: What Performance Research Shows

[DORA](https://dora.dev/) (Google Cloud's **DevOps Research and Assessment**) highlights the proven TDD principle `AAID` relies on: developer-owned testing drives performance [[1]](https://dora.dev/capabilities/test-automation/). At the same time, a 25% increase in AI adoption correlates with a 7.2% drop in delivery stability and 1.5% decrease in throughput, while 39% of developers report little to no trust in AI-generated code [[2]](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report).

`AAID` solves this. The TDD discipline forces every AI-generated line through comprehensive testing and mandatory reviews, capturing AI's productivity gains (increased **documentation quality**, **code quality**, **review** and **generation speed** [[2]](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)) without the stability loss.

DORA proves speed and stability aren't trade-offs [[3]](https://dora.dev/guides/dora-metrics-four-keys/). With `AAID`, speed comes from AI augmentation supported by the safety net of tests, stability from disciplined testing. You get both together, not one at the expense of the other.

[1] [DORA Capabilities: Test automation](https://dora.dev/capabilities/test-automation/)
[2] [Announcing the 2024 DORA report | Google Cloud Blog](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)
[3] [DORA's software delivery metrics: the four keys](https://dora.dev/guides/dora-metrics-four-keys/)

<a id="who-this-guide-is-for"></a>

## Who This Guide Is For

`AAID` is for serious developers who aim at maintainable software. Whether you're a professional engineer or someone building a personal project you expect to last over an extended period of time.

If you just need quick scripts or throwaway prototypes, other AI approaches work better.

**What you need:**

- Basic understanding of how AI prompts and context work
- Some experience with automated testing
- Patience to review what the AI writes (no blind copy-pasting)

**What you don't need:**

- TDD experience (you'll learn it here)
- Specific tech stack knowledge
- Deep AI expertise

The result? **Predictable** development with great potential for **production-grade** quality software. While initially the `AAID` workflow requires more discipline and effort than vibe coding, in the long run you'll move faster. No debugging mysterious AI-generated bugs or untangling code you don't understand.

This guide shows you exactly how to, from context-setting through disciplined TDD cycles, ship features that deliver real business value.

It's also an incredibly fun way to work!

<a id="built-on-proven-foundations"></a>

## Built on Proven Foundations

Unlike most other AI-driven workflows, `AAID` doesn't try to reinvent product discovery or software development. Instead it stands on the shoulders of giants, applying well-established methodologies:

- **Kent Beck**'s TDD cycles
- **Dave Farley**'s Continuous Delivery and four-layer acceptance testing model
- **Robert C. Martin**'s Three Laws of TDD
- **Daniel Terhorst-North**'s Behavior-Driven Development (BDD) methodology
- **Aslak Hellesøy**'s BDD and Gherkin syntax for executable specifications
- **Martin Fowler**'s work on refactoring, evolutionary design, and Domain-Specific Languages
- And more.

These battle-tested practices become your foundation that guides AI-assisted development.

<a id="developer-mindset"></a>

## Developer Mindset

Success with `AAID` requires a specific mindset:

1: **🧠 Don't abandon your brain**

You need to stay engaged with, and comprehend, every line of code, every test, every refactoring. The AI generates the code, but you decide what stays, what changes, what is removed, and why.

Without this understanding, you're just _hoping_ things will work, which is sure to spell disaster in any real-world project.

2: **🪜 Incremental steps**

This mentality is what really sets this AI workflow apart from others. Here, instead of letting the AI go off for minutes or even hours and produce a lot of dangerous garbage code, you make sure to remain in control by iterating in **small**, **focused** steps.

One test at a time. One feature at a time. One refactor at a time.

This approach surfaces mistakes early and can even help you save money by keeping token usage low, while also making it easier to use smaller and cheaper models.

This is why the TDD cycle in `AAID` adds multiple review checkpoints—**⏸️ AWAIT USER REVIEW**—after each phase (🔴 **RED**, 🟢 **GREEN**, and 🧼 **REFACTOR**).

| ☝️                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| These incremental steps mirror [DORA](https://dora.dev/)'s research on working in small batches: tiny, independent changes give you faster feedback and reduce risk [[1]](https://dora.dev/capabilities/working-in-small-batches/). |

<a id="prerequisite"></a>

## Prerequisite: Product Discovery & Specification Phase

Before development begins, professional teams complete a product specification phase involving stakeholders, product owners, tech leads, product designers, developers, QA engineers, architects. From a high level, it follows some kind of refinement-pattern like this:

**Client's Vague Wish → Stories → Examples**

Using techniques like Impact Mapping, Event Storming, and Story Mapping, teams establish specifications that represent the fundamental business needs that must be satisfied. The resulting specifications can include:

- User stories with BDD examples, organized into epics
  - Or a [Story Map](https://jpattonassociates.com/wp-content/uploads/2015/03/story_mapping.pdf) containing the user stories + BDD examples ← (the `AAID` recommendation)
- PRD (Product Requirements Document)
- Ubiquitous language documentation. (A common language shared among stakeholders, developers, and anyone taking part in the project)
- Any additional project-specific requirements

The exact combination varies by project.

This specification package will then be used—almost religiously—to serve as the objective foundation for the `AAID` workflow, aligning development with the actual needs of the business.

| ⚙️                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Technical requirements (infrastructure elements, styling, NFRs) are tracked as separate linked tasks within stories, keeping behavioral specs pure. [Learn more](#appendix-d). |

<a id="prerequisite-spec-to-dev"></a>

### From Specification to Development

Here's how a typical user story with BDD examples can look.

_Take note of how all these BDD examples only describe the **behavior** of the system. Importantly, they say nothing of how to implement them technically._

**User Story Example:**

```gherkin
Title: User archives completed todos

User Story:

As a user, I want to archive completed todos, so that my active list stays clean
and I can focus on current tasks.

Acceptance Criteria:

Feature: User archives completed todos

Scenario: Archive a completed todo
  Given the user has a completed todo "Buy milk"
  When they archive "Buy milk"
  Then "Buy milk" should be in archived todos
  And "Buy milk" should not be in active todos

Scenario: Cannot archive an incomplete todo
  Given the user has an incomplete todo "Walk dog"
  When they attempt to archive "Walk dog"
  Then they should see an error message
  And "Walk dog" should remain in active todos

Scenario: Restore an archived todo
  Given the user has archived todo "Review code"
  When they restore "Review code"
  Then "Review code" should be in active todos
```

This article is not about this product discovery and specification refinement step; it assumes you have the specs ready. When you do, it will guide you towards how to transform the specs → tests and code ready for production.

<a id="getting-started-with-aaid"></a>

## Getting Started With AAID

> **Prerequisites**: `AAID` is a feature development workflow that assumes:
>
> ✅ **Specifications ready**: User stories with BDD scenarios from Product Discovery<br />
> ✅ **Working project**: Development environment, test runner, linting and basic tooling configured (new or existing codebase)
>
> **Note**: Basic project scaffolding (running framework generators, setting up config files) involves structural setup rather than implementable technical contracts, placing it outside `AAID`'s TDD workflow. Custom infrastructure _implementations_ (adapters, middleware, auth setup, etc) use `AAID` with TDD. See [Appendix D](#appendix-d) for details on technical implementation.

Setting up `AAID` takes just three steps:

### **1: Add the workflow rules**

Save the [`AAID` rules from Appendix C](#appendix-c) to your project:

- **Cursor**: `.cursor/rules/aaid.mdc`
- **Claude Code**: `CLAUDE.md` in project root
- **Gemini CLI**: `GEMINI.md` in project root

### **2: Add reusable commands (optional but recommended)**

Copy the [command files from Appendix B](#appendix-b) to your project:

- **Cursor**: `.cursor/commands/` (Markdown format)
- **Claude Code**: `.claude/commands/` (Markdown format)
- **Gemini CLI**: `.gemini/commands/` (TOML format - needs conversion)

### **3: Have the `AAID` workflow diagram ready**

AI agents sometimes make mistakes and unfortunately may not always follow instructions. If/when that happens, since you follow the [`AAID` mindset](#developer-mindset), you can manually steer it back on track with the workflow diagram as your guide.

### **Liftoff into `AAID` space 🚀**

That’s it, there's no more magic to it than that. The rules enforce a disciplined TDD workflow, and the commands speed up your development. Now you're ready for `AAID` Stage 1!

| 💡  | **Demo repo**: For a working example with all files pre-configured for Cursor, check the [TicTacToe demo repository](https://github.com/dawid-dahl-umain/augmented-ai-development-demo). |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

<a id="workflow-diagram"></a>

## AAID Workflow Diagram

Now that you have your specs from the product specification phase (like the user story above), and the AI environment set up, we are ready to start building!

This diagram presents the formal workflow; detailed explanations for each step follow in the **`AAID` Development Stages** section below.

![AAID workflow diagram](https://raw.githubusercontent.com/dawid-dahl-umain/augmented-ai-development/refs/heads/main/assets/aaid-workflow-diagram.webp)

The diagram shows three distinct development paths, distinguished by colored arrows:

- **Blue arrows**: Shared workflow stages and the domain/business logic path this article focuses on, as opposed to the technical and presentation paths.
- **Orange arrows**: Technical implementation specific branches (see [Appendix D](#appendix-d))
- **Purple arrows**: Presentation/UI specific branches (no TDD - see [Appendix D](#appendix-d))

| 🔗                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Click [this link](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/aaid-workflow-diagram.mermaid) to **view** the full diagram. |

> If the diagram is not rendered on mobile, copy/paste the mermaid code into a [mermaid editor](https://mermaid.live).

<a id="development-stages"></a>

## AAID Development Stages

<a id="stage-1-context"></a>

### 📚 Stage 1: Context Providing

![Stage 1 - Context Providing](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/stages/3.jpg?raw=true)

Before any AI interaction, establish comprehensive context. The AI needs to understand the project landscape to generate relevant code.

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Note on commands**: Throughout this guide, you'll see references like `/project-context`. These are pre-written **reusable** **prompts** that you trigger with the `/` prefix. The repo stores them in Cursor's `.cursor/commands/`, and you can copy the same markdown into other tools' custom-command setups (e.g., `CLAUDE.md`).<br><br>**You use these commands to augment your implementation speed.**<br><br>Find their implementations in [Appendix B](#appendix-b). |

**Steps:**

1. **Add High-Level Context** (trigger `/project-context` and include the relevant context in the same message as arguments to the command)

   - Project's README, architecture docs, package.json, config files, etc. Whatever you find important to your project from a high level.
   - Overall system design and patterns
   - **AI Research**: Use `/research-&-stop` to let AI proactively search codebase patterns and relevant documentation

   | 🤖                                                                                                                                                     |
   | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
   | This will make the AI read through and summarize the basic project context, and how to do things. This is similar to onboarding a new human colleague. |

2. **Determine What You're Building**

   Choose your development type early to load the right context:

   - **Domain/Business Logic**: Core behavior delivering business value
   - **Technical Implementation**: Infrastructure elements—adapters (Hexagonal), repositories/gateways (Clean/DDD), controllers (MVC)—plus integrations and initializations (see [Appendix D](#appendix-d))
   - **Presentation/UI**: Visual styling, animations, audio (see [Appendix D](#appendix-d))

3. **Add Specification Context** (specific to your development type)

   - **For Domain/Business**: User stories with BDD scenarios, PRD sections
   - **For Technical**: Technical tasks, NFRs, architecture decisions
   - **For Presentation**: Design specs, Figma files, style guides

   | 🤖                                                                                                                                                                    |
   | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | The AI is now fundamentally aligned with your development goals, whether creating business value, implementing technical infrastructure, or crafting user interfaces. |

4. **Add Relevant Code Context** (specific to your development type)

   - **For Domain/Business**: Domain dependencies, tests, similar features, pure function utils for similar logic
   - **For Technical**: Existing infrastructure elements, infrastructure patterns, utils, integration points
   - **For Presentation**: Components, design system, CSS framework, presentation-related config files

   | 🤖                                                                                                                                                                                                                                                                                            |
   | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Along with automated checks like linting and formatting, plus any personal AI IDE/CLI instructions you use, this step keeps the AI consistent with your codebase’s style and conventions. It also helps it technically understand how the various parts of the codebase depend on each other. |

<a id="stage-2-planning"></a>

### 🤝 Stage 2: Planning (High-Level Approach)

![Stage 2 - Planning](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/stages/4.jpg?raw=true)

With the AI agent now informed of your specific project's context from Stage 1, collaborate to understand the feature at a **high level** before diving into implementation. This is _not_ about prescribing implementation details; those will emerge through TDD for domain and technical work, or through design implementation for presentation/UI work. Instead, it's about making sure you and the AI are **aligned** on scope and approach.

| ☝️                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If you and the AI have different ideas of what is supposed to be built, many times using AI can actually slow progress down rather than speed it up. This AI planning stage helps eliminate this issue. |

#### Planning vs TDD Discovery

For domain and technical work, the planning stage provides a roadmap of **_what_** to build and roughly which tests to write. TDD will still discover **_how_** to build it through the 🔴 **Red** • 🟢 **Green** • 🧼 **Refactor** cycle. For presentation/UI work, planning outlines validation criteria rather than tests.

**What Planning IS:**

- Understanding which parts of the system are involved
- Creating a test roadmap (roughly what to test, and in what order) for domain/technical work
- Creating validation criteria for presentation/UI work
- Recognizing existing patterns to follow
- Mapping out the feature's boundaries and finding related key interfaces/ports
- Identifying external dependencies to mock (for testable work)

**What Planning IS NOT:**

- Designing specific classes or methods
- Defining data structures
- Prescribing implementation details
- Creating complete interfaces/ports up front
- Making architectural decisions tests haven't forced yet

Think of it like navigation: Planning sets the destination, TDD finds the path.

> **Modifying Untested Code?** Changing untested code in an existing codebase requires strategies (characterization tests, finding seams, etc) outside this guide's scope. In that case, see books like [Working Effectively with Legacy Code](https://www.oreilly.com/library/view/working-effectively-with/0131177052/).

**Steps:**

1. **Discuss the Feature**

   - Discuss and explore freely, as you would with a human
   - Is everything crystal clear given the provided specifications? Does the AI have any questions?
   - Share any constraints or technical considerations
   - Explore potential approaches with the AI
   - Clarify ambiguities; make sure the AI makes no wild assumptions

2. **Check for Additional Context**

   - Ask: "_Do you need any other context to understand the feature's scope and boundaries?_"
   - Provide any missing domain knowledge or system information
   - Trigger `/research-&-stop` for AI-driven investigation

3. **Request Appropriate Roadmap**
   Based on your Stage 1 choice:

   - Generate a high-level roadmap before any coding
   - For **domain/business logic**: trigger `/ai-roadmap-template`
   - For **technical implementation**: trigger `/ai-technical-roadmap-template`
   - **For presentation/UI**: trigger `/ai-presentation-roadmap-template`
   - Focus on test/validation scenarios and their logical sequence
   - Keep at "mermaid diagram" level of abstraction
   - An actual mermaid diagram can be generated if applicable

4. **Review and Refine Roadmap**
   - Review the roadmap to make sure it addresses **every** specification (business, technical, or presentation requirements)
   - Use it to ensure you and the AI agent are aligned
   - Make sure it respects existing project patterns and boundaries
   - For domain/technical: Verify the test sequence builds incrementally from simple to complex
   - For presentation: Verify validation criteria are clear and measurable
   - Iterate with the AI if adjustments are needed

> ☝️ **Note on task lists**: Many other AI workflows (such as [Task Master](https://github.com/eyaltoledano/claude-task-master)) generate "task lists" with checkboxes in the planning stage. The idea is the AI will then arbitrarily check off items as "done" as it goes. But how can you **trust** the AI's judgment for when something is actually done?
>
> ![Task Master - Tasks](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zpebpttmob0s0exbxvju.png)
>
> In addition, with such checkboxes, you must manually re-verify everything after future code changes, to prevent **regressions**.
>
> That's why you don't use checkbox/task-planning in `AAID`. Instead, for domain and technical work, you express completion criteria as good old **automated tests**. Tests aren't added as an afterthought, they're treated as first-class citizens.
>
> Automated tests = **objective** and **re-runnable** verification, eliminating both aforementioned problems of **trust** and **regression**.

If the roadmap looks good, now is when disciplined development actually starts!

| 🔀                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Path Divergence**: After roadmap approval, the workflow splits into three paths:<br><br>• **Domain/Business Logic** → Continue to Stage 3 (TDD Development)<br>• **Technical Implementation (Non-Observable)** → Continue to Stage 3 (TDD Development)<br>• **Presentation/UI (Observable Technical)** → Proceed to implementation and validation without TDD<br><br>See [Appendix D](#appendix-d) or the [Workflow Diagram](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/aaid-workflow-diagram.mermaid) for more information on these three implementation categories. |

| 💻                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Important for Frontend Developers**: `AAID` absolutely applies to frontend development! Frontend behavioral logic (form validation, state management, data transformations, etc) uses TDD just like backend. Only pure presentation/UI aspects (colors, audio, spacing, animations, some accessibility concerns) skip TDD for manual validation. See [Appendix D](#appendix-d) for detailed examples. |

<a id="stage-3-tdd-begins"></a>

### 📝 Stage 3: TDD Development Begins

![Stage 3 - TDD Development Begins](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/stages/5.jpg?raw=true)

Choose one of these two approaches for implementing your tests when starting work on a new feature:

**Option 1: Test List Approach**

Collaborate with the AI to create a list of (unimplemented) tests derived from the specs; breaking down each behavior into granular, testable steps.

Use the Roadmap from "**Stage 2: Planning**" directly or as inspiration for the test list.

The test list is a living document. Following Kent Beck's TDD approach, this list isn't carved in stone. Add new tests as you discover/think of new edge cases, remove tests that become redundant, or modify tests as your understanding evolves. The list is a tool to guide development, not a contract you must fulfill exactly as written.

> This TDD practice is in contrast to [acceptance testing](#appendix-a), where tests **must** map 1:1 to the project specs (usually BDD scenarios).

```jsx
describe("User archives completed todos", () => {
  it.skip("should archive a completed todo")
  it.skip("should not archive an incomplete todo")
  it.skip("should restore an archived todo")
})
```

| ☝️                                                                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| It is extremely important that the tests are not yet implemented at this stage. This is because TDD's iterative cycle prevents you from baking implementation assumptions into your tests. Writing all tests upfront risks testing your preconceptions rather than actual behavior requirements. |

**Option 2: Single Test Approach**

Start with the simplest test and then build incrementally:

```jsx
describe("User archives completed todos", () => {
  it("should archive a completed todo", () => {
    // To be implemented
  })
})
```

<a id="stage-4-tdd-cycle"></a>

### 🔄 Stage 4: The TDD Cycle

![Stage 4 - TDD Cycle](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/stages/6.jpg?raw=true)

| 🤖                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **The Three Laws of TDD**: The reusable TDD commands (`/red-&-stop`, `/green-&-stop`, `/refactor-&-stop`) enforce Robert C. Martin's Three Laws of TDD through the disciplined **RED** - **GREEN** - **REFACTOR** cycle:<br><br>• **RED**: Write a minimal failing test (enforces Laws 1 & 2: no production code without failing test; minimal test to fail)<br>• **GREEN**: Write the simplest code to pass (enforces Law 3: minimal production code to pass)<br>• **REFACTOR**: Improve code while keeping tests green<br><br>In practice, the `AAID` [rules file](#appendix-c) often handles phase discipline automatically, but these commands offer explicit control when needed. Re-issue with feedback to guide the AI. |

For each test, follow this disciplined 3-phase cycle:

🔴 **RED Phase** →
🟢 **GREEN Phase** →
🧼 **REFACTOR Phase** →
**Next test** → _(cycle repeats)_

> **Note**: Each phase follows the same internal pattern:
>
> - **Collaborate and generate with AI** ¹
> - **Run tests**
> - **Handle potential issues** _(if any arise)_
>   - Use `/analyze-&-stop` or other [investigation & problem solving commands](#appendix-b-investigation-commands) as needed
> - **`AWAIT USER REVIEW`**

Let's walk through a full TDD cycle using this consistent structure.

> ¹ 🦾 **Proficiency Note**: As you master `AAID`, the initial "collaborate" step often becomes autonomous AI generation using your established commands and context. This speeds up the workflow considerably. You might simply invoke `/red-&-stop` and let the AI generate appropriate code, then focus your attention on the `AWAIT USER REVIEW` checkpoints. This dual-review structure (light collaboration + formal review) is what enables both speed and control.

---

**User Story Specification:**

Let's use this simple spec as a basis.

```gherkin
Title: User adds a new todo

User Story:
As a user, I want to add a new todo to my list, so that I can keep track of my tasks.

Acceptance Criteria:

Feature: Add a new todo

Scenario: Add a new active todo
  Given the user has an empty todo list
  When they add a new todo "Buy groceries"
  Then "Buy groceries" should be in their active todos
  And the todo should not be completed
```

| ☝️                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Unit tests build incrementally**, testing one behavior at a time. As they plan for fine-grained technical correctness/edge cases, unit tests don't always need to map 1:1 with acceptance criteria; that's the acceptance test's job.<br><br>More on this distinction in [Appendix A: Unit Testing and Acceptance Testing](#appendix-a). |

---

### 🔴 RED Phase

**→ Collaborate with AI to write test** (`/red-&-stop`)

- Un-skip the first test if using test list
- Or write the first test from scratch if using single test approach

**→ Run test and verify failure**

- Should fail as expected (compilation failures count as valid test failures)

**→ Handle potential issues** _(if any arise)_

- If test passes unexpectedly: AI stops and reports the issue
- Choose investigation approach (often using [investigation & problem solving commands](#appendix-b-investigation-commands) like `/analyze-&-stop`)
- AI implements your chosen fix, then stops for review

**Example RED phase prompt:**

```
/red-&-stop

// link/paste the business specification, e.g the BDD scenario
```

_Because of the context that has been provided in the previous steps, the prompt often doesn't have to be longer than this._

**Generated test:**

```tsx
// todo.service.test.ts

describe("addTodo", () => {
  it("should add a todo with the correct text", () => {
    // When
    const result = addTodo("Buy groceries") // Fails: 'addTodo' is not defined

    // Then
    expect(result.text).toBe("Buy groceries")
  })
})
```

| ⏸️ **STOP: AWAIT USER REVIEW**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AI agent must `AWAIT USER REVIEW` before proceeding to GREEN.<br><br>**During RED phase review, evaluate:**<br>🔴 Tests behavior (what the system does), not implementation (how it does it)<br>🔴 In the test phase you design the API of what you are building; its user interface. So—does it feel nice to use?<br>🔴 Is the test hard to understand or set up? That could be a sign you need to rethink your approach. **Clean code starts with a clean test**<br>🔴 Clear test name describing the requirement<br>🔴 Proper Given/When/Then structure<br>🔴 Mock external dependencies to isolate the unit; test should run in milliseconds |

**Optional: example RED Phase follow-up prompt:**

```
/red-&-stop

- Create todo service class instead of function
- Inject repository
- Update test to check "completed" attribute only
```

_Often follow-ups like these are not needed because of Stage 1.4: Add Relevant Code Context, and 2.3 Request Feature Roadmap_

**Test after RED review:**

```tsx
// todo.service.test.ts
// Both imports will fail - files don't exist yet (compilation failure = valid test failure)

import { TodoService } from "./todo.service"
import type { Todo } from "./interfaces/todo.interface"

describe("TodoService", () => {
  it("should add a todo with completed set to false", () => {
    // Given
    const mockRepository = {} // Start minimal - no API assumptions yet
    const service = new TodoService(mockRepository)

    // When
    const result = service.addTodo("Buy groceries")

    // Then
    expect(result.completed).toBe(false)

    // Note: You're testing ONE behavior. The repository.save()
    // will be forced by a future test, not this one.
  })
})
```

---

### 🟢 GREEN Phase

**→ Collaborate with AI to write code** (`/green-&-stop`)

- Write the simplest code to make the test pass
- Keep implementation naïve/hardcoded until tests "[triangulate](https://tdd.mooc.fi/1-tdd/#triangulation)" (multiple tests force abstraction/generalization)
- No extra logic for untested scenarios

**→ Run tests to verify success**

- Current test should pass
- All other existing tests still pass

**→ Handle potential issues** _(if any arise)_

- If tests fail: AI stops and reports which ones failed
- Choose debugging approach (often using [investigation & problem solving commands](#appendix-b-investigation-commands) like `/debug-&-stop`)
- AI implements your chosen solution, then stops for review

| ☝️                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Why simplest first?** One test can only verify one thing, so complex code means untested parts. If your over-engineered solution breaks, you're debugging the test failure AND untested logic simultaneously. Simple code gets you stable fast and forces each new feature to get its own test, keeping everything verified. |

**Example GREEN phase prompt:**

```
/green-&-stop
```

**Generated code:**

```tsx
// interfaces/todo.interface.ts

export interface Todo {
  text: string
  completed: boolean
}
```

```tsx
// todo.service.ts

import type { Todo } from "./interfaces/todo.interface"

export class TodoService {
  constructor(private repository: unknown) {} // 'unknown' is fine - no test demands otherwise

  addTodo(text: string): Todo {
    // Simplest naïve/hardcoded implementation to pass the test
    return { text: "", completed: false }
  }
}
```

| ⏸️ **STOP: AWAIT USER REVIEW**                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI agent must `AWAIT USER REVIEW` before proceeding to REFACTOR.<br><br>**During GREEN phase review, evaluate:**<br>🟢 The code is the simplest possible solution to make the test pass<br>🟢 If tests triangulate (multiple examples reveal a pattern), verify code generalizes<br>🟢 No unnecessary abstractions or future-proofing if tests do not demand it<br>🟢 Code structure follows project patterns |

---

### 🧼 REFACTOR Phase

| ❕  | This phase is one of the main reasons developers won't be replaced any time soon |
| --- | -------------------------------------------------------------------------------- |

**→ Collaborate with AI to refactor** (`/refactor-&-stop`)

- Collaborate to enhance code while keeping tests green
- Apply patterns that improve current code quality

**→ Run tests to verify stability**

- No regressions introduced

**→ Handle potential issues** _(if any arise)_

- If refactoring breaks tests: AI stops and reports what failed
- Review failure and choose: fix the issue or revert to green state
- Use [investigation & problem solving commands](#appendix-b-investigation-commands) like `/minimal-fix-&-analyze-&-stop` for fixes
- Revert when the refactoring approach itself is flawed

**Example REFACTOR phase prompt:**

```
@refactor-&-stop

// Note to reader: The AI may suggest minimal refactoring since you only have one test.
// But you can guide it toward patterns that improve current code quality.

- Extract Todo model class
- Put interface in same file
- Model should be immutable
```

**Generated refactored code:**

```tsx
// models/todo.model.ts

export interface Todo {
  text: string
  completed: boolean
}

export class TodoModel implements Todo {
  constructor(
    public readonly text: string = "",
    public readonly completed: boolean = false
  ) {}

  static create(): Todo {
    // For now just handles completed status
    // Future tests will force us to handle text properly
    return new TodoModel("", false)
  }
}
```

```tsx
// services/todo.service.ts

import { type Todo, TodoModel } from "../models/todo.model"

export class TodoService {
  constructor(private readonly repository: unknown) {}

  addTodo(text: string): Todo {
    // Still ignoring text parameter - test doesn't check it yet
    // Repository still unused - no test requires persistence yet
    return TodoModel.create()
  }
}
```

| ⏸️ **STOP: AWAIT USER REVIEW**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI agent must `AWAIT USER REVIEW` before proceeding to next test. Final overall review opportunity.<br><br>**During REFACTOR phase final review, evaluate:**<br>🧼 Apply your engineering expertise to assure quality<br>🧼 Focus on fundamentals: modularity, abstraction, cohesion, separation of concerns, coupling management, readability, testability<br>🧼 Remove unnecessary comments, logs, debugging code<br>🧼 Consider potential security vulnerabilities<br>🧼 Optional: Conduct manual user testing for what you've built. Check the "_feel_"—only humans can do that!—and UX<br>🧼 Optional: Run AI bug finder for additional safety |

**Optional: example REFACTOR Phase follow-up prompt:**

```
@refactor-&-stop

- Remove all comments
```

_Often these prompts aren't needed due to the [AI workflow instructions](#appendix-c) and context provided earlier._

**Code after REFACTOR review:**

```tsx
// services/todo.service.ts

import { type Todo, TodoModel } from "../models/todo.model"

export class TodoService {
  constructor(private readonly repository: unknown) {}

  addTodo(text: string): Todo {
    return TodoModel.create()
  }
}
```

**_Congratulations_,** you made it through all the `AAID` steps! While the workflow might seem overwhelming at first, with practice it becomes habit, and the speed increases accordingly.

<a id="continuing-tdd-cycle"></a>

## Continuing the Stage 4: TDD Cycle

After completing the first cycle, you'd repeat the process with the next test that forces the code to evolve:

**Second cycle** might test: `'should create todo with provided text'`

- Forces: `return { text, completed: false }`

**Third cycle** might test: `'should persist new todos'`

- A repository interface to define the persistence contract, replacing the `unknown` type.
- Forces: Repository to have a `save` method
- Forces: `this.repository.save({ text, completed: false })`

**Fourth cycle** might test: `'should be able to find the persisted todo after creating it'`

- Forces: Repository.save must provide identifying information (an ID)

Each cycle follows the same disciplined flow:

🔴 **RED** →
⏸️ **Review** →
🟢 **GREEN** →
⏸️ **Review** →
🧼 **REFACTOR** →
⏸️ **Final review**

The tests gradually shape the implementation, ensuring every line of production code exists only because a test demanded it. This eliminates dead code and hidden bugs: if it's not tested, it doesn't exist.

<a id="conclusion"></a>

## Conclusion: The Augmented Advantage

Your bottleneck changes with `AAID`. Instead of being stuck on implementation details, you're now constrained only by your ability to architect and review.

The work becomes more strategic. You make the high-level decisions while AI handles the code generation. TDD keeps this relationship stable by forcing you to define exactly what you want before the AI builds it.

This completely avoids the dangers of vibe coding. `AAID` helps you as a professional ship quality software with full understanding of what you've built.

And as the `AAID` loop becomes muscle memory, you will catch regressions early and ship faster.

**That's the augmented advantage.**

<a id="example-implementation"></a>

## Example Implementation

For a concrete example of code generated with `AAID`, explore this [TicTacToe CLI demo](https://github.com/dawid-dahl-umain/augmented-ai-development-demo).

> **100% of the code was generated by an AI agent.**

It demonstrates a minimal hexagonal architecture with clear separation between domain logic and adapters, following `AAID` principles.

Comprehensive test coverage is also included as a consequence of TDD; both unit tests and BDD-style acceptance tests, mapped directly from specs.

---

<a id="appendices"></a>

> ### End of Guide
>
> You've reached the end of the `AAID` guide. The appendices below are optional reference material you can dip into as needed.

---

<a id="appendix-a"></a>

## Appendix A: Unit Testing and Acceptance Testing

![Appendix A](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/appendices/7.webp?raw=true)

This article on `AAID` focuses on TDD (Test-Driven Development) for **Unit Testing**, which ensures you actually write your code correctly and with high quality.

**Acceptance Testing**, on the other hand, verifies that your software aligns with business goals and is actually _done_. It serves as an executable definition-of-done.

Understanding how these two testing strategies complement each other is crucial for professional developers, as both are invaluable parts of writing production-grade software.

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Acceptance Testing is similar to E2E testing; both test the full app flow, via the system boundaries.<br><br>The key difference: AT mocks external dependencies you don't control (third-party APIs, etc) while keeping internal dependencies you do control (your database, etc) real. E2E usually mocks nothing and runs everything together.<br><br>Problem with E2E: Tests fail due to external factors (third-party outages, network issues) rather than your code. Acceptance Testing isolates your system so failures indicate real business logic problems, or technical issues that you are responsible for. |

The two kinds of tests answer different questions:

- **TDD (Unit Tests)**: "_Is my code technically correct?_"
- **ATDD (Acceptance Tests)**: "_Is my system releasable after this change?_"

So in short: `AAID` builds the solution, Acceptance Tests confirm it’s the right solution.

### Key Differences

**Unit Tests (TDD/`AAID`)**

- Answer: "_Is my code technically correct?_"
- Fine-grained, developer-focused testing
- Mock all external dependencies
  - See [Appendix E](#appendix-e) for dependency categories
- Test suite should run in seconds to tens-of-seconds
- Apply design pressure through testability
- Can but doesn't necessarily map 1:1 to user stories/acceptance criteria
- Guide code quality and modularity
- Part of the fast feedback loop in CI/CD

Example of what a unit test looks like:

```tsx
describe("TodoService", () => {
  it("should archive a completed todo", async () => {
    // Given
    const completedTodo = { id: "todo-1", title: "Buy milk", completed: true }
    mockTodoRepository.findById.mockResolvedValue(completedTodo)

    // When
    const result = await service.archiveTodo("todo-1")

    // Then
    expect(result.isOk()).toBe(true)
    expect(mockTodoRepository.moveToArchive).toHaveBeenCalledWith(completedTodo)
    expect(mockTodoRepository.removeFromActive).toHaveBeenCalledWith("todo-1")
  })
})
```

**Acceptance Tests (ATDD/BDD)**

- Answer: "_Does the system meet business requirements?_"
- Business specification validation through user-visible features
- Test in a production-like environment through system boundaries
- Mock unmanaged external dependencies (like third-party APIs)
  - Don't mock managed external dependencies (like app's database)
  - See [Appendix E](#appendix-e) for dependency categories
- Test suite will run slower than unit tests
- Maps 1:1 to user stories/acceptance criteria
- Verify the system is ready for release
- Stakeholder-focused (though developers + AI implement)

Example of what an acceptance test looks like (using the [Four-Layer](https://dojoconsortium.org/assets/ATDD%20-%20How%20to%20Guide.pdf) model pioneered by [Dave Farley](https://courses.cd.training/)):

| Layer                             | Description                             |
| --------------------------------- | --------------------------------------- |
| 1. Executable Specification       | The test                                |
| 2. Domain-Specific Language (DSL) | Business vocabulary                     |
| 3. Driver                         | Bridge between DSL and SUT              |
| 4. System Under Test (SUT)        | Production-like application environment |

```tsx
import { user, todo } from "../dsl"

describe("User archives completed todos", () => {
  it("should archive a completed todo", async () => {
    // Given
    await user.startsWithNewAccount()
    await user.hasCompletedTodo("Buy milk")

    // When
    await todo.archive("Buy milk")

    // Then
    todo.confirmInArchive("Buy milk")
    todo.confirmNotInActive("Buy milk")
  })
})
```

_Acceptance tests know nothing about how our app works internally. Even if the app changes its technical implementation details, this specification (test) will remain valid._

In acceptance tests, every DSL call follows the same flow: **Test → DSL → Driver → SUT**.

The DSL provides business vocabulary (like `user` or `archive todo`), while the driver **connects to your SUT from the outside (through APIs, UI, or other entry points)**. This separation keeps tests readable and maintainable.

Notice how unit tests directly test the class with mocks, while acceptance tests use this DSL layer to express tests in business terms.

| 🔌                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Note on Integration Testing**: While this guide focuses on unit testing through TDD, `AAID` also applies to integration testing. Integration tests verify a single infrastructure element's technical contract by testing it with only its immediate managed dependency (e.g., a repository adapter with real database). Unmanaged dependencies are mocked. See [Appendix E](../appendices/appendix-e/dependencies-and-mocking.md) for complete dependency handling guidelines. |

In `AAID`, AI helps you rapidly write unit tests and implementations. Knowing the difference between unit and acceptance testing prevents you from mistaking 'technically correct code' for 'done features,' a crucial distinction in professional development.

### AAID Acceptance Testing Resources

| Description                                                          | Link                                                                                                                                                                       |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Companion article covering the full AT workflow                      | [AAID Acceptance Testing Workflow](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/appendices/appendix-a/docs/aaid-acceptance-testing-workflow.md)  |
| Visual workflow diagram of the `AAID` three-phase AT cycle (Mermaid) | [AAID AT graph](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/appendices/appendix-a/aaid-at-workflow.diagram.mermaid)                             |
| Rule file to enable `AAID` AT mode in a project                      | [Acceptance Testing Mode](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/appendices/appendix-a/rules/aaid-at/acceptance-testing-mode.mdc)          |
| Demo of executable specifications used in practice                   | [TicTacToe executable specifications](https://github.com/dawid-dahl-umain/augmented-ai-development-demo/blob/main/acceptance-test/executable-specs/cli.acceptance.spec.ts) |

<a id="appendix-b"></a>

## Appendix B: Helpful Commands (Reusable Prompts)

![Appendix B](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/appendices/8.webp?raw=true)

These reusable prompt commands speed up your `AAID` workflow.

<a id="appendix-b-setup-commands"></a>

### Setup & Planning Commands

_Used in Stage **1: Context Providing** and **Stage 2: Planning**_

| Command                             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Stage   | Link                                                                                                                                         |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `/project-context`                  | Establishes comprehensive project understanding with architecture, testing strategy, code style, etc<br><br> _**Note on context**: Since Commands in Cursor cannot currently directly reference files with `@` symbols inside the command files themselves, you'll need to include any necessary context when invoking the command. For example:_ `/project-context @README.md @docs/architecture.md`. _The command will then operate on the provided context._ | Stage 1 | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/planning/project-context.md)                  |
| `/ai-roadmap-template`              | Creates high-level roadmap for domain/business logic features that guides TDD without prescribing implementation                                                                                                                                                                                                                                                                                                                                                | Stage 2 | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/planning/ai-roadmap-template.md)              |
| `/ai-technical-roadmap-template`    | Creates roadmap for technical implementation (infrastructure elements: adapters, repositories, controllers, etc.) - see [Appendix D](#appendix-d)                                                                                                                                                                                                                                                                                                               | Stage 2 | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/planning/ai-technical-roadmap-template.md)    |
| `/ai-presentation-roadmap-template` | Creates roadmap for observable technical elements (pure UI/sensory) - see [Appendix D](#appendix-d)                                                                                                                                                                                                                                                                                                                                                             | Stage 2 | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/planning/ai-presentation-roadmap-template.md) |
| `/ai-acceptance-roadmap-template`   | Creates strategic roadmap for acceptance testing with isolation strategy - see [Appendix A](#appendix-a)                                                                                                                                                                                                                                                                                                                                                        | Stage 2 | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/acceptance/ai-acceptance-roadmap-template.md) |

| ☝️                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Planning Tools**: Some tools have dedicated planning mechanics (e.g., Claude Code's [Plan Mode](https://claudelog.com/mechanics/plan-mode/)). Combine these with roadmap commands when beneficial. |

<a id="appendix-b-tdd-commands"></a>

### TDD Development Commands

_Used in **Stage 4: The TDD Cycle**_

These commands embed the Three Laws of TDD:

1. **No behavioral production code without a failing test**
2. **Write only enough test code to fail**
3. **Write only enough production code to pass**

Each command enforces these laws at the appropriate phase by referencing the [AAID rules file](#appendix-c), which serves as the single source of truth for the workflow.

| Command            | Description                                                               | TDD Phase   | Link                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| `/red-&-stop`      | Enter RED phase: Write minimal failing test, then STOP for review         | 🔴 RED      | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/tdd/red-%26-stop.md)      |
| `/green-&-stop`    | Enter GREEN phase: Write simplest passing code, then STOP for review      | 🟢 GREEN    | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/tdd/green-%26-stop.md)    |
| `/refactor-&-stop` | Enter REFACTOR phase: Improve code with tests green, then STOP for review | 🧼 REFACTOR | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/tdd/refactor-%26-stop.md) |

**In practice:** Since the rules file is automatically loaded by your IDE/CLI, you often won't need these commands; the AI will often follow the workflow from the rules alone. That said, the commands remain useful as explicit phase triggers when needed.

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Adding to Existing Projects**: These commands work for adding new features to any codebase (new or existing).<br><br>**Modifying Untested Code**: When changing existing untested code, first establish characterization tests (documenting current behavior) and find seams (testable injection points). See books like [Working Effectively with Legacy Code](https://www.oreilly.com/library/view/working-effectively-with/0131177052/). |

<a id="appendix-b-investigation-commands"></a>

### Investigation & Problem Solving Commands

_Used throughout various `AAID` stages for research and debugging_

These commands help when you need additional context (Stage 2: Planning) or encounter issues during the TDD cycle (Stage 4: "Handle potential issues" step).

| Command                         | Description                                                                   | Primary Use        | Link                                                                                                                                              |
| ------------------------------- | ----------------------------------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/analyze-&-stop`               | Diagnose specific problems, errors, or failures without making changes        | Debugging failures | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/investigation/analyze-%26-stop.md)                 |
| `/analyze-script-&-stop`        | Run a specific script and analyze results without making changes              | Script diagnostics | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/investigation/analyze-script-%26-stop.md)          |
| `/debug-&-stop`                 | Add debug logging and analyze results to understand issues                    | Deep debugging     | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/investigation/debug-%26-stop.md)                   |
| `/minimal-fix-&-analyze-&-stop` | Implement the simplest fix, verify results, and analyze outcome               | Quick fixes        | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/investigation/minimal-fix-%26-analyze-%26-stop.md) |
| `/research-&-stop`              | Comprehensive investigation and context gathering (use for broad exploration) | Context gathering  | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/investigation/research-%26-stop.md)                |

| ☝️                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Triggering "/analyze-script-&-stop"**: The user discusses or simply types the the script after the command name, for example: "`/analyze-script-&-stop test:db`" |

<a id="appendix-b-misc-commands"></a>

### Miscellaneous Commands

_Utility commands for common development tasks_

| Command          | Description                                                        | Use Case        | Link                                                                                                                  |
| ---------------- | ------------------------------------------------------------------ | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `/git-commit`    | Create clean commit messages following project guidelines          | Version control | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/misc/git-commit.md)    |
| `/gherkin-guard` | Enforce consistent Gherkin-style Given/When/Then comments in tests | Test formatting | [View](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/.cursor/commands/misc/gherkin-guard.md) |

These are just examples of `AAID` commands. Create your own or modify these to match your workflow. The key is using reusable prompts to greatly augment your development speed.

<a id="appendix-c"></a>

## Appendix C: AAID Workflow Rules

![Appendix C](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/appendices/9.webp?raw=true)

Configure your AI environment to understand the `AAID` workflow. These are simple text instructions, no special `AAID` app or tool is required.

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Note on AI instruction following accuracy**: At the time of writing, current AIs are good, but not at all perfect, at following instructions and rules such as the **AAID AI Workflow Rules**. Sometimes you may need to remind the AI if it for example forgets a TDD phase, or moves directly to GREEN without stopping for user review at RED.<br><br>As LLMs improve over time, you'll need to worry less about this. |

### AAID AI Workflow Rules/Instructions

_This is the official `AAID` workflow rules. But feel free to customise it._

```markdown
---
description: AAID (Augmented AI Development) - TDD workflow with disciplined RED/GREEN/REFACTOR cycles
globs:
alwaysApply: true
---

# AAID Development Rules

You are assisting a developer who may use `AAID` (Augmented AI Development) - a workflow where:

- The developer maintains architectural control and reviews all code
- You (the AI) generate tests and implementation following TDD discipline
- The workflow proceeds through strict RED → AWAIT USER REVIEW → GREEN → AWAIT USER REVIEW → REFACTOR → AWAIT USER REVIEW cycles
- Every phase requires developer review before proceeding
- Tests guide development based on provided specifications

Your role: Generate code when requested, follow TDD rules strictly when in TDD mode, and always STOP between phases.

## The Full AAID Workflow Sequence

The complete AAID workflow follows this order:

1. **Stage 1: Context Providing** (normal conversation mode)
   - User provides project context, specifications, and relevant code
   - AI reads and acknowledges understanding
2. **Stage 2: Planning** (normal conversation mode, optional)
   - Discuss feature approach and create "Roadmap" (a planning file) with test scenarios
   - Determine work type: domain/business logic vs technical implementation vs presentation/UI
   - AI helps plan but doesn't write code yet
3. **Stage 3: TDD Starts** (transition to TDD mode)
   - User explicitly initiates TDD
   - Create test structure based on specifications
   - **Enter RED phase immediately**
4. **Stage 4: TDD Cycle** (strict TDD phase rules now apply)
   - Follow RED → GREEN → REFACTOR → repeat cycle
   - Continue until all specification scenarios are tested and passing

Stages 1-3 use normal AI assistance. Stage 4 enforces strict TDD discipline as defined below.

## Recognizing AAID TDD Mode

**AAID TDD mode is ACTIVE when:**

- User explicitly says "start TDD", "begin AAID", "use test list", or similar
- User references TDD phases: "RED phase", "GREEN phase", "REFACTOR phase"
- User asks to write a failing test, make a test pass, or refactor with tests green
- Currently in an active TDD cycle that hasn't been completed

**AAID TDD mode is NOT active when:**

- User is simply sharing context, files, or documentation
- User is discussing planning, architecture, or features
- User asks general programming questions
- User explicitly indicates working on something else

## Implementation Categories

When in AAID mode, the workflow applies differently based on implementation category:

- **Domain/Business Logic**: Core business behavior using unit tests with mocks (default focus)
- **Technical Implementation**: Infrastructure elements using integration/contract tests
- **Presentation/UI**: Pure visual styling and sensory feedback - NO TDD, validation only

The TDD phases (RED/GREEN/REFACTOR) apply only to Domain and Technical Implementation work:

- **Domain work** uses Feature Roadmaps and unit tests as described in these AAID instructions (or acceptance tests if user specifically requests for it)
- **Technical Implementation work** uses Technical Roadmaps with tests based on dependency:
  - Integration tests for managed dependencies (your database, cache, queues)
  - Contract tests for unmanaged dependencies (external APIs like Stripe, SendGrid)
- **Presentation/UI work** skips TDD entirely - proceeds directly to implementation with manual validation, visual regression, accessibility audits

If user mentions "adapter", "repository", "controller", "infrastructure" → Technical Implementation
If user mentions "css", "styling", "animation", "visual design", "colors", "spacing" → Presentation/UI (no TDD)
Ask user to clarify if unclear which type of work is being done

## Phase Recognition (When in TDD Mode)

**Priority for determining phase:**

1. Explicit user declaration ("we're in RED phase") overrides all
2. Follow strict sequence: RED → GREEN → REFACTOR → RED (no skipping phases)
3. If unclear which phase, ask: "Which TDD phase are we in?"

## TDD Cycle Phases

**IMPORTANT:** These phases only apply when TDD mode is active. Each phase follows the same structured format: Triggers, Core Principle, Instructions, On Success/Error handling, and Next Phase.

### 🔴 RED Phase - Write Failing Test

**Triggers:** "write test", "test for", "red", "next test", "red phase"

**Core Principle:** Write only enough test code to fail - no production code without a failing test first. Let tests drive design.

**Instructions:**

1. Write the SMALLEST test that will fail for the next requirement
   - If test list exists: Un-skip the next test and implement its body
   - If single test approach: Write a new test for the next scenario
   - Follow test sequence from Roadmap/specs if provided
   - Start with simplest scenario (usually happy path) for new features
   - Compilation/import errors are valid failures
2. Test structure requirements:

   - Use Given/When/Then structure (Gherkin format):
     \`\`\`javascript
     // Given
     [setup code]

     // When
     [action code]

     // Then
     [assertion code]
     \`\`\`

   - Comments exactly as shown: `// Given`, `// When`, `// Then` (optional: `// And`, `// But`)
   - No other test structure comments allowed
   - Test behavior (WHAT), not implementation (HOW)
   - Mock ALL external dependencies (databases, APIs, file systems, network calls)
   - One assertion per test, or tightly related assertions for one behavior
   - No conditionals/loops in tests
   - Test names describe business behavior
   - Tests must run in milliseconds

3. Run test and verify failure
4. Run tests after EVERY code change

**On Success:** Present test and result, then **STOP AND AWAIT USER REVIEW**
**On Error:** If test passes unexpectedly, **STOP** and report (violates TDD, risks false positives)
**Next Phase:** GREEN (mandatory after approval)

### 🟢 GREEN Phase - Make Test Pass

**Triggers:** "make pass", "implement", "green", "green phase"

**Core Principle:** Write only enough production code to make the failing test pass - nothing more. Let tests drive design, avoid premature optimization.

**Instructions:**

1. Write ABSOLUTE MINIMUM code to pass current test(s)
   - Start with naïve code or hardcoding/faking (e.g., return "Hello")
   - Continue hardcoding until tests force abstraction/generalization
   - When tests "triangulate" (multiple examples pointing to a pattern), generalize
   - NO untested edge cases, validation, or future features
   - Simplified example: Test 1 expects 2+2=4? Return 4. Test 2 expects 3+3=6? Return 6.
     Test 3 expects 1+5=6? Now you need actual addition logic.
2. "Minimum" means: simplest code that passes ALL existing tests
3. Verify ALL tests pass (current + existing)
4. Run tests after EVERY code change

**On Success:** Present implementation, then **STOP AND AWAIT USER REVIEW**
**On Error:** If any test fails, **STOP** and report which ones
**Next Phase:** REFACTOR (mandatory after approval - NEVER skip to next test)

### 🧼 REFACTOR Phase - Improve Code Quality

**Triggers:** "refactor", "improve", "clean up", "refactor phase"

**Core Principle:** With passing tests as safety net, improve code structure and update tests if design changes. No premature optimization.

**Instructions:**

1. Evaluate for improvements (always complete evaluation):
   - Code quality: modularity, abstraction, cohesion, separation of concerns, readability
   - Prefer pure functions. Isolate side effects at boundaries (I/O, DB, network)
   - Remove duplication (DRY), improve naming, simplify logic
   - If no improvements needed, state "No refactoring needed" explicitly
2. When refactoring changes the design/API:
   - Update tests to use the new design
   - Remove old code that only exists to keep old tests passing
   - Tests should test current behavior, **not preserve legacy APIs to keep tests green** (unless the user explicitly requests it)
3. Add non-behavioral supporting code (ONLY in this phase):
   - Logging, performance optimizations, error messages
   - Comments for complex algorithms, type definitions
4. Keep all tests passing throughout
   - Run tests after EVERY code change

**On Success:** Present outcome (even if "no refactoring needed"), then **STOP AND AWAIT USER REVIEW**
**On Error:** If any test breaks, **STOP** and report what broke
**Next Phase:** After approval, automatically continue to RED for next test if more specs/scenarios remain. If all covered, feature complete.

## Starting TDD

When user initiates TDD mode:

User chooses approach (ask which they prefer if not clear):

1. **Test List**: Create list of unimplemented tests (skipped - e.g. `it.skip`) based on Roadmap plan file (if available)
2. **Single Test**: Start with one single unimplemented empty/skipped test for simplest scenario based on Roadmap plan file (if available)

In all cases:

- Only create test structure in Stage 3 - RED phase implements
- Each test gets complete RED→GREEN→REFACTOR cycle
- Never implement multiple tests at once

## Critical Rules

- **NEVER skip REFACTOR phase** - even if no changes needed, must explicitly complete it
- **ALWAYS STOP AND AWAIT USER REVIEW between phases** - this is mandatory
- State persists between messages - remember current phase and test progress
- Explicit user instructions override AAID workflow rules

### The Three Laws of TDD

1. Write no production code without a failing test
2. Write only enough test code to fail
3. Write only enough production code to pass
```

[AAID AI Workflow Rules/Instructions](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/rules/aaid/aaid-development-rules.mdc)

### Usage Guide

**For Cursor:**

- Project‑specific: commit a rule file in `.cursor/rules/` so it's version controlled and scoped to the repo.
- Global: Add to User Rules in Cursor Settings
- Simple alternative: Place in `AGENTS.md` in project root

**For Claude Code:**
Place in `CLAUDE.md` file in your project root (or `~/.claude/CLAUDE.md` for global use)

**For other AI tools:**
Look for "custom instructions", "custom rules", or "system prompt" settings

<a id="appendix-d"></a>

## Appendix D: Handling Technical Implementation Details

![Appendix D](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/assets/appendices/10.webp?raw=true)

The main guide above has focused on BDD/TDD for domain behavior. Technical implementation details—infrastructure elements and presentation—are covered in Appendix D.

![AAID implementation categories](https://raw.githubusercontent.com/dawid-dahl-umain/augmented-ai-development/main/assets/aaid-implementation-categories-s.webp)

[Read Appendix D: Handling Technical Implementation Details](../appendices/appendix-d/handling-technical-implementation-details.md)

<a id="appendix-e"></a>

## Appendix E: Dependencies and Mocking

![Appendix E](https://raw.githubusercontent.com/dawid-dahl-umain/augmented-ai-development/main/assets/appendices/11.webp)

Once you've identified your test type from the [Implementation Categories](../appendices/appendix-d/handling-technical-implementation-details.md#aaid-implementation-matrix-build-types-and-verification), this reference clarifies how to properly handle the dependencies of what you're testing.

It covers the four dependency categories (Pure In-Process, Impure In-Process, Managed Out-of-Process, Unmanaged Out-of-Process) and shows how each test type (unit, integration, contract, acceptance) handles them differently.

![Dependency Categories](https://raw.githubusercontent.com/dawid-dahl-umain/augmented-ai-development/main/assets/dependencies-mocking.webp)

[Read Appendix E: Dependencies and Mocking](../appendices/appendix-e/dependencies-and-mocking.md)

---

<a id="about-author"></a>
Dawid Dahl is a full-stack developer and AI skill lead at [UMAIN](https://www.umain.com/) | [EIDRA](https://www.eidra.com/). In his free time, he enjoys metaphysical ontology and epistemology, analog synthesizers, consciousness, techno, Huayan and Madhyamika Prasangika philosophy, and being with friends and family.

Photography credit: [kaixapham](https://unsplash.com/@kaixapham)
