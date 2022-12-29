const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user:"root",
    password:"@Aisyah123",
    database:"jcwd2302_starbucks"
});

db.connect((err)=>{
    if(err) return console.log('Error' + err.message)
    console.log('Connected to Database')
})

module.exports = db