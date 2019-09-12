import { BaseAction } from './base'
import { api } from '../services'

export class MasonryHomeAction extends BaseAction {
    constructor() {
        super("masonryHome", api.masonryHome, "masonryHomes")
    }
}