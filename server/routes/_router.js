// Импорт всех обработчиков
import index from './pages/index.js'
import rules from './pages/rules.js'
import read from './pages/read.js'

// Пути обработчиков
export default {
    '/': index,
    '/rules': rules,
    '/read': read
}