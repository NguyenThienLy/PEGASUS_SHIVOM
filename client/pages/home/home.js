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
  News
} from "../../components";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingCourses: [
        {
          category: "fitness",
          name: "chạy bộ",
          detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          time: "1 Giờ",
          star: 1,
          love: 800,
          image: "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg",
          link: "#"
        }
      ],
      news: {
        image:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-img-1.jpg",
        link: "#",
        category: "lorem ipsum",
        title: "certified health professionals",
        detail:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum. Nisi nam corporis alias quo qui.",
        more: "read more"
      }
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
        <React.Fragment>
          <div className="body">
            <h1>Trang chủ</h1>
          </div>
          <TimeTable />
          {this.state.trainingCourses.map(trainingCourse => {
            return <TrainingCourse trainingCourse={trainingCourse} />;
          })}
          <News news={this.state.news} />
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
