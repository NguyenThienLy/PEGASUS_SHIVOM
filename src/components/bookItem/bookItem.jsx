import * as React from 'react'
import './bookItem.scss'
import { CloudImage } from '..';


export class BookItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { img, title, author, handleClick } = this.props
        return (
            <div className="book-item">
                <div className="image-wrapper">
                    <CloudImage src={img} />
                </div>
                <div className="info">
                    <h3 onClick={handleClick}>{title}</h3>
                    <p>{author}</p>
                </div>
            </div>
        )
    }
}

