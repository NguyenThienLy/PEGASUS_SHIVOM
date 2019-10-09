import * as React from "react";

import Head from "next/head";
import { connect } from "react-redux";
import * as moment from "moment";
import { action } from "../../actions";
import { bindActionCreators } from "redux";

import "./member.scss";
import {
  Header,
  Footer,
  NumberAdmin,
  PieChart,
  ColumnChart,
  TimeTable,
  Activity,
  Feedback,
  Loading
} from "../../components";

export class Member extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTables: [],
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
      newStudent: {
        nameTable: "Học viên mới tham gia",
        content: "vừa nhập học"
      },
      columnChartData: {
        labels: null,
        datasets: [
          {
            label: "Số học viên",
            data: null,
            backgroundColor: "rgba(75, 192, 192, 0.6)"
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
              "rgba(255, 99, 132, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)"
            ]
          }
        ],
        isEmpty: true
      }
    };
  }

  static async getInitialProps({ req, query }) {
    return {};
  }

  fetchData = (startTime, endTime) => {
    const token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJfaWQiOiI1ZDQ4ZWM1ZmFiMGRhYTlkMmM0MDgwYzgiLCJleHBpcmVkQXQiOiIyMDE5LTA4LTI1VDIzOjE0OjA3KzA3OjAwIn0.ngV8I2vD652qTIwum2F4lTEx1brQ8TABgiOmVfY7v8M";
    this.props.fetchPieChart(
      null,
      "year",
      `${startTime}Z`,
      `${endTime}Z`,
      token
    );
    this.props.fetchColumnChart(null, `${startTime}Z`, `${endTime}Z`, token);
    this.props.fetchNewStudent({
      query: {
        filter: { status: "active" },
        limit: 10,
        order: { createdAt: -1 }
      },
      //fields: ["avatar","firstName", "lastName", "createdAt"],
      headers: {
        "x-token": token
      }
    });
    if (this.props.courses.items.length === 0) {
      this.props.fetchCourse();
    }
    if (this.props.newCategories.items.length === 0) {
      this.props.fetchNewCategory();
    }
    if (!this.props.setting.fetched) {
      this.props.fetchSetting();
    }
    if (this.props.timeTable.items.length === 0) {
      this.props.fetchTimeTable({
        query: {
          limit: 0
        }
      });
    }
  };

  handleScroll = () => { };
  componentWillUnmount() { }
  async componentDidMount() {
    // Lấy năm
    // startTime bắt đầu năm hiện tại
    // endTime bắt đầu năm hiện tại
    this.fetchData(
      moment()
        .startOf("year")
        .format("YYYY-MM-DD HH:mm:ss"),
      moment()
        .endOf("year")
        .format("YYYY-MM-DD HH:mm:ss")
    );

    $(".member__body__chart__content__filter__form__input").datetimepicker({
      format: "d/m/Y",
      timepicker: false,
      mask: false
    });
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    // if (
    //   prevProps.courses.items.length === 0 &&
    //   this.props.courses.items.length > 0
    // ) {
    //   const courseCategoryIndex = this.state.categories.findIndex(item => {
    //     return item.key === "course";
    //   });
    //   const subCategories = this.props.courses.items.map(item => {
    //     return {
    //       name: item.name,
    //       linkHref: `/course/course?slug=${item.slug}`,
    //       linkAs: `/khoa-hoc/${item.slug}`
    //     };
    //   });
    //   this.state.categories[courseCategoryIndex].subCategories = subCategories;
    //   this.setState({ categories: this.state.categories });
    // }
    // if (
    //   prevProps.newCategories.items.length === 0 &&
    //   this.props.newCategories.items.length > 0
    // ) {
    //   const newCategoryIndex = this.state.categories.findIndex(item => {
    //     return item.key === "news";
    //   });
    //   const subCategories = this.props.newCategories.items.map(item => {
    //     return {
    //       name: item.name,
    //       linkHref: `/blog/blog?categorySlug=${item.slug}`,
    //       linkAs: `/${item.slug}`
    //     };
    //   });
    //   this.state.categories[newCategoryIndex].subCategories = subCategories;
    //   this.setState({ categories: this.state.categories });
    // }

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

    return true;
  }

  render() {
    return (
      <div className="member">
        <Head>
          <title>Trang học viên</title>
          <meta name="title" content="Trang học viên" />
          <meta name="robots" content="noindex" />
          <meta
            name="description"
            content="Trang học viên trung tâm yoga Hiệp Hòa"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <React.Fragment>
          <div className="background-overlay"></div>
          <Header {...this.props} />

          <div className="member__body">
            <div className="member__body__personal-info">
              <div className="member__body__personal-info__title">
                <div className="member__body__personal-info__title__title-text">
                  Thông tin cá nhân
                </div>
                <button
                  href="#"
                  className="member__body__personal-info__title__button"
                >
                  Sửa
                </button>
              </div>
              <div className="member__body__personal-info__content">
                <form
                  className="member__body__personal-info__content__form"
                //onSubmit={this.submit}
                >
                  <div className="member__body__personal-info__content__form__info">
                    <div className="member__body__personal-info__content__form__info__item">
                      <div className="member__body__personal-info__content__form__info__item__title-text">
                        Mã số thẻ
                      </div>
                      <div className="member__body__personal-info__content__form__info__item__input-box">
                        0123456789
                      </div>
                    </div>
                    <div className="member__body__personal-info__content__form__info__item">
                      <div className="member__body__personal-info__content__form__info__item__title-text">
                        Điểm tích lũy
                      </div>
                      <input
                        className="member__body__personal-info__content__form__info__item__input-box"
                        disabled
                        defaultValue={0}
                        type="number"
                        ref="point"
                        name="point"
                      //onChange={this.handleChange}
                      />
                    </div>
                    <div className="member__body__personal-info__content__form__info__icon">
                      <i className="fas fa-address-card"></i>
                    </div>
                  </div>
                  <div className="member__body__personal-info__content__form__info">
                    <div className="member__body__personal-info__content__form__info__item">
                      <div className="member__body__personal-info__content__form__info__item__title-text">
                        Họ
                      </div>
                      <input
                        className="member__body__personal-info__content__form__info__item__input-box"
                        disabled
                        value="Nguyễn"
                        type="text"
                        ref="firstName"
                        name="firstName"
                      //onChange={this.handleChange}
                      />
                    </div>
                    <div className="member__body__personal-info__content__form__info__item">
                      <div className="member__body__personal-info__content__form__info__item__title-text">
                        Tên đệm và tên
                      </div>
                      <input
                        className="member__body__personal-info__content__form__info__item__input-box"
                        disabled
                        value="Văn A"
                        type="text"
                        ref="lastName"
                        name="lastName"
                      //onChange={this.handleChange}
                      />
                    </div>
                    <div className="member__body__personal-info__content__form__info__item">
                      <div className="member__body__personal-info__content__form__info__item__title-text">
                        Số điện thoại
                      </div>
                      <input
                        className="member__body__personal-info__content__form__info__item__input-box"
                        disabled
                        value="0123456789"
                        type="text"
                        required
                        ref="phone"
                        name="phone"
                      //onChange={this.handleChange}
                      />
                    </div>
                    <div className="member__body__personal-info__content__form__info__item">
                      <div className="member__body__personal-info__content__form__info__item__title-text">
                        Sinh nhật
                      </div>
                      <input
                        className="member__body__personal-info__content__form__info__item__input-box"
                        disabled
                        value="2013-01-08"
                        type="date"
                        ref="birthday"
                        name="birthday"
                      //onChange={this.handleChange}
                      />
                    </div>
                    <div className="member__body__personal-info__content__form__info__item member__body__personal-info__content__form__info__item--single">
                      <div className="member__body__personal-info__content__form__info__item__title-text">
                        Địa chỉ
                      </div>
                      <input
                        className="member__body__personal-info__content__form__info__item__input-box"
                        disabled
                        value="số nhà/ đường/ phường/ ..."
                        type="text"
                        ref="address"
                        name="address"
                      //onChange={this.handleChange}
                      />
                    </div>
                    <div className="member__body__personal-info__content__form__info__icon">
                      <i className="fas fa-user-alt"></i>
                    </div>
                  </div>
                  <div className="member__body__personal-info__content__form__info member__body__personal-info__content__form__info--hidden">
                    <div className="member__body__personal-info__content__form__info__item member__body__personal-info__content__form__info__item--single">
                      <div className="member__body__personal-info__content__form__info__item__title-text">
                        Cập nhật ảnh đại diện
                      </div>
                      <div className="member__body__personal-info__content__form__info__item__avatar">
                        <img
                          src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-1a-768x768.jpg"
                          alt=""
                        />
                      </div>

                      <div className="newMemberInfo__form__info__icon">
                        <i className="fas fa-camera-retro"></i>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="member__body__personal-info__content__avatar">
                  <div className="member__body__personal-info__content__avatar__image">
                    <img
                      src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-1a-768x768.jpg"
                      alt=""
                    />
                  </div>
                  <div className="member__body__personal-info__content__avatar__name">
                    <span>Hoàng Thị Ngọc Hạnh</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="member__body__chart">
              <div className="member__body__chart__title">
                <div className="member__body__chart__title__title-text">
                  Thống kê
                </div>
              </div>

              <div className="member__body__chart__content">
                <div className="member__body__chart__content__filter">
                  <form className="member__body__chart__content__filter__form">
                    <input
                      type="text"
                      className="member__body__chart__content__filter__form__input"
                      placeholder="Chọn ngày bắt đầu"
                    />
                    <input
                      type="text"
                      className="member__body__chart__content__filter__form__input"
                      placeholder="Chọn ngày kết thúc"
                    />
                    <button
                      type="button"
                      className="member__body__chart__content__filter__form__button"
                    >
                      thống kê
                    </button>
                  </form>
                </div>

                <div className="member__body__chart__content__numbers">
                  {this.props.statisticCourse.statisticForPieChart.fetching ? (
                    <Loading />
                  ) : (
                      this.state.numberAdmins.map((number, index) => {
                        return (
                          <NumberAdmin
                            numberAdmin={number}
                            key={index}
                          ></NumberAdmin>
                        );
                      })
                    )}
                </div>

                <div className="member__body__chart__content__chart">
                  <ColumnChart
                    columnChartData={this.state.columnChartData}
                    isFetching={
                      this.props.students.statisticForColumnChart.fetching
                    }
                    isEmpty={this.state.columnChartData.isEmpty}
                  ></ColumnChart>
                </div>

                <div className="member__body__chart__content__chart">
                  <PieChart
                    pieChartData={this.state.pieChartData}
                    isFetching={
                      this.props.statisticCourse.statisticForPieChart.fetching
                    }
                    isEmpty={this.state.pieChartData.isEmpty}
                  ></PieChart>
                </div>
              </div>
            </div>

            <div className="member__body__time-table">
              <div className="member__body__time-table__title">
                <div className="member__body__time-table__title__title-text">
                  Thời khóa biểu
                </div>
              </div>

              <div className="member__body__time-table__content">
                {this.props.timeTable.fetching === false ? (
                  <TimeTable
                    courses={this.props.courses}
                    timeTables={this.props.timeTable.items}
                  />
                ) : null}
              </div>
            </div>

            <div className="member__body__more">
              <div className="member__body__more__title">
                <div className="member__body__more__title__title-text">
                  Các thông tin khác
                </div>
              </div>

              <div className="member__body__more__content">
                <div className="member__body__more__content__feedback">
                  <Feedback></Feedback>
                </div>
                <div className="member__body__more__content__activities">
                  <Activity
                    activities={this.props.students.itemsNewStudents.data}
                    staticContent={this.state.newStudent}
                  ></Activity>
                </div>
              </div>
            </div>
          </div>

          <Footer
            {...this.props.setting.contact}
            logo={this.props.setting.logo}
            social={this.props.setting.social}
          />
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSetting: action.setting.fetch,
      fetchNewCategory: action.newCategory.fetch,
      fetchCourse: action.course.fetch,
      fetchTimeTable: action.timeTable.fetch,
      fetchPieChart: action.statisticCourse.fetchForPieChart,
      fetchColumnChart: action.student.fetchForColumnChart,
      fetchNewStudent: action.student.fetchForNewStudents
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member);
