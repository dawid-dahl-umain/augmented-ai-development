# mutation-testing

AI-driven mutation testing. Claude acts as the mutation engine itself, so no external
mutation testing library is required.

A passing test suite tells you the tests ran, not that they would notice if the code broke.
Mutation testing answers the second question: change the source in a small, deliberate way
and see whether any test complains. A mutant that survives marks a test that was never
really checking anything.

## How it works

The skill walks a structured loop:

1. **Scope & Environment**: detect language and test runner, verify a green baseline.
2. **Analyze & Plan**: identify mutation candidates, agree with you on how many to run.
3. **Execute**: apply one mutation at a time, run tests, record kill/survive, restore
   immediately.
4. **Report**: mutation score and a table of surviving mutants with analysis.
5. **Triage**: categorize survivors as meaningful, equivalent, or low-value.
6. **Fix Tests**: only on your approval, with verification that each fix kills its mutant.

Not every survivor is a problem. An equivalent mutant changes the code without changing its
behaviour, so no test could ever catch it, and triage exists to separate those from the
ones that matter.

See [references/MUTATION_OPERATORS.md](references/MUTATION_OPERATORS.md) for the mutation
catalogue.
