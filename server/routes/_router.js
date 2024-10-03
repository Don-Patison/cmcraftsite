import { Router } from 'express'
const router = Router()

// Импорт всех обработчиков
import index from './pages/index.js'
import rules from './pages/rules.js'
import read from './pages/read.js'

// Пути обработчиков
const routes = {
    '/': index,
    '/rules': rules,
    '/read': read
}

// Привязываем обработчики к путям
for (const [path, route] of Object.entries(routes)) {
	router.use(path, route)
}
export { router }