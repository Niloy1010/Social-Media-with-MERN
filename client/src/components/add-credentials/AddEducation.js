import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { addEducation } from "../../actions/profileActions";
import styles from "./addedu.module.css";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      subject: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false,
    };
  }

  // componentWillReceiveProps =(nextProps)=> {
  //     if(nextProps.errors) {
  //         this.setState({
  //             errors: nextProps.errors
  //         })
  //     }
  // }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        ...prevState,
        errors: nextProps.errors,
      };
    } else {
      return {
        ...prevState,
      };
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const { errors, disabled, ...eduData } = this.state;
    this.props.addEducation(eduData, this.props.history);
  };
  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current,
    });
  };

  render() {
    console.log(this.state);
    const { errors } = this.state;

    return (
      <div className={styles.basic}>
        <hr className={styles.topcontainer}></hr>

        <div className={styles.container}>
          <Link to="/dashboard" className={styles.btnlinkdash}>
            Back to Dashboard
          </Link>

          <div>
            <div className="col-md-8 m-auto">
              <h3 className={styles.headfont}>Add Education</h3>
              <p className="lead text-center">Add your education background</p>
              <small className="d-block pb-3">* = required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.onChange}
                  error={errors.school}
                />

                <TextFieldGroup
                  placeholder="*Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.onChange}
                  error={errors.degree}
                />

                <TextFieldGroup
                  placeholder="*Subject"
                  name="subject"
                  value={this.state.subject}
                  onChange={this.onChange}
                  error={errors.subject}
                />

                <TextFieldGroup
                  placeholder="From date"
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.onChange}
                  error={errors.from}
                />

                <TextFieldGroup
                  placeholder="To date"
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.onChange}
                  error={errors.to}
                  disabled={this.state.disabled ? "disabled" : ""}
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
                    Current
                  </label>
                </div>

                <TextAreaFieldGroup
                  placeholder="Program description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Tell us something about what you did"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
        <hr className={styles.topcontainer}></hr>
      </div>
    );
  }
}

AddEducation.porpTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
