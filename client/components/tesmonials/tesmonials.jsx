import * as React from 'react';
import './tesmonials.scss';
import { Review } from '../../components';
export class Tesmonials extends React.Component {
  constructor(props) {
    super(props);
    this.settingSlider = this.settingSlider.bind(this);
  }
  settingSlider() {
    $('.tesmonials__slick-autoplay').slick({
      dots: true,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 5000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true
          }
        }
      ]
    });
    $('.tesmonials__slick-autoplay').on('beforeChange', function(
      event,
      slick,
      currentSlide,
      nextSlide
    ) {
      $('.tesmonials__slick-autoplay .slick-dots li').removeClass(
        'slick-active'
      );
      $('.tesmonials__slick-autoplay .slick-dots li button')
        .attr('aria-pressed', 'false')
        .focus(function() {
          this.blur();
        });
    });
  }
  componentDidMount() {
    this.settingSlider();
  }
  render() {
    return (
      <div className="tesmonials">
        <div className="tesmonials__slick-autoplay">
          {this.props.tesmonials.map((review, index) => {
            return (
              <div className="tesmonials__slick-autoplay__item" key={index}>
                <Review review={review} />
              </div>
            );
          })}
          {/* {this.state.reviews.map(review => {
                  return (
                    <div className="home__body__reviews__slick-autoplay__item">
                      <Review review={review} />
                    </div>
                  );
                })} */}
        </div>
      </div>
    );
  }
}
