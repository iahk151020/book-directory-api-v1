const Router = require('express').Router();
const Book = require('./BookFucntions');



Router.get('/books/:title&author', (req, res) => {
    let title = req.params.title;
    let author = req.params.author;

    Book.findByTitle({title: title, author: author}, (err, book) => {
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).send(book);
        }
    })
});

Router.post('/books', (req, res) => {
    let books= req.body;
    Book.addBooks(books, err => {
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).send(`Books added`);
        }
    })
});

Router.delete('/books/:title', (req, res) => {
    let title = req.params.title;
    Book.deleteBook({title: title}, (err, book) => {
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).send(`Book with title ${book.title} is deleted`);
        }
    });
});

Router.delete('/books/:id', (req, res) => {
    let id = req.params.id;
    Book.deleteBook({_id: id}, (err, book) => {
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).send(`Book with id ${book._id} is deleted`);
        }
    })
})

Router.patch('/books/:id', (req, res) => {
    let id = req.params.id;
    let update = req.body;
    Book.updateBook({_id:id}, update, (err, book) => {
        if (err){
            return res.status(500).send(err);
        } else {
            // console.log(book);
            return res.status(200).send(`Book with id ${id} is updated`);
        }
    })
}
)

module.exports = Router;