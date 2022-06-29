import { router } from './routes.js'
import appHeader from './cmps/app-header.cmp.js'

// import { createApp } from './lib/vue.js'
const options = {
    app: '#app',
    router,
    template: `
    <section> 
       
        <app-header />
        <router-view />
    </section>
     `,

    components: {
        appHeader,
    },
}

Vue.createApp(options).use(router).mount('#app')

// app.use(router)
