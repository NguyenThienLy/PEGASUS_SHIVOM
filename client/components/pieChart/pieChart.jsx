import * as React from 'react';
import './pieChart.scss';
import { Pie } from 'react-chartjs-2';
import { Loading } from '../../components';

export class PieChart extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    displayLegend: true,
    legendPosition: 'bottom'
  };

  render() {
    const { pieChartData, isFetching, isEmpty } = this.props;

    return (
      <div className="pieChart">
        <div className="pieChart__title">
          <span>Tỉ lệ chuyên cần</span>
        </div>
        <div className="pieChart__content">
          <div className="pieChart__content__inner">
            {isFetching && <Loading />}
            {isEmpty && !isFetching && 'Dữ liệu trống'}
            {!isFetching && !isEmpty && (
              <Pie
                data={pieChartData}
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
        <div className="pieChart__select">
          <div className="pieChart__select__info">
            <div>Thống kê tỉ lệ chuyên cần trong {pieChartData.timeType}</div>
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
