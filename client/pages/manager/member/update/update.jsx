import * as React from 'react';
import * as moment from 'moment';
import Router from 'next/router';
import {
    StepsLine
} from '../../../../components';
import {
    ReviewUpdateMember,
    UpdateMemberInfo
} from './components';
import { action } from '../../../../actions';
import { api } from '../../../../services';
import Swal from 'sweetalert2';
import './update.scss';

export class UpdateMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: [
                {
                    isValid: true
                },
                {
                    isValid: true
                }
            ],
            curPageNumber: 1,
            isAdding: false,
            formData: {
                personalInfo: {
                    cardId: '',
                    phone: '',
                    point: 0,
                    firstName: '',
                    lastName: '',
                    birthday: moment().format(),
                    address: '',
                    avatar: '',
                    avatarUrl: ''
                }
            }
        };

        this.canOpenPage = this.canOpenPage.bind(this);
        this.openPage = this.openPage.bind(this);
        this.handleClickPrevious = this.handleClickPrevious.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
        this.handleIsValid = this.handleIsValid.bind(this);
        this.submitEnroll = this.submitEnroll.bind(this);
    }

    async componentDidMount() {
        this.fetchData();

        var heightOfHeader = $(
            '.addMember .addMember__header .headerAdmin__wrapper'
        ).height();
        $('.addMember .addMember__body').css('margin-top', heightOfHeader + 'px');
    }

    canOpenPage = function () {
        const curPageNumber = this.state.curPageNumber;
        const pages = this.state.pages;

        if (!pages[curPageNumber - 1].isValid) {
            alert('Vui lòng kiểm tra lại thông tin');
            return false;
        }

        return true;
    };

    openPage = function (nextPageNumber) {
        // update curPageNumber
        this.setState({ curPageNumber: nextPageNumber });
    };

    handleClickPrevious = function () {
        const curPageNumber = this.state.curPageNumber;
        const nextPageNumber = curPageNumber - 1;
        if (nextPageNumber > 0) {
            this.openPage(nextPageNumber);
        }
    };

    handleClickNext = function () {
        const curPageNumber = this.state.curPageNumber;
        const pages = this.state.pages;

        const nextPageNumber = curPageNumber + 1;
        if (nextPageNumber <= pages.length) {
            if (this.canOpenPage()) {
                this.openPage(nextPageNumber);
            }
        }
        if (nextPageNumber > pages.length) {
            this.submitEnroll();
        }
    };

    handleIsValid = function (pageNumber, isValid) {
        const pages = this.state.pages;
        pages[pageNumber - 1].isValid = isValid;
        this.setState({ pages: pages });
    };

    static async getInitialProps({ req, query }) {
        return {};
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidUpdate(prevProps, prevState) { }

    handleChange = (step, key, value) => {
        const formData = this.state.formData
        // if (step === 'personalInfo') {
        //   this.state.formData[step][key] = value;
        // }
        // this.setState({ formData: this.state.formData });
        if (step === 'personalInfo') {
            formData[step][key] = value;
        }
        this.setState({ formData: formData });
    };

    handleSelectCoursePackage = (courseId, packageId) => {
        const formData = this.state.formData
        const courseIndex = formData.courses.findIndex(course => {
            return courseId === course._id;
        });
        const packageData = this.props.package.items.find(packageData => {
            return packageData._id === packageId;
        });
        if (courseIndex === -1) {
            formData.courses.push({
                _id: courseId,
                package: packageId,
                timeTables: [],
                price: packageData.price,
                type: 'package'
            });
        } else {
            if (packageId === formData.courses[courseIndex].package) {
                formData.courses.splice(courseIndex, 1);
            } else {
                formData.courses[courseIndex] = {
                    _id: courseId,
                    package: packageId,
                    timeTables: formData.courses[courseIndex].timeTables,
                    price: packageData.price,
                    type: 'package'
                };
            }
        }
        this.setState(() => { formData: formData });

        // const courseIndex = this.state.formData.courses.findIndex(cåourse => {
        //   return courseId === course._id;
        // });
        // const packageData = this.props.package.items.find(packageData => {
        //   return packageData._id === packageId;
        // });
        // if (courseIndex === -1) {
        //   this.state.formData.courses.push({
        //     _id: courseId,
        //     package: packageId,
        //     timeTables: [],
        //     price: packageData.price,
        //     type: 'package'
        //   });
        // } else {
        //   if (packageId === this.state.formData.courses[courseIndex].package) {
        //     this.state.formData.courses.splice(courseIndex, 1);
        //   } else {
        //     this.state.formData.courses[courseIndex] = {
        //       _id: courseId,
        //       package: packageId,
        //       timeTables: this.state.formData.courses[courseIndex].timeTables,
        //       price: packageData.price,
        //       type: 'package'
        //     };
        //   }
        // }
        // console.log("course : ", this.state.formData.courses)
        // this.setState({ formData: this.state.formData });
    };

    handleInputCourseMonthAmount = (courseId, monthAmount) => {
        const courseIndex = this.state.formData.courses.findIndex(course => {
            return courseId === course._id;
        });
        const courseData = this.props.courses.items.find(courseData => {
            return courseData._id === courseId;
        });
        if (monthAmount === 0 && courseIndex !== -1) {
            this.state.formData.courses.splice(courseIndex, 1);
        } else if (courseIndex === -1) {
            this.state.formData.courses.push({
                _id: courseId,
                monthAmount: monthAmount,
                timeTables: [],
                price: courseData.pricePerMonth * monthAmount,
                type: 'monthAmount'
            });
        } else if (courseIndex !== -1) {
            this.state.formData.courses[courseIndex] = {
                _id: courseId,
                monthAmount: monthAmount,
                timeTables: this.state.formData.courses[courseIndex].timeTables,
                price: courseData.pricePerMonth * monthAmount,
                type: 'monthAmount'
            };
        }
        this.setState({ formData: this.state.formData });
    };

    handleChooseTimeTableItem = (courseId, timeTableItemId) => {
        const courseIndex = this.state.formData.courses.findIndex(course => {
            return courseId === course._id;
        });
        const timeTableItemIndex = this.state.formData.courses[
            courseIndex
        ].timeTables.findIndex(timeTableItem => {
            return timeTableItemId === timeTableItem;
        });
        if (timeTableItemIndex === -1) {
            this.state.formData.courses[courseIndex].timeTables.push(timeTableItemId);
        } else {
            this.state.formData.courses[courseIndex].timeTables.splice(
                timeTableItemIndex,
                1
            );
        }
        this.setState({ formData: this.state.formData });
    };

    fetchData = async () => {
        let student = this.props.students.items.find(student => {
            return student._id === this.props.params.studentId;
        });

        if (!student) {
            const res = await api.student.getItem(this.props.params.studentId);
            student = res.result.object;
        }

        const newFormData = this.state.formData;

        newFormData.personalInfo.cardId = student.cardId;
        newFormData.personalInfo.phone = student.phone;
        newFormData.personalInfo.point = student.point;
        newFormData.personalInfo.firstName = student.firstName;
        newFormData.personalInfo.lastName = student.lastName;
        newFormData.personalInfo.birthday = moment(student.birthday).format("DD/MM/YYYY");
        newFormData.personalInfo.address = student.address;
        newFormData.personalInfo.avatar = student.avatar;
        newFormData.personalInfo.avatarUrl = student.avatar;

        this.setState({
            formData: newFormData
        });
    };

    async submitEnroll() {
        Swal.showLoading();
        let imageLink;
        if (this.state.formData.personalInfo.avatar !== '') {
            imageLink = await api.imgur.uploadImage(
                this.state.formData.personalInfo.avatar
            );
            this.state.formData.personalInfo.avatar = imageLink;
        } else {
            imageLink = 'https://i.imgur.com/KLKaw6K.png';
            this.state.formData.personalInfo.avatar = imageLink;
        }
        this.state.formData.personalInfo.birthday = moment(
            this.state.formData.personalInfo.birthday
            , "DD/MM/YYYY").format();

        api.student
            .update(this.props.params.studentId, this.state.formData.personalInfo, {
                headers: {
                    'x-token':
                        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M'
                }
            })
            .then(async res => {
                await Swal.fire('Thành công', 'Cập nhật học viên thành công', 'success');
                try {
                    this.props.dispatch({
                        type: "UPDATE_STUDENT_SUCCESS",
                        payload: res.result.object
                    })
                } catch (err) {

                }
                Router.push(
                    `/manager/member/member?studentId=${res.result.object._id}`,
                    `/quan-ly/hoc-vien/chi-tiet/${res.result.object._id}`
                );
            })
            .catch(err => {
                Swal.fire('Thất bại', 'Cập nhật học viên không thành công', 'error');
            });
    }

    render() {
        return (
            <div className="addMember">
                <div className="addMember__body">
                    <div className="addMember__body__card">
                        <div className="addMember__body__card__title">Cập nhật học viên</div>
                        <div className="addMember__body__card__content">
                            <div className="addMember__body__card__content__steps">
                                <StepsLine
                                    stepQuantity={this.state.pages.length}
                                    openPage={this.openPage}
                                    canOpenPage={this.canOpenPage}
                                    curPageNumber={this.state.curPageNumber}
                                ></StepsLine>
                            </div>

                            <div
                                style={
                                    this.state.curPageNumber === 1
                                        ? { display: 'block' }
                                        : { display: 'none' }
                                }
                                className="addMember__body__card__content__info animated fadeIn"
                            >
                                <UpdateMemberInfo
                                    handleChange={this.handleChange}
                                    handleIsValid={this.handleIsValid}
                                    data={this.state.formData}
                                    pageNumber="1"
                                />
                            </div>

                            <div
                                style={
                                    this.state.curPageNumber === 2
                                        ? { display: 'block' }
                                        : { display: 'none' }
                                }
                                className="addMember__body__card__content__info animated fadeIn"
                            >
                                <ReviewUpdateMember
                                    data={this.state.formData}
                                    courses={this.props.courses.items}
                                    handleCheckIsPayFee={() => {
                                        this.state.formData.isPayFee = !this.state.formData.isPayFee
                                        this.setState({
                                            formData: this.state.formData
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="addMember__body__card__buttons">
                            {this.state.curPageNumber === 1 ? (
                                <button
                                    disabled="true"
                                    className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-previous"
                                    onClick={this.handleClickPrevious}
                                >
                                    <i className="fas fa-chevron-left"></i>Quay lại
                </button>
                            ) : (
                                    <button
                                        disabled="false"
                                        className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-previous"
                                        onClick={this.handleClickPrevious}
                                    >
                                        <i className="fas fa-chevron-left"></i>Quay lại
                </button>
                                )}

                            {this.state.curPageNumber === this.state.pages.length ? (
                                <button
                                    className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-next"
                                    onClick={this.handleClickNext}
                                >
                                    Xác nhận
                </button>
                            ) : (
                                    <button
                                        className="add-class__body__card__buttons__btn add-class__body__card__buttons__btn-next"
                                        onClick={this.handleClickNext}
                                        dangerouslySetInnerHTML={{
                                            __html: 'Tiếp theo<i className="fas fa-chevron-right"></i>'
                                        }}
                                    ></button>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
