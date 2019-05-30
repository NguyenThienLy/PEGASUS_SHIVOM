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
                <div id="saved-book--img">
                    <a href="#"><CloudImage src={imgurl} alt={name}/></a>
                </div>
                <div id="saved-book--name"><a href="#">{name}</a></div>
                <div id="saved-book--author"><span>{author}</span></div>
                <div id="saved-book--rate">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                </div>
            </div>
        )
    }
}