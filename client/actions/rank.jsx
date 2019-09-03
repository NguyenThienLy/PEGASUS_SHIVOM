import { BaseAction } from './base'
import { api } from '../services'

export class RankAction extends BaseAction {
    constructor() {
        super("rank", api.rank)
    }
}