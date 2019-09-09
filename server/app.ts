const next = require('next');
const path = require('path');
const LRUCache = require('lru-cache')
const express = require('express')

import * as cors from 'cors'
import * as mongoose from 'mongoose'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import { config } from './config'

import api from './routers'


class Server {
    constructor() {
        this.dev = process.env.NODE_ENV === 'production' ? false : true;
        this.quiet = process.env.NODE_ENV === 'production' ? false : true;
        this.app = next({ dev: this.dev, dir: './client', quiet: this.quiet });
        this.handle = this.app.getRequestHandler();
        //  this.port = process.env.PORT || 4000;
        this.port = 4000;
        this.server = express();
        this.initDB();
        this.initMiddlewares();
        this.initView();
        this.initRoute();
        this.initStatisFolder();
        this.init();
    }
    dev: boolean
    quiet: boolean
    app: any
    handle: any
    port: any
    server: any

    async initDB() {
        mongoose.connect(config.database.mongo, {
            useNewUrlParser: true,
            useFindAndModify: false
        });
    }

    async initMiddlewares() {
        this.server.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());

    }
    async initRoute() {
        this.server.use('/api/*', cors())
        this.server.use('/api', api)
    }

    async initStatisFolder() {

    }
    async initView() {

        this.server.use(express.static('../client/assets'));
        this.server.set('view engine', 'html');
    }

    async init() {
        this.app.prepare().then(() => {
            this.handleRequest();
            this.server.get('*', (req, res) => {
                return this.handle(req, res);
            });
            this.initServer();
        });
    }

    async handleRequest() {

        this.server.get('/', (req, res) => {
            this.app.render(req, res, '/index');
        });
        this.server.get('/bai-viet', (req, res) => {
            this.app.render(req, res, '/blog/blog');
        });
        this.server.get('/bai-viet/:slug', (req, res) => {
            this.app.render(req, res, '/post/post', { slug: req.params.slug });
        });
        this.server.get('/khoa-hoc/:slug', (req, res) => {
            this.app.render(req, res, '/course/course', { slug: req.params.slug });
        });
        this.server.get('/khoa-hoc', (req, res) => {
            this.app.render(req, res, '/allCourses/allCourses');
        });
        this.server.get('/du-an', (req, res) => {
            this.app.render(req, res, '/project/project');
        });
        this.server.get('/gioi-thieu', (req, res) => {
            this.app.render(req, res, '/about/about');
        });
        this.server.get('/lien-he', (req, res) => {
            this.app.render(req, res, '/contact/contact');
        });
        this.server.get('*', (req, res) => {
            this.app.render(req, res, '/_error/_error');
        });
    }

    async initServer() {
        this.server.listen(this.port, (err) => {
            console.log('Server listening on port ', this.port);
        });
    }
}

const server = new Server();
