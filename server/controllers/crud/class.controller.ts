import * as _ from 'lodash'

import { CrudController } from '../crud.controller'
import { classService, ICrudOption, classTimeTableService, timeTableItemService, studentTimeTableService, teacherService } from '../../services/index'
import { ClassTimeTable, ClassModel, ClassTimeTableModel, TimeTableItemModel } from '../../models';


export class ClassController extends CrudController<typeof classService>{
    constructor() {
        super(classService);
    }
    async changeClassStatus(params: {
        classId: string
        status: "active" | "deactive"
    }) {
        // const classInfo = await classService.getItem({ filter: { _id: classId } })
        const classTimeTable: ClassTimeTableModel = await classTimeTableService.getItem({ filter: { class: params.classId } })
        await timeTableItemService.model.update({ _id: { $in: classTimeTable.items } }, { status: params.status }, { multi: true })
        await classTimeTable.update({ status: params.status }).exec()
        return await this.service.update({
            status: params.status
        }, { filter: { _id: params.classId } })
    }
    async create(params: any, option?: ICrudOption) {
        const classData: ClassModel = await this.service.create(params, option)
        // Tao lop dong thoi tao luon lich thoi khoa bieu cho lop do luon
        const classTimeTable: ClassTimeTableModel = await classTimeTableService.create({
            class: classData._id,
            course: classData.course,
            name: classData.name
        })
        const json = classData.toJSON()
        return _.merge({
            timeTable: classTimeTable
        }, json)
    }
    async getTimeTable(params: {
        classId: string
    }, option: ICrudOption) {
        const { classId } = params
        // Lay lich thoi khoa bieu cua lop do
        return await classTimeTableService.getItem(_.merge({
            filter: {
                class: classId
            },
            populates: ["items"]
        }, option))
    }
    async addTimeTableItem(params: {
        classId: string
        timeTableItem: {
            dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
            startTime: {
                hour: number,
                minute: number
            },
            endTime: {
                hour: number,
                minute: number
            },
            startAvailableCheckinTime: {
                hour: number,
                minute: number
            },
            endAvailabelCheckinTime?: {
                hour: number,
                minute: number
            },
            room: string
            class?: string
        }
    }) {
        const { classId, timeTableItem } = params
        // Tao mot item thoi khoa bieu
        timeTableItem.class = classId
        const timeTableItemData: TimeTableItemModel = await timeTableItemService.create(timeTableItem)
        // Cap nhat lich thoi khoa bieu them item vao danh sach cac item
        return await classTimeTableService.update({
            $push: { items: timeTableItemData._id }
        }, {
                filter: {
                    class: classId
                }
            })
    }
    async deleteTimeTableItem(params: {
        classId: string
        timeTableItemId: string
    }) {
        const { classId, timeTableItemId } = params
        // Chuyen trang thai item ve deactive xoa mem khong co xoa cung
        return await timeTableItemService.update({
            status: "deactive"
        }, {
                filter: {
                    _id: timeTableItemId
                }
            })
    }

}