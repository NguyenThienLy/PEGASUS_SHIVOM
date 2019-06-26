import React, { Component } from 'react';
import './information.scss'

class Information extends Component {
    constructor(props) {
        super(props);

    }
    followUser = async () => {
        return this.props.followUser()
    }
    unFollowUser = async () => {
        return this.props.unFollowUser()
    }
    componentWillReceiveProps(nextProps) {
        return true
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
                        <div className="name title">{user.firstName} {user.lastName}</div>
                        <div className="score">
                            {user.score} điểm tích lũy
                    </div>
                        {!this.props.isHomeUser ?
                            <div>
                                {this.props.isFollow ?
                                    <div className="follow btn-unfollow" onClick={this.unFollowUser} disabled={this.props.isBtnFollowLoading}>{this.props.isBtnFollowLoading ? <i class="fas fa-circle-notch fa-spin"></i> : "Huỷ theo dõi"}</div> :
                                    <div className="follow bt-follow" onClick={this.followUser} disabled={this.props.isBtnFollowLoading}>{this.props.isBtnFollowLoading ? <i class="fas fa-circle-notch fa-spin"></i> : "Theo dõi"}</div>}</div> : null}
                    </div>
                </div>
                <div className="infor-detail">

                    <div className="description">{user.description}</div>
                    <div className="quote-wrap">
                        <div className="quote">
                            <div className="quote__lable">Trích dẫn yêu thích</div>
                            <div className="quote__content">
                                {
                                    user.quote != "" ?
                                        <div className="quote__content--detail">
                                            <div className="quote-sign -left"><i class="fas fa-quote-left"></i></div>
                                            <div className="detail">
                                                {user.quote}
                                            </div>
                                            <div className="quote-sign -right"><i class="fas fa-quote-right"></i></div>

                                        </div>

                                        : <div className="quote__content--empty">(Trống)</div>

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Information;