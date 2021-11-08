const mongoose = require('mongoose');
const dotenv = require('dotenv');

//connect to the database
dotenv.config();
mongoose.connect(process.env.DBURL)
.then(() => console.log(`Connected to ${process.env.DBURL}`))
.catch(err => console.log(`Error: ${err}`));

const Schema = mongoose.Schema;
const bookSchema = new Schema({
    title: String,
    author: String,
    quantity: Number,
    publisher: String,
    Vendor: String
});

const Book = mongoose.model('books', bookSchema);

const findBook = ({title, author, quantity}, cb) => {
    Book.find(filter, (err, books) => {
        if (err){
            return cb(err, null);
        } else {
            return cb(null, books);
        }
    })
}

const addBooks = (books, cb) => {
    let bookList = [...books];
    bookList.forEach(book => {
        let newBook = new Book(book);
        newBook.save(err => {
            return cb(err || null);
        });
    });
}

const updateBook = (filter, update, cb) => {
    // console.log(filter);
    Book.findOneAndUpdate(filter, update, (err, book) => {
        if (err){
            return cb(err, null);
        } else {
            return cb(null, book);
        }
    });
}

const deleteBook = (filter, cb) => {
    Book.findOneAndDelete(filter, (err, book) => {
        if (err){
            return cb(err, null);
        } else {
            return cb(null, book);
        }
    });
}


module.exports = {
    findBook,
    addBooks,
    updateBook,
    deleteBook
}