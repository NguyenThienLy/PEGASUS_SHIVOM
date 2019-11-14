import * as React from "react";
import {
    MemberInfo
} from '../../../../components'
import { api } from '../../../../services';
import "./detail.scss";
import Router from 'next/router';

import { RegisNewCourse } from '../main/components'
import { ExtendTimeCourse, RelearnCourse } from './components'
import Swal from 'sweetalert2'
export class DetailMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                isFetching: false,
                isEmpty: true,
                data: null
            },
            courseOfStudent: {
                isFetching: false,
                isEmpty: true,
                data: null
            },
            timeTableOfStudent: {
                isEmpty: true,
                isFetching: false,
                data: null
            },
            modals: {
                extendTimeCourse: false,
                regisNewCourse: false,
                relearnCourse: false
            },
            selectedStudentId: props.params.studentId,
            selectedCourseStudent: {},
            categories: [
                {
                    name: "trang chủ",
                    linkHref: "/home/home",
                    linkAs: "/",
                    key: "home"
                },
                {
                    name: "khoá học",
                    key: "course",
                    subCategories: []
                },
                {
                    name: "tin tức",
                    key: "news",
                    subCategories: [
                        {
                            name: "khoá học môt",
                            linkHref: "/blog/blog?categorySlug=khoa-hoc-not",
                            linkAs: "/khoa-hoc-mot"
                        },
                        {
                            name: "khoá học hai",
                            linkHref: "/home/home",
                            linkAs: "/"
                        },
                        {
                            name: "khoá học ba",
                            linkHref: "/home/home",
                            linkAs: "/"
                        }
                    ]
                },
                {
                    name: "về chúng tôi",
                    linkHref: "/contact/contact",
                    linkAs: "/lien-he",
                    key: "about"
                }
            ]
        };

        this.updateMember = this.updateMember.bind(this);
        this.showHideModal = this.showHideModal.bind(this);
        this.extendTimeCourse = this.extendTimeCourse.bind(this);
        this.openStatistic = this.openStatistic.bind(this);
        this.regisNewCourse = this.regisNewCourse.bind(this);
        this.showExtendTimeCourse = this.showExtendTimeCourse.bind(this)
        this.cancelCourse = this.cancelCourse.bind(this)
        this.relearnCourse = this.relearnCourse.bind(this)
        this.showRelearnCourse = this.showRelearnCourse.bind(this)
    }

    showHideModal(key) {
        this.state.modals[key] = !this.state.modals[key];
        this.setState({ modals: this.state.modals });
        this.forceUpdate()
    }

    fetchData = async () => {
        const token =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M';

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

        api.student
            .getTimeTable(this.props.params.studentId, {
                query: {
                    isRefresh: true
                }
            })
            .then(res => {
                const newtimeTableOfStudent = this.state.timeTableOfStudent;

                newtimeTableOfStudent.data = res.result.object;

                newtimeTableOfStudent.isFetching = false;
                newtimeTableOfStudent.isEmpty = false;

                this.setState({ timeTableOfStudent: newtimeTableOfStudent });
            })
            .catch(err => {
                const newtimeTableOfStudent = this.state.timeTableOfStudent;

                newtimeTableOfStudent.isFetching = false;
                newtimeTableOfStudent.isEmpty = true;

                this.setState({ timeTableOfStudent: newtimeTableOfStudent });
            });
    };

    changeIsFetching(isFetching) {
        const newStudent = this.state.student;
        const newCourseOfStudent = this.state.courseOfStudent;
        const newtimeTableOfStudent = this.state.timeTableOfStudent;

        newStudent.isFetching = isFetching;
        newCourseOfStudent.isFetching = isFetching;
        newtimeTableOfStudent.isFetching = isFetching;

        this.setState({
            student: newStudent,
            courseOfStudent: newCourseOfStudent,
            timeTableOfStudent: newtimeTableOfStudent
        });
    }

    updateMember() {
        Router.push(
            `/manager/member/member?studentId=${this.props.params.studentId}`,
            `/quan-ly/hoc-vien/cap-nhat/${this.props.params.studentId}`
        );
    }

    componentDidMount() {
        this.changeIsFetching(true);

        this.fetchData();

        // var heightOfHeader = $(
        //     ".member-details .member-details__header .headerAdmin__wrapper"
        // ).height();
        // $(".member-details .member-details__body").css(
        //     "margin-top",
        //     heightOfHeader + "px"
        // );

        // $(
        //     ".member-details__body__card__content__chart__filter__form__input"
        // ).datetimepicker({
        //     format: "d/m/Y",
        //     timepicker: false,
        //     mask: false
        // });
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

    openStatistic(courseId) {
        Router.push(
            `/manager/member/member?studentId=${this.props.params.studentId}/courseId=${courseId}`,
            `/quan-ly/hoc-vien/thong-ke/${this.props.params.studentId}/${courseId}`
        );
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

    async cancelCourse(courseStudentId) {
        const result = await Swal.fire({
            title: "Lý do nghỉ học khoá này",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            input: "text",
            inputPlaceholder: "Nhập lý do nghỉ học của học viên"
        })
        //console.log("result: ", result)
        if (result.value) {
            Swal.showLoading();
            api.courseStudent
                .cancel(courseStudentId, { reason: result.value })
                .then(res => {
                    Swal.fire(
                        'Thành công',
                        'Học viên nghỉ học khoá này thành công',
                        'success'
                    );
                    try {
                        const courseStudentIndex = this.state.courseOfStudent.data.findIndex((courseStudent) => { return courseStudentId === courseStudent._id })
                        //console.log("courseStudentIndex: ", courseStudentIndex)
                        this.state.courseOfStudent.data[courseStudentIndex].status = res.result.object.status
                        this.state.courseOfStudent.data[courseStudentIndex].history = res.result.object.history
                        this.setState({
                            courseOfStudent: this.state.courseOfStudent
                        })
                    } catch (err) {

                    }
                })
                .catch(err => {
                    Swal.fire(
                        'Thất bại',
                        'Học viên nghỉ học khoá này thấy bại',
                        'error'
                    );
                });
        }
    }

    async relearnCourse(courseStudentId, body) {

        Swal.showLoading();
        api.courseStudent
            .relearn(courseStudentId, body)
            .then(res => {
                Swal.fire(
                    'Thành công',
                    'Học viên học lại khoá này thành công',
                    'success'
                );
                try {
                    const courseStudentIndex = this.state.courseOfStudent.data.findIndex((courseStudent) => { return courseStudentId === courseStudent._id })
                    //console.log("courseStudentIndex: ", courseStudentIndex)
                    this.state.courseOfStudent.data[courseStudentIndex].status = res.result.object.status
                    this.state.courseOfStudent.data[courseStudentIndex].history = res.result.object.history
                    this.setState({
                        courseOfStudent: this.state.courseOfStudent
                    })
                } catch (err) {

                }
            })
            .catch(err => {
                Swal.fire(
                    'Thất bại',
                    'Học viên học lại khoá này thấy bại',
                    'error'
                );
            });

    }

    showExtendTimeCourse(courseStudent) {
        this.setState({ selectedCourseStudent: courseStudent })
        this.showHideModal("extendTimeCourse")
    }

    showRelearnCourse(courseStudent) {
        this.setState({ selectedCourseStudent: courseStudent })
        this.showHideModal("relearnCourse")
    }

    render() {
        return (

            <div className="member-details">
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
                <RelearnCourse
                    show={this.state.modals.relearnCourse}
                    hideModal={() => {
                        this.showHideModal('relearnCourse');
                    }}
                    relearnCourse={this.relearnCourse}
                    studentId={this.state.selectedStudentId}
                    selectedCourseStudent={this.state.selectedCourseStudent}
                    {...this.props}
                />
                <div className="member-details__body">
                    <div className="member-details__body__card">
                        <div className="member-details__body__card__title">
                            Thông tin học viên
                        </div>
                        <div className="member-details__body__card__content">
                            <div className="member-details__body__card__content__member">
                                <div className="member-details__body__card__content__member__info">
                                    <MemberInfo
                                        memberInfo={this.state.student.data}
                                        isFetchingMemberInfo={this.state.student.isFetching}
                                        isEmptyMemberInfo={this.state.student.isEmpty}
                                        updateMember={this.updateMember}

                                        courseOfStudent={this.state.courseOfStudent.data}
                                        isFetchingCourseOfStudent={this.state.courseOfStudent.isFetching}
                                        extendTimeCourse={this.showExtendTimeCourse}
                                        cancelCourse={this.cancelCourse}
                                        openStatistic={this.openStatistic}
                                        relearnCourse={this.showRelearnCourse}
                                        regisNewCourse={() => { return this.showHideModal("regisNewCourse") }}
                                        isEmptyCourseOfStudent={this.state.courseOfStudent.isEmpty}

                                        timeTableOfStudent={this.state.timeTableOfStudent.data}
                                        isFetchingTimeTable={
                                            this.state.timeTableOfStudent.isFetching
                                        }
                                        isEmptyTimeTable={this.state.timeTableOfStudent.isEmpty}>
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
