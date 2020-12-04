import React from "react";
import Moment from "react-moment";
import isEmpty from "../../../../validation/is-empty";

const ProfileExperience = (props) => {
  const { experience } = props;

  const expItems = experience.map((exp) => (
    <li
      key={exp._id}
      className="list-group-item"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <h4>{exp.company}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
        {exp.to === null ? (
          " Now "
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {exp.title}
      </p>
      <p>
        {exp.location === "" ? null : (
          <span>
            <strong>Location: </strong>
            {exp.location}
          </span>
        )}
      </p>
      <p>
        {exp.description === "" ? null : (
          <span>
            <strong>Description: </strong>
            {exp.description}
          </span>
        )}
      </p>
    </li>
  ));

  return (
    <div>
      {expItems.length > 0 ? (
        <ul className="list-group">{expItems}</ul>
      ) : (
        <h4 style={{ textAlign: "center" }}>No experience Listed</h4>
      )}
    </div>
  );
};
export default ProfileExperience;
