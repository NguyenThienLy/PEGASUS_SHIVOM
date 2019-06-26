import React, { Component } from 'react';
import "./slideHome.scss"
import { CloudImage, LazyLoadComponent } from '../../../../components';
import Link from 'next/link'



export class SlideHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlideIndex: 2
        }
    }
    onChangeSlide = (index) => {
        console.log("Change slide : ", index)
        console.log("current: ", this.state.currentSlideIndex)
        this.setState({ currentSlideIndex: index });
        this.forceUpdate()
        document.getElementsByClassName("slide-img-wrap")[0].classList.add("opacity")
    }
    componentWillReceiveProps(nextProps) {

    }
    componentWillUpdate(nextState, nextProps) {
        console.log("next state: ", nextState)
        console.log("next props: ", nextProps)

    }
    render() {
        return (
            this.props.bookQuotes.length > 0 ?
                <div className="slide-home-wrap">

                    <div id="active">
                        <div>
                            <div className="slide-img-wrap">
                                <img src={this.props.bookQuotes[this.state.currentSlideIndex].image} alt={this.props.bookQuotes[this.state.currentSlideIndex].quote.substring(0, 10)} />
                            </div>
                            <div>
                                <div className="name">
                                    <span className="author">{this.props.bookQuotes[this.state.currentSlideIndex].author}</span>
                                    <i className="fas fa-book"></i>
                                    <span className="bookName">
                                        <Link href={`/book/book?bookId=${this.props.bookQuotes[this.state.currentSlideIndex].book._id}`} as={`/sach/${this.props.bookQuotes[this.state.currentSlideIndex].book._id}`}>
                                            <a href={`/sach/${this.props.bookQuotes[this.state.currentSlideIndex].book._id}`}> {this.props.bookQuotes[this.state.currentSlideIndex].book.title}</a>
                                        </Link>
                                    </span>
                                </div>

                                <div className="quote title"><blockquote>{this.props.bookQuotes[this.state.currentSlideIndex].quote}</blockquote></div>
                            </div>

                        </div>
                    </div>
                    <div className="slides-wrap">
                        {
                            this.props.bookQuotes.map((item, index) => {
                                return (
                                    <div key={index} onClick={() => { this.onChangeSlide(index) }}>
                                        <div className="slide-img-wrap">
                                            <CloudImage src={item.image} alt={item.quote.substring(0, 10)} />
                                        </div>
                                        <div>
                                            <div className="quote title">
                                                {item.quote.substring(0, 30)} ...</div>
                                            <div className="author">{item.book.title}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div > : <LazyLoadComponent />
        );
    }
}