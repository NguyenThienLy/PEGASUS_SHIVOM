import * as React from 'react'
import './trainerInfo.scss'

export class TrainerInfo extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="class-trainer">
                <div className="class-trainer__img">
                    <img src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/makeup-image-gallery-2.jpg"
                    alt="class trainer avatar"
                    ></img>
                </div>
                <div className="class-trainer__info">
                    <div className="class-trainer__info__name">
                        Ngọc Hạnh
                    </div>
                    <div className="class-trainer__info__description">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sapiente magnam possimus libero deserunt.
                    </div>                
                    <div className="class-trainer__info__detail">
                        <ul className="list-items">
                            <li className="list-items__item">
                                <div className="list-items__item__name">Tuổi</div>
                                <div className="list-items__item__content">36</div>
                            </li>
                            <li className="list-items__item">
                                <div className="list-items__item__name">Cân nặng</div>
                                <div className="list-items__item__content">70 kg</div>
                            </li>
                            <li className="list-items__item">
                                <div className="list-items__item__name">Chiều cao</div>
                                <div className="list-items__item__content">1m60</div>
                            </li>
                            <li className="list-items__item">
                                <div className="list-items__item__name">Chức vụ</div>
                                <div className="list-items__item__content"> Giáo viên</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}