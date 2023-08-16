import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  const handleLogin = (e) => {
    //prevents default form submission
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("form data", formData);
    const emailVal = formData.get("loginEmail");
    const passVal = formData.get("loginPassword");
    //ENTER LOGIN LOGIC HERE, if logic passes, navigate to /home endpoint
    fetch("/user/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email: emailVal, password: passVal }),
    })
      .then((response) => {
        if (!response.ok) {
          return Error("login Failed");
        }
        response.json();
      })
      .then((data) => {
        console.log("login successful", data);
        navigate("/home");
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };

  const handleSignup = (e) => {
    //prevents default form submission
    e.preventDefault();
    const formData = new FormData(e.target);
    const emailVal = formData.get("loginEmail");
    const passVal = formData.get("loginPassword");
    const nameVal = formData.get("name");
    fetch("/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: nameVal,
        email: emailVal,
        password: passVal,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return Error("login Failed");
        }
        response.json();
      })
      .then((data) => {
        console.log("login successful", data);
        navigate("/home");
      })
      .catch((error) => {
        console.log("login error", error);
      });
  };
  return (
    <div className="loginPage-container">
      <div>
        <p>
          This app will change your life! It can solve world hunger and get
          pandas off the endangered species list. It can even repaired your
          relationship with your mother!
        </p>
        <p>Log in or sign up to get started! </p>
        <hr />
      </div>

      <div className="login-container">
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Enter Email"
            name="loginEmail"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Enter Password"
            name="loginPassword"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
          />
          <br />
          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
      </div>

      <div>
        <hr />
        Don't have an account yet? Sign up to get started!
      </div>

      <div className="signUp-container">
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button type="submit" className="signupBtn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Landing;
