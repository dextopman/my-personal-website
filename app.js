var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var rateLimit = require('express-rate-limit');

var app = express();
var server = http.createServer(app);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100 
});
var db = new sqlite3.Database('./users.db');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname));
app.use(helmet());
app.use(limiter);

db.run('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT,number INTEGER, message TEXT)', (err) => {
    if (err) {
        return console.error(err.message);
    }});

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, 'index.html'));
});


// CREATE 
app.post('/contact', function(req,res){
    db.run('INSERT INTO users(name, email, number, message) VALUES(?, ?, ?, ?)', [req.body.name, req.body.email, req.body.number, req.body.message], function(err) {
        if (err) {
            console.log(err.message);
            return res.status(500).send("Error adding user.");
        }
        console.log("New user added");
        res.send("Thank you for contacting me. I will get back to you soon!");
    });
});

// READ (get all users)
app.get('/users', function(req, res) {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.log(err.message);
            return res.status(500).send("Error fetching users.");
        }
        res.json(rows);
    });
});

// UPDATE (update user by id)
app.put('/users/:id', function(req, res) {
    const { name, email, number, message } = req.body;
    db.run('UPDATE users SET name = ?, email = ?, number = ?, message = ? WHERE id = ?', [name, email, number, message, req.params.id], function(err) {
        if (err) {
            console.log(err.message);
            return res.status(500).send("Error updating user.");
        }
        if (this.changes === 0) {
            return res.status(404).send("User not found.");
        }
        res.send("User updated successfully.");
    });
});

// DELETE (delete user by id)
app.delete('/users/:id', function(req, res) {
    db.run('DELETE FROM users WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            console.log(err.message);
            return res.status(500).send("Error deleting user.");
        }
        if (this.changes === 0) {
            return res.status(404).send("User not found.");
        }
        res.send("User deleted successfully.");
    });
});

app.get(('/close', function(req,res){
    db.close((err) => {
        if (err) {
            res.send("Error closing the database connection.");
            return console.error(err.message);
        }
        console.log('Close the database connection.');
        res.send("Database connection closed.");
    });
}));

server.listen(3000, function() {
    console.log('Server is running on http://localhost:3000');
});