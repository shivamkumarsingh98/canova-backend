const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDb = require("./Config/MongoDb");
dotenv.config();
const server = express();
connectMongoDb();
server.use(express.json());
server.use(cors());
server.use(bodyparser.urlencoded({ extended: true }));



const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`${`Server is running at port ${PORT} `}`);
});

server.get("/", (req, res) => {
  res.send("server is running");
});
