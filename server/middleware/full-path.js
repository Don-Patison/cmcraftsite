import { Router } from "express"
const router = Router()

router.use((req, res, next) => {
	const path = req.baseUrl + req.path
	req.fullPath = path.split('/').filter(s => s)
	next()
})

export default router