const user = require('../models/userSchema')

const gets = async (req, res) => {
    console.log("data", req.body);
    res.send("Hello Deepak");
};

const addUser = async (req, res) => {
    console.log("req=>", req.body)
    const users = req.body.testResults;
    try {
        const userCreate = await user.insertMany({report:users});
        console.log("user create:", userCreate);
        res.status(200).send(userCreate);
    } catch (err) {
        console.error("Error user:", err);
        res.send("internal server error")
    }
}
module.exports = { gets, addUser }

