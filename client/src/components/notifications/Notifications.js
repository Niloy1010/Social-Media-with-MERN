import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../../actions/authActions";
import { changeNotification } from "../../actions/notificationActions";
import NotificationItem from "./notification-item/NotificationItem";
import styles from "./notifications.module.css";

class NotificationsComponent extends Component {
  componentDidMount() {
    this.props.changeNotification();
  }

  render() {
    const { notifications } = this.props.auth.user;

    const curDate = new Date();

    const recentNotifications = notifications?.filter((notification) => {
      let date = new Date(notification.date);
      let measureNotificationRecent =
        (curDate.getTime() - date.getTime()) / 60000 / 60 / 24;
      return measureNotificationRecent < 1;
    });
    const olderNotifications = notifications?.filter((notification) => {
      let date = new Date(notification.date);
      let measureNotificationRecent =
        (curDate.getTime() - date.getTime()) / 60000 / 60 / 24;
      return measureNotificationRecent >= 1;
    });

    let showNotifications;
    if (notifications) {
      showNotifications = notifications.map((notification) => (
        <NotificationItem key={notification._id} notification={notification} />
      ));
    }

    let showRecentNotifications;
    let showOlderNotifications;
    if (notifications) {
      showRecentNotifications = recentNotifications
        .reverse()
        .map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
          />
        ));
    }
    if (notifications) {
      showOlderNotifications = olderNotifications
        .reverse()
        .map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
          />
        ));
    }
    let showRecentNotificationsDiv = showRecentNotifications ? (
      <div className={styles.recentNotificationsContainer}>
        <p className={styles.type}>Recent</p>
        {showRecentNotifications}
      </div>
    ) : null;
    let showOlderNotificationsDiv = showOlderNotifications ? (
      <div className={styles.olderNotificationsContainer}>
        <p className={styles.type}>Older</p>
        {showOlderNotifications}
      </div>
    ) : null;
    return (
      <div>
        {showRecentNotificationsDiv}
        {showOlderNotificationsDiv}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentUser, changeNotification })(
  NotificationsComponent
);
