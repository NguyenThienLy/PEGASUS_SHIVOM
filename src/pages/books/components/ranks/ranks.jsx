import * as React from 'react'
import './ranks.scss'
import { CloudImage } from '../../../../components';


export class Ranks extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className="list-ranks">
                <div className="select-rank-type">
                    <select>
                        <option>Top sách hay nhất quý</option>
                        <option>Top sách hay nhất tháng</option>
                        <option>Top sách hay nhất tuần</option>
                    </select>
                </div>
                <div className="list">
                    <div className="rank-book-item">
                        <div className="image-wrapper">
                            <CloudImage src="https://www.nxbtre.com.vn/Images/Book/nxbtre_full_10352018_093557.jpg" />
                        </div>
                        <div className="book-info">
                            <h3>Tạo lập mô hình kinh doanh</h3>
                            <p>Philip Kolter</p>
                            <div id="book-rank-star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                        
                    </div>
                    <hr/>
                    <div className="rank-book-item">
                        <div className="image-wrapper">
                            <CloudImage src="https://www.nxbtre.com.vn/Images/Book/nxbtre_full_10352018_093557.jpg" />
                        </div>
                        <div className="book-info">
                            <h3>Tạo lập mô hình kinh doanh</h3>
                            <p>Philip Kolter</p>
                            <div id="book-rank-star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                        
                    </div>
                    <hr/>
                    <div className="rank-book-item">
                        <div className="image-wrapper">
                            <CloudImage src="https://www.nxbtre.com.vn/Images/Book/nxbtre_full_10352018_093557.jpg" />
                        </div>
                        <div className="book-info">
                            <h3>Tạo lập mô hình kinh doanh</h3>
                            <p>Philip Kolter</p>
                            <div id="book-rank-star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                        
                    </div>
                    <hr/>
                    <div className="rank-book-item">
                        <div className="image-wrapper">
                            <CloudImage src="https://www.nxbtre.com.vn/Images/Book/nxbtre_full_10352018_093557.jpg" />
                        </div>
                        <div className="book-info">
                            <h3>Tạo lập mô hình kinh doanh</h3>
                            <p>Philip Kolter</p>
                            <div id="book-rank-star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }

}