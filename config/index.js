const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  db: process.env.DATABASE_URI,
  port: process.env.PORT
};