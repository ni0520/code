
# Haikus for Codespaces

This is a quick node project template for demoing Codespaces. It is based on the [Azure node sample](https://github.com/Azure-Samples/nodejs-docs-hello-world). It's great!!!

## Notes Feature

This sample now includes a simple notes application. Visit `/notes` to create and view notes stored in `notes.json`.

Point your browser to [Quickstart for GitHub Codespaces](https://docs.github.com/en/codespaces/getting-started/quickstart) for a tour of using Codespaces with this repo.

## Build/Check Tooling

This project now includes a lightweight Grunt setup for local checks:

- `npm run check`: Run JavaScript syntax checks and JSON validation.
- `npm run check:json`: Validate JSON files only.
- `npm run start:checked`: Run checks, then start the app.

If Grunt commands are missing in your environment, run `npm install` in the project root to install all dependencies from `package-lock.json`.
