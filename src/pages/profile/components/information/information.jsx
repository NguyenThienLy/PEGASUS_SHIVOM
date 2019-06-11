import React, { Component } from 'react';
import './information.scss'

class Information extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    followUser = async () => {
        return this.props.followUser()
    }
    unFollowUser = async () => {
        return this.props.unFollowUser()
    }
    render() {
        const { user } = this.props;
        return (
            <div className="information-wrap">
                <div className="infor-user">
                    <div className="img">
                        <img src={user.avatar} alt="" />
                    </div>
                    <div className="first-line">
                        <div className="name">{user.firstName} {user.lastName}</div>
                        <div className="score">
                            {user.score} điểm tích lũy

                    </div>
                        {!this.props.isHomeUser ?
                            <div>
                                {this.props.isFollow ?
                                    <div className="follow btn-unfollow" onClick={this.unFollowUser}>Huỷ theo dõi</div> :
                                    <div className="follow bt-follow" onClick={this.followUser}>Theo dõi</div>}</div> : null}
                    </div>
                </div>
                <div className="infor-detail">

                    <div className="description">{user.description}</div>
                    <div className="quote-wrap">
                        <div className="quote">
                            <div className="lable">Trích dẫn yêu thích</div>
                            {
                                user.quote != "" ?
                                    <div className="quote-detail">"{user.quote}"</div>

                                    : <div className="quote-empty">(Trống)</div>

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Information;