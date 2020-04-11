import Books from "../BookSearch/Books"
import BookCard from '../BookSearch/BookCard'

export const bookReducer = (state, action) => {
    switch(action.type){
        case 'ADD_TO_CART':
            return [...state, {
                title: action.book.title,
                author: action.book.author,
                id: BookCard.props.id()
            }]
            case 'REMOVE_FROM_CART':
                return state.filter(book=> book.id !== action.id)
            default:
                return state
    }
}

export default bookReducer;