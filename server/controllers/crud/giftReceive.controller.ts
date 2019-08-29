import { CrudController } from '../crud.controller'
import { giftReceiveService, errorService, studentService } from '../../services/index'
import { GiftReceiveModel } from '../../models';


export class GiftReceiveController extends CrudController<typeof giftReceiveService>{
    constructor() {
        super(giftReceiveService);
    }
    async receiveGift(params: {
        giftReceiveId: string
    }) {
        const giftReceiveInfo: GiftReceiveModel = await giftReceiveService.getItem({
            filter: {
                _id: params.giftReceiveId
            },
            populates: [{
                path: "gift",
                select: "point"
            }]
        })
        if (giftReceiveInfo.isReceived) {
            throw errorService.giftReceive.alreadyReceived()
        }
        await studentService.update({
            $inc: { point: - giftReceiveInfo.amount }
        }, { filter: { _id: giftReceiveInfo.student } })
        return await this.service.update({
            isReceived: true,
            receiveAt: new Date()
        }, {
                filter: {
                    _id: params.giftReceiveId
                }
            })
    }
}