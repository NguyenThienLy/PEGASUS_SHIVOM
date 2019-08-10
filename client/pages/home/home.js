import * as React from "react";
import { connect } from "react-redux";
import Head from "next/head";
import Link from "next/link";
import { action } from "../../actions";
import { api } from "../../services";

import "./home.scss";
import {
  Footer,
  Header,
  TimeTable,
  DefaultButton,
  TrainingCourse,
  ContactUs,
  Slider,
  ClassTrainer
} from "../../components";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingCourses: [
        {
          category: "fitness",
          name: "chạy bộ",
          info:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          time: "1 Giờ",
          star: 1,
          love: 800
        }
      ]
    };
  }
  static async getInitialProps({ req, query }) {
    return {};
  }
  async componentDidMount() {}

  render() {
    return (
      <div>
        <Head>
          <title>Trang chủ</title>
          <meta name="title" content="Công ty Pegasus" />
          <meta
            name="description"
            content="Công ty công nghệ lớn nhất thế giới"
          />
        </Head>
        <Header {...this.props} />
        <Slider />
        <React.Fragment>
          <div className="body">
            <h1>Trang chủ</h1>
          </div>
          <TimeTable />
          <ClassTrainer />
          <DefaultButton content="Xem thêm" />
          {this.state.trainingCourses.map(trainingCourse => {
            return (
              <TrainingCourse trainingCourse={trainingCourse} ></TrainingCourse>
            );
          })}
          <ContactUs />
        </React.Fragment>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Home);
