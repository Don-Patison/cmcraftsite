import schedule from 'node-schedule'
import mc from "minecraftstatuspinger"
import db from "#lib/db"

import config from '#config'
const { domain, ip, port } = config.minecraft.server

schedule.scheduleJob('*/10 * * * *', async () => {

    var ping;

    const savePing = async (p) => {
        if (p) {
            const { online: players, max } = p.status.players
            console.log(`${players}/${max}`)
            await db.query(`
                INSERT INTO online (players, max, status) 
                VALUES (:players, :max, "up")
            `, { players, max })
        } else {
            console.log('Ping failed')
            await db.query(`
                INSERT INTO online (players, max, status) 
                VALUES (NULL, NULL, "down")
            `)
        }
    }

    try {
        
        console.log(`Pinging ${domain}:${port}...`)
        ping = await mc.lookup({ host: domain, ping: false })

    } catch (error) {
        
        console.error(`Cannot ping ${domain}:${port}`)
        console.error(error.message)
        console.log(`Trying ${ip}:${port}...`)

        try {
            ping = await mc.lookup({ host: ip, ping: false })
        } catch (error) {
            console.error(`Cannot ping ${ip}:${port}. Is server down?`)
            console.error(error.message)
        }

    }

    await savePing(ping)
})