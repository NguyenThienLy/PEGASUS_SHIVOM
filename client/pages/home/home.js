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
  PostAuthor,
  EventHour,
  LatestPost,
  IntroHome2,
  News2,
  NumberAdmin,
  ProfileAdmin,
  Table,
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
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum. Nisi nam corporis alias quo qui.",
        button: "read more"
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
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlp9UWxfO8gXd-LjSk2RhNeCrWXwJy69ruhejIsIY9Zw_HqDsxBQ",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate inventore similique, autem, eius dolore iure numquam a deserunt officia, quisquam velit nostrum ea cum.",
        owner: "callie hern"
      },
      introHome: {
        link: "#",
        image:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-home-icon-img-1.png",
        title: "run outdoors",
        content:
          "Lorem ipsum dolor sit amet, ad duo adipisci imperdiet, eum eu fugit."
      },
      eventHour: {
        weekday: "monday",
        timeStart: "15.00",
        timeEnd: "16.00",
        trainer: "alice hattaway"
      },
      latestPost: {
        link: "#",
        image:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/05/blog-img-6-150x150.jpg",
        title: "clean beauty",
        date: "13th jun"
      },
      introHome2: {
        image:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/05/h1-icon-img-1.png",
        title: "relaxing massage",
        content:
          "Lorem ipsum dolor sit amet, ad duo adipisci imperdiet, eum eu fugit."
      },
      news2: {
        link: "#",
        author: { name: "jessica smith", link: "#" },
        category: { name: "post", link: "#" },
        tags: [
          { name: "business", link: "#" },
          { name: "city break", link: "#" },
          { name: "vacations", link: "#" }
        ],
        title: "almond butter fig healthy hair smoothie",
        image:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/06/nutrition-home-blog-img-5-768x569.jpg",
        dateCreated: { link: "#", day: "7th", month: "jun" },
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae feugiat magna, ut mattis ligula. Aliquam ut rutrum est. Maecenas sit amet scelerisque orci. Aenean et ex ut elit tincidunt rutrum vitae eleifend metus. Nunc tincidunt venenatis tellus euismod fermentum. Maecenas sed dapibus eros. Phasellus eu mi metus. Nunc mi nisl, viverra id sollicitudin et, auctor sit amet augue. Morbi blandit dolor ac rhoncus semper. Donec rutrum risus vitae arcu interdum condimentum. Pellentesque eu ex metus. Maecenas facilisis est at aliquet blandit. Nullam volutpat ultricies enim, ut pulvinar enim placerat non. Aenean facilisis aliquam felis in fermentum. Aenean ullamcorper pharetra purus.",
        comment: { link: "#", quantity: 3 },
        love: { link: "#", quantity: 0 },
        button: "read more"
      },
      numberAdmin: {
        icon: '<i class="fas fa-id-card-alt"></i>',
        about: "booking",
        quantity: 184
      },
      profileAdmin: {
        image:
          "https://dalia.elated-themes.com/wp-content/uploads/2018/06/team2-img-8.jpg",
        name: "nisha sharma",
        phone: "0947161096",
        email: "nisha_sharma@gmail.com",
        location: "remote",
        age: 25,
        facebook: "facebook.com",
        twitter: "twitter.com",
        instagram: "instagram.com"
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
          <Review review={this.state.review} />
          <IntroHome introHome={this.state.introHome} />
          <EventHour eventHour={this.state.eventHour} />
          <LatestPost latestPost={this.state.latestPost} />
          <IntroHome2 introHome2={this.state.introHome2} />
          <News2 news2={this.state.news2} />
          <NumberAdmin numberAdmin={this.state.numberAdmin} />
          <ProfileAdmin profileAdmin={this.state.profileAdmin}></ProfileAdmin>
          <Table></Table>
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
