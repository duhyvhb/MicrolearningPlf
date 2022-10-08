const express = require("express");
const loginRoutes = express.Router();
const { fapp, db } = require("../firebase-config");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

loginRoutes.route("/").post(async function (req, res) {
  const { email, password } = req.body;
  const auth = getAuth();
  const result = await signInWithEmailAndPassword(auth, email, password);
  if (result.status == 200) {
    res.send(result);
  } else {
    res.send(result);
  }
});

module.exports = loginRoutes;
