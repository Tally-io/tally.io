import React from "react";

const TallyTile = (props) => {
  // call DB, reference the _id

  // info required:
  // name
  // number respondents
  // if active
  console.log("props.name is => ", props.name);
  if (props.active) {
    return (
      <div className="tally-tile">
        <p>{props.name}</p>
        <p>{props.numResp}</p>
      </div>
    );
  } else {
    return (
      <div className="tally-tile-inactive">
        <p>{props.name}</p>
        <p>{props.numResp}</p>
      </div>
    );
  }
};

export default TallyTile;
