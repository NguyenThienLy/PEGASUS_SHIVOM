import * as React from "react";
import "./addCourseBenefitsForm.scss";

export class AddCourseBenefitsForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    const body = {
      name: this.refs.name.value
    };
    $(".add-course-benefits__form__input").val("");
    this.props.handleAddBenefits(body);
  }
  render() {
    return (
      <React.Fragment>
        <form className="add-course-benefits__form" onSubmit={this.submit}>
          <div className="add-course-benefits__form__title">thêm lợi ích</div>
          <input
            type="text"
            placeholder="Tên lợi ích"
            className="add-course-benefits__form__input"
            ref="name"
          />
          <button
            type="submit"
            className="add-course-benefits__form__btn add-course-benefits__form__btn--primary"
          >
            thêm
          </button>
        </form>
      </React.Fragment>
    );
  }
}
