export default {
    props: ['book'],
    template: `
    <section class="review-container">   
    <form>

    </form>
    </section>
`,
    data() {
        return {
            reviewToEdit: null,
        }
    },
    created() {
        this.reviewToEdit = carService.getEmptyReview()
    },
    methods: {},
    computed: {},
    unmounted() {},
}
