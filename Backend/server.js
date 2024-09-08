const express = require("express");
const cors = require("cors");
const nodemailer = require('nodemailer');  //for send e-mail

const app = express();

var corsOptions = {
  origin: "http://localhost:8082"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//database
const db = require("./app/models");
const Role = db.role;

 db.sequelize.sync()
   .then(() => {
     console.log("Synced db.");
   })
   .catch((err) => {
     console.log("Failed to sync db: " + err.message);
   });

//  db.sequelize.sync({force: true}).then(() => {  //for development
//    console.log('Drop and Resync Db');
//    initial();
//  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Football Database!" });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/player.routes')(app);

// E-Mail Transporter konfigurieren for send email
let transporter = nodemailer.createTransport({
  host: 'mail.gmx.net', //SMTP Adress, change when changing sender mail below
  port: 587,
  secure: false, // true for 465, false for other Ports
  auth: {
      user: 'Lukas.Kirchberg@gmx.net', //mail from which the server sends the form data
      pass: 'Physiofluki597',
  },
});

//for send email
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // E-Mail Optionen
  let mailOptions = {
      from: 'lukas.kirchberg@gmx.net',
      to: 'lukas.kirchberg@gmx.net', //matching the sender email is possible
      subject: 'Contact Form Message',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // E-Mail senden
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error while sending email:', error);
          return res.status(500).send(error.toString());
      }
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent: ' + info.response);
  });
});


// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
