const initPostState = []

const postAction = {
    fetch: "FETCH_POST",
    add: "ADD_POST",
    delete: "DELETE_POST",
    edit: "EDIT_POST"
}

const posts = (state = initPostState,  action) => {
    switch (action.type) {
        case postAction.fetch:
            state = action.payload;
            break
        case postAction.add:
            state.unshift(action.payload)
            break
        case postAction.delete:

            break
        case postAction.edit:
        
            break
    }
    return state
}

export default posts