import * as React from 'react'
import './savedBookItem.scss'
import { CloudImage } from '..';

export class SavedBookItem extends React.Component{
    constructor (props){
        super(props)
    }

    render(){
        const {name, author, rate, imgurl} = this.props;
        return (
            <div id ="saved-book-wrap">
                <div id="saved-book__img">
                    <a href="#" className = "saved-book__img--src"><CloudImage src={imgurl} alt={name} /></a>
                </div>
                <div id="saved-book--name"><a href="#">{name}</a></div>
                <div id="saved-book--author"><span>{author}</span></div>
                <div id="saved-book--rate">
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                <i className="fa fa-star" aria-hidden="true"></i>
                </div>
            </div>
        )
    }
}