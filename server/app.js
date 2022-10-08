const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const loginRoutes = require("./routes/loginRoute");
const registerRoutes = require("./routes/registerRoute");
const userRoutes = require("./routes/userRoute");
const courseRoutes = require("./routes/courseRoute");
const postRoutes = require("./routes/postRoute");
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use(express.static(path.resolve(__dirname, "../dist")));

app.use("/login", loginRoutes);
app.use("/register", registerRoutes);
app.use("/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/post", postRoutes);

app.listen(3000, function () {
  console.log("Server running on http://127.0.0.1:3000");
});
