import mysql from 'mysql2/promise'
import config from '#config'
const { database } = config

try {
    var db = await mysql.createPool({
        ...database,
        namedPlaceholders: true
    })
    console.log('База данных подключена')
} catch(error) {
    console.log('Ошибка при подключении к базе данных')
    console.error(error)
}

export default db