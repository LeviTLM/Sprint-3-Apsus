import { bookService } from '../services/book.services.js'

export default {
    props: ['book'],
    template: `
    <section v-if="book" class="book-details app-main">
        <h3>Book Details:</h3>
        
        <button @click="goBack">Close</button>
        <article class="book-details-modal">
        <p>Authors: {{...book.authors}}</p>
        <p>Description: {{book.description}}</p>
         <p>Subtitles: {{book.subtitle}}</p>           <p>Publish Date: {{book.publishedDate}}</p>
        <p>Page Number: {{book.pageCount}}</p>
        <p> {{checkPageLength}}</p>
        <p>{{checkPublishedDate}}</p>

        </article>
        <!-- <img scr="https://source.unsplash.com/user/c_v_r" alt="Free unsplash image"> -->

    </section>
    `,

    data() {
        return {
            book: null,
        }
    },
    methods: {
        goBack() {
            this.$router.push('/book')
        },
    },

    created() {
        console.log(this.$route)
        const id = this.$route.params.bookId
        bookService.get(id).then(book => (this.book = book))
    },

    computed: {
        checkPageLength() {
            if (this.book.pageCount > 500) return 'Long Reading'
            if (this.book.pageCount > 200) return 'Decent Reading'
            if (this.book.pageCount < 100) return 'Light Reading'
        },
        checkPublishedDate() {
            const diff = new Date().getFullYear() - this.book.publishedDate
            if (diff > 10) return 'Veteran Book!'
            else {
                return 'New!'
            }
        },
    },

    watch: {
        '$route.params.bookId': {
            handler() {
                const id = this.$route.params.bookId
                bookService.get(id).then(book => {
                    this.book = book
                    bookService.getNextBookId(book.id).then(nextBookId => (this.nextBookId = nextBookId))
                })
            },
            immediate: true,
        },
    },
}
