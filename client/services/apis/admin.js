import { CrudApi } from "../crud";

export class AdminApi extends CrudApi {
  constructor() {
    super("admin");
  }
}
