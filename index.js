const express = require("express");
const middlewareFormidable = require("express-formidable");
const app = express();
app.use(middlewareFormidable());
const cors = require("cors");
app.use(cors());

const mailGun = require("./routes/mailgun");
app.use(mailGun);

app.listen(process.env.PORT, (req, res) => {
  console.log("server started");
});
