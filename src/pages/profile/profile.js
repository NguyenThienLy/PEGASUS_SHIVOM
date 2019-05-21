import * as React from 'react';
import 'isomorphic-unfetch';
import { connect } from 'react-redux';
import { Header, Headline, Footer, PostItem3 } from '../../components';
import Head from 'next/head';
import Link from 'next/link';
import './profile.scss';

import { Info } from './components/info/info';
import { Editor } from './components/editor/editor';
import Information from './components/information/information';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showEditor: true,
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
					book: 'Trước bình minh là đêm tối',
					content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

					Why do we use it?
					It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
					
					
					Where does it come from?
					Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.'`
				}
			],
			isHomeUser: true
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

	createPost = () => {
		const title = document.getElementById('title-new-post').value;
		const desciption = document.getElementById('desciption-new-post').value;

		//TODO: get content
		const content = 'content demo';
		// console.log('title demo: ', title);
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
				<Headline title="BÀI VIẾT REVIEW" />

				<div className="container profile-main">
					<Information user={this.state.user} />
					{this.state.isHomeUser ? (
						<div className="write-post" onClick={() => this.openEditor()}>
							<input type="text" name="" id="write-post" placeholder="" />
							<div className="placeholder">
								<div>
									<i class="fas fa-pen-fancy" /> Hãy chia sẽ cảm nhận về sách tại đây
								</div>
							</div>
						</div>
					) : (
						<div />
					)}
					{this.state.showEditor ? (
						<Editor handleClose={this.handleClose} createPost={() => this.createPost()} />
					) : null}
					<div className="posts-wrap">
						{this.state.postsFromUser.map((item, index) => {
							return <PostItem3 post={item} author={this.state.user} />;
						})}
					</div>
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

{
	/* 
					<div
						style={{
							height: '30px'
						}}
					/>
					<Info />
					<div
						style={{
							height: '20px'
						}}
					/>
					<Headline title="BÀI VIẾT REVIEW" />
					{this.state.showEditor ? <Editor handleClose={this.handleClose} /> : null}
				</div> */
}
