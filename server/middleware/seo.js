import { Router } from "express"
const router = Router()

import config from '#config'
const { SEO } = config

router.use((req, res, next) => {
    res.locals.SEO = SEO
    next()
})

export default router