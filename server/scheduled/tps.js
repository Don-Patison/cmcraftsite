import schedule from 'node-schedule'
import db from "#lib/db"

import config from '#config'
import fs from "fs"

if (config.remote) {
	schedule.scheduleJob('*/10 * * * *', async () => {

		const tps = +fs.readFileSync('/var/minecraft/current_tps', 'utf8')
		
		await db.query(`
			INSERT INTO tps (value) 
			VALUES (:tps)
		`, { tps })
		
	})
}
