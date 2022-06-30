import { mailService } from "../services/mail.services.js";
import { eventBus } from "../../../services/eventBus-service.js";
import mailDetails from "./mail-details.cmp.js";
import mailList from "../cmps/mail-list.cmp.js";
import mailMenu from "../cmps/mail-menu.cmp.js";


export default {
    name: "mail-app",
    template: `
    <section class="mail-app">
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
            sortBy: "date",
            filterBy: {
                str: "",
                box: "inbox",
            },
            noteToEdit: false,
            menuClose: true,
        };
    },
    created() {
        console.log();
    },
    methods: {},
    computed: {},
    components: {
        mailDetails,
        mailList,
        mailMenu,
    },
};
