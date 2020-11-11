import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getCurrentUser} from '../../actions/authActions';
import {changeNotification} from '../../actions/notificationActions';
import NotificationItem from './notification-item/NotificationItem';

class NotificationsComponent extends Component {

    componentDidMount() {
        this.props.changeNotification();
    }


    render() {
        const {notifications} = this.props.auth.user; 
        let showNotifications;
        console.log(notifications);
        if(notifications){
        showNotifications = notifications.map(notification=> <NotificationItem notification={notification} />);
        }
        return (
            <div>
                {showNotifications}
            </div>
        )
    }
}
const mapStateToProps =(state)=> ({
    auth: state.auth
})

export default connect(mapStateToProps,{getCurrentUser,changeNotification})(NotificationsComponent);
