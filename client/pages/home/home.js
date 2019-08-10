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
  TrainingClass,
  News,
  ContactUs,
  Trainer,
  Review,
  IntroHome,
  Slider,
  TrainerInfo,
  NumberSection,
  PostAuthor
  EventHour,
  LatestPost,
} from "../../components";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingClasses: [
        {
          category: "fitness",
          name: "chạy bộ",
          detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          time: "1 Giờ",
          star: 1,
          love: 800,
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-event-list-2a.jpg",
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
      },
      trainers: [
        {
          image:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/06/team2-img-8.jpg",
          link: "#",
          type: "physiotherapist",
          name: "jessica fox",
          facebook: "facebook.com",
          twitter: "twitter.com",
          instagram: "instagram.com"
        }
      ],
      review: {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp9UWxfO8gXd-LjSk2RhNeCrWXwJy69ruhejIsIY9Zw_HqDsxBQ",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum.",
        owner: "callie hern"
      },
      introHome: {
        link: "#",
        image: "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-icon-img-1.png",
        title: "run outdoors",
        content: "Lorem ipsum dolor sit amet, ad duo adipisci imperdiet, eum eu fugit."
      },
      eventHour: {
        weekday: "monday",
        timeStart: "15.00",
        timeEnd: "16.00",
        trainer: "alice hattaway"
      },
      latestPost: {
        link: "#",
        image: "https://dalia.elated-themes.com/wp-content/uploads/2018/05/blog-img-6-150x150.jpg",
        title: "clean beauty",
        date: "13th jun" 
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
        <Slider />
        <React.Fragment>
          <div className="body">
            <h1>Trang chủ</h1>
          </div>
          <TimeTable />
          {this.state.trainingClasses.map(trainingClass => {
            return <TrainingClass trainingClass={trainingClass} />;
          })}
          <TrainerInfo />
          <News news={this.state.news} />
          <ContactUs />
          <PostAuthor />
          <NumberSection />
          {this.state.trainers.map(trainer => {
            return <Trainer trainer={trainer} />;
          })}
          <Review review={this.state.review}></Review>
          <IntroHome introHome={this.state.introHome}></IntroHome>
          <EventHour eventHour={this.state.eventHour}></EventHour>
          <LatestPost latestPost={this.state.latestPost}></LatestPost>
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
