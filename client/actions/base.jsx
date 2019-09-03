import { api } from '../services'
import { configureStore } from '../store'

const store = configureStore()
// export class BaseDispatch {
//     constructor()
// }

export class BaseAction {
    constructor(name, api) {
        this.name = name.toUpperCase()
        this.api = api
        this.store = store.getState()
        // this.fetch.prototype.customBind = (store) => {
        //     this.store = store
        // }
        // this.fetch.prototype.customBind(store.getState())
    }
    fetch = (option = {}) => {

        return dispatch => {
            dispatch(this.fetchPending())
            api.class.getList(option)
                .then(res => {
                    console.log("result: ", res)
                    dispatch(this.fetchSuccess(res.results.objects.rows))
                    return res
                })
                .catch(error => {
                    console.log("err: ", error)
                    dispatch(this.fetchError(error))
                })
        }
    }

    fetchPending() {
        return {
            type: `FETCH_${this.name}_PENDING`
        }
    }
    fetchSuccess(data) {
        return {
            type: `FETCH_${this.name}_SUCCESS`,
            payload: data
        }
    }
    fetchError(error) {
        return {
            type: `FETCH_${this.name}_ERROR`,
            payload: error
        }
    }
    delete(id, option = {}) {
        return dispatch => {
            dispatch({
                type: `DELETE_${this.name}_PENDING`,
                payload: id
            })
            api.class.delete(id, option)
                .then(res => {
                    console.log("result: ", res)
                    dispatch({
                        type: `DELETE_${this.name}_SUCCESS`,
                        payload: res.result.object
                    })
                    return res
                })
                .catch(error => {
                    console.log("err: ", error)
                    dispatch({
                        type: `DELETE_${this.name}_ERROR`,
                        payload: error
                    })

                })
        }

    }
    add(body, option = {}) {
        return dispatch => {
            dispatch({
                type: `ADD_${this.name}_PENDING`,
                payload: id
            })
            api.class.add(body, option)
                .then(res => {
                    console.log("result: ", res)
                    dispatch({
                        type: `ADD_${this.name}_SUCCESS`,
                        payload: res.result.object
                    })
                    return res
                })
                .catch(error => {
                    console.log("err: ", error)
                    dispatch({
                        type: `ADD_${this.name}_ERROR`,
                        payload: error
                    })

                })
        }
    }
    unshift(body) {
        return {
            type: `UNSHIFT_${this.name}`,
            payload: body
        }
    }
    getItem(id, option) {
        return dispatch => {
            dispatch({
                type: `GET_${this.name}_PENDING`,
                payload: id
            })
            api.class.getItem(id, option)
                .then(res => {
                    console.log("result: ", res)
                    dispatch({
                        type: `GET_${this.name}_SUCCESS`,
                        payload: res.result.object
                    })
                    return res
                })
                .catch(error => {
                    console.log("err: ", error)
                    dispatch({
                        type: `GET_${this.name}_ERROR`,
                        payload: error
                    })

                })
        }
    }
    update(id, body, option = {}) {
        return dispatch => {
            dispatch({
                type: `UPDATE_${this.name}_PENDING`,
                payload: id
            })
            api.class.update(id, body, option)
                .then(res => {
                    console.log("result: ", res)
                    dispatch({
                        type: `UPDATE_${this.name}_SUCCESS`,
                        payload: res.result.object
                    })
                    return res
                })
                .catch(error => {
                    console.log("err: ", error)
                    dispatch({
                        type: `UPDATE_${this.name}_ERROR`,
                        payload: error
                    })

                })
        }
    }
    concat(option) {
        return dispatch => {
            dispatch({
                type: `CONCAT_${this.name}_PENDING`,
                payload: id
            })
            api.class.getList(option)
                .then(res => {
                    console.log("result: ", res)
                    dispatch({
                        type: `CONCAT_${this.name}_SUCCESS`,
                        payload: res.result.object
                    })
                    return res
                })
                .catch(error => {
                    console.log("err: ", error)
                    dispatch({
                        type: `CONCAT_${this.name}_ERROR`,
                        payload: error
                    })

                })
        }
    }
}
