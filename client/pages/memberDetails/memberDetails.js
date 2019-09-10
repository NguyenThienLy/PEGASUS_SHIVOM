import * as React from "react";

import Head from "next/head";
import { connect } from "react-redux";

import "./memberDetails.scss";
import {
  Sidebar,
  HeaderAdmin,
  NumberAdmin,
  PieChart,
  LineChart,
  Table,
  CustomSelect
} from "../../components";
import { MemberInfo } from "../../components/memberInfo/memberInfo";

export class MemberDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerAdmin: {
        avatar:
          "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
        name: "Avril Lavigne"
      },
      numberAdmins: [
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi đúng giờ",
          quantity: 184,
          colorIcon: "#f5365c"
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Đi trễ",
          quantity: 60,
          colorIcon: "#fb6340"
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
          about: "Vắng",
          quantity: 24,
          colorIcon: "#ffd600"
        },
        {
          icon: '<i class="fas fa-id-card-alt"></i>',
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
  static async getInitialProps({ req, query }) {
    return {};
  }
  handleScroll = () => {};
  componentWillUnmount() {}
  componentDidMount() {
    var heightOfHeader = $(
      ".memberDetails .memberDetails__header .headerAdmin"
    ).height();
    $(".memberDetails .memberDetails__body").css(
      "margin-top",
      heightOfHeader + "px"
    );
  }
  render() {
    return (
      <div className="memberDetails">
        <Head>
          <title>Member's Details</title>
          <meta name="title" content="Member's Details" />
          <meta
            name="description"
            content="Chi tiết học viên trung tâm yoga Hiệp Hòa"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          ></meta>
        </Head>
        <React.Fragment>
          <div className="memberDetails__header">
            <HeaderAdmin headerAdmin={this.state.headerAdmin}></HeaderAdmin>
          </div>
          <div className="memberDetails__sidebar">
            <Sidebar></Sidebar>
          </div>
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
              <Table></Table>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(MemberDetails);
