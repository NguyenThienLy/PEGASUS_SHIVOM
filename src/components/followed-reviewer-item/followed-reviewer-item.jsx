import * as React from 'react'
import './followed-reviewer-item.scss'

export class FollowedReviewerItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){
        const {name, numberFan, imgurl} = this.props;
        return (
            <div id="followed-person--wrap">
                <div id="followed-person--img">
                    <a href="#"><img src={imgurl} alt={name}/></a>
                </div>
                <div id="followed-person--name"><a href="#">{name}</a></div>
                <div id="followed-person--fan">{numberFan} người theo dõi</div>
                <a name="" id="followed-person--btn" class="btn" href="#" role="button">Theo dõi</a>
            </div>
        )
        
    }
}