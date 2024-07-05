const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();  
const port = 3000;

app.use(express.static('client'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/main.html');
});

app.get('/form', (req, res) => {
  res.sendFile(__dirname + '/client/form.html');
});

app.post("/form/submit", (req, res) => {
  const data = req.body;
  var Jetzt = data[0].Jetzt;
  var email = data[0].email;
  var firstName = data[0].firstName;
  var lastName = data[0].lastName;
  var message = data[0].message;

  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "firedragonironfist998@gmail.com",
        pass: "aqdwmmclfylmxcem",
      },
    });
    
    let emailText = '';

    if (Jetzt === 'Umzug') {
      var Stratort = data[0].Stratort;
      var zielort = data[0].zielort;
      var datum = data[0].datum;
      var anzahl = data[0].anzahl;
      var quadratmeter = data[0].quadratmeter;
      var umzugArt = data[0].umzugArt;
      var kostentraeger = data[0].kostentraeger;
      emailText = `Jetzt: ${Jetzt}\nStartort: ${Stratort}\nZielort: ${zielort}\nDatum: ${datum}\nAnzahl: ${anzahl}\nQuadratmeter: ${quadratmeter}\nUmzugArt: ${umzugArt}\nKostentraeger: ${kostentraeger}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nMessage: ${message}`;
    } else if (Jetzt === 'Entrumpelung') {
      var Freigabetyp = data[0].Freigabetyp;
      var Beschreibung = data[0].Beschreibung;
      emailText = `Jetzt: ${Jetzt}\nFreigabetyp: ${Freigabetyp}\nBeschreibung: ${Beschreibung}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nMessage: ${message}`;
    }

    const mailOptions = {
      from: "firedragonironfist998@gmail.com",
      to: email,
      subject: "Multi-Step Form Submission",
      text: emailText,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: error.toString() });
      }
      res.status(200).json({ success: true, info });
    });
  });
  
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });