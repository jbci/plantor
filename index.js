const express = require('express')
const app = express()

var fs = require("fs");
var file = "sensor_readings";
var exists = fs.existsSync(file);
if(!exists) {
 console.log("Creating DB file.");
 fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

//app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('public'))
app.set('view engine','pug')

app.get("/data",function(req,res){
   let data = db.all('SELECT * FROM sensor_1', function (err, rows) {
     res.send(rows);
    });
  });

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
