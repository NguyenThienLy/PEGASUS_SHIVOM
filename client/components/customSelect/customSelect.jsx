import * as React from 'react';
import * as moment from 'moment';

import './customSelect.scss';

export class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(index) {
    if (this.props.fetchDataFollowYear) {
      this.props.fetchDataFollowYear(
        moment()
          .year(this.props.customSelect.options[index])
          .startOf('year')
          .format('YYYY-MM-DDTHH:mm:ss'),
        moment()
          .year(this.props.customSelect.options[index])
          .endOf('year')
          .format('YYYY-MM-DDTHH:mm:ss')
      );
    }

    if (this.props.filterByPoints) {
      this.props.filterByPoints(this.props.customSelect.values[index]);
    }
    if (this.props.filterByStatus) {
      this.props.filterByStatus(this.props.customSelect.values[index]);
    }
  }

  render() {
    const { customSelect } = this.props;
    return (
      <div className="customSelect">
        <label>
          <input type="checkbox" name="placeholder" />
          <i className="customSelect__toggle customSelect__icon-plus fas fa-caret-down"></i>
          <i className="customSelect__toggle customSelect__icon-minus fas fa-caret-up"></i>
          <span className="customSelect__placeholder">
            {customSelect.placeholder}
          </span>
          {customSelect.options.map((option, index) => {
            return (
              <label className="customSelect__option" key={index}>
                <input
                  type="radio"
                  name="option"
                  onClick={() => {
                    this.onChange(index);
                  }}
                />
                <span className="customSelect__option__title animated fadeIn">
                  {option}
                </span>
              </label>
            );
          })}
        </label>
      </div>
    );
  }
}
