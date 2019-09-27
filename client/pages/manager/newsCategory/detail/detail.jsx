import * as React from "react";

import { action } from '../../../../actions'
import { api } from '../../../../services'

export class DetailNewsCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsCategory: {}
        }
    }

    async componentDidMount() {
        console.log("newsId: ", this.props.params)
        let newsCategory = this.props.newCategories.items.find((newsCategory) => { return newsCategory._id === this.props.params.newsCategoryId })
        if (!newsCategory) {
            const res = await api.newCategory.getItem(this.props.params.newsCategoryId)
            newsCategory = res.result.object
        }
        this.setState({ newsCategory: newsCategory })
    }
    render() {

        return (
            <div>
                <h1>{this.state.newsCategory.name}</h1>
                <div dangerouslySetInnerHTML={{ __html: this.state.newsCategory.description }}></div>
            </div>

        );
    }
}
