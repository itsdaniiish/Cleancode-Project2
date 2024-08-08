const http = require("http");
const url = require("url");
const cors = require("cors");
const express = require("express");
const { sendEmail } = require("./email");

const app = express();

app.use(cors());
app.use(express.json());

app.post('/send-email', (req, res) => {
  const { from, to, subject, text } = req.body;
  sendEmail(from, to, subject, text, (error, info) => {
    if (error) {
      res.status(500).json({ message: 'Failed to send email' });
    } else {
      res.status(200).json({ message: info });
    }
  });
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

const server = http.createServer(app);

server.listen(3100, () => {
  console.log('Server started on port 3100');
});
