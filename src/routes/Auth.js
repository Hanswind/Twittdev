import { auth } from "firebase";
import { firebaseInstance, authService } from "myFirebase";
import React, { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        // create account
        // 계정 생성하면 사용자는 바로 로그인 된다 공식 문서에 써있어서 따로 로그인도 안해줘도댐
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
        console.log(data);
      } else {
        // login
        const data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  // 외부 로그인
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    // 1. provider 생성
    let provider;
    if (name == "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name == "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    // 2. popup
    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />

        <span onClick={toggleAccount}>
          {newAccount ? "Sign In" : "Create Account"}
        </span>
        {error}
      </form>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};

export default Auth;
