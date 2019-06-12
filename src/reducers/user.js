

const initUserState = null

const userAction = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
}

const user = (state = initUserState,  action) => {
    switch (action.type) {
        case userAction.LOGIN:
            state = action.payload
            break
        case userAction.LOGOUT:
            state = null
            break
    }
    return state
}

export default user