import * as React from 'react';
import './calendarChart.scss';
import { Chart } from "react-google-charts";
import { Loading } from '../../components';

export class CalendarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    displayLegend: true,
    legendPosition: 'bottom'
  };

  render() {
    const { calendarChartData, isFetching, isEmpty } = this.props;
    //console.log("calendarChartData", calendarChartData);
    return (
      <div className="calendarChart">
        <div className="calendarChart__title">
          <span>Chuyên cần</span>
        </div>
        <div className="calendarChart__select">
          <div className="calendarChart__select__info">
            <div>Theo dõi chuyên cần theo {calendarChartData.timeType}</div>
          </div>
          {/* <div className="calendarChart__select__date">
            <input type="date" />
            <input type="date" />
          </div>
          <div className="calendarChart__select__full">
            <button className="calendarChart__select__full__btn calendarChart__select__full__btn--primary">
              View full report
            </button>
          </div> */}
        </div>
        <div className="calendarChart__content">
          <div className="calendarChart__content__inner">
            {isFetching && <Loading />}
            {isEmpty && !isFetching && 'Dữ liệu trống'}
            {!isFetching && !isEmpty && (
              <Chart
                data={calendarChartData}
                chartType="Calendar"
                loader={<div>Loading Chart</div>}
                options={{
                  title: 'Red Sox Attendance',
                }}
                rootProps={{ 'data-testid': '2' }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
