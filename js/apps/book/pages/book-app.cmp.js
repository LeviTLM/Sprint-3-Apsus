import { bookService } from '../services/book-service.js'
import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import { eventBus } from '../services/eventBus-service.js'
import bookAdd from '../cmps/book-add.cmp.js'

export default {
    template: `
    
<section v-if="books" class="book-app">
   <h1>Books For Sale</h1>
<book-filter @filtered="filterBook"/>
<book-add  @addNewBook="addNewBook"/>
<book-list @removed="removeBook" @selected="selectBook" :books="booksToDisplay"/>
<book-edit @saved="saveBook"/>
<!-- <book-details v-if="selectedBook" @close="selectedBook = null"
  :book="selectedBook"/>     -->
</section>
    `,

    data() {
        return {
            // books: bookService.query(),
            books: null,
            selectedBook: null,
            filterBy: null,
        }
    },
    methods: {
        removeBook(id) {
            bookService
                .remove(id)
                .then(() => {
                    console.log('Deleted successfully')
                    const idx = this.books.findIndex(book => book.id === id)
                    this.books.splice(idx, 1)
                    eventBus.emit('show-msg', { txt: 'Deleted successfully', type: 'success' })
                })
                .catch(err => {
                    console.log(err)
                    eventBus.emit('show-msg', { txt: 'Error - try again later', type: 'error' })
                })
        },

        selectBook(book) {
            this.selectedBook = book
        },
        saveBook(book) {
            this.books.push(book)
        },
        filterBook(filterBy) {
            this.filterBy = filterBy
        },
        addNewBook(newBook){
            bookService.addGoogleBook(newBook)
            this.books.unshift(newBook)
        }
    },
    computed: {
        booksToDisplay() {
            if (!this.filterBy) return this.books
            const regex = new RegExp(this.filterBy.title, 'i')
            return this.books.filter(book => regex.test(book.title))
            // return this.books
        },
    },
    components: {
        bookList,
        bookFilter,
        bookAdd,
    },
    created() {
        bookService.query().then(books => (this.books = books))
    },
}
