import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");

  // ==============
  const onSubmit = async (event) => {
    event.preventDefault();

    // 1. 우선 사진 있으면 사진 업로드후, 해당 URL을 받아서 nweet에 추가
    let attachmentUrl = "";

    if (attachment != "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`); // 저장경로설정 '사용자id/랜덤파일이름'
      const response = await attachmentRef.putString(attachment, "data_url"); // (저장할파일, 데이터 형식)
      attachmentUrl = await response.ref.getDownloadURL();
    }

    // 2. nweet submit 구현 (받아온 이미지 URL정보도 넣어줌)
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNweet(value); // event.target.value
  };

  // upload image preview func

  const onFileChange = (event) => {
    const {
      target: { files }, // event.target.files
    } = event;

    const theFile = files[0];

    const reader = new FileReader(); // 공식 File API
    reader.onloadend = (finishedEvent) => {
      // 아래 readURL 종료후 실행
      const {
        currentTarget: { result }, // result = finishedEvent.currantTarget.result
      } = finishedEvent;
      setAttachment(result);
    };

    reader.readAsDataURL(theFile);
  };

  // clear uploaded Photo
  const onClearPhotoClick = () => setAttachment(null);

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={nweet}
        onChange={onChange}
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" />
          <button onClick={onClearPhotoClick}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
