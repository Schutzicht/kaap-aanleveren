import { createClient } from '@libsql/client/web';

const url = "libsql://kaap-aanleveren-schutzicht.aws-eu-west-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzMyMjU0NDgsImlkIjoiMDE5Y2RjNzgtYmQwMS03MzYzLWJmMTItMWQ1NmY3MTAxOWY1IiwicmlkIjoiODJiNjgwYWMtYWU2YS00OTZiLWI4MmUtYmFmODliMzIxMDNjIn0.tCxDPNaWsweW5m8irgCcz3XJ77Y_bZj5mBeslasA0o8j_jmEmiEg-JGF3sW8wh5SDXSFlw7ZUtkZPgTd5ICKAQ";

const db = createClient({
    url,
    authToken,
});

async function main() {
    console.log("Connecting to Turso...");

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
    console.log("Projects table created.");

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
    console.log("Content table created.");

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
    console.log("Events table created.");

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
    console.log("Partners table created.");

    console.log("All tables successfully initialized in Turso!");
}

main().catch(console.error);
