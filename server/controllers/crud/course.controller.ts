import * as _ from 'lodash'
import * as hash from 'object-hash'

import { CrudController } from '../crud.controller'

import { courseService, classTimeTableService, ICrudOption, cacheService, classService, teacherService } from '../../services/index'
import { ClassModel } from '../../models';
import { Collection } from 'mongoose'


export class CourseController extends CrudController<typeof courseService>{
    constructor() {
        super(courseService);
    }
    async getTeachersOfCourse(courseId: string, option: ICrudOption) {
        // Lay tat ca lop hoc cua khoa do voi trang thai active 
        const classies: ClassModel[] = await classService.model.find({
            course: courseId,
            status: "active"
        }).select("teacher")

        return await teacherService.getList(_.merge(option, {
            filter: {
                _id: {
                    $in: classies.map((item: any) => {
                        return item.teacher
                    })
                }
            }
        }))
    }
    async getAllTimeTable(option: ICrudOption) {
        //Lay ma hash duy nhat de query cache
        // const hashCode = hash(JSON.stringify(option))
        // // Lay du lieu trong cache
        // const cacheData = await cacheService.get(hashCode)
        // // Kiem tra cache co thi tra ve cache khong thi query lay va tao cache moi co thoi han
        // if (cacheData) {
        //     return cacheData
        // } else {
        //Lay tat ca lich thoi khoa bieu tai trung tam voi day du thong tin khoa hoc, lop, giao vien
        const classTimeTableList = await classTimeTableService.getList(_.merge({
            populates: [{ path: "items", match: { status: "active" } }, "course", { path: "class", populate: ["teacher"] }]
        }, option))
        // function setCache() {
        //     const classTimeTablesAsJson = classTimeTableList.rows.map((item: any) => { return item.toJSON() })
        //     cacheService.set(hashCode, { count: classTimeTableList.count, rows: classTimeTablesAsJson }, { ttl: 3600 })
        // }
        // setCache()
        return classTimeTableList
        //}
    }
    async getTimeTableOfCourse(params: {
        courseId: string
        isRefresh: boolean
    }, option: ICrudOption) {
        const hashCode = hash(JSON.stringify(_.merge(params, option)))
        // Lay du lieu trong cache
        const cacheData = await cacheService.get(hashCode)
        // Kiem tra cache co thi tra ve cache khong thi query lay va tao cache moi co thoi han
        if (cacheData && !params.isRefresh) {
            return cacheData
        } else {

            const { courseId } = params
            // Lay thoi khoa bieu cua mot khoa voi thong tin lop va giao vien cua lop
            const { rows: classTimeTables } = await classTimeTableService.getList(_.merge({
                filter: {
                    course: courseId,
                    status: "active"
                },
                populates: [
                    {
                        path: "items",
                        select: "startTime endTime dayOfWeek topic",
                        match: { status: "active" }
                    }, {
                        path: "class",
                        select: "name shortDescription",
                        populate: [{ path: "teacher", select: "firstName lastName avatar shortDescription" }]
                    }
                ]
            }, option))
            function setCache() {
                const classTimeTablesAsJson = classTimeTables.map((item: any) => { return item.toJSON() })
                cacheService.set(hashCode, classTimeTablesAsJson, { ttl: 3600 })
            }
            setCache()
            return classTimeTables
        }
    }
}