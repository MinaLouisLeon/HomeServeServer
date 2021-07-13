const express = require('express');
const bodyparser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const { json } = require('body-parser');
var mqtt = require('mqtt');
const app = express();
app.use(cors());
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '3694',
      database : 'borg_el_arab' 
    }
});


app.use(bodyparser.json())

app.get('/lights',(req,res) => {
    db.select('*').from('lights').then((data) => {
        res.json(data)
    })
})

app.post('/sublights',(req,res) => {
  console.log(req.body)
  db.select('*').from('sublights').where('light_item',req.body.item).then((data) => {
    console.log(data);
    res.json(data);
  })
})

app.listen(3000);

