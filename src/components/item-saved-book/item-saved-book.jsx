import * as React from 'react'
import './item-saved-book.scss'
import { CloudImage } from '..';

import Link from 'next/link'

export class ItemSavedBook extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div id="wrap-small-book">
                    <div id="img-small-book"><a href="">
                        <CloudImage src={this.props.thumb} alt={this.props.title} />
                    </a></div>
                    {/* <div id="title-small-book" className="title"><a href="#">{this.props.title}</a></div>
                    <div id="author-small-book">{this.props.author}</div> */}
                    <div id="title-small-book" className="title">
                        <Link as={`/sach/${this.props._id}`} href={`/book/book?bookId=${this.props._id}`}>
                            <a href="#">{this.props.title}</a>
                        </Link>
                    </div>
                    <div id="author-small-book">{this.props.author ? this.props.author.name : null}</div>
                    <div id="small-book-rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                    </div>
                </div>
            </div>
        )
    }
}