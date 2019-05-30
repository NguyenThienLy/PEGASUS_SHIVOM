import * as React from 'react'

import './reviews.scss'
import { CloudImage } from '../../../../components';

export class Reviews extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div className="reviews-main">
                <div className="reviews-row">
                    <div className="review-item">
                        <div className="img-wrapper">
                            <CloudImage src="https://bizweb.dktcdn.net/100/197/269/products/lam-ra-lam-choi-ra-choi.jpg?v=1549868667403" />
                        </div>
                        <div className="review-info">
                            <h4>Cuốn sách hay về marketing</h4>
                            <p>Vũ Hoài Nam</p>
                            <p>
                            Business Model Generation - Tạo Lập Mô Hình Kinh Doanh Tạo lập mô hình kinh doanh là cuốn sổ tay dành cho những doanh nhân có khao khát thay đổi, khao khát vươn lên. 
                            </p>
                        </div>  
                    </div>
                    <div className="review-item">
                        <div className="img-wrapper">
                            <CloudImage src="https://bizweb.dktcdn.net/100/197/269/products/com-bo-tam-ly-hoc.jpg?v=1550046079353" />
                        </div>
                        <div className="review-info">
                            <h4>Cuốn sách hay về marketing</h4>
                            <p>Vũ Hoài Nam</p>
                            <p>
                            Business Model Generation - Tạo Lập Mô Hình Kinh Doanh Tạo lập mô hình kinh doanh là cuốn sổ tay dành cho những doanh nhân có khao khát thay đổi, khao khát vươn lên. 
                            </p>
                        </div>  
                    </div>
                </div>
                <hr/>
                <div className="reviews-row">
                    <div className="review-item">
                        <div className="img-wrapper">
                            <CloudImage src="https://bizweb.dktcdn.net/100/197/269/products/combo-sketchnote.png?v=1552291129710" />
                        </div>
                        <div className="review-info">
                            <h4>Cuốn sách hay về marketing</h4>
                            <p>Vũ Hoài Nam</p>
                            <p>
                            Business Model Generation - Tạo Lập Mô Hình Kinh Doanh Tạo lập mô hình kinh doanh là cuốn sổ tay dành cho những doanh nhân có khao khát thay đổi, khao khát vươn lên. 
                            </p>
                        </div>  
                    </div>
                    <div className="review-item">
                        <div className="img-wrapper">
                            <CloudImage src="https://bizweb.dktcdn.net/100/197/269/products/dai-tieu-thu-crazy-rich-asians-2-bia-truoc.png?v=1552028974110" />
                        </div>
                        <div className="review-info">
                            <h4>Cuốn sách hay về marketing</h4>
                            <p>Vũ Hoài Nam</p>
                            <p>
                            Business Model Generation - Tạo Lập Mô Hình Kinh Doanh Tạo lập mô hình kinh doanh là cuốn sổ tay dành cho những doanh nhân có khao khát thay đổi, khao khát vươn lên. 
                            </p>
                        </div>  
                    </div>
                </div>
            </div>
        )
    }
}