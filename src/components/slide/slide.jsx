import * as React from 'react'
import "./slide.scss"
export class Slide extends React.Component {
    constructor(pros) {
        super(pros);
        this.state = {
            currentSlide:0,
            img : [
                "img/slide0.jpg",
                "img/slide1.jpg",
                "img/slide2.jpg",
                "img/slide3.jpg",
                "img/slide4.jpg",
                "img/slide5.jpg"
            ]
        };

        this.setSlide = this.setSlide.bind(this);
        this.showSlide = this.showSlide.bind(this)
    }
    timeOut 

    setSlide(n){
        console.log("Da vao ham set slide");
        this.setState({currentSlide: n});
        // this.forceUpdate()
        // console.log("changed slide "+ this.state.currentSlide);
        // this.timeOut = setTimeout(this.showSlide, 1000)
    }

    showSlide(){
        console.log("Da them")
        let btn = document.getElementsByClassName("rectangle-slide")
        btn[this.state.currentSlide].classList.remove("btn-active")

        let max = this.state.img.length
        let nextSlide = (this.state.currentSlide +1) % max;
        this.setState({currentSlide: nextSlide});

        btn[this.state.currentSlide].classList.add("btn-active");
        // console.log("dfs"+ document.getElementById("single-img-slide"));
        document.getElementById("single-img-slide").classList.add("aniamtion");
    }
    
    render() {
        return (
            <div>
             
            <div className="slide" onLoad={() => {setTimeout(this.showSlide, 2000)}}>
                <div className="slide-img">
                    <CloudImage  id="single-img-slide" src={this.state.img[this.state.currentSlide]} />
                </div>

                <div className="slide__btn">
                    <span className="rectangle-slide btn-active"></span>
                    <span className="rectangle-slide"></span>
                    <span className="rectangle-slide"></span>
                    <span className="rectangle-slide"></span>
                    <span className="rectangle-slide"></span>
                    <span className="rectangle-slide"></span>
                </div>
                <script src="js/slide.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>
            </div>
            </div> 
        )
    }
}

// export class Slide extends React.Component{
//     constructor(props){
//         super(props)
//     }

//     render(){
//         return (
//             <div>
//         <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
//         <ol className="carousel-indicators">
//             <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
//             <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
//             <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
//         </ol>
//         <div className="carousel-inner">
//             <div className="carousel-item active">
//             <CloudImage src="img/slide0.jpg" className="d-block w-100" alt="book"/>
//             </div>
//             <div className="carousel-item">
//             <CloudImage src="img/slide1.jpg" className="d-block w-100" alt="book"/>
//             </div>
//             <div className="carousel-item">
//             <CloudImage src="img/slide2.jpg" className="d-block w-100" alt="book"/>
//             </div>
//         </div>
//         <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
//             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//             <span className="sr-only">Previous</span>
//         </a>
//         <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
//             <span className="carousel-control-next-icon" aria-hidden="true"></span>
//             <span className="sr-only">Next</span>
//         </a>
//         </div>
//         </div>
//             )
        
//     }
// }
