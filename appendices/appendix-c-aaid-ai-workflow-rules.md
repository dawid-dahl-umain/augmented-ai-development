# Appendix C: AAID AI Workflow Rules

![Appendix C](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/34gja5j2umhsllvz3i7a.png)

Configure your AI environment to understand the AAID workflow. These are simple text instructions - no special AAID app or tool is required. The workflow rules get loaded by your AI tool (via `.cursor/rules`, `CLAUDE.md`, or similar instruction files), focusing on workflow state management rather than project specifics.

## Why Minimal AI Workflow Instructions?

These AI workflow rules/instructions get loaded for **every prompt**, so keep them minimal:

- **What belongs here:** The `AAID` workflow rules, and other general custom instructions for the AI such as tonality
- **What doesn't:** Project-specific code (load those once in Stage 1: Context Providing instead for every new agent session)

| ☝️                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Note on AI instruction following accuracy**: At the time of writing, current AIs are good, but not perfect, at following instructions and rules such as the **AAID AI Workflow Rules**. Sometimes you may need to remind the AI if it for example forgets a TDD phase, or moves to Green without stopping for user review at Red.<br><br>As LLMs improve over time, you'll need to worry less about this. |

## AAID AI Workflow Rules/Instructions

_This is the official AAID workflow rules. But feel free to customise it._

[AAID AI Workflow Rules/Instructions](../rules/aaid/aaid-development-rules.mdc)

## Usage Guide

**For Cursor:**

- Project‑specific: commit a rule file in `.cursor/rules/` so it's version controlled and scoped to the repo.
- Global: Add to User Rules in Cursor Settings
- Simple alternative: Place in `AGENTS.md` in project root

**For Claude Code:**
Place in `CLAUDE.md` file in your project root (or `~/.claude/CLAUDE.md` for global use)

**For other AI tools:**
Look for "custom instructions", "custom rules", or "system prompt" settings

---

⬅️ Back to the main guide: [AAID Workflow and Guide](../docs/aidd-workflow.md)
