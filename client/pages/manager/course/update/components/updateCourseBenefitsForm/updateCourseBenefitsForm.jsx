import * as React from "react";
import "./updateCourseBenefitsForm.scss";

export class UpdateCourseBenefitsForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }
  submit(e) {
    e.preventDefault();
    const body = {
      name: this.refs.name.value
    };
    $(".update-course-benefits__form__input").val("");
    this.props.handleAddBenefits(body);
  }
  render() {
    return (
      <React.Fragment>
        <form className="update-course-benefits__form" onSubmit={this.submit}>
          <div className="update-course-benefits__form__title">thêm lợi ích</div>
          <input
            type="text"
            placeholder="Tên lợi ích"
            className="update-course-benefits__form__input"
            ref="name"
          />
          <button
            type="submit"
            className="update-course-benefits__form__btn update-course-benefits__form__btn--primary"
          >
            thêm
          </button>
        </form>
      </React.Fragment>
    );
  }
}
