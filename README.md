# day-forecast

Find out which day it is

## Stripe integration

1. Copy `.env.example` to `.env` and set `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, and `PRICE_ID`.
2. Install dependencies:

```bash
npm install express stripe dotenv cors concurrently
```

3. Run the frontend and backend (dev):

```bash
cd client
npm run dev
```

Or run the backend only:

```bash
cd server
npm run start
```

Notes:

- Server runs on port `8787` by default. Frontend uses `http://localhost:5173` (live-server).
- Configure a price in your Stripe dashboard and set `PRICE_ID` accordingly.
