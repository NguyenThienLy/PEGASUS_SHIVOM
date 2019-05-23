import * as React from "react";
import "isomorphic-unfetch";
import { connect } from "react-redux";
import { Header, Headline, Footer } from "../../components";
import Head from "next/head";
import Link from "next/link";
import "./searchResult.scss";



class SearchResult extends React.Component {
  constructor(props) {
    super(props);

  }
  static async getInitialProps({ req, query }) {
    return {};
  }

  render() {
    return (
      <div>
        <Head>
          <title>Kết qủa tìm kiếm</title>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
            integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
            crossorigin="anonymous"
          />
        </Head>
        <Header {...this.props}/>
        
        <div className="search-page">
    <div className="search-content">
        <div className="search-box">
            <input className="search-txt" type="text" name="search-box" placeholder="Tìm kiếm..."/>
            <a className="search-icon" href="#">
                <i className="fas fa-search"></i>
            </a>
        </div>
        <div>
            <ul className="search-navbar">
                <li className="search-navbar-item active"><a href="#">Bài viết đánh giá</a></li>
                <li className="search-navbar-item"><a href="#">Reviewer</a></li>
                <li className="search-navbar-item"><a href="#">Sách</a></li>
                <li className="search-navbar-item"><a href="#">Tác giả</a></li>
                <li className="search-navbar-item"><a href="#">Góc mọt sách</a></li>
            </ul>
        </div>
        
        <div className="search-result-container">
            <div className="search-result-top">
                <div className="search-result-top-title">Kết quả</div>
                <div className="search-result-top-items">
                    
                    <select className="select-css">
                        <option value="10" selected>10 kết quả / trang</option>
                        <option value="15">15 kết quả / trang</option>
                        <option value="20">20 kết quả / trang</option>
                        <option value="25">25kết quả / trang</option>
                    </select>
                   
                    <select className="select-css">
                        <option value="rating htl" selected>Đánh giá (cao đến thấp)</option>
                        <option value="rating lth">Đánh giá (thấp đến cao)</option>                   
                    </select>
                </div>
            </div>
        </div>
        <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores dolores, beatae optio quibusdam itaque accusamus velit corporis. Repudiandae, deleniti accusantium, sit assumenda, hic ab similique officia necessitatibus excepturi porro quas!    
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, dolores necessitatibus? Soluta, sunt. Necessitatibus, explicabo. Dicta necessitatibus nulla quasi officiis, perspiciatis error voluptatibus sit fuga quibusdam nesciunt harum debitis dignissimos?
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium excepturi earum, sed accusantium similique doloremque iure magni nemo expedita, officia nulla molestias repellendus omnis dolorum, dolore nam beatae ab sapiente.
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam odit, esse animi debitis porro blanditiis tenetur fugit tempore. Deserunt dolore eveniet amet, rem commodi quis! Porro, veritatis? Magnam, similique reiciendis.
        </div>
        <div className="pagination__wrapper">
                        <ul className="pagination">
                          <li><button className="prev" title="previous page">&#10094;</button></li>
                          <li>
                            <button title="first page - page 1">1</button>
                          </li>
                          <li>
                            <span>...</span>
                          </li>
                          <li>
                            <button title="page 8">8</button>
                          </li>
                          <li>
                            <button className="active" title="current page - page 9">9</button>
                          </li>
                          <li>
                            <button title="page 10">10</button>
                          </li>
                          <li>
                            <span>...</span>
                          </li>
                          <li>
                            <button title="last page - page 69">69</button>
                          </li>
                          <li><button className="next" title="next page">&#10095;</button></li>
                        </ul>
        </div>
        
    </div>
    
            <div className="search-filter">  
                    <div className="search-filter-column">                            
                        <label className="genre-container">Tất cả
                                <input type="checkbox" className="genre-input" checked="checked"/>
                                <span className="checkmark"></span>
                        </label> 
                        <label className="genre-container">Kỹ năng
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                        <label className="genre-container">Kinh doanh
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>     
                        <label className="genre-container">Văn học kinh điển
                            <input type="checkbox" className="genre-input"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Văn học đương đại
                            <input type="checkbox" className="genre-input"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Văn học nữ giới
                            <input type="checkbox" className="genre-input"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Lãng mạn
                            <input type="checkbox" className="genre-input"/>
                            <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Light novel
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Graphic novel
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Tội phạm
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>
                        
                        <label className="genre-container">Trinh thám
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>    
                        <label className="genre-container">Kinh dị (Horror)
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Kinh dị (Thriller)
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                        
                        <label className="genre-container">Tiểu sử
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                        <label className="genre-container">Hồi ký
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                    </div>
                    <div className="search-filter-column"> 
                        <label className="genre-container">Khoa học
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                    
                        <label className="genre-container">Triết học
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                        
                        <label className="genre-container">Tâm lý học
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                        <label className="genre-container">Lịch sử
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Lịch sử giã tưởng
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                        <label className="genre-container">Hư cấu
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                        <label className="genre-container">Fantasy
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                        <label className="genre-container">Khoa học viễn tưởng
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
        
                    
                        <label className="genre-container">Huyền bí
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                        <label className="genre-container">Siêu linh
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                        <label className="genre-container">Paranomal
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Nghệ thuật
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Âm nhạc
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Thơ
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>
                        <label className="genre-container">Thể thao
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>
                          
                        
                        <label className="genre-container">Du lịch
                                <input type="checkbox" className="genre-input"/>
                                <span className="checkmark"></span>
                        </label>  
                    </div>
                    
        
                    
                    
                
    </div>
   
    </div>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(SearchResult);
