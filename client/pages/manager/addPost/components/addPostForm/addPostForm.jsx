import * as React from "react";
import "./addPostForm.scss";
import { ImageUpload, TinymceEditor } from "../../../../../components";

export class AddPostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.changeImageFile = this.changeImageFile.bind(this);
        this.handleChangeContent = this.handleChangeContent.bind(this)
    }
    handleChange(e) {
        const { name, value } = e.target;
        console.log("name: ", name)
        console.log("value: ", value)
        this.props.handleChange(name, value);
    }
    changeImageFile(file, fileUrl) {
        this.props.handleChange("thumb", file);
        this.props.handleChange("thumbUrl", fileUrl);
    }
    handleChangeContent(key, value) {

        this.props.handleChange(key, value);
    }
    render() {
        return (
            <div className="new-post-info">
                <div className="new-post-info__title">Thông tin cơ bản</div>
                <hr className="divider" />
                <form className="new-post-info__form">
                    <div className="new-post-info__form__info">
                        <div className="new-post-info__form__info__item new-post-info__form__info__item--double">
                            <div className="new-post-info__title-text">
                                Tiêu đề bài viết <span>* (bắt buộc)</span>
                            </div>
                            <input
                                className="new-post-info__input-box"
                                placeholder="Yoga cộng đồng buổi sáng"
                                type="text"
                                name="title"
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div className="new-post-info__form__info__item">
                            <div className="new-post-info__title-text">
                                Đường dẫn <span>* (bắt buộc)</span>
                            </div>
                            <input
                                className="new-post-info__input-box"
                                placeholder=""
                                type="text"
                                name="slug"
                                onChange={this.handleChange}
                            />
                        </div>



                        <div className="new-post-info__form__info__icon">
                            <i className="fas fa-address-card"></i>
                        </div>
                    </div>
                    <div className="new-post-info__form__info">
                        <div className="new-post-info__form__info__item new-post-info__form__info__item--double">
                            <div className="new-post-info__title-text">
                                Tiêu đề SEO <span>* (bắt buộc)</span>
                            </div>
                            <input
                                className="new-post-info__input-box"
                                placeholder="Yoga cộng đồng buổi sáng"
                                type="text"
                                name="metaTitle"
                                onChange={this.handleChange}
                                required
                            />
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
                            />
                        </div>



                        <div className="new-post-info__form__info__icon">
                            <i className="fas fa-address-card"></i>
                        </div>
                    </div>

                    <div className="new-post-info__form__info new-post-info__form__info--two-columns">
                        <div className="new-post-info__form__info__item">
                            <div className="new-post-info__title-text">
                                Chuyên mục <span>* (bắt buộc)</span>
                            </div>
                            <div className="new-post-info__select-box">
                                <select required className="new-post-info__select-box__select"
                                    onChange={this.handleChange}
                                    name="category"

                                >
                                    <option value="" hidden>
                                        Chọn chuyên mục
                                    </option>
                                    {this.props.categories.map((category, index) => {
                                        return (
                                            <option value={category._id} key={index}>{category.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="new-post-info__form__info__icon">
                            <i className="fas fa-user-alt"></i>
                        </div>
                    </div>

                    <div className="new-post-info__form__info">
                        <div className="new-post-info__title-text">Giới thiệu ngắn</div>
                        <div className="new-post-info__text-area">
                            <textarea
                                rows="10"
                                maxLength="100"
                                placeholder="Lớp học giúp bạn dẻo dai hơn"
                                name="description"
                                onChange={this.handleChange}
                            ></textarea>
                        </div>

                        <div className="new-post-info__form__info__icon">
                            <i className="fas fa-camera-retro"></i>
                        </div>
                    </div>
                    <div className="new-post-info__form__info">
                        <div className="newCourseInfo__title-text">Thêm ảnh đại diện</div>

                        <div className="newCourseInfo__form__info__add-photo">
                            <ImageUpload changeImage={this.changeImageFile}></ImageUpload>
                        </div>

                        <div className="newCourseInfo__form__info__icon">
                            <i className="fas fa-camera-retro"></i>
                        </div>
                    </div>
                    <div className="new-post-info__form__info">
                        <TinymceEditor
                            handleChange={this.handleChangeContent}
                            varName="content"
                        ></TinymceEditor>
                        <div className="new-post-info__form__info__icon">
                            <i className="fas fa-align-justify"></i>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
