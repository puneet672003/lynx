# Lynx - URL Shortening App

Lynx is a URL shortening application with the following stack: ([Demo video](https://youtu.be/wXCagHsmotM))

- Frontend: React.js + Tailwind CSS + Hero UI
- Backend: Node.js + Express.js + MongoDB (Mongoose)

---

## Folder Structure

```
lynx/
├── client/           # Frontend (React)
└── server/           # Backend (Express + MongoDB)
```

---

## Installation

### Backend (Server)

```bash
cd server
pnpm install
pnpm run start
```

Create a `.env` file inside the `server` folder:

```
MONGODB_URL=<your-mongodb-connection-uri>
JWT_SECRET=<your-jwt-secret>
SERVER_BASE_URL=http://localhost:8080
```

---

### Frontend (Client)

```bash
cd client
pnpm install
pnpm run dev
```

Configure `client/src/config/index.ts`:

```ts
export const SERVER_BASE_URL = "http://localhost:8080";
```
