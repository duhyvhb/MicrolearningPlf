const express = require("express");
const registerRoutes = express.Router();
const { fapp, db } = require("../firebase-config");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const { doc, setDoc } = require("firebase/firestore");

registerRoutes.route("/").post(async function (req, res) {
  const { email, password, cpassword, nickname } = req.body;
  const auth = getAuth();
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const docData = {
      uid: result.user.uid,
      email: email,
      username: nickname,
      clist: [],
      plist: [],
      role: 0,
      avatarUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    };
    await setDoc(doc(db, "user", result.user.uid), docData);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

module.exports = registerRoutes;
