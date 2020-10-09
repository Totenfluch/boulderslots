require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const cors = require('cors');

const CONFIG = require('./config');
const dataScrapper = require('./datascrapper');
const slotsQueries = require('./database/SlotQueries');

const app = express();

app.use(bodyParser.json());
app.use(cors());

/* when deploying, link the certificates with ln to the main folder */
const privateKey = fs.readFileSync('./link_privatekey.pem');
const certificate = fs.readFileSync('./link_certificate.pem');
const chain = fs.readFileSync('./link_chain.pem');

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: chain,
};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(CONFIG.PORT, () => {
    console.log(`API Server started on Port ${CONFIG.PORT}`);
});

httpsServer.get('/', (req, res) => {
    res.send({ data: 'online' });
});

httpsServer.get('/api/v1/slotsData', async (req, res) => {
    const slotsData = await slotsQueries.getSlotsData();
    res.send({ data: slotsData });
});
