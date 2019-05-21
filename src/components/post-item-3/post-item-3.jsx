import React, { Component } from 'react';
import './post-item-3.scss'



// const user = {
//     _id: '1',
//     firebaseUid: '',
//     firebaseUserInfo: '',
//     username: 'Minh Nhi',
//     firstName: 'Trần',
//     lastName: 'Minh Nhi',
//     email: 'tmnhi@gmail.com',
//     description: 'Là một người thích đọc sách',
//     birthday: '23/02/1998',
//     quote: 'Nếu giấc mơ của bạn không làm bạn sợ, rõ ràng giấc mơ đó chưa đủ lớn',
//     job: '',
//     score: 12,
//     influenceScore: 1,
//     avatar: '/img/avata-demo.jpg',
//     cover: '',
//     role: 'guest'
// };


// {
//     _id: 1,
//     title: 'Hãy hướng về phía mặt trời',
//     slug: '',
//     description:
//         'Ai cũng cần động lực để giúp bản thân làm những điều mình cần làm. Cuốn sách này giúp tôi nhận ra nhiều điều trong cuộc sống',
//     postTemplate: '',
//     content: '...',
//     thumb:
//         'http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/book-759873_1920-370x218.jpg',
//     images:
//         'http://dinhvankiem.com/demo/e-reading/wp-content/uploads/2016/05/book-759873_1920-370x218.jpg',
//     userId: '',
//     bookId: '',
//     createAt: '10:34 12/03/2019',
//     book: 'Trước bình minh là đêm tối',
//     postReactions: 4
// }

export class PostItem3 extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    readMoreContent() {
        const content = document.getElementById(this.props.post.id + "content-post");
        content.innerHTML = this.props.post.content;

        const btnReadMore = document.getElementById(this.props.post.id + "read-more-post-btn");
        btnReadMore.style.display = "none";
        const btnShorten = document.getElementById(this.props.post.id + "shorten-post-btn");
        btnShorten.style.display = "block";
    }

    shortenContent() {
        const content = document.getElementById(this.props.post.id + "content-post");
        content.innerHTML = this.props.post.content.substring(0, 300) + "...";

        const btnReadMore = document.getElementById(this.props.post.id + "read-more-post-btn");
        btnReadMore.style.display = "block";
        const btnShorten = document.getElementById(this.props.post.id + "shorten-post-btn");
        btnShorten.style.display = "none";
    }
    render() {
        const { post, author } = this.props;
        return (
            <div className="post-item-3-wrap">
                <div className="first-line">
                    <div className="infor-author">
                        <div className="img">
                            <img src={author.avatar} alt="" />
                        </div>
                        <div className="right-column">
                            <div className="author">
                                <div className="name"><a href="profile/{author._id}">{author.firstName} {author.lastName}</a></div>
                                <div className="follow">Theo dõi</div>
                            </div>
                            <div className="time">{post.createAt}</div>
                        </div>
                    </div>
                </div>
                <div className="img">
                    <img src={post.images} alt="" />
                </div>
                <div className="title"><a href="">{post.title}</a></div>
                <div className="postReactions"><i className="fab fa-gratipay"></i>{post.postReactions} lượt thích</div>
                <div className="description">{post.description}</div>
                <div className="content" id={post.id + "content-post"}>{post.content.substring(0, 300)}...</div>
                <div className="read-more" id={post.id + "read-more-post-btn"} onClick={() => this.readMoreContent()}>Xem thêm</div>
                <div className="shorten" id={post.id + "shorten-post-btn"} onClick={() => this.shortenContent()}>Thu gọn</div>
            </div>
        );
    }
}

