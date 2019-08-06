import * as React from 'react'
import './header.scss'
import Link from 'next/link'
// import Router from 'next/router'
// import Head from 'next/head'
// import * as _ from "lodash"

// import { action } from '../../actions'
// import { api } from '../../services'

export class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
    
        // async componentWillMount() {
            
        // }
        // async componentDidMount() {
        //     const s = document.createElement('script');
        //     s.type = 'text/javascript';
        //     s.async = true;
        //     s.innerHTML = `
        //         var prevScrollpos = window.pageYOffset;
        //         window.onscroll = function() {
        //         var currentScrollPos = window.pageYOffset;
        //         if (prevScrollpos > currentScrollPos) {
        //             document.getElementById("header-id").style.top = "0px";
        //             //document.getElementById("header-id").style.position = "fixed";
        //             document.getElementById("header-id").style.boxShadow = "none";
        //         } else {
        //             document.getElementById("header-id").style.top = "-67px";
        //             document.getElementById("header-id").style.boxShadow = "rgba(0, 0, 0, 0.16) 0px 0px 3px 0px, rgba(0, 0, 0, 0.12) 0px 1px 7px 0px";
        //         }
        //         prevScrollpos = currentScrollPos;
        //         }
        //     `;
        //     document.body.appendChild(s);
            
        // }
        // onSearch = async () => {
        //     const query = this.refs.search.value
        //     this.setState({ search: query })
        // }
        // onSearchKeyPress = async (event) => {
        //     console.log("search xong rồi")
        //     // Router.push(`/searchResult/searchResult?search=${this.state.search}`, `/tim-kiem?search=${this.state.search}`)
        // }
    


    render() {
        return (
            <div className="header-wrapper">
                <div className="header-wrapper__page-menu-area">
                    <div className="header-wrapper__page-menu-area__left">
                        <div className="header-wrapper__page-menu-area__left__logo-wrapper">
                            <a className="header-wrapper__page-menu-area__left__logo-wrapper__a">
                                <img 
                                    src="https://i.etsystatic.com/13665876/d/il/d5b7d0/1363979907/il_340x270.1363979907_ic0j.jpg?version=0"
                                    className="header-wrapper__page-menu-area__left__logo-wrapper__a__img"
                                />
                            </a>
                        </div>
                        <nav className="header-wrapper__page-menu-area__left__navbar">
                            <ul className="header-wrapper__page-menu-area__left__navbar__list-items">
                                <li className="header-wrapper__page-menu-area__left__navbar__list-items__item" id="nav-home-page">
                                    <a href="#"className="category-name">
                                        <span>Trang chủ</span>
                                    </a>
                                </li>
                                <li className="header-wrapper__page-menu-area__left__navbar__list-items__item" id="nav-courses">
                                    <a href="#" className="category-name">
                                        <span>Khoá học</span>
                                    </a>
                                    <div className="header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown hover-dropdown" >
                                        <div className="header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown__inner">
                                            <ul className="header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown__inner__list-items">
                                                <li className="header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown__inner__list-items__item">
                                                    <a href="#" className="sub-category-name">
                                                        <span>khoá học một</span>
                                                    </a>
                                                </li>
                                                <li className="header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown__inner__list-items__item">
                                                    <a href="#" className="sub-category-name">
                                                        <span>khoá học hai</span>
                                                    </a>
                                                </li>
                                                <li className="header-wrapper__page-menu-area__left__navbar__list-items__item__dropdown__inner__list-items__item">
                                                    <a href="#" className="sub-category-name">
                                                        <span>khoá học ba</span>
                                                    </a>
                                                </li>
                                            </ul>      
                                        </div>
                                    </div>
                                </li>
                                <li className="header-wrapper__page-menu-area__left__navbar__list-items__item" id="nav-news">
                                    <a href="#" className="category-name">
                                        <span>Tin tức</span>
                                    </a>
                                </li>
                                <li className="header-wrapper__page-menu-area__left__navbar__list-items__item" id="nav-about-us">
                                    <a href="#" className="category-name">
                                        <span>Về chúng tôi</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>    
                    <div className="header-wrapper__page-menu-area__right">
                        <div className="header-wrapper__page-menu-area__right__more-btn">
                            <i class="far fa-circle"></i>
                            <i class="far fa-circle"></i>
                            <i class="far fa-circle"></i>
                        </div>        
                        

                    </div>    
                </div>
            </div>
        )
    }
}

export default Header
