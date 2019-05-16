

const initUserState = {
    
}

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
            state = {}
            break
    }
    return state
}

export default user