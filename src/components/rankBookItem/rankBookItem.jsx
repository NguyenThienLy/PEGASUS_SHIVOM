import React, { Component } from 'react';
import './rankBookItem.scss'
import { CloudImage } from '..';

import Link from 'next/link'
export class RankBookItem extends Component {
    state = {}
    render() {
        const { book } = this.props;
        return (
            <div className="rank-item-wrap">
                <div className="img"><a href="#"><CloudImage src={book.img} alt={book.bookName} /></a></div>
                <div className="content">

                    <div className="book-name">
                    <Link href="/sach/5051aa33-ce6d-4506-8f4c-bd0471f68eaf">
                    <a href="#">{book.bookName}</a>
                    </Link>
                    </div>
                    <a href="#" className="rating-star">
                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                        <span>{book.rating}</span>
                    </a>
                    <div className="author">{book.bookAuthor}</div>
                </div>
            </div>
        );
    }
}