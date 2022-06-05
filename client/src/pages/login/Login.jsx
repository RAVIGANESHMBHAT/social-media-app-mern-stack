import { useRef } from "react";

import "./login.css";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email.current.value, password.current.value);
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
          <form className="loginBox" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              minLength={6}
              className="loginInput"
              ref={password}
              required
            />
            <button className="loginButton">Log In</button>
            <button className="loginForgot">Forgot Password?</button>
            <button className="loginRegister">Create a New Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
