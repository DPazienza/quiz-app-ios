# Quiz App iOS / PWA

Questa è la versione **iPhone/iPad** della Quiz App. È pensata per funzionare come **PWA**, quindi può essere aggiunta alla schermata Home e usata come una normale app web.

## File inclusi

```text
quiz_app_ios_pwa/
├── index.html
├── manifest.json
├── service-worker.js
├── icons/
│   ├── icon-180.png
│   ├── icon-192.png
│   └── icon-512.png
└── tests/
    └── index.json
```

## Come usarla su iPhone/iPad

### Metodo consigliato: GitHub Pages / hosting statico

1. Carica la cartella `quiz_app_ios_pwa/` su un hosting statico, per esempio GitHub Pages, Netlify o Vercel.
2. Apri l'URL da Safari su iPhone/iPad.
3. Tocca **Condividi**.
4. Tocca **Aggiungi a schermata Home**.
5. Apri la Quiz App dall'icona creata.

Dopo il primo caricamento, la shell dell'app viene salvata offline dal service worker.

## Come caricare i test

Hai due modalità.

### Modalità 1: import manuale dei file `.quiz.json`

Nell'app premi **Importa test** e seleziona uno o più file `.quiz.json` dall'app File di iOS.

È il metodo più flessibile e non richiede di modificare l'app.

### Modalità 2: caricamento automatico da `tests/index.json`

Se pubblichi i test insieme alla PWA, mettili nella cartella `tests/` e aggiorna `tests/index.json`.

Esempio:

```json
{
  "files": [
    "cs0_003_domain1.quiz.json",
    "cs0_003_domain2.quiz.json",
    "cs0_002_domain1.quiz.json"
  ]
}
```

Poi premi **Auto tests/** nell'app.

Questa modalità è comoda se vuoi una PWA già pronta con tutti i test pubblicati sullo stesso sito.

## Progressi

Su iOS la gestione automatica delle cartelle non è affidabile come su desktop, quindi questa versione usa:

- salvataggio automatico nel browser/PWA;
- **Esporta progressi** per scaricare un backup JSON;
- **Importa progressi** per ripristinare un backup;
- **Cancella progressi** per azzerare lo storico.

Il file esportato contiene solo i progressi, non i test.

## Funzioni disponibili

- Caricamento di uno o più test `.quiz.json`.
- Statistiche per versione e dominio.
- Selezione file test da usare.
- Generazione quiz per:
  - random;
  - solo domande mai fatte;
  - solo domande con errori;
  - solo ultime sbagliate;
  - solo review;
  - misto 70% errori + 30% nuove.
- Filtro per capitolo/dominio.
- Immagini incorporate nei test.
- Zoom immagine.
- Mappa domande.
- Pulsante profilo `👤` dedicato solo ai progressi.

## Note importanti

- Aprire `index.html` direttamente dall'app File può funzionare per una prova rapida, ma la modalità PWA vera richiede hosting via HTTPS o localhost.
- Il service worker non funziona da `file://`.
- I file `.quiz.json` con molte immagini possono essere grandi. Su iPhone conviene caricare solo i test che vuoi usare in quella sessione.
- Se cancelli dati del sito da Safari, anche i progressi locali vengono eliminati. Esporta periodicamente un backup.
