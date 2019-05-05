import React, { Component } from 'react';
import './rankBookItem.scss'

export class RankBookItem extends Component {
    state = {}
    render() {
        const { book } = this.props;
        return (
            <div id="rank-item-wrap">
                <div className="img"><a href="#">{book.img}</a></div>
                <div className="book-name"><a href="#">{book.bookName}</a></div>
                <div className="rating"><a href="#">{book.rating}</a></div>
                <div className="rating"><a href="#">{book.numberReview} lượt đánh giá</a></div>
                <div className="author"><a href="#">{book.bookAuthor}</a></div>
            </div>
        );
    }
}