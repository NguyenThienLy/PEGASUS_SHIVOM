import * as React from "react";
import "./imageShow.scss";

export class ImageShow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="image-show">
        {this.props.items.map((item, index) => {
          return (<div className={`image-show__img${index} image-show__item`}>
            <img
              src={item.image}
              alt={item.name}
            />
          </div>)
        })}

        {/* <div className="image-show__img2 image-show__item">
          <img
            src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-gallery-img-3a.jpg"
            alt=""
          />
        </div>
        <div className="image-show__img3 image-show__item">
          <img
            src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-gallery-img-4a.jpg"
            alt=""
          />
        </div>

        <div className="image-show__img4 image-show__item">
          <img
            src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-gallery-img-2a-480x960.jpg"
            alt=""
          />
        </div>
        <div className="image-show__img5 image-show__item">
          <img
            src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-gallery-img-5a.jpg"
            alt=""
          />
        </div>
        <div className="image-show__img6 image-show__item">
          <img
            src="https://dalia.elated-themes.com/wp-content/uploads/2018/06/fitness-gallery-img-6a.jpg"
            alt=""
          />
        </div> */}
      </div>
    );
  }
}
