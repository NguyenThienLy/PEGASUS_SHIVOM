
import { CrudController } from './crudController';

import { BlogController } from './crud/blogController'
import { NewsController } from './crud/newsController'
import { AdminController } from './crud/adminController'
import { CheckinController } from './crud/checkinController'
import { ClassController } from './crud/classController'
import { ContactController } from './crud/contactController'
import { CourseController } from './crud/courseController'
import { ClassStudentController } from './crud/classStudentController'
import { NewCategoryController } from './crud/newCategoryController'
import { PackageController } from './crud/packageController'
import { SkillController } from './crud/skillController'
import { TeacherController } from './crud/teacherController'
import { StudentController } from './crud/studentController'
import { TimeTableItemController } from './crud/timeTableItemController'

import { RoomController } from './crud/roomController'
import { ClassTimeTableController } from './crud/classTimeTableController'
import { StudentTimeTableController } from './crud/studentTimeTableController'
import { RankController } from './crud/rankController'
import { StatisticStudentController } from './crud/statisticStudentController'
import { StatisticClassController } from './crud/statisticClassController'
import { SliderController } from './crud/sliderController'



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
