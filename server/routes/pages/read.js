import { Router } from 'express'
const read = Router()

import fs from 'fs'
import md from "#lib/md"

read.get('/:url', (req, res) => {

	const html = md.read.render(fs.readFileSync(`public/read/${req.params.url}.md`, 'utf-8'));
	
	res.render('pages/read', {
		req,
		text: html
	})

})

export default read