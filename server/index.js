import express from 'express'
const cmc = express()

import config from '#config'
const { port } = config

// Инъектим полный путь
cmc.use((req, res, next) => {
	const path = req.baseUrl + req.path
	req.fullPath = path.split('/').filter(s => s)
	next()
})

// Устанавливаем шаблонизатор. Папка /views выбирается автоматически.
cmc.set('view engine', 'ejs');

// Устанавливаем роутер
import routes from '#server/routes/_router'
for (const [path, route] of Object.entries(routes)) {
	cmc.use(path, route)
}

// Устанавливаем статическую папку
cmc.use(express.static('public'));

// Запускаем сервер
cmc.listen(port, () => {
	console.log(`Сайт запущен на порту :${port}`);
});
