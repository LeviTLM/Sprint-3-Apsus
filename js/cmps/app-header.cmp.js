export default {
    template: `
 <header class="app-header">
   
    <nav> 
        <section> 
            <router-link to="/" active-class="active-link">
                <div class="main-logo">
                <img src="img/logo.png">
            </div>
            </router-link>
        </section>
        <section class="nav-links"></section>
        <router-link active-class="active" class="header-link" to="/mail">Mail |</router-link>
        <router-link class="header-link" to="/keep"> Keep |</router-link>
        <router-link class="header-link" to="/book"> Books</router-link>
        </nav>
    </header>
`,
}
