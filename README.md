# Turborepo Monorepo with NestJS and Next.js

This repository is a monorepo setup using **Turborepo**, featuring:
- **web**: A Next.js frontend application
- **api**: A NestJS backend application

## Getting Started

### Prerequisites
Make sure you have the following installed:
- **Node.js** (Latest LTS recommended)
- **Yarn/NPM** (Using `npm` by default)


### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/sameerhamid/blogs-turbo-repo-nest-nextjs
   cd blogs-turbo-repo-nest-nextjs
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Development Server
To start both the **web** and **api** applications, run:
```sh
npm run dev
```
This will concurrently start both applications in development mode.

- The **Next.js** frontend will be available at `http://localhost:3000`
- The **NestJS** backend will be available at `http://localhost:8000`

### Project Structure
```
/apps
  ├── web   # Next.js frontend
  ├── api   # NestJS backend
/packages  # Shared packages (if needed)
```

