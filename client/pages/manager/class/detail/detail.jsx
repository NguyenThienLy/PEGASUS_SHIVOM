import * as React from "react";

import { action } from '../../../../actions'
import { api } from '../../../../services'

export class DetailClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classInfo: {}
        }
    }

    async componentDidMount() {
        console.log("newsId: ", this.props.params)
        let classInfo = this.props.classes.items.find((classInfo) => { return classInfo._id === this.props.params.classId })
        if (!classInfo) {
            const res = await api.class.getItem(this.props.params.classId)
            classInfo = res.result.object
        }
        this.setState({ classInfo: classInfo })
    }
    render() {

        return (
            <div>
                <h1>{this.state.classInfo.name}</h1>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: this.state.classInfo.shortDescription }}></div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: this.state.classInfo.description }}></div>
            </div>

        );
    }
}
