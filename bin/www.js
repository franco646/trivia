/* eslint-disable no-console */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app');

const port = process.env.PORT || 5000;
const env = process.env.NODE_ENV || 'development';

const connect = async () => {
  if (env === 'test') {
    const mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    });
    app.listen(5000, () => {
      console.log('server running in port 5000');
    });
  } else {
    mongoose
      .connect(process.env.MONGOOSE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        app.listen(port, () => {
          console.log(`server running in port ${port}`);
        });
      }).catch((err) => console.log(err));
  }
};

connect();
