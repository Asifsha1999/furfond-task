const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './content.json';

// fetch
app.get('/api/content', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

// update
app.post('/api/content', (req, res) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
  res.json({ message: "Updated successfully!" });
});

app.listen(5000, () => console.log("Server running on port 5000"));