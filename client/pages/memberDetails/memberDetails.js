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
      customSelect: {
        placeholder: "Chọn năm...",
        options: [2015, 2016, 2017, 2018, 2019]
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
            <div className="memberDetails__body__chart">
              <div className="memberDetails__body__chart__filter">
                <CustomSelect
                  customSelect={this.state.customSelect}
                ></CustomSelect>
              </div>
              <div className="memberDetails__body__chart__row">
                <LineChart></LineChart>
              </div>
              <div className="memberDetails__body__chart__row">
                <PieChart></PieChart>
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
