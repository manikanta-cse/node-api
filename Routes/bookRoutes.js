/**
 * Created by kattamum on 11/3/2015.
 */

var express=require('express');


var routes = function (Book) {


    //routing
    var bookRouter=express.Router();

    var bookController=require('../controllers/bookController')(Book);

    bookRouter.route('/')
        .post(bookController.post)

        .get(bookController.get);



    bookRouter.use('/:bookId', function (req,resp,next) {
        Book.findById(req.params.bookId, function (err,book) {
            if(err)
                resp.status(500).send(err);
            else if(book)
            {
                req.book=book;
                next();
            }
            else
            {
                resp.status(404).send('no book found');
            }

        });

    });

    bookRouter.route('/:bookId').get(function (req,resp) {

        var returnBook=req.book.toJSON();

        returnBook.links={};
        var newLink='http://' + req.headers.host + '/api/books/?genre='+returnBook.genre;
        returnBook.links.FilterByThisGenre=newLink.replace(' ','%20');
        resp.json(returnBook);

    })

        .put(function (req,resp) {          



                book.title=req.body.title;
                book.author=req.body.author;
                book.genre=req.body.genre;
                book.read=req.body.read;
                book.save(function (err) {
                    if(err)
                        resp.status(500).send(err);
                    else
                        resp.json(req.book);
                });


         

        })

        .patch(function (req, resp) {

            if(req.body._id)
            delete req.body._id;

            for(var p in req.body)
            {
                req.book[p]=req.body[p];
            }

            req.book.save(function (err) {
                if(err)
                    resp.status(500).send(err);
                else
                    resp.json(req.book);
            });

        })
    
        .delete(function (req,resp) {
            req.book.remove(function (err) {
                if(err)
                    resp.status(500).send(err);
                else
                    resp.status(204).send('Removed');
            });
        });



    return bookRouter;

};

module.exports=routes;