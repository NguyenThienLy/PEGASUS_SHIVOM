import React, { Component } from 'react';
import './rankBooks.scss'
import { RankBookItem } from '../../components/rankBookItem/rankBookItem'
import { BookItem } from '../bookItem/bookItem';
import { CloudImage } from '..';

import Link from 'next/link'

export class RankBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const book = this.props.rankBooks[0];
        const rankBooks = this.props.rankBooks.filter((item, index) => index != 0);
        // console.log("Books:" + rankBooks);
        return (
            <div id="rank-books-wrap">
                <div id="first-book-wrap">
                    <div className="img"><a href="#"><CloudImage src={book.img} alt={book.bookName} /></a></div>
                    <div className="book-name">
                    <Link href="/sach/5051aa33-ce6d-4506-8f4c-bd0471f68eaf">
                        <a href="#">{book.bookName}</a>
                        </Link>
                    </div>
                    <div className="rating">
                        <a href="#" className="rating-star">
                            <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                            <span>{book.rating}</span></a>
                        <div href="#" className="number-rating">{book.numberReview} lượt đánh giá</div>
                    </div>
                    <div className="author">{book.bookAuthor}</div>
                </div>
                <div id="list-rank-books">
                    {
                        rankBooks.map((item, index) => {
                            return (
                                <RankBookItem book={item} key={index}/>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

