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

// Initialiseer tabellen als ze nog niet bestaan
// Wrapped in try/catch om serverless crashes op read-only storage te voorkomen
try {
  await db.execute(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    transitionTheme TEXT NOT NULL,
    partners TEXT,
    contactName TEXT,
    contactEmail TEXT,
    mediaLinks TEXT,
    externalLinks TEXT,
    callToAction TEXT,
    obligations TEXT
  );
`);

  await db.execute(`
  CREATE TABLE IF NOT EXISTS content_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    wat TEXT NOT NULL,
    waar TEXT,
    waarom TEXT,
    timing TEXT NOT NULL,
    partners TEXT,
    toelichting TEXT,
    fotos TEXT,
    contactPersoon TEXT,
    contactGegevens TEXT,
    verplichtingen TEXT
  );
`);

  await db.execute(`
  CREATE TABLE IF NOT EXISTS event_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    titel TEXT NOT NULL,
    datumTijd TEXT NOT NULL,
    locatie TEXT,
    transitiethema TEXT NOT NULL,
    omschrijving TEXT NOT NULL,
    inschrijflink TEXT,
    contactPersoon TEXT
  );
`);

  await db.execute(`
  CREATE TABLE IF NOT EXISTS partner_submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    partnerNaam TEXT NOT NULL,
    websiteUrl TEXT,
    expertise TEXT NOT NULL,
    omschrijving TEXT NOT NULL,
    contactPersoon TEXT,
    emailadres TEXT,
    mediaLink TEXT
  );
`);
} catch (e) {
  console.error("Kon tabellen niet initialiseren. Als dit lokaal is of zonder Turso, check read-only bestandsystemen:", e);
}

export default db;
