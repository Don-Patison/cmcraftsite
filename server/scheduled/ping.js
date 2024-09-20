import schedule from 'node-schedule'
import mc from "minecraftstatuspinger"

import config from '#config'
const { domain, ip } = config.minecraft.server

schedule.scheduleJob('*/5 * * * *', async () => {

    var ping;

    const savePing = (p) => {
        if (p) {
            const { online, max } = p.status.players
            console.log(`${online}/${max}`)
            // db: push "up", online, max
        } else {
            console.log('Ping failed')
            // db: push "down", null, null
        }
    }

    try {

        ping = await mc.lookup({ host: domain, ping: false })

    } catch (error) {
        
        console.error("Error: cannot ping cmcraft.su\n", error.message)
        console.log(`Trying ${ip}:25565...`)

        try {
            ping = await mc.lookup({ host: ip, ping: false })
        } catch (error) {
            console.error(`Error: cannot ping ${ip}:25565. Is server down?\n`, error.message)
        }

    }

    savePing(ping)
})