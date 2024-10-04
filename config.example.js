export default {
    // Порт веб-сервера
    port: '3000',
    minecraft: {
        // Параметры майнкрафт-сервера
        server: {
            domain: 'cmcrafts.su',
            ip: '94.26.229.202',
            port: '25565',
            versions: ['1.21', '1.21.1']
        },
        // Мониторинг (для получения аптайма)
        hotmc: 'https://hotmc.ru/minecraft-server-235548'
    },
    // Данные для подключения к MySQL (нужно создать БД вручную)
    database: {
        host: 'localhost',
        database: 'cmc',
        user: 'nikhokdangd',
        password: 'bobr123'
    }
}