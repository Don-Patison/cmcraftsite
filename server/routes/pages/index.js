import { Router } from 'express';
const index = Router();

import apicache from 'apicache'
const cache = apicache.middleware

index.get('/', cache('10 minutes'), (req, res) => {
	res.render('pages/index', { req });
})

export default index