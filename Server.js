const express = require('express');
const bodyparser = require('body-parser');
const knex = require('knex');
const cors = require('cors');
const { json } = require('body-parser');
var mqtt = require('mqtt');
const app = express();
app.use(cors());
/*const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '3694',
      database : 'borg_el_arab' 
    }
});*/

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
})


app.use(bodyparser.json())

app.get('/lights',(req,res) => {
  console.log("testing connectiong to server")
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

app.post('/changingstatus')

app.listen(process.env.PORT || 3000);

