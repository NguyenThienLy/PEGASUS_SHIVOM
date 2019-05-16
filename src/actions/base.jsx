export default class BaseAction {
    constructor(name) {
        this.name = name.toUpperCase()
    }
    name
    fetch(data) {
        return {
            type: `FETCH_${this.name}`,
            payload: data
        }
    }
    delete(id) {
        return {
            type: `DELETE_${this.name}`,
            payload: id
        }
    }
    add(body) {
        return {
            type: `ADD_${this.name}`,
            payload: body
        }
    }
    unshift(body) {
        return {
            type: `UNSHIFT_${this.name}`,
            payload: body
        }
    }
    getItem(body) {
        return {
            type: `GET_${this.name}`,
            payload: body
        }
    }
    update(body) {
        return {
            type: `EDIT_${this.name}`,
            payload: body
        }
    }
}
