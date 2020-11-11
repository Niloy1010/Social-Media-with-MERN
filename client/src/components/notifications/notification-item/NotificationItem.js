import Axios from 'axios';
import React, { Component } from 'react'
import axios from 'axios';
import styles from './notificationItem.module.css';
import {Link} from 'react-router-dom';
import {changeNotificationToRead} from '../../../actions/notificationActions';
import store from '../../../store';

class NotificationItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayPicture: null
        }
    }

    componentDidMount() {
        axios.get(`/api/users/displayPicture/${this.props.notification.senderId}`)
        .then (res=> {
            this.setState({
                displayPicture: res.data.displayPicture
            })
        })
        .catch(err=> console.log("Error occurred getting profile picture"));
    }

    changeNotificationRead = () => {
        store.dispatch(changeNotificationToRead(this.props.notification._id));

    }
    render() {
        
        return (
            <div className={ (this.props.notification.read ? `${styles.checked} notificationItemcss` : `${styles.unchecked} notificationItemcss`)}>
            <Link to={`/post/${this.props.notification.postId}`} onClick={this.changeNotificationRead} >
                <img src={this.state.displayPicture}  height="50px" width="50px" />
                <h1>{this.props.notification.text}</h1>
            </Link>
            </div>
        )
    }
}

export default NotificationItem;
