<template>
  <v-row align="center" class="v-container px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field class="data-table-searchbar" v-model="name" label="Search by Name"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn class="search-button" size="large" elevation="12" @click="searchTitle">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="app-container mx-auto" tile>
        <v-card-title class="data-table-title">Footballplayers</v-card-title>

        <v-data-table
          :headers="headers"
          :items="footballplayers"
          disable-pagination
          :hide-default-footer="true"
          class="data-table"
          
        >
          <template v-slot:[`item.actions`]="{ item }" v-if="showAdminBoard">
            <v-icon class="me-3" @click="editFootballplayer(item.id)">
              <span class="material-icons">edit</span>
            </v-icon>
            <v-icon @click="deleteFootballplayer(item.id)">
              <span class="material-icons">delete</span>
            </v-icon>
          </template>
        </v-data-table>

        <v-card-actions class="data-table-footer" v-if="footballplayers.length > 0">
          <v-btn class="remove-button" v-if="showAdminBoard" color="error" @click="removeAllFootballplayers" elevation="12">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import GetPlayerData from '/src/services/getPlayerData.js'

export default {
    name: "viewPlayers",
    data() {
    return {
      footballplayers: [],
      name: "",
      headers: [
        { title: "Name", align: "start", sortable: true, key: "name" },
        { title: "Age", align: "center", sortable: false, key: "age" },
        { title: "Birthdate", align: "center", sortable: false, key: "birthdate" },
        { title: "City", align: "center", sortable: false, key: "city" },
        { title: "Height in cm", align: "center", sortable: false, key: "height" },
        { title: "Weight in kg", align: "center", sortable: false, key: "weight" },
        { title: "Position", align: "center", sortable: false, key: "position" },
        { title: "Status", sortable: false, key: "status" },
        { title: "Actions", sortable: false, key: "actions" },
      ],
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
    retrieveFootballplayers() {
      GetPlayerData.getAll()
        .then((response) => {
          this.footballplayers = response.data.map(this.getDisplayFootballplayer);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveFootballplayers();
    },

    removeAllFootballplayers() {
        GetPlayerData.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
        GetPlayerData.findByName(this.name)
        .then((response) => {
          this.footballplayers = response.data.map(this.getDisplayFootballplayer);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editFootballplayer(id) {
      this.$router.push({ name: "player-details", params: { id: id } });
    },

    deleteFootballplayer(id) {
        GetPlayerData.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayFootballplayer(player) {
      return {
        id: player.id,
        name: player.name.length > 30 ? player.name.substr(0, 30) + "..." : player.name,
        age: player.age.length > 30 ? player.age.substr(0, 30) + "..." : player.age,
        birthdate: player.birthdate.length > 30 ? player.birthdate.substr(0, 30) + "..." : player.birthdate,
        city: player.city.length > 30 ? player.city.substr(0, 30) + "..." : player.city,
        height: player.height.length > 30 ? player.height.substr(0, 30) + "..." : player.height,
        weight: player.weight.length > 30 ? player.weight.substr(0, 30) + "..." : player.weight,
        position: player.position.length > 30 ? player.position.substr(0, 30) + "..." : player.position,
        status: player.published ? "Published" : "Pending",
      };
    },
  },
  mounted() {
    this.retrieveFootballplayers();
  },
}
</script>

<style>
</style>