import { BaseAction } from "./base";
import { api } from "../services";

export class StatisticStudentAction extends BaseAction {
  constructor() {
    super("statisticStudent", api.statisticStudent);
  }
}
