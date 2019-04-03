import * as React from 'react'

import './info.scss'

export class BookInfo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="book-info-main">
                <div className="book-info-row">
                    <div className="basic-info">
                        <div className="book-avatar">
                            <img src="https://www.nxbtre.com.vn/Images/Book/nxbtre_full_10352018_093557.jpg" />
                        </div>
                        {/* <h4 className="review-name">Trần Thị Lý</h4> */}
                    </div>

                    {/* <div className="summary-info">

                        <div className="summary-info-item">
                            <div className="summary-number">
                                <span>15</span>
                                <div className="summary-icon">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_mjnL_r3xypi88HNvQq2QY3vAmb-YO06ZX_6FK_cY1KZmzXT2" />
                                </div>
                            </div>
                            <p>Bài viết</p>
                        </div>
                        <div className="summary-info-item">
                            <div className="summary-number">
                                <span>200</span>
                                <div className="summary-icon">
                                    <img src="https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-8-512.png" />
                                </div>
                            </div>
                            <p>Người theo dõi</p>

                        </div>
                        <div className="summary-info-item">
                            <div className="summary-number">
                                <span>187</span>
                                <div className="summary-icon">
                                    <img src="https://cdn.iconscout.com/icon/free/png-256/ruby-226055.png" />
                                </div>
                            </div>
                            <p>Điểm tích luỹ</p>

                        </div>

                    </div> */}
                </div>
                <div className="book-info-row">
                    <div className="maxim">
                        <h3>Marketing cạnh trang</h3>
                        <p>
                            Philip Kolter
                        </p>
                        <div id="book-rank-star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                            </div>
                    </div>
                    <div className="description">
         
                            {/* <h4>Sơ lược bản thân</h4> */}
                            <p>
                            Business Model Generation - Tạo Lập Mô Hình Kinh Doanh Tạo lập mô hình kinh doanh là cuốn sổ tay dành cho những doanh nhân có khao khát thay đổi, khao khát vươn lên. Qua cuốn sách Kinh doanh này, bạn sẽ: Biết được cách thiết kế và thực hiện có hệ thống mô hình kinh doanh mang tính đột phá - hoặc phân tích và tái...
                        </p>
                 
                    </div>
                </div>

            </div >
        )
    }
}

