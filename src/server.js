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
            this.app.render(req, res, '/')
        })
        this.server.get('/home', (req, res) => {
            this.app.render(req, res, '/home')
        })
    }
    async initServer() {
        this.server.listen(this.port, (err) => {
            console.log("Server listening on port ", this.port)
        })
    }
}
const server = new Server()
