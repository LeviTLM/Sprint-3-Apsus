export default {
    props: ['mails'],
    template: `
 <section v-if="mails" class="mail-menu">
<button @click="onCompose">
    <span class="envelope">Compose</span>
</button>
<router-link to="/mail">
    <div class="mail-menu-container">
<div @click="box('inbox')" :class="{selectedBox:currBox === 'inbox'}">Inbox</div>
<div @click="box('sent')" :class="{selectedBox:currBox === 'sent'}">Sent</div>
<div @click="box('starred'" :class="{selectedBox:currBox === 'starred'}">Starred</div>
<div @click="box('read')" :class="{selectedBox:currBox === 'read'}">Read</div>
<!-- <div @click="box></div> -->




    </div>
 </section>
`,
    data() {
        return {
            currBox: 'inbox',
            sort: 'date',
        }
    },
    created() {},
    methods: {
        box(box) {
            this.currBox = box
            this.$emit('mailBoxed', this.currBox)
        },

        setSort() {
            this.$emit('sort', this.sort)
        },

        onCompose() {
            this.$emit('compose')
        },
    },
    computed: {
        unreadCount() {
            var count = 0
            this.mails.forEach(mail => {
                count += mail.isRead ? 0 : 1
            })
            return count
        },
    },
    unmounted() {},
}
