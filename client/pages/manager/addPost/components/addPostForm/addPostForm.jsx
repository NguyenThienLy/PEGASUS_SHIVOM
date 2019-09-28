import * as React from "react";
import "./addPostForm.scss";
import { ImageUpload, TinymceEditor } from "../../../../../components";

export class AddPostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: {
          value: "",
          isValid: false,
          errorMessage: ""
        },
        slug: {
          value: "",
          isValid: false,
          errorMessage: ""
        },
        description: {
          value: "",
          isValid: false,
          errorMessage: ""
        },
        metaTitle: {
          value: "",
          isValid: false,
          errorMessage: ""
        },
        metaDescription: {
          value: "",
          isValid: false,
          errorMessage: ""
        },
        category: {
          value: "",
          isValid: false,
          errorMessage: ""
        }
      },
      image: {
        isValid: false
      },
      content: {
        isValid: false
      },
      validate: {
        rules: {
          title: {
            required: true
          },
          slug: {
            required: true
          },
          description: {
            required: true
          },
          metaTitle: {
            required: true
          },
          metaDescription: {
            required: true
          },
          category: {
            required: true
          }
        },
        messages: {
          title: {
            required: "Bắt buộc nhập tiêu đề bài viết"
          },
          slug: {
            required: "Bắt buộc nhập đường dẫn"
          },
          description: {
            required: "Bắt buộc nhập giới thiệu ngắn"
          },
          metaTitle: {
            required: "Bắt buộc nhập tiêu đề SEO"
          },
          metaDescription: {
            required: "Bắt buộc nhập mô tả SEO"
          },
          category: {
            required: "Bắt buộc chọn chuyên mục"
          }
        }
      }
    };
    this.checkFormValidation = this.checkFormValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeImageFile = this.changeImageFile.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
    this.handleIsValidContent = this.handleIsValidContent.bind(this);
  }
  checkFormValidation() {
    for (const key in this.state.form) {
      if (!this.state.form[key].isValid) {
        return false;
      }
    }

    if (!this.state.image.isValid || !this.state.content.isValid) {
      return false;
    }

    return true;
  }
  changeImageFile(file, fileUrl) {
    this.props.handleChange("thumb", file);
    this.props.handleChange("thumbUrl", fileUrl);
    this.setState({
      image: _.merge(this.state.image, {
        isValid: true
      })
    });
    this.props.handleIsValid(this.props.pageNumber, this.checkFormValidation());
  }
  handleChange(event) {
    let { name, value } = event.target;
    value = value.trim();

    this.handleInputValidation(name, value);
    this.props.handleChange(name, value);
    this.props.handleIsValid(this.props.pageNumber, this.checkFormValidation());
  }
  handleChangeContent(name, value) {
    this.props.handleChange(name, value);
    this.props.handleIsValid(this.props.pageNumber, this.checkFormValidation());
  }
  handleIsValidContent(pageNumber, isValid) {
    this.setState({
      content: _.merge(this.state.content, {
        isValid: isValid
      })
    });
  }
  handleInputValidation = (name, value) => {
    _.forEach(this.state.validate.rules, (rule, key) => {
      if (name === key) {
        if (rule.required && value.length === 0) {
          this.setState({
            form: _.merge(this.state.form, {
              [key]: {
                value: value,
                isValid: false,
                errorMessage: this.state.validate.messages[key].required
              }
            })
          });
        } else {
          this.setState({
            form: _.merge(this.state.form, {
              [key]: {
                value: value,
                isValid: true,
                errorMessage: ""
              }
            })
          });
        }
        return;
      }
    });
  };

  render() {
    return (
      <div className="new-post-info">
        <div className="new-post-info__title">Thông tin cơ bản</div>
        <hr className="divider" />
        <form className="new-post-info__form">
          <div className="new-post-info__form__info">
            <div className="new-post-info__form__info__item">
              <div className="new-post-info__title-text">
                Tiêu đề bài viết <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-post-info__input-box"
                placeholder="yoga giúp cải thiện sức khỏe như thế nào"
                type="text"
                name="title"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="new-post-info__form__info__item__error-message">
                {this.state.form.title.errorMessage}
              </small>
            </div>

            <div className="new-post-info__form__info__item">
              <div className="new-post-info__title-text">
                Đường dẫn <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-post-info__input-box"
                placeholder="yoga-cai-thien-suc-khoe"
                type="text"
                name="slug"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="new-post-info__form__info__item__error-message">
                {this.state.form.slug.errorMessage}
              </small>
            </div>

            <div className="new-post-info__form__info__item">
              <div className="new-post-info__title-text">
                Giới thiệu ngắn <span>* (bắt buộc)</span>
              </div>
              <div className="new-post-info__text-area">
                <textarea
                  rows="6"
                  maxLength="100"
                  placeholder="Yoga giúp bạn dẻo dai hơn"
                  name="description"
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                ></textarea>
                <small className="new-post-info__form__info__item__error-message">
                  {this.state.form.description.errorMessage}
                </small>
              </div>
            </div>

            <div className="new-post-info__form__info__icon">
              <i className="fas fa-address-card"></i>
            </div>
          </div>

          <div className="new-post-info__form__info">
            <div className="new-post-info__form__info__item">
              <div className="new-post-info__title-text">
                Tiêu đề SEO <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-post-info__input-box"
                placeholder=""
                type="text"
                name="metaTitle"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="new-post-info__form__info__item__error-message">
                {this.state.form.metaTitle.errorMessage}
              </small>
            </div>

            <div className="new-post-info__form__info__item">
              <div className="new-post-info__title-text">
                Mô tả SEO <span>* (bắt buộc)</span>
              </div>
              <input
                className="new-post-info__input-box"
                placeholder=""
                type="text"
                name="metaDescription"
                onChange={this.handleChange}
                onBlur={this.handleChange}
              />
              <small className="new-post-info__form__info__item__error-message">
                {this.state.form.metaDescription.errorMessage}
              </small>
            </div>

            <div className="new-post-info__form__info__icon">
              <i className="fas fa-address-card"></i>
            </div>
          </div>

          <div className="new-post-info__form__info">
            <div className="new-post-info__form__info__item">
              <div className="new-post-info__title-text">
                Chuyên mục <span>* (bắt buộc)</span>
              </div>
              <div className="new-post-info__select-box">
                <select
                  className="new-post-info__select-box__select"
                  onChange={this.handleChange}
                  onBlur={this.handleChange}
                  name="category"
                >
                  <option value="" hidden>
                    Chọn chuyên mục
                  </option>
                  {this.props.categories.map((category, index) => {
                    return (
                      <option value={category._id} key={index}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <small className="new-post-info__form__info__item__error-message">
                {this.state.form.category.errorMessage}
              </small>
            </div>

            <div className="new-post-info__form__info__icon">
              <i className="fas fa-user-alt"></i>
            </div>
          </div>

          <div className="new-post-info__form__info">
            <div className="new-post-info__title-text">
              Thêm ảnh đại diện <span>* (bắt buộc)</span>
            </div>

            <div className="new-post-info__form__info__add-photo">
              <ImageUpload changeImage={this.changeImageFile}></ImageUpload>
            </div>

            <div className="new-post-info__form__info__icon">
              <i className="fas fa-camera-retro"></i>
            </div>
          </div>
        </form>

        <TinymceEditor
          handleChange={this.handleChangeContent}
          handleIsValid={this.handleIsValidContent}
          varName="content"
          pageNumber={this.props.pageNumber}
        ></TinymceEditor>
      </div>
    );
  }
}
