/**
 * Created by kattamum on 11/3/2015.
 */

var bookController= function (Book) {

    var post= function (req,resp) {
        var book=new Book(req.body);

        if(!req.body.title)
        {
            resp.status(400);
            resp.send('Title require');
        }
        else
        {
            book.save();
            console.log(book);
            resp.status(201);
            resp.send(book);
        }


    };


    var get=function (req,resp) {

        //filter
        var query={};

        if(req.query.genre)
        {
            query.genre=req.query.genre;
        }
        Book.find(query,function (error,books) {
            if(error)
                resp.status(500).send(error);
            else

            var returnBooks=[];
            books.forEach(function (elem,index,array) {

                var newBook=elem.toJSON();
                newBook.links={};
                newBook.links.self='http://' + req.headers.host + '/api/books/'+ newBook._id;
                returnBooks.push(newBook);

            });

            resp.json(returnBooks);
        });
    };


    return {post:post,get:get };

};


module.exports=bookController;