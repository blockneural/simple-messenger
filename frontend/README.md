# Frontend

Next.js app for real-time messaging interface.

## Setup

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:3000

## Configuration

Create `.env.local` file:
```
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

For network testing, change to server's IP:
```
NEXT_PUBLIC_SOCKET_URL=http://192.168.1.100:5000
```

## Tech Stack

- Next.js 14.2 with App Router
- React 18
- TypeScript 5
- Tailwind CSS
- Socket.io-client
- React Hook Form + Zod
- Radix UI components
- Lucide icons
- emoji-picker-react

## Structure

```
frontend/
├── app/              Pages and layouts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/       React components
│   ├── MessageBubble.tsx
│   ├── MessageInput.tsx
│   ├── MessageList.tsx
│   └── ReceiverInput.tsx
├── hooks/           Custom hooks
│   └── useWebSocket.ts
├── lib/             Utilities
│   ├── socket.ts
│   ├── utils.ts
│   └── validation.ts
└── types/           TypeScript types
    └── message.ts
```

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Run production build
