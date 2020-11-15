import AuthForm from "components/AuthForm";
import { auth } from "firebase";
import { firebaseInstance, authService } from "myFirebase";
import React, { useState } from "react";

const Auth = () => {
  // 외부 로그인
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    // 1. provider 생성
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }

    // 2. popup
    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <AuthForm />
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
