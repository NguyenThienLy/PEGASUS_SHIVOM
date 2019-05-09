

const initUserState = {
    _id: "1",
    name: "Vũ Hoài Nam",
    isLogin: false
}

const userAction = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT"
}

const user = (state = initUserState,  action) => {
    switch (action.type) {
        case userAction.LOGIN:
            state.isLogin = true
            break
        case userAction.LOGOUT:
            state.isLogin = false
    }
    return state
}

export default user