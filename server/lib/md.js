import markdownit from 'markdown-it'

const md = {
    rules: markdownit({
        html: true,
        typographer: true,
    }),
    read: markdownit({
        html: true,
        typographer: true
    })
}

export default md