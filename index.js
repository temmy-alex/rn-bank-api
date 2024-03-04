require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const ip = process.env.IP || 'localhost';
const port = process.env.PORT || 3000;
const path = require('path');
const routes = require('./src/routes');
const errorHandler = require('./src/middlewares/error_handler');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(routes);
app.use(errorHandler);

if (process.env.NODE_ENV === 'development') {
    app.listen(port, ip, () => {
        console.log(`Server start : http://${ip}:${port}`);
    })
} else {
    app.listen(port, () => {
        console.log('Server start');
    })
}
