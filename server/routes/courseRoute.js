const express = require("express");
const courseRoutes = express.Router();

const { fapp, db } = require("../firebase-config");
const {
  collection,
  doc,
  setDoc,
  query,
  getDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  where,
  deleteDoc
} = require("firebase/firestore");
const {
  getStorage,
  ref,
  uploadBytes,
  deleteObject
} = require("firebase/storage");

const storage = getStorage();

courseRoutes.route("/create").post(async function (req, res) {
  const { title, description, quizList, videoUrl } = req.body;
  const newCourseRef = doc(collection(db, "course"));
  const createCourseInfo = {
    cid: newCourseRef.id,
    title: title,
    description: description,
    quizList: quizList,
    videoUrl: videoUrl
  };
  const result = await setDoc(newCourseRef, createCourseInfo);
  res.send(result);
});

courseRoutes.route("/all").get(async function (req, res) {
  const q = query(collection(db, "course"));
  const Docs = await getDocs(q);
  let result = [];
  Docs.forEach((doc) => {
    result.push(doc.data());
  });
  res.send(result);
});

courseRoutes.route("/get").post(async function (req, res) {
  const { cid } = req.body;
  const docRef = doc(db, "course", cid);
  const docSnap = await getDoc(docRef);
  const result = docSnap.data();
  res.send(result);
});

courseRoutes.route("/register").post(async (req, res) => {
  const { uid, cid } = req.body;
  const Doc = doc(db, "user", uid);
  const cDoc = doc(db, "course", cid);
  const docSnap = await getDoc(Doc);
  const List = docSnap.data().clist;
  if (List.includes(cid)) {
    res.send("400");
  } else {
    await updateDoc(Doc, {
      clist: arrayUnion(cid)
    });
    await updateDoc(cDoc, {
      plist: arrayUnion(uid)
    });
    res.send("200");
  }
});

courseRoutes.route("/mycourse").post(async (req, res) => {
  const { uid } = req.body;
  const q = query(
    collection(db, "course"),
    where("plist", "array-contains", uid)
  );
  const snap = await getDocs(q);
  let result = [];
  snap.forEach((item) => {
    result.push(item.data());
  });
  res.send(result);
});

courseRoutes.route("/delete").post(async (req, res) => {
  const { cid } = req.body;
  const storage = getStorage();
  const imgRef = ref(storage, "cover/" + cid + ".jpg");
  const videoRef = ref(storage, "video/" + cid + ".mp4");
  await deleteObject(imgRef);
  await deleteObject(videoRef);
  const courseRef = doc(db, "course", cid);
  const courseSnap = await getDoc(courseRef);
  if (courseSnap.data().postList) {
    courseSnap.data().postList.forEach(async (pid) => {
      const postRef = doc(db, "post", pid);
      const postSnap = await getDoc(postRef);
      const commentList = postSnap.data().commentList;
      if (commentList) {
        commentList.forEach(async (item) => {
          await deleteDoc(doc(db, "comment", item));
        });
      }
      await deleteDoc(doc(db, "post", pid));
    });
  }
  await deleteDoc(doc(db, "course", cid));
  const q = query(
    collection(db, "user"),
    where("clist", "array-contains", cid)
  );
  const snap = await getDocs(q);
  snap.forEach(async (Doc) => {
    let index = Doc.data().clist.indexOf(cid);
    let cp = [];
    Doc.data().clist.forEach((item) => {
      cp.push(item);
    });
    cp.splice(index, 1);
    let UDoc = doc(db, "user", Doc.id);
    await updateDoc(UDoc, {
      clist: cp
    });
  });
  res.sendStatus(200);
});
module.exports = courseRoutes;
