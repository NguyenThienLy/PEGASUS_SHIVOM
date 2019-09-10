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
            <i class="fas fa-clipboard-list" />
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
                <th>First Name</th>
                <th>Last Name</th>
                <th>Points</th>
                <th className="table__content__right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-title="#">1</td>
                <td data-title="First Name">Peter</td>
                <td data-title="Last Name">Griffin</td>
                <td data-title="Points">$100</td>
                <td data-title="Actions" className="table__content__right">
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--primary"
                  >
                    <i class="fas fa-info" />
                  </button>
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--success"
                  >
                    <i class="fas fa-pen" />
                  </button>
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--warning"
                  >
                    <i class="fas fa-trash-alt" />
                  </button>
                </td>
              </tr>
              <tr>
                <td data-title="#">2</td>
                <td data-title="First Name">Lois</td>
                <td data-title="Last Name">Griffin</td>
                <td data-title="Points">$150</td>
                <td data-title="Actions" className="table__content__right">
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--primary"
                  >
                    <i class="fas fa-info" />
                  </button>
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--success"
                  >
                    <i class="fas fa-pen" />
                  </button>
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--warning"
                  >
                    <i class="fas fa-trash-alt" />
                  </button>
                </td>
              </tr>
              <tr>
                <td data-title="#">3</td>
                <td data-title="First Name">Joe</td>
                <td data-title="Last Name">Swanson</td>
                <td data-title="Points">$300</td>
                <td data-title="Actions" className="table__content__right">
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--primary"
                  >
                    <i class="fas fa-info" />
                  </button>
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--success"
                  >
                    <i class="fas fa-pen" />
                  </button>
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--warning"
                  >
                    <i class="fas fa-trash-alt" />
                  </button>
                </td>
              </tr>
              <tr>
                <td data-title="#">4</td>
                <td data-title="First Name">Cleveland</td>
                <td data-title="Last Name">Brown</td>
                <td data-title="Points">$250</td>
                <td data-title="Actions" className="table__content__right">
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--primary"
                  >
                    <i class="fas fa-info" />
                  </button>
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--success"
                  >
                    <i class="fas fa-pen" />
                  </button>
                  <button
                    type="button"
                    className="table__content__btn table__content__btn--warning"
                  >
                    <i class="fas fa-trash-alt" />
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
