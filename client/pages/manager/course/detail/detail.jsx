import * as React from "react";
import { action } from '../../../../actions'
import { api } from '../../../../services'

import { CreatePackage } from './components'

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
    CourseInfo
} from '../../../../components';
import * as moment from 'moment'
import "./detail.scss"

export class DetailCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            modals: {
                createPackage: false
            },
            numberAdmins: [
                {
                    icon: '<i className="fas fa-id-card-alt"></i>',
                    about: 'Đi đúng giờ',
                    quantity: 0,
                    colorIcon: '#f5365c',
                    isEmpty: true
                },
                {
                    icon: '<i className="fas fa-id-card-alt"></i>',
                    about: 'Đi trễ',
                    quantity: 0,
                    colorIcon: '#fb6340',
                    isEmpty: true
                },
                {
                    icon: '<i className="fas fa-id-card-alt"></i>',
                    about: 'Vắng',
                    quantity: 0,
                    colorIcon: '#ffd600',
                    isEmpty: true
                },
                {
                    icon: '<i className="fas fa-id-card-alt"></i>',
                    about: 'Đi thừa',
                    quantity: 0,
                    colorIcon: '#11cdef',
                    isEmpty: true
                }
            ],
            customSelectCourse: {
                placeholder: 'Chọn khóa học...',
                options: ['Yoga cho người cao tuổi', 'Yoga cộng đồng']
            },
            absent: {
                nameTable: 'Danh sách học viên vắng học'
            },
            late: {
                nameTable: 'Danh sách học viên trễ giờ'
            },
            onTime: {
                nameTable: 'Danh sách học viên đúng giờ'
            },
            redundant: {
                nameTable: 'Danh sách học viên đi thừa'
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
                datasets: [
                    {
                        label: 'Số học viên',
                        data: null,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)'
                    }
                ],
                isEmpty: true
            },
            pieChartData: {
                labels: null,
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
                ],
                isEmpty: true
            },
            lineChartData: {
                labels: null,
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
                ],
                isEmpty: true
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
        // O trong trang detail nay goi truc tiep api vao set vao state khong dung redux tuong tu cai lay course o tren



        // this.props.fetchLineChart(
        //     '5d4e3d9201f8b3bbc9a5ebb4',
        //     'week',
        //     `${startTime}Z`,
        //     `${endTime}Z`,
        //     token
        // );

        // this.props.fetchPieChart(
        //     '5d4e3d9201f8b3bbc9a5ebb4',
        //     'month',
        //     `${startTime}Z`,
        //     `${endTime}Z`,
        //     token
        // );

        // this.props.fetchColumnChart(null, `${startTime}Z`, `${endTime}Z`, token);

        // this.props.fetchCourse({
        //     query: {
        //         filter: { _id: '5d4e3d9201f8b3bbc9a5ebb4' },
        //         populates: ['classes']
        //     }
        // });

        // this.props.fetchListDetail(
        //     '5d4e3d9201f8b3bbc9a5ebb4',
        //     'week',
        //     `${startTime}Z`,
        //     `${endTime}Z`,
        //     token
        // );

        // Cách 1
        // if (!this.props.setting.fetched) {
        //   this.props.fetchSetting();
        // }
        // Luôn luôn phải catch lỗi và xử lý nhằm tránh crash web
        // Cách 2
        // api.class.getList()
        //   .then(result => {
        //     console.log("result: ", result)
        //   })
        //   .catch(err => {
        //     console.log("Err: ", err)
        //   })
        // // Cách 3
        // try {
        //   const result = await api.class.getList();
        // } catch (err) { }
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
            '.courseDetails .courseDetails__header .headerAdmin__wrapper'
        ).height();
        $('.courseDetails .courseDetails__body').css(
            'margin-top',
            heightOfHeader + 'px'
        );

        $(
            '.courseDetails__body__card__content__chart__filter__form__input'
        ).datetimepicker({
            format: 'd/m/Y',
            timepicker: false,
            mask: false
        });
    }

    shouldComponentUpdate() {
        return true;
    }

    componentDidUpdate(prevProps, prevState) {

        if (
            prevProps.statisticCourse.statisticForPieChart.fetching &&
            !this.props.statisticCourse.statisticForPieChart.fetching
        ) {
            const newNumberAdmins = prevState.numberAdmins;
            const newPieChartData = prevState.pieChartData;

            // Gán số lượng loại chuyên cần cho component admin
            newNumberAdmins[0].quantity = this.props.statisticCourse.statisticForPieChart.data.totalOnTime;
            newNumberAdmins[1].quantity = this.props.statisticCourse.statisticForPieChart.data.totalLate;
            newNumberAdmins[2].quantity = this.props.statisticCourse.statisticForPieChart.data.totalAbsent;
            newNumberAdmins[3].quantity = this.props.statisticCourse.statisticForPieChart.data.totalRedundant;

            newNumberAdmins[0].isEmpty = newNumberAdmins[1].isEmpty = newNumberAdmins[2].isEmpty = newNumberAdmins[3].isEmpty = this.props.statisticCourse.statisticForPieChart.data.isEmpty;
            // Thống kê trên biểu đồ tròn
            newPieChartData.datasets[0].data = this.props.statisticCourse.statisticForPieChart.data.data;
            newPieChartData.labels = this.props.statisticCourse.statisticForPieChart.data.labels;
            newPieChartData.isEmpty = this.props.statisticCourse.statisticForPieChart.data.isEmpty;

            this.setState({
                numberAdmins: newNumberAdmins,
                pieChartData: newPieChartData
            });
        }

        if (
            prevProps.students.statisticForColumnChart.fetching &&
            !this.props.students.statisticForColumnChart.fetching
        ) {
            const newColumnChartData = prevState.columnChartData;

            // Thống kê trên biểu đồ cột
            newColumnChartData.datasets[0].data = this.props.students.statisticForColumnChart.data.data;
            newColumnChartData.labels = this.props.students.statisticForColumnChart.data.labels;
            newColumnChartData.isEmpty = this.props.students.statisticForColumnChart.data.isEmpty;

            this.setState({
                columnChartData: newColumnChartData
            });
        }

        if (
            prevProps.statisticCourse.statisticForLineChart.fetching &&
            !this.props.statisticCourse.statisticForLineChart.fetching
        ) {
            const newLineChartData = prevState.lineChartData;

            // Thông kê trên biểu đồ đường
            newLineChartData.datasets[0].data = this.props.statisticCourse.statisticForLineChart.data.dataAbsents;
            newLineChartData.datasets[1].data = this.props.statisticCourse.statisticForLineChart.data.dataLates;
            newLineChartData.datasets[2].data = this.props.statisticCourse.statisticForLineChart.data.dataOnTimes;
            newLineChartData.datasets[3].data = this.props.statisticCourse.statisticForLineChart.data.dataRedundants;

            newLineChartData.labels = this.props.statisticCourse.statisticForLineChart.data.labels;
            newLineChartData.isEmpty = this.props.statisticCourse.statisticForLineChart.data.isEmpty;

            this.setState({
                lineChartData: newLineChartData
            });
        }
    }
    render() {

        return (
            <div>
                <CreatePackage show={this.state.modals.createPackage} hideModal={() => { this.showHideModal("createPackage") }} createPackage={this.createPackage} />
                <React.Fragment>

                    <div className="courseDetails__body">
                        <div className="courseDetails__body__numbers">
                            {this.props.statisticCourse.statisticForPieChart.fetching
                                ? 'đang tải ...'
                                : this.state.numberAdmins.map((number, index) => {
                                    return (
                                        <NumberAdmin
                                            numberAdmin={number}
                                            key={index}
                                        ></NumberAdmin>
                                    );
                                })}
                        </div>
                        <div className="courseDetails__body__card">
                            <div className="courseDetails__body__card__title">
                                Thông tin khóa học
              </div>
                            <div className="courseDetails__body__card__content">
                                <div className="courseDetails__body__card__content__course">
                                    <div className="courseDetails__body__card__content__course__filter">
                                        <CustomSelect
                                            customSelect={this.state.customSelectCourse}
                                        ></CustomSelect>
                                    </div>
                                    <div className="courseDetails__body__card__content__course__info">
                                        {this.props.courses.fetching ? (
                                            'đang tải ...'
                                        ) : (
                                                <CourseInfo
                                                    courseInfo={this.props.courses.items[0]}
                                                ></CourseInfo>
                                            )}

                                        {/* <ProfileAdmin
                      profileAdmin={this.state.profileAdmin}
                    ></ProfileAdmin> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="courseDetails__body__card">
                            <div className="courseDetails__body__card__title">
                                Thống kê khóa học
              </div>
                            <div className="courseDetails__body__card__content">
                                <div className="courseDetails__body__card__content__chart">
                                    <div className="courseDetails__body__card__content__chart__filter">
                                        <form className="courseDetails__body__card__content__chart__filter__form">
                                            <input
                                                type="text"
                                                className="courseDetails__body__card__content__chart__filter__form__input"
                                                placeholder="Chọn ngày bắt đầu"
                                            />
                                            <input
                                                type="text"
                                                className="courseDetails__body__card__content__chart__filter__form__input"
                                                placeholder="Chọn ngày kết thúc"
                                            />
                                            <button
                                                type="button"
                                                className="courseDetails__body__card__content__chart__filter__form__btn courseDetails__body__card__content__chart__filter__form__btn--primary"
                                            >
                                                thống kê
                      </button>
                                        </form>
                                    </div>
                                    <div className="courseDetails__body__card__content__chart__row">
                                        <ColumnChart
                                            columnChartData={this.state.columnChartData}
                                            isFetching={
                                                this.props.students.statisticForColumnChart.fetching
                                            }
                                            isEmpty={this.state.columnChartData.isEmpty}
                                        ></ColumnChart>

                                        <PieChart
                                            pieChartData={this.state.pieChartData}
                                            isFetching={
                                                this.props.statisticCourse.statisticForPieChart.fetching
                                            }
                                            isEmpty={this.state.pieChartData.isEmpty}
                                        ></PieChart>
                                    </div>
                                    <div className="courseDetails__body__card__content__chart__row">
                                        <LineChart
                                            lineChartData={this.state.lineChartData}
                                            isFetching={
                                                this.props.statisticCourse.statisticForLineChart
                                                    .fetching
                                            }
                                            isEmpty={this.state.lineChartData.isEmpty}
                                        ></LineChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="courseDetails__body__table">
                            {this.props.statisticStudent.statisticForListDetail.fetching ? (
                                'Đang tải ...'
                            ) : (
                                    <Table
                                        tableContents={
                                            this.props.statisticStudent.statisticForListDetail.data
                                                .absents
                                        }
                                        staticContent={this.state.absent}
                                        formatKey="absents"
                                    ></Table>
                                )}

                            {this.props.statisticStudent.statisticForListDetail.fetching ? (
                                'Đang tải ...'
                            ) : (
                                    <Table
                                        tableContents={
                                            this.props.statisticStudent.statisticForListDetail.data
                                                .lates
                                        }
                                        staticContent={this.state.late}
                                        formatKey="lates"
                                    ></Table>
                                )}

                            {this.props.statisticStudent.statisticForListDetail.fetching ? (
                                'Đang tải ...'
                            ) : (
                                    <Table
                                        tableContents={
                                            this.props.statisticStudent.statisticForListDetail.data
                                                .onTimes
                                        }
                                        staticContent={this.state.onTime}
                                        formatKey="onTimes"
                                    ></Table>
                                )}

                            {this.props.statisticStudent.statisticForListDetail.fetching ? (
                                'Đang tải ...'
                            ) : (
                                    <Table
                                        tableContents={
                                            this.props.statisticStudent.statisticForListDetail.data
                                                .redundants
                                        }
                                        staticContent={this.state.redundant}
                                        formatKey="redundants"
                                    ></Table>
                                )}
                        </div>
                    </div>
                </React.Fragment>
            </div>

        );
    }
}
