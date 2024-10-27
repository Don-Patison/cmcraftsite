import { Router } from 'express';
const history = Router();

import apicache from 'apicache'
const cache = apicache.middleware

import days from '#server/data/annals'

history.get('/', cache('10 minutes'), (req, res) => {
	res.render('pages/history', { req, days: [
		...days,
		{ date: new Date(), events: [ { title: 'Сегодня', description: '📍 Вы здесь.' } ] }
	] });
})

export default history