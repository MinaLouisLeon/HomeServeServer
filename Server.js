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

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString : process.env.DATABASE_URL,
//     ssl: true,
//   }
// })


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
    res.json(data);
  })
})


app.post('/toggle-sublight',async (req,res) => {
  console.log(req.body)
  await db("sublights").where('id',req.body.id)
  .update({'status':req.body.sub_light_status,'icon_status':req.body.sub_light_iconStatus})
  res.json(Math.floor(Math.random()*10));
})

app.post('/fetch-sublight-settings',(req,res) => {
  db.select('*').from('sublights').where('id',req.body.id).then((data)=>{
    res.json(data)
  })
})

app.post('/setChecked',async (req,res) => {
  console.log(req.body)
  await db("sublights").where('id',req.body.id).update('enable',req.body.enable);
  res.json(Math.floor(Math.random()*10));
})

app.post('/subitem-name',async (req,res) => {
  console.log(req.body)
  await db("sublights").where('id',req.body.id).update('sub_light_item',req.body.sub_light_item);
  res.json(Math.floor(Math.random()*10));
})

app.listen(process.env.PORT || 3000);

