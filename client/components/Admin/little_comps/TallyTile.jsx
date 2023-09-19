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
        <div className="tt-tally-name">{props.name}</div>
        <div className="tt-tally-votes">{props.numResp}</div>
      </div>
    );
  } else {
    return (
      <div className="tally-tile-inactive">
        <div className="tt-tally-name">{props.name}</div>
        <div className="tt-tally-votes">{props.numResp}</div>
      </div>
    );
  }
};

export default TallyTile;
