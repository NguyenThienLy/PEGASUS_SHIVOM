import * as React from 'react';
import 'isomorphic-unfetch';
import { connect } from 'react-redux';
import { Header, Headline, Footer, PostItem3, FollowedReviewerItem, ItemSavedBook } from '../../components';
import Head from 'next/head';
import './profile.scss';

import { Editor } from './components/editor/editor';
import Information from './components/information/information';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showEditor: false,
			tabs: [
				{
					id: 0,
					name: 'Trang cá nhân'
				},
				{
					id: 1,
					name: 'Theo dõi'
				},
				{
					id: 2,
					name: 'Sách đã lưu'
				},
				{
					id: 3,
					name: 'Bài viết đã lưu'
				}
			],
			activeTab: 2,
			savedTabId: 2,
			isHomeUser: true,
			user: {
				_id: '1',
				firebaseUid: '',
				firebaseUserInfo: '',
				username: 'Minh Nhi',
				firstName: 'Trần',
				lastName: 'Minh Nhi',
				email: 'tmnhi@gmail.com',
				description: 'Là một người thích đọc sách',
				birthday: '23/02/1998',
				quote: 'Nếu giấc mơ của bạn không làm bạn sợ, rõ ràng giấc mơ đó chưa đủ lớn',
				job: '',
				score: 12,
				influenceScore: 1,
				avatar: '/img/avata-demo.jpg',
				cover: '',
				role: 'guest'
			},
			followdReviewers: [
				{
					_id: '1',
					firebaseUid: '',
					firebaseUserInfo: '',
					username: 'lam123',
					firstName: 'Nguyễn Nhật Ánh',
					lastName: 'Lam',
					email: 'tmnhi@gmail.com',
					description: 'Là một người thích đọc sách',
					birthday: '23/02/1998',
					quote: 'Nếu giấc mơ của bạn không làm bạn sợ, rõ ràng giấc mơ đó chưa đủ lớn',
					job: '',
					score: 12,
					influenceScore: 1,
					avatar: '/img/avata-demo.jpg',
					cover: '',
					role: 'guest'
				},
				{
					_id: '1',
					firebaseUid: '',
					firebaseUserInfo: '',
					username: 'Minh Nhi',
					firstName: 'Trần',
					lastName: 'Minh Hoa',
					email: 'tmnhi@gmail.com',
					description: 'Là một người thích đọc sách',
					birthday: '23/02/1998',
					quote: 'Nếu giấc mơ của bạn không làm bạn sợ, rõ ràng giấc mơ đó chưa đủ lớn',
					job: '',
					score: 12,
					influenceScore: 1,
					avatar: '/img/avata-demo.jpg',
					cover: '',
					role: 'guest'
				},
				{
					_id: '1',
					firebaseUid: '',
					firebaseUserInfo: '',
					username: 'Minh Nhi',
					firstName: 'Trần',
					lastName: 'Minh Thảo',
					email: 'tmnhi@gmail.com',
					description: 'Là một người thích đọc sách',
					birthday: '23/02/1998',
					quote: 'Nếu giấc mơ của bạn không làm bạn sợ, rõ ràng giấc mơ đó chưa đủ lớn',
					job: '',
					score: 12,
					influenceScore: 1,
					avatar: '/img/avata-demo.jpg',
					cover: '',
					role: 'guest'
				}
			],
			postsFromUser: [
				{
					id: 1,
					title: 'Hãy hướng về phía mặt trời',
					slug: '',
					description:
						'Ai cũng cần động lực để giúp bản thân làm những điều mình cần làm. Cuốn sách này giúp tôi nhận ra nhiều điều trong cuộc sống',
					postTemplate: '',
					content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

					Why do we use it?
					It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
					
					
					Where does it come from?
					Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.'`,
					thumb:
						'http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/book-759873_1920-370x218.jpg',
					images:
						'http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/book-759873_1920-370x218.jpg',
					userId: '',
					bookId: '',
					createAt: '10:34 12/03/2019',
					book: 'Trước bình minh là đêm tối',
					postReactions: 4
				},
				{
					id: 2,
					images:
						'http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/glasses-272399_1920-370x218.jpg',
					createAt: '10:34 12/03/2019',
					title: 'Sống là cho đâu chỉ nhận riêng mình',
					author: 'Nguyễn Nhật Minh Vy',
					description:
						'Cuộc sống là một cuốn nhật ký và bạn chính là chủ nhân. Hãy viêt sao để nó trở thành cuốn nhật ký đáng đọc.',
					postReactions: 4,
					bookId: '',
					book: 'Trước bình minh là đêm tối',
					content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

					Why do we use it?
					It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
					
					
					Where does it come from?
					Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.'`
				}
			],
			savedBooks: {
				page: 20,
				currentPage: 15,
				books: [
					{
						title: 'Chỉ có gió mới biết 0 ',
						authorName: 'Don Bosco Việt Nam',
						thumb: '/img/rankBook.jpg'
					},
					{
						title: 'Chỉ có gió mới biết 1',
						authorName: 'Don Bosco Việt Nam',
						thumb: '/img/rankBook.jpg'
					},
					{
						title: 'Chỉ có gió mới biết 2',
						authorName: 'Don Bosco Việt Nam',
						thumb: '/img/rankBook.jpg'
					},
					{
						title: 'Chỉ có gió mới biết 3',
						authorName: 'Don Bosco Việt Nam',
						thumb: '/img/rankBook.jpg'
					},
					{
						title: 'Chỉ có gió mới biết 4',
						authorName: 'Don Bosco Việt Nam',
						thumb: '/img/rankBook.jpg'
					},
					{
						title: 'Chỉ có gió mới biết 5',
						authorName: 'Don Bosco Việt Nam',
						thumb: '/img/rankBook.jpg'
					}
				]
			},
			savedPost: [
				{
					id: 1,
					title: 'Hãy hướng về phía mặt trời',
					slug: '',
					description:
						'Ai cũng cần động lực để giúp bản thân làm những điều mình cần làm. Cuốn sách này giúp tôi nhận ra nhiều điều trong cuộc sống',
					postTemplate: '',
					content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

					Why do we use it?
					It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
					
					
					Where does it come from?
					Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.'`,
					thumb:
						'http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/book-759873_1920-370x218.jpg',
					images:
						'http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/book-759873_1920-370x218.jpg',
					userId: '',
					bookId: '',
					createAt: '10:34 12/03/2019',
					book: 'Trước bình minh là đêm tối',
					postReactions: 4
				},
				{
					id: 2,
					images:
						'http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/glasses-272399_1920-370x218.jpg',
					createAt: '10:34 12/03/2019',
					title: 'Sống là cho đâu chỉ nhận riêng mình',
					author: 'Nguyễn Nhật Minh Vy',
					description:
						'Cuộc sống là một cuốn nhật ký và bạn chính là chủ nhân. Hãy viêt sao để nó trở thành cuốn nhật ký đáng đọc.',
					postReactions: 4,
					bookId: '',
					book: 'Trước bình minh là đêm tối',
					content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

					Why do we use it?
					It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
					
					
					Where does it come from?
					Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.'`
				}
			]
		};
		this.handleClose = this.handleClose.bind(this);
	}
	static async getInitialProps({ req, query }) {
		return {};
	}
	async handleClose() {
		console.log('close');
		this.setState({
			showEditor: false
		});
	}

	openEditor() {
		console.log('on open');
		this.setState({ showEditor: true });
	}

	createPost = () => {};

	// createPost = (title, desciption, content, thumb) => {
	// 	const title = document.getElementById('title-new-post').value;
	// 	const desciption = document.getElementById('desciption-new-post').value;

	// 	//TODO: get content
	// 	const content = 'content demo';

	// 	// console.log('title demo: ', title);
	// };
	changeActiveTab = (id) => {
		this.setState({ activeTab: id });
	};

	getPageSavedBook = (page, active) => {
		let result = [];
		const spacePage = 3;
		result.push(<div className="profile__content--paging -page -first">{`<<`}</div>);

		if (page <= spacePage * 2) {
			for (let i = 1; i < page - 1; i++) {
				result.push(<div className="profile__content--paging -page">{i}</div>);
			}
		} else {
			let start = 1,
				end = page - 1;
			if (active > spacePage) {
				result.push(<div className="profile__content--paging -more">...</div>);
				start = active;
			}

			if (active + spacePage < page - 1) {
				end = active + spacePage;
			}

			for (let i = start; i < end; i++) {
				result.push(<div className="profile__content--paging -page">{i}</div>);
			}
			if (end == active + spacePage) {
				result.push(<div className="profile__content--paging -more">...</div>);
			}
		}
		result.push(<div className="profile__content--paging -page -last">>></div>);
		return result;
	};

	getContent = () => {
		let result;
		switch (this.state.activeTab) {
			case 0: //home
				result = [];
				if (this.state.isHomeUser) {
					result.push(
						<div className="write-post" onClick={() => this.openEditor()}>
							<input type="text" name="" id="write-post" placeholder="" />
							<div className="placeholder">
								<div>
									<i class="fas fa-pen-fancy" /> Hãy chia sẽ cảm nhận về sách tại đây
								</div>
							</div>
						</div>
					);
				}

				result.push(
					<div className="profile__content--home">
						<div className="posts-wrap">
							{this.state.postsFromUser.map((item, index) => {
								return <PostItem3 post={item} author={this.state.user} />;
							})}
						</div>
					</div>
				);
				break;
			case 1: //follower
				result = (
					<div className="profile__content--followed-review">
						<div className="followed-review__column--one">
							{this.state.followdReviewers.map((item, index) => {
								return (
									index % 3 == 0 && (
										<FollowedReviewerItem
											name={item.firstName + ' ' + item.lastName}
											numberFan={12}
											imgurl={item.avatar}
										/>
									)
								);
							})}
						</div>
						<div className="followed-review__column--two">
							{this.state.followdReviewers.map((item, index) => {
								return (
									index % 3 == 1 && (
										<FollowedReviewerItem
											name={item.firstName + ' ' + item.lastName}
											numberFan={12}
											imgurl={item.avatar}
										/>
									)
								);
							})}
						</div>
						<div className="followed-review__column--three">
							{this.state.followdReviewers.map((item, index) => {
								return (
									index % 3 == 2 && (
										<FollowedReviewerItem
											name={item.firstName + ' ' + item.lastName}
											numberFan={12}
											imgurl={item.avatar}
										/>
									)
								);
							})}
						</div>
					</div>
				);
				break;
			case 2: //saved book
				const numberBookInRow = 4;
				result = (
					<div className="profile__content--saved-book-wrap">
						<div className="profile__content--paging">
							{this.getPageSavedBook(this.state.savedBooks.page, this.state.savedBooks.currentPage)}
						</div>
						<div className="profile__content--saved-book">
							<div className="save-book__column -one">
								{this.state.savedBooks.books.map((item, index) => {
									return (
										index % numberBookInRow == 0 && (
											<div className="save-book__column--item">
												<ItemSavedBook
													title={item.title}
													img_src={item.thumb}
													author={item.authorName}
												/>
											</div>
										)
									);
								})}
							</div>
							<div className="item__border" />
							<div className="save-book__column -two">
								{this.state.savedBooks.books.map((item, index) => {
									return (
										index % numberBookInRow == 1 && (
											<div className="save-book__column--item">
												<ItemSavedBook
													title={item.title}
													img_src={item.thumb}
													author={item.authorName}
												/>
											</div>
										)
									);
								})}
							</div>
							<div className="item__border" />

							<div className="save-book__column -three">
								{this.state.savedBooks.books.map((item, index) => {
									return (
										index % numberBookInRow == 2 && (
											<div className="save-book__column--item">
												<ItemSavedBook
													title={item.title}
													img_src={item.thumb}
													author={item.authorName}
												/>
											</div>
										)
									);
								})}
							</div>
							<div className="item__border" />

							<div className="save-book__column -four">
								{this.state.savedBooks.books.map((item, index) => {
									return (
										index % numberBookInRow == 3 && (
											<div className="save-book__column--item">
												<ItemSavedBook
													title={item.title}
													img_src={item.thumb}
													author={item.authorName}
												/>
											</div>
										)
									);
								})}
							</div>
						</div>
					</div>
				);
				break;
			case 3: //saved post
				result = (
					<div className="profile__content--saved-post">
						<div className="posts-wrap">
							{this.state.savedPost.map((item, index) => {
								return <PostItem3 post={item} author={this.state.user} />;
							})}
						</div>
					</div>
				);
				break;
			default:
				result = <div />;
				break;
		}
		return result;
	};

	render() {
		return (
			<div>
				<Head>
					<title>Trang cá nhân</title>
					<meta content="width=device-width, initial-scale=1" name="viewport" />
					<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
					<link
						rel="stylesheet"
						href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
						integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
						crossorigin="anonymous"
					/>
				</Head>
				<Header {...this.props} />

				<div className="my-container profile-main">
					<Information user={this.state.user} />
					{this.state.isHomeUser ? (
						<div className="user-tools">
							<div className="menu-home-user">
								<div className="tab-signs-wrap">
									<div className="tabs-signs">
										{this.state.tabs.map((item) => {
											return (
												<div
													className={
														item.id == this.state.activeTab ? (
															'tab-sign tab-active'
														) : (
															'tab-sign'
														)
													}
												>
													<i class="fas fa-map-signs" />
												</div>
											);
										})}
									</div>
								</div>
								<div className="tabs">
									{this.state.tabs.map((item) => {
										return (
											<div className={item.id == this.state.activeTab ? 'tab tab-active' : 'tab'}>
												<div className="tab" onClick={() => this.changeActiveTab(item.id)}>
													{item.name}
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					) : (
						<div />
					)}
					{this.state.showEditor ? (
						<Editor handleClose={this.handleClose} createPost={this.createPost} />
					) : null}

					<div className="profile-page">{this.getContent()}</div>
				</div>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(Profile);
