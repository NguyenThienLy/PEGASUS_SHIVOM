import * as React from 'react';
import './review.scss';

export class Review extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { review } = this.props;
    return (
      <div className="review">
        {/* <div className="review__blankTop"></div> */}
        <div className="review__inner">
          <div className="review__inner__image">
            <img src={review.image} alt="" />
            <span className="review__inner__image__icon">"</span>
          </div>
          <div className="review__inner__info">
            <div className="review__inner__info__content">
              {review.content
                .split(' ')
                .slice(0, 22)
                .join(' ')}
            </div>
            <div className="review__inner__info__owner">{review.name}</div>
          </div>
        </div>
      </div>
    );
  }
}
