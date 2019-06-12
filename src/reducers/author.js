// const initAuthorState = []

// const authorAction = {
//     fetch: "FETCH_AUTHOR",
//     add: "ADD_AUTHOR",
//     delete: "DELETE_AUTHOR",
//     edit: "EDIT_AUTHOR"
// }

// const authors = (state = initAuthorState,  action) => {
//     switch (action.type) {
//         case authorAction.fetch:
//             state = action.payload;
//             break
//         case authorAction.add:
//             state.unshift(action.payload)
//             break
//         case authorAction.delete:

//             break
//         case authorAction.edit:
        
//             break
//     }
//     return state
// }

// export default authors



import { BaseReducer } from './base'

export class AuthorReducer extends BaseReducer {
    constructor(){
        super("AUTHOR")
    }  
}