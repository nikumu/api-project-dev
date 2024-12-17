require('dotenv').config();
require('./database/index');
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const { PORT } = process.env;
app.listen(PORT, () => {
    console.log(`server is on in port ${PORT}`);
});