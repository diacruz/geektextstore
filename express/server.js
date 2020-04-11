const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const router = express.Router();
const MONGOURL = 'mongodb+srv://geektext:geektextstore@geektext-ryapa.mongodb.net/test?retryWrites=true&w=majority'


mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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
        categories: Array
    }
);
BookSchema.set('collection', 'geektext');
const Book = mongoose.model('geektext', BookSchema);

app.use("/", router); 
 
app.get('/book', (req, res) => {
    console.log("Querying");
    Book.find({ })
        .then ((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

app.listen(PORT, console.log(`Server is starting at ${PORT}`));