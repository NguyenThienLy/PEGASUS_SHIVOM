import * as React from "react";
import "./pieChart.scss";

export class PieChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="pieChart">
        <div className="pieChart__title">
          <span>users by device</span>
        </div>
        <div className="pieChart__content">
          <div className="pieChart__content__inner">Pie Chart</div>
        </div>
        <div className="pieChart__select">
          <div className="pieChart__select__info">
            <div>chart's info</div>
          </div>
          {/* <div className="pieChart__select__date">
            <input type="date" />
          </div>
          <div className="pieChart__select__full">
            <button className="pieChart__select__full__btn pieChart__select__full__btn--primary">
              View full report
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
