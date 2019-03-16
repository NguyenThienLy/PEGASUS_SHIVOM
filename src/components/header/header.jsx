import * as React from 'react'
import './../../assets/bootstrap4/bootstrap.min.scss'

import './header.scss'

import Link from 'next/link'

export class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
                                <Link href="/">
                                    <a className="nav-link active">Trang chủ</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/bai-viet">
                                    <a className="nav-link">Bài viết</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/profile">
                                    <a href="#" className="nav-link">Thể loại</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Tác giả</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Reviewer</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Liên hệ</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" role="button"
                                    ria-haspopup="true" aria-expanded="false">Xem thêm</a>
                                <div className="dropdown-menu">
                                    <a href="#" className="dropdown-item">Nổi bật</a>
                                    <a href="#" className="dropdown-item">Bảng xếp hạng</a>
                                </div>
                            </li>
                        </ul>

                        <div className="accountWrap justify-content-end">

                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle" role="button" data-toggle="dropdown"
                                        aria-expanded="false" aria-haspopup="true">Vi</a>
                                    <div className="dropdown-menu">
                                        <a href="#" className="dropdown-item">Tiếng Anh</a>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">Đăng nhập</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">Đăng ký</a>
                                </li>


                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        )
    }
}

