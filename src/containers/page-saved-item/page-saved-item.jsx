import * as React from 'react'
import { Header, PostGeneral, Headline, SmallSavedBook, HeadlineCustom, FollowedPerson } from '../../components'
import './page-saved-items.scss'

export default class PageSavedItems extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const bookTitle = { title: "Sách", icon_awesome: <i className="fas fa-book"></i>, number: 12 }
        const followedPersonTitle = { title: "Theo dõi", icon_awesome: <i className="fas fa-users"></i>, number: 67 }
        const savedPostTitle = { title: "Bài viết", icon_awesome:<i className="fas fa-heart"></i>, number: 33 }

        
        let bookInfor = { img_src: "img/sample_book.png", title: "Bắt trẻ đồng xanh", author: "Nguyễn Nhật Ánh" }
        let followedPersonProps = { name: "Lê Cát Trọng Lý", numberFollower: 12, avatar: "img/lecattrongly.jpg" } //personInfor

        return (
            <div>
                <Header {...this.props} {...this.state} />
                <div className="containter">
                    <div id="saved-books">
                        <HeadlineCustom infor={Object.assign({}, bookTitle)} />
                        <div className="books" id="fist-row-books">
                            <SmallSavedBook book={Object.assign({}, bookInfor)} />
                            <SmallSavedBook book={Object.assign({}, bookInfor)} />
                            <SmallSavedBook book={Object.assign({}, bookInfor)} />
                            <SmallSavedBook book={Object.assign({}, bookInfor)} />
                        </div>
                        <div className="books" id="second-row-books">
                            <SmallSavedBook book={Object.assign({}, bookInfor)} />
                            <SmallSavedBook book={Object.assign({}, bookInfor)} />
                            <SmallSavedBook book={Object.assign({}, bookInfor)} />
                            <SmallSavedBook book={Object.assign({}, bookInfor)} />
                        </div>
                        <div className="slide-btns-saved-items">
                            <a href="#" id="prev" ><div className="active"></div></a>
                            <a href="#" id="next"><div></div></a>
                        </div>
                    </div>

                    <div id="saved-followed-person">
                        <HeadlineCustom infor={Object.assign({}, followedPersonTitle)} />
                        <div id="person">
                            <FollowedPerson personInfor={Object.assign({}, followedPersonProps)} />
                            <FollowedPerson personInfor={Object.assign({}, followedPersonProps)} />
                            <FollowedPerson personInfor={Object.assign({}, followedPersonProps)} />
                            <FollowedPerson personInfor={Object.assign({}, followedPersonProps)} />
                        </div>

                        <div className="slide-btns-saved-items">
                            <a href="#" id="prev" ><div className="active"></div></a>
                            <a href="#" id="next"><div></div></a>
                        </div>
                    </div>

                    <div id="saved-post">
                        <HeadlineCustom infor={Object.assign({}, savedPostTitle)} />
                        <PostGeneral/>
                        <PostGeneral/>
                        <PostGeneral/>

                        <div className="slide-btns-saved-items">
                            <a href="#" id="prev" ><div className="active"></div></a>
                            <a href="#" id="next"><div></div></a>
                        </div>
                    </div>

                </div>
            </div>
        )



    }

}