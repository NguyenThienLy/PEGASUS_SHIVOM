
import { CrudService, ICrudExecOption, ICrudOption } from './crudService'
import { UtilService } from './utilService'
import { ErrorService } from './errorService'
import { TokenService } from './tokenService'

import { BlogService } from './crud/blogService'
import { NewsService } from './crud/newsService'
import { AdminService } from './crud/adminService'
import { CheckinService } from './crud/checkinService'
import { ClassService } from './crud/classService'
import { ContactService } from './crud/contactService'
import { CourseService } from './crud/courseService'
import { ClassStudentService } from './crud/classStudentService'
import { NewCategoryService } from './crud/newCategoryService'
import { PackageService } from './crud/packageService'
import { SkillService } from './crud/skillService'
import { TeacherService } from './crud/teacherService'
import { StudentService } from './crud/studentService'
import { TimeTableService } from './crud/timeTableService'
import { TimeTableItemService } from './crud/timeTableItemService'


const utilService = new UtilService()
const errorService = new ErrorService()
const tokenService = new TokenService()

const blogService = new BlogService()
const newsService = new NewsService()
const adminService = new AdminService()
const checkinService = new CheckinService()
const classService = new ClassService()
const contactService = new ContactService()
const courseService = new CourseService()
const classStudentService = new ClassStudentService()
const newCategoryService = new NewCategoryService()
const packageService = new PackageService()
const skillService = new SkillService()
const teacherService = new TeacherService()
const studentService = new StudentService()
const timeTableService = new TimeTableService()
const timeTableItemService = new TimeTableItemService()

export {
    CrudService, ICrudExecOption, ICrudOption,
    utilService,
    errorService,
    tokenService,

    blogService,
    newsService,
    adminService,
    checkinService,
    classService,
    contactService,
    courseService,
    classStudentService,
    newCategoryService,
    packageService,
    skillService,
    teacherService,
    studentService,
    timeTableItemService,
    timeTableService
}