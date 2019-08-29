
import { CrudController } from './crud.controller';
import { WebhookController } from './webhook/webhook.controller'

import { BlogController } from './crud/blog.controller'
import { NewsController } from './crud/news.controller'
import { AdminController } from './crud/admin.controller'
import { CheckinController } from './crud/checkin.controller'
import { ClassController } from './crud/class.controller'
import { ContactController } from './crud/contact.controller'
import { CourseController } from './crud/course.controller'
import { CourseStudentController } from './crud/courseStudent.controller'
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
import { StatisticCourseController } from './crud/statisticCourse.controller'
import { SliderController } from './crud/slider.controller'
import { FeedbackController } from './crud/feedback.controller'
import { RegisCourseController } from './crud/regisCourse.controller'
import { SettingController } from './crud/setting.controller'
import { EventController } from './crud/event.controller'
import { PromotionController } from './crud/promotion.controller'
import { GiftController } from './crud/gift.controller'
import { GiftReceiveController } from './crud/giftReceive.controller'

const webhookController = new WebhookController()


const blogController = new BlogController()
const newsController = new NewsController()
const adminController = new AdminController()
const checkinController = new CheckinController()
const classController = new ClassController()
const contactController = new ContactController()
const courseController = new CourseController()
const courseStudentController = new CourseStudentController()
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
const statisticCourseController = new StatisticCourseController()
const sliderController = new SliderController()
const feedbackController = new FeedbackController()
const regisCourseController = new RegisCourseController()
const settingController = new SettingController()
const promotionController = new PromotionController()
const eventController = new EventController()
const giftController = new GiftController()
const giftReceiveController = new GiftReceiveController()

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
    courseStudentController,
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
    feedbackController,
    regisCourseController,
    statisticCourseController,
    sliderController,
    settingController,
    promotionController,
    eventController,
    giftController,
    giftReceiveController
}
