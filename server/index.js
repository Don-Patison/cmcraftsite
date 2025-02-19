import express from 'express'
const cmc = express()

import db from "#lib/db"

//import apicache from 'apicache'
//const cache = apicache.middleware
//apicache.clear()
//apicache.options({ statusCodes: { exclude: ['404'] } })
//cmc.use(cache('10 minutes'))

import compression from 'express-compression'
cmc.use(compression())

import config from '#config'
const { port } = config

// Устанавливаем шаблонизатор. Папка /views выбирается автоматически.
cmc.set('view engine', 'ejs');

// Применяем middleware (TODO: сканировать папку)
import fullPath from '#middleware/full-path'
import minecraft from '#middleware/minecraft'
import seo from '#middleware/seo'
cmc.use(fullPath)
cmc.use(seo)
cmc.use(minecraft)

// Устанавливаем роутер
import { router } from '#server/routes/_router'
import { fstat } from 'fs'
cmc.use(router)

// Устанавливаем статическую папку
cmc.use(express.static('public'))

// 404
cmc.use(async (req, res) => {
	let [tps] = await db.execute('SELECT * FROM tps ORDER BY date DESC LIMIT 1')
	res.locals.tps = tps[0].value
	let [uptime] = await db.execute('SELECT * FROM uptime ORDER BY date DESC LIMIT 1')
	res.locals.uptime = uptime[0].value
	res.status(404).render('pages/not-found', { req })
});

// Запускаем сервер
cmc.listen(port, () => {
	console.log(`Сайт запущен на порту :${port}`);
	//console.log(process.getgroups())
});
