# Adventurers Guild — API Testing Quest

> *"You are testing a full system, not just endpoints."*
> — Mindera Code Academy, Final Project

## The Story

This project tells the story of **Filara, the Wandering Sage** — a Gnome Wizard with a background in Chemical Engineering who spent years in quality assurance, briefly stepped into data analysis, and ultimately found her true path in IT.

Filara is not just a D&D character. She is the narrative thread of this final project — a complete end-to-end API test suite built with Playwright and TypeScript, covering the full character creation flow of the Adventurers Guild API.

Every endpoint tested is a chapter of her journey. Every assertion is a proof of merit.

---

## Tech Stack

- **Playwright** — API test automation framework
- **TypeScript** — typed language for safer, cleaner code
- **Node.js** — runtime environment
- **dotenv** — environment variable management
- **GitHub Actions** — CI/CD pipeline

---

## Project Structure:

adventurers-guild-tests/
├── tests/
│   ├── client/         -> API request functions (one file per resource)
│   ├── data/           -> test data and constants
│   ├── types/          -> TypeScript interfaces for requests and responses
│   ├── features/       -> spec files organised by character creation phase
│   └── helpers/        -> reusable validation functions
├── presentation/
│   ├── index.html      -> interactive D&D presentation board
│   └── filara.png      -> Filara's character portrait
├── .github/
│   └── workflows/
│       └── playwright.yml -> GitHub Actions CI workflow
├── .env                -> environment variables (not committed)
├── playwright.config.ts
└── README.md

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/filipalimaa/adventurers-guild-tests.git
cd adventurers-guild-tests
```

### 2. Install dependencies

```bash
npm install
npx playwright install
```

### 3. Configure environment variables

Create a `.env` file in the root:
BASE_URL=https://adventurers-guild-api.vercel.app
API_USERNAME=your_username
API_PASSWORD=your_password

### 4. Run the tests

```bash
# Run all tests
npx playwright test

# Run only smoke tests
npx playwright test --grep @smoke

# Run only negative tests
npx playwright test --grep @negative

# Run a specific spec file
npx playwright test characterCreation.spec.ts

# View the HTML report
npx playwright show-report
```

---

## Character Creation Flow - Endpoints Covered

| Scene | Title | Endpoint | Tags |
|-------|-------|----------|------|
| 1 | The Birth of a Legend | POST /api/characters | @smoke @post |
| 2 | Choosing the Path | PATCH /api/characters/{id} | @patch |
| 3 | The Inner Power | GET + PUT /api/characters/{id}/ability-scores | @put |
| 4 | Skills of the Scholar | GET /api/characters/{id}/skills + PATCH | @patch |
| 5 | Arming for Adventure | POST /api/characters/{id}/equipment | @post |
| 6 | Words of Power | GET + PUT /api/characters/{id}/spells | @put @smoke |
| 7 | The Final Review | GET /api/characters/{id} | @smoke @get |

---

## Test Tags

Tests are tagged for selective execution:

| Tag | Description |
|-----|-------------|
| @smoke | Critical tests - the most important validations |
| @negative | Error and rejection tests |
| @flow | End-to-end flow tests |
| @get @post @patch @put | By HTTP method |
| @data | Data validation tests |

---

## CI/CD

Every push and pull request to `main` triggers the GitHub Actions workflow automatically.

The pipeline:
1. Checks out the repository
2. Sets up Node.js
3. Installs dependencies
4. Installs Playwright browsers
5. Runs all tests

Credentials are stored as **GitHub Repository Secrets** and never exposed in logs.

---

## Filara, the Wandering Sage

| Attribute | Value |
|-----------|-------|
| Class | Wizard |
| Species | Gnome |
| Background | Sage |
| Level | 1 |
| INT | 17 |
| WIS | 13 |
| Skills | Arcana, History, Investigation, Insight |
| Spells | 3 cantrips + 6 leveled spells |
| Equipment | Quarterstaff, Robe, Locking Spellbook |

*"The Wandering Sage has found her path. Status: complete."*

---