import { BaseAction } from './base'

import { UserAction } from './user'

class action {
    constructor() {

    }
  
    static user = new UserAction()
}

export {
    action
}
