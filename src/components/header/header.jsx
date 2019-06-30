import * as React from 'react'
import './header.scss'
import Link from 'next/link'
import Router from 'next/router'
import Head from 'next/head'
import * as _ from "lodash"

import { action } from '../../actions'
import { api } from '../../services'

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    

    async componentWillMount() {
        
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
        
    }
    onSearch = async () => {
        const query = this.refs.search.value
        this.setState({ search: query })
    }
    onSearchKeyPress = async (event) => {
        console.log("search xong rồi")
        // Router.push(`/searchResult/searchResult?search=${this.state.search}`, `/tim-kiem?search=${this.state.search}`)
    }


    render() {
        return (

            <div className="header" id="header-id">
                <div className="first-floor" id="first-floor-id">
                    <div>
                        
                        <div className="first-floor__page-title"><b>PEGASUS</b></div>
                    </div>

                    <div className="function-group">
                        <div className="function-group__item search-box">

                            <input className="search-box__search-txt" type="text" name="search-box" placeholder="Tìm kiếm..." ref="search" onChange={this.onSearch} onKeyPress={this.onSearchKeyPress} />
                            <a className="search-box__search-icon" href="#" aria-label="Search book and reviewer">
                                <i className="fas fa-search"></i>
                            </a>

                        </div>
                        
                    </div>
                </div>

                <div className="second-floor">
                    <nav className="navbar">
                        <ul className="nav-links">
                            <Link href="/">
                                <li className="nav-item"><a href="#" className="active nav-item--style">trang chủ</a></li>
                            </Link>
                            <Link href="/about/about" as="/gioi-thieu">
                                <li className="nav-item"><a href="/gioi-thieu" className="nav-item--style">Giới thiệu</a>
                                </li>
                            </Link>
                            <Link href="/project/project" as="/du-an">
                                <li className="nav-item"><a href="/du-an" className="nav-item--style">Dự án</a>
                                </li>
                            </Link>
                            <Link href="/blog/blog" as="/bai-viet">
                                <li className="nav-item"><a href="/bai-viet" className="nav-item--style">Blog</a>
                                </li>
                            </Link>
                            <Link href="/contact/contact" as="/lien-he">
                                <li className="nav-item"><a href="/lien-he" className="nav-item--style">Liên hệ</a>
                                </li>
                            </Link>
                        </ul>
                    </nav>
                </div>

            </div >

        )
    }
}

