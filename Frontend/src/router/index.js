import { createWebHistory, createRouter } from "vue-router";
import viewHome from "/src/components/viewHome.vue";
import viewLogin from "/src/components/viewLogin.vue";
import viewRegister from "/src/components/viewRegister.vue";
// lazy-loaded
const viewPlayers = () => import("/src/components/viewPlayers.vue")
const viewAddPlayer = () => import("/src/components/viewAddPlayer.vue")
const viewPlayerDetail = () => import("/src/components/viewPlayerDetail.vue")
const viewContact = () => import("/src/components/viewContact.vue")
const viewProfile = () => import("/src/components/viewProfile.vue")
const BoardAdmin = () => import("/src/components/BoardAdmin.vue")
const BoardModerator = () => import("/src/components/BoardModerator.vue")
const BoardUser = () => import("/src/components/BoardUser.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: viewHome
  },
  {
    path: "/home",
    component: viewHome
  },
  {
    path: "/login",
    component: viewLogin,
  },
  {
    path: "/register",
    component: viewRegister,
  },
  {
    path: "/players",
    name: "players",
    // lazy-loaded
    component: viewPlayers,
  },
  {
    path: "/add",
    name: "add",
    // lazy-loaded
    component: viewAddPlayer,
  },
  {
    path: "/players/:id",
    name: "player-details",
    //lazy-loaded
    component: viewPlayerDetail,
  },
  {
    path: "/contact",
    name: "contact",
    // lazy-loaded
    component: viewContact,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: viewProfile,
  },
  {
    path: "/admin",
    name: "admin",
    // lazy-loaded
    component: BoardAdmin,
  },
  {
    path: "/mod",
    name: "moderator",
    // lazy-loaded
    component: BoardModerator,
  },
  {
    path: "/user",
    name: "user",
    // lazy-loaded
    component: BoardUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register', '/home', '/contact']; /*/players + /add should be removed*/
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
   next('/login');
  } else {
    next();
  }
});

export default router;
