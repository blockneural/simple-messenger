# Frontend - Simple Messenger

Next.js 14 app with real-time messaging via WebSockets.

## Setup

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**

Create a `.env.local` file:
```
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

3. **Run development server**
```bash
npm run dev
```

App runs on `http://localhost:3000`

## Tech Stack

- **Next.js 14.2** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Radix UI** - Component primitives
- **Lucide Icons** - Icons
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Socket.io Client** - WebSocket connection

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main messenger page
│   └── globals.css      # Global styles
├── components/          # React components
├── hooks/              # Custom hooks
├── lib/                # Utilities
├── types/              # TypeScript types
└── public/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production build
- `npm run lint` - Run ESLint

## Development

The app connects to the Flask backend via WebSocket. Make sure the backend is running on port 5000 before starting the frontend.

