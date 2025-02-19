import schedule from 'node-schedule'
import mc from "minecraftstatuspinger"
import db from "#lib/db"

import config from '#config'
const { domain, ip, port } = config.minecraft.server
const remote = config.remote
import fs from "fs"

schedule.scheduleJob('*/1 * * * *', async () => {

    var ping;

    const savePing = async ({ players, max }) => {
        if (players >= 0) {
            await db.query(`
                INSERT INTO online (players, max, status) 
                VALUES (:players, :max, "up")
            `, { players, max })
        } else {
            await db.query(`
                INSERT INTO online (players, max, status) 
                VALUES (NULL, NULL, "down")
            `)
        }
    }
	
	if (remote) {
		try {
			
			console.log(`Pinging ${domain}:${port}...`)
			const request = await mc.lookup({ host: domain, ping: false })
			ping = {
				players: request.status.players.online,
				max: request.status.players.max
			}

		} catch (error) {
			
			console.error(`Cannot ping ${domain}:${port}`)
			console.error(error.message)
			console.log(`Trying ${ip}:${port}...`)

			try {
				const request = await mc.lookup({ host: domain, ping: false })
				ping = {
					players: request.status.players.online,
					max: request.status.players.max
				}
			} catch (error) {
				console.error(`Cannot ping ${ip}:${port}. Is server down?`)
				console.error(error.message)
			}

		}
	} else {
		ping = {
			players: +fs.readFileSync('/var/minecraft/current_online', 'utf8'),
			max: +fs.readFileSync('/var/minecraft/max_online', 'utf8')
		}
	}

    await savePing(ping)
})
