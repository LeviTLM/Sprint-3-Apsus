import { router } from './routes.js'
import appHeader from './cmps/app-header.cmp.js'
// import { createApp } from './lib/vue.js'
const options = {
    app: '#app',
    router,
    template: `
    <h1>hey</h1>
    <section> 
        <app-header />
        <router-view />
    </section>
     `,

    components: {
        appHeader,
    },
}
Vue.createApp(options).mount(app)
// app.use(router)
