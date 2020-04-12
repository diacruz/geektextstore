
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const router = express.Router();
const MONGOURL = 'mongodb+srv://geektext:geektextstore@geektext-ryapa.mongodb.net/geektext?retryWrites=true&w=majority'

mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  
    console.log('Mongoose is connected!!!');
});
 
const Schema = mongoose.Schema
const BookSchema = new Schema(
    {
        _id: Schema.Types.ObjectId,
        title: String,
        isbn: String,
        pageCount: Number,
        publishedDate: Date,
        thumbnailUrl: String,
        longDescription: String,
        status: String,
        authors: Array,
        categories: Array,
        price: Number,
        dummyrating: Number
    }
);

//BookSchema.add({dummyrating: Number});
BookSchema.set('collection', 'books');
const Book = mongoose.model('geektext', BookSchema);

app.use("/", router); 

app.get('/book', (req, res) => {
    console.log("Querying");
    Book.find({ })
        .then ((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.get('/bruh', (req, res) => {

    var data;
///
    Book.find({})
        .then((d) => {
            data = JSON.parse(JSON.stringify(d));
            console.log("success");
///
            data.forEach(element => {
                var amount = Math.round((Math.random() * 5) * 10) / 10;
                console.log(amount);
                Book.findByIdAndUpdate({"_id": element._id}, {"dummyrating": amount})
                    .then(() => {
                        console.log("Book with id: " + element._id + " has dummyrating: " + amount);
                    });
            });
///
///
        });
    
    //Book.updateMany({}, {$set: {"dummyrating": 0}})
    //.then((data) => {
    //    console.log(data);
    //    console.log("Success");
    //});
});//

app.listen(PORT, console.log(`Server is starting at ${PORT}`));

