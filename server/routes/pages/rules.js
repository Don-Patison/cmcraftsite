import { Router } from 'express'
const rules = Router()

import fs from 'fs'
import md from "#lib/md"

import categories from "#public/rules/rules.json"  with { type: "json" }

const html = { }

for (const category of categories) {
	html[category.url] = md.rules.render(fs.readFileSync(`public/rules/${category.url}.md`, 'utf8'))
}

rules.get('/:url?', (req, res) => {
	
	const url = req.params.url || 'general'
	
	res.render('pages/rules', {
		req,
		categories,
		text: html[url]
	})

})

export default rules;