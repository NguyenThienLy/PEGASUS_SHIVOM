import * as React from "react";
import {
    MemberInfo
} from '../../../../components'
import { api } from '../../../../services';
import "./detail.scss";

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
            ],
            numberAdmins: [
                {
                    icon: '<i className="fas fa-id-card-alt"></i>',
                    about: "Đi đúng giờ",
                    quantity: 184,
                    colorIcon: "#f5365c"
                },
                {
                    icon: '<i className="fas fa-id-card-alt"></i>',
                    about: "Đi trễ",
                    quantity: 60,
                    colorIcon: "#fb6340"
                },
                {
                    icon: '<i className="fas fa-id-card-alt"></i>',
                    about: "Vắng",
                    quantity: 24,
                    colorIcon: "#ffd600"
                },
                {
                    icon: '<i className="fas fa-id-card-alt"></i>',
                    about: "Đi thừa",
                    quantity: 13,
                    colorIcon: "#11cdef"
                }
            ]
        };
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
                const res = await api.student.getItem(this.props.params.studentId);
                newStudent.data = res.result.object;
            }

            newStudent.isFetching = false;
            newStudent.isEmpty = false;

            this.setState({ student: newStudent });
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

                    console.log("newCourseOfStudent", newCourseOfStudent)

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
