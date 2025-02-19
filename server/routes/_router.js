import { Router } from 'express'
const router = Router()

// Импорт всех обработчиков
import index from './pages/index.js'
import rules from './pages/rules.js'
import history from './pages/history.js'
import read from './pages/read.js'

// Пути обработчиков
const routes = {
	'': index,
	'rules': rules,
	'history': history,
	'read': read
}

// Берём онлайн, тпс, аптайм
// (я не стал оформлять это в middleware, потому что пока это только впустую усложнит структуру)
import db from '#lib/db'
const getOnline = async (req, res, next) => {
	// Только в путях страниц
	if (Object.keys(routes).includes(req.fullPath[0]) || req.fullPath.length === 0) {

		// Эту сточку можно убрать когда появится новый рекорд
		const online = { record: { players: 168, date: new Date('06-26-2024') } }
		
		// Выборка максимальных значений из всех трёхчасовых интервалов за последнюю неделю
		let [recent] = await db.execute('SELECT * FROM recent_online')
		
		recent = recent.map(({ date_of_max, players, max }) => ({ 
			date: new Date(date_of_max + ':00'), players, max
		}))

		recent = Object.values(recent.reduce((acc, { date, players, max }) => {
			const timeGroup = Math.floor(date.getTime() / (3 * 3600 * 1000));
			if (!acc[timeGroup]) {
				acc[timeGroup] = { date, players, max };
			} else {
				if (players > acc[timeGroup].players) {
					acc[timeGroup] = { date, players, max };
				}
			}
			return acc;
		}, {}))
		
		online.values = recent.map(({ players }) => players)

		// Текущий онлайн и статус
		let [current] = await db.execute('SELECT * FROM online ORDER BY id DESC LIMIT 1')
		current = current[0]

		online.max = current.max
		
		if ((new Date() - current.date)/36e5 >= 0.5) {
			online.current = '?'
			online.max = '¿'
			online.status = 'unknown'
		} else if (current.status === 'down') {
			online.current = '-'
			online.max = '-'
			online.status = current.status
		} else {
			online.current = current.players
			online.status = current.status
			online.values.push(current.players)
		}

		// Рекорд
		let [record] = await db.execute('SELECT MAX(players) AS players, MAX(date) as date FROM online')
		record = record[0]

		if (record.players > online.record.players) {
			online.record = record
		}
	
		res.locals.online = online
		
		// ТПС
		let [tps] = await db.execute('SELECT * FROM tps ORDER BY date DESC LIMIT 1')
		res.locals.tps = tps[0].value
		
		// Аптайм
		let [uptime] = await db.execute('SELECT * FROM uptime ORDER BY date DESC LIMIT 1')
		res.locals.uptime = uptime[0].value
		
	}

	next()
}

// Привязываем обработчики к путям
for (const [path, route] of Object.entries(routes)) {
	router.use('/'+path, getOnline, route)
}

export { router }
