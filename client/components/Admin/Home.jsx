import React, { useEffect } from "react";
import NavBar from "./little_comps/NavBar.jsx";
import TallyTile from "./little_comps/TallyTile.jsx";

// mongo query to findById() — pull list of all surveys with the _id from the user object
// this array will be a result of the DB call. Full doc for each
const userInfo = { name: "Josh" };
const userTallies = [
  {
    active: true,
    name: "Dinner location Friday Aug 18 —- ",
    numResp: 5,
    _id: "asdf1234",
  },
  {
    active: false,
    name: "ECRI-41 Bookclub: August  —- ",
    numResp: 5,
    _id: "qwer1234",
  },
  {
    active: true,
    name: "Family vacation location: 2024 —- ",
    numResp: 5,
    _id: "qwer1234",
  },
];

// list of divs to render
const listTallies = [];
// loop to create a list of all the Tally Tiles
for (let i = 0; i < userTallies.length; i++) {
  // make a call to the DB based on the _id
  // get tally name, number responses, and if active
  if (userTallies[i].active) {
    listTallies.unshift(
      <TallyTile
        name={userTallies[i]["name"]}
        numResp={userTallies[i]["numResp"]}
        active={userTallies[i]["active"]}
        key={userTallies[i]["_id"]}
      />
    );
  } else {
    listTallies.push(
      <TallyTile
        name={userTallies[i]["name"]}
        numResp={userTallies[i]["numResp"]}
        active={userTallies[i]["active"]}
        key={userTallies[i]["_id"]}
      />
    );
  }
}

console.log(listTallies);
// get a list of all tallys

const Home = () => {
  // do we need useEffect for the rendering? Or is what I've got above okay?
  // useEffect(() => {}, []);

  return (
    <div>
      <hr />
      <NavBar name={userInfo.name} key={userInfo.name} />
      <hr />

      <div className="create-container">
        <button className="create-tally-button">Create a tally!</button>
      </div>

      <div>
        <p>Your Tallies</p>
        <hr />
        <div className="tally-list">{listTallies}</div>
      </div>
    </div>
  );
};

export default Home;
