const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    title: String,
    description:String,
    email:String
  });

  const booksModel = mongoose.model('Books', bookSchema);
  module.exports =booksModel;


function bookData() {
    const book1 = new booksModel({
        title :'Da Vinci Code',
        description:'The Da Vinci Code is a 2003 mystery thriller novel by Dan Brown.',
        email:'tasneem.alabsi@gmail.com'
    })

    const book2 = new booksModel({
        title :'The Alchemist',
        description:'The Alchemist is a novel by Brazilian author Paulo Coelho that was first published in 1988.',
        email:'tasneem.alabsi@gmail.com'
    })

    const book3 = new booksModel({
        title :'Digital Fortress',
        description:'Digital Fortress is a techno-thriller novel written by American author Dan Brown ',
        email:'tasneem.alabsi@gmail.com'
    })
    
    book1.save();
    book2.save();
    book3.save();
}

// bookData();

// // localhost:3001/books?email=whatever
// function handleBooksData(req,res) {
//     console.log('inside handler func')
//     let userEmail = req.query.email;
//     booksModel.find({email:userEmail},function(error,bookInfo){
//         if(error) {
//             console.log('error in getting the data')
//         } else {
//             console.log(bookInfo);
//             res.send(bookInfo)
//         }
//     })
// }

// function handleAddingData(req,res) {
//     let { title, description, email } = req.body;
    

// }

