const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);
