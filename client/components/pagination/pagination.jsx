import * as React from 'react';
import './pagination.scss';

export class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { total, limit, currentPage } = this.props;
    return (
      <div className="pagination">
        <ul className="pagination__list">
          <li
            onClick={() => {
              return this.props.changePage(
                currentPage === 1 ? currentPage : currentPage - 1
              );
            }}
          >
            <i class="fas fa-angle-left"></i>
          </li>
          {Array.apply(null, Array(Math.ceil(total / limit))).map(
            (page, index) => {
              return (
                <li
                  className={
                    currentPage === index + 1 ? 'pagination__list__active' : ''
                  }
                  onClick={() => {
                    return this.props.changePage(index + 1);
                  }}
                >
                  {index + 1}
                </li>
              );
            }
          )}
          <li
            onClick={() => {
              return this.props.changePage(currentPage + 1);
            }}
          >
            <i class="fas fa-angle-right"></i>
          </li>
        </ul>
      </div>
    );
  }
}
