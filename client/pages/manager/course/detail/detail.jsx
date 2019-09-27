import * as React from "react";
import { action } from '../../../../actions'
import { api } from '../../../../services'
export class DetailCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {}
        }
    }

    async componentDidMount() {

        let course = this.props.courses.items.find((course) => { return course._id === this.props.params.courseId })
        if (!course) {
            const res = await api.course.getItem(this.props.params.courseId)
            course = res.result.object
        }
        this.setState({ course: course })
    }
    render() {

        return (
            <div>
                <h1>{this.state.course.name}</h1>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: this.state.course.shortDescription }}></div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: this.state.course.description }}></div>
            </div>

        );
    }
}
