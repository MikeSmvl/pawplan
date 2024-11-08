# PawPlan

**PawPlan** is a monorepo built using [TurboRepo](https://turbo.build/) to manage a Next.js application with efficient builds and task orchestration. This project serves as a platform for tracking and prioritizing dog behaviors to aid in training, with potential for AI-driven insights.

## Project Structure

The repository is organized into a monorepo structure with TurboRepo managing tasks across projects.

```
.
├── apps/
│   └── web/               # Next.js application
├── turbo.json             # TurboRepo configuration
└── package.json           # Root package configuration with TurboRepo scripts
```

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **React 19**: Latest release candidate
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TurboRepo**: Monorepo tool for optimized task running and caching
- **TypeScript**: Static typing

## Getting Started

### Prerequisites

- **Node.js**: Ensure you have Node.js v20 or higher.
- **npm**: npm 10 is specified as the package manager.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/pawplan.git
   cd pawplan
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will run the Next.js app in development mode using TurboRepo’s orchestration.

### Available Scripts

| Command           | Description                                             |
|-------------------|---------------------------------------------------------|
| `npm run dev`     | Starts development mode for all apps                    |
| `npm run dev:web` | Starts development mode for `web` app only              |
| `npm run build`   | Builds all apps                                         |
| `npm run lint`    | Lints all apps                                          |

### TurboRepo Configuration

The **`turbo.json`** file configures caching and dependencies between tasks:

- **`build`**: Builds depend on other builds, caching results in `.next`.
- **`lint`**: Linting task, dependent on previous lint runs.
- **`dev`**: Persistent dev mode, disabled caching for real-time changes.