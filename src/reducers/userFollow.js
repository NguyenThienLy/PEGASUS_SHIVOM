const initUserFollowState = []

const userFollowAction = {
    fetch: "FETCH_USERFOLLOW",
    add: "ADD_USERFOLLOW",
    delete: "DELETE_USERFOLLOW",
    edit: "EDIT_USERFOLLOW"
}

const userFollows = (state = initUserFollowState,  action) => {
    switch (action.type) {
        case userFollowAction.fetch:
            state = action.payload;
            break
        case userFollowAction.add:
            state.unshift(action.payload)
            break
        case userFollowAction.delete:

            break
        case userFollowAction.edit:
        
            break
    }
    return state
}

export default userFollows