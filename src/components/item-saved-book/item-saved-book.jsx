import * as React from 'react'
import './item-saved-book.scss'
import { CloudImage } from '..';

export class ItemSavedBook extends React.Component {
    constructor(props) {
        super(props)
    }
    // props: img_src, title, author

    render() {
        return (
            <div>
                <div id="wrap-small-book">
                    <div id="img-small-book"><a href="">
                        <CloudImage src={this.props.img_src} alt="Bìa sách" />
                    </a></div>
                    <div id="title-small-book"><a href="#">{this.props.title}</a></div>
                    <div id="author-small-book">{this.props.author}</div>
                    <div id="small-book-rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div>
        )
    }
}