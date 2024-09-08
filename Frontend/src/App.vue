<template>
  <v-app class="app-container">
    <!-- Animation Container -->
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
    <!-- AppBar mit Hamburger-Menü -->
    <v-app-bar
      id="nav-bar"
      app
    >
    <!-- color="#282d2f" -->
      <v-app-bar-nav-icon @click="drawer = !drawer" v-if="isMobile" />
      <v-toolbar-title class="nav-title">Football Database</v-toolbar-title>
      
      <!-- Tabs für Desktop-Ansicht -->
      <v-tabs
        v-if="!isMobile"
        v-model="tab"
        align-tabs="center"
      >
        <v-tab :value="1">
          <router-link to="/home">Home</router-link>
        </v-tab>
        <v-tab :value="2" v-if="currentUser">
          <router-link to="/players">Players</router-link>
        </v-tab>
        <v-tab :value="3" v-if="showAdminBoard">
          <router-link to="/add">Add Player</router-link>
        </v-tab>
        <v-tab :value="4" v-if="!currentUser">
          <router-link to="/contact">Contact</router-link>
        </v-tab>
        <v-tab :value="5" v-if="showAdminBoard">
          <router-link to="/admin">Admin Board</router-link>
        </v-tab>
        <v-tab :value="6" v-if="showModeratorBoard">
          <router-link to="/mod">Moderator Board</router-link>
        </v-tab>
        <v-tab :value="7" v-if="currentUser">
          <router-link to="/user">User</router-link>
        </v-tab>
        <v-tab :value="8" v-if="!currentUser">
          <router-link to="/register">Sign Up</router-link>
        </v-tab>
        <v-tab :value="9" v-if="!currentUser">
          <router-link to="/login">Login</router-link>
        </v-tab>
        <v-tab :value="10" v-if="currentUser">
          <router-link to="/profile">{{ currentUser.username }}</router-link>
        </v-tab>
        <v-tab :value="11" v-if="currentUser">
          <a @click.prevent="logOut">LogOut</a>
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <!-- Navigation Drawer für Mobile-Ansicht -->
     <v-app-bar-nav-icon v-if="isMobile" id="nav-menu-icon-container"><span id="nav-menu-icon" class="material-icons-round">menu</span></v-app-bar-nav-icon>
    <v-navigation-drawer
      id="nav-bar-mobile"
      v-if="isMobile"
      v-model="drawer"
      app
      temporary
    >
      <v-list dense>
        <v-list-item>
          <router-link to="/home">Home</router-link>
        </v-list-item>
        <v-list-item v-if="currentUser">
          <router-link to="/players">Players</router-link>
        </v-list-item>
        <v-list-item v-if="showAdminBoard">
          <router-link to="/add">Add Player</router-link>
        </v-list-item>
        <v-list-item v-if="!currentUser">
          <router-link to="/contact">Contact</router-link>
        </v-list-item>
        <v-list-item v-if="showAdminBoard">
          <router-link to="/admin">Admin Board</router-link>
        </v-list-item>
        <v-list-item v-if="showModeratorBoard">
          <router-link to="/mod">Moderator Board</router-link>
        </v-list-item>
        <v-list-item v-if="currentUser">
          <router-link to="/user">User</router-link>
        </v-list-item>
        <v-list-item v-if="!currentUser">
          <router-link to="/register">Sign Up</router-link>
        </v-list-item>
        <v-list-item v-if="!currentUser">
          <router-link to="/login">Login</router-link>
        </v-list-item>
        <v-list-item v-if="currentUser">
          <router-link to="/profile">{{ currentUser.username }}</router-link>
        </v-list-item>
        <v-list-item v-if="currentUser">
          <a @click.prevent="logOut">LogOut</a>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <viewHeader />
    <router-view />
  </v-app>
</template>

<script>
import viewHeader from "/src/components/viewHeader.vue";
export default {
  data() {
    return {
      tab: 1,
      drawer: false,
      isMobile: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser['roles']) {
        return this.currentUser['roles'].includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    checkViewport() {
      this.isMobile = window.innerWidth < 900;
    }
  },
  mounted() {
    this.checkViewport();
    window.addEventListener('resize', this.checkViewport);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkViewport);
  },
  components: {
    viewHeader
  }
};
</script>

<style scoped>
</style>
