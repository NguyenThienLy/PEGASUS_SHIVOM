const initCategoryState = []

const categoryAction = {
    fetch: "FETCH_CATEGORY",
    add: "ADD_CATEGORY",
    delete: "DELETE_CATEGORY",
    edit: "EDIT_CATEGORY"
}

const categories = (state = initCategoryState,  action) => {
    switch (action.type) {
        case categoryAction.fetch:
            state = action.payload;
            break
        case categoryAction.add:
            state.unshift(action.payload)
            break
        case categoryAction.delete:

            break
        case categoryAction.edit:
        
            break
    }
    return state
}

export default categories