import { BaseAction } from './base'
import { api } from '../services'

export class NewsAction extends BaseAction {
    constructor() {
        super("news", api.news, "news")
    }
    getPinnedNews = (option = { filter: {} }) => {
        return dispatch => {
            dispatch({
                type: `${this.name}_GET_PINNED_PENDING`
            })
            this.api.getList(option)
                .then(res => {
                    dispatch({
                        type: `${this.name}_GET_PINNED_SUCCESS`,
                        payload: res.results.objects.rows[0]
                    })
                    return res
                })
                .catch(error => {
                    dispatch({
                        type: `${this.name}_GET_PINNED_ERROR`,
                        payload: error
                    })
                })
        }
    }

} 