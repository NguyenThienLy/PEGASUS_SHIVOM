
import { BaseReducer } from './base'

export class CourseReducer extends BaseReducer {
    constructor() {
        super("course")
        this.customActions = {
            getTimeTableOfCousePending: `${this.name}_GET_TIME_TABLE_OF_COURSE_PENDING`,
            getTimeTableOfCouseSuccess: `${this.name}_GET_TIME_TABLE_OF_COURSE_SUCCESS`,
            getTimeTableOfCouseError: `${this.name}_GET_TIME_TABLE_OF_COURSE_ERROR`
        }
    }

    customReducer(state, action) {
        switch (action.type) {
            case this.customActions.getTimeTableOfCousePending:
                break
            case this.customActions.getTimeTableOfCouseSuccess:
                const itemIndex = state.items.findIndex((item) => { return item._id === action.payload[0].course })
                if (itemIndex !== -1) {
                    state.items[itemIndex].timeTables = action.payload
                }
                break
            case this.customActions.getTimeTableOfCouseError:
                console.log("error")
                break
        }
        return state
    }
}