import * as React from 'react'
import './../../assets/bootstrap4/bootstrap.min.scss'
import './header.scss'

import Link from 'next/link'

import Head from 'next/head'

export class Header extends React.Component {
    constructor(props) {
        super(props)
        // this.openFindInput = this.openFindInput.bind(this);
    }

    // openFindInput(){
    //     var input = document.getElementById('key-find');
    //     input.style.display= "block";
    //     input.focus();
    // }

    render() {
        return (
            <div className="headerWrap">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"></link>

                <nav className="navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top">
                    <a className="name navbar-brand">Books Feelings</a>
                    <button className="navbar-toggler fix-top" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navWrap collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto mainMenu">
                            <li className="nav-item current">
                              
                                    <a href="/" className="nav-link active">Trang chủ</a>
                             
                            </li>
                            <li className="nav-item">
                                <Link href="/bai-viet">
                                    <a className="nav-link">Bài viết</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/sach">
                                    <a href="#" className="nav-link">Thể loại</a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/profile">
                                    <a href="#" className="nav-link">Tác giả</a>
                                </Link>
                            </li>
                        </ul>

                        <div className="accountWrap justify-content-end">
                            <ul className="navbar-nav">
                                <li className="nav-item find">
                                    <input type="text" id="key-find" placeholder="Nhập từ khóa" />
                                    {/* <a href="#" className="nav-link"><i class="fas fa-search"></i></a> */}
                                </li>
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

