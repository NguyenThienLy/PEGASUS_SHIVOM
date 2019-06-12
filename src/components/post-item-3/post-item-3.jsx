import React, { Component } from 'react';
import './post-item-3.scss'

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
                                <div className="name title"><a href="profile/{author._id}">{author.firstName} {author.lastName}</a></div>
                                <div className="follow">Theo dõi</div>
                            </div>
                            <div className="time">{post.createAt}</div>
                        </div>
                    </div>

                </div>
                <div className="img" style={{ backgroundImage: "url(" + post.images + ")" }}>
                    {/* <img src={post.images} alt="" /> */}
                </div>
                <div className="title-react-line">

                    <div className="title"><a href="">{post.title}</a></div>
                    <div className="postReactions"><i className="fab fa-gratipay"></i>{post.postReactions} lượt thích</div>
                </div>
                <div className="name-book"><a href={"/book/" + post.bookId}>{post.book}</a></div>
                <div className="description title">{post.description}</div>
                <div className="content" id={post.id + "content-post"}>{post.content.substring(0, 300)}...</div>
                <div className="read-more" id={post.id + "read-more-post-btn"} onClick={() => this.readMoreContent()}>Xem thêm</div>
                <div className="shorten" id={post.id + "shorten-post-btn"} onClick={() => this.shortenContent()}>Thu gọn</div>
            </div>
        );
    }
}

