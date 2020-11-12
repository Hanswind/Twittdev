import { dbService, storageService } from "myFirebase";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner, attachmentUrl }) => {
  // edit Nweet by id
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    // 업데이트 할 내용만 넣어주면 됨
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });

    setEditing(false);
  };

  // delete Nweet by id
  const onDeleteClick = async () => {
    const ok = window.confirm("정말로 작성한 게시글을 삭제하시겠습니까?");
    if (ok) {
      // 1. nweet 삭제
      await dbService.doc(`nweets/${nweetObj.id}`).delete();

      // 2. nwwet에 있던 이미지 storage에서 삭제
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="수정" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
