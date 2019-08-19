
import { CrudController } from './crud.controller';
import { WebhookController } from './webhook/webhook.controller'

import { BlogController } from './crud/blog.controller'
import { NewsController } from './crud/news.controller'
import { AdminController } from './crud/admin.controller'
import { CheckinController } from './crud/checkin.controller'
import { ClassController } from './crud/class.controller'
import { ContactController } from './crud/contact.controller'
import { CourseController } from './crud/course.controller'
import { ClassStudentController } from './crud/classStudent.controller'
import { NewCategoryController } from './crud/newCategory.controller'
import { PackageController } from './crud/package.controller'
import { SkillController } from './crud/skill.controller'
import { TeacherController } from './crud/teacher.controller'
import { StudentController } from './crud/student.controller'
import { TimeTableItemController } from './crud/timeTableItem.controller'

import { RoomController } from './crud/room.controller'
import { ClassTimeTableController } from './crud/classTimeTable.controller'
import { StudentTimeTableController } from './crud/studentTimeTable.controller'
import { RankController } from './crud/rank.controller'
import { StatisticStudentController } from './crud/statisticStudent.controller'
import { StatisticClassController } from './crud/statisticClass.controller'
import { SliderController } from './crud/slider.controller'

const webhookController = new WebhookController()


const blogController = new BlogController()
const newsController = new NewsController()
const adminController = new AdminController()
const checkinController = new CheckinController()
const classController = new ClassController()
const contactController = new ContactController()
const courseController = new CourseController()
const classStudentController = new ClassStudentController()
const newCategoryController = new NewCategoryController()
const packageController = new PackageController()
const skillController = new SkillController()
const teacherController = new TeacherController()
const studentController = new StudentController()
const timeTableItemController = new TimeTableItemController()

const roomController = new RoomController()
const classTimeTableController = new ClassTimeTableController()
const studentTimeTableController = new StudentTimeTableController()
const rankController = new RankController()
const statisticStudentController = new StatisticStudentController()
const statisticClassController = new StatisticClassController()
const sliderController = new SliderController()

export {
    CrudController,

    webhookController,

    blogController,
    newsController,
    adminController,
    checkinController,
    classController,
    contactController,
    courseController,
    classStudentController,
    newCategoryController,
    packageController,
    skillController,
    teacherController,
    studentController,
    timeTableItemController,

    roomController,
    classTimeTableController,
    studentTimeTableController,
    rankController,
    statisticStudentController,
    statisticClassController,
    sliderController
}
