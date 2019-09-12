import * as React from 'react'
import './socialGroup.scss'

export class SocialGroup extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log("socal groual props: ", this.props)
        return (

            <div className="media-buttons">
                <a className="media-buttons__media-icons"
                    href={this.props.social.facebook} target="_blank"
                >
                    <i className="fab fa-facebook-f media-buttons__media-icons--hover"></i>
                </a>

                <a class="media-buttons__media-icons" href={this.props.social.google} target="_blank">
                    <i className="fab fa-google media-buttons__media-icons--hover"></i>
                </a>
                {/* 
                    <a className="media-buttons__media-icons" href="#" >
                        <i className="fab fa-twitter media-buttons__media-icons--hover"></i>
                    </a>
                */}
                <a class="media-buttons__media-icons" href={this.props.social.instagram} target="_blank">
                    <i className="fab fa-instagram media-buttons__media-icons--hover"></i>
                </a>
                <a class="media-buttons__media-icons" href={this.props.social.youtube} target="_blank">
                    <i className="fab fa-youtube media-buttons__media-icons--hover"></i>
                </a>
            </div>

        )
    }
}
