import React, { Component } from 'react';
import "./slideHome.scss"


export class SlideHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlideIndex: 0
        }
    }
    onChangeSlide = (index) => {
        this.setState({ currentSlideIndex: index });
    }

    render() {
        const { slides } = this.props;
        // console.log("slide props: " + slides);
        return (
            <div id="slide-home-wrap">
                <div id="active">
                    {
                        <div>
                            <div id="img-wrap">
                                <img src={slides[this.state.currentSlideIndex].img} alt={slides[this.state.currentSlideIndex].quote.substring(0, 10)} />
                            </div>
                            <div>
                                <div className="name">
                                    <span className="author">{slides[this.state.currentSlideIndex].author}</span>
                                    <i class="fas fa-book"></i>
                                    <span className="bookName"> {slides[this.state.currentSlideIndex].book}</span>
                                </div>

                                <div className="quote"><blockquote>{slides[this.state.currentSlideIndex].quote}</blockquote></div>
                            </div>

                        </div>

                    }
                </div>
                <div id="slides-wrap">
                    {
                        slides.map((item, index) => {
                            return (
                                <div>
                                    <div className="img-wrap" onClick={() => { this.onChangeSlide(index) }}>
                                        <img src={item.img} alt={item.quote.substring(0, 10)} />
                                    </div>
                                    <div>
                                        <div className="quote">
                                            <a href="">{item.quote.substring(0, 30)} ...</a></div>
                                        <div className="author"><a href="#">{item.book}</a></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div >);
    }
}