import express from 'express'
const cmc = express()

import config from '#config'
const { port } = config

// Устанавливаем шаблонизатор. Папка /views выбирается автоматически.
cmc.set('view engine', 'ejs');

import fullPath from '#middleware/full-path'
cmc.use(fullPath)

// Устанавливаем роутер
import { router } from '#server/routes/_router'
cmc.use(router)

// Устанавливаем статическую папку
cmc.use(express.static('public'));

// 404
cmc.use((req, res) => {
	res.status(404).render('pages/not-found', { req })
});

// Запускаем сервер
cmc.listen(port, () => {
	console.log(`Сайт запущен на порту :${port}`);
});
