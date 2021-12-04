import Axios from "axios";
import React, { Component } from "react";
import axios from "axios";
import styles from "./notificationItem.module.css";
import { Link } from "react-router-dom";
import { changeNotificationToRead } from "../../../actions/notificationActions";
import store from "../../../store";

class NotificationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPicture: null,
    };
  }

  componentDidMount() {
    axios
      .get(`/api/users/displayPicture/${this.props.notification.senderId}`)
      .then((res) => {
        this.setState({
          displayPicture: res.data.displayPicture,
        });
      })
      .catch((err) => console.log("Error occurred getting profile picture"));
  }

  changeNotificationRead = () => {
    store.dispatch(changeNotificationToRead(this.props.notification._id));
  };
  render() {
    const curDate = new Date();
    const date = new Date(this.props.notification.date);
    let time = Math.floor((curDate.getTime() - date.getTime()) / 60000);

    if (time <= 0) {
      time = "Just Now";
    } else if (time > 60) {
      time = Math.floor(time / 60);
      if (time > 24) {
        time = Math.floor(time / 24) + "d";
      } else {
        time = time + "h";
      }
    } else {
      time = time + "m";
    }

    return (
      <div
        className={
          this.props.notification.read
            ? `${styles.checked} ${styles.notificationItem}`
            : `${styles.unchecked} ${styles.notificationItem}`
        }
      >
        <Link
          to={`/post/${this.props.notification.postId}`}
          onClick={this.changeNotificationRead}
          className={styles.singleNotification}
        >
          <img
            src={this.state.displayPicture}
            height="50px"
            width="auto"
            className={styles.notificationImage}
          />
          <p className={styles.notificationText}>
            {this.props.notification.text}
            <span
              className={styles.notificationTime}
              style={{ float: "right" }}
            >
              {time}
            </span>
          </p>
        </Link>
      </div>
    );
  }
}

export default NotificationItem;
