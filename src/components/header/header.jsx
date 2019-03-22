import * as React from 'react'
import './../../assets/bootstrap4/bootstrap.min.scss'

import './header.scss'

import Link from 'next/link'

import Head from 'next/head'

export class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />

                    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                </Head>
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
                                    <Link href="/lien-he">
                                        <a className="nav-link">Liên hệ</a>
                                    </Link>
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
            </div>
        )
    }
}

