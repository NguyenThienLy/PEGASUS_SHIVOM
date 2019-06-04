import * as React from 'react'
import './item-followed-person.scss'
import { CloudImage } from '..';

export default class ItemFollowedPerson extends React.Component{
    constructor (props){
        super(props) //props: personInfor: name, numberFollower, avatar
    }

    render(){
        return (
            <div id= "wrap-followed-person">
                <div id = "avatar"><a href="#"><CloudImage src={this.props.personInfor.avatar} alt={this.props.personInfor.name}/></a></div>
                <div id ="name"><a href="#">{this.props.personInfor.name}</a></div>
                <div id ="number-followers">{this.props.personInfor.numberFollower} người theo dõi</div>
                <div id="btn"><button>Theo dõi</button></div>
            </div>
        )
    }
}