/* It is friendly, I promise! */

const CronJob = require('cron').CronJob;
const axios = require('axios');
const slotsQueries = require('./database/SlotQueries');

async function getPageData() {
    let slotTrackerPage;
    try {
        slotTrackerPage = await axios.post('https://tickboard.de/public/pos_manager/CustomerEntries/getEntriesLeft');
    } catch (e) {
        console.error('Failed to scrap page...', e);
        return;
    }
    const slotTrackerPageResult = slotTrackerPage.data;
    return slotTrackerPageResult;
}

function parsePageData(pageData) {
    const parser = /(\d+)(			<\/span>)/gim;
    const result = pageData.match(parser);
    const arrayResult = [...result];
    for (let i = 0; i < arrayResult.length; i += 1) {
        arrayResult[i] = Number.parseInt(arrayResult[i].replace(`			<\/span>`, ''), 10);
    }
    return arrayResult;
}

function saveSlotsData(parsedPageData) {
    console.log(parsedPageData);
    const climbToelz = parsedPageData[0];
    const boulderToelz = parsedPageData[1];
    const climbThalkirchen = parsedPageData[2];
    const boulderThalkirchen = parsedPageData[3];
    const climbGilching = parsedPageData[4];
    const boulderGilching = parsedPageData[5];
    const climbFreimann = parsedPageData[6];
    const boulderFreimann = parsedPageData[7];

    slotsQueries.addSlotsData(boulderToelz, climbToelz, boulderThalkirchen, climbThalkirchen,
        boulderGilching, climbGilching, boulderFreimann, climbFreimann);
}

async function scrapeJob() {
    const pageData = await getPageData();
    const parsedPageData = parsePageData(pageData);
    saveSlotsData(parsedPageData);
}

// Every 10 minutes
const scrapJob = new CronJob('*/10 * * * *', async () => {
    scrapeJob();
});

scrapJob.start();
scrapeJob();
