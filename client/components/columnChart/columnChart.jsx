import * as React from "react";
import "./columnChart.scss";
import { Bar } from "react-chartjs-2";

export class ColumnChart extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    location: "City"
  };

  render() {
    const { dataColumnChart } = this.props;

    return (
      <div className="columnChart">
        <div className="columnChart__title">
          <span>Thống kê sĩ số</span>
        </div>
        <div className="columnChart__select">
          <div className="columnChart__select__info">
            <div>Thống kê sĩ số học sinh theo từng tháng trong năm</div>
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
        <div className="columnChart__content">
          <Bar
            data={dataColumnChart}
            options={{
              title: {
                display: this.props.displayTitle,
                text: "Largest Cities In " + this.props.location,
                fontSize: 25
              },
              legend: {
                display: this.props.displayLegend,
                position: this.props.legendPosition
              }
            }}
          />
        </div>
      </div>
    );
  }
}
