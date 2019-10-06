import * as React from "react";
import * as moment from "moment"
import Router from 'next/router'
import {
    NewMemberInfo,
    CourseOptions,
    StepsLine,
    TimeTableOptions,
    ReviewAddMember
} from "../../../../components";

import { action } from '../../../../actions'
import {api } from '../../../../services'

import Swal from "sweetalert2";
import "./add.scss"
export class AddMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                "newMemberInfo",
                "courseOptions",
                "timeTableOptions",
                "reviewAddMember"
            ],
            curPageNumber: 1,
            isAdding: false,
            formData: {
                personalInfo: {
                    cardId: "",
                    phone: "",
                    point: 0,
                    firstName: "",
                    lastName: "",
                    birthday: moment().format(),
                    address: "",
                    avatar: "",
                    avatarUrl: ""
                },
                courses: []
            }
        }
        this.openPage = this.openPage.bind(this);
        this.handleClickPrevious = this.handleClickPrevious.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.submitEnroll = this.submitEnroll.bind(this)
    }

    openPage = function (pageNumber) {
        // set up page content
        var i, page, stepBtns;
        page = document.getElementsByClassName(
            "addMember__body__card__content__info"
        );
        for (i = 0; i < page.length; i++) {
            page[i].style.display = "none";
        }
        stepBtns = document.getElementsByClassName("stepsLine__btn");
        for (i = 0; i < stepBtns.length; i++) {
            stepBtns[i].style.backgroundColor = "#e1f2f4";
            stepBtns[i].style.color = "#00a3af";
        }
        document.getElementById(this.state.pages[pageNumber - 1]).style.display =
            "block";
        $(".stepsLine__btn-" + pageNumber).css({
            backgroundColor: "#00a3af",
            color: "#fff"
        });

        // update curPageNumber
        this.setState({ curPageNumber: pageNumber });

        // set up for button previous, next
        if (pageNumber == this.state.pages.length) {
            $(".addMember__body__card__buttons__btn-next").text("Xác nhận");
            $(".addMember__body__card__buttons__btn-next")
        } else {
            $(".addMember__body__card__buttons__btn-next").html(
                "Tiếp theo<i class='fas fa-chevron-right'></i>"
            );
        }
        if (pageNumber == 1) {
            $(".addMember__body__card__buttons__btn-previous").attr("disabled", true);
        } else {
            $(".addMember__body__card__buttons__btn-previous").attr(
                "disabled",
                false
            );
        }
    };

    handleClickPrevious = function () {
        let curPageNumber = this.state.curPageNumber - 1;
        if (curPageNumber > 0) {
            this.setState({ curPageNumber });
            this.openPage(curPageNumber);
        }
    };

    handleClickNext = function () {
        let curPageNumber = this.state.curPageNumber + 1;
        if (curPageNumber <= this.state.pages.length) {
            this.setState({ curPageNumber });
            this.openPage(curPageNumber);
        }
        if (curPageNumber > this.state.pages.length) {
            this.submitEnroll()
        }
    };

    static async getInitialProps({ req, query }) {
        return {};
    }
    fetchData() {
        
    }
    async componentDidMount() {

        this.fetchData()


        var heightOfHeader = $(
            ".addMember .addMember__header .headerAdmin__wrapper"
        ).height();
        $(".addMember .addMember__body").css("margin-top", heightOfHeader + "px");
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidUpdate(prevProps, prevState) {

    }
    handleChange = (step, key, value) => {

        if (step === "personalInfo") {
            this.state.formData[step][key] = value
        }
        this.setState({ formData: this.state.formData })
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
    async submitEnroll() {
        Swal.showLoading()
        let imageLink
        if (this.state.formData.personalInfo.avatar !== "") {
            imageLink = await api.imgur.uploadImage(this.state.formData.personalInfo.avatar)
            this.state.formData.personalInfo.avatar = imageLink
        }
        this.state.formData.personalInfo.birthday = moment(this.state.formData.personalInfo.birthday).format()
        api.student.enroll(this.state.formData, {
            headers: {
                "x-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
            }
        }).then(async res => {

            await Swal.fire("Thành công", "Thêm học viên thành công", "success");
            Router.push(`/manager/member/member?studentId=${res.result.object._id}`, `/quan-ly/hoc-vien/chi-tiet/${res.result.object._id}`)
        })
            .catch(err => {

                console.log("err")
                Swal.fire("Thất bại", "Thêm học viên không thành công", "error");
            })
    }
    render() {

        return (
            <div className="addMember">
            <div className="addMember__body">
            <div className="addMember__body__card">
              <div className="addMember__body__card__title">Thêm học viên</div>
              <div className="addMember__body__card__content">
                <div className="addMember__body__card__content__steps">
                  <StepsLine
                    stepQuantity={this.state.pages.length}
                    pages={this.state.pages}
                    openPage={this.openPage}
                  ></StepsLine>
                </div>
                <div
                  id="newMemberInfo"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <NewMemberInfo  handleChange={this.handleChange}/>
                </div>
                <div
                  id="courseOptions"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <CourseOptions courses={this.props.courses.items} packages={this.props.package.items} handleSelectCoursePackage={this.handleSelectCoursePackage} handleInputCourseMonthAmount={this.handleInputCourseMonthAmount}/>
                </div>
                <div
                  id="timeTableOptions"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <TimeTableOptions courses={this.state.formData.courses} handleChooseTimeTableItem={this.handleChooseTimeTableItem}></TimeTableOptions>
                </div>
                <div
                  id="reviewAddMember"
                  className="addMember__body__card__content__info animated
                  fadeIn"
                >
                  <ReviewAddMember data={this.state.formData} courses={this.props.courses.items}/>
                </div>
              </div>
              <div className="addMember__body__card__buttons">
                <button
                  className="addMember__body__card__buttons__btn addMember__body__card__buttons__btn-previous"
                  onClick={this.handleClickPrevious}
                >
                  <i className="fas fa-chevron-left"></i>Quay lại
                </button>
                <button
                  className="addMember__body__card__buttons__btn addMember__body__card__buttons__btn-next"
                  onClick={this.handleClickNext}
                >
                  Tiếp tục<i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
           
          </div>
          </div>
        );
    }
}
