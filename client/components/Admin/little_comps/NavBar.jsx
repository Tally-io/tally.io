import React from "react";

const NavBar = (props) => {
  return (
    <div>
      <div>
        Welcome, {props.name}
        <button className="logout-button">logout</button>
      </div>
    </div>
  );
};

export default NavBar;
