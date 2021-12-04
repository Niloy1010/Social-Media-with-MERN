import React, { Component } from "react";
import styles from "./PostGroupItem.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class PostGroupItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "",
    };
  }
  componentDidMount() {
    let setImage = this.props.auth.user.displayPicture;
    this.setState({
      image: setImage,
    });
  }
  render() {
    const { user } = this.props.auth;
    let setInformation;
    if (this.state.image) {
      setInformation = (
        <div style={{ textAlign: "center" }}>
          <img
            src={this.state.image}
            alt=""
            height="100%"
            width="100%"
            objectfit="cover"
          />
          <p className={`${styles.userName} mt-2`}>{user.name}</p>
        </div>
      );
    }
    return (
      <div className={`${styles.groupContainer}`}>
        {setInformation}
        <hr></hr>
        <h5 style={{ textAlign: "center" }}>Find Other People</h5>
        <div style={{ textAlign: "center", margin: "10px" }}>
          <Link to="/profiles">
            <button
              className={`${styles.myBtn} btn  `}
              onClick={this.changeToText}
            >
              Profiles
            </button>
          </Link>
        </div>
        {/* <div className={styles.myGroups}>Coming Soon...</div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostGroupItem);
