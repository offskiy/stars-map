# stars-map

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Live Demo

The application is deployed on GitHub Pages: [https://offskiy.github.io/stars-map](https://offskiy.github.io/stars-map)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This project is configured for automatic deployment to GitHub Pages. Every push to the `main` branch triggers a GitHub Actions workflow that builds and deploys the application.

### How it works

1. The Next.js app is configured for static export (`output: 'export'` in `next.config.ts`)
2. GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the app on every push to main
3. The built static files are deployed to GitHub Pages
4. The site is available at: https://offskiy.github.io/stars-map

### Manual Deployment

To manually trigger a deployment, you can use the "Actions" tab in GitHub and run the workflow manually.

## Deploy on Vercel

Alternatively, you can deploy this Next.js app to the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
