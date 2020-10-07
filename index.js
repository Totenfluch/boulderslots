require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const CONFIG = require('./config');
const dataScrapper = require('./datascrapper');
const slotsQueries = require('./database/SlotQueries');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(CONFIG.PORT, () => {
    console.log(`API Server started on Port ${CONFIG.PORT}`);
});

app.get('/', (req, res) => {
    res.send({ data: 'online' });
});

app.get('/api/v1/slotsData', async (req, res) => {
    const slotsData = await slotsQueries.getSlotsData();
    res.send({ data: slotsData });
});
