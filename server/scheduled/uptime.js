import schedule from 'node-schedule'
import db from "#lib/db"

import { JSDOM } from 'jsdom'

import config from '#config'
const { hotmc } = config.minecraft

schedule.scheduleJob('0 2 * * *', async () => {

    const response = await fetch(hotmc);

    if (!response.ok) {
        throw new Error(`Cannot fetch ${hotmc}. Error: ${response.status}`)
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const uptime = dom.window.document.querySelector('.uptime-value').textContent;

    await db.execute('INSERT INTO uptime (value) VALUES (:uptime)', { uptime })
   
})