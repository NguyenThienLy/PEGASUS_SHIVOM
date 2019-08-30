import { CrudService } from '../crud.service'
import { Tesmonial, TesmonialModel } from '../../models'

export class TesmonialService extends CrudService <typeof Tesmonial > {
    constructor() {
        super(Tesmonial);
    }
}