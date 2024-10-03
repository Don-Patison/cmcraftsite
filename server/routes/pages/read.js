import { Router } from 'express'
const read = Router()

import fs from 'fs'
import md from "#lib/md"

const html = { }

read.get('/:url', (req, res) => {

    fs.readdirSync('public/read').forEach(file => {
        const page = file.replace('.md', '');
        html[page] = md.read.render(fs.readFileSync(`public/read/${file}`, 'utf-8'));
    });
	
	const url = req.params.url
	
	res.render('pages/read', {
		req,
		text: html[url]
	})

})

export default read