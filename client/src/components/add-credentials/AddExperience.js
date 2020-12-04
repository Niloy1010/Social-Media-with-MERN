import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup';
import {addExperience} from '../../actions/profileActions';
import styles from './addexp.module.css';


class AddExperience extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            company:'',
            location: '',
            from : '',
            to: '',
            current:false,
            description:'',
            errors:{},
            disabled: false
        }
    }

    // componentWillReceiveProps =(nextProps)=> {
    //     if(nextProps.errors) {
    //         this.setState({
    //             errors: nextProps.errors
    //         })
    //     }
    // }

    static getDerivedStateFromProps(nextProps,prevState){
        
        if(nextProps.errors) {
            console.log("IN");
            return {
                ...prevState,
                errors: nextProps.errors
            }
        }
        else{
            console.log("OUT");
            return {
                ...prevState
            }
        }
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();

        const {errors,disabled,...expData} = this.state;
        this.props.addExperience(expData,this.props.history);

    }
    onCheck = (e) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }

    render() {


        const {errors} = this.state;

        return (

            <div className={styles.basic}>
                <hr className={styles.topcontainer}></hr>

                <div className={styles.container}>

                <Link to="/dashboard" className={styles.btnlinkdash}>Back to Dashboard</Link>

                    <div >
                        <div className="col-md-8 m-auto">
                            <h3 className={styles.headfont}>Add Experience</h3>
                            <p className="lead text-center">
                                Add any job you have had in the past or current
                            </p>
                            <small className="d-block pb-3">* = required</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                placeholder="* Company"
                                name="company"
                                value = {this.state.company}
                                onChange= {this.onChange}
                                error={errors.company}
                                
                                />


                                <TextFieldGroup
                                placeholder="*Job Title"
                                name="title"
                                value = {this.state.title}
                                onChange= {this.onChange}
                                error={errors.title}
                                
                                />


                                 <TextFieldGroup
                                placeholder="Location"
                                name="location"
                                value = {this.state.location}
                                onChange= {this.onChange}
                                error={errors.location}
                                
                                />
                                
                                <TextFieldGroup
                                placeholder="From date"
                                name="from"
                                type="date"
                                value = {this.state.from}
                                onChange= {this.onChange}
                                error={errors.from}
                                
                                />

                                <TextFieldGroup
                                placeholder="To date"
                                name="to"
                                type="date"
                                value = {this.state.to}
                                onChange= {this.onChange}
                                error={errors.to}
                                disabled={this.state.disabled ? 'disabled': ''}
                                />
                                <div className="form-check mb-4">
                                    <input 
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={this.state.current}
                                    checked={this.state.current}
                                    onChange={this.onCheck}
                                    id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Job
                                    </label>
                                </div>

                                <TextAreaFieldGroup
                                placeholder="Job description"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}
                                error={errors.description}
                                info="Tell us something about what you did"
                                />

                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />

                            </form>
                        </div>
                    </div>
                </div>
                <hr className={styles.topcontainer}></hr>

            </div>
        )
    }
}

AddExperience.porpTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
}


const mapStateToProps =(state)=> (
    {
        profile: state.profile,
        errors: state.errors
    }
)

export default connect(mapStateToProps,{addExperience})(withRouter(AddExperience));