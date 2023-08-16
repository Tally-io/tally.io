import React from "react";
// import required for cookies.remove to function

const NavBar = (props) => {
  const logout = () => {
    Cookies.remove("key"); // "key" here should be the key to the cookie object
  };

  return (
    <div className="navBar">
      <div className="welcome">Welcome, {props.name}</div>
      <div className="logout-button" onClick={logout}>
        logout
      </div>
    </div>
  );
};

export default NavBar;
