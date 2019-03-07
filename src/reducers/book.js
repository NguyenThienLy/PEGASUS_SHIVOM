const initBookState = [{
    _id: "1",
    name: "Init book"
}]

const bookAction = {
    fetch: "FETCH_BOOK",
    add: "ADD_BOOK",
    delete: "DELETE_BOOK",
    edit: "EDIT_BOOK"
}

const books = (state = initBookState,  action) => {
    switch (action.type) {
        case bookAction.fetch:
            state = action.payload;
            break
        case bookAction.add:
            state.unshift(action.payload)
            break
        case bookAction.delete:

            break
        case bookAction.edit:
        
            break
    }
    return state
}

export default books