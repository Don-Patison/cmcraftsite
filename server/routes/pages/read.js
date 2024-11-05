import { Router } from 'express'
const read = Router()

import fs from 'fs'
import md from "#lib/md"
import ejs from "ejs"

const files = fs.readdirSync('public/read')
	.filter(file => (/\.md$/i).test(file))
	.map(file => file.replaceAll(/\.md$/ig, ''))

read.get('/:url', (req, res) => {

	if (files.includes(req.params.url)) {

		const html = md.read.render(fs.readFileSync(`public/read/${req.params.url}.md`, 'utf-8'));
		const injected = ejs.render(html.replaceAll('&lt;', '<').replaceAll('&gt;', '>'), { req, ...res.locals })
		
		res.render('pages/read', {
			req,
			text: injected
		})

	} else {
		res.status(404).render('pages/not-found', { req })
	}


})

export default read