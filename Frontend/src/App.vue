<template>
  <div id="app">

    <nav class="nav">
      <v-tabs
      v-model="tab"
      align-tabs="center"
      color="deep-purple-accent-4"
    >
      <v-tab :value="1">
        <router-link to="/home">
            Home
          </router-link>
      </v-tab>
      <v-tab :value="2" v-if="showAdminBoard">
        <router-link to="/admin" >Admin Board</router-link>
      </v-tab>
      <v-tab :value="3" v-if="showModeratorBoard">
        <router-link to="/mod" >Moderator Board</router-link>
      </v-tab>
      <v-tab :value="4" v-if="currentUser">
        <router-link to="/user">User</router-link>
      </v-tab>
      <v-tab :value="5" v-if="!currentUser">
        <router-link to="/register">
            Sign Up
        </router-link>
      </v-tab>
      <v-tab :value="6" v-if="!currentUser">
        <router-link to="/login">
            Login
          </router-link>
      </v-tab>
      <v-tab :value="7" v-if="currentUser">
        <router-link to="/profile">
          {{ currentUser.username }}
        </router-link>
        <a @click.prevent="logOut">
            LogOut
        </a>
      </v-tab>
    </v-tabs>

      <!-- <a href="/">Football Database</a>
      <div>
        <li>
          <router-link to="/home">
            Home
          </router-link>
        </li>
        <li v-if="showAdminBoard">
          <router-link to="/admin" >Admin Board</router-link>
        </li>
        <li v-if="showModeratorBoard">
          <router-link to="/mod" >Moderator Board</router-link>
        </li>
        <li>
          <router-link v-if="currentUser" to="/user">User</router-link>
        </li>
      </div> -->

      <!-- <div v-if="!currentUser">
        <li>
          <router-link to="/register">
            Sign Up
          </router-link>
        </li>
        <li>
          <router-link to="/login">
            Login
          </router-link>
        </li>
      </div> -->

      <!-- <div v-if="currentUser">
        <li>
          <router-link to="/profile">
            {{ currentUser.username }}
          </router-link>
        </li>
        <li>
          <a @click.prevent="logOut">
            LogOut
          </a>
        </li>
      </div> -->
    </nav>

    <div class="container">
      <viewHeader />
      <router-view />
    </div>
  </div>
</template>

<script>
import viewHeader from "/src/components/viewHeader.vue";
export default {
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
    }
  },
  components: {
    viewHeader
  }
};
</script>

<style scoped>
</style>
