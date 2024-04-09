const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

const dbConnection = require("./config/dbConnection");
const { gets, addUser, getAllUsers } = require("./controller/userController");
const {register, login, forgetPassword, getUserDetails, updateUsername } = require("./controller/loginController");
const verifyToken = require("./middleware/middleware.js");

app.use(cors());
app.use(express.json());

dbConnection();

app.post("/register", register);
app.post("/login", login);
app.post("/forget-password", forgetPassword);

app.get("/", gets);
app.post("/user", addUser);
app.get("/users", getAllUsers);

app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Protected endpoint accessed", user: req.user });
});

app.get("/details", verifyToken, getUserDetails);

app.put("/update", verifyToken, updateUsername);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
