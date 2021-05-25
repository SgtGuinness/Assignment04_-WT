const express = require('express')
const app = express()
const port=5000
const bcrypt=require('bcrypt')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Usr = require('./model/user.js')
const Task = require('./model/task.js')

var Log = false

//Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'))
app.use('/img',express.static(__dirname+'public/img'))
app.use('/js',express.static(__dirname+'public/js'))


app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

var url = 'mongodb://localhost:27017/user_db';
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true});

var db = mongoose.connection;

const User = require('./model/user');

app.get('/login',(req,res)=>{
    res.render ('login.ejs')
})


app.get('/login',(req,res)=>{
    res.render ('login.ejs')
})

// gat all tasks from the database
  app.get('/api/task', function(req, res) {
    Task.find(function(err, tasks) {
      if (err) { res.send(err)}
      res.json(tasks);
    });
  });

  // create task and send back all task after creation
  app.post('/api/task', function(req, res) {
    console.log("test");
    Task.create({
            title : req.body.title,
            description : req.body.description,
            author : req.body.author,
            done : false
    }, function(err, task) {
        if (err) {res.send(err);}
        Task.find(function(err, tasks) {
          if (err) {res.send(err)}
          res.json(tasks);
        });
      });
    });

    // delete a task
  app.delete('/api/tasks/:task_id', function(req, res) {
    Task.remove({
      _id : req.params.task_id
      }, function(err, task) {
        if (err)
          res.send(err);
        task.find(function(err, tasks) {
          if (err)  {res.send(err)}
          res.json(tasks);
        });
      });
  });

app.post('/login',  (req, res) => {
  mongoose.connect(url, function (err) {
    if(err) throw err;
    User.find({username : req.body.username, password : req.body.password},
      function (err, user) {
        if (err) { throw err; }
        if (user.length === 1) {

          return res.status(200).json({
            status : 'success',
            data : user
          })
        } else {
          return res.status(200).json({
                    status: 'fail',
                    message: 'Login Failed'
            })
        }
      }
    )
  });
})

app.get('/register',(req,res)=>{
    res.render ('register.ejs')
})
app.post('/register',(req,res)=>{
    console.log('adding user');
    var usrData = new User(req.body);
    usrData.save().then( result => {
        res.redirect('/login');
    }).catch(err => {
        console.log('could not save');
        res.status(400).send("Unable to save data");
    });

})

app.get('*', function(req, res) {
  if (Log == false) {
    res.render ('login.ejs')
  } else {
    res.sendFile('./public/index.html');
  }
    });

app.listen(5000)
