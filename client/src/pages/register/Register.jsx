import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(confirmPassword.current.value, password.current.value);
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://localhost:8080/api/auth/register", user);
        history("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">SocialApp</h3>
          <span className="loginDesc">
            Connect with friend and the world around you on Social App
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleRegister}>
            <input
              placeholder="Username"
              ref={username}
              className="loginInput"
              required
            />
            <input
              placeholder="Email"
              ref={email}
              className="loginInput"
              type="email"
              required
            />
            <input
              placeholder="Password"
              ref={password}
              className="loginInput"
              type="password"
              minLength={6}
              required
            />
            <input
              placeholder="Re-enter Password"
              ref={confirmPassword}
              className="loginInput"
              type="password"
              required
            />
            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegister">Log In to Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
