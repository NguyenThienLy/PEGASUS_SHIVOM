
import { CrudService, ICrudExecOption, ICrudOption } from './crud.service'
import { UtilService } from './util.service'
import { ErrorService } from './error.service'
import { TokenService } from './token.service'
import { CronJobService } from './cronjob/cronjob.service'
import { CacheService } from './cache/cache.service'
import { MailService } from './mail/mail.service'

import { BlogService } from './crud/blog.crud.service'
import { NewsService } from './crud/news.crud.service'
import { AdminService } from './crud/admin.crud.service'
import { CheckinService } from './crud/checkin.crud.service'
import { ClassService } from './crud/class.crud.service'
import { ContactService } from './crud/contact.crud.service'
import { CourseService } from './crud/course.crud.service'
import { CourseStudentService } from './crud/courseStudent.crud.service'
import { NewCategoryService } from './crud/newCategory.crud.service'
import { PackageService } from './crud/package.crud.service'
import { SkillService } from './crud/skill.crud.service'
import { TeacherService } from './crud/teacher.crud.service'
import { StudentService } from './crud/student.crud.service'
import { TimeTableItemService } from './crud/timeTableItem.crud.service'
import { RoomService } from './crud/room.crud.service'
import { ClassTimeTableService } from './crud/classTimeTable.crud.service'
import { StudentTimeTableService } from './crud/studentTimeTable.crud.service'
import { RankService } from './crud/rank.crud.service'
import { StatisticStudentService } from './crud/statisticStudent.crud.service'
import { StatisticCourseService } from './crud/statisticCourse.crud.service'
import { SliderService } from './crud/slider.crud.service'
import { FeedbackService } from './crud/feedback.crud.service'
import { RegisCourseService } from './crud/regisCourse.crud.service'
import { SettingService } from './crud/setting.crud.service'
import { GiftService } from './crud/gift.crud.service'
import { EventService } from './crud/event.crud.service'
import { PromotionService } from './crud/promotion.crud.service'
import { GiftReceiveService } from './crud/giftReceive.crud.service'
import { GalleryService } from './crud/gallery.crud.service'
import { TesmonialService } from './crud/tesmonial.crud.service'
import { MasonryHomeService } from './crud/masonryHome.crud.service'
import { ActivityService } from './crud/activity.crud.service'


const utilService = new UtilService()
const errorService = new ErrorService()
const tokenService = new TokenService()
const cronJobService = new CronJobService()
const cacheService = new CacheService()
const mailService = new MailService()

const blogService = new BlogService()
const newsService = new NewsService()
const adminService = new AdminService()
const checkinService = new CheckinService()
const classService = new ClassService()
const contactService = new ContactService()
const courseService = new CourseService()
const courseStudentService = new CourseStudentService()
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
const statisticCourseService = new StatisticCourseService()
const sliderService = new SliderService()
const feedbackService = new FeedbackService()
const regisCourseService = new RegisCourseService()
const settingService = new SettingService()
const promotionService = new PromotionService()
const eventService = new EventService()
const giftService = new GiftService()
const giftReceiveService = new GiftReceiveService()
const galleryService = new GalleryService()
const tesmonialService = new TesmonialService()
const masonryHomeService = new MasonryHomeService()
const activityService = new ActivityService()


export {
    CrudService, ICrudExecOption, ICrudOption,
    utilService,
    errorService,
    tokenService,
    cronJobService,
    cacheService,
    mailService,

    blogService,
    newsService,
    adminService,
    checkinService,
    classService,
    contactService,
    courseService,
    courseStudentService,
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
    regisCourseService,
    feedbackService,
    statisticCourseService,
    sliderService,
    settingService,
    promotionService,
    giftService,
    eventService,
    giftReceiveService,
    galleryService,
    tesmonialService,
    masonryHomeService,
    activityService
}