const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 1137;





app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();

  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});