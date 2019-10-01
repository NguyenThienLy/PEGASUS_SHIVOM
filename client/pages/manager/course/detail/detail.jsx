import * as React from "react";
import { action } from '../../../../actions'
import { api } from '../../../../services'

import { CreatePackage } from './components'

import Swal from 'sweetalert2'

export class DetailCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {},
            modals: {
                createPackage: true
            }

        }
        this.showHideModal = this.showHideModal.bind(this)
        this.createPackage = this.createPackage.bind(this)
    }
    showHideModal(key) {
        this.state.modals[key] = !this.state.modals[key]
        this.setState({ modals: this.state.modals })
    }
    async createPackage(body) {
        Swal.showLoading()
        body.course = this.props.params.courseId
        body.priceBeforeDiscount = body.price + body.discount
        body.discount = {
            type: "amount",
            amount: body.discount
        }
        api.package.create(body, {
            headers: {
                "x-token": localStorage.getItem("token")
            }
        }).then(res => {
            Swal.fire("Thành công", "Tạo gói cho khoá học thành công", "success")
        }).catch(err => {
            Swal.fire("Thất bại", "Tạo gói cho khoá học thất bại", "error")
        })
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
                <CreatePackage show={this.state.modals.createPackage} hideModal={() => { this.showHideModal("createPackage") }} createPackage={this.createPackage} />
                <h1>{this.state.course.name}</h1>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: this.state.course.shortDescription }}></div>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: this.state.course.description }}></div>
            </div>

        );
    }
}
