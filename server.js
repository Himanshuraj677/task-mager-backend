require('dotenv').config();
const express = require('express');
const cors = require('cors');
const linkRouter = require('./router/linkRouter')
const errorHandler = require('./middleware/errorHandler');
require('./config/db_connection');

const app = express();
app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Permissions-Policy', 'unload=*');
    next();
});

app.use('/link', linkRouter);



app.use(errorHandler);
app.listen(3000, () => {
    console.log("Server is running on URL: http://127.0.0.1:3000");
})

