import { BaseAction } from "./base";

import { AdminAction } from "./admin";
import { ClassAction } from "./class";
import { ClassTimeTableAction } from "./classTimeTable";
import { ContactAction } from "./contact";
import { CourseAction } from "./course";
import { EventAction } from "./event";
import { FeedbackAction } from "./feedback";
import { GalleryAction } from "./gallery";
import { MasonryHomeAction } from "./masonryHome";
import { NewCategoryAction } from "./newCategory";
import { NewsAction } from "./news";
import { PromotionAction } from "./promotion";
import { RankAction } from "./rank";
import { SkillAction } from "./skill";
import { StudentAction } from "./student";
import { StudentTimeTableAction } from "./studentTimeTable";
import { TeacherAction } from "./teacher";
import { TesmonialAction } from "./tesmonial";
import { TimeTableItemAction } from "./timeTableItem";
import { SliderAction } from "./slider";
import { SettingAction } from "./setting";
import { TimeTableAction } from "./timeTable";
import { StatisticCourseAction } from "./statisticCourse";
import { StatisticStudentAction } from "./statisticStudent";
import { StudentAccountAction } from './studentAccount'


class action {
  constructor() {
  }
  static admin = new AdminAction()
  static class = new ClassAction()
  static classTimeTable = new ClassTimeTableAction()
  static contact = new ContactAction()
  static course = new CourseAction()
  static event = new EventAction()
  static feedback = new FeedbackAction()
  static gallery = new GalleryAction()
  static masonryHome = new MasonryHomeAction()
  static newCategory = new NewCategoryAction()
  static news = new NewsAction()
  static promotion = new PromotionAction()
  static rank = new RankAction()
  static skill = new SkillAction()
  static student = new StudentAction()
  static studentTimeTable = new StudentTimeTableAction()
  static teacher = new TeacherAction()
  static tesmonial = new TesmonialAction()
  static timeTableItem = new TimeTableItemAction()
  static slider = new SliderAction()
  static setting = new SettingAction()
  static timeTable = new TimeTableAction()
  static studentAccount = new StudentAccountAction()
  static statisticCourse = new StatisticCourseAction();
  static statisticStudent = new StatisticStudentAction();
}
import { from } from "rxjs";

export { action };
