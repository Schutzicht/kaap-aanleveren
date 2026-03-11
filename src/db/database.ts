import { createClient } from '@libsql/client/web';
import "dotenv/config";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("CRITICAL: TURSO_DATABASE_URL is not set. The app will fail to connect.");
}

const db = createClient({
  url: url || "libsql://default-placeholder.turso.io", // voorkomt crash in createClient, maar db operaties zullen falen als url invalid is
  authToken: authToken || "",
});

export default db;
