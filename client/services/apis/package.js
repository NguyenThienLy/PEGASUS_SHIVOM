import { CrudApi } from '../crud'

export class PackageApi extends CrudApi {
    constructor() {
        super("package")
    }
}