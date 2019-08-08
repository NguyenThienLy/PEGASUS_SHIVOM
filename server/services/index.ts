
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
import { TimeTableItemService } from './crud/timeTableItemService'
import { RoomService } from './crud/roomService'
import { ClassTimeTableService } from './crud/classTimeTableService'
import { StudentTimeTableService } from './crud/studentTimeTableService'
import { RankService } from './crud/rankService'
import { StatisticStudentService } from './crud/statisticStudentService'
import { StatisticClassService } from './crud/statisticClassService'


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
const timeTableItemService = new TimeTableItemService()
const roomService = new RoomService()
const classTimeTableService = new ClassTimeTableService()
const studentTimeTableService = new StudentTimeTableService()
const rankService = new RankService()
const statisticStudentService = new StatisticStudentService()
const statisticClassService = new StatisticClassService()

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
    roomService,
    classTimeTableService,
    studentTimeTableService,
    rankService,
    statisticStudentService,
    statisticClassService
}