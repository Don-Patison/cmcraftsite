import express from 'express'
const cmc = express()

import compression from 'express-compression'
cmc.use(compression())

import apicache from 'apicache'
const cache = apicache.middleware
cmc.use('*', cache('10 minutes'))

import config from '#config'
const { port } = config

// Устанавливаем шаблонизатор. Папка /views выбирается автоматически.
cmc.set('view engine', 'ejs');

// Применяем middleware (TODO: сканировать папку)
import fullPath from '#middleware/full-path'
import seo from '#middleware/seo'
import minecraft from '#middleware/minecraft'
cmc.use(fullPath)
cmc.use(seo)
cmc.use(minecraft)

// Устанавливаем роутер
import { router } from '#server/routes/_router'
cmc.use(router)

// Устанавливаем статическую папку
cmc.use(express.static('public'), cache('48 hours'));

// 404
cmc.use((req, res) => {
	res.status(404).render('pages/not-found', { req })
});

// Запускаем сервер
cmc.listen(port, () => {
	console.log(`Сайт запущен на порту :${port}`);
});
