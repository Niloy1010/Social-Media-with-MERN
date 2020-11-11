import React,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../../../common/TextAreaFieldGroup';
import {addComment} from '../../../../actions/postActions';

class CommentForm extends Component {

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
        const {postId} = this.props;

        const newComment = {
            text : this.state.text,
            name: user.name,
            displayPicture: user.displayPicture
        }
        this.props.addComment(postId, newComment);
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
                        <div className="card-header bg-info text-white">
                            Add a comment...
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextAreaFieldGroup
                                    placeholder="Reply"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    error={errors.text}
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark" style={{float: "right"}}>Comment</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps,{addComment})(CommentForm);
