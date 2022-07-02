import appHeader from './cmps/app-header.cmp.js'
import userMsg from './cmps/user-msg.cmp.js'
import { router } from './routes.js'

const options = {
    app: '#app',
    router,
    template: `
        <section>
            <user-msg />
            <app-header />
            <router-view />
        </section>
    `,
    components: {
        appHeader,
        userMsg,
    },
}

Vue.createApp(options).use(router).mount('#app')
