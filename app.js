require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const routes = require('./src/routers');
const { globalErrorHandler } = require('./src/utils/error');

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);
app.use(globalErrorHandler);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening to request on 127.0.0.1:${port}`);
});