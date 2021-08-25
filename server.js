const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const server = express();
server.use(cors());
const booksModel = require('./modules/mongooseBooks.js');
server.use(express.json());

mongoose.connect(process.env.MONGO_LINK, {useNewUrlParser: true, useUnifiedTopology: true});
//'mongodb://localhost:27017/book'


server.get('/books',handleBooksData);
server.post('/addbooks',handleAddingData);
server.delete('/deletebooks/:bookID2',handleDeletingData);
server.put('/updateBook/:bookID',handleUpdatingData);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

function handleBooksData(req,res) {
  let userEmail = req.query.email;
  booksModel.find({email:userEmail},function(error,bookInfo){
      if(error) {
          console.log('error in getting the data')
      } else {
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
          res.send(bookInfo)
          console.log('hhhhhhhhhhh',bookInfo);
          console.log(typeof(bookInfo._id));
      }
  })

  }


function handleDeletingData(req,res) {
  
  let email= req.query.email;
  console.log(req.params);
  let bookID = req.params.bookID2;
  console.log(bookID);
  
  
  
  booksModel.remove({_id:bookID},(error,bookData1)=>{
      if(error) {
          console.log('error in deleteing the data',error)
          // console.log();
      } else {
          console.log('data deleted', bookData1)
          booksModel.find({email}, function (error, bookData) {
              if (error) {
                  console.log('error in getting the data')
              } else {
                  res.send(bookData)
              }
          })
      }
  })

}

  function handleUpdatingData (req,res) {

    let { title, description, email } = req.body;
    let bookID = req.params.bookID;
    booksModel.findOne({_id:bookID},(error,bookInfo) =>{
      bookInfo.email = email;
      bookInfo.title= title;
      bookInfo.description= description;

      console.log('aaaaaaaaaaaa',bookInfo)
      bookInfo.save()
      .then(()=>{
         booksModel.find({ email }, function (err, bookData) {
              if (err) {
                  console.log('error in getting the data')
              } else {
                  res.send(bookData)
              }
          })
      }).catch(error=>{
          console.log('error in saving ')
      })
  })

  }


  server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
});