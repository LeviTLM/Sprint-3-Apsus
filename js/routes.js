import homePage from './pages/app-home.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage,
    },

    // {
    //     path: '/',
    //     component: mailApp,
    // },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory(),
})
