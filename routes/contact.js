require("dotenv").config();

var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");

/*GET contact page*/
router.get("/", function(req, res, next) {
  res.render("partials/contact");
});

router.post("/send", function(req, res, next) {
  var output = `
    <p>You have a new message</p>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.firstName} ${req.body.lastName}</li>
      <li>Email: ${req.body.email}</li>
      <li>Message: ${req.body.message}</li>
    </ul>
  `;
  
  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MY_EMAIL, 
      pass: process.env.MY_PASS
    }
  });
  
  var mailOptions = {
    from: `Contact <${process.env.MY_EMAIL}>`,
    to: process.env.MY_EMAIL,
    subject: 'Website Submission',
    html: output
  };
  
 transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
        console.log(error);
        res.redirect('/');
    } else {
        console.log('Message sent');
        res.redirect('/');
    }
  });
});

module.exports = router;