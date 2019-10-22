import * as React from "react";
import "./columnChart.scss";
import { Bar } from "react-chartjs-2";
import { Loading } from "../../components";

export class ColumnChart extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    displayLegend: true,
    legendPosition: "bottom"
  };

  render() {
    const { columnChartData, isFetching, isEmpty } = this.props;

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
          <div className="columnChart__content__inner">
            {isFetching && <Loading />}
            {isEmpty && !isFetching && "Dữ liệu trống"}
            {!isFetching && !isEmpty && (
              <Bar
                data={columnChartData}
                options={{
                  legend: {
                    display: this.props.displayLegend,
                    position: this.props.legendPosition
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
