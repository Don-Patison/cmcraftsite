import schedule from 'node-schedule'
import db from "#lib/db"

import config from '#config'
import fs from "fs"

if (config.remote) {
	schedule.scheduleJob('*/1 * * * *', async () => {

		const tps = +fs.readFileSync('/var/minecraft/current_tps', 'utf8')
		console.log(tps)
		
		await db.query(`
			INSERT INTO tps (value) 
			VALUES (:tps)
		`, { tps })
		
	})
}
