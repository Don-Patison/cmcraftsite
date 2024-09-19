import { Router } from 'express'
const router = Router('/rules')

import fs from 'fs'
import md from "#lib/md"

import rules from "#public/rules/rules.json" assert {type: 'json'}

const html = { }

for (const rule of rules) {
	html[rule.url] = md.rules.render(fs.readFileSync(`public/rules/${rule.url}.md`, 'utf8'))
}

router.get('/:url?', (req, res) => {
	
	const url = req.params.url || 'general'
	
	res.render('pages/rules', {
		req,
		categories: rules,
		text: html[url]
	})

})

export default router;