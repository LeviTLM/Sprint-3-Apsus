export default {
    template: `
    <header class="app-header">
       <div class="logo">
           <h3>Miss Books</h3>
       </div>
       <nav class="nav-bar">
       <router-link to="/">Home</router-link>|
       <router-link to="/email">Email</router-link>|                  
        <router-link to="/notes">Notes</router-link>|
       </nav>
    </header>
   `,
}
