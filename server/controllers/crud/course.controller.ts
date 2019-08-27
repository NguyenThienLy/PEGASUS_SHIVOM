import * as _ from 'lodash'
import * as hash from 'object-hash'

import { CrudController } from '../crud.controller'
import { courseService, classTimeTableService, ICrudOption, cacheService, classService, teacherService } from '../../services/index'
import { ClassModel } from '../../models';

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
        // Lay ma hash duy nhat de query cache
        const hashCode = hash(JSON.stringify(option))
        // Lay du lieu trong cache
        const cacheData = await cacheService.get(hashCode)
        // Kiem tra cache co thi tra ve cache khong thi query lay va tao cache moi co thoi han
        if (cacheData) {
            return cacheData
        } else {
            // Lay tat ca lich thoi khoa bieu tai trung tam voi day du thong tin khoa hoc, lop, giao vien
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
        // Lay thoi khoa bieu cua mot khoa voi thong tin lop va giao vien cua lop
        const { rows: classTimeTables } = await classTimeTableService.getList(_.merge({
            filter: {
                course: courseId,
                status: "active"
            },
            populates: ["items", { path: "class", populate: ["teacher"] }]
        }, option))
        return classTimeTables
    }
}