const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Email Server</title></head>');
    res.write('<body><h1>This is my email server</h1></body>');
    res.write('</html>');
    res.end();
})

app.post('/send-email', (req, res) => {
    const to = process.env.to;
    const from = process.env.from;
    const password = process.env.password
    const subject = req.body['subject'];
    const text = req.body['text'];

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: from,
            pass: password
        },
    });

    const mailOptions = {
        from,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        console.log("attempting")
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email Sent');
        }
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});