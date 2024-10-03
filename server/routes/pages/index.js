import { Router } from 'express';
const index = Router();

index.get('/', (req, res) => {
	res.render('pages/index', { req });
})

export default index