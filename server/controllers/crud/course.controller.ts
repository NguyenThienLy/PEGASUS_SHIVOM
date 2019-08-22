import * as _ from 'lodash'
import * as hash from 'object-hash'

import { CrudController } from '../crud.controller'
import { courseService, classTimeTableService, ICrudOption, cacheService } from '../../services/index'

export class CourseController extends CrudController<typeof courseService>{
    constructor() {
        super(courseService);
    }
    async getAllTimeTable(option: ICrudOption) {
        const hashCode = hash(JSON.stringify(option))
        const cacheData = await cacheService.get(hashCode)
        if (cacheData) {
            return cacheData
        } else {
            const classTimeTableList = await classTimeTableService.getList(_.merge({
                populates: [{ path: "items", match: { status: "active" } }, "course", { path: "class", populate: ["teacher"] }]
            }, option))
            cacheService.set(hashCode, classTimeTableList, { ttl: 3600 })
            return classTimeTableList
        }
    }
    async getTimeTableOfCourse(params: {
        courseId: string
    }, option: ICrudOption) {
        const { courseId } = params
        const { rows: classTimeTables } = await classTimeTableService.getList(_.merge({
            filter: {
                course: courseId
            },
            populates: ["items", { path: "class", populate: ["teacher"] }]
        }, option))
        return classTimeTables
    }
}