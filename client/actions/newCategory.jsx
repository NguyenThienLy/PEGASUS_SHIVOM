import { BaseAction } from './base'
import { api } from '../services'

export class NewCategoryAction extends BaseAction {
    constructor() {
        super("newCategory", api.newCategory, "newCategories")
    }
}