import axios from 'axios'

class ApiError extends Error {
    constructor(apiErrorData) {
        super(apiErrorData.message)
        this.code = apiErrorData.code
    }
}

const userIsValid = true

const currentUserId = userIsValid
    ? '5e92460d34ca19f28cf60c7d'
    : '5e92460d34ca19f28cf60000'

class User {
    constructor(model = {}) {
        this.id = model._id || null
        this.name = model.name || '??'
        this.nickname = model.nickname || '??'
        this.email = model.email || '??'
        this.pwdHash = model.pwdHash || '??'
        this.purchases = model.purchases || '??'
        this.profilePicUrl = model.profilePicUrl || '??'
    }

    async getPurchaseOfBook(volId) {
        try {
            const x = await axios.get(`/users/${this.id}/purchase/${volId}`)
            console.log('api User.getPurchaseOfBook', x)
            return new BookPurchase(this.id, volId, x.data)
        } catch (err) {
            console.error('api User.getPurchaseOfBook', err)
            throw new ApiError(err.response.data)
        }
    }
}

export const ReviewSignedAs = {
    anonymous: 'anonymous',
    nickname: 'nickname',
    fullname: 'fullname',
}

class Review {
    constructor(model = {}) {
        this.signedAs = model.signedAs || ReviewSignedAs.fullname
        this.comment = model.comment || ''
        this.rating = model.rating || 0
    }
}

class BookPurchase {
    constructor(userId, volId, model = {}) {
        this.userId = userId
        this.volId = volId
        this.purchased = model.purchased
        this.hasReview = !!model.review
        this.review = new Review(model.review || {})
        this.reviewChanges = null
    }

    setReview(signedAs, comment, rating) {
        this.reviewChanges = new Review({ signedAs, comment, rating })
    }

    async saveChanges() {
        try {
            if (!this.reviewChanges) return
            const x = await axios.put(
                `/users/${this.userId}/purchase/${this.volId}`,
                {
                    review: this.reviewChanges,
                }
            )
            console.log('api BookPurchase.saveChanges', x)
            return new BookPurchase(this.userId, this.volId, x.data)
        } catch (err) {
            console.error('api BookPurchase.saveChanges', err)
            throw new ApiError(err.response.data)
        }
    }
}

class Book {
    constructor(model = {}) {
        this.id = model._id || 0
        this.title = model.title
        this.authors = model.authors || []
        this.thumbnail = model.thumbnailUrl
    }
}

const getCurrentUser = async () => {
    try {
        const x = await axios.get(`/users/${currentUserId}`)
        console.log('api getUser', x)
        return new User(x.data)
    } catch (err) {
        console.error('api getUser', err)
        throw new ApiError(err.response.data)
    }
}

const getBookById = async (volId) => {
    try {
        const x = await axios.get(`/books/${volId}`)
        console.log('api getBookById', x)
        return new Book(x.data)
    } catch (err) {
        console.error('api getBookById', err)
        throw new ApiError(err.response.data)
    }
}

export default {
    getCurrentUser,
    // getBooks,
    getBookById,
}
