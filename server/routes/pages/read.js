import { Router } from 'express'
const read = Router()

import fs from 'fs'
import md from "#lib/md"
import ejs from "ejs"

read.get('/:url', (req, res) => {

	const html = md.read.render(fs.readFileSync(`public/read/${req.params.url}.md`, 'utf-8'));
	const injected = ejs.render(html.replaceAll('&lt;', '<').replaceAll('&gt;', '>'), { req, ...res.locals })
	
	res.render('pages/read', {
		req,
		text: injected
	})

})

export default read