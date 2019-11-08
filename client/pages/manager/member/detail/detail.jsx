import * as React from "react";
import {
    MemberInfo
} from '../../../../components'
import { api } from '../../../../services';
import "./detail.scss";
import Router from 'next/router';

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
                isFetching: false,
                isEmpty: true,
                data: null
            },
            headerAdmin: {
                avatar:
                    "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
                name: "Avril Lavigne"
            },
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
    }

    fetchData = async () => {
        const token =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M';

        const newStudent = this.state.student;

        newStudent.data = this.props.students.items.find(student => {
            return student._id === this.props.params.studentId;
        });

        if (!newStudent.data) {
            const res = await api.student.getItem(this.props.params.studentId);
            newStudent.data = res.result.object;
        }

        newStudent.isFetching = false;
        newStudent.isEmpty = false;

        this.setState({ student: newStudent });

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
    };

    changeIsFetching(isFetching) {
        const newStudent = this.state.student;
        const newCourseOfStudent = this.state.courseOfStudent;

        newStudent.isFetching = isFetching;
        newCourseOfStudent.isFetching = isFetching;

        this.setState({
            student: newStudent,
            courseOfStudent: newCourseOfStudent
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

    render() {
        return (
            <div className="memberDetails">
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
                                        updateMember={this.updateMember}

                                        courseOfStudent={this.state.courseOfStudent.data}
                                        isFetchingCourseOfStudent={this.state.courseOfStudent.isFetching}
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
