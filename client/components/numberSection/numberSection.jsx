import * as React from 'react'
import './numberSection.scss'

export class NumberSection extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="number-section">
                <div className="number-section__item">
                    <div className="number-section__item__number">123</div> 
                    <div className="number-section__item__content number-section__item__content--overlay">giờ ăn chơi</div>
                </div>
                <div className="number-section__item">
                    <div className="number-section__item__number">123</div> 
                    <div className="number-section__item__content number-section__item__content--overlay">giờ ăn chơi</div>
                </div>
                <div className="number-section__item">
                    <div className="number-section__item__number">123</div> 
                    <div className="number-section__item__content number-section__item__content--overlay">giờ ăn chơi</div>
                </div>
                <div className="number-section__item">
                    <div className="number-section__item__number">123</div> 
                    <div className="number-section__item__content number-section__item__content--overlay">giờ ăn chơi</div>
                </div>
                
            </div>
        )
    }
}