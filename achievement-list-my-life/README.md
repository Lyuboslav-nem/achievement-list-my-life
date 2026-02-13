# Achievement Log - Game Design Portfolio

A game designer's achievements, certifications, and milestones presented as an MMORPG achievement panel. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui components.

## Features

- 🎮 MMORPG-style achievement system
- 🏆 Categorized achievements (Education, Certifications, Experience, Sports, etc.)
- 🎨 Beautiful dark theme with RPG aesthetics
- 📱 Responsive design
- ⚡ Built with React 19 and Vite

## Getting Started

First, install dependencies:

```bash
npm install --legacy-peer-deps
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

## Project Structure

- `src/` - Source code directory
  - `components/` - React components including achievement panels and UI components
  - `lib/` - Utility functions and achievement data
  - `hooks/` - Custom React hooks
- `public/` - Static assets
- `index.html` - HTML entry point

## Build for Production

```bash
npm run build
```

This creates a `dist/` folder with the production build.

## Deploy on Vercel

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect it as a static site
4. The `vercel.json` is already configured for deployment
5. Click "Deploy" and your app will be live!

### Manual Deployment

You can also deploy using the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Technologies Used

- [React](https://react.dev) - UI library
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Vite](https://vitejs.dev) - Build tool
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Lucide React](https://lucide.dev) - Icons
