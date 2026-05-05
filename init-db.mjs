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

    // NOTE: dropt en herbouwt exposition_submissions zodat het schema in sync blijft
    // tijdens de testfase. Verwijder deze DROP zodra er echte aanleveringen in zitten,
    // of voeg een ALTER-migratie toe.
    await db.execute(`DROP TABLE IF EXISTS exposition_submissions;`);

    await db.execute(`
    CREATE TABLE IF NOT EXISTS exposition_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      partnerNaam TEXT NOT NULL,
      contactPersoon TEXT NOT NULL,
      contactEmail TEXT NOT NULL,
      projectTitel TEXT NOT NULL,
      pitch TEXT NOT NULL,
      aanleiding TEXT NOT NULL,
      aanpak TEXT NOT NULL,
      resultaat TEXT NOT NULL,
      impact TEXT,
      rolKaap TEXT,
      status TEXT NOT NULL,
      transitionTheme TEXT NOT NULL,
      betrokkenPartners TEXT,
      mediaFiles TEXT,
      mediaLinks TEXT,
      expositieType TEXT NOT NULL,
      doorontwikkeling TEXT,
      verplichtingen TEXT,
      toestemming INTEGER NOT NULL DEFAULT 0,
      feedback TEXT
    );
  `);
    console.log("Exposition table created.");

    const seedTitel = 'ZIS Demo: Drijvende Zonnepark Pilot Veerse Meer';
    const existing = await db.execute(
        `SELECT id FROM exposition_submissions WHERE projectTitel = ?`,
        [seedTitel]
    );
    if (existing.rows.length === 0) {
        await db.execute(
            `
        INSERT INTO exposition_submissions
        (partnerNaam, contactPersoon, contactEmail, projectTitel, pitch, aanleiding, aanpak, resultaat, impact, rolKaap, status, transitionTheme, betrokkenPartners, mediaFiles, mediaLinks, expositieType, doorontwikkeling, verplichtingen, toestemming, feedback)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
            [
                'ZIS',
                'Test Contactpersoon',
                'test@zis.nl',
                seedTitel,
                'Pilot voor drijvende zonnepanelen op binnenwater met focus op rendement en ecologische impact.',
                'De regio staat voor een dubbele opgave: meer hernieuwbare energie opwekken én schaars landoppervlak ontzien. Binnenwateren zoals het Veerse Meer zijn nog vrijwel onbenut voor zonne-energie, terwijl ze enorm potentieel hebben.',
                'We hebben een proefopstelling van 200 m² drijvende zonnepanelen geplaatst op het Veerse Meer, samen met regionale installateurs. Twee seizoenen lang meten we energieopbrengst, waterkwaliteit en effecten op flora en fauna in samenwerking met HZ University.',
                'Twee teelten aan meetdata. Energieopbrengst gemiddeld 12% hoger dan vergelijkbare landpanelen door verkoeling vanuit het water. Geen aantoonbaar negatief effect op waterkwaliteit of ecologie.',
                'Een schaalbaar model dat in heel Zeeland kan worden toegepast op binnenwateren. Eerste opdrachtgevers melden zich vanuit waterschap en gemeenten — dit kan een nieuwe Zeeuwse export-propositie worden.',
                'KAAP brengt de juiste partners samen (HZ, Dockwize, installateurs) en biedt fysieke ruimte voor demonstratie. Daarnaast helpt KAAP met financieringsroutes naar OPZuid.',
                'Lopend',
                'Energie',
                'Dockwize, HZ University, Impuls Zeeland, Provincie Zeeland',
                '',
                'https://drive.google.com/drive/folders/voorbeeld-zis-media',
                'Beide',
                'Verkenning van uitbreiding naar Grevelingen en mogelijke combinatie met aquacultuur. Gesprekken lopen met meerdere agrariërs en visserij-coöperaties over een vervolgconsortium.',
                'Mede mogelijk gemaakt door OPZuid en de Provincie Zeeland.',
                1,
                ''
            ]
        );
        console.log("Seeded ZIS test exposition project.");
    } else {
        console.log("ZIS test exposition project already exists, skipping seed.");
    }

    console.log("All tables successfully initialized in Turso!");
}

main().catch(console.error);
