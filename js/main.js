import appHeader from './cmps/app-header.cmp.js';
import { router } from './routes.js';

const options = {
    el: '#app',
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
        userMsg
    }
};

new Vue(options);