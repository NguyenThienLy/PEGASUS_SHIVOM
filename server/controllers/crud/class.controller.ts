import * as _ from 'lodash'

import { CrudController } from '../crud.controller'
import { classService, ICrudOption, classTimeTableService, timeTableItemService, studentTimeTableService, teacherService } from '../../services/index'
import { ClassTimeTable, ClassModel, ClassTimeTableModel, TimeTableItemModel } from '../../models';


export class ClassController extends CrudController<typeof classService>{
    constructor() {
        super(classService);
    }
    async create(params: any, option?: ICrudOption) {
        const classData: ClassModel = await this.service.create(params, option)
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
            dayOfWeek: "monday" | "tuesday" | "webnesday" | "thursday" | "friday" | "saturday" | "sunday",
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
        }
    }) {
        const { classId, timeTableItem } = params
        const timeTableItemData: TimeTableItemModel = await timeTableItemService.create(timeTableItem)
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
        return await timeTableItemService.update({
            status: "deactive"
        }, {
                filter: {
                    _id: timeTableItemId
                }
            })
    }

}