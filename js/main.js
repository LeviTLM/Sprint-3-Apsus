import { router } from './routes.js'
import appHeader from './cmps/app-header.cmp.js'
import appFooter from './cmps/app-footer.cmp.js'

const options = {
    app: '#app',
    router,
    template: `
    <section> 
       
        <app-header />
        <router-view />
    </section>
    <app-footer />
     `,

    components: {
        appHeader,
        appFooter
        
    },
}

Vue.createApp(options).use(router).mount('#app')

// app.use(router)
