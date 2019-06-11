import * as React from 'react';
import 'isomorphic-unfetch';
import { connect } from 'react-redux';

import Head from 'next/head';
import Link from 'next/link';
import * as moment from 'moment';
import * as _ from 'lodash';

import { NewPost, StandOutPost, StandOutPost2Column, SlideHome } from './components';
import './home.scss';

import '../../assets/bootstrap4/bootstrap.min.scss';

import { api } from '../../services';
import { RankBooks, Footer, Headline, Header, Slide, Loading } from '../../components';
import { action } from '../../actions';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: [],
			posts: [],
			slides: [
				{
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				},
				{
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				},
				{
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				},
				{
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				},
				{
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					author: 'Tạ Minh Tuấn',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					quote:
						'Hãy trở thành người nhạc trưởng của chính cuộc đời bạn. Đừng sống vô nghĩa để rồi chết đi và mang theo xuống mồ bản nhạc có ý nghĩa nhất của đời người, chưa bao giờ được cất lên'
				},
				{
					img: 'https://i.imgur.com/OTzZkvy.jpg',
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

			newPost: [
				{
					_id: 1,
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					time: '8:00 23/01/2019'
				},
				{
					_id: 2,
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 2,
					time: '8:00 23/01/2019'
				},
				{
					_id: 3,
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 3,
					time: '8:00 23/01/2019'
				},
				{
					_id: 4,
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					time: '8:00 23/01/2019'
				}
			],

			standOutPosts: [
				{
					_id: 1,
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
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
					img: 'https://i.imgur.com/OTzZkvy.jpg',
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
					img: 'https://i.imgur.com/OTzZkvy.jpg',
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
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
					book: 'Trước bình minh luôn là đêm tối',
					type: 1,
					time: '8:00 23/01/2019',
					decription: 'Cuốn sách gối đầu của tôi, một cuốn sách đáng đọc',
					love: 3,
					author: 'Nguyễn An Vy'
				},
				{
					_id: 1,
					img: 'https://i.imgur.com/OTzZkvy.jpg',
					title: 'Cuốn sách giúp tôi hướng về phía mặt trời',
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
					img: 'https://i.imgur.com/OTzZkvy.jpg',
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
					img: 'https://i.imgur.com/OTzZkvy.jpg',
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
					img: 'https://i.imgur.com/OTzZkvy.jpg',
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
					img:
						'https://bizweb.dktcdn.net/100/197/269/products/nhung-ao-tuong-ve-thien-tai.jpg?v=1554448287327',
					rating: 2,
					numberReview: 111,
					bookAuthor: 'Edmondo De Amicis',
					translater: 'Hà Mai Anh'
				},
				{
					id: 2,
					bookName: 'Tâm hồn cao thượng',
					img: 'https://bizweb.dktcdn.net/100/197/269/products/vung-tam-ben-chi.jpg?v=1551675626777',
					rating: 2,
					numberReview: 111,
					bookAuthor: 'Edmondo De Amicis',
					translater: 'Hà Mai Anh'
				},
				{
					id: 3,
					bookName: 'Tâm hồn cao thượng',
					img: 'https://bizweb.dktcdn.net/100/197/269/products/planet-web.jpg?v=1552897461427',

					rating: 2,
					numberReview: 111,
					bookAuthor: 'Edmondo De Amicis',
					translater: 'Hà Mai Anh'
				},
				{
					id: 4,
					bookName: 'Tâm hồn cao thượng',
					img: 'https://bizweb.dktcdn.net/100/197/269/products/bia-trc-1.jpg?v=1536824414917',

					rating: 2,
					numberReview: 111,
					bookAuthor: 'Edmondo De Amicis',
					translater: 'Hà Mai Anh'
				},
				{
					id: 5,
					bookName: 'Tâm hồn cao thượng',
					img: 'https://bizweb.dktcdn.net/100/197/269/products/t-pha.jpg?v=1526350219870',

					rating: 2,
					numberReview: 111,
					bookAuthor: 'Edmondo De Amicis',
					translater: 'Hà Mai Anh'
				}
			]
		};
	}

	async componentDidMount() {
		try {
			const posts = await api.post.getList({
				query: {
					fields: [
						'$all',
						{ user: ['firstName', 'lastName'], book: ['$all', { category: ['$all'] }] }
					],
					limit: 100
				}
			});
			let categories = posts.map((post) => {
				return post.book.category;
			});
			categories = _.unionBy(categories, '_id');
			console.log('categories : ', categories);
			this.setState({
				categories: categories,
				posts: posts
			});
		} catch (err) {
			console.log('err: ', err);
		}
	}

	static async getInitialProps({ req, query }) {
		return {};
	}

	render() {
		return (
			<div>
				<Head>
					<title>Trang chủ</title>
					<link
						rel="stylesheet"
						href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
						integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
						crossorigin="anonymous"
					/>
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
					<script
						src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
						integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
						crossOrigin="anonymous"
					/>

					<meta name="title" content="Mạng xã hội những người yêu sách, thích viết lách" />
					<meta name="description" content="Mạng xã hội những người yêu sách, thích viết lách" />
					<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
					<link href="../app.scss" rel="stylesheet" />
				</Head>
				<Header {...this.props} />
				{this.state.posts.length > 0 ? (
					<div className="home-main">
						<SlideHome slides={this.state.slides} />
						<div className="content-home-wrap">
							<div className="left">
								{/* Bài viết nổi bật */}
								<div className="left__standout-posts">
									<div className="headline-stand-out headline-stand-out-posts">
										<div>
											<div className="title">Bài viết nổi bật</div>
										</div>
									</div>
									<StandOutPost posts={this.state.standOutPosts} typeBook={this.state.typeBook} />
								</div>

								<div class="home-popular-post-by-category">
									{this.state.categories.map((category, index) => {
										return (
											<div key={category._id}>
												<div className="headline-stand-out headline-stand-out-first">
													<Link href={`/the-loai/${category.slug}`}>
														<div className="title">{category.name}</div>
													</Link>
												</div>
												<StandOutPost2Column
													posts={this.state.posts.filter(
														(item, index) => item.book.category._id == category._id
													)}
													typeBook={this.state.typeBook}
												/>
											</div>
										);
									})}
								</div>

							</div>


							<div className="right">
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
				) : (
						<Loading />
					)}
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(Home);
