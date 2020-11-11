import React,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup';
import {addPost, addImagePost} from '../../../actions/postActions';
import styles from './postForm.module.css';
import isEmpty from '../../../validation/is-empty';
class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            errors: {},
            postOption: "text",
            image_file :  null
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

    imageSubmit = (e)=> {
        e.preventDefault();
        const {user} = this.props.auth;
        let formData = new FormData();
        formData.append("text", this.state.text);
        formData.append("file", this.state.image_file);
        
        this.props.addImagePost(formData);
         console.log(this.state.text);
         console.log(this.state.image_file);
        if(!isEmpty(this.state.text) && !isEmpty(this.state.image_file.name)) {
           
            this.setState({
                text: '',
                image_file: null,
                postOption: "text",
            })
        }
       
    }

    changeToText = ()=>{
        this.setState({
            postOption : "text"
        })
    }
    changeToImage = ()=> {
        this.setState({
            postOption: "image"
        })
    }

    handleImagePreview = (e) => {
        let image_as_files = e.target.files[0];

        this.setState({
            image_file: image_as_files,
        })
    }
    render(){
        const {errors} = this.state;
        const postText = (
                <form onSubmit={this.onSubmit} >
                    <div className="form-group">
                        <TextAreaFieldGroup
                        placeholder="Share your thoughts..."
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        error={errors.text}
                        />
                    </div>
                    <button type="submit" className="btn btn-dark" style={{float:"right"}}>Post</button>
                </form>);
        const postImage = (

                <form onSubmit={this.imageSubmit} method="POST" encType="multipart/form-data" >
        <div className="custom-file mb-3">
        <div className="form-group">
                        <TextAreaFieldGroup
                        placeholder="Add a caption..."
                        name="text"
                        value={this.state.text}
                        onChange={this.onChange}
                        error={errors.text}
                        />
                    </div>
            <label htmlFor="file"></label>
            <input
             type="file"
              name="file"
               id="file"
               onChange={this.handleImagePreview}
               />
               <button type="submit" className="btn btn-dark" style={{float:"right"}}>Post</button>
        </div>
    </form>
            );
        return (
            <div>
                <div className="post-form mb-3">
        <div className="card card-info">
            <div className={`${styles.formHead} card-header  text-white`}>
                Say Something...
            </div>
            <div className={styles.buttonHandler} >

            <button className={`${styles.myBtn} btn btn-primary} `} onClick={this.changeToText}>Post</button>
            <button className={`${styles.myBtn} btn btn-primary} `} onClick={this.changeToImage}>Upload Image</button>
            </div>
            <div className="card-body" >
                
            {this.state.postOption === "text" ? postText : postImage}
            
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

export default connect(mapStateToProps,{addPost, addImagePost})(PostForm);
