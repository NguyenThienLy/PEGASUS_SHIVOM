import * as React from "react";
import {
    StepsLine
} from "../../../../components";

import { action } from '../../../../actions'
import {api } from '../../../../services'

import { AddClassTimeModal, NewClassInfo, NewClassTimetable, ReviewAddClass } from './components'

import Swal from "sweetalert2";

import "./add.scss"



export class AddClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: ["newClassInfo", "addClassTimetable", "reviewAddClass"],
            curPageNumber: 1,
            isShowAddClassTimeModal: false,
            timeTable: [],
            formData: {
                name: "",
                course: null,
                shortDescription: "",
                description: "",
                quantity: 0,
                teacher: null
            },
            classId: null
        }
        this.hideAddClassTimeModal = this.hideAddClassTimeModal.bind(this);
        this.showAddClassTimeModal = this.showAddClassTimeModal.bind(this);
        this.openPage = this.openPage.bind(this);
        this.handleClickPrevious = this.handleClickPrevious.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleInputForm = this.handleInputForm.bind(this);
        this.handleAddClassTime = this.handleAddClassTime.bind(this);
        this.handleRemoveClassTimes = this.handleRemoveClassTimes.bind(this);
        this.submitClass = this.submitClass.bind(this);
    }

    async componentDidMount() {
        this.fetchData()
        var heightOfHeader = $(
          ".add-class .add-class__header .headerAdmin__wrapper"
        ).height();
        $(".add-class .add-class__body").css("margin-top", heightOfHeader + "px");
      }
    
    componentWillReceiveProps(){
        this.openPage(this.state.curPageNumber)
    }

    shouldComponentUpdate() {
        return true;
    }
    
      
    
    openPage = function(pageNumber) {
        // set up page content
        var i, page, stepBtns;
        page = document.getElementsByClassName(
          "add-class__body__card__content__info"
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
          $(".add-class__body__card__buttons__btn-next").text("Xác nhận");
        } else {
          $(".add-class__body__card__buttons__btn-next").html(
            "Tiếp theo<i class='fas fa-chevron-right'></i>"
          );
        }
        if (pageNumber == 1) {
          $(".add-class__body__card__buttons__btn-previous").attr("disabled", true);
        } else {
          $(".add-class__body__card__buttons__btn-previous").attr(
            "disabled",
            false
          );
        }
      };
    
    handleClickPrevious = function() {
        let curPageNumber = this.state.curPageNumber - 1;
        if (curPageNumber > 0) {
          this.setState({ curPageNumber });
          this.openPage(curPageNumber);
        }
    };
    
    handleClickNext = async () => {
        let curPageNumber = this.state.curPageNumber + 1;
        if(curPageNumber === 2){
           await this.submitClass()
        }
        if (curPageNumber <= this.state.pages.length) {
          this.setState({ curPageNumber });
          this.openPage(curPageNumber);
        }
        if (curPageNumber > this.state.pages.length) {
          this.submitClass();
        }
    };
    
    static async getInitialProps({ req, query }) {
        return {};
    }
    
    hideAddClassTimeModal() {
        this.setState({ isShowAddClassTimeModal: false });
    }
    showAddClassTimeModal() {
        this.setState({ isShowAddClassTimeModal: true });
    }
    fetchData(){
        
    }
      
    
    handleInputForm(name, value) {
        this.state.formData[name] = value;
        this.setState({ formData: this.state.formData });
    }
    handleAddClassTime = function(body) {
        if(!this.state.classId){
          Swal.fire("Chưa tạo lớp học","Vui lòng quay lại bước trước tạo lớp học trước khi thêm thời khoá biểu","warning")
        } else {
          Swal.showLoading()
          api.class.addTimeTableItem(this.state.classId,body, {
            headers: {
              "x-token":
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
            }
          }).then(res => {
            body._id = res.result.object.items[res.result.object.items.length - 1]
            this.state.timeTable.push(body)
            this.setState({ timeTable: this.state.timeTable })
            Swal.fire("Thành công", "Thêm thời khoá biểu thành công", "success");
          })
          .catch(err => {
            console.log("ERR: ", err)
            Swal.fire("Thất bại", "Thêm thời khoá biểu thất bại", "error");
          })
          
        }
    };
    handleRemoveClassTimes(index) {
        Swal.showLoading()
          api.class.deleteTimeTableItem(this.state.classId,this.state.timeTable[index]._id, {
            headers: {
              "x-token":
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
            }
          }).then(res => {
            this.state.timeTable.splice(index, 1);
            this.setState({ timeTable: this.state.timeTable });
            Swal.fire("Thành công", "Xoá thời khoá biểu thành công", "success");
          })
          .catch(err => {
            Swal.fire("Thất bại", "Xoá thời khoá biểu thất bại", "error");
          })
        
    }
    async submitClass() {
        Swal.showLoading();
        try {
          const res = await api.class.create(this.state.formData, {
            headers: {
              "x-token":
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M"
            }
          })
          this.setState({ classId: res.result.object._id })
          Swal.fire("Thành công", "Thêm lớp học thành công", "success");
        } catch(err){
            console.log("err");
            Swal.fire("Thất bại", "Thêm lớp học không thành công", "error");
        }
    }

    render() {
        return (
            <div className="add-class">
            <div className="add-class__body">
            <AddClassTimeModal
                show={this.state.isShowAddClassTimeModal}
                hideModal={this.hideAddClassTimeModal}
                handleAddClassTime={this.handleAddClassTime}
                rooms={this.props.room.items}
            />
            <div className="add-class__body__card">
                <div className="add-class__body__card__title">Thêm lớp học</div>
                    <div className="add-class__body__card__content">
                        <div className="add-class__body__card__content__steps">
                        <StepsLine
                            stepQuantity={this.state.pages.length}
                            pages={this.state.pages}
                            openPage={this.openPage}
                        ></StepsLine>
                </div>
                <div
                  id="newClassInfo"
                  className="add-class__body__card__content__info animated
                  fadeIn"
                >
                  <NewClassInfo handleChange={this.handleInputForm} courses={this.props.courses.items} teachers={this.props.teachers.items}/>
                </div>
                <div
                  id="addClassTimetable"
                  className="add-class__body__card__content__info animated
                  fadeIn"
                >
                  <NewClassTimetable
                    timeTable={this.state.timeTable}
                    showAddClassTimeModal={this.showAddClassTimeModal}
                    handleRemove={this.handleRemoveClassTimes}
                  ></NewClassTimetable>
                </div>
                <div
                    id="reviewAddClass"
                    className="add-class__body__card__content__info animated
                    fadeIn"
                >
                    <ReviewAddClass data={this.state.formData} />
                </div>
                </div>
                <div className="add-class__body__card__buttons">
                <button
                    className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-previous"
                    onClick={this.handleClickPrevious}
                >
                    <i className="fas fa-chevron-left"></i>Quay lại
                </button>
                <button
                    className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-next"
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
