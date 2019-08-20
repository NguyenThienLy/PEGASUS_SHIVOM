import * as React from "react";
import "./slider.scss";

export class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      image: [
        {
          src:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/07/fitness-slider-1.jpg",
          caption: "Caption one"
        },
        {
          src:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/07/fitness-slider-2.jpg",
          caption: "Caption two"
        },
        {
          src:
            "https://dalia.elated-themes.com/wp-content/uploads/2018/07/fitness-slider-3.jpg",
          caption: "Caption three"
        }
      ]
    };
  }
  render() {
    return (
      <div className="w3-content w3-display-container">
        <img
          className="mySlides"
          src={this.state.image.src}
          // style="width:100%"
        />
        <img
          className="mySlides"
          src={this.state.image.src}
          // style="width:100%"
        />
        <img
          className="mySlides"
          src={this.state.image.src}
          // style="width:100%"
        />
        <div
          className="w3-center w3-container w3-section w3-large w3-text-white w3-display-bottommiddle"
          // style="width:100%"
        >
          <div className="w3-left w3-hover-text-khaki" onclick="plusDivs(-1)">
            &#10094;
          </div>
          <div className="w3-right w3-hover-text-khaki" onclick="plusDivs(1)">
            &#10095;
          </div>
          <span
            className="w3-badge demo w3-border w3-transparent w3-hover-white"
            onclick="currentDiv(1)"
          />
          <span
            className="w3-badge demo w3-border w3-transparent w3-hover-white"
            onclick="currentDiv(2)"
          />
          <span
            className="w3-badge demo w3-border w3-transparent w3-hover-white"
            onclick="currentDiv(3)"
          />
        </div>
      </div>
    );
  }
}

export default Slider;
