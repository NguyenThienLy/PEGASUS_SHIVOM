import * as React from "react";
import { action } from '../../../../actions'
import { api } from '../../../../services'

export class DetailNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: {}
        }
    }

    async componentDidMount() {
        console.log("receive new props: ", this.props.params)
        let news = this.props.news.items.find((news) => { return news._id === this.props.params.newsId })
        if (!news) {
            const res = await api.news.getItem(this.props.params.newsId)
            news = res.result.object
        }
        this.setState({ news: news })

    }
    componentWillReceiveProps() {
        console.log("receive new props: ", this.props.params)
    }
    render() {

        return (
            <div>
                <h1>{this.state.news.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: this.state.news.content }}></div>
            </div>

        );
    }
}
