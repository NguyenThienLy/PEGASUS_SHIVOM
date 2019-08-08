import * as React from 'react'
import './contactUs.scss'

export class ContactUs extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        return(
            <div className="contact-us">
                <form className="contact-us__form">
                    <input 
                        type="text"
                        placeholder="Họ và tên" 
                        className="contact-us__form__input"
                        />
                    <input 
                        type="text"
                        placeholder="Địa chỉ" 
                        className="contact-us__form__input"
                        />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        className="contact-us__form__input"
                    />
                    <input 
                        type="text" 
                        placeholder="Số điện thoại" 
                        className="contact-us__form__input"
                    />
                    <div className="contact-us__form__select-box">
                        <select required className="contact-us__form__select-box__select">
                            <option value="" hidden>Chọn khoá học</option>
                            <option value="1">Option 1</option>
                            <option value="2">Option 2</option>
                            <option value="3">Option 3</option>
                            
                        </select>
                    </div>
                    <button 
                        type="button" 
                        className="contact-us__form__btn contact-us__form__btn--primary">
                            gửi
                    </button>
                </form>
                
                <div className="contact-us__sub-info">
                    <div className="contact-us__sub-info__brand">shivom hiep hoa</div>
                    <div className="contact-us__sub-info__title">liên hệ với chúng tôi</div>
                    <div className="contact-us__sub-info__content">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, ut fugiat eius possimus error unde laboriosam illum asperiores. Libero dolor neque vero sapiente sint omnis enim, possimus assumenda illo harum.
                    </div>
                    <div className="contact-us__sub-info__contact-info">
                        <div className="contact-us__sub-info__contact-info__item">
                            <i className="far fa-envelope icon"></i>
                            <a href="mailto:minhle140198@gmail.com">minhle140198@gmail.com</a>
                        </div>
                        <div className="contact-us__sub-info__contact-info__item">
                            <i className="fas fa-headset icon"></i>
                            <a href="#">0934952396</a>
                        </div>
                        <div className="contact-us__sub-info__contact-info__item">
                            <i className="fas fa-map-marker-alt icon"></i>
                            <a>145/51/41 Le Duc Tho Phuong 17 Go Vap</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactUs