import * as React from "react";
import "./customSelect.scss";

export class CustomSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { customSelect } = this.props;
    return (
      <div className="customSelect animated fadeIn">
        <label>
          <input type="checkbox" name="placeholder" />
          <i className="customSelect__toggle customSelect__icon-plus fas fa-caret-down"></i>
          <i className="customSelect__toggle customSelect__icon-minus fas fa-caret-up"></i>
          <span className="customSelect__placeholder">
            {customSelect.placeholder}
          </span>
          {customSelect.options.map(option => {
            return (
              <label className="customSelect__option">
                <input type="radio" name="option" />
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
