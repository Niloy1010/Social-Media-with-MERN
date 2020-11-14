import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import TextFieldInput from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import {createProfile} from '../../actions/profileActions';
import {withRouter} from 'react-router-dom';
import styles from './createprof.module.css';

class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            eduyear: '',
            edusemester: '',
            status:'',
            skills:'',
            githubusername:'',
            bio:'',
            facebook:'',
            linkedin:'',
            youtube:'',
            instagram:'',
            errors: {}
        }
    }

    onChange = (e)=>  {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onSubmit = (e) =>  {
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            college: this.state.college,
            eduyear: this.state.eduyear,
            edusemester: this.state.edusemester,
            status: this.state.status,
            skills: this.state.skills,
            bio: this.state.bio,
            githubusername: this.state.githubusername,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            instagram: this.state.instagram,
            youtube: this.state.youtube
        }
        this.props.createProfile(profileData, this.props.history)
    }
    render() {
        const {errors,  displaySocialInputs} = this.state;

        //select options for status
        const options = [
            {
                label: '* Select Your Status',
                value: 0
            },
            {
                label: 'Student',
                value: 'Student'
            },            {
                label: 'Alumni',
                value: 'Alumni'
            },
        ];

        let socialInputs;
        if(displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup 
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fa fa-facebook"
                    value={this.state.onChange}
                    error={errors.facebook}
                    />

                    <InputGroup 
                    placeholder="Instagram Profile URL"
                    name="instagram"
                    icon="fa fa-instagram"
                    value={this.state.onChange}
                    error={errors.instagram}
                    />

                    <InputGroup 
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fa fa-linkedin"
                    value={this.state.onChange}
                    error={errors.linkedin}
                    />

                    <InputGroup 
                    placeholder="Youtube Profile URL"
                    name="youtube"
                    icon="fa fa-youtube"
                    value={this.state.onChange}
                    error={errors.youtube}
                    />

                </div>
            )
        }

        return (
            <div className="create-profile" >
                <div className="container">
                <hr className={styles.colorgraph}></hr>

                    <div className="row" className={styles.justshadow}>

                        <div className="col-md-8 m-auto">
                            <h1 className={styles.headfont}>Create your Profile</h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <form onSubmit={this.onSubmit} >
                                <TextFieldGroup
                                placeholder="*Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                error={errors.handle}
                                info="A unique handle for your profile url. E.g. Your full name, company name,nicknames etc"
                                />
                                
                                <SelectListGroup
                                placeholder="*Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                error={errors.status}
                                options={options}
                                info="Give us where you're at in your student life"
                                />
                                
                                <TextFieldGroup
                                placeholder="Education Year"
                                name="eduyear"
                                value={this.state.eduyear}
                                onChange={this.onChange}
                                error={errors.eduyear}
                                info="Your Current Year"
                                />

                                <TextFieldGroup
                                placeholder="Education Semester"
                                name="edusemester"
                                value={this.state.edusemester}
                                onChange={this.onChange}
                                error={errors.edusemester}
                                info="Your Current Semester"
                                />

                                <TextFieldGroup
                                placeholder="*Skills"
                                name="skills"
                                value={this.state.skills}
                                onChange={this.onChange}
                                error={errors.skills}
                                info="Please use comma seperated values (e.g HTML,CSS,JAVASCRIPT)"
                                />

                                
                            <TextFieldGroup
                                placeholder="Github Username"
                                name="githubusername"
                                value={this.state.githubusername}
                                onChange={this.onChange}
                                error={errors.githubusername}
                                info="If you want your latest repos and a Github link, include your username"
                                />

                            <TextAreaFieldGroup

                                placeholder="About Yourself"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                                info="Tell us something about yourself"
                            />

                            <div className="mb-3">
                                <button 
                                type="button" 
                                onClick={()=>{
                                    this.setState(prevState=>({
                                        displaySocialInputs: !prevState.displaySocialInputs
                                    }))
                                }}
                                className={styles.socialbtn}>
                                {this.state.displaySocialInputs ? "Hide Social Links" : "Add social Links"}

                                </button>
                                <span className="text-muted">Optional</span>
                            </div>

                            {socialInputs}

                            <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                            <small className="d-block pb-3">* required fields</small>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state)=> ({
    profile: state.profile,
    errors: state.errors
})
export default connect(mapStateToProps,{createProfile})(withRouter(CreateProfile));
