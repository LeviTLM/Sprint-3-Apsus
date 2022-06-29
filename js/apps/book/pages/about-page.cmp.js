import { eventBus } from '../services/eventBus-service.js'

export default {
    template: `
 <section class="about-page app-main">
    <h3>You must be waiting to have a vacation..</h3>
    <img src="/img/vacation.jpg" alt="" class="vacation-img">
    <button @click="callBus">Call the Bus</button>
 </section>

 <nav>
    <router-link to="/about/team">Team</router-link> |
    </nav>
<router-view />
`,
    data() {
        return {}
    },
    created() {},
    methods: {
        callBus() {
            console.log('calling the bus')
            eventBus.emit('show-msg', 'hi')
        },
    },
    computed: {},
    unmounted() {},
}
