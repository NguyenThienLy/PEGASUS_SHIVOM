import * as React from 'react';
import 'isomorphic-unfetch';
import { connect } from 'react-redux';
import { Header, Headline, Footer, PostItem3, FollowedReviewerItem, ItemSavedBook, LazyLoadComponent } from '../../components';
import Head from 'next/head';
import './profile.scss';

import { Editor } from './components/editor/editor';
import Information from './components/information/information';
import { api } from '../../services'

const firebaseAuthentication = require('../../authentication/firebase')

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showEditor: false,
			isFollow: false,
			followId: null,
			posts: [],
			followeds: [],
			bookSaveds: [],
			postSaveds: [],
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
			activeTab: 0,
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
						title: "Chỉ có gió mới biết 0 ",
						authorName: "Don Bosco Việt Nam",
						thumb: '/img/rankBook.jpg'
					},
					{
						title: "Chỉ có gió mới biết 1",
						authorName: "Don Bosco Việt Nam",
						thumb: '/img/rankBook.jpg'
					},
					{
						title: "Chỉ có gió mới biết 2",
						authorName: "Don Bosco Việt Nam",
						thumb: '/img/rankBook.jpg'
					},
					{
						title: "Chỉ có gió mới biết 3",
						authorName: "Don Bosco Việt Nam",
						thumb: '/img/rankBook.jpg'
					},
					{
						title: "Chỉ có gió mới biết 4",
						authorName: "Don Bosco Việt Nam",
						thumb: '/img/rankBook.jpg'
					},
					{
						title: "Chỉ có gió mới biết 5",
						authorName: "Don Bosco Việt Nam",
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
		const profileId = req.params.profileId
		const profile = await api.user.getItem(profileId, {
			query: {
				fields: ["$all"]
			}
		})
		return { profile };
	}
	async componentDidMount() {
		try {
			const posts = await api.post.getList({
				query: {
					filter: {
						userId: this.props.profile._id
					},
					fields: ["$all", { book: ["_id", "title"] }]
				}
			})
			this.setState({ posts })
			const followeds = await api.userFollow.getList({
				query: {
					filter: {
						fromId: this.props.profile._id
					},
					fields: ["$all", { to: ["_id", "avatar", "firstName", "lastName", "avatar"] }]
				}
			})
			this.setState({ followeds })
			api.userSaved.getList({
				query: {
					filter: {
						userId: this.props.profile._id,
						type: "book"
					},
					fields: ["$all"]
				}
			}).then(async (items) => {
				const books = await api.book.getList({
					query: {
						filter: {
							_id: { $in: items.map(item => { return item.itemId }) }
						},
						fields: ["_id", "title", "thumb", { author: ["_id", "name"] }]
					}
				})
				console.log("books: ", books)
				this.setState({ bookSaveds: books })
			})
			api.userSaved.getList({
				query: {
					filter: {
						userId: this.props.profile._id,
						type: "post"
					},
					fields: ["$all"]
				}
			}).then(async (items) => {
				const posts = await api.post.getList({
					query: {
						filter: {
							_id: { $in: items.map(item => { return item.itemId }) }
						},
						fields: ["title", "thumb","content", { book: ["_id", "title"] }, { user: ["_id", "firstName", "lastName","avatar"] }]
					}
				})
				this.setState({ postSaveds: posts })
			})
			setTimeout(() => {
				console.log("chay day")
				if (this.props.user) {
					api.userFollow.findOne({
						query: {
							filter: {
								fromId: this.props.user._id,
								toId: this.props.profile._id
							}
						}
					}).then(result => {
						console.log("result: ", result)
						this.setState({ isFollow: true, followId: result._id })
						this.forceUpdate()
					}).catch(err => {
						console.log("not found: ", err)
					})
				}
			}, 1000)
		} catch (err) {

		} finally {

		}
	}
	followUser = async () => {
		console.log("pròile:", this.props.profile)
		if (!this.props.user) {
			alert("Vui lòng đăng nhập trước khi thực hiện thao tác này")
		} else {
			try {
				const token = await firebaseAuthentication.getIdToken()
				const result = await api.userFollow.create({
					toId: this.props.profile._id
				}, {
						headers: {
							access_token: token
						}
					})
				this.setState({ isFollow: true, followId: result._id })
			} catch (err) {
				console.log("err: ", err)
				alert("Theo dõi không thành công")
			}
		}
	}
	unFollowUser = async () => {
		try {
			const token = await firebaseAuthentication.getIdToken()
			const result = await api.userFollow.delete(this.state.followId, {
				headers: {
					access_token: token
				}
			})
			alert("Huỷ theo dõi thành công")
			this.setState({ isFollow: false, followId: null })
		} catch (err) {
			console.log("err: ", err)
			alert("Huỷ theo dõi không thành công")
		}
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

	createPost = () => { };

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
		result.push(
			<div className="profile__content--paging -page -first" >{`<<`}</div>
		)

		if (page <= spacePage * 2) {
			for (let i = 1; i < page - 1; i++) {
				result.push(
					<div className="profile__content--paging -page" >{i}</div>
				)
			}
		}
		else {
			let start = 1, end = page - 1;
			if (active > spacePage) {
				result.push(
					<div className="profile__content--paging -more" >...</div>
				)
				start = active;
			}

			if (active + spacePage < page - 1) {
				end = active + spacePage;
			}

			for (let i = start; i < end; i++) {
				result.push(
					<div className="profile__content--paging -page" >{i}</div>
				)
			}
			if (end == active + spacePage) {
				result.push(
					<div className="profile__content--paging -more" >...</div>
				)
			}
		}
		result.push(
			<div className="profile__content--paging -page -last" >>></div>
		)
		return result;
	}

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
									<i className="fas fa-pen-fancy" /> Hãy chia sẽ cảm nhận về sách tại đây
									</div>
							</div>
						</div>
					)
				}

				result.push(
					<div className="profile__content--home">
						<div className="posts-wrap">
							{this.state.posts.map((item, index) => {
								return <PostItem3 post={item} author={this.props.profile} key={index} />;
							})}
						</div>
					</div>
				);
				break;
			case 1: //follower
				result =
					(
						<div className="profile__content--followed-review">
							<div className="followed-review__column--one">
								{
									this.state.followeds.map((item, index) => {
										return index % 3 == 0 && (
											<FollowedReviewerItem
												name={item.to.firstName + ' ' + item.to.lastName}
												numberFan={12}
												imgurl={item.to.avatar}
												key={index}
											/>
										)
									})
								}
							</div>
							<div className="followed-review__column--two">
								{
									this.state.followeds.map((item, index) => {
										return index % 3 == 1 && (
											<FollowedReviewerItem
												name={item.to.firstName + ' ' + item.to.lastName}
												numberFan={12}
												imgurl={item.to.avatar}
												key={index}
											/>
										)
									})
								}
							</div>
							<div className="followed-review__column--three">
								{
									this.state.followeds.map((item, index) => {
										return index % 3 == 2 && (
											<FollowedReviewerItem
												name={item.to.firstName + ' ' + item.to.lastName}
												numberFan={12}
												imgurl={item.to.avatar}
												key={index}
											/>
										)
									})
								}
							</div>
						</div>
					);
				break;
			case 2: //saved book
				const numberBookInRow = 4;
				result = (<div className="profile__content--saved-book-wrap">
					<div className="profile__content--paging">
						{
							this.getPageSavedBook(this.state.savedBooks.page, this.state.savedBooks.currentPage)
						}
					</div>
					<div className="profile__content--saved-book">
						<div className="save-book__column -one">
							{
								this.state.bookSaveds.map((item, index) => {
									return index % numberBookInRow == 0 && (
										<div className="save-book__column--item" key={index}>
											<ItemSavedBook {...item} />
										</div>
									)
								})
							}
						</div>
						<div className="item__border"></div>
						<div className="save-book__column -two">
							{
								this.state.bookSaveds.map((item, index) => {
									return index % numberBookInRow == 1 && (
										<div className="save-book__column--item" key={index}>
											<ItemSavedBook {...item} />
										</div>
									)
								})
							}
						</div>
						<div className="item__border"></div>

						<div className="save-book__column -three">
							{
								this.state.bookSaveds.map((item, index) => {
									return index % numberBookInRow == 2 && (
										<div className="save-book__column--item" key={index}>
											<ItemSavedBook {...item} />
										</div>
									)
								})
							}
						</div>
						<div className="item__border"></div>

						<div className="save-book__column -four">
							{
								this.state.bookSaveds.map((item, index) => {
									return index % numberBookInRow == 3 && (
										<div className="save-book__column--item" key={index}>
											<ItemSavedBook {...item} />
										</div>
									)
								})
							}
						</div>
					</div>
				</div>)
				break;
			case 3: //saved post
				result = (<div className="profile__content--saved-post">

					<div className="posts-wrap">
						{this.state.postSaveds.map((item, index) => {
							return <PostItem3 post={item} author={item.user} key={index} />;
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
					<title>{this.props.profile.firstName} {this.props.profile.lastName}</title>
					<meta name="title" content={`${this.props.profile.firstName} ${this.props.profile.lastName}`} />
				</Head>
				<Header {...this.props} />

				<div className="my-container profile-main">
					<Information
						user={this.props.profile}
						isFollow={this.state.isFollow}
						followUser={this.followUser}
						unFollowUser={this.unFollowUser}
					/>
					{this.state.isHomeUser ? (
						<div className="user-tools">
							<div className="menu-home-user">
								<div className="tab-signs-wrap">
									<div className="tabs-signs">
										{this.state.tabs.map((item, index) => {
											return (
												<div
													key={index}
													className={
														item.id == this.state.activeTab ? (
															'tab-sign tab-active'
														) : (
																'tab-sign'
															)
													}
												>
													<i className="fas fa-map-signs" />
												</div>
											);
										})}
									</div>
								</div>
								<div className="tabs">
									{this.state.tabs.map((item, index) => {
										return (
											<div className={item.id == this.state.activeTab ? 'tab tab-active' : 'tab'} key={index}>
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

					<div className="profile-page">
						{this.getContent()}
					</div>
				</div>
				<LazyLoadComponent
					path="../footer/footer"
				/>
				{/* <Footer /> */}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(Profile);
