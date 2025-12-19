# Project Context

## Project Onboarding Analysis

Please help me understand this codebase by analyzing it systematically. Be concise and focus on high-level understanding rather than exhaustive details to preserve context window.

### 1. Project Purpose & Vision

- Find and read the main README.md, CONTRIBUTING.md, or any specification/design documents
- Identify: What problem does this project solve? What is its purpose and scope?
- Note any architectural decision records (ADRs) or design docs

### 2. Project Architecture

- Determine the overall architecture pattern (monolith, microservices, monorepo, etc.)
- Identify major components and their relationships
- Look for architecture diagrams or documentation in /docs, /architecture, or similar

### 3. Project Structure

- Generate a high-level directory tree (2-3 levels deep)
- Identify key directories: source code, tests, config, docs, scripts
- Note any monorepo workspace structure or module organization

### 4. Technology Stack & Configuration

- Identify: programming language(s), frameworks, major libraries
- Find package/dependency files (package.json, requirements.txt, go.mod, Cargo.toml, pom.xml, etc.)
- Review configuration files (tsconfig, babel, webpack, vite, etc.)
- Note environment configuration patterns (.env files, config directories)

### 5. Application Layer Analysis

- **Frontend** (if exists): Framework, state management, routing approach, component structure
- **Backend** (if exists): Framework, API design (REST/GraphQL/gRPC), data models, service layers
- **Database**: Type, ORM/query builder, migration strategy
- Note the general code organization patterns and conventions

### 6. Testing Strategy

- Identify testing frameworks and tools
- Check for unit tests, integration tests, e2e tests
- Review test configuration and conventions
- Note test coverage setup if present
- Look for testing utilities, fixtures, or test helpers

### 7. Deployment & Infrastructure

- Review Dockerfile, docker-compose.yml, or other containerization
- Identify cloud provider and services used
- Check for infrastructure-as-code (Terraform, Pulumi, CloudFormation, etc.)
- Note deployment scripts or documentation

### 8. CI/CD Pipeline

- Examine .github/workflows, .gitlab-ci.yml, .circleci/, Jenkinsfile, etc.
- Identify: build steps, test automation, deployment stages
- Note any quality gates, linting, or security scanning

### 9. Development Workflow

- Review CONTRIBUTING.md or similar docs
- Identify: branch strategy, commit conventions, PR/MR templates
- Note code quality tools (linters, formatters, pre-commit hooks)
- Find development setup instructions

### 10. Additional Context

- Locate shared utilities, helpers, or common modules
- Identify any scripts for common tasks (in /scripts, package.json scripts, Makefile)
- Note documentation for APIs, components, or modules
- Check for design systems, style guides, or coding standards
- Identify logging, monitoring, or observability setup
- Review security practices (authentication, authorization patterns)

### Output Format

Provide a concise summary organized by these sections. Focus on "what" and "why" over "how". Flag any missing or unclear areas that might need clarification as I work on tasks.
