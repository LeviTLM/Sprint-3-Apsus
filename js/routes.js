import homePage from './pages/app-home.cmp.js'
import bookApp from './apps/book/pages/book-app.cmp.js'
import bookDetails from './apps/book/pages/book-details.cmp.js'
import bookEdit from './apps/book/pages/book-edit.cmp.js'
import mailApp from './apps/mail/pages/mail.app.cmp.js'
import mailDetails from './apps/mail/pages/mail-details.cmp.js'

const routes = [
    {
        path: '/',
        component: homePage,
    },

    {
        path: '/book',
        component: bookApp,
    },
    {
        path: '/book/:bookId',
        component: bookDetails,
    },
    {
        path: '/book/edit/:bookId?',
        component: bookEdit,
    },

    {
        path: '/mail',
        component: mailApp,
        childern: [
            {
                path: 'details/:mailId',
                component: mailDetails,
            },
        ],
    },
]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory(),
})
