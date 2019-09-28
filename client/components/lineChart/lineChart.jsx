import * as React from "react";
import "./lineChart.scss";
import { Line } from "react-chartjs-2";
import { Loading } from "../../components";

export class LineChart extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    displayLegend: true,
    legendPosition: "bottom"
  };

  render() {
    const { lineChartData, isFetching, isEmpty } = this.props;
    //console.log("lineChartData", lineChartData);
    return (
      <div className="lineChart">
        <div className="lineChart__title">
          <span>Chuyên cần</span>
        </div>
        <div className="lineChart__select">
          <div className="lineChart__select__info">
            <div>Theo dõi chuyên cần theo tuần trong năm</div>
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
          <div className="lineChart__content__inner">
            {isFetching && isEmpty && <Loading />}
            {isEmpty && !isFetching && "Dữ liệu trống"}
            {!isFetching && !isEmpty && (
              <Line
                data={lineChartData}
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
