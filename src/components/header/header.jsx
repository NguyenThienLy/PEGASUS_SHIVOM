import * as React from 'react'
import './../../assets/bootstrap4/bootstrap.min.scss'

import './header.scss'

export class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("props của header: ", this.props)
        return (
            <div className="headerWrap">

            <nav className="navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top">
                <a className="name navbar-brand">Book Review</a>
                <button className="navbar-toggler fix-top" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navWrap collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto mainMenu">
                        <li className="nav-item current">
                            <a href="#" className="nav-link active">Trang chủ</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Bài viết</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Thể loại</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Liên hệ</a>
                        </li>
                    </ul>

                    <div className="accountWrap justify-content-end">

                        <ul className="navbar-nav">
                            {/* <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown"
                                    aria-expanded="false" aria-haspopup="true">Vi</a>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">Tiếng Anh</a>
                                </div>
                            </li> */}
                            <li className="nav-item">
                                <a href="#" className="nav-link">Đăng nhập</a>
                            </li>
                        </ul>
                    </div>
                    </div>
            </nav>
            <div className="space-header"></div>
        </div>
        )
    }
}

