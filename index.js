const express = require("express");
const app = express();
const middlewareFormidable = require("express-formidable");
const mailgun = require("mailgun-js");
const cors = require("cors");

require("dotenv").config();
app.use(middlewareFormidable());
app.use(cors());

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "https://keen-archimedes-55635e.netlify.com/",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/send", (req, res) => {
  try {
    const DOMAIN = process.env.DOMAIN;
    const mg = mailgun({
      apiKey: process.env.APIKEY,
      domain: DOMAIN
    });
    const data = {
      from: "Mailgun Sandbox <postmaster@" + DOMAIN + ">",
      to: "lila.guillermic@gmail.com",
      subject: "MailGun - Nouveau message",
      text: `subject: ${req.fields.subject}
       from: ${req.fields.name}
       message: ${req.fields.message}
       email: ${req.fields.email} `
    };

    mg.messages().send(data, function(error, body) {
      // console.log(body);
    });
    res.send("message envoyé");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT, (req, res) => {
  console.log("server started");
});
