const initBookQuoteState = []

const bookQuoteAction = {
    fetch: "FETCH_BOOKQUOTE",
    add: "ADD_BOOKQUOTE",
    delete: "DELETE_BOOKQUOTE",
    edit: "EDIT_BOOKQUOTE"
}

const bookQuotes = (state = initBookQuoteState,  action) => {
    switch (action.type) {
        case bookQuoteAction.fetch:
            state = action.payload;
            break
        case bookQuoteAction.add:
            state.unshift(action.payload)
            break
        case bookQuoteAction.delete:

            break
        case bookQuoteAction.edit:
        
            break
    }
    return state
}

export default bookQuotes