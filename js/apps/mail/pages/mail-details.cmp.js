import { mailService } from '../services/mail.services.js'
import { eventBus } from '../../../services/eventBus-service.js'

export default {
    name: 'mail-details',
    template: `
<section v-if="mail" class="mail-details"></section>
<div class="details-header"></div>
<div class="mail-details"></div>
<button @click="deleteMail" title="Delete">
</button>


   
`,
    data() {
        return {
            mail: null,
            nextMailId: null,
            previousMailId: null,
        }
    },
    created() {
        const { mailId: mailId } = this.$route.params
        mailService.getMailById(mailId).then(mail => {
            this.mail = mail
            mailService.editAndSave(this.mail, 'isRead', true).then(() => {
                eventBus.$emit('savedMail')
            })
        })
    },
    methods: {
        markAs() {
            const val = this.mail.isRead ? false : true
            mailService.editAndSave(this.mail, 'isRead', val).then(() => {
                eventBus.$emit('savedMail')
            })
        },

        starMail() {
            const val = this.mail.isStarted ? false : true
            mailService.editAndSave(this.mail, 'isRead', val).then(() => {
                eventBus.$emit('savedMail')
            })
        },

        deleteMail() {
            eventBus.$emit('delete', this.mail.id)
            this.$router.push('/mail')
        },

        goToNext() {
            this.$router.push('/mail/details/' + this.nextMailId)
        },

        goToPrev() {
            this.$router.push('/mail/details/' + this.previousMailId)
        },

        closeDetails() {
            this.$router.push('/mail')
        },

        saveNote() {
            var msg = JSON.stringify(this.mail)
            this.$router.push(`/keep.notefrommail/${msg}`)
        },
    },
    computed: {
        contactToShow() {
            if (!this.mail.to && this.mail.isDraft) return ''
            return this.mail.to ? mailService.getUser().fullname : mailService.nameToShow(this.mail)
        },

        mailFrom() {
            return this.mail.to || this.mail.isDraft ? mailService.getUser().email : this.mail.from
        },
        mailTo() {
            if (this.mail.to && this.mail.isDraft) return ''
            return this.mail.to ? this.mail.to : 'Me'
        },

        dateToShow() {
            var date
            if (this.mail.sentAt) date = new Date(this.mail.sentAt)
            else if (this.mail.recievedAt) date = new Date(this.mail.recievedAt)
            return `${date}`.substring(4, 21)
        },
    },
    watch: {
        '$route.params.mailId': {
            handler() {
                const { mailId: mailId } = this.$route.params
                mailService.getMailById(mailId).then(mail => {
                    this.mail = mail
                    mailService.editAndSave(this.mail, 'isRead', true).then(() => {
                        eventBus.$emit('savedMail')
                    })
                })
                mailService.getMailById(mailId).then(mailId => (this.nextMailId = mailId))
                mailService.getPreviousMailId(mailId).then(mailId => (this.previousMailId = mailId))
            },
            immediate: true,
        },
    },
}
