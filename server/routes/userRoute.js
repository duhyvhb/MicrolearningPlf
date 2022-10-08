const express = require("express");
const userRoutes = express.Router();
const { fapp, db } = require("../firebase-config");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { doc, getDoc, updateDoc } = require("firebase/firestore");

userRoutes.route("/getinfo").post(async function (req, res) {
  const { uid } = req.body;
  const docRef = doc(db, "user", uid);
  const docSnap = await getDoc(docRef);
  const result = docSnap.data();
  res.send(result);
});

userRoutes.route("/changename").post(async function (req, res) {
  const { uid, nickname } = req.body;
  const docRef = doc(db, "user", uid);
  await updateDoc(docRef, {
    username: nickname
  });
  res.sendStatus(400);
});

module.exports = userRoutes;
