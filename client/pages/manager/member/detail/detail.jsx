import * as React from "react";
import {
    MemberInfo
} from '../../../../components'
import { api } from '../../../../services';
import "./detail.scss";

import { RegisNewCourse } from '../main/components'
import { ExtendTimeCourse } from './components'
import Swal from 'sweetalert2'
export class DetailMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                isFetching: true,
                isEmpty: true,
                data: null
            },
            courseOfStudent: {
                isFetching: true,
                isEmpty: true,
                data: null
            },
            modals: {
                extendTimeCourse: false,
                regisNewCourse: false
            },
            selectedStudentId: props.params.studentId,
            selectedCourseStudent: {}
        };
        this.showHideModal = this.showHideModal.bind(this);
        this.extendTimeCourse = this.extendTimeCourse.bind(this);
        this.regisNewCourse = this.regisNewCourse.bind(this);
        this.showExtendTimeCourse = this.showExtendTimeCourse.bind(this)
    }
    showHideModal(key) {
        this.state.modals[key] = !this.state.modals[key];
        this.setState({ modals: this.state.modals });
        this.forceUpdate()
    }

    fetchData = async () => {
        const token =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M';

        if (this.state.student.isFetching) {
            const newStudent = this.state.student;

            newStudent.data = this.props.students.items.find(student => {
                return student._id === this.props.params.studentId;
            });

            if (!newStudent.data) {
                const res = await api.student.getItem(this.props.params.studentId, {
                    headers: {
                        "x-token": localStorage.getItem("token")
                    }
                });
                newStudent.data = res.result.object;
            }

            newStudent.isFetching = false;
            newStudent.isEmpty = false;

            this.setState({ student: newStudent, selectedStudentId: newStudent.data._id });
        }

        if (this.state.courseOfStudent.isFetching) {
            api.courseStudent.getList(
                {
                    query: {
                        filter: { student: this.props.params.studentId },
                        populates: ['course']

                    },
                    headers: {
                        'x-token': token
                    }
                }).then(res => {
                    const newCourseOfStudent = this.state.courseOfStudent;

                    newCourseOfStudent.data = res.results.objects.rows;

                    newCourseOfStudent.isFetching = false;
                    newCourseOfStudent.isEmpty = false;


                    this.setState({ courseOfStudent: newCourseOfStudent });
                }).catch(err => {
                    const newCourseOfStudent = this.state.courseOfStudent;

                    newCourseOfStudent.isFetching = false;
                    newCourseOfStudent.isEmpty = true;

                    this.setState({ courseOfStudent: newCourseOfStudent });
                })
        }
    };

    componentDidMount() {
        this.fetchData();

        var heightOfHeader = $(
            ".memberDetails .memberDetails__header .headerAdmin__wrapper"
        ).height();
        $(".memberDetails .memberDetails__body").css(
            "margin-top",
            heightOfHeader + "px"
        );

        $(
            ".memberDetails__body__card__content__chart__filter__form__input"
        ).datetimepicker({
            format: "d/m/Y",
            timepicker: false,
            mask: false
        });
    }

    componentDidUpdate(prevProps, prevState) {

        if (
            prevProps.statisticCourse.statisticForPieChart.fetching &&
            !this.props.statisticCourse.statisticForPieChart.fetching
        ) {
            const newNumberAdmins = prevState.numberAdmins;
            newNumberAdmins[0].quantity = this.props.statisticCourse.statisticForPieChart.data.totalOnTime;
            newNumberAdmins[1].quantity = this.props.statisticCourse.statisticForPieChart.data.totalLate;
            newNumberAdmins[2].quantity = this.props.statisticCourse.statisticForPieChart.data.totalAbsent;
            newNumberAdmins[3].quantity = this.props.statisticCourse.statisticForPieChart.data.totalRedundant;

            this.setState({ numberAdmins: newNumberAdmins });
        }
        return true;
    }
    extendTimeCourse(courseStudentId, body) {
        Swal.showLoading();
        api.courseStudent
            .extendTimeCourse(courseStudentId, body)
            .then(res => {
                Swal.fire(
                    'Thành công',
                    'Gia hạn thời gian học cho học viên thành công',
                    'success'
                );
                try {
                    const courseStudentIndex = this.state.courseOfStudent.data.findIndex((courseStudent) => { return courseStudentId === courseStudent._id })

                    this.state.courseOfStudent.data[courseStudentIndex].endTime = res.result.object.endTime
                    this.state.courseOfStudent.data[courseStudentIndex].history = res.result.object.history
                    this.setState({
                        courseOfStudent: this.state.courseOfStudent,
                        selectedCourseStudent: this.state.courseOfStudent.data[courseStudentIndex]
                    })
                } catch (err) {
                }
            })
            .catch(err => {
                Swal.fire(
                    'Thất bại',
                    'Gia hạn thời gian học cho học viên thất bại',
                    'error'
                );
            });
    }
    regisNewCourse(body) {
        Swal.showLoading();
        api.student
            .enrollToCourse(this.state.student.data._id, body)
            .then(res => {
                Swal.fire(
                    'Thành công',
                    'Đăng ký khoá học cho học viên thành công',
                    'success'
                );
                try {
                    const course = this.props.courses.items.find((course) => { return res.result.object.courseStudent.course === course._id })
                    if (course) {
                        res.result.object.courseStudent.course = course
                    }
                    this.state.courseOfStudent.data.push(res.result.object.courseStudent)
                    this.setState({
                        courseOfStudent: this.state.courseOfStudent
                    })
                } catch (err) {

                }
            })
            .catch(err => {
                Swal.fire(
                    'Thất bại',
                    'Đăng ký khoá học cho học viên thất bại',
                    'error'
                );
            });
    }
    showExtendTimeCourse(courseStudent) {
        this.setState({ selectedCourseStudent: courseStudent })
        this.showHideModal("extendTimeCourse")
    }
    render() {
        return (

            <div className="memberDetails">
                <ExtendTimeCourse
                    show={this.state.modals.extendTimeCourse}
                    hideModal={() => {
                        this.showHideModal('extendTimeCourse');
                    }}
                    extendTimeCourse={this.extendTimeCourse}
                    studentId={this.state.selectedStudentId}
                    selectedCourseStudent={this.state.selectedCourseStudent}
                    {...this.props}
                />
                <RegisNewCourse
                    show={this.state.modals.regisNewCourse}
                    hideModal={() => {
                        this.showHideModal('regisNewCourse');
                    }}
                    regisNewCourse={this.regisNewCourse}
                    studentId={this.state.selectedStudentId}

                    {...this.props}
                />
                <div className="memberDetails__body">

                    <div className="memberDetails__body__card">
                        <div className="memberDetails__body__card__title">
                            Thông tin học viên
                    </div>
                        <div className="memberDetails__body__card__content">
                            <div className="memberDetails__body__card__content__member">
                                <div className="memberDetails__body__card__content__member__info">
                                    <MemberInfo
                                        memberInfo={this.state.student.data}
                                        isFetchingMemberInfo={this.state.student.isFetching}
                                        isEmptyMemberInfo={this.state.student.isEmpty}

                                        courseOfStudent={this.state.courseOfStudent.data}
                                        isFetchingCourseOfStudent={this.state.courseOfStudent.isFetching}
                                        extendTimeCourse={this.showExtendTimeCourse}
                                        regisNewCourse={() => { return this.showHideModal("regisNewCourse") }}
                                        isEmptyCourseOfStudent={this.state.courseOfStudent.isEmpty}>


                                    </MemberInfo>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
