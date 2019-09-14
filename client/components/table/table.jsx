import * as React from "react";
import "./table.scss";

export class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tableContents, staticContent } = this.props;
    //console.log("tableContents", tableContents);

    return (
      <div className="table">
        <div className="table__title">
          <div className="table__title__icon">
            <i class="fas fa-clipboard-list" />
          </div>
          <div className="table__title__content">{staticContent.nameTable}</div>
        </div>
        <div className="table__content">
          <table>
            <colgroup>
              <col className="table__content__firstCol" />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>#</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Sdt</th>
                <th>Sn học</th>
                <th>Sn đã học</th>
                <th>Sn vắng</th>
                <th>Được vắng</th>
                <th className="table__content__right">Tác vụ</th>
              </tr>
            </thead>
            <tbody>
              {tableContents &&
                tableContents.map((tableContent, index) => {
                  return (
                    <tr key={index}>
                      <td data-title="#">{index + 1}</td>
                      <td data-title="Ảnh đại diện">
                        <img
                          style={{ width: "3em", height: "3em" }}
                          src={tableContent.students_docs[0].avatar}
                        ></img>
                      </td>
                      <td data-title="Tên học viên">
                        {tableContent.students_docs[0].firstName}
                        {tableContent.students_docs[0].lastName}
                      </td>
                      <td data-title="Sdt">
                        {tableContent.students_docs[0].phone}
                      </td>
                      <td data-title="Sn học">
                        {tableContent.coursesStudents_docs[0].totalLesson}
                      </td>
                      <td data-title="Sn đã học">
                        {tableContent.coursesStudents_docs[0].totalLessonUsed}
                      </td>
                      <td data-title="Sn vắng">
                        {tableContent.coursesStudents_docs[0].totalAbsent}
                      </td>
                      <td data-title="Được vắng">
                        {
                          tableContent.coursesStudents_docs[0]
                            .totalAbsentPermitted
                        }
                      </td>
                      <td data-title="Tác vụ" className="table__content__right">
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
                        {/* <button
                          type="button"
                          className="table__content__btn table__content__btn--warning"
                        >
                          <i class="fas fa-trash-alt" />
                        </button> */}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
