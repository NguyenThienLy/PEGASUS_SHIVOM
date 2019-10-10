import React, { Component } from "react";
import { Modal } from "../../../../../../modals";
import "./extendTimeCourse.scss"

import { Form, CourseOptions, TimeTableOptions } from '../../../../../../components'

export class ExtendTimeCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            formData: {
               
                courses: []
            }
        };
        this.submit = this.submit.bind(this);
    }

    componentDidMount() { }
    
    closeModal() {
        this.props.hideModal();
    }
    submit() {
        console.log("form course: ", this.state.formData)
        this.props.hideModal();
        this.props.extendTimeCourse();
    }
    handleSelectCoursePackage = (courseId, packageId) => {
        const courseIndex = this.state.formData.courses.findIndex((course) => { return courseId === course._id })
        const packageData = this.props.package.items.find((packageData) => { return packageData._id === packageId })
        if (courseIndex === -1) {
            this.state.formData.courses.push({
                _id: courseId, package: packageId, timeTables: [], price: packageData.price, type: "package"
            })
        } else {
            if (packageId === this.state.formData.courses[courseIndex].package) {
                this.state.formData.courses.splice(courseIndex, 1)
            } else {
                this.state.formData.courses[courseIndex] = {
                    _id: courseId, package: packageId, timeTables: this.state.formData.courses[courseIndex].timeTables, price: packageData.price, type: "package"
                }
            }
        }
        this.setState({ formData: this.state.formData })
    }
    handleInputCourseMonthAmount = (courseId, monthAmount) => {

        const courseIndex = this.state.formData.courses.findIndex((course) => { return courseId === course._id })
        const courseData = this.props.courses.items.find((courseData) => { return courseData._id === courseId })
        if (monthAmount === 0 && courseIndex !== -1) {
            this.state.formData.courses.splice(courseIndex, 1)
        } else if (courseIndex === -1) {

            this.state.formData.courses.push({
                _id: courseId, monthAmount: monthAmount, timeTables: [], price: courseData.pricePerMonth * monthAmount, type: "monthAmount"
            })
        } else if (courseIndex !== -1) {
            this.state.formData.courses[courseIndex] = {
                _id: courseId, monthAmount: monthAmount, timeTables: this.state.formData.courses[courseIndex].timeTables, price: courseData.pricePerMonth * monthAmount, type: "monthAmount"
            }
        }
        this.setState({ formData: this.state.formData })
    }
    handleChooseTimeTableItem = (courseId, timeTableItemId) => {
        const courseIndex = this.state.formData.courses.findIndex((course) => { return courseId === course._id })
        const timeTableItemIndex = this.state.formData.courses[courseIndex].timeTables.findIndex((timeTableItem) => { return timeTableItemId === timeTableItem })
        if (timeTableItemIndex === -1) {
            this.state.formData.courses[courseIndex].timeTables.push(timeTableItemId)
        } else {
            this.state.formData.courses[courseIndex].timeTables.splice(timeTableItemIndex, 1)
        }
        this.setState({ formData: this.state.formData })
    }
    render() {
        const { show } = this.props;
        return (
            <section>
                <Modal
                    visible={show}
                    width="1000"
                    height="auto"
                    effect="fadeInUp"
                    onClickAway={() => this.closeModal()}
                >
                    <div>
                    <div
                  id="courseOptions"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <CourseOptions courses={this.props.courses.items} packages={[]} handleSelectCoursePackage={this.handleSelectCoursePackage} handleInputCourseMonthAmount={this.handleInputCourseMonthAmount}/>
                </div>
                <div
                  id="timeTableOptions"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <TimeTableOptions courses={this.state.formData.courses} handleChooseTimeTableItem={this.handleChooseTimeTableItem}></TimeTableOptions>
                </div>
                <div className="addMember__body__card__content">
                    <button onClick={this.submit}>Gửi</button>
                </div>
                    </div>
                </Modal>
            </section>
        );
    }
}
