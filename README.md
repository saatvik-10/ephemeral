# EPHEMERAL

> Encrypted conversations that self-destruct. No traces. No recovery. Permanent deletion.

A cyberpunk-inspired ephemeral messaging platform where conversations exist only in volatile memory and vanish after 10 minutes.

## ⚡ Features

- **Zero Knowledge** - E2E encrypted messages, keys never touch servers
- **Auto-Destruct** - Rooms evaporate after 5 minutes, all data purged from RAM
- **No Logs** - No databases, no analytics, no metadata collection
- **Anonymous** - Auto-generated handles, no accounts required
- **Real-time** - WebSocket-powered instant messaging
- **Open Source** - Fully auditable codebase

## 🚀 Quick Start

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Add your Upstash Redis and Realtime credentials

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to launch the terminal.

## 🛠️ Tech Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Upstash Redis** - Volatile data storage
- **Upstash Realtime** - WebSocket messaging
- **TanStack Query** - Data fetching & caching
- **Tailwind CSS** - Styling

## 🔒 Security

- Messages encrypted in transit and at rest
- Data stored only in Redis with TTL (Time To Live)
- Automatic purge after 10 minutes
- No persistent storage or logs
- Room URL is the only access key

## ⚠️ Warning

**This is experimental software.** Messages are permanently deleted. No backups exist. Use at your own risk.
