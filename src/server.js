const express = require('express')
const next = require('next')


class Server {
    constructor() {
        this.dev = process.env.NODE_ENV === "production" ? false : true
        this.app = next({ dev: this.dev, dir: './src' })
        this.handle = this.app.getRequestHandler()
        this.port = process.env.PORT || 3000
        this.server = express()
        this.init()
    }

    async init() {
        this.app.prepare().then(() => {
            this.handleRequest()
            this.server.get('*', (req, res) => {
                return this.handle(req, res)
            })
            this.initServer()
        })
    }

    async handleRequest() {
        this.server.get('/', (req, res) => {
            this.app.render(req, res, '/home/home')
        })
        this.server.get('/bai-viet', (req, res) => {
            this.app.render(req, res, '/posts/posts')
        })
        this.server.get('/bai-viet/:postId', (req, res) => {
            this.app.render(req, res, '/post/post')
        })
        this.server.get('/sach', (req, res) => {
            this.app.render(req, res, '/books/books')
        })
        this.server.get('/sach/:bookId', (req, res) => {
            this.app.render(req, res, '/book/book')
        })
        this.server.get('/tim-kiem', (req, res) => {
            this.app.render(req, res, '/searchResult/searchResult')
        })
        this.server.get('/lien-he', (req, res) => {
            this.app.render(req, res, '/contact/contact')
        })
        this.server.get('/profile', (req, res) => {
            this.app.render(req, res, '/profile/profile')
        })

    }
    async initServer() {
        this.server.listen(this.port, (err) => {
            console.log("Server listening on port ", this.port)
        })
    }
}
const server = new Server()
