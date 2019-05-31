import * as React from 'react'
import 'isomorphic-unfetch'
import Head from 'next/head'
import Link from 'next/link'
import './post.scss'

import { connect } from 'react-redux'
import { api } from '../../services'
import { Header } from '../../components'



class Post extends React.Component {
    constructor(props) {
        super(props)
    }
    static async  getInitialProps({ req, query }) {
        const slug = req.params.postId
        const posts = await api.post.getList({ query: { fields: ["$all"], filter: { slug: slug } } })
        return {
            post: posts[0]
        }
    }
    render() {

        return (
            <div>
                <Head>
                    <title>{this.props.post.title}</title>
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous" />
                </Head>
                <Header {...this.props} />
                
                <div className="post-body">
                    <div className="post-body__content">
                        <div className="post-title"><h1 className="post-title__h1">Tuyệt phẩm văn học của Mario Puzo</h1></div>
                        <div className="book-info">
                            <h2 className="book-info__h2">
                                <div>
                                    <a href="#" className="book-info__title">Bố Già</a> <i>của</i> <a href="#" className="book-info__author">Mario Puzo</a>
                                </div>
                                
                            </h2>
                            
                            <div className="book-info__book-genre">
                                <a href="#">kinh điển</a>, <a href="#">giả tưởng</a>
                            </div>
                        </div>
                        <div className="reviewer-info">
                            <div className="reviewer-info__avatar">
                                <a href="#" className="reviewer-info__avatar reviewer-info__avatar--hover">
                                    <img 
                                    src="https://instagram.fsgn4-1.fna.fbcdn.net/vp/42b79272c0fc6ccea431c76e02a15133/5D7BB3CB/t51.2885-19/s150x150/56194279_2392509284143924_5773805861218549760_n.jpg?_nc_ht=instagram.fsgn4-1.fna.fbcdn.net" 
                                    alt="User's avatar"
                                    className="reviewer-info__avatar--style">
                                    </img>
                                </a>
                            </div>
                            <div className="reviewer-info__username">
                                <a href="#">Lê Nguyễn Minh</a>
                            </div>
                            <div className="reviewer-info__follow">
                                <button type="button" className="reviewer-info__follow__button">Theo dõi</button>
                            </div>
                            <div className="reviewer-info__given-point">
                                - đã cho quyển sách này n điểm
                            </div>
                        </div>
                        
                        <div className="post-content">
                            <p>{this.props.post.content}</p>
                        </div>
                        <div className="post-tags"></div>
                        <div className="post-comment"></div>
                    </div>
                    {/* =================================================== */}
                    <div className="post-subgroup">
                        <div className="post-subgroup__book-info">
                            <div className="post-subgroup__book-info__title">
                                <a 
                                href="#" 
                                className="post-subgroup__book-info__title__a">
                                    Bố già
                                </a>
                                <div className="post-subgroup__book-info__title__average-point">
                                    rate this book
                                </div>                
                            </div>                     
                            <div className="post-subgroup__book-info__img">                        
                                <a href="#">
                                    <img 
                                    src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f4/Godfather-Novel-Cover.png/175px-Godfather-Novel-Cover.png" 
                                    alt="book's cover image"
                                    className="post-subgroup__book-info__img--float">                                    
                                    </img>
                                </a>
                            </div>
                            <div className="post-subgroup__book-info__shortcut">                                            
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                <span> 
                                    <a 
                                    href="#" 
                                    className="post-subgroup__book-info__shortcut__more">
                                       &nbsp;...xem thêm
                                    </a>
                                </span>
                            </div>
                        </div>

                        <div className="post-subgroup__author-info">
                            <div className="post-subgroup__author-info__name">
                                <a 
                                href="#" 
                                className="post-subgroup__author-info__name__a">
                                    Mario Puzo
                                </a>                                               
                            </div>
                            <div className="post-subgroup__author-info__top">
                                <div className="post-subgroup__author-info__top__avatar">
                                    <a href="#" className="post-subgroup__author-info__top__avatar--hover">
                                        <img 
                                        src="https://images.gr-assets.com/authors/1379918709p5/12605.jpg" 
                                        alt="author's image"
                                        className="post-subgroup__author-info__top__avatar__img">
                                        </img>
                                    </a>
                                </div>
                                <div className="post-subgroup__author-info__top__name">
                                    <a href="#" className="post-subgroup__author-info__top__name__a">Mario Puzo</a>
                                </div>
                                <div className="post-subgroup__author-info__top__follow">
                                    <button type="button" className="post-subgroup__author-info__top__follow__button">Theo dõi</button>
                                </div>    
                            </div>
                            <div className="post-subgroup__author-info__bottom">                                            
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                                <span> 
                                    <a 
                                    href="#" 
                                    className="post-subgroup__author-info__bottom__more">
                                       &nbsp;...xem thêm
                                    </a>
                                </span>
                            </div>                                  
                        </div>
                        <div className="post-subgroup__related-books">
                            <div className="post-subgroup__related-books__title">
                                <a 
                                href="#" 
                                className="post-subgroup__related-books__title__a">
                                    Sách cùng thể loại
                                </a>                                               
                            </div>   
                            <div className="post-subgroup__related-books__content">
                                <tr className="rlb-content-tr">
                                    <td className="rlb-content-tr__td-cover">
                                        <a href="#">
                                            <img 
                                            src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1394988109i/22034._SY75_.jpg"                                             
                                            alt="related book cover" 
                                            className="rlb-content-tr__td-cover__img"></img>
                                        </a>
                                    </td>
                                    <td className="rlb-content-tr__td-detail">
                                        <a href="#"><span>The Godfather</span></a>
                                        <br></br>
                                        <span><i>của </i></span>
                                        <span><a href="#">Mario Puzo</a></span>
                                        <br></br>
                                        <div>10 points</div>
                                    </td>                    
                                </tr>    
                            </div> 
                        </div>
                    </div>
                    {/* =================================================== */}
                    <div className="post-widget">
                        <div className="post-widget__reviewer-avatar">
                            <a href="#">
                                <img 
                                src="https://instagram.fsgn4-1.fna.fbcdn.net/vp/42b79272c0fc6ccea431c76e02a15133/5D7BB3CB/t51.2885-19/s150x150/56194279_2392509284143924_5773805861218549760_n.jpg?_nc_ht=instagram.fsgn4-1.fna.fbcdn.net" 
                                alt="User's avatar"
                                className="post-widget__reviewer-avatar__img">
                                </img>
                            </a>
                        </div>
                        <div className="post-widget__username">
                            <a href="#" className="post-widget__username__a">Lê Nguyễn Minh</a>
                        </div>
                        <div className="post-widget__quote">
                            <div>
                                <i class="fas fa-quote-left"></i>
                            </div>                            
                            <div className="post-widget__quote--style">Đời là bể khổ, mua thịt gà ăn</div>
                            <div className="fas-quote-icon-right">
                                <i class="fas fa-quote-right"></i>
                            </div>
                        </div>
                        <div className="post-widget__follow">
                            <button type="button" className="post-widget__follow__button">Theo dõi</button>                            
                            <hr></hr>
                        </div>
                        
                        <div className="post-widget__function-buttons">
                            <div>
                                <i class="far fa-heart"></i>      
                            </div>
                            <div>
                                <i class="far fa-bookmark"></i>           
                            </div>
                            <div>
                                <i class="fab fa-facebook-square"></i>
                            </div>
                            <div>
                                <i class="fab fa-twitter"></i>
                            </div>                
                            
                        </div>
                    </div>    
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Post);

