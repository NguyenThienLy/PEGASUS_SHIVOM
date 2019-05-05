import React, { Component } from 'react';
import './rankBooks.scss'
import { RankBookItem } from '../../components/rankBookItem/rankBookItem'

export class RankBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const book = this.props.rankBooks[0];
        console.log("Book:" + book);
        const rankBooks = this.props.rankBooks.filter((item, index) => index != 0);
        return (
            <div className="rank-books-wrap">
                <div id="first-book-wrap">
                    <div className="img"><a href="#"><img src={book.img} alt={book.bookName} /></a></div>
                    <div className="book-name"><a href="#">{book.bookName}</a></div>
                    <div className="rating"><a href="#">{book.rating}</a></div>
                    <div className="rating"><a href="#">{book.numberReview} lượt đánh giá</a></div>
                    <div className="author"><a href="#">{book.bookAuthor}</a></div>
                </div>
            </div>
        );
    }
}

