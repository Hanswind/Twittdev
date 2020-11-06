import { authService } from "myFirebase";
import React from "react";

const Profile = () => {
  const onLogOutClick = () => authService.signOut();
  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
