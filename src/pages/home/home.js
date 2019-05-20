import * as React from 'react';
import 'isomorphic-unfetch';
import { connect } from 'react-redux';

import Head from 'next/head';

import {
  NewPost,
  StandOutPost,
  StandOutPost2Column,
  RankBooks,
	SlideHome
} from "../../components";
// import { Slide } from "../../components";
import "./home.scss";

import '../../assets/bootstrap4/bootstrap.min.scss';

import { api } from '../../services';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import {Headline} from '../../components/headline/headline';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: [
				{
					img: '/img/slide0.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				},
				{
					img: '/img/slide1.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				},
				{
					img: '/img/slide2.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				},
				{
					img: '/img/slide3.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				},
				{
					img: '/img/slide4.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				},
				{
					img: '/img/slide0.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				}
			],

			typeBook: [
				{
					id: 1,
					name: 'Truyện ngắn'
				},
				{
					id: 2,
					name: 'Văn học'
				},
				{
					id: 3,
					name: 'Hồi ký'
				},
				{
					id: 4,
					name: 'Kỹ năng'
				}
			],
			AllTypeId: -1, //loại bài viết nổi bật là "Tất cả"
			currentIdTypeStandOut: -1,
			newPost: [
				{
					_id: 1,
					img: '/img/slide0.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					time: '8:00 23/01/2019'
				},
				{
					_id: 2,
					img: '/img/slide1.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 2,
					time: '8:00 23/01/2019'
				},
				{
					_id: 3,
					img: '/img/slide2.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 3,
					time: '8:00 23/01/2019'
				},
				{
					_id: 4,
					img: '/img/slide3.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					time: '8:00 23/01/2019'
				}
			],
			firstStandOutTypeBook: 1,
			secondStandOutTypeBook: 2,
			thirdStandOutTypeBook: 3,
			standOutPosts: [
				{
					_id: 1,
					img: '/img/slide0.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời 1',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					time: '8:00 23/01/2019',
					decription:
						'Ai cũng cần động lực để giúp bản thân làm những điều mình cần làm. Cuốn sách này giúp tôi nhận ra nhiều điều nên đây là cuốn sách gối đầu của tôi',
					love: 3,
					author: 'Nguyễn An Vy'
				},
				{
					_id: 2,
					img: '/img/slide1.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 2,
					time: '8:00 23/01/2019',
					decription: 'Cuốn sách gối đầu của tôi, một cuốn sách đáng đọc',
					love: 3,
					author: 'Nguyễn An Vy'
				},
				{
					_id: 3,
					img: '/img/slide2.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 3,
					time: '8:00 23/01/2019',
					decription: 'Cuốn sách gối đầu của tôi, một cuốn sách đáng đọc',
					love: 3,
					author: 'Nguyễn An Vy'
				},
				{
					_id: 4,
					img: '/img/slide3.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời 2',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					time: '8:00 23/01/2019',
					decription: 'Cuốn sách gối đầu của tôi, một cuốn sách đáng đọc',
					love: 3,
					author: 'Nguyễn An Vy'
				},
				{
					_id: 1,
					img: '/img/slide0.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời 1',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					time: '8:00 23/01/2019',
					decription:
						'Ai cũng cần động lực để giúp bản thân làm những điều mình cần làm. Cuốn sách này giúp tôi nhận ra nhiều điều nên đây là cuốn sách gối đầu của tôi',
					love: 3,
					author: 'Nguyễn An Vy'
				},
				{
					_id: 2,
					img: '/img/slide1.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 2,
					time: '8:00 23/01/2019',
					decription: 'Cuốn sách gối đầu của tôi, một cuốn sách đáng đọc',
					love: 3,
					author: 'Nguyễn An Vy'
				},
				{
					_id: 3,
					img: '/img/slide2.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 3,
					time: '8:00 23/01/2019',
					decription: 'Cuốn sách gối đầu của tôi, một cuốn sách đáng đọc',
					love: 3,
					author: 'Nguyễn An Vy'
				},
				{
					_id: 4,
					img: '/img/slide3.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời 2',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					time: '8:00 23/01/2019',
					decription: 'Cuốn sách gối đầu của tôi, một cuốn sách đáng đọc',
					love: 3,
					author: 'Nguyễn An Vy'
				}
			],

			rankBooks: [
				{
					id: 1,
					bookName: 'Tâm hồn cao thượng',
					img: '/img/rankBook.jpg',
					rating: 2,
					numberReview: 111,
					bookAuthor: 'Edmondo De Amicis',
					translater: 'Hà Mai Anh'
				},
				{
					id: 2,
					bookName: 'Tâm hồn cao thượng',
					img: '/img/rankBook.jpg',
					rating: 2,
					numberReview: 111,
					bookAuthor: 'Edmondo De Amicis',
					translater: 'Hà Mai Anh'
				},
				{
					id: 3,
					bookName: 'Tâm hồn cao thượng',
					img: '/img/rankBook.jpg',

					rating: 2,
					numberReview: 111,
					bookAuthor: 'Edmondo De Amicis',
					translater: 'Hà Mai Anh'
				},
				{
					id: 4,
					bookName: 'Tâm hồn cao thượng',
					img: '/img/rankBook.jpg',

					rating: 2,
					numberReview: 111,
					bookAuthor: 'Edmondo De Amicis',
					translater: 'Hà Mai Anh'
				},
				{
					id: 5,
					bookName: 'Tâm hồn cao thượng',
					img: '/img/rankBook.jpg',

					rating: 2,
					numberReview: 111,
					bookAuthor: 'Edmondo De Amicis',
					translater: 'Hà Mai Anh'
				}
			]
		};
	}

  async componentDidMount() {
    const result = await api.post.getList({
      query: { fields: ["$all", { postReactions: ["userId"] }] }
    });
    console.log("posts", result);
  }

  static async getInitialProps({ req, query }) {
    const result = await api.post.getList({
      query: { fields: ["$all", { postReactions: ["$all"] }] }
    });
    console.log("result", result);
    return {};
  }

  onToggleMenuStandoutPost = () => {
    const toggle = document.getElementById("menu-tab-small-screen");
    toggle.classList.toggle("menu-tab-small-screen-show");
  };
  onChangeTypePostStandOut = typeID => {
    this.setState({ currentIdTypeStandOut: typeID });
    const tabs = document.getElementsByClassName("tab-stand-out-type");
  };
  render() {
    return (
      <div>
        <Head>
          <title>Trang chủ</title>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous"/>
          <script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
            crossOrigin="anonymous"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossOrigin="anonymous"
          />
          {/* <script
            src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossOrigin="anonymous"
          /> */}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link href="../app.scss" rel="stylesheet" />
        </Head>
        {/* <Header {...this.props}/> */}
        
        <div className="home-main">
          <SlideHome slides={this.state.slides} />
          <div className="content-home-wrap">
            <div className="left">
              <Headline title="Bài viết nổi bật" />
              <div className="headline-stand-out headline-stand-out-posts">
                <div className="title">Bài viết nổi bật</div>
                <span id="type-stand-out">
                  {(this.state.currentIdTypeStandOut == this.state.AllTypeId &&
                    "Tất cả") ||
                    this.state.typeBook.filter(
                      item => item.id == this.state.currentIdTypeStandOut
                    )[0].name}
                </span>
                <div className="tab">
                  <div className="tab-wide-screen">
                    <button
                      className="tab-stand-out-type btn m-2 btn-sm"
                      onClick={() => {
                        this.onChangeTypePostStandOut(this.state.AllTypeId);
                      }}
                    >
                      Tất cả
                    </button>
                    {this.state.typeBook.map((item, index) => {
                      if (index < 2) {
                        return (
                          <button
                            className="tab-stand-out-type btn m-2 btn-sm"
                            onClick={() => {
                              this.onChangeTypePostStandOut(item.id);
                            }}
                          >
                            {item.name}
                          </button>
                        );
                      }
                    })}
                    <button
                      class="btn m-2 btn-sm dropdown-toggle tab-stand-out-type"
                      type="button"
                      id="dropdownMenu2"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Thêm
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                      {this.state.typeBook.map((item, index) => {
                        if (index >= 2) {
                          return (
                            <button
                              class="dropdown-item"
                              type="button"
                              onClick={() => {
                                this.onChangeTypePostStandOut(item.id);
                              }}
                            >
                              {item.name}
                            </button>
                          );
                        }
                      })}
                    </div>
                  </div>
                  <div
                    className="tab-small-screen"
                    onClick={() => {
                      this.onToggleMenuStandoutPost();
                    }}
                  >
                    <i class="fas fa-ellipsis-h" />
                  </div>
                </div>
              </div>
              <div id="menu-tab-small-screen">
                <ul
                  className="tab-stand-out-type"
                  onClick={() => {
                    this.onChangeTypePostStandOut(this.state.AllTypeId);
                  }}
                >
                  Tất cả
                </ul>
                {this.state.typeBook.map((item, index) => {
                  return (
                    <ul
                      className="tab-stand-out-type"
                      onClick={() => {
                        this.onChangeTypePostStandOut(item.id);
                      }}
                    >
                      {item.name}
                    </ul>
                  );
                })}
              </div>
              <StandOutPost
                posts={
                  (this.state.currentIdTypeStandOut == this.state.AllTypeId &&
                    this.state.standOutPosts) ||
                  this.state.standOutPosts.filter(
                    item => item.type == this.state.currentIdTypeStandOut
                  )
                }
                typeBook={this.state.typeBook}
              />
              {/* Bài viết nổi bật theo loại 1 */}
              <div className="headline-stand-out headline-stand-out-first">
                <div className="title">
                  {
                    this.state.typeBook.filter(
                      item => item.id == this.state.firstStandOutTypeBook
                    )[0].name
                  }
                </div>
              </div>
              <StandOutPost2Column
                posts={this.state.standOutPosts.filter(
                  (item, index) => item.type == this.state.firstStandOutTypeBook
                )}
                typeBook={this.state.typeBook}
              />
              {/* //Bài viết nổi bật theo loại 1 */}

							{/* Bài viết theo loại 2 */}
							<div className="headline-stand-out headline-stand-out-second">
								<div className="title">
									{
										this.state.typeBook.filter(
											(item) => item.id == this.state.secondStandOutTypeBook
										)[0].name
									}
								</div>
							</div>
							<StandOutPost
								posts={this.state.standOutPosts.filter(
									(item) => item.type == this.state.secondStandOutTypeBook
								)}
								typeBook={this.state.typeBook}
							/>
							{/* //Bài viết theo loại 2 */}

              {/* Bài viết nổi bật theo loại 3 */}
              <div className="headline-stand-out headline-stand-out-third">
                <div className="title">
                  {
                    this.state.typeBook.filter(
                      item => item.id == this.state.thirdStandOutTypeBook
                    )[0].name
                  }
                </div>
              </div>
              <StandOutPost2Column
                posts={this.state.standOutPosts.filter(
                  item => item.type == this.state.thirdStandOutTypeBook
                )}
                typeBook={this.state.typeBook}
              />
              {/* //Bài viết nổi bật theo loại 3 */}
            </div>
            <div className="right">
              {/* Bài viết mới nhất */}
              <NewPost posts={this.state.newPost} />
              {/* Bảng xếp hạng */}
              <div id="rank-book-home">
                <div className="headline-stand-out headline-stand-out-rating">
                  <div className="title">Bảng xếp hạng</div>
                </div>
                <div id="rank">
                  <RankBooks rankBooks={this.state.rankBooks} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(Home);
