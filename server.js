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
server.delete('/deletebooks/:bookID2',handleDeletingData);

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
      }
  })

  }

//   function handleDeletingData(req,res) {
//     // console.log(req.query.catID)
//     // let email= req.query.email;

//     let bookID = req.query.bookID2;
//     console.log('the id of the object',bookID);
//     booksModel.deleteOne({_id:bookID},(error,bookData)=>{

//       if (bookID === _id){
//         res.send(bookData)
//       }
//       else {
//         console.log('error');
//       }
        
//         }
//    )



// }



// if(error) {
//   console.log('error in deleteing the data')
//   // console.log('data deleted hhhhhhh', bookData);
// } else {
//   // console.log('data deleted', bookData)
//   booksModel.find({ email }, function (err, bookData) {
//       if (err) {
//           console.log('error in getting the data')
//           // console.log('data deleted', bookData)
//       } else {
//           // console.log(bookData);
//           res.send(bookData)
//       }
//   })


function handleDeletingData(req,res) {
  // console.log(req.query.catID)
  
  let email= req.query.email;
  console.log(req.params);
  let bookID = req.params.bookID2;
  console.log(bookID);
  booksModel.remove({_id:bookID},(error,bookData1)=>{
      if(error) {
          console.log('error in deleteing the data')
      } else {
          // console.log('data deleted', bookData)
          booksModel.findById({email}, function (error, bookData) {
              if (error) {
                  console.log('error in getting the data')
              } else {
                  res.send(bookData)
              }
          })
      }
  })



}





server.listen(PORT, () => {
    console.log(`listening on PORT ${PORT}`)
});