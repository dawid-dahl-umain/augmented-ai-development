# AAID: Augmented AI Development

_Professional TDD for AI-Augmented Software Development_

## Table of Contents

- [What Is AAID and Why It Matters](#what-is-aaid)
- [The Business Case: What Performance Research Shows](#the-business-case)
- [Who This Guide Is For](#who-this-guide-is-for)
- [Built on Proven Foundations](#built-on-proven-foundations)
- [Works with Any AI Tool](#works-with-any-ai-tool)
- [Developer Mindset](#developer-mindset)
- [Prerequisite: Product Discovery & Specification Phase](#prerequisite)
- [AAID Workflow Diagram](#workflow-diagram)
- [AAID Development Stages](#development-stages)
  - [Stage 1: Context Providing](#stage-1-context)
  - [Stage 2: Planning](#stage-2-planning)
  - [Stage 3: TDD Development Starts](#stage-3-tdd-starts)
  - [Stage 4: The TDD Cycle](#stage-4-tdd-cycle)
- [Continuing the TDD Cycle](#continuing-tdd-cycle)
- [Conclusion: The Augmented Advantage](#conclusion)
- [Appendices (Optional)](#appendices)
  - [Appendix A: Unit Testing and Acceptance Testing](#appendix-a)
  - [Appendix B: Helpful Commands (Reusable Prompts)](#appendix-b)
    - [Setup & Planning Commands](#appendix-b-setup-commands)
    - [TDD Development Commands](#appendix-b-tdd-commands)
    - [Investigation & Problem Solving Commands](#appendix-b-investigation-commands)
    - [Misc Commands](#appendix-b-misc-commands)
  - [Appendix C: AAID AI Workflow Rules](#appendix-c)
  - [Appendix D: Handling Technical Implementation Details](#appendix-d)
- [About the Author](#about-author)

---

<a id="what-is-aaid"></a>

## What Is AAID and Why It Matters

**AUGMENTED AI DEVELOPMENT `AAID`** (**/eɪd/** - pronounced like "aid") is a disciplined approach where developers augment their capabilities by integrating with AI, while maintaining full architectural control. You direct the agent to generate tests and implementation code, reviewing every line and ensuring alignment with business requirements.

**You're not being replaced. You're being augmented.**

This separates professional software development from "vibe coding." While vibe coders blindly accept AI output and ship buggy, untested code they can't understand, `AAID` practitioners use TDD (Test-Driven Development) to ensure reliable agentic assistance.

<a id="the-business-case"></a>

## The Business Case: What Performance Research Shows

[DORA](https://dora.dev/) (Google Cloud's **DevOps Research and Assessment**) highlights the proven TDD principle `AAID` relies on: developer-owned testing drives performance [[1]](https://dora.dev/capabilities/test-automation/). At the same time, a 25% increase in AI adoption correlates with a 7.2% drop in delivery stability and 1.5% decrease in throughput, while 39% of developers report little to no trust in AI-generated code [[2]](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report).

`AAID` solves this. The TDD discipline forces every AI-generated line through comprehensive testing and mandatory reviews, capturing AI's productivity gains (increased **documentation quality**, **code quality**, **review and generation speed** [[2]](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)) without the stability loss.

DORA proves speed and stability aren't tradeoffs [[3]](https://dora.dev/guides/dora-metrics-four-keys/). With `AAID`, speed comes from AI augmentation supported by the safety net of tests, stability from disciplined testing. You get both together, not one at the expense of the other.

[1] [DORA Capabilities: Test automation](https://dora.dev/capabilities/test-automation/)
[2] [Announcing the 2024 DORA report | Google Cloud Blog](https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report)
[3] [DORA's software delivery metrics: the four keys](https://dora.dev/guides/dora-metrics-four-keys/)

<a id="who-this-guide-is-for"></a>

## Who This Guide Is For

`AAID` is for developers who aim at maintainable software. Whether you're a professional engineer or someone building a personal project you expect to last over an extended period of time.

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
- **Daniel Terhorst-North**'s Behaviour-Driven Development (BDD) methodology
- **Aslak Hellesøy**'s BDD and Gherkin syntax for executable specifications
- **Martin Fowler**'s work on refactoring and evolutionary design
- And more.

These battle-tested practices become your foundation that guides AI-assisted development.

<a id="works-with-any-ai-tool"></a>

## Works with Any AI Tool

The workflow applies to any AI-assisted environment - **Cursor**, **Claude Code**, **Gemini CLI**, etc. The principles are the same; only the mechanics differ.

E.g. the reusable prompt Commands you'll learn about in [Appendix B](#appendix-b), use **Notepads** in Cursor or **Custom slash commands** in Claude Code/Gemini CLI.

<a id="developer-mindset"></a>

## Developer Mindset

Success with `AAID` requires a specific mindset:

1: **🧠 Don't check your brain at the door**

You need to comprehend every line of code, every test, every refactoring. The AI generates the code, but you decide what stays, what changes, what is removed, and why.

Without this understanding, you're just _hoping_ things will work, which is sure to spell disaster in any real-world project.

2: **🪜 Incremental steps**

This mentality is what really sets this AI workflow apart from others. Here, instead of letting the AI go off and produce a lot of dangerous garbage code, you make sure to remain in control by iterating in small, focused steps.

One test at a time. One feature at a time. One refactor at a time.

This is why the TDD cycle in `AAID` adds multiple review checkpoints—**⏸️ AWAIT USER REVIEW**—after each phase (🔴 **RED**, 🟢 **GREEN**, and 🧼 **REFACTOR**).

| ☝️                                                                                                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| These incremental steps mirror [DORA](https://dora.dev/)'s research on working in small batches: tiny, independent changes give you faster feedback and reduce risk [[1]](https://dora.dev/capabilities/working-in-small-batches/). |

<a id="prerequisite"></a>

## Prerequisite: Product Discovery & Specification Phase

Before development begins, professional teams complete a product specification phase involving stakeholders, product owners, tech leads, product designers, developers, QA engineers, architects. From a high level it follows some kind of refinement-pattern like this:

**Client's Vague Wish → Stories → Examples**

Using techniques like Impact Mapping, Event Storming, and Story Mapping, teams establish specifications that represent the fundamental business needs that must be satisfied. The resulting specifications can include:

- User stories with BDD examples, organized into epics
  - Or a [Story Map](https://jpattonassociates.com/wp-content/uploads/2015/03/story_mapping.pdf) containing the user stories + BDD examples
  - User stories with technical (non-behavioral) requirements such as caching, infra, monitoring, etc
- PRD (Product Requirements Document)
- Ubiquitous language documentation. (A common language shared among stakeholders, developers, and anyone taking part in the project)
- Any additional project-specific requirements

The exact combination varies by project.

### From Specification to Development

Here's how a typical user story with BDD examples can look. This spec will then be used to serve as the objective foundation for the `AAID` workflow, aligning development with the needs of the business.

_Take note of how all these BDD examples only describe the behavior of the system. They say nothing of how to implement them technically._

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

`AAID` is not about this product discovery and specification refinement step; it assumes you have the specs ready. When you do, this guide will show you how to transform the specs → tests and code ready for production.

<a id="workflow-diagram"></a>

## AAID Workflow Diagram

Now that you have your specs from the product specification phase (like the user story above), we are ready to start building!

This diagram presents the formal workflow; detailed explanations for each step follow in the **AAID Development Stages** section below.

![AAID Workflow Diagram](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jrylzijk0hoiazfp1seo.png)

| 🔗                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Click [this link](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/aaid-workflow-diagram.mermaid) to **view** the full diagram. |

<a id="development-stages"></a>

## AAID Development Stages

<a id="stage-1-context"></a>

### 📚 Stage 1: Context Providing

![Stage 1 - Context Providing](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/d6isrck8ucsne1qmf1y3.jpg)

Before any AI interaction, establish comprehensive context. The AI needs to understand the project landscape to generate relevant code.

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Note on commands**: Throughout this guide, you'll see references like @project-context. These are Cursor notepad commands: pre-written **reusable** **prompts** with optional file references that you can quickly invoke with the @ key. They help you be clear and direct without typing lengthy instructions each time.<br><br>**You use these commands to augment your implementation speed.**<br><br>Find their implementations in [Appendix B](#appendix-b). |

**Steps:**

1. **Add High-Level Context** (using `@project-context` notepad command)

   - Project README, architecture docs, package.json, etc
   - Overall system design and patterns
   - `AAID` Testing strategy documentation
   - Technical patterns and adapter implementations (if applicable)

   | 🤖                                                                                                                                                     |
   | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
   | This will make the AI read through and summarize the basic project context, and how to do things. This is similar to onboarding a new human colleague. |

2. **Add Specification Context**

   - Relevant user stories with BDD scenarios
   - PRD sections relevant to current feature
   - Any wireframes or design specifications

   | 🤖                                                                                           |
   | -------------------------------------------------------------------------------------------- |
   | The AI is now fundamentally aligned with your goal to create business value for your client. |

3. **Add Relevant Code Context**

   - Direct dependencies of the feature you want to build; code, tests, documentation, utility functions, etc
   - Similar existing features as reference
   - Test examples from other parts of the codebase

   | 🤖                                                                                                                                                                                                                                                                                                                                                                                     |
   | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Together with automated checks like linting & formatting, and your AI IDE/CLI's configuration, this step will ensure the AI stays consistent with the style of your codebase.<br><br>Together with your architecture and testing strategy documentation that should've been added in step 1, this step will ensure the AI knows how to depend on or, while testing, mock related code. |

<a id="stage-2-planning"></a>

### 🎯 Stage 2: Planning (High-Level Approach)

![Stage 2 - Planning](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p6e7p5fqz66bxejm3cv4.jpg)

With the AI agent now informed of the feature you want to build's context, collaborate to understand the feature at a **high level** before diving into TDD. This is _not_ about prescribing implementation details, those will emerge through TDD. Instead, it's about making sure you and the AI are on the same page before testing and coding starts.

#### Planning vs TDD Discovery

The planning stage provides a roadmap of _what_ to build and _which tests_ to write. TDD will still discover _how_ to build it through the red/green/refactor cycle. This isn't traditional upfront design—you're aligning on scope and test sequence, not implementation.

**What Planning IS:**

- Understanding which parts of the system are involved
- Creating a test roadmap (what to test, in what order)
- Recognizing existing patterns to follow
- Mapping out the feature's boundaries and key interfaces
- Identifying external dependencies to mock

**What Planning IS NOT:**

- Designing specific classes or methods
- Defining data structures
- Prescribing implementation details
- Making architectural decisions tests haven't forced yet

Think of it like navigation: Planning sets the destination, TDD finds the path.

| ☝️                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| If you and the AI have different ideas of what is supposed to be built, many times using AI can actually slow progress down rather than speed it up. The AI planning stage eliminates this issue. |

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

3. **Request Feature Roadmap** (using `@ai-roadmap-template`)

   - Generate a high-level roadmap before any coding
   - Focus on test scenarios and their logical sequence
   - Keep at "mermaid diagram" level of abstraction
   - An actual mermaid diagram can be generated if applicable
   - Save roadmap in repo, e.g. in an `ai-roadmaps` directory

4. **Review and Refine**
   - Carefully review the roadmap to ensure alignment with business needs
   - Check that it addresses all the business specifications
   - Ensure it respects existing project patterns and boundaries
   - Verify the test sequence builds incrementally from simple to complex
   - Iterate with the AI if adjustments are needed

> ☝️ **Note on task lists**: Many other AI workflows (such as [Task Master](https://github.com/eyaltoledano/claude-task-master)) generate "task lists" with checkboxes in the planning stage. The idea is the AI will then arbitrarily check off items as "done" as it goes. But how can you **trust** the AI's judgment for when something is actually done?
>
> ![Task Master - Tasks](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zpebpttmob0s0exbxvju.png)
>
> In addition, with such checkboxes, you must manually re-verify everything after future code changes, to prevent **regressions**.
>
> That's why you don't use checkbox-planning in `AAID`. Instead you express completion criteria as good old **automated tests**. Tests aren't added as an afterthought, they're treated as first-class citizens.
>
> Automated tests = **objective** and **re-runnable** verification, eliminating both aforementioned problems of **trust** and **regression**.

If the roadmap looks good, now is when disciplined development actually starts!

| ☝️                                                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Technical implementation details are planned separately, with another Roadmap template. See [Appendix D: Handling Technical Implementation Details](#appendix-d). |

<a id="stage-3-tdd-starts"></a>

### ✅ Stage 3: TDD Development Starts

![Stage 3 - TDD Development Starts](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rsmfkcb5kmfmgrl4g7qe.jpg)

Choose one of these two approaches for implementing your tests when starting work on a new feature:

**Option 1: Test List Approach**
Collaborate with the AI to create the main test cases (unimplemented) upfront as a roadmap. It is okay to add more tests later as you think of them.

Use the Roadmap from "**Stage 2: Planning**" directly or as inspiration for the test list.

```jsx
describe("User archives completed todos", () => {
  it.skip("should archive a completed todo");
  it.skip("should not archive an incomplete todo");
  it.skip("should restore an archived todo");
});
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
  });
});
```

<a id="stage-4-tdd-cycle"></a>

### 🔄 Stage 4: The TDD Cycle

![Stage 4 - TDD Cycle](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fh7jmwwb59z02lqqxt3u.jpg)

| 🤖                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **TDD Commands Enforce the Three Laws**: The reusable TDD commands (`@red-&-stop`, `@green-&-stop`, `@refactor-&-stop`) enforce Robert C. Martin's Three Laws of TDD by putting the AI into a disciplined _mode_.<br><br>• **RED mode**: Write a minimal failing test.<br>• **GREEN mode**: Write the simplest code to pass.<br>• **REFACTOR mode**: Improve code while keeping tests green.<br><br>The AAID [rules file](#appendix-c) often handles phase discipline automatically, but these commands provide explicit control when needed. Re-issue them with your own feedback to guide the AI within each phase. |

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
>   - Use `@analyze-&-stop` or other [investigation & problem solving commands](#appendix-b-investigation-commands) as needed
> - **`AWAIT USER REVIEW`**

Let's walk through a full TDD cycle using this consistent structure.

> ¹ 🦾 **Proficiency Note**: As you master `AAID`, the initial "collaborate" step often becomes autonomous AI generation using your established commands and context. This speeds up the workflow considerably. You might simply invoke `@red-&-stop` and let the AI generate appropriate code, then focus your attention on the `AWAIT USER REVIEW` checkpoints. This dual-review structure (light collaboration + formal review) is what enables both speed and control.

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

**→ Collaborate with AI to write test** (`@red-&-stop`)

- Un-skip the first test if using test list
- Or write the first test from scratch if using single test approach

**→ Run test and verify failure**

- Should fail as expected (compilation failures count as valid test failures)

**→ Handle potential issues** _(if any arise)_

- If test passes unexpectedly: AI stops and reports the issue
- Choose investigation approach (often using [investigation & problem solving commands](#appendix-b-investigation-commands) like `@analyze-&-stop`)
- AI implements your chosen fix, then stops for review

**Example RED phase prompt:**

```
@red-&-stop

// link/paste the business specification, e.g the BDD scenario
```

_Because of the context that has been provided in the previous steps, the prompt often doesn't have to be longer than this._

**Generated test:**

```tsx
// todo.service.test.ts

describe("addTodo", () => {
  it("should add a todo with the correct text", () => {
    // When
    const result = addTodo("Buy groceries"); // Fails: 'addTodo' is not defined

    // Then
    expect(result.text).toBe("Buy groceries");
  });
});
```

| ⏸️ **STOP: AWAIT USER REVIEW**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI agent must `AWAIT USER REVIEW` before proceeding to GREEN.<br><br>**During RED phase review, evaluate:**<br>🔴 Tests behavior (what the system does), not implementation (how it does it)<br>🔴 In the test phase you design the API of what you are building; its user interface. So—does it feel nice to use?<br>🔴 Is the test hard to understand or set up? That could be a sign you need to rethink your approach. Clean code always starts with a clean test<br>🔴 Clear test name describing the requirement<br>🔴 Proper Given/When/Then structure<br>🔴 Mock external dependencies to isolate the unit; test should run in milliseconds |

**Optional: example RED Phase follow-up prompt:**

```
@red-&-stop

- Create todo service class instead of function
- Inject repository
- Start with "completed" attribute only
```

_Often follow-ups like these are not needed because of Stage 1.3: Add Relevant Code Context, and 2.3 Request Feature Roadmap_

**Test after RED review:**

```tsx
// todo.service.test.ts
// Both imports will fail - files don't exist yet (compilation failure = valid test failure)

import { TodoService } from "./todo.service";
import type { Todo } from "./interfaces/todo.interface";

describe("TodoService", () => {
  it("should add a todo with completed set to false", () => {
    // Given
    const mockRepository = {}; // Start minimal - no API assumptions yet
    const service = new TodoService(mockRepository);

    // When
    const result = service.addTodo("Buy groceries");

    // Then
    expect(result.completed).toBe(false);

    // Note: You're testing ONE behavior. The repository.save()
    // will be forced by a future test, not this one.
  });
});
```

---

### 🟢 GREEN Phase

**→ Collaborate with AI to write code** (`@green-&-stop`)

- Write only enough to make the test pass
- No extra logic for untested scenarios

| ☝️                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Why simplest first?** One test can only verify one thing, so complex code means untested parts. If your over-engineered solution breaks, you're debugging the test failure AND untested logic simultaneously. Simple code gets you stable fast and forces each new feature to get its own test, keeping everything verified. |

**→ Run tests to verify success**

- Current test should pass
- All other existing tests still pass

**→ Handle potential issues** _(if any arise)_

- If tests fail: AI stops and reports which ones failed
- Choose debugging approach (often using [investigation & problem solving commands](#appendix-b-investigation-commands) like `@debug-&-stop`)
- AI implements your chosen solution, then stops for review

**Example GREEN phase prompt:**

```
@green-&-stop
```

**Generated code:**

```tsx
// interfaces/todo.interface.ts

export interface Todo {
  text: string;
  completed: boolean;
}
```

```tsx
// todo.service.ts

import type { Todo } from "./interfaces/todo.interface";

export class TodoService {
  constructor(private repository: unknown) {} // 'unknown' is fine - no test demands otherwise

  addTodo(text: string): Todo {
    // Simplest code to pass the test
    return { text: "", completed: false };
  }
}
```

| ⏸️ **STOP: AWAIT USER REVIEW**                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| AI agent must `AWAIT USER REVIEW` before proceeding to REFACTOR.<br><br>**During GREEN phase review, evaluate:**<br>🟢 The code is the simplest possible solution to make the test pass<br>🟢 No unnecessary abstractions or future-proofing<br>🟢 Code structure follows project patterns |

### 🧼 REFACTOR Phase

| ❕  | This phase is the main reason developers won't be replaced any time soon |
| --- | ------------------------------------------------------------------------ |

**→ Collaborate with AI to refactor** (`@refactor-&-stop`)

- Collaborate to enhance code while keeping tests green
- Apply patterns that improve current code quality

**→ Run tests to verify stability**

- No regressions introduced

**→ Handle potential issues** _(if any arise)_

- If refactoring breaks tests: AI stops and reports what failed
- Review failure and choose: fix the issue or revert to green state
- Use [investigation & problem solving commands](#appendix-b-investigation-commands) like `@minimal-fix-&-analyze-&-stop` for fixes
- Revert when the refactoring approach itself is flawed

**Example REFACTOR phase prompt:**

```
@refactor-&-stop

// Note: The AI may suggest minimal refactoring since you only have one test.
// But you can guide it toward patterns that improve current code quality.

- Extract Todo model class
- Put interface there
- Model should be immutable
```

**Generated refactored code:**

```tsx
// models/todo.model.ts

export interface Todo {
  text: string;
  completed: boolean;
}

export class TodoModel implements Todo {
  constructor(
    public readonly text: string = "",
    public readonly completed: boolean = false
  ) {}

  static create(): Todo {
    // For now just handles completed status
    // Future tests will force us to handle text properly
    return new TodoModel("", false);
  }
}
```

```tsx
// services/todo.service.ts

import { type Todo, TodoModel } from "../models/todo.model";

export class TodoService {
  constructor(private readonly repository: unknown) {}

  addTodo(text: string): Todo {
    // Still ignoring text parameter - test doesn't check it yet
    // Repository still unused - no test requires persistence yet
    return TodoModel.create();
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

_Often these prompts aren't needed due to the reusable Commands, AI workflow instructions, and context provided earlier._

**Code after REFACTOR review:**

```tsx
// services/todo.service.ts

export class TodoService {
  constructor(private readonly repository: unknown) {}

  addTodo(text: string): Todo {
    return TodoModel.create();
  }
}
```

**_Congratulations_,** you made it through all the `AAID` steps! While the workflow might seem overwhelming at first, with practice it becomes habit, and the speed increases accordingly.

---

<a id="continuing-tdd-cycle"></a>

## Continuing the Stage 4: TDD Cycle

After completing the first cycle, you'd repeat the process with the next test that forces the code to evolve:

**Second cycle** might test: `'should create todo with provided text'`

- Forces: `return { text, completed: false }`

**Third cycle** might test: `'should persist new todos'`

- A repository interface to define the persistence contract, replacing the `unknown` type.
- Forces: Repository to have a `save` method
- Forces: `this.repository.save({ text, completed: false })`

**Fourth cycle** might test: `'should return persisted todo with ID'`

- Forces: Return value from repository.save with ID included

Each cycle follows the same disciplined flow:

🔴 **RED** →
⏸️ **Review** →
🟢 **GREEN** →
⏸️ **Review** →
🧼 **REFACTOR** →
⏸️ **Final review**

The tests gradually shape the implementation, ensuring every line of production code exists only because a test demanded it.

You use these tests to prove the exact code the AI must write. Vibe-coding features without a failing test to guide it creates buggy code you can't control.

---

<a id="conclusion"></a>

## Conclusion: The Augmented Advantage

Your bottleneck changes with `AAID`. Instead of being stuck on implementation details, you're now constrained only by your ability to architect and review.

The work becomes more strategic. You make the high-level decisions while AI handles the code generation. TDD keeps this relationship stable by forcing you to define exactly what you want before the AI builds it.

This completely avoids the dangers of vibe coding. `AAID` helps you as a professional ship quality software with full understanding of what you've built.

And as the `AAID` loop becomes muscle memory, you will catch regressions early and ship faster.

That's the augmented advantage.

---

<a id="appendices"></a>

> ### End of Guide
>
> You’ve reached the end of the `AAID` guide. The appendices below are optional reference material you can dip into as needed.

---

<a id="appendix-a"></a>

## Appendix A: Unit Testing and Acceptance Testing

This article on `AAID` focuses on TDD (Test-Driven Development) for **Unit Testing**, which ensures you actually write your code correctly and with high quality.

**Acceptance Testing**, on the other hand, verifies that your software aligns with business goals and is actually _done_. It serves as an executable definition-of-done.

> AI can help when writing Acceptance Tests, but you do not necessarily use `AAID` for this purpose.

Understanding how these two testing strategies complement each other is crucial for professional developers, as both are invaluable parts of writing production-grade software.

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Acceptance Testing is similar to E2E testing; both test through the system boundaries.<br><br>The key difference: AT mocks external dependencies you don't control (third-party APIs, etc) while keeping internal dependencies you do control (your database, etc) real. E2E usually mocks nothing and runs everything together.<br><br>Problem with E2E: Tests fail due to external factors (third-party outages, network issues) rather than your code. Acceptance Testing isolates your system so failures indicate real business logic problems. |

The two kinds of tests answer different questions:

- **TDD (Unit Tests)**: "_Is my code technically correct?_"
- **ATDD (Acceptance Tests)**: "_Is my system releasable after this change?_"

### Key Differences

**Unit Tests (TDD/`AAID`)**

- Answer: "_Is my code technically correct?_"
- Fine-grained, developer-focused testing
- Mock all external dependencies
- Test suite should run in seconds to tens-of-seconds
- Apply design pressure through testability
- Can but doesn’t necessarily map 1:1 to user stories/acceptance criteria
- Guide code quality and modularity
- Part of the fast feedback loop in CI/CD

Example of what a unit test looks like:

```tsx
describe("TodoService", () => {
  it("should archive a completed todo", async () => {
    // Given
    const completedTodo = { id: "todo-1", title: "Buy milk", completed: true };
    mockTodoRepository.findById.mockResolvedValue(completedTodo);

    // When
    const result = await service.archiveTodo("todo-1");

    // Then
    expect(result.isOk()).toBe(true);
    expect(mockTodoRepository.moveToArchive).toHaveBeenCalledWith(
      completedTodo
    );
    expect(mockTodoRepository.removeFromActive).toHaveBeenCalledWith("todo-1");
  });
});
```

**Acceptance Tests (ATDD/BDD)**

- Answer: "_Does the system meet business requirements?_"
- Business specification validation through user-visible features
- Test in production-like environment through system boundaries
- Mock unmanaged external dependencies (like third-party APIs)
  - Don't mock managed external dependencies (like app's database)
- Test suite will run in minutes (slower than unit tests)
- Maps 1:1 to user stories/acceptance criteria
- Verify the system is ready for release
- Stakeholder-focused (though developers implement)

Example of what an acceptance test looks like (using the [Four-Layer](https://dojoconsortium.org/assets/ATDD%20-%20How%20to%20Guide.pdf) model pioneered by Dave Farley):

| Layer                             | Description                             |
| --------------------------------- | --------------------------------------- |
| 1. Executable Specification       | The test                                |
| 2. Domain-Specific Language (DSL) | Business vocabulary                     |
| 3. Driver                         | Bridge between DSL and SUT              |
| 4. System Under Test (SUT)        | Production-like application environment |

```tsx
describe("User archives completed todos", () => {
  it("should archive a completed todo", async () => {
    // Given
    await dsl.user.startsWithNewAccount();
    await dsl.user.hasCompletedTodo("Buy milk");

    // When
    await dsl.todo.archive("Buy milk");

    // Then
    dsl.todo.confirmInArchive("Buy milk");
    dsl.todo.confirmNotInActive("Buy milk");
  });
});
```

_Acceptance tests know nothing about how our app works internally. Even if the app changes its technical implementation details, this specification (test) will remain valid._

In acceptance tests, every DSL call follows the same flow: **Test → DSL → Driver → SUT**.

The DSL provides business vocabulary (like `user` or `archive todo`), while the driver **connects to your SUT from the outside (through APIs, UI, or other entry points)**. This separation keeps tests readable and maintainable.

Notice how unit tests directly test the class with mocks, while acceptance tests use this DSL layer to express tests in business terms.

| 🔌                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Note on Integration Testing**: While this guide focuses on unit testing through TDD, `AAID` also applies to integration testing. It uses real managed resources (databases, file systems) but mocks external unmanaged dependencies (third-party APIs). The same disciplined cycle applies: AI generates, human architects and reviews, tests verify. |

In `AAID`, AI helps you rapidly write unit tests and implementations. Knowing the difference between unit and acceptance testing prevents you from mistaking 'technically correct code' for 'done features,' a crucial distinction in professional development.

---

<a id="appendix-b"></a>

## Appendix B: Helpful Commands (Reusable Prompts)

Here are examples of some helpful reusable prompt commands—e.g. Cursor notepads or whatever your AI IDE or CLI offers—to help you speed up your prompting. Use or change them as you wish.

<a id="appendix-b-setup-commands"></a>

### **Setup & Planning Commands**

### `@project-context`

_Used in Stage 1: Context Providing_

```
# Project Context

## General
@README.md @package.json @tsconfig.json @db.schema

## Architecture
@docs/architecture.md

## Testing Strategy
@docs/testing.md

## Code Style
@docs/code-style.md

// Adjust for your project

Summarize what you learned and confirm when ready.
```

### `@ai-roadmap-template`

_Used in Stage 2: Planning_

| ☝️                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Some tools have dedicated mechanics for planning. Claude Code for example has [Plan Mode](https://claudelog.com/mechanics/plan-mode/). Use it if beneficial. |

```markdown
# AI Roadmap Template

Create a high-level feature roadmap that aligns developer and AI understanding before TDD begins. This roadmap guides test sequence without prescribing implementation details: those should be designed by the TDD process itself.

When done, ask user if the roadmap file should be saved to /ai-roadmaps directory in root. Create directory if not exists.

**First, if anything is unclear about the requirements or scope, ask for clarification rather than making assumptions.**

## Roadmap Requirements

**Include:**

- Test progression from simple to complex
- System boundaries and interaction points
- External dependencies to mock
- Existing patterns to follow from the codebase

**Exclude:**

- Specific class/method names
- Data structures or schemas
- Any implementation decisions tests haven't forced yet

## Format

\`\`\`markdown

# Feature Roadmap: [Feature Name]

## Overview

[2-3 sentences describing the business value and scope]

## System View

[Create a diagram ONLY if the feature involves multiple components/services interacting,
complex flows, or state transitions that benefit from visualization.
Otherwise, write "No diagram needed - [brief reason]"]

<!-- If diagram is beneficial, choose appropriate type:
- Mermaid diagram for component interactions
- State diagram for workflows
- Sequence diagram for complex flows
- Or describe the system view in text -->

## Spec references

- Reference the authoritative specifications for this feature (e.g., user story + BDD scenarios, PRD sections, RFCs/design docs, Jira tickets, Story Maps, Ubiquitous Language docs). Keep concise.
- Include stable identifiers or links/paths (doc path, epic/story IDs, section headings).

## Test Scenario Sequence

<!-- Focus on behavior (what), not implementation (how) -->
<!-- Unit-level plan for technical correctness/edge cases; multiple tests may derive from one BDD scenario. -->

1. [Simplest scenario - usually happy path]
2. [Next complexity - validation/business rules]
3. [Edge cases and error handling]
4. [Integration points if needed]
<!-- Continue as needed -->

## Boundaries & Dependencies

- **External Systems**: [What to mock in unit tests]
- **Internal Patterns**: [Existing patterns to follow]
- **Integration Points**: [Where integration tests may be needed]

## Non-Functional Requirements

<!-- Include ONLY if explicitly required by specifications -->

- **Performance**: [Specific latency/throughput needs]
- **Security**: [Auth/encryption requirements]
- **Observability**: [Logging/metrics needs]

## Notes

[Important constraints, clarifications, or open questions]
\`\`\`

## Example (Backend Service)

\`\`\`markdown

# Feature Roadmap: Archive Completed Todos

## Overview

Users can archive completed todos to declutter their active list. Archived items remain accessible and restorable.

## System View

\`\`\`mermaid
graph LR
API[API Layer] --> Service[Todo Service]
Service --> Repo[Repository]
Service --> Events[Event Bus]
Repo --> DB[(Database)]
\`\`\`

## Spec references

- User Story + BDD scenarios: specs/todos.feature
  - Scenario: Archive completed
  - Scenario: Prevent archiving incomplete
  - Scenario: Restore
- PRD: docs/product/todos.md#archiving
- Jira: TODO-456

## Test Scenario Sequence

1. Archive a completed todo moves it from active to archived
2. Archive is idempotent when the todo is already archived
3. Prevent archiving an incomplete todo returns a domain error and leaves state unchanged
4. Restore an archived todo moves it back to active
5. Restore is idempotent when the todo is already active

## Boundaries & Dependencies

- **External Systems**: Database, Event Bus (mock in unit tests)
- **Internal Patterns**: Service/Repository pattern from existing code
- **Integration Points**: Repository tests will need database connection

## Notes

- Archive operation should be idempotent
  \`\`\`

## Alternative Examples

- **Frontend**: Focus on user interactions and state changes
- **DevOps/Infra**: Focus on deployment stages and rollback scenarios
- **Data Pipeline**: Focus on transformation stages and validation points

## When to Update This Plan

Regenerate if requirements change, test order needs adjustment, or system boundaries shift. Don't add implementation details discovered through TDD.
```

<a id="appendix-b-tdd-commands"></a>

### TDD Development Commands

_Used in Stage 4: The TDD Cycle_

These `AAID` commands embed the Three Laws of TDD:

1. **No behavioral production code without a failing test**
2. **Write only enough test code to fail**
3. **Write only enough production code to pass**

Each command enforces these laws at the appropriate phase. The commands serve as simple triggers that reference the detailed instructions in the [AAID rules file](#appendix-c), which is the single source of truth for the workflow.

**In practice:** Since the rules file is automatically loaded by your IDE/CLI, you often won't need these commands; the AI will follow the workflow from the rules alone. The commands remain useful as explicit phase triggers when needed.

| ☝️                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------- |
| These commands assume greenfield TDD. For legacy code, create variants tailored to characterization tests and seams. |

### **`@red-&-stop`**

```
Enter RED phase as defined in the AAID rules file:

<!-- Rules file should have been automatically injected by IDE/CLI -->

- Enforce RED phase rules and execute phase instructions
- STOP and AWAIT USER REVIEW
- If rules file missing, STOP and request it
```

### **`@green-&-stop`**

```
Enter GREEN phase as defined in the AAID rules file:

<!-- Rules file should have been automatically injected by IDE/CLI -->

- Enforce GREEN phase rules and execute phase instructions
- STOP and AWAIT USER REVIEW
- If rules file missing, STOP and request it
```

### **`@refactor-&-stop`**

```
Enter REFACTOR phase as defined in the AAID rules file:

<!-- Rules file should have been automatically injected by IDE/CLI -->

- Enforce REFACTOR phase rules and execute phase instructions
- STOP and AWAIT USER REVIEW
- If rules file missing, STOP and request it
```

<a id="appendix-b-investigation-commands"></a>

### Investigation & Problem Solving Commands

_Used in Stage 4: The TDD Cycle, during the "Handle potential issues" step of each TDD phase._

### `@analyze-&-stop`

```
Analyze the issue, scan relevant files, optionally consult docs, summarize next steps. Stop.

I repeat: DO NOT CHANGE ANY CODE AFTER THE COMMAND:

1. Analyze issue or task at hand
2. Research any relevant files for context
   a. Optional: use the web tool for documentation
3. Analyze how to solve it or how to move forward
4. Report back with your findings
5. STOP. DON'T CHANGE, ADD, OR DELETE ANYTHING.
```

### `@analyze-command-&-stop`

| ☝️                                                                                                   |
| ---------------------------------------------------------------------------------------------------- |
| The user discusses or simply types out the command, for example: "`@analyze-command-&-stop` test:db" |

```
Run the command, but if it fails, analyze, report back then STOP.

I repeat: DO NOT CHANGE ANY CODE AFTER THE COMMAND:

1. Run command
2. Analyze the result
3. Report back with your findings
4. STOP. DON'T CHANGE, ADD, OR DELETE ANYTHING.
```

### `@debug-&-stop`

```
Debug and research any relevant files for context, report back then STOP.

I repeat: DO NOT CHANGE ANY CODE AFTER THE COMMAND:

1. Add debug logs
2. Research any relevant files for context
   a. Optional: use the web tool for documentation
3. Run the command necessary to analyze the logs
4. Report back with your findings
5. STOP. DON'T CHANGE, ADD, OR DELETE ANYTHING.
```

### `@minimal-fix-&-analyze-&-stop`

```
Implement the simplest and cleanest fix, analyze and research any relevant files for context, then verify if the fix was successful or not, report back then STOP.

I repeat: DO NOT CHANGE ANY CODE AFTER THE COMMAND:

1. Research any relevant files for context
2. Implement the cleanest and simplest fix
3. Verify success or failure of the fix by running tests and/or code
4. Analyze result
5. Report back with your findings
6. STOP. DON'T CHANGE, ADD, OR DELETE ANYTHING.
```

<a id="appendix-b-misc-commands"></a>

### Misc Commands

### `@git-commit`

```
@docs/git-commit-message-guidelines.md

1. Do "git add ." to add all changes
2. Follow our git commit message guidelines and construct a good and clean commit message
3. Commit with that message
4. Do not push. The user will do that manually
```

These are just some examples of AI Commands. Feel free to change them, create new ones, or not use them at all. But do use reusable prompts, as it can greatly speed up your work.

### `@gherkin-guard`

```
# Gherkin Guard Command

Enforce consistent Gherkin-style Given/When/Then comments in test(s) you're currently working with. Use this command when writing new tests or reviewing specific existing tests.

## Goal

Enforce our Gherkin-style Given/When/Then comments in tests without changing behavior.

## Supported Structures

Choose one per test:
- **A) Standard:** `// Given` → `// When` → `// Then`
- **B) Minimal:** `// When` → `// Then` (only when no setup is needed)

## Notes (Spec vs. Team Style)

- Gherkin allows multiple Then steps; our team style restricts to one `// Then`. Use `// And` or `// But` for additional expectations.

## Team Rules — Structure

- Exactly one `// Then`. Extra expectations go under the same `// Then` as `// And` (or `// But`). No second `// Then`.
- If additional expectations aren't tightly related to the same behavior, prefer a **separate test case**.
- `// When` is one triggering event. If more seem needed, move prep to `// Given` or split; use `// And` after `// When` only if inseparable.
- No assertions in `// Given` or `// When`.
- No loops/conditionals inside tests.
- Do **not** include an empty `// Given`. If there's no setup, use structure B.

## Team Rules — Formatting

- Comments must be exactly: `// Given`, `// When`, `// Then`, `// And`, `// But` (capitalized; one space after `//`; no extra text).
- The code for a section starts on the next line (no blank line between the comment and its code).
- No empty section comments.
- Exactly 1 blank line between sections.

## Action

- **Scope:** Apply only to the test(s) being discussed or referenced in the current context
- **New tests:** Generate following these rules
- **Existing tests:** Rewrite to comply, preserving intent and outcome
- **Output:** Final test code only (no explanations unless requested)

## Self-Check (Internal Use)

Verify all are true before outputting:

- [ ] Uses A (`Given`/`When`/`Then`) or B (`When`/`Then`)
- [ ] `When` is one triggering event (`And` only if inseparable)
- [ ] Extra expectations use `And`/`But` (no extra `Then`)
- [ ] If expectations aren't tightly related, split into another test
- [ ] No assertions in `Given`/`When`; no loops/conditionals
- [ ] Comment casing/spacing exact; no extra text
- [ ] No empty sections; no blank line between comment and its code
- [ ] Exactly 1 blank line between sections

## Examples (Valid Per Our Team Style)

### 1: Standard

\`\`\`ts
it('adds a new item to the list', () => {
  // Given
  const list = createList()

  // When
  list.add('Milk')

  // Then
  expect(list.items).toContain('Milk')
})
\`\`\`

### 2: Minimal (No Setup)

\`\`\`ts
it('returns empty results for an unknown query', () => {
  // When
  const results = search('unknown')

  // Then
  expect(results).toHaveLength(0)
})
\`\`\`

### 3: Multiple Expectations via And/But

\`\`\`ts
it('authenticates a user but locks on too many attempts', () => {
  // Given
  const auth = createAuth()
  auth.failLogin('alice'); auth.failLogin('alice')

  // When
  auth.failLogin('alice')

  // Then
  expect(auth.isAuthenticated()).toBe(false)

  // And
  expect(auth.attempts('alice')).toBe(3)

  // But
  expect(auth.isLocked('alice')).toBe(true)
})
\`\`\`
```

---

<a id="appendix-c"></a>

## Appendix C: AAID AI Workflow Rules

Configure your AI environment to understand the AAID workflow. These are simple text instructions - no special AAID app or tool is required. The workflow rules get loaded by your AI tool (via `.cursor/rules`, `CLAUDE.md`, or similar instruction files), focusing on workflow state management rather than project specifics.

### Why Minimal AI Workflow Instructions?

These AI workflow rules/instructions get loaded for **every prompt**, so keep them minimal:

- **What belongs here:** The `AAID` workflow rules, and other general custom instructions for the AI such as tonality
- **What doesn’t:** Project-specific code (load those once in Stage 1: Context Providing instead for every new agent session)

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Note on AI instruction following accuracy**: At the time of writing, current AIs are good, but not perfect, at following instructions and rules such as the **AAID AI Workflow Rules**. Sometimes you may need to remind the AI if it for example forgets a TDD phase, or moves to Green without stopping for user review at Red.<br><br>As LLMs improve over time, you'll need to worry less about this. |

### AAID AI Workflow Rules/Instructions

_This is the official AAID workflow rules. But feel free to customise it._

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
   - Discuss feature approach and create roadmap with test scenarios
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
   - Follow test sequence from roadmap/specs if provided
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

1. Write ABSOLUTE MINIMUM code to pass current test
   - Hardcode values if test doesn't require more
   - NO untested edge cases, validation, or future features
   - If test expects "Hello", return "Hello" (not a variable)
   - If test expects specific calculation, do only that calculation
   - Premature generalization is over-engineering
2. When multiple tests exist, "minimum" means code that passes ALL tests
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

Available here: [link](https://github.com/dawid-dahl-umain/augmented-ai-development/blob/main/appendices/appendix-d-handling-technical-implementation-details.md).

---

<a id="about-author"></a>
Dawid Dahl is a full-stack developer and AI skill lead at [UMAIN](https://www.umain.com/) | [EIDRA](https://www.eidra.com/). In his free time, he enjoys metaphysical ontology and epistemology, analog synthesizers, consciousness, techno, Huayan and Madhyamika Prasangika philosophy, and being with friends and family.

Photography credits: [kaixapham](https://unsplash.com/@kaixapham)
