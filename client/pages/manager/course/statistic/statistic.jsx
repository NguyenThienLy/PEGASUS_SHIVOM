import * as React from "react";
import { action } from '../../../../actions'
import { api } from '../../../../services'

// import { CreatePackage } from './components'

import Swal from 'sweetalert2'

import {
    Sidebar,
    HeaderAdmin,
    NumberAdmin,
    PieChart,
    LineChart,
    Table,
    CustomSelect,
    ProfileAdmin,
    ColumnChart,
    CourseInfo,
    Loading
} from '../../../../components';
import * as moment from 'moment'
import "./statistic.scss"
import { tsTupleType } from "@babel/types";

export class StatisticCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            modals: {
                createPackage: false
            },
            numberAdmins: {
                isFetching: true,
                isEmpty: true,
                data: {
                    onTime: {
                        icon: '<i className="fas fa-id-card-alt"></i>',
                        about: 'Đi đúng giờ',
                        quantity: 0,
                        colorIcon: '#f5365c'
                    },
                    late: {
                        icon: '<i className="fas fa-id-card-alt"></i>',
                        about: 'Đi trễ',
                        quantity: 0,
                        colorIcon: '#fb6340'
                    },
                    absent: {
                        icon: '<i className="fas fa-id-card-alt"></i>',
                        about: 'Vắng',
                        quantity: 0,
                        colorIcon: '#ffd600'
                    },
                    redundant: {
                        icon: '<i className="fas fa-id-card-alt"></i>',
                        about: 'Đi thừa',
                        quantity: 0,
                        colorIcon: '#11cdef'
                    }
                }
            },
            customSelectCourse: {
                placeholder: 'Chọn khóa học...',
                options: ['Yoga cho người cao tuổi', 'Yoga cộng đồng']
            },
            tableDetails: {
                isFetching: true,
                isEmpty: true,
                data: {
                    absent: {
                        nameTable: 'Danh sách học viên vắng học',
                        data: null
                    },
                    late: {
                        nameTable: 'Danh sách học viên trễ giờ',
                        data: null
                    },
                    onTime: {
                        nameTable: 'Danh sách học viên đúng giờ',
                        data: null
                    },
                    redundant: {
                        nameTable: 'Danh sách học viên đi thừa',
                        data: null
                    }
                }
            },
            profileAdmin: {
                image:
                    'https://dalia.elated-themes.com/wp-content/uploads/2018/06/team2-img-8.jpg',
                name: 'nisha sharma',
                phone: '0947161096',
                email: 'nisha_sharma@gmail.com',
                location: 'remote',
                age: 25,
                facebook: 'facebook.com',
                twitter: 'twitter.com',
                instagram: 'instagram.com'
            },
            columnChartData: {
                labels: null,
                isEmpty: true,
                isFetching: true,
                datasets: [
                    {
                        label: 'Số học viên',
                        data: null,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)'
                    }
                ]
            },
            pieChartData: {
                labels: null,
                isEmpty: true,
                isFetching: true,
                datasets: [
                    {
                        data: null,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)'
                        ]
                    }
                ]
            },
            lineChartData: {
                labels: null,
                isEmpty: true,
                isFetching: true,
                datasets: [
                    {
                        label: 'Vắng học',
                        fill: false,
                        data: null,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 0.6)'
                    },
                    {
                        label: 'Trễ giờ',
                        fill: false,
                        data: null,
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        borderColor: 'rgba(255, 206, 86, 0.6)'
                    },
                    {
                        label: 'Đúng giờ',
                        fill: false,
                        data: null,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 0.6)'
                    },
                    {
                        label: 'Đi thừa',
                        fill: false,
                        data: null,
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        borderColor: 'rgba(153, 102, 255, 0.6)'
                    }
                ]
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

    fetchData = async (startTime, endTime) => {

        if (!this.state.course) {
            let course = this.props.courses.items.find((course) => { return course._id === this.props.params.courseId })
            if (!course) {
                const res = await api.course.getItem(this.props.params.courseId)
                course = res.result.object
            }
            this.setState({ course: course })
        }
        const token =
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M';

        if (this.state.lineChartData.isFetching) {
            api.statisticCourse
                .statisticForLineChart(this.props.params.courseId, 'week', `${startTime}Z`, `${endTime}Z`, token)
                .then(res => {

                    const newLineChartData = this.state.lineChartData;

                    // Thông kê trên biểu đồ đường
                    newLineChartData.datasets[0].data = res.result.object.dataAbsents;
                    newLineChartData.datasets[1].data = res.result.object.dataLates;
                    newLineChartData.datasets[2].data = res.result.object.dataOnTimes;
                    newLineChartData.datasets[3].data = res.result.object.dataRedundants;

                    newLineChartData.labels = res.result.object.labels;
                    newLineChartData.isEmpty = res.result.object.isEmpty;
                    newLineChartData.isFetching = false;

                    this.setState({
                        lineChartData: newLineChartData
                    });

                }).catch(error => {
                    const newLineChartData = this.state.lineChartData;

                    newLineChartData.isFetching = false;

                    this.setState({
                        lineChartData: newLineChartData
                    });
                })
        }

        if (this.state.pieChartData.isFetching) {
            api.statisticCourse
                .statisticForPieChart(
                    this.props.params.courseId, 'week', `${startTime}Z`, `${endTime}Z`, token)
                .then(res => {
                    const newNumberAdmins = this.state.numberAdmins;
                    const newPieChartData = this.state.pieChartData;

                    // Gán số lượng loại chuyên cần cho component admin
                    newNumberAdmins.data.onTime.quantity = res.result.object.totalOnTime;
                    newNumberAdmins.data.late.quantity = res.result.object.totalLate;
                    newNumberAdmins.data.absent.quantity = res.result.object.totalAbsent;
                    newNumberAdmins.data.redundant.quantity = res.result.object.totalRedundant;

                    // Thống kê trên biểu đồ tròn
                    newPieChartData.datasets[0].data = res.result.object.data;
                    newPieChartData.labels = res.result.object.labels;
                    newPieChartData.isEmpty = res.result.object.isEmpty;

                    newNumberAdmins.isEmpty = newPieChartData.isEmpty = res.result.object.isEmpty;
                    newNumberAdmins.isFetching = newPieChartData.isFetching = false;

                    this.setState({
                        numberAdmins: newNumberAdmins,
                        pieChartData: newPieChartData
                    });

                }).catch(error => {
                    const newNumberAdmins = this.state.numberAdmins;
                    const newPieChartData = this.state.pieChartData;

                    newNumberAdmins[0].isFetching = newNumberAdmins[1].isFetching = newNumberAdmins[2].isFetching = newNumberAdmins[3].isFetching = false;

                    this.setState({
                        numberAdmins: newNumberAdmins,
                        pieChartData: newPieChartData
                    });
                })
        }

        if (this.state.columnChartData.isFetching) {
            api.student
                .statisticForColumnChart(this.props.params.courseId, `${startTime}Z`, `${endTime}Z`, token)
                .then(res => {
                    const newColumnChartData = this.state.columnChartData;

                    // Thống kê trên biểu đồ cột
                    newColumnChartData.datasets[0].data = res.result.object.data;
                    newColumnChartData.labels = res.result.object.labels;
                    newColumnChartData.isEmpty = res.result.object.isEmpty;
                    newColumnChartData.isFetching = false;

                    this.setState({
                        columnChartData: newColumnChartData
                    });

                }).catch(error => {
                    const newColumnChartData = this.state.columnChartData;
                    newColumnChartData.isFetching = false;

                    this.setState({
                        columnChartData: newColumnChartData
                    });
                })
        }

        if (this.state.tableDetails.isFetching) {
            api.statisticStudent
                .statisticForListDetail(this.props.params.courseId, 'week', `${startTime}Z`, `${endTime}Z`, token)
                .then(res => {

                    const newTableDetails = this.state.tableDetails;

                    // Gán số lượng loại chuyên cần cho component admin
                    newTableDetails.data.onTime.data = res.result.object.onTimes;
                    newTableDetails.data.late.data = res.result.object.lates;
                    newTableDetails.data.absent.data = res.result.object.absents;
                    newTableDetails.data.redundant.data = res.result.object.redundants;

                    newTableDetails.isFetching = false;

                    this.setState({
                        tableDetails: newTableDetails
                    });

                }).catch(error => {
                    const newTableDetails = this.state.tableDetails;

                    newTableDetails.isFetching = false;

                    this.setState({
                        tableDetails: newTableDetails
                    });
                })
        }
    };

    handleScroll = () => { };
    componentWillUnmount() { }

    componentDidMount() {
        this.fetchData(
            moment()
                .startOf('year')
                .format('YYYY-MM-DD HH:mm:ss'),
            moment()
                .endOf('year')
                .format('YYYY-MM-DD HH:mm:ss')
        );



        var heightOfHeader = $(
            '.course-statistics .course-statistics__header .headerAdmin__wrapper'
        ).height();
        $('.course-statistics .course-statistics__body').css(
            'margin-top',
            heightOfHeader + 'px'
        );

        $(
            '.course-statistics__body__card__content__chart__filter__form__input'
        ).datetimepicker({
            format: 'd/m/Y',
            timepicker: false,
            mask: false
        });
    }

    shouldComponentUpdate() {
        return true;
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (
    //         prevProps.statisticCourse.statisticForPieChart.fetching &&
    //         !this.props.statisticCourse.statisticForPieChart.fetching
    //     ) {
    //         const newNumberAdmins = prevState.numberAdmins;
    //         const newPieChartData = prevState.pieChartData;

    //         // Gán số lượng loại chuyên cần cho component admin
    //         newNumberAdmins[0].quantity = this.props.statisticCourse.statisticForPieChart.data.totalOnTime;
    //         newNumberAdmins[1].quantity = this.props.statisticCourse.statisticForPieChart.data.totalLate;
    //         newNumberAdmins[2].quantity = this.props.statisticCourse.statisticForPieChart.data.totalAbsent;
    //         newNumberAdmins[3].quantity = this.props.statisticCourse.statisticForPieChart.data.totalRedundant;

    //         newNumberAdmins[0].isEmpty = newNumberAdmins[1].isEmpty = newNumberAdmins[2].isEmpty = newNumberAdmins[3].isEmpty = this.props.statisticCourse.statisticForPieChart.data.isEmpty;
    //         // Thống kê trên biểu đồ tròn
    //         newPieChartData.datasets[0].data = this.props.statisticCourse.statisticForPieChart.data.data;
    //         newPieChartData.labels = this.props.statisticCourse.statisticForPieChart.data.labels;
    //         newPieChartData.isEmpty = this.props.statisticCourse.statisticForPieChart.data.isEmpty;

    //         this.setState({
    //             numberAdmins: newNumberAdmins,
    //             pieChartData: newPieChartData
    //         });
    //     }

    //     if (
    //         prevProps.students.statisticForColumnChart.fetching &&
    //         !this.props.students.statisticForColumnChart.fetching
    //     ) {
    //         const newColumnChartData = prevState.columnChartData;

    //         // Thống kê trên biểu đồ cột
    //         newColumnChartData.datasets[0].data = this.props.students.statisticForColumnChart.data.data;
    //         newColumnChartData.labels = this.props.students.statisticForColumnChart.data.labels;
    //         newColumnChartData.isEmpty = this.props.students.statisticForColumnChart.data.isEmpty;

    //         this.setState({
    //             columnChartData: newColumnChartData
    //         });
    //     }

    //     if (
    //         prevProps.statisticCourse.statisticForLineChart.fetching &&
    //         !this.props.statisticCourse.statisticForLineChart.fetching
    //     ) {
    //         const newLineChartData = prevState.lineChartData;

    //         // Thông kê trên biểu đồ đường
    //         newLineChartData.datasets[0].data = this.props.statisticCourse.statisticForLineChart.data.dataAbsents;
    //         newLineChartData.datasets[1].data = this.props.statisticCourse.statisticForLineChart.data.dataLates;
    //         newLineChartData.datasets[2].data = this.props.statisticCourse.statisticForLineChart.data.dataOnTimes;
    //         newLineChartData.datasets[3].data = this.props.statisticCourse.statisticForLineChart.data.dataRedundants;

    //         newLineChartData.labels = this.props.statisticCourse.statisticForLineChart.data.labels;
    //         newLineChartData.isEmpty = this.props.statisticCourse.statisticForLineChart.data.isEmpty;

    //         this.setState({
    //             lineChartData: newLineChartData
    //         });
    //     }
    // }

    render() {

        return (
            <div className="course-statistics">
                {/* <CreatePackage show={this.state.modals.createPackage} hideModal={() => { this.showHideModal("createPackage") }} createPackage={this.createPackage} /> */}
                <React.Fragment>

                    <div className="course-statistics__body">
                        <div className="course-statistics__body__numbers">
                            <NumberAdmin
                                numberAdmin={this.state.numberAdmins.data.absent}
                                isFetching={this.state.numberAdmins.isFetching}
                                isEmpty={this.state.numberAdmins.isEmpty}
                            ></NumberAdmin>

                            <NumberAdmin
                                numberAdmin={this.state.numberAdmins.data.late}
                                isFetching={this.state.numberAdmins.isFetching}
                                isEmpty={this.state.numberAdmins.isEmpty}
                            ></NumberAdmin>

                            <NumberAdmin
                                numberAdmin={this.state.numberAdmins.data.onTime}
                                isFetching={this.state.numberAdmins.isFetching}
                                isEmpty={this.state.numberAdmins.isEmpty}
                            ></NumberAdmin>

                            <NumberAdmin
                                numberAdmin={this.state.numberAdmins.data.redundant}
                                isFetching={this.state.numberAdmins.isFetching}
                                isEmpty={this.state.numberAdmins.isEmpty}
                            ></NumberAdmin>
                        </div>
                        {/* <div className="course-statistics__body__card">
                            <div className="course-statistics__body__card__title">
                                Thông tin khóa học
                           </div>
                            <div className="course-statistics__body__card__content">
                                <div className="course-statistics__body__card__content__course">
                                    <div className="course-statistics__body__card__content__course__filter">
                                        <CustomSelect
                                            customSelect={this.state.customSelectCourse}
                                        ></CustomSelect>
                                    </div>
                                    <div className="course-statistics__body__card__content__course__info">
                                        {this.props.courses.fetching ? (
                                            'đang tải ...'
                                        ) : (
                                                <CourseInfo
                                                    courseInfo={this.props.courses.items[0]}
                                                ></CourseInfo>
                                            )}

                                        <ProfileAdmin
                      profileAdmin={this.state.profileAdmin}
                    ></ProfileAdmin>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className="course-statistics__body__card">
                            <div className="course-statistics__body__card__title">
                                Thống kê khóa học
                              </div>
                            <div className="course-statistics__body__card__content">
                                <div className="course-statistics__body__card__content__chart">
                                    <div className="course-statistics__body__card__content__chart__filter">
                                        <form className="course-statistics__body__card__content__chart__filter__form">
                                            <input
                                                type="text"
                                                className="course-statistics__body__card__content__chart__filter__form__input"
                                                placeholder="Chọn ngày bắt đầu"
                                            />
                                            <input
                                                type="text"
                                                className="course-statistics__body__card__content__chart__filter__form__input"
                                                placeholder="Chọn ngày kết thúc"
                                            />
                                            <button
                                                type="button"
                                                className="course-statistics__body__card__content__chart__filter__form__btn course-statistics__body__card__content__chart__filter__form__btn--primary"
                                            >
                                                thống kê
                                            </button>
                                        </form>
                                    </div>
                                    <div className="course-statistics__body__card__content__chart__row">
                                        <ColumnChart
                                            columnChartData={this.state.columnChartData}
                                            isFetching={this.state.columnChartData.isFetching}
                                            isEmpty={this.state.columnChartData.isEmpty}
                                        ></ColumnChart>

                                        <PieChart
                                            pieChartData={this.state.pieChartData}
                                            isFetching={this.state.pieChartData.isFetching}
                                            isEmpty={this.state.pieChartData.isEmpty}
                                        ></PieChart>
                                    </div>
                                    <div className="course-statistics__body__card__content__chart__row">
                                        <LineChart
                                            lineChartData={this.state.lineChartData}
                                            isFetching={this.state.lineChartData.isFetching}
                                            isEmpty={this.state.lineChartData.isEmpty}
                                        ></LineChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="course-statistics__body__table">
                            <Table
                                tableContents={this.state.tableDetails.data.absent}
                                isFetching={this.state.tableDetails.isFetching}
                                isEmpty={this.state.tableDetails.isEmpty}
                                formatKey="absent"
                            ></Table>

                            <Table
                                tableContents={this.state.tableDetails.data.late}
                                isFetching={this.state.tableDetails.isFetching}
                                isEmpty={this.state.tableDetails.isEmpty}
                                formatKey="late"
                            ></Table>

                            <Table
                                tableContents={this.state.tableDetails.data.onTime}
                                isFetching={this.state.tableDetails.isFetching}
                                isEmpty={this.state.tableDetails.isEmpty}
                                formatKey="onTime"
                            ></Table>

                            <Table
                                tableContents={this.state.tableDetails.data.redundant}
                                isFetching={this.state.tableDetails.isFetching}
                                isEmpty={this.state.tableDetails.isEmpty}
                                formatKey="redundant"
                            ></Table>
                        </div>
                    </div>
                </React.Fragment>
            </div>

        );
    }
}
