import React, { Component } from 'react';
import styles from './PostGroupItem.module.css';
import {connect} from 'react-redux';



class PostGroupItem extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            image: ''
        })
    }
    componentDidMount() {

        let setImage = this.props.auth.user.displayPicture ? this.props.auth.user.displayPicture : '';
        this.setState({
            image: setImage
        })
    }
    render() {
        const {user} = this.props.auth;
        let setInformation;
        if(this.state.image) {
            setInformation = (<div style={{textAlign:"center",marginTop:"10px"}}>
            <img src={this.state.image} alt="" height="auto" width="150px" className=" d-block m-auto"/>
            <p className={`${styles.userName}`}>{user.name}</p>

            </div>)
        }
        return (
            <div className={`${styles.groupContainer}`}>

                {setInformation}
                <hr></hr>
                <p className={ `pl-3`}>My Groups</p>
                <div className={styles.myGroups}>
                    In Progress...
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PostGroupItem);
