import { BaseAction } from './base'
import { api } from '../services'

export class PackageAction extends BaseAction {
    constructor() {
        super("package", api.package)
    }
}