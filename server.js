require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./router/userRouter');
const errorHandler = require('./middleware/errorHandler');
const verifyJSONWebToken = require('./middleware/jwt_verifier');
const taskRouter = require('./router/taskRouter')
require('./config/db_connection');

const app = express();
app.use(cors())
app.use(express.json());
app.use('/user', router);


app.use(verifyJSONWebToken);
// Protected route will start from here
app.get('/protected', (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

app.use('/task', taskRouter);


app.use(errorHandler);
app.listen(3000, () => {
    console.log("Server is running");
})