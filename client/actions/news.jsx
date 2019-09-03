import { BaseAction } from './base'
import { api } from '../services'

export class NewsAction extends BaseAction {
    constructor() {
        super("news", api.news)
    }
} 