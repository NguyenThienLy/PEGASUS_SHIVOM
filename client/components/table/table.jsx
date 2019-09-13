import * as React from "react";
import "./table.scss";

export class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { table } = this.props;
    return (
      <div className="table">
        <div className="table__title">
          <div className="table__title__icon">
            <i className="fas fa-clipboard-list" />
          </div>
          <div className="table__title__content">Simple Table</div>
        </div>
        <div className="table__content">
          <table>
            <colgroup>
              <col className="table__content__firstCol" />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>#</th>
                <th>Ảnh đại diện</th>
                <th>Tên học viên</th>
                <th>Điểm số</th>
                <th>Nội dung phản hồi</th>
                <th className="table__content__right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-title="#">1</td>
                <td data-title="Ảnh đại diện">Peter</td>
                <td data-title="Tên học viên">Griffin</td>
                <td data-title="Points">$100</td>
                <td data-title="Actions" className="table__content__right">
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--primary"
                  >
                    <i className="fas fa-info" />
                  </button>
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--success"
                  >
                    <i className="fas fa-pen" />
                  </button>
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--warning"
                  >
                    <i className="fas fa-trash-alt" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
