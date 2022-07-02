export default {
    template: `
        <section class="home-page app-main">

                <div class="home-header">
        
                    <h1 class="black-stroke">Appsus by R&L</h1>
            <div class="home-content">
                <div class="home-mail">
                <router-link to="/mail">
                <span class="fa fa-envelope"></span>
                <p>
                </p>
                <router-link to="/mail">Access emails here</router-link>
            </router-link>
        </div>
        <div class="home-books">
            <router-link to="/book">
                
                <span class="fa fa-book"></span>
                    <p>
                    </p>
                    <router-link to="/book">Read some books here</router-link>
                    </router-link>
                </div>
                <div class="home-keep">
                <router-link to="/keep">
                <span class="fa fa-sticky-note"></span>
                    <p>
                    </p>
                    <router-link to="/keep">Keep your notes here</router-link>
                    </router-link>
                </div>
            </div>
            </section>
            <footer class="main-footer">CoffeRights@2022</footer>
    `,
}
