import { authService, dbService } from "myFirebase";
import React, { useEffect, useState } from "react";

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => authService.signOut();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.stopPropagation();

    // 변한 내용 없으면 실행 X
    if (userObj.displayName !== newDisplayName) {
      // fb의 기능
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  const getMyNweets = async () => {
    // user의 nweets들 불러오기
    const nweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
