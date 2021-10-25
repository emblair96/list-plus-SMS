const express = require("express");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
require("dotenv").config();
const app = express();
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 1137;

app.post("/sms", async (req, res) => {});

/*
* user will send a message 
TODO: i will need to parse that message to see if a list is specified
* send back message asking to confirm which list 
  * query db to get their lists by phone number for now 
TODO: add authentication layer 
*/

app.post("/list-sms", async (req, res) => {
  const twiml = new MessagingResponse();

  // for now i'll hard code a user
  if (req.body.Body.includes("#")) {
    let hashtag = req.body.Body.indexOf("#");
    let endOfListName = req.body.Body.includes(" ")
      ? req.body.Body.indexOf(" ")
      : req.body.Body.length;
    let listName = req.body.Body.slice(hashtag + 1, endOfListName);

    console.log("listname", listName);
    db.List.findOne({
      where: {
        list_name: listName,
      },
    }).then((data) => {
      if (!data) {
        console.log("LIST DOESN'T EXIST");
        // db.List.create({
        //   list_name: listName,
        //   UserId: 4,
        // });
      } else {
        console.log("list exists", data);
      }
    });
  } else {
    // ! userId is hardcoded; need to update once implement authentication
    db.List.findAll({
      where: {
        UserId: 4,
      },
    }).then((data) => {
      // console.log("DATA", data);
      if (data.length === 0) {
        twiml.message(
          "Your account currently has no lists.  Please respond with a list name prefaced by #."
        );
        res.writeHead(200, { "Content-Type": "text/xml" });
        res.end(twiml.toString());
      } else {
      }
    });
  }

  console.log("WORKING???", req.body.Body);
});

app.get("/", (req, res) => {
  res.send("Hello");
});

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});
