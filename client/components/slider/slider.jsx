import * as React from 'react'
import './slider.scss'

export class Slider extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return(
            <div className="slider">
            <div className="slider__slide slider__slide--active" data-slide="1">
               <div className="slider__wrap">
                 <div className="slider__back"></div>
               </div>
               <div className="slider__inner">
                 <div className="slider__content">
                   <h1>Slide <br/> One</h1><a className="go-to-next">next</a>
                 </div>
               </div>
             </div>
             <div className="slider__slide" data-slide="2">
               <div className="slider__wrap">
                 <div className="slider__back"></div>
               </div>
               <div className="slider__inner">
                 <div className="slider__content">
                   <h1>Slide <br/> Two</h1><a className="go-to-next">next</a>
                 </div>
               </div>
             </div>
             <div className="slider__slide" data-slide="3">
               <div className="slider__wrap">
                 <div className="slider__back"></div>
               </div>
               <div className="slider__inner">
                 <div className="slider__content">
                   <h1>Slide <br/> Three</h1><a className="go-to-next">next</a>
                 </div>
               </div>
             </div>
             <div className="slider__indicators"></div>
        </div>
        )
    }
}

export default Slider
