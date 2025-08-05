# SolarVoice - Next.js Solar Energy Management Platform

A modern, performant, and scalable solar energy management platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Performance Optimized**: Image optimization, code splitting, lazy loading
- **Type-Safe**: Full TypeScript support with strict mode
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Component Library**: Pre-built UI components using Radix UI
- **State Management**: Zustand for global state management
- **Data Fetching**: TanStack Query for server state management
- **Form Handling**: React Hook Form with Zod validation
- **Testing**: Jest and React Testing Library setup
- **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Security**: Security headers and CSP configured

## 📁 Project Structure

```
solarvoice/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Authentication pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layouts/          # Layout components
│   └── ui/               # UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── middleware.ts          # Next.js middleware
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- HTTPS connection (required for Web Speech API)
- Modern browser with microphone support

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solarvoice.git
cd solarvoice
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📝 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript compiler check
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## 🏗️ Architecture

### Component Architecture

- **Server Components**: Default for all components, used for data fetching and rendering
- **Client Components**: Only used when necessary (interactivity, browser APIs)
- **Shared Components**: Reusable UI components in `/components/ui`

### State Management

- **Server State**: TanStack Query for API data
- **Client State**: Zustand for global app state
- **Form State**: React Hook Form for form management

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **CSS Variables**: For theming and design tokens
- **Class Variance Authority**: For component variants
- **tailwind-merge**: For className conflicts resolution

### Data Validation

- **Zod**: Schema validation for forms and API
- **TypeScript**: Type safety throughout the app

## 🔒 Security

- Security headers configured in middleware
- Environment variables for sensitive data
- Input validation on all forms
- CSRF protection
- XSS protection

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### Integration Tests

```bash
npm run test:integration
```

### E2E Tests

```bash
npm run test:e2e
```

## 📊 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Bundle size optimized with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Vercel](https://vercel.com/)

## 📞 Support

For support, email support@solarvoice.ai or join our Slack channel.
