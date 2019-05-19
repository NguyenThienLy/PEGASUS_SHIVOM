import * as React from 'react'

import './header.scss'

import Link from 'next/link'
import Router from 'next/router'

import Head from 'next/head'

import { action } from '../../actions'


const firebaseAuthentication = require('../../authentication/firebase')

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }
    }
    async logout() {

        const isSignOutSuccess = await firebaseAuthentication.signOut()
        if (isSignOutSuccess) {
            Router.push('/login')
        } else {
            alert("Đăng xuất không thành công")
        }
    }

    async componentWillMount() {
        console.log("this.props: ", this.props)
        if (!this.props.user.email) {
            const isLogin = await firebaseAuthentication.authenticated
            if (isLogin) {
                const user = firebaseAuthentication.currentUser
                this.props.dispatch(action.user.login(user))
                console.log("user: ", user)
                this.setState({
                    user: {
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL
                    }
                })
            }
        } else {
            this.setState({
                user: {
                    displayName: this.props.user.displayName,
                    email: this.props.user.email,
                    photoURL: this.props.user.photoURL
                }
            })
        }
    }

    render() {
        return (
            // <div className="headerWrap">
            //     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"></link>

            //     <nav className="navbar navbar-expand-lg navbar-light navbar-default navbar-fixed-top">
            //         <a className="name navbar-brand">Books Feelings</a>
            //         <button className="navbar-toggler fix-top" type="button" data-toggle="collapse"
            //             data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            //             aria-label="Toggle navigation">
            //             <span className="navbar-toggler-icon"></span>
            //         </button>
            //         <div className="navWrap collapse navbar-collapse" id="navbarSupportedContent">
            //             <ul className="navbar-nav mr-auto mainMenu">
            //                 <li className="nav-item current">
            //                     <Link href="/">
            //                         <a href="/" className="nav-link active">Trang chủ</a>
            //                     </Link>
            //                 </li>
            //                 <li className="nav-item">
            //                     <Link href="/bai-viet">
            //                         <a className="nav-link">Bài viết</a>
            //                     </Link>
            //                 </li>
            //                 <li className="nav-item">
            //                     <Link href="/sach">
            //                         <a href="/" className="nav-link">Thể loại</a>
            //                     </Link>
            //                 </li>
            //                 <li className="nav-item">
            //                     <Link href="/profile">
            //                         <a href="/" className="nav-link">Tác giả</a>
            //                     </Link>
            //                 </li>
            //             </ul>

            //             <div className="accountWrap justify-content-end">
            //                 <ul className="navbar-nav">
            //                     <li className="nav-item find">
            //                         <input type="text" id="key-find" placeholder="Nhập từ khóa" />
            //                         {/* <a href="#" className="nav-link"><i className="fas fa-search"></i></a> */}
            //                     </li>
            //                     <li className="nav-item">
            //                         {!this.state.user ?
            //                             <Link href="/login">
            //                                 <a href="#" className="nav-link">Đăng nhập</a>
            //                             </Link>
            //                             : <div>
            //                                 <a onClick={this.logout} href="#" className="nav-link">{this.state.user.displayName || this.state.user.email}</a>
            //                             </div>
            //                         }
            //                     </li>
            //                 </ul>
            //             </div>
            //         </div>
            //     </nav>
            //     <div className="space-header"></div>
            // </div>

            <div className="header" id="header-id">
                <div className="first-floor" id="first-floor-id">
                    <div>
                        {/* <a href="https://cuongsach.com" className="logo">
                            <img src="./logo.jpeg" alt="Cuồng Sách logo">
                        </a>   */}
                        <div className="page-title"><b>Cuồng sách.</b></div>
                    </div>

                    <div className="function-group">
                        <div className="function-group-item search-box">
                            <input className="search-txt" type="text" name="search-box" placeholder="Tìm kiếm..." />
                            <a className="search-icon" href="#">
                                <i class="fas fa-search"></i>
                            </a>

                        </div>
                        <button className="function-group-item sign-in-button" id="login-button">
                            {/* <a href="#"> */}
                                {!this.state.user ?
                                    <Link href="/login">
                                        <a href="#" className="nav-link">Đăng nhập</a>
                                    </Link>
                                    : <div>
                                        <a onClick={this.logout} href="#">{this.state.user.displayName || this.state.user.email}</a>
                                    </div>
                                }
                            {/* </a> */}
                        </button>
                    </div>
                </div>

                <div className="second-floor">
                    <nav className="navbar">
                        <ul className="nav-links">
                            <li className="nav-item"><a href="#" className="active">trang chủ</a></li>
                            <li className="nav-item"><a href="#">thể loại</a>
                                <div className="drop-down-1">
                                    <ul>
                                        <li className="drop-down-item"><a href="#" >Văn học kinh điển</a></li>
                                        <li className="drop-down-item"><a href="#">Văn học đương đại</a></li>
                                        <li className="drop-down-item"><a href="#">Văn học nữ giới</a></li>
                                        <li className="drop-down-item"><a href="#">Lãng mạn</a></li>
                                        <li className="drop-down-item"><a href="#">Light novel</a></li>
                                        <li className="drop-down-item"><a href="#">Graphic novel</a></li>
                                        <li className="drop-down-item"><a href="#">Tội phạm</a></li>
                                        <li className="drop-down-item"><a href="#">Trinh thám</a></li>
                                    </ul>
                                    <ul>
                                        <li className="drop-down-item"><a href="#">Kinh dị (Horror)</a></li>
                                        <li className="drop-down-item"><a href="#">Kinh dị (Thriller)</a></li>
                                        <li className="drop-down-item"><a href="#">Tiểu sử</a></li>
                                        <li className="drop-down-item"><a href="#">Hồi ký</a></li>
                                        <li className="drop-down-item"><a href="#">Khoa học</a></li>
                                        <li className="drop-down-item"><a href="#">Triết học</a></li>
                                        <li className="drop-down-item"><a href="#">Tâm lý học</a></li>
                                        <li className="drop-down-item"><a href="#">Lịch sử</a></li>

                                    </ul>
                                    <ul>
                                        <li className="drop-down-item"><a href="#">Lịch sử giã tưởng</a></li>
                                        <li className="drop-down-item"><a href="#">Hư cấu</a></li>
                                        <li className="drop-down-item"><a href="#">Fantasy</a></li>
                                        <li className="drop-down-item"><a href="#">Khoa học viễn tưởng</a></li>
                                        <li className="drop-down-item"><a href="#">Huyền bí</a></li>
                                        <li className="drop-down-item"><a href="#">Siêu linh</a></li>
                                        <li className="drop-down-item"><a href="#">Paranomal</a></li>
                                    </ul>
                                    <ul>
                                        <li className="drop-down-item"><a href="#">Nghệ thuật</a></li>
                                        <li className="drop-down-item"><a href="#">Âm nhạc</a></li>
                                        <li className="drop-down-item"><a href="#">Thơ</a></li>
                                        <li className="drop-down-item"><a href="#">Thể thao</a></li>
                                        <li className="drop-down-item"><a href="#">Kinh doanh</a></li>
                                        <li className="drop-down-item"><a href="#">Kỹ năng</a></li>
                                        <li className="drop-down-item"><a href="#">Du lịch</a></li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item"><a href="#">sách hay</a>
                                {/* <div className="drop-down-1">
                                        <ul>
                                            <li className="drop-down-item"><a href="#" >Văn học kinh điển</a></li>
                                            <li className="drop-down-item"><a href="#">Văn học đương đại</a></li>
                                            <li className="drop-down-item"><a href="#">Văn học nữ giới</a></li>
                                            <li className="drop-down-item"><a href="#">Lãng mạn</a></li>
                                            <li className="drop-down-item"><a href="#">Light novel</a></li>
                                            <li className="drop-down-item"><a href="#">Graphic novel</a></li>
                                            <li className="drop-down-item"><a href="#">Tội phạm</a></li>
                                            <li className="drop-down-item"><a href="#">Trinh thám</a></li>
                                        </ul>
                                    </div>  */}
                            </li>
                            <li className="nav-item"><a href="#">góc mọt sách</a></li>
                            <li className="nav-item"><a href="#">góc sáng tác</a></li>
                            <li className="nav-item"><a href="#">cộng đồng</a></li>
                        </ul>
                    </nav>
                </div>

            </div>

        )
    }
}

