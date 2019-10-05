import * as React from 'react';
import './stepsLine.scss';

export class StepsLine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: []
    };
  }

  handleClick = index => {
    let number = index + 1;

    if (number > this.props.curPageNumber) {
      if (this.props.canOpenPage()) {
        this.props.openPage(number);
      }
    } else {
      this.props.openPage(number);
    }
  };

  componentDidMount() {
    let listData = [];
    for (let i = 0; i < this.props.stepQuantity; i++) {
      let data = (
        <button
          onClick={() => this.handleClick(i)}
          className={`stepsLine__btn stepsLine__btn-${i + 1}`}
        >
          {i + 1}
        </button>
      );
      let line = <div className="stepsLine__line"></div>;

      listData.push(data);
      if (i !== this.props.stepQuantity - 1) {
        listData.push(line);
      }
    }
    this.setState({ listData });

    $(window).on('load', function() {
      $('.stepsLine__btn-1').click();
    });
  }

  render() {
    return (
      <div className="stepsLine">
        {this.state.listData.map(item => {
          return item;
        })}
        {/* <button className="stepsLine__btn">1</button>
        <div className="stepsLine__line"></div>
        <button className="stepsLine__btn">2</button>
        <div className="stepsLine__line"></div>
        <button className="stepsLine__btn">3</button>
        <div className="stepsLine__line"></div>
        <button className="stepsLine__btn">4</button> */}
      </div>
    );
  }
}
