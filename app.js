const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Email Server</title></head>');
    res.write('<body><h1>This is my email server</h1></body>');
    res.write('</html>');
    res.end();
})

app.post('/send-email', (req, res) => {
//   const { to, subject, text } = req.body;
    const to = "mathieu.m.girard@gmail.com"
    const subject = "test";
    const text = "test";

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mathieu.m.girard@gmail.com',
            pass: 'qrio odaj sgtk xjll',
        },
    });

    const mailOptions = {
        from: 'mathieu.m.girard+1@gmail.com',
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