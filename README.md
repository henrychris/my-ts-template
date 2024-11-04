# Node.js + Express + TypeScript Project Template

This repository provides a reusable Node.js and TypeScript project template, with essential configurations and tools for development.

## Features

- **TypeScript** for static typing and cleaner JavaScript
- **ESLint** for code quality checks
- **Prettier** for code formatting
- **Ready-to-use Scripts** for building, running, linting, and testing

## Getting Started

### 1. Using This Template on GitHub

1. Go to the [GitHub repository](https://github.com/henrychris/my-ts-template) for this template.
2. Click **Use this template** and create a new repository.
3. Clone your new repository and install dependencies:

   ```bash
   git clone https://github.com/henrychris/your-new-repo.git
   cd your-new-repo
   npm install
   ```

### 2. Using Degit (CLI Option)

Alternatively, use [degit](https://github.com/Rich-Harris/degit) to clone the latest files without git history:

1. Install `degit` globally if you haven't already:

   ```bash
   npm install -g degit
   ```

2. Scaffold a new project using this template:

   ```bash
   degit henrychris/my-ts-template my-new-project
   cd my-new-project
   npm install
   ```

## Project Structure

```text
my-ts-template/
├── src/                # Application source code
│   └── server.ts        # Main entry point
│   └── common/
│      └── middleware/
│      └── util/
│      └── config.ts
│   └── database/
│       └── migrations/
│       └── models/
│   └── features/
│       └── placeholder/
│          └── placeholderController.ts
│          └── placeholderRoutes.ts
│          └── placeholderValidators.ts
│   └── types/
├── .eslintrc.json      # ESLint configuration
├── .prettierrc         # Prettier configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project metadata and scripts
```

## Scripts

- **`npm run build`** - Compile TypeScript to JavaScript in the `dist` folder.
- **`npm run start`** - Run the compiled code from the `dist` folder.
- **`npm run dev`** - Run the code in development mode with automatic restarts.
- **`npm run lint`** - Run ESLint to check code quality.
- **`npm run format`** - Format the code with Prettier.
