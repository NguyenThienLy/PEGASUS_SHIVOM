import { combineReducers } from "redux";
import { PostReducer } from './post'
import { AdminReducer } from './admin'
import { ClassReducer } from './class'
import { ClassTimeTableReducer } from './classTimeTable'
import { ContactReducer } from './contact'
import { CourseReducer } from './course'
import { EventReducer } from './event'
import { FeedbackReducer } from './feedback'
import { GalleryReducer } from './gallery'
import { MasonryHomeReducer } from './masonryHome'
import { NewCategoryReducer } from './newCategory'
import { NewsReducer } from './news'
import { PromotionReducer } from './promotion'
import { RankReducer } from './rank'
import { SkillReducer } from './skill'
import { SliderReducer } from './slider'
import { StudentReducer } from './student'
import { StudentTimeTableReducer } from './studentTimeTable'
import { TeacherReducer } from './teacher'
import { TesmonialReducer } from './tesmonial'
import { TimeTableItemReducer } from './timeTableItem'
import { SettingReducer } from './setting'
import { TimeTableReducer } from './timeTable'
import { StudentAccountReducer } from './studentAccount'
import { PackageReducer } from './package'
import { RoomReducer } from './room'

import { StatisticCourseReducer } from "./statisticCourse";
import { StatisticStudentReducer } from "./statisticStudent";

const postReducer = new PostReducer()
const adminReducer = new AdminReducer()
const classReducer = new ClassReducer()
const classTimeTableReducer = new ClassTimeTableReducer()
const contactReducer = new ContactReducer()
const courseReducer = new CourseReducer()
const eventReducer = new EventReducer()
const feedbackReducer = new FeedbackReducer()
const galleryReducer = new GalleryReducer()
const masonryHomeReducer = new MasonryHomeReducer()
const newCategoryReducer = new NewCategoryReducer()
const newsReducer = new NewsReducer()
const promotionReducer = new PromotionReducer()
const rankReducer = new RankReducer()
const skillReducer = new SkillReducer()
const sliderReducer = new SliderReducer()
const studentReducer = new StudentReducer()
const studentTimeTableReducer = new StudentTimeTableReducer()
const teacherReducer = new TeacherReducer()
const tesmonialReducer = new TesmonialReducer()
const timeTableItemReducer = new TimeTableItemReducer()
const settingReducer = new SettingReducer()
const timeTableReducer = new TimeTableReducer()
const studentAccountReducer = new StudentAccountReducer()
const packageReducer = new PackageReducer()
const roomReducer = new RoomReducer()

const statisticCourseReducer = new StatisticCourseReducer();
const statisticStudentReducer = new StatisticStudentReducer();

const store = combineReducers({
  admin: adminReducer.reducer,
  classes: classReducer.reducer,
  classTimeTables: classTimeTableReducer.reducer,
  contacts: contactReducer.reducer,
  courses: courseReducer.reducer,
  events: eventReducer.reducer,
  feedbacks: feedbackReducer.reducer,
  galleries: galleryReducer.reducer,
  masonryHomes: masonryHomeReducer.reducer,
  newCategories: newCategoryReducer.reducer,
  news: newsReducer.reducer,
  promotions: promotionReducer.reducer,
  ranks: rankReducer.reducer,
  skills: skillReducer.reducer,
  sliders: sliderReducer.reducer,
  students: studentReducer.reducer,
  studentTimeTables: studentTimeTableReducer.reducer,
  teachers: teacherReducer.reducer,
  tesmonials: tesmonialReducer.reducer,
  timeTableItems: timeTableItemReducer.reducer,
  setting: settingReducer.reducer,
  timeTable: timeTableReducer.reducer,
  studentAccount: studentAccountReducer.reducer,
  statisticCourse: statisticCourseReducer.reducer,
  statisticStudent: statisticStudentReducer.reducer,
  package: packageReducer.reducer,
  room: roomReducer.reducer
})

export default store;
