// export default {
//     template: `
//  <header class="app-header">
   
//     <!-- <nav> 
//         <section> 
//             <!-- router link here when its ready -->
//                 <div class="logo">
                    // <!-- NEXT
//                 <img src="img/logo.png">
//             </div>
//             </router-link>
//         </section>
//         <section class="nav-links"></section> 
     
//       <router-link class="header-link" to ="/book">Books</router-link>
//         <!-- router link here when its ready -->
//         <!-- <h2>email</h2>
//         router link here when its ready
//         <h3>notes</h3>
//         </nav>
//     </header> --> --> -->
// `,
// }


// export default {
//     template: `
//     <nav class="navbar">
//         <div class="navbar-cotainer">
//             <ac id="navbar-logo">Appsus</a>
//             <!-- router link here when its ready -->
//          <!-- <a id="navbar-logo"><img class="main-logo"src="img/logo.png"></a> -->
//             <div class="navbar-toggle" id="mobile-menu">
//                 <span class="bar"></span>
//                 <span class="bar"></span>
//                 <span class="bar"></span>
//             </div>
//             <ul class="navbar-menu">
//                 <li class="navbar-item">
//                 <router-link class="header-link" to ="/book">Books</router-link>
//                 </li>
//                 <li class="navbar-item">
//                     <a class="navbar-links">
//                         <!-- router link here when its ready -->
//                         Email
//                     </a>
// </li>
// <li class="navbar-item">
//                     <a class="navbar-links">
//                         <!-- router link here when its ready -->
//                         Notes
//                     </a>
// </li>
//             </ul>
//         </div>
//     </nav>
//     `
// }

export default {
    template: `
    <header class="app-header">
        <nav>
            <section>
                <router-link to="/" active-class="active-link" exact title="Home Page">
                    <div class="logo">
                        <img src="img/logo.png">
                    </div>
                </router-link>
            </section>
            <section class = "nav-links">
                <router-link active-class="active" class="header-link" to="/book">Books </router-link>|
                <!-- router link here when its ready -->
                <p>Emails</p>
                <!-- router link here when its ready -->
                <p>Notes</p>
                
            </section>
        </nav>
    </header>
    `,
}