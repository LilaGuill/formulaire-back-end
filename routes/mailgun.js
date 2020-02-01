const express = require("express");
const router = express.Router();
const mailgun = require("mailgun-js");
require("dotenv").config();
const cors = require("cors");
router.use(cors());

var corsOptions = {
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.post("/send", cors(corsOptions), (req, res) => {
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

module.exports = router;
