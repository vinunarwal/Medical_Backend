const user = require("../models/userSchema");

const gets = async (req, res) => {
  console.log("data", req.body);
  res.send("Hello Deepak");
};

const addUser = async (req, res) => {
  console.log("req=>", req.body);
  const { info, testResults } = req.body;

  try {
    console.log("Creating user with the following data:");
    console.log("Patient Info:", info);
    console.log("Test Results:", testResults);

    const userCreate = await user.create({report:req.body});

    console.log("User created report:", userCreate);
    const responseData = { info, testResults };
    res.status(200).json(responseData); 
    console.log("response",responseData)
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Internal server error");
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { gets, addUser, getAllUsers };