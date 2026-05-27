# Mutation Operators Reference

## The Key Five (Priority Operators)

These 5 catch ~90% of faults that full operator sets detect. Use these first.

### 1. Arithmetic Operator Replacement (AOR)

| Original | Mutant(s) |
|----------|-----------|
| `a + b` | `a - b`, `a * b` |
| `a - b` | `a + b` |
| `a * b` | `a / b`, `a + b` |
| `a / b` | `a * b` |
| `a % b` | `a * b` |

### 2. Relational Operator Replacement (ROR)

| Original | Mutant(s) |
|----------|-----------|
| `a < b` | `a <= b`, `a >= b` |
| `a <= b` | `a < b`, `a > b` |
| `a > b` | `a >= b`, `a <= b` |
| `a >= b` | `a > b`, `a < b` |
| `a == b` | `a != b` |
| `a != b` | `a == b` |

### 3. Logical Connector Replacement (LCR)

| Original | Mutant(s) |
|----------|-----------|
| `a && b` | `a \|\| b` |
| `a \|\| b` | `a && b` |

### 4. Unary Operator Insertion/Removal (UOI)

| Original | Mutant(s) |
|----------|-----------|
| `-x` | `x` |
| `!cond` | `cond` |
| `x++` | `x--` |
| `x--` | `x++` |

### 5. Return Value Mutation

| Original | Mutant(s) |
|----------|-----------|
| `return x` (number) | `return 0`, `return x + 1` |
| `return x` (boolean) | `return !x` |
| `return x` (string) | `return ""` |
| `return x` (object/ref) | `return null`/`None`/`nil` |
| `return x` (array/list) | `return []` |

## Extended Operators

Use selectively when the Key Five don't cover enough.

### Assignment Operator Replacement

| Original | Mutant(s) |
|----------|-----------|
| `x += y` | `x -= y` |
| `x -= y` | `x += y` |
| `x *= y` | `x /= y` |

### Conditional/Block Mutations

| Original | Mutant(s) |
|----------|-----------|
| `if (cond) { A }` | `if (true) { A }`, `if (false) { A }` |
| `if (c) { A } else { B }` | `if (c) { B } else { A }` |

### Statement Deletion

Remove entire statements — especially void/side-effect calls:
- `cache.invalidate()` → (deleted)
- `this.value = x` → (deleted)
- `emit('event')` → (deleted)

### Null/Optional Mutations

| Original | Mutant(s) |
|----------|-----------|
| `x ?? y` | `x`, `y` |
| `x?.method()` | `x.method()` |

### Exception/Error Mutations

| Original | Mutant(s) |
|----------|-----------|
| `throw new Error(...)` | (remove throw) |
| `catch (e) { handle() }` | `catch (e) { }` |

## Language-Specific Operators

### JavaScript/TypeScript
- `===` → `==`, `!==` → `!=`
- Optional chaining `?.` → `.`
- `??` → `||`
- `.some()` → `.every()`, `.filter()` → remove filter

### Python
- `is` → `is not`
- `in` → `not in`
- `and` → `or`
- `raise` → `pass`

### Rust
- `Some(x)` → `None`
- `Ok(x)` → `Err(...)`
- `unwrap()` → `unwrap_or_default()`

### Java
- `equals()` → `==`
- `.findFirst()` → `.findAny()`

### Go
- `err != nil` → `err == nil`
- `defer` → (remove)

## Selection Guidelines

**Always mutate:** arithmetic in calculations, boundary conditions, boolean logic in branching, return values of public methods, error handling paths.

**Skip:** imports, type annotations, comments, logging, generated code, test files, display-only constants.
