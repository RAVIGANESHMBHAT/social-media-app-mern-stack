import { useRef, useContext } from "react";
import { CircularProgress } from "@mui/material";

import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { loginCall } from "../../apiCalls";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
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
            <button className="loginButton" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="warning" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <button className="loginForgot" type="submit" disabled={isFetching}>
              Forgot Password?
            </button>
            <button className="loginRegister" disabled={isFetching}>
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
