import React from "react";
import Moment from "react-moment";

const ProfileEducation = (props) => {
  const { education } = props;
  const eduItems = education.map((edu) => (
    <li
      key={edu._id}
      className="list-group-item"
      style={{
        boxshadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <h4>{edu.school}</h4>
      <p>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
        {edu.to === null ? (
          " Now "
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Subject: </strong>
        {edu.subject}
      </p>
      <p>
        <strong>Degree: </strong>
        {edu.degree}
      </p>
      <p>
        {edu.description === "" ? null : (
          <span>
            <strong>Description: </strong>
            {edu.description}
          </span>
        )}
      </p>
    </li>
  ));

  return (
    <div>
      {eduItems.length > 0 ? (
        <ul className="list-group">{eduItems}</ul>
      ) : (
        <h4 style={{ textAlign: "center" }}>No Education Listed</h4>
      )}
    </div>
  );
};

export default ProfileEducation;
