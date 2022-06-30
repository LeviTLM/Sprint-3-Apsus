import { mailService } from '../services/mail.services.js'
import { eventBus } from '../../../services/eventBus-service.js'
import mailDetails from './mail-details.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailMenu from '../cmps/mail-menu.cmp.js'

export default {
    name: 'mail-app',
    template: `
    <section v-if="mails" class="mail-app">
<div class="mail-header">
    <div class="filter-container">
        <button class="hamburger-menu" @click.stop="toggleMenu">
            <span class="fa fa-bars"></span>
        </button>
        <!-- <mail-filter @filtered="setFilter" :box="filterBy.box" /> -->
    </div>
</div>
<div class="mail-main">
<mail-menu class="mail-menu-container" @mailBoxed="setMailBox" :mails="mails" @compose="setNewMail" @sort="setSort" :class="{'show-menu':!menuClose,'hide-menu':menuClose}" />
<mail-list />
<router-view />
<!-- <mail-add v-if="isCompose" @close="closeCompose" :mailToEdit="mailToEdit" /> -->
<button v-show="!isCompose" class="compose-button-mobile" @click="setNewMail">
<span class="fa fa-edit"></span>Compose</button>
</div>

    </section>
`,
    data() {
        return {
            mails: null,
            mailToEdit: null,
            selectMail: null,
            isCompose: true,
            sortBy: 'date',
            filterBy: {
                str: '',
                box: 'inbox',
            },
            noteToEdit: false,
            menuClose: true,
        }
    },
    created() {
        // eventBus.$on('savedMail', this.loadMails)
        // eventBus.$on('delete', this.deletMail)
        // eventBus.$on('editDraft', this.onEditDraft)
        // eventBus.$on('sort', this.setSort)
        this.loadMails()
    },
    methods: {
        loadMails() {
            mailService.query().then(mails => {
                this.sortMails(mails)
                this.mails = mails
            })
        },

        closeDetails() {
            this.selectedMail = null
        },
        setFilter(filterBy) {
            this.filterBy.str = filterBy
        },

        setMailBox(box) {
            this.filterBy.str = ''
            this.filterBy.box = box
        },

        setNewMail() {
            this.isCompose = true
        },
        onEditDraft(mail) {
            this.mailToEdit = mail
            this.setNewMail()
        },

        closeCompose() {
            this.isCompose = false
            this.mailToEdit = null
            if (this.noteToEdit) {
                this.noteToEdit = false
                this.$router.push('/mail')
            }
            this.loadMails()
        },

        deleteMailId(id) {
            mailService.getMailById(id).then(mail => {
                if (mail.removedAt)
                    mailService
                        .removeMail(id)
                        .then(() => {
                            this.sendMsg('Deleted successfully', 'success')
                            this.loadMails()
                        })
                        .catch(() => {
                            this.sendMsg('Error, Please try again', 'error')
                        })
                else
                    mailService
                        .editAndSave(mail, 'removedAt', Date.now())
                        .then(() => {
                            this.sendMsg('Moved to trash', 'success')
                            this.loadMails()
                        })
                        .catch(() => {
                            this.sendMsg('Error, Please try again', 'error')
                        })
            })
        },

        setSort(val) {
            this.sortBy = val
        },

        sortMails(mails) {
            if (this.sortBy === 'date') {
                return mails.sort((a, b) => {
                    return (b.sentAt ? b.sentAt : b.receivedAt) - (a.sentAt ? a.sentAt : a.receivedAt)
                })
            } else if (this.sortBy === 'subject') {
                mails.sort((a, b) => {
                    if (a.subject.toLowerCase() < b.subject.toLowerCase()) return -1
                    if (a.subject.toLowerCase() > b.subject.toLowerCase()) return 1
                    return 0
                })
            } else if (this.sortBy === 'body') {
                mails.sort((a, b) => {
                    if (a.body.toLowerCase() < b.body.toLowerCase()) return -1
                    if (a.body.toLowerCase() > b.body.toLowerCase()) return 1
                    return 0
                })
            }
        },

        toggleMenu() {
            this.menuClose ? (this.menuClose = false) : (this.menuClose = true)
        },
        composeNote(note) {
            this.noteToEdit = true
            var noteEdit = JSON.parse(note)
            noteEdit['type'] = 'note'
            this.mailToEdit = noteEdit
            this.setNewMail()
        },
        sendMsg(txt, type) {
            const msg = {
                txt,
                type,
            }
            eventBus.$emit('showMsg', msg)
        },

        computed: {
            mailsToShow() {
                var mailsToShow
                switch (this.filterBy.box) {
                    case 'all':
                        mailsToShow = this.mails.filter(mail => {
                            return !mail.removedAt
                        })
                        break
                    case 'sent':
                        mailsToShow = this.mails.filter(mail => {
                            return mail.to && !mail.isDraft & !mail.removedAt
                        })
                        break
                    case 'inbox':
                        mailsToShow = this.mails.filter(mail => {
                            return mail.from && !mail.removedAt
                        })
                        break
                    case 'read':
                        mailsToShow = this.mails.filter(mail => {
                            return mail.isRead && !mail.isDraft && mail.from && !mail.removedAt
                        })
                        break
                    case 'unread':
                        mailsToShow = this.mails.filter(mail => {
                            return !mail.isRead && !mail.removedAt
                        })
                        break
                    case 'drafts':
                        mailsToShow = this.mails.filter(mail => {
                            return mail.isDraft && !mail.removedAt
                        })
                        break
                    case 'starred':
                        mailsToShow = this.mails.filter(mail => {
                            return mail.isStarred
                        })
                        break
                    case 'trash':
                        mailsToShow = this.mailsToShow.filter(mail => {
                            return mail.removedAt
                        })
                        break
                }
                if (this.filterBy.str) {
                    const searchStr = this.filterBy.str.toLowerCase()
                    var filteredMails = []
                    mailsToShow.filter(mail => {
                        if (mail.to && mail.to.toLowerCase().includes(searchStr)) {
                            filteredMails.push(mail)
                            return
                        } else if (mail.from && mail.from.toLowerCase().includes(searchStr)) {
                            filteredMails.push(mail)
                            return
                        } else if (mail.subject && mail.subject.toLowerCase().includes(searchStr)) {
                            filteredMails.push(mail)
                            return
                        } else if (mail.body && mail.body.toLowerCase().includes(searchStr)) {
                            filteredMails.push(mail)
                            return
                        }
                    })
                    mailsToShow = filteredMails
                }
                this.sortMails(mailsToShow)
                return mailsToShow
            },
        },
        components: {
            mailDetails,
            mailList,
            mailMenu,
            // mailAdd,
            // mailFilter,
        },
    },
}
