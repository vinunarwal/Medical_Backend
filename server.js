const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

const dbConnection = require('./config/dbConnection');
const { gets, addUser, getAllUsers } = require('./controller/userController');
const { register, login, forgetPassword } = require('./controller/loginController');
const { verifyToken } = require('./middleware/middleware');


app.use(cors());
app.use(express.json())

dbConnection();


app.post('/register', register);
app.post('/login', login);
app.post('/forget-password', forgetPassword);

app.get('/', gets);
app.post('/user', addUser);
app.get('/users', getAllUsers);


app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected endpoint accessed', user: req.user });
  });

  // Add a new route to fetch user details
app.get('/user/profile', verifyToken, async (req, res) => {
  try {
      // Assuming you have the user's ID stored in the token payload
      const userId = req.user.userId;
      const user = await Login.findById(userId);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      // Return only necessary user details (e.g., username, email)
      res.status(200).json({ username: user.username, email: user.email, labName: user.labName, labAddress: user.labAddress });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

  
  
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
