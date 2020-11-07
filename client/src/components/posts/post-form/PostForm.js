import React,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import {addPost} from '../../../actions/postActions';
import styles from './postForm.module.css';

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {}
        }
    }
    static getDerivedStateFromProps(nextProps,prevState) {
        if(nextProps.errors) {
            return {
                ...prevState,
                errors: nextProps.errors
            }
        }
    }

    onChange = (e)=> {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();

        const {user} = this.props.auth;

        const newPost = {
            text : this.state.text,
            name: user.name,
            displayPicture: user.displayPicture
        }
        this.props.addPost(newPost);
        this.setState({
            text: ''
        })
    }

    render(){
        const {errors} = this.state;
        return (
            <div>
                <div className="post-form mb-3">
                    <div className="card card-info">
                        <div className={`${styles.formHead} card-header  text-white`}>
                            Say Something...
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextAreaFieldGroup
                                    placeholder="Create a post"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps,{addPost})(PostForm);
