import { createClient } from '@libsql/client';
import 'dotenv/config';

const url = process.env.TURSO_DATABASE_URL || "file:projects.db";
const authToken = process.env.TURSO_AUTH_TOKEN;
const db = createClient({
  url,
  authToken
});
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

export { db as d };
