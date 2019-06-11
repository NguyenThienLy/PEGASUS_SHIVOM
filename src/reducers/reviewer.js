const initReviewerState = []

const reviewerAction = {
    fetch: "FETCH_REVIEWER",
    add: "ADD_REVIEWER",
    delete: "DELETE_REVIEWER",
    edit: "EDIT_REVIEWER"
}

const reviewers = (state = initReviewerState,  action) => {
    switch (action.type) {
        case reviewerAction.fetch:
            state = action.payload;
            break
        case reviewerAction.add:
            state.unshift(action.payload)
            break
        case reviewerAction.delete:

            break
        case reviewerAction.edit:
        
            break
    }
    return state
}

export default reviewers