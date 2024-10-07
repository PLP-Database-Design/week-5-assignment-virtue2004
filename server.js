
const express = require('express')
const mysql = require('mysql2');
const dotenv = require('dotenv')
const app = express()


dotenv.config();


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})


db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to MySQL database as ID', db.threadId);
  });



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Question 1
app.get('/getPatients', (req, res) => {
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth  FROM patients"
    db.query(getPatients, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        res.send(data)
    })
})


//Question 2
app.get('/getProviders', (req, res) => {
    const getProviders = "SELECT provider_id, first_name, last_name, provider_specialty  FROM providers"
    db.query(getProviders, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        }
        res.send(data)
    })
})



//Question 3
app.get('/patientFirstName', (req,res) => {
    const getFirstName = "SELECT first_name, last_name, date_of_birth FROM patients ORDER BY first_name"
    db.query(getFirstName, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get Patients", err)
        }
        res.send(data)
    })
})



//Question 4
app.get('/getSpecialty', (req, res) => {
    const getSpecialty = "SELECT * FROM providers ORDER BY provider_specialty"
    db.query(getSpecialty, (err, data) => {
        if(err) {
            return res.status(400).send("Failed to get providers", err)
        } 
        res.send(data)
    })
})






// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})







