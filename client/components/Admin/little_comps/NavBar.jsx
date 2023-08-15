import React from "react";
// import required for cookies.remove to function

const NavBar = (props) => {
  const logout = () => {
    Cookies.remove("key"); // "key" here should be the key to the cookie object
  };

  return (
    <div>
      <div>
        Welcome, {props.name}
        <button className="logout-button" onClick={logout}>
          logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
