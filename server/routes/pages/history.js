import { Router } from 'express';
const history = Router();

import days from '#server/data/annals'

history.get('/', (req, res) => {
	res.render('pages/history', { req, days: [
		...days,
		{ date: new Date(), events: [ { title: 'Сегодня', description: '📍 Вы здесь.' } ] }
	] });
})

export default history