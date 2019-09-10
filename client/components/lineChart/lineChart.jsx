import * as React from "react";
import "./lineChart.scss";

export class LineChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="lineChart">
        <div className="lineChart__title">
          <span>users overview</span>
        </div>
        <div className="lineChart__select">
          <div className="lineChart__select__info">
            <div>chart's info</div>
          </div>
          {/* <div className="lineChart__select__date">
            <input type="date" />
            <input type="date" />
          </div>
          <div className="lineChart__select__full">
            <button className="lineChart__select__full__btn lineChart__select__full__btn--primary">
              View full report
            </button>
          </div> */}
        </div>
        <div className="lineChart__content">
          <div className="lineChart__content__inner">Line Chart</div>
        </div>
      </div>
    );
  }
}
