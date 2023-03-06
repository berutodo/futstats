const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const schedule = require('node-schedule');

// Importa a função de scraping
const scraping = require('./scraper');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Define o cronjob para rodar a função de scraping a cada 10 segundos
const job = schedule.scheduleJob('*/10 * * * * *', async function() {
    console.log('Chegamos aqui')
    await scraping();
});

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});