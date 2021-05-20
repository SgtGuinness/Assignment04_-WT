const express = require('express')
const app = express()
const port=5000
const bcrypt=require('bcrypt')

const users=[]
//Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'))
app.use('/img',express.static(__dirname+'public/img'))
app.use('/js',express.static(__dirname+'public/js'))


app.set('view-engine','ejs')
app.use(express.urlencoded({extended:false}))
app.get('/',(req, res) =>{
    res.render ('index.ejs')

} )
app.get('/login',(req,res)=>{
    res.render ('login.ejs')

})

app.get('/register',(req,res)=>{
    res.render ('register.ejs')
})
app.post('/register',(req,res)=>{
    req.body.email
    
})
app.listen(5000)