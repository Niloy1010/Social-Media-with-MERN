import React from 'react'
import Moment from 'react-moment';
import isEmpty from '../../../../validation/is-empty';

const ProfileExperience = (props)=> {

    const {experience} = props;

    const expItems =  experience.map(exp => (
        <li key={exp._id} className="list-group-item">
            <h4>{exp.company}</h4>
            <p>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> - 
                {exp.to === null ? (' Now ') : ( <Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
            </p>
            <p><strong>Position: </strong>{exp.title}</p>
            <p>
                {exp.location === '' ? null : (<span><strong>Location: </strong>{exp.location}</span>)}
            </p>
            <p>
                {exp.description === '' ? null : (<span><strong>Description: </strong>{exp.description}</span>)}
            </p>
        </li>
    ));

    return (
        <div>
                {expItems.length > 0 ? (
                    <ul className="list-group">{expItems}</ul>
                ) : (<p className="text-center">No experience Listed</p>)
            }
        </div>
    )
}
export default ProfileExperience;
