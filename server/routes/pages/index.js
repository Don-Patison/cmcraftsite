import { Router } from 'express';
const index = Router();

import fs from "fs";

index.get('/', (req, res) => {
	res.locals.formsPerMonth = +fs.readFileSync('/var/minecraft/last_months_forms', 'utf8')
	const lastMonth = new Date()
	lastMonth.setMonth(lastMonth.getMonth() - 1)
	res.locals.currentMonth = lastMonth.toLocaleString('ru', { month: 'long' });
	res.render('pages/index', { req });
})

export default index