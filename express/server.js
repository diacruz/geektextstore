const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 8080
const router = express.Router()

const MONGO_DATABASE = 'geektext'
const MONGOURL = `mongodb+srv://geektext:geektextstore@geektext-ryapa.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`

mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!')
})

class ApiError extends Error {
    constructor(statusCode, errorCode, msg) {
        super(msg)
        this.statusCode = statusCode
        this.errorCode = errorCode
    }
}
class UserNotFoundError extends ApiError {
    constructor() {
        super(404, 'UserNotFound', 'User not found.')
    }
}
class BookNotFoundError extends ApiError {
    constructor() {
        super(404, 'BookNotFound', 'Book not found.')
    }
}
class PurchaseNotFoundError extends ApiError {
    constructor() {
        super(404, 'PurchaseNotFound', 'Purchase not found.')
    }
}

const Schema = mongoose.Schema
const BookSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: Date,
    homeAddress: String,
    creditCard: String,
    status: String,
    authors: Array,
    categories: Array,
})
BookSchema.set('collection', 'books') // name of collection should be book not geektext
const Book = mongoose.model('books', BookSchema)

app.use('/', router)
// app.use(express.bodyParser())
app.use(express.json())

app.get('/books', (req, res) => {
    Book.find({})
        .then((books) => {
            res.json(books)
        })
        .catch((error) => {
            console.log(error)
            sendError(error, res)
        })
})
app.get('/books/:id', (req, res) => {
    // const _id = mongoose.Types.ObjectId(req.params.id)
    Book.findById(req.params.id)
        .then((book) => {
            if (!book) {
                throw new BookNotFoundError()
            }
            console.log(`get /books/${req.params.id}`, book)
            res.json(book)
        })
        .catch((error) => {
            console.log(error)
            sendError(error, res)
        })
})

// ------------------------------------------------------------------

const PurchaseSchema = new Schema({
    volId: Schema.Types.ObjectId,
    dateOfPurchase: Date,
    review: new Schema({
        signedAs: String,
        comment: String,
        rating: Number,
    }),
})
const UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    nickname: String,
    email: String,
    pwdHash: String,
    purchases: [PurchaseSchema],
    profilePicUrl: String,
})
// UserSchema.set('collection', 'user')
const User = mongoose.model('users', UserSchema)

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                throw new UserNotFoundError()
            }
            res.json(user)
        })
        .catch((error) => {
            console.log(`Error -- get /users/${req.params.id}`, error)
            sendError(error, res)
        })
})

app.get('/users/:id/purchase/:volId', (req, res) => {
    User.findById(req.params.id, 'purchases')
        .then((user) => {
            if (!user) {
                throw new UserNotFoundError()
            }
            const purchases = user.purchases || []
            const purchase = purchases.find((p) => p.volId.toString() === req.params.volId)

            const review = (purchase || {}).review || null
            res.json({
                purchased: !!purchase,
                review,
            })
        })
        .catch((error) => {
            console.log(
                `Error -- get /users/${req.params.id}/purchase/${req.params.volId}`,
                error
            )
            sendError(error, res)
        })
})

app.put('/users/:id/purchase/:volId', (req, res) => {
    User.findById(req.params.id)
        .then(async (user) => {
            if (!user) {
                throw new UserNotFoundError()
            }
            const volId = req.params.volId
            const purchases = user.purchases || []
            const purchase = purchases.find((p) => p.volId.toString() === volId)
            if (!purchase) {
                throw new PurchaseNotFoundError()
            }

            console.log('req.body --', req.body)
            // console.log('req --', req)
            purchase.review = req.body.review
            await user.save()

            res.json({
                purchased: true,
                review: purchase.review,
            })
        })
        .catch((error) => {
            console.log(
                `Error -- get /users/${req.params.id}/purchase/${req.params.volId}`,
                error
            )
            sendError(error, res)
        })
})

app.listen(PORT, console.log(`Server is starting at ${PORT}`))

function sendError(error, res) {
    if (error instanceof ApiError) {
        res.status(error.statusCode).send({
            code: error.errorCode,
            message: error.message,
        })
    } else {
        res.status(500).send({
            code: 'unknown',
            message: error.message,
        })
    }
}
