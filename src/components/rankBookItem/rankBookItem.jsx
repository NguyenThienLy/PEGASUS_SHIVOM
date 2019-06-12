import React, { Component } from 'react';
import './rankBookItem.scss'
import { CloudImage } from '..';

import Link from 'next/link'
export class RankBookItem extends Component {
    state = {}
    render() {
        const { book } = this.props;
        return (
            <div className="rank-book-item--wrap">
                <div className="rank-book-item__img"><a href="#"><CloudImage src={book.img} alt={book.bookName} /></a></div>
                <div className="rank-book-item__content">
                    <div className="rank-book-item__content--book-name title"><a href="#">{book.bookName}</a></div>
                    <a href="#" className="rank-book-item__content--rating-star">
                        <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                        <span>{book.rating}</span>
                    </a>
                    <div className="rank-book-item__content--author">{book.bookAuthor}</div>
                </div>
            </div>
        );
    }
}