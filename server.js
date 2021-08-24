const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = express();
server.use(cors());
const booksModel = require('./modules/mongooseBooks.js');
server.use(express.json());

mongoose.connect('mongodb://localhost:27017/book', {useNewUrlParser: true, useUnifiedTopology: true});


server.get('/books',handleBooksData);
server.post('/addbooks',handleAddingData);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

function handleBooksData(req,res) {
  console.log('inside handler func')
  let userEmail = req.query.email;
  booksModel.find({email:userEmail},function(error,bookInfo){
      if(error) {
          console.log('error in getting the data')
      } else {
          // console.log(bookInfo);
          res.send(bookInfo)
      }
  })
}

async function handleAddingData(req,res) {

  let { title, description, email } = req.body;

  await booksModel.create({title, description, email})

    booksModel.find({email},function(error,bookInfo){
      if(error) {
          console.log('error in getting the data')
      } else {
          console.log(bookInfo);
          res.send(bookInfo)
      }
      console.log(bookInfo);
  })

  }





server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
});