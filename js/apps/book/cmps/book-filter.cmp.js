export default {
    template: `
    <section class="book-filter">
        <!-- <pre>{{filterBy}}</pre> -->
        <input placeholder="Search a book.." type="text" v-model="filterBy.title" @input="filter">
    </section>
`,
    data() {
        return {
            filterBy: {
                title: '',
                // fromPrice: 0,
                // toPrice: Infinty,
            },
        }
    },
    created() {},
    methods: {
        filter() {
            this.$emit('filtered', this.filterBy)
        },
    },
    computed: {},
    unmounted() {},
}
