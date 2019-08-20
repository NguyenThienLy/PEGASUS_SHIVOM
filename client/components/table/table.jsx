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
            <tr>
              <th className="table__content__center">#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Points</th>
              <th className="table__content__right">Actions</th>
            </tr>
            <tr>
              <td className="table__content__center">1</td>
              <td>Peter</td>
              <td>Griffin</td>
              <td>$100</td>
              <td className="table__content__right">
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
              <td className="table__content__center">2</td>
              <td>Lois</td>
              <td>Griffin</td>
              <td>$150</td>
              <td className="table__content__right">
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
              <td className="table__content__center">3</td>
              <td>Joe</td>
              <td>Swanson</td>
              <td>$300</td>
              <td className="table__content__right">
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
              <td className="table__content__center">4</td>
              <td>Cleveland</td>
              <td>Brown</td>
              <td>$250</td>
              <td className="table__content__right">
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
          </table>
        </div>
      </div>
    );
  }
}
