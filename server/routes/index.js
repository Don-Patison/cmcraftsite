import express from 'express';
const index = express();

index.get('/', (req, res) => {
	res.render('pages/index');
})

export default index