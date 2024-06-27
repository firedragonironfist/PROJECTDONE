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
    const {
      Freigabetyp,
      Beschreibung,
      Jetzt,
      Startort,
      zielort,
      datum,
      anzahl,
      quadratmeter,
      umzugArt,
      kostentraeger,
      name,
      email,
      message,
    } = req.body;
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "firedragonironfist998@gmail.com",
        pass: "aqdwmmclfylmxcem",
      },
    });
    
    let emailText = '';

    if (Jetzt === 'Umzug') {
      emailText = `Jetzt: ${Jetzt}\nStartort: ${Startort}\nZielort: ${zielort}\nDatum: ${datum}\nAnzahl: ${anzahl}\nQuadratmeter: ${quadratmeter}\nUmzugArt: ${umzugArt}\nKostentraeger: ${kostentraeger}\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    } else if (Jetzt === 'Entrumpelung') {
      emailText = `Jetzt: ${Jetzt}\nFreigabetyp: ${Freigabetyp}\nBeschreibung: ${Beschreibung}\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    }

    const mailOptions = {
      from: "firedragonironfist998@gmail.com",
      to: email,
      subject: "Multi-Step Form Submission",
      text: emailText,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, error: error.toString() });
      }
      res.status(200).json({ success: true, info });
    });
  });
  
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });