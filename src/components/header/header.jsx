import * as React from 'react'
import './header.scss'
import Link from 'next/link'
import Router from 'next/router'
import Head from 'next/head'
import * as _ from "lodash"

import { action } from '../../actions'
import { api } from '../../services'



const firebaseAuthentication = require('../../authentication/firebase')

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            categories: [[], []],
            search: null
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
    async componentDidMount() {
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = `
            var prevScrollpos = window.pageYOffset;
            window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("header-id").style.top = "0px";
                //document.getElementById("header-id").style.position = "fixed";
                document.getElementById("header-id").style.boxShadow = "none";
            } else {
                document.getElementById("header-id").style.top = "-67px";
                document.getElementById("header-id").style.boxShadow = "rgba(0, 0, 0, 0.16) 0px 0px 3px 0px, rgba(0, 0, 0, 0.12) 0px 1px 7px 0px";
            }
            prevScrollpos = currentScrollPos;
            }
        `;
        document.body.appendChild(s);
        try {
            const categories = await api.bookCategory.getList({ query: { fields: ["name", "slug"], limit: 50 } })

            let categoriesChunked = _.chunk(categories, 8)
            this.setState({ categories: categoriesChunked })
        } catch (err) {
            console.log("err: ", err)
        }
    }
    onSearch = async () => {
        const query = this.refs.search.value
        this.setState({ search: query })
    }
    onSearchKeyPress = async (event) => {
        Router.push(`/tim-kiem?search=${this.state.search}`)       
    }


    render() {
        return (

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

                            <input className="search-txt" type="text" name="search-box" placeholder="Tìm kiếm..." ref="search" onChange={this.onSearch} onKeyPress={this.onSearchKeyPress} />
                            <a className="search-icon" href="#">
                                <i class="fas fa-search"></i>
                            </a>

                        </div>
                        <button className="function-group-item sign-in-button" id="login-button">
                            {!this.state.user ?
                                <Link href="/login">
                                    <a href="#" className="nav-link">Đăng nhập</a>
                                </Link>
                                : <div>
                                    <a onClick={this.logout} href="#">{this.state.user.displayName || this.state.user.email}</a>
                                </div>
                            }
                        </button>
                    </div>
                </div>

                <div className="second-floor">
                    <nav className="navbar">
                        <ul className="nav-links">
                            <Link href="/">
                                <li className="nav-item"><a href="#" className="active">trang chủ</a></li>
                            </Link>

                            <li className="nav-item"><a href="#">thể loại</a>

                                <div className="drop-down-1">
                                    {this.state.categories.map((arrayChild) => {

                                        return (
                                            <ul>
                                                {arrayChild.map(category => {
                                                    return (
                                                        <Link href={`/the-loai/${category.slug}`}>
                                                            <li className="drop-down-item"><a href="#" >{category.name}</a></li>
                                                        </Link>
                                                    )

                                                })}
                                            </ul>
                                        )
                                    })}
                                    {/* < ul >
                                        <Link href="/the-loai/van-hoc-kinh-dien">
                                            <li className="drop-down-item"><a href="#" >Văn học kinh điển</a></li>
                                        </Link>

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
                                    </ul> */}
                                </div>
                            </li>
                            <Link href="/">
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
                            </Link>
                            <Link href="/">
                                <li className="nav-item"><a href="#">góc mọt sách</a></li>
                            </Link>
                            <Link href="/">
                                <li className="nav-item"><a href="#">góc sáng tác</a></li>
                            </Link>
                            <Link href="/">
                                <li className="nav-item"><a href="#">cộng đồng</a></li>
                            </Link>
                        </ul>
                    </nav>
                </div>

            </div >

        )
    }
}

