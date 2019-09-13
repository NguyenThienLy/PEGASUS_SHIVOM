import * as React from "react";
import "./profileAdmin.scss";

export class ProfileAdmin extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { profileAdmin } = this.props;

    return (
      <div className="profileAdmin">
        <div className="profileAdmin__overlay">
          <div className="profileAdmin__blank" />

          <div className="profileAdmin__image">
            <img src={profileAdmin.image} alt="" />
          </div>

          <div className="profileAdmin__info">
            <div className="profileAdmin__info__name">{profileAdmin.name}</div>
            <div className="profileAdmin__info__email">
              {profileAdmin.email}
            </div>
          </div>

          <div className="profileAdmin__line" />

          <div className="profileAdmin__more">
            <div className="profileAdmin__more__column">
              <div className="profileAdmin__more__column__holder">
                <div className="profileAdmin__more__column__holder__title">
                  Age
                </div>
                <div className="profileAdmin__more__column__holder__content">
                  {profileAdmin.age}
                </div>
              </div>
              <div className="profileAdmin__more__column__holder">
                <div className="profileAdmin__more__column__holder__title">
                  Phone
                </div>
                <div className="profileAdmin__more__column__holder__content">
                  {profileAdmin.phone}
                </div>
              </div>
            </div>
            <div className="profileAdmin__more__column">
              <div className="profileAdmin__more__column__holder">
                <div className="profileAdmin__more__column__holder__title">
                  Location
                </div>
                <div className="profileAdmin__more__column__holder__content">
                  {profileAdmin.location}
                </div>
              </div>
            </div>
          </div>

          <div className="profileAdmin__line" />

          <div className="profileAdmin__links">
            <a href={profileAdmin.facebook}>
              <i className="fab fa-facebook-f" />
            </a>
            <a href={profileAdmin.twitter}>
              <i className="fab fa-twitter" />
            </a>
            <a href={profileAdmin.instagram}>
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
