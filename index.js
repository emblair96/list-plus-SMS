const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
require("dotenv").config();
const app = express();
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 1137;

app.post("/sms", async (req, res) => {
  const twiml = new MessagingResponse();
  console.log("REQ", req.body);
  twiml.message("The Robots are coming! Head for the hills!");

  res.writeHead(200, { "Content-Type": "text/xml" });
  res.end(twiml.toString());
});

/*
* user will send a message 
TODO: i will need to parse that message to see if a list is specified
* send back message asking to confirm which list 
  * query db to get their lists by phone number for now 
TODO: add authentication layer 
*/

app.post("/list-sms", async (req, res) => {
  console.log("WORKING???", req.body.Body);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
