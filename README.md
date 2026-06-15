# Playwright Evaluation

This repository contains two assignments for the Playwright TypeScript evaluation.

## Structure

- `assignment1/`
  - `pages/` - Page Object Model classes for OrangeHRM
  - `tests/` - UI automation specs for login and employee search
- `assignment2/`
  - `tests/api-utils/ApiUtils.ts` - API utility class with typed responses
  - `tests/booking.spec.ts` - API and web integration tests
- `playwright.config.ts` - Playwright configuration with retries, screenshot, trace, and HTML report
- `package.json` - Scripts for `regression`, `smoke`, and `report`

## Run tests

```bash
cd C:\Users\ayush.jain\playwright-evaluation
npm install
npx playwright install --with-deps
npm run regression
```

## Notes

- All tests are written in TypeScript with explicit typing.
- `assignment1` uses Page Object Model design.
- `assignment2` uses a typed API utility and includes a web test that injects auth token with `addInitScript()`.

## GitHub

This repository is ready to be pushed to GitHub.

Suggested remote setup:

```bash
git init
git add .
git commit -m "completed assignment 1 and assignment 2"
git branch -M main
git remote add origin https://github.com/AutomationAyush/playwright-evaluation.git
git push -u origin main
```
