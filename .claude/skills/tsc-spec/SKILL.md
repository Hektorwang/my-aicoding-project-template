---
name: tsc-spec
description: >-
  Defines this project's mandatory technical specification: Python 3.13
  design rules, pyproject.toml packaging with hatchling and uv, src-layout
  project structure, bilingual README requirements, ORM-first database
  access, Swagger/OpenAPI documentation, MCP tool conventions, loguru
  logging via tsc_logger.py, Shell/JavaScript/Ansible standards, Docker
  containerization, security prohibitions (no pickle, no eval, no
  hardcoded secrets), and quality gates (mypy, black, pylint, pytest,
  shfmt, shellcheck, eslint, ansible-lint). Use this skill whenever
  writing, editing, reviewing, or scaffolding any code, configuration
  file, Dockerfile, README, or CI setup in this repository, even for
  small or single-file changes, since every file in this project must
  comply with these rules.
---

# Technical Specification (SPEC)

Spec Version: 2.0.0

This skill defines the mandatory technical specification for this project. Read the relevant section before writing, editing, reviewing, or scaffolding any code, configuration, or documentation here. When in doubt about which section applies, read the whole document; it is short enough to load in full.

## Table of Contents

1. [Conventions](#1-conventions)
2. [Scope](#2-scope)
3. [Runtime Environment](#3-runtime-environment)
4. [Character Set and Language](#4-character-set-and-language)
5. [Packaging and Project Configuration](#5-packaging-and-project-configuration)
6. [Project Structure](#6-project-structure)
7. [Python Standards](#7-python-standards)
8. [Database](#8-database)
9. [API Interfaces](#9-api-interfaces)
10. [MCP Tools](#10-mcp-tools)
11. [Logging](#11-logging)
12. [Shell Scripts](#12-shell-scripts)
13. [JavaScript](#13-javascript)
14. [Ansible](#14-ansible)
15. [Testing](#15-testing)
16. [Code Quality Gates](#16-code-quality-gates)
17. [Containerization](#17-containerization)
18. [Security and Prohibitions](#18-security-and-prohibitions)
19. [Preferred Choices](#19-preferred-choices)

## 1. Conventions

The key words MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY are used as defined in RFC 2119.

Every rule in this specification applies to all projects in scope unless a project-level document explicitly overrides it. Exceptions MUST be documented and approved through code review.

## 2. Scope

This specification covers Python, Shell, JavaScript, Ansible, and MCP-based projects. It defines runtime requirements, character set rules, packaging, project structure, coding standards, security rules, and quality gates.

## 3. Runtime Environment

* Python MUST be version 3.13.
* Bash MUST be version 5.0 or higher.

## 4. Character Set and Language

* Code and technical documentation MUST use half-width (ASCII) punctuation.
* Code comments and docstrings MUST be written in English.
* Localized user-facing strings, translated content, and locale data are exempt from the ASCII punctuation rule.
* Emoji MUST NOT appear in code or documentation.
* ASCII art MUST NOT appear in code or documentation. Use Mermaid flowchart syntax for diagrams.

## 5. Packaging and Project Configuration

### 5.1 Single Configuration File

* `pyproject.toml` MUST be the single source of truth for project metadata, dependencies, build settings, and tool configuration (black, mypy, pylint, pytest, coverage).
* `setup.py`, `setup.cfg`, `mypy.ini`, `.pylintrc`, and `pytest.ini` MUST NOT be used.
* `requirements.txt` MAY be generated from `uv.lock` for container builds. It MUST NOT be edited by hand.

### 5.2 Build Backend

* Projects SHOULD use `hatchling` as the build backend.
* `setuptools` MAY be used only when a project requires a feature that `hatchling` does not provide.

### 5.3 Reference pyproject.toml

```toml
[build-system]
requires = ["hatchling>=1.27"]
build-backend = "hatchling.build"

[project]
name = "your-package"
version = "1.5.0"
description = "Short project description"
readme = "README.md"
license = "MIT"
requires-python = ">=3.13"
authors = [{ name = "Team Name", email = "team@example.com" }]
dependencies = [
    "loguru>=0.7",
]

[project.scripts]
your-cli = "your_package.__main__:main"

[dependency-groups]
dev = [
    "black>=24.0",
    "mypy>=1.11",
    "pylint>=3.2",
    "pytest>=8.0",
    "pytest-cov>=5.0",
]

[tool.hatch.build.targets.wheel]
packages = ["src/your_package"]

[tool.black]
line-length = 100
target-version = ["py313"]

[tool.mypy]
python_version = "3.13"
strict = true
files = ["src", "tests"]

[tool.pylint.main]
py-version = "3.13"

[tool.pylint.format]
max-line-length = 100

[tool.pytest.ini_options]
testpaths = ["tests"]
addopts = "-ra --strict-markers"

[tool.coverage.run]
source = ["your_package"]

[tool.coverage.report]
fail_under = 80
```

### 5.4 Dependency Management

* Projects SHOULD use `uv` for dependency management (`uv sync`, `uv run`, `uv lock`).
* `uv.lock` MUST be committed to the repository.
* Runtime dependencies MUST be declared in `[project].dependencies` with lower bounds.
* Development dependencies MUST be declared in `[dependency-groups]`.
* Deployment installs MUST use a locked install, for example `uv sync --frozen --no-dev`.

### 5.5 Versioning and Release Notes

* Versions MUST follow Semantic Versioning 2.0.0 (MAJOR.MINOR.PATCH).
* `[project].version` in `pyproject.toml` is the single source of truth for the project version.
* The third line of `release-note.md` MUST be `## Version=X.Y.Z`, matching `[project].version` exactly.
* CI MUST fail when the version in `release-note.md` and the version in `pyproject.toml` differ.
* Build artifacts (`dist/`, `build/`, `*.egg-info/`) MUST NOT be committed.

### 5.6 End-User Documentation

* `README.md` and `README-zh_CN.md` MUST exist at the project root.
* `README.md` MUST provide an English introduction to the project, including its functionality, installation, configuration, and usage.
* `README-zh_CN.md` MUST provide a Simplified Chinese introduction to the project, including its functionality, installation, configuration, and usage.
* Both files MUST describe the project from the perspective of its final users rather than internal implementation details.
* When user-facing functionality, installation procedures, configuration options, or usage instructions change, both README files MUST be updated accordingly.

## 6. Project Structure

### 6.1 Reference Layout (src layout)

```text
project-root/
    pyproject.toml          # Metadata, dependencies, tool configuration
    README.md               # English project overview and user documentation
    README-zh_CN.md         # Simplified Chinese project overview and user documentation
    release-note.md         # Version history
    LICENSE
    uv.lock                 # Locked dependency versions
    .gitignore
    .env.example            # Environment variable template (no real secrets)
    Dockerfile              # Required only when deploying with Docker
    compose.yml             # Local development stack (docker-compose.yml is deprecated)
    src/
        your_package/
            __init__.py
            __main__.py     # Entry point for "python -m your_package"
            py.typed        # PEP 561 marker for type hint distribution
            lib/
                __init__.py
                tsc_logger.py   # Logging encapsulation (see Section 11)
            config/         # Settings loaded from environment and TOML defaults
            models/         # ORM models
            schemas/        # Request and response schemas
            services/       # Business logic
            api/            # HTTP routes (FastAPI) or views (Django)
    tests/
        conftest.py
        unit/
        integration/
    migrations/             # Database migrations (Alembic for FastAPI)
    scripts/                # Shell scripts
    dev_tools/              # Pinned shfmt and shellcheck (see Section 16)
    docs/
    .github/
        workflows/          # CI pipelines
```

### 6.2 Framework Variants

* For Django projects, replace `models/`, `schemas/`, `services/`, and `api/` with Django apps. Migrations live inside each app.
* The `lib/` package name MAY be changed to a more specific name (for example `core/`) when the project has an established naming convention. Any change MUST be reflected in this document for the project.

## 7. Python Standards

### 7.1 Design

* Business logic MUST have explicit and maintainable structure.
* Classes SHOULD be used when state, lifecycle, dependency injection, or polymorphism is required.
* Stateless and deterministic business transformations MAY be implemented as module-level functions.
* Module-level functions MAY be used for entry points, test functions, pure helpers, and stateless business operations.
* Procedural code MUST NOT be used as the primary architectural pattern for non-trivial business logic.

### 7.2 Typing and Documentation

* All public functions, methods, and class attributes MUST have type hints.
* All public modules, classes, and functions MUST have Google-style docstrings.

### 7.3 Paths and Serialization

* Path operations MUST use the `pathlib` standard library. The `os.path` module MUST NOT be used.
* YAML parsing MUST use `yaml.safe_load()` or `yaml.safe_load_all()`.
* `pickle` MUST NOT be used.

### 7.4 HTTP Clients

* HTTP clients MUST reuse connections where the client library supports connection pooling.
* Code using `requests` MUST use a persistent `requests.Session`.
* Code using `httpx` MUST reuse a persistent `Client` or `AsyncClient` where connection reuse is applicable.
* Code using `aiohttp` MUST reuse a persistent `ClientSession`.

### 7.5 Secrets

* Secrets MUST be loaded from environment variables or a secure vault.
* Secrets MUST NOT be hardcoded.

## 8. Database

* Database operations MUST primarily use an ORM.

  * FastAPI projects SHOULD use SQLAlchemy.
  * Django projects MUST use the Django ORM.
* Raw SQL is permitted only for complex read-only analytics, or when ORM performance is proven insufficient. Each use MUST be approved in code review.
* Schema changes MUST be managed through migrations that are committed to the repository (Alembic for FastAPI, Django migrations for Django).

## 9. API Interfaces

* Every API MUST provide Swagger (OpenAPI) documentation.

  * FastAPI generates this automatically.
  * Django projects SHOULD expose the schema with a package such as `drf-spectacular`.
* REST-style interfaces are preferred over RPC-style interfaces.
* Asynchronous implementations are preferred over synchronous ones. Django projects MAY use synchronous views.

## 10. MCP Tools

* Every MCP tool definition MUST include an explicit English `instructions` field that describes:

  * preconditions,
  * inputs, and
  * expected outputs.
* Streamable HTTP SHOULD be used as the transport instead of SSE.

## 11. Logging

* Logging MUST be provided by `loguru`, encapsulated in `src/<package>/lib/tsc_logger.py`.
* Application code MUST obtain its logger from `tsc_logger.py`.
* Application code MUST NOT call the standard `logging` module directly or configure loguru sinks outside `tsc_logger.py`.
* Logs SHOULD be detailed, covering DEBUG through ERROR levels.
* When fixing a bug, temporary diagnostic logs MAY be added to the affected code. Before merging, these logs MUST either be removed or downgraded to DEBUG level.

## 12. Shell Scripts

* Scripts MUST target Bash 5.0 or higher and start with `#!/usr/bin/env bash`.
* Scripts SHOULD enable strict mode with `set -euo pipefail`.
* Every function MUST have a Google-style comment block.
* Compound chains such as multiple `||` or `&&` MUST NOT be used. Use explicit `if`, `elif`, and `else` blocks.
* Scripts MUST be formatted with `shfmt` and validated with `shellcheck`.
* `eval` MUST NOT be used. If it is unavoidable, it MUST require manual human confirmation before execution.

## 13. JavaScript

* JavaScript code MUST use JSDoc comments.
* JavaScript code MUST pass `eslint` using the Google Style Guide.
* TypeScript MUST NOT be used.

## 14. Ansible

* Ansible playbooks MUST pass `ansible-lint`.

## 15. Testing

* `pytest` is the required test framework for Python.
* The `tests/` directory SHOULD mirror the structure of `src/`.
* Unit tests MUST NOT depend on external networks or real databases.
* Integration tests that need external services MUST be placed under `tests/integration/`.
* Coverage MUST be measured with `pytest-cov`. The minimum threshold MUST be set in `[tool.coverage.report]` in `pyproject.toml`.

## 16. Code Quality Gates

| Language   | Tool                        | Purpose       |
| ---------- | ---------------------------- | ------------- |
| Python     | mypy                        | Type checking |
| Python     | black                       | Formatting    |
| Python     | pylint                      | Linting       |
| Python     | pytest                      | Tests         |
| Shell      | shfmt                       | Formatting    |
| Shell      | shellcheck                  | Validation    |
| JavaScript | eslint (Google Style Guide) | Linting       |
| Ansible    | ansible-lint                | Validation    |

* If a quality gate fails, the agent MUST first diagnose the failure.
* The agent MUST attempt to fix failures that can be safely resolved without changing intended behavior.
* After applying a fix, the agent MUST rerun the affected quality gate.
* The agent MAY request human intervention when:

  * the failure cannot be safely resolved;
  * the specification is ambiguous or contradictory;
  * resolving the failure requires changing intended behavior;
  * a destructive or security-sensitive operation is required.
* The agent MUST NOT suppress a quality gate failure merely to make validation pass.
* Lint or type-check suppression comments MUST NOT be added without a recorded justification.
* Tool binaries such as `shfmt` and `shellcheck` SHOULD be downloaded at pinned versions by a setup script rather than committed to the repository. If they are committed, their versions MUST be recorded.

## 17. Containerization

* A `Dockerfile` MUST exist at the project root when the project is deployed with Docker.
* A `compose.yml` file MUST exist when Docker Compose is used for local development. `docker-compose.yml` is deprecated.
* Docker builds SHOULD use a locked install and SHOULD run as a non-root user.
* The uv image tag MUST be pinned. The `latest` tag MUST NOT be used.

Reference Dockerfile pattern:

```dockerfile
FROM python:3.13-slim

COPY --from=ghcr.io/astral-sh/uv:<pinned-version> /uv /bin/uv

WORKDIR /app

COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

COPY src ./src
RUN uv sync --frozen --no-dev

CMD ["uv", "run", "your-cli"]
```

## 18. Security and Prohibitions

The following are forbidden across all projects in scope.

| Prohibition                                | Reason                                                           |
| ------------------------------------------- | ------------------------------------------------------------------ |
| `pickle` serialization                     | Insecure deserialization                                         |
| `eval()` or `exec()` in Python             | Code injection risk; requires manual confirmation if unavoidable |
| `eval` in Shell                            | Code injection risk; requires manual confirmation if unavoidable |
| `os.path` for path operations              | Use `pathlib` instead                                            |
| TypeScript                                 | Not permitted in this project                                    |
| Raw SQL outside the exception in Section 8 | Use the ORM                                                      |
| Hardcoded secrets                          | Load from environment variables or a secure vault                |
| Insecure deserialization of untrusted data | Validate and sanitize input first                                |
| Object-oriented bypass for business logic  | See Section 7.1                                                  |

* Data from untrusted sources (JSON payloads, YAML files, HTTP requests) MUST be validated and sanitized before processing. Pydantic models SHOULD be used for FastAPI, and serializers for Django REST Framework.
* `.env` files with real values MUST NOT be committed. `.env.example` MUST be committed as a template.
* Full-width characters MUST NOT appear in code and technical documentation (see Section 4 for the exemption).

## 19. Preferred Choices

### 19.1 Backend Framework Selection

* Django SHOULD be selected when the project requires:

  * a built-in administration interface;
  * integrated authentication and authorization;
  * rapid CRUD development;
  * substantial use of the Django ecosystem.

* FastAPI SHOULD be selected when the project requires:

  * API-first architecture;
  * high-concurrency request handling;
  * asynchronous I/O;
  * microservice architecture;
  * low-overhead HTTP services.

* The framework MUST be selected based on project requirements rather than personal preference.

* The project MUST document the reason for selecting Django or FastAPI when the choice is not obvious from the requirements.

### 19.2 Interfaces and Databases

* RESTful interfaces are preferred over RPC interfaces.
* Asynchronous implementations are preferred over synchronous ones.
* Database access SHOULD use SQLAlchemy with FastAPI, or the Django ORM with Django.

### 19.3 Configuration Files

Priority order: TOML > INI > YAML > JSON > Python dict.

### 19.4 Transport and Connectivity

* WebSockets SHOULD NOT be used unless bidirectional interaction is strictly required.
* Streamable HTTP is preferred over SSE for MCP transport.

### 19.5 Logging Detail

* Prefer detailed logging from DEBUG to ERROR levels (see Section 11).
