const initUserSavedState = []

const userSavedAction = {
    fetch: "FETCH_USERSAVED",
    add: "ADD_USERSAVED",
    delete: "DELETE_USERSAVED",
    edit: "EDIT_USERSAVED"
}

const userSaveds = (state = initUserSavedState,  action) => {
    switch (action.type) {
        case userSavedAction.fetch:
            state = action.payload;
            break
        case userSavedAction.add:
            state.unshift(action.payload)
            break
        case userSavedAction.delete:

            break
        case userSavedAction.edit:
        
            break
    }
    return state
}

export default userSaveds