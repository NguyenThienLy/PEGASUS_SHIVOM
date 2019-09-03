import { BaseAction } from './base'
import { api } from '../services'
export class GalleryAction extends BaseAction {
    constructor() {
        super("gallery", api.gallery)
    }
}