<!-- c63078a6-468a-42d3-a9db-8bfa91d5b6c5 046afa21-86f9-4147-bc73-f33da6746336 -->
# Update Documentation for Four-Layer Architecture

## Overview

Update ONLY the documentation file `appendices/appendix-a/docs/aaid-acceptance-testing-workflow.md` to teach proper implementation of Dave Farley's Four-Layer Model. All changes are to instructional text and code examples within the markdown document.

**Important**: This plan modifies ONLY documentation. No actual TypeScript implementation files are created or changed - only the examples shown in the markdown file.

## Documentation Updates

### 1. Update Layer Responsibilities Text

**File**: `appendices/appendix-a/docs/aaid-acceptance-testing-workflow.md`

**Section**: Layer Responsibilities (lines 206-264)

Update the Layer 3 Protocol Drivers description to clarify:

- Assertions and failures belong in Protocol Drivers (not DSL)
- Use standard `Error` instead of framework-specific methods like `expect.fail()`
- Protocol Driver interface enables abstraction
- DSL depends only on interface, never concrete implementations

### 2. Add Protocol Interface Documentation

**Location**: Before Layer 3 implementation examples (around line 936)

Add new subsection explaining the protocol abstraction pattern:

**Content to add:**

- Explain interface-based design
- Show TypeScript interface example for `ProtocolDriver`
- Explain multiple implementations (UIDriver, APIDriver, CLIDriver)
- Note that DSL depends on interface only

Example code block to include:

```typescript
export interface ProtocolDriver {
  hasAccount(email: string): Promise<void>;
  hasCompletedTodo(name: string, description: string): Promise<void>;
  confirmInArchive(name: string): Promise<void>;
}

export class UIDriver implements ProtocolDriver { /* ... */ }
export class APIDriver implements ProtocolDriver { /* ... */ }
```

### 3. Update DSL Layer Examples

**Location**: Lines 734-932 (DSL Layer section)

Update the existing DSL code examples to show:

- Constructor accepting `ProtocolDriver` interface (not concrete `UIDriver`)
- Remove imports of concrete driver classes
- Emphasize DSL as pure translation layer

Update example code blocks like:

```typescript
export class UserDsl {
  constructor(
    private context: DslContext,
    private driver: ProtocolDriver  // ← Interface
  ) {}
}
```

### 4. Update Protocol Driver Examples

**Location**: Lines 936-1081 (Protocol Drivers section)

Update existing Protocol Driver examples to show:

- Class implementing `ProtocolDriver` interface
- Replace all `expect.fail()` with `throw new Error()`
- Add note about framework independence

Update code examples like:

```typescript
export class UIDriver implements ProtocolDriver {
  async confirmInArchive(name: string): Promise<void> {
    // ... technical interaction ...
    if (count === 0) {
      throw new Error(`Todo '${name}' not found in archive`);
    }
  }
}
```

### 5. Update Test File Structure Documentation

**Location**: Lines 586-731 (Layer 1: Executable Specifications)

Update the test file examples to show runtime protocol selection:

**Content:**

- Update the executable spec example to show protocol factory in `beforeEach`
- Emphasize test file remains unchanged regardless of protocol
- Show environment variable usage

Update the example around line 660-724:

```typescript
describe("User archives completed todos", () => {
  let dsl: Dsl

  beforeEach(() => {
    const driver = createProtocolDriver(process.env.TEST_PROTOCOL || 'ui');
    dsl = new Dsl(driver);
  })

  describe("Archive a completed todo", () => {
    it("should archive a completed todo", async () => {
      // Given
      await dsl.user.hasAccount({ email: "user@test.com" })
      // ... rest of test unchanged
    })
  })
})

// Protocol factory function
const createProtocolDriver = (protocol: string): ProtocolDriver => {
  switch (protocol) {
    case 'ui': return new UIDriver(global.page);
    case 'api': return new APIDriver(baseUrl);
    case 'cli': return new CLIDriver();
    default: throw new Error(`Unknown protocol: ${protocol}`);
  }
};
```

Add note explaining:

- Same test file works with any protocol
- Protocol selected via `TEST_PROTOCOL=api npm test`
- Test logic stays identical across protocols

### 6. Add Runtime Protocol Selection Documentation

**Location**: After Layer 2 DSL section (around line 932)

Add new subsection explaining protocol selection pattern:

**Content:**

- Explain interface-based abstraction enables protocol switching
- Show how factory function instantiates correct driver
- Demonstrate multiple protocol support in same test file
- Note framework independence

### 6. Update Project Structure Diagram

**Location**: Lines 564-584

Update the project structure example to include:

- `protocol-driver/interface.ts`
- Multiple driver implementations (ui.driver.ts, api.driver.ts, cli.driver.ts)

### 7. Update Critical Rules Text

**Location**: Lines 1142-1174

Update Protocol Driver rules to state:

- Throw standard `Error` (not framework-specific methods)
- Implement `ProtocolDriver` interface
- Emphasize framework independence

### 8. Update Anti-Patterns Examples

**Location**: Lines 1181-1274

Add/update examples showing:

- BAD: `expect.fail()` in driver
- GOOD: `throw new Error()` in driver
- BAD: DSL importing concrete `UIDriver`
- GOOD: DSL depending on `ProtocolDriver` interface

### 9. Add "Beyond MVP" Section

**Location**: After Validation Checklist (around line 1313)

Add new section titled "Beyond MVP: Advanced Topics"

Brief mentions of:

- Evidence capture (screenshots on failure)
- RUN_ID prefix for CI parallelism  
- Stable selector strategies
- Time control patterns

With note that these are advanced topics beyond the core architecture.

## File Modified

**ONLY ONE FILE**: `appendices/appendix-a/docs/aaid-acceptance-testing-workflow.md`

All changes are instructional content within this documentation file. No implementation files are created or modified.

## Success Criteria

- Documentation clearly teaches interface-based abstraction
- All example code shows `throw new Error()` (not `expect.fail()`)
- Runtime protocol selection pattern documented
- Multiple protocol implementations illustrated
- DSL examples show interface dependency
- Dave Farley's architecture (assertions in drivers) properly explained
- Document maintains clarity for AAID workflow teaching

### To-dos

- [ ] Update Layer 3 responsibilities section to clarify assertions in drivers, framework-agnostic approach
- [ ] Add Protocol Driver interface pattern section with TypeScript interface definition and multiple implementations
- [ ] Update DSL layer examples to depend on ProtocolDriver interface instead of concrete implementations
- [ ] Update Protocol Driver examples to implement interface and throw Error instead of expect.fail()
- [ ] Add runtime protocol selection section with factory pattern and environment variable usage
- [ ] Update project structure diagram to show protocol interface and multiple driver implementations
- [ ] Update critical rules section to reflect framework-agnostic assertions and interface dependencies
- [ ] Update anti-patterns section with examples of proper vs improper abstraction and assertion usage
- [ ] Add Beyond MVP section for advanced topics like evidence capture, RUN_ID, stable selectors