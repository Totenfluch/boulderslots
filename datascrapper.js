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
    const boulderToelz = parsedPageData[0];
    const climbToelz = parsedPageData[1];
    const boulderThalkirchen = parsedPageData[2];
    const climbThalkirchen = parsedPageData[3];
    const boulderGilching = parsedPageData[4];
    const climbGilching = parsedPageData[5];
    const boulderFreimann = parsedPageData[6];
    const climbFreimann = parsedPageData[7];

    slotsQueries.addSlotsData(boulderToelz, climbToelz, boulderThalkirchen, climbThalkirchen,
        boulderGilching, climbGilching, boulderFreimann, climbFreimann);
}

// Every 10 minutes
const scrapJob = new CronJob('*/10 * * * *', async () => {
    const pageData = await getPageData();
    const parsedPageData = parsePageData(pageData);
    saveSlotsData(parsedPageData);
});

scrapJob.start();
