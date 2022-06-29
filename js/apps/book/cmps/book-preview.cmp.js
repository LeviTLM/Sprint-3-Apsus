export default {
    props: ['book'],

    template: `
<p>Title: {{book.title}}</p>
<p v-bind:class="priceColor">Price: {{book.listPrice.amount}}</p>
<p v-bind:class="isOnSale">{{isOnSale}}</p>

    `,

    computed: {
        getCurrency() {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            })

            formatter.format(2500)
        },
        priceColor() {
            return { low: this.book.listPrice.amount < 20, high: this.book.listPrice.amount > 150 }
        },

        isOnSale() {
            if (this.book.listPrice.isOnSale) return 'Sale'
        },
    },
}
