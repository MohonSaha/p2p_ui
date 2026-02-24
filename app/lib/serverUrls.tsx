export const VITE_BASE_API =
  process.env.NODE_ENV === "production"
    ? "https://p2pserver-production-a821.up.railway.app/api/v1"
    : "http://localhost:4001/api/v1";
