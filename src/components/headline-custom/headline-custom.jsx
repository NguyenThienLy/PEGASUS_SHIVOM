import * as React from 'react'
import './headline-custom.scss'

export default class HeadlineCustom extends React.Component{
    constructor (props){
        super (props)
    }

    render() {
        return (
            <div>
                <div id="headline-title">
                    <div className="title ">{this.props.infor.title}</div>
                    <div className="infor">
                        <span>{this.props.infor.number} {this.props.infor.icon_awesome} </span>
                    </div>
                </div>
            </div>
        )
    }
}