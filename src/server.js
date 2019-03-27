const express = require('express')
const next = require('next')
const path = require('path')

// import { firebaseAuthentication } from './authentication/index'

const firebaseAuthentication = require('./authentication/firebase')


class Server {
    constructor() {
        this.dev = process.env.NODE_ENV === "production" ? false : true
        this.app = next({ dev: this.dev, dir: './src' })
        this.handle = this.app.getRequestHandler()
        this.port = process.env.PORT || 3000
        this.server = express()
        this.initStatisFolder()
        this.init()
    }
    async initStatisFolder() {
        this.server.use(
            express.static(path.join(__dirname, "./assets"), { maxAge: 31557600000 })
        )
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

    async authenticated(req, res, next) {
        console.log("vo day")
        const isLogin = await firebaseAuthentication.authenticated
        req.isLogin = isLogin
        if (isLogin === undefined) {
            return this.authenticated(req, res, next)
        } else {
            next()
        }
    }


    async handleRequest() {
        this.server.get('/', (req, res) => {
            console.log("reload home: ")
            this.app.render(req, res, '/index')
        })
        this.server.get('/bai-viet', (req, res) => {
            this.app.render(req, res, '/posts/posts')
        })
        this.server.get('/bai-viet/:postId', (req, res) => {
            this.app.render(req, res, '/post/post')
        })
        this.server.get('/sach', (req, res) => {
            console.log("reload sach")
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
            console.log("reload profile")
            this.app.render(req, res, '/profile/profile')
        })
        this.server.get('/login', (req, res) => {
            this.app.render(req, res, '/login/login')
        })
        this.server.get('*', (req, res) => {
            this.app.render(req, res, '/_error/_error')
        })

    }
    async initServer() {
        this.server.listen(this.port, (err) => {
            console.log("Server listening on port ", this.port)
        })
    }
}
const server = new Server()
