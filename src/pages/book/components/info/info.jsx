import * as React from 'react'

import './info.scss'
import { CloudImage } from '../../../../components';

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
                            <CloudImage src={this.props.thumb} />
                        </div>
                        {/* <h4 className="review-name">Trần Thị Lý</h4> */}
                    </div>

                    {/* <div className="summary-info">

                        <div className="summary-info-item">
                            <div className="summary-number">
                                <span>15</span>
                                <div className="summary-icon">
                                    <CloudImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_mjnL_r3xypi88HNvQq2QY3vAmb-YO06ZX_6FK_cY1KZmzXT2" />
                                </div>
                            </div>
                            <p>Bài viết</p>
                        </div>
                        <div className="summary-info-item">
                            <div className="summary-number">
                                <span>200</span>
                                <div className="summary-icon">
                                    <CloudImage src="https://cdn1.iconfinder.com/data/icons/mix-color-3/502/Untitled-8-512.png" />
                                </div>
                            </div>
                            <p>Người theo dõi</p>

                        </div>
                        <div className="summary-info-item">
                            <div className="summary-number">
                                <span>187</span>
                                <div className="summary-icon">
                                    <CloudImage src="https://cdn.iconscout.com/icon/free/png-256/ruby-226055.png" />
                                </div>
                            </div>
                            <p>Điểm tích luỹ</p>

                        </div>

                    </div> */}
                </div>
                <div className="book-info-row">
                    <div className="maxim">
                        <h3>{this.props.title}</h3>
                        <p>
                            {this.props.author.name}
                        </p>
                        <div id="book-rank-star">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                            <i className="far fa-star"></i>
                        </div>
                    </div>
                    <div className="description">

                        {/* <h4>Sơ lược bản thân</h4> */}
                        <p>
                            {this.props.description ? this.props.description.slice(0, 255) + "..." : "..."}
                        </p>

                    </div>
                </div>

            </div >
        )
    }
}

