const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose=require('mongoose')
const fs=require('fs');

mongoose.set("strictQuery",true)
mongoose.connect("mongodb+srv://vignesh:vignesh@cluster0.gyeqw0j.mongodb.net/Project").then(()=>console.log("DBConnected")).catch((err)=>console.log("ERRor"))
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
User=mongoose.model('users',new mongoose.Schema({User:String,Password:String}))
Books=mongoose.model('books',new mongoose.Schema({
   heading: { type: String, required: true },
   information: { type: String, required: true },
   frontpage: { type: String, required: true },
 }))

//User.create({"User":"Admin","Password":"12345"}).then(()=>{console.log('data added')}).catch(()=>{console.log(err)})

app.get('/books', (req, res) => {
   Books.find()
     .then((books) => {
       res.json(books);
     })
     .catch((error) => {
       res.status(500).send('Error retrieving books');
     });
 });

app.post('/books', (req, res) => {
   const { heading, information, frontpage } = req.body;
 
   const book = new Books({ heading, information, frontpage });
   book.save()
     .then(() => {
       res.status(201).send('Book added successfully');
     })
     .catch((error) => {
       res.status(500).send('Error adding book');
     });
 });



app.post('/login',async (req,res)=>{
     try{
      console.log(req.body);
      data= (await User.find({"User":req.body.User,"Password":req.body.Password}))
     //console.log(await data.json());
    
     res.send(data);

   }
     catch(err){console.log(err)}
})








app.post('/SignUp',async(req,res)=>{
   try{
      data=await User.find({User:req.body.User})
      console.log(data);
      if (data.length === 0) {
         User.create({User:req.body.User,Password:req.body.Password})
         .then(()=>{
            console.log('UserDataCreated')
            res.send('DATa Created')})
         .catch((err)=>{console.log(err)})
      }
      else{
         console.log('UserName aldready Used');
               res.send('Data Creation Failed')
            }
   }
   catch(err){console.log(err)}
})


app.listen(8000,()=>console.log('listening'))
