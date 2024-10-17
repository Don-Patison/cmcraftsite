import { Router } from "express"
const router = Router()

import config from '#config'
const { minecraft } = config

router.use((req, res, next) => {
    res.locals.minecraft = minecraft
    next()
})

export default router