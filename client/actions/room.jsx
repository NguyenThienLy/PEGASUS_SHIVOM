import { BaseAction } from './base'
import { api } from '../services'

export class RoomAction extends BaseAction {
    constructor() {
        super("room", api.room)
    }
}