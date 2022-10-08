const express = require("express");
const postRoutes = express.Router();
const { fapp, db } = require("../firebase-config");
const {
  doc,
  setDoc,
  collection,
  query,
  getDocs,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  getDoc,
  where,
  deleteDoc
} = require("firebase/firestore");

postRoutes.route("/add").post(async function (req, res) {
  const { title, content, author, cid } = req.body;
  const newPostRef = doc(collection(db, "post"));
  const courseRef = doc(db, "course", cid);
  const createPostInfo = {
    pid: newPostRef.id,
    title: title,
    content: content,
    author: author,
    time: serverTimestamp()
  };
  try {
    const result = await setDoc(newPostRef, createPostInfo);
    await updateDoc(courseRef, {
      postList: arrayUnion(newPostRef.id)
    });
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

postRoutes.route("/get").post(async function (req, res) {
  const { cid } = req.body;
  const courseRef = doc(db, "course", cid);
  const courseSnap = await getDoc(courseRef);
  const pidList = courseSnap.data().postList;
  const postList = [];
  if (pidList) {
    const q = query(collection(db, "post"), where("pid", "in", pidList));
    const postSnap = await getDocs(q);
    postSnap.forEach((doc) => {
      const postData = doc.data();
      const post = {
        pid: postData.pid,
        title: postData.title,
        author: postData.author,
        time: new Date(postData.time.seconds * 1000).toDateString()
      };
      postList.push(post);
    });
  }
  res.send(postList);
});

postRoutes.route("/delete").post(async function (req, res) {
  const { pid } = req.body;
  const postRef = doc(db, "post", pid);
  const postSnap = await getDoc(postRef);
  const commentList = postSnap.data().commentList;
  if (commentList) {
    commentList.forEach(async (item) => {
      await deleteDoc(doc(db, "comment", item));
    });
  }
  await deleteDoc(doc(db, "post", pid))
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.send(err);
    });
});

postRoutes.route("/detail").post(async function (req, res) {
  const { pid } = req.body;
  const postRef = doc(db, "post", pid);
  const postSnap = await getDoc(postRef);
  const postData = postSnap.data();
  const result = {
    title: postData.title,
    author: postData.author,
    content: postData.content,
    time: new Date(postData.time.seconds * 1000).toLocaleTimeString(),
    dateTime: new Date(postData.time.seconds * 1000).toLocaleDateString()
  };
  res.send(result);
});

postRoutes.route("/comment").post(async function (req, res) {
  const { pid, content, author } = req.body;
  const newCommentRef = doc(collection(db, "comment"));
  const postRef = doc(db, "post", pid);
  const createPostInfo = {
    commentId: newCommentRef.id,
    content: content,
    author: author,
    time: serverTimestamp()
  };
  try {
    const result = await setDoc(newCommentRef, createPostInfo);
    await updateDoc(postRef, {
      commentList: arrayUnion(newCommentRef.id)
    });
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

postRoutes.route("/getcomment").post(async function (req, res) {
  const { pid } = req.body;
  const postRef = doc(db, "post", pid);
  const postSnap = await getDoc(postRef);
  const commentIdList = postSnap.data().commentList;
  const commentList = [];
  if (commentIdList) {
    const q = query(
      collection(db, "comment"),
      where("commentId", "in", commentIdList)
    );
    const commentSnap = await getDocs(q);
    commentSnap.forEach((doc) => {
      const commentData = doc.data();
      const post = {
        content: commentData.content,
        author: commentData.author,
        time: new Date(commentData.time.seconds * 1000).toDateString()
      };
      commentList.push(post);
    });
  }
  res.send(commentList);
});

module.exports = postRoutes;
