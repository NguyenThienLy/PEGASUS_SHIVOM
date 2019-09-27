import * as React from "react";
import {
    NumberAdmin,
    PieChart,
    LineChart,
    Table,
    CustomSelect,
    MemberInfo
} from '../../../../components'
import "./detail.scss"
export class DetailMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            ],
            customSelectMember: {
                placeholder: "Chọn học viên...",
                options: ["Nguyễn Thiên Lý", "Hoàng Thị Ngọc Hạnh"]
            }
        };
    }
    componentDidMount() {
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
        console.log("detail member: ", this.props.params)
        return (
            <div className="memberDetails">
                <div className="memberDetails__body">
                    <div className="memberDetails__body__numbers">
                        {this.state.numberAdmins.map(number => {
                            return <NumberAdmin numberAdmin={number}></NumberAdmin>;
                        })}
                    </div>
                    <div className="memberDetails__body__card">
                        <div className="memberDetails__body__card__title">
                            Thông tin học viên
                  </div>
                        <div className="memberDetails__body__card__content">
                            <div className="memberDetails__body__card__content__member">
                                <div className="memberDetails__body__card__content__member__filter">
                                    <CustomSelect
                                        customSelect={this.state.customSelectMember}
                                    ></CustomSelect>
                                </div>
                                <div className="memberDetails__body__card__content__member__info">
                                    <MemberInfo></MemberInfo>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="memberDetails__body__card">
                        <div className="memberDetails__body__card__title">
                            Thống kê khóa học
                  </div>
                        <div className="memberDetails__body__card__content">
                            <div className="memberDetails__body__card__content__chart">
                                <div className="memberDetails__body__card__content__chart__filter">
                                    <form className="memberDetails__body__card__content__chart__filter__form">
                                        <input
                                            type="text"
                                            className="memberDetails__body__card__content__chart__filter__form__input"
                                            placeholder="Chọn ngày bắt đầu"
                                        />
                                        <input
                                            type="text"
                                            className="memberDetails__body__card__content__chart__filter__form__input"
                                            placeholder="Chọn ngày kết thúc"
                                        />
                                        <button
                                            type="button"
                                            className="memberDetails__body__card__content__chart__filter__form__btn memberDetails__body__card__content__chart__filter__form__btn--primary"
                                        >
                                            thống kê
                          </button>
                                    </form>
                                </div>
                                <div className="memberDetails__body__card__content__chart__row">
                                    <LineChart></LineChart>
                                </div>
                                <div className="memberDetails__body__card__content__chart__row">
                                    <PieChart></PieChart>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="memberDetails__body__table">
                        {/* <Table

                            ></Table> */}
                    </div>
                </div>
            </div>
        );
    }
}
