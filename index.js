const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const ejs = require('ejs');
const haikus = require('./haikus.json');
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let notes = [];
const notesPath = path.join(__dirname, 'notes.json');

function loadNotes() {
  try {
    const data = fs.readFileSync(notesPath, 'utf8');
    const parsedNotes = JSON.parse(data);
    notes = Array.isArray(parsedNotes) ? parsedNotes : [];
  } catch (err) {
    notes = [];
  }
}

function saveNotes() {
  fs.writeFileSync(notesPath, JSON.stringify(notes, null, 2));
}

loadNotes();

app.get('/', (req, res) => {
  res.render('index', { haikus: haikus });
});

app.get('/notes', (req, res) => {
  res.render('notes', { notes: notes });
});

app.get('/notes/new', (req, res) => {
  res.render('new_note');
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
  notes.push({ id, title, content });
  saveNotes();
  res.redirect('/notes');
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please stop the existing process or set a different PORT.`);
    process.exit(1);
  }

  throw err;
});
