import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import {deleteEducation} from '../../actions/profileActions'

class Education extends Component {


    onDeleteEducation = (id) => {
        this.props.deleteEducation(id);
    }
    render() {
        const education = this.props.education.map(edu=> (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment>
                     - 
                     {edu.to === null ? (' current'): (<Moment format="YYYY/MM/DD">{edu.to}</Moment>)}
                      </td>
                <td><button onClick={this.onDeleteEducation.bind(edu._id)} className="btn btn-danger">Delete Education</button></td>
            </tr>
        ))
        return (
            <div className="add-education">
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                        </tr>
                    </thead>
                    <tbody>
                        {education}
                    </tbody>
                </table>
                
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default  connect(null,{deleteEducation})(Education);
