import React, { Component } from 'react';
import './rankBooks.scss'
import { RankBookItem } from '../../components/rankBookItem/rankBookItem'
import { BookItem } from '../bookItem/bookItem';
import { CloudImage } from '..';

export class RankBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    checkScroll = () => {
        window.onscroll = function () {
            const currentScrollPos = window.pageYOffset;

            if (currentScrollPos > 600) {
                console.log("being checked scroll..., current y: ", currentScrollPos);
                let x = document.getElementById("rank-books-wrap")
                x.classList.add("rank-books-wrap-sticky");
                console.log("element: ", document.getElementById("rank-books-wrap"));
            } else {
                document.getElementById("rank-books-wrap").classList.remove("rank-books-wrap-sticky");
            }
        }
    }

    async componentDidMount() {
        setInterval(() => {
            this.checkScroll();
        }, 1000);
    }

    render() {
        const book = this.props.rankBooks[0];
        const rankBooks = this.props.rankBooks.filter((item, index) => index != 0);
        // console.log("Books:" + rankBooks);
        return (
            <div id="rank-books-wrap" >
                <div id="first-book-wrap">
                    <div className="img"><a href="#"><CloudImage src={book.img} alt={book.bookName} /></a></div>
                    <div className="book-name title"><a href="#">{book.bookName}</a></div>
                    <div className="author">{book.bookAuthor}</div>
                    <div className="rating">
                        <a href="#" className="rating-star">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                            <span>{book.rating}</span></a>
                        <div href="#" className="number-rating">{book.numberReview} đánh giá</div>
                    </div>
                </div>
                <div id="list-rank-books">
                    {
                        rankBooks.map((item, index) => {
                            return (
                                <RankBookItem book={item} />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

