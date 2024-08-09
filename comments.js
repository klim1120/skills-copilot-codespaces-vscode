// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Read comments from file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Add headers
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Add a new comment
app.post('/comments', function (req, res) {
  var comment = req.body;
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comment));
});

// Get comments
app.get('/comments', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

// Delete all comments
app.delete('/comments', function (req, res) {
  comments = [];
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

// Start server
app.listen(3001, function () {
  console.log('Server listening on port 3001!');
});