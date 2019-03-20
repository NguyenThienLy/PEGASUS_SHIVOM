import * as React from 'react'
import "./slide.scss"

import { clearTimeout } from 'timers';


// export class Slide extends React.Component {
//     constructor(pros) {
//         super(pros);
//         this.state = {
//             currentSlide:1,
//             img : [
//                 "img/slide0.jpg",
//                 "img/slide1.jpg",
//                 "img/slide2.jpg",
//                 "img/slide3.jpg",
//                 "img/slide4.jpg",
//                 "img/slide5.jpg"
//             ]
//         };

//         this.setSlide = this.setSlide.bind(this);
//         this.showSlide = this.showSlide.bind(this)
//     }
//     timeOut 

//     setSlide(n){
//         // console.log("Da vao ham set sli  de");
//         this.setState({currentSlide: n});
//         // this.forceUpdate()
//         // console.log("changed slide "+ this.state.currentSlide);
//         // this.timeOut = setTimeout(this.showSlide, 1000)
//     }

//     showSlide(){
//         let max = this.state.img.length
//         let nextSlide = (this.state.currentSlide +1) % max;
//         this.setState({currentSlide: nextSlide});
//         // setTimeout( this.setSlide(nextSlide).bind(this), 500);
//         // var slideActivve = document.
       
//     }
//     // componentDidMount(){
//     //     this.timeOut = setTimeout(this.showSlide, 1000)
        
//     // }
//     componentWillUnmount() {
//         console.log("vao ham will mount")
//          clearTimeout(this.timeOut)
//     }
//     // onLoad={this.showSlide()

//     render() {
//         return (
//             <div>
             
//             <div className="slide" onLoad={() => { this.myFuncShowSlide = setTimeout(this.showSlide, 1000)}}>
//                 <div className="slide-img">
//                     <img src={this.state.img[this.state.currentSlide]} />
//                 </div>

//                 <div className="slide__btn">
//                     <span className="rectangle-slide" onClick={()=> {this.setSlide(0)}}></span>
//                     <span className="rectangle-slide" onClick={()=> {this.setSlide(1)}}></span>
//                     <span className="rectangle-slide" onClick={()=> {this.setSlide(2)}}></span>
//                     <span className="rectangle-slide" onClick={()=> {this.setSlide(3)}}></span>
//                     <span className="rectangle-slide" onClick={()=> {this.setSlide(4)}}></span>
//                     <span className="rectangle-slide" onClick={()=> {this.setSlide(5)}}></span>
//                 </div>
//                 <script src="js/slide.js"></script>
//                 <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
//             crossorigin="anonymous"></script>
//             </div>
//             </div> 
//         )
//     }
// }

export class Slide extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src="img/slide0.jpg" className="d-block w-100" alt="book"/>
            </div>
            <div className="carousel-item">
            <img src="img/slide1.jpg" className="d-block w-100" alt="book"/>
            </div>
            <div className="carousel-item">
            <img src="img/slide2.jpg" className="d-block w-100" alt="book"/>
            </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
        </a>
        </div>
        </div>
            )
        
    }
}
