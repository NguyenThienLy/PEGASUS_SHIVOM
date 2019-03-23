import * as React from 'react'
import './post-general.scss'

export class PostGeneral extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
            <div className="wrap">
                <div className="imgPost col-sm-12"> 
                <img src="img/slide0.jpg" alt=""/>
                </div>
                <div className="content col-sm-12">
                    <div className="content-top">
                        <div className="content-top__title"><a href="#">Bắt trẻ đồng xanh</a></div>
                        <div className="content-top__time-detail">
                            <p className="time"><span>07:30AM, 28/02/2019 </span><br/>
                            <span className="score">24 điểm tích lũy</span> <i className="fas fa-gem"></i></p>
                        </div>
                        </div>
                        <div className="brief-content">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis nam ducimus laborum officia nihil aperiam sit at impedit a alias illum minima perferendis deleniti nulla aspernatur nisi itaque aliquid ad, repellendus tempora omnis? Facilis, atque illo ipsa magnam expedita facere amet pariatur velit provident sequi numquam harum ut aut deleniti?!</div>
                        <div className="read-more"><a href="#">Xem thêm</a></div>
                    </div>
                
            </div>
            <div className="border"></div>
         
            </div>
        )
    }

}
