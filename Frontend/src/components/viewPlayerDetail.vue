<template>
    <div v-if="currentPlayer" class="v-container py-3">
      <h3 class="add-player-title">Edit Player</h3>
  
      <v-form ref="form" lazy-validation>
        <v-text-field
          class="edit-player-textfield"
          v-model="currentPlayer.name"
          :rules="[(v) => !!v || 'Name is required']"
          label="Name"
          required
        ></v-text-field>
  
        <v-text-field
          class="edit-player-textfield"
          v-model="currentPlayer.age"
          :rules="[(v) => !!v || 'Age is required']"
          label="Age"
          required
        ></v-text-field>

        <v-text-field
          class="edit-player-textfield"
          v-model="currentPlayer.birthdate"
          :rules="[(v) => !!v || 'Birthdate is required']"
          label="Birthdate"
          required
        ></v-text-field>

        <v-text-field
          class="edit-player-textfield"
          v-model="currentPlayer.city"
          :rules="[(v) => !!v || 'City is required']"
          label="City"
          required
        ></v-text-field>

        <v-text-field
          class="edit-player-textfield"
          v-model="currentPlayer.height"
          :rules="[(v) => !!v || 'Height is required']"
          label="Height"
          required
        ></v-text-field>

        <v-text-field
          class="edit-player-textfield"
          v-model="currentPlayer.weight"
          :rules="[(v) => !!v || 'Weight is required']"
          label="Weight"
          required
        ></v-text-field>

        <v-text-field
          class="edit-player-textfield"
          v-model="currentPlayer.position"
          :rules="[(v) => !!v || 'Position is required']"
          label="Position"
          required
        ></v-text-field>

        <v-divider class="my-2"></v-divider>
  
        <label><strong>Status:</strong></label>
        {{ currentPlayer.published ? "Published" : "Pending" }}
  
        <v-divider class="my-5"></v-divider>
  
        <v-btn v-if="currentPlayer.published"
          @click="updatePublished(false)"
          class="mr-3" color="primary"
        >
          <span class="edit-player-button">UnPublish</span>
        </v-btn>
  
        <v-btn v-else
          @click="updatePublished(true)"
          class="mr-3" color="primary"
        >
          <span class="edit-player-button">Publish</span>
        </v-btn>
  
        <v-btn class="mr-3" color="error" @click="deletePlayer">
          <span class="edit-player-button">Delete</span>
        </v-btn>
  
        <v-btn color="success" @click="updatePlayer">
          <span class="edit-player-button">Update</span>
        </v-btn>
      </v-form>
  
      <p class="edit-player-alert mt-3">{{ message }}</p>
    </div>
  
    <div class="edit-player-alert" v-else>
      <p>Please click on a Player...</p>
    </div>
  </template>
  
  <script>
  import GetPlayerData from "/src/services/getPlayerData.js";
  
  export default {
    name: "viewPlayerDetail",
    data() {
      return {
        currentPlayer: null,
        message: "",
      };
    },
    methods: {
      getPlayer(id) {
        GetPlayerData.get(id)
          .then((response) => {
            this.currentPlayer = response.data;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },
  
      updatePublished(status) {
        var data = {
          id: this.currentPlayer.id,
          name: this.currentPlayer.name,
          age: this.currentPlayer.age,
          published: status,
        };
  
        GetPlayerData.update(this.currentPlayer.id, data)
          .then((response) => {
            this.currentPlayer.published = status;
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      },
  
      updatePlayer() {
        GetPlayerData.update(this.currentPlayer.id, this.currentPlayer)
          .then((response) => {
            console.log(response.data);
            this.message = "The player was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
      },
  
      deletePlayer() {
        GetPlayerData.delete(this.currentPlayer.id)
          .then((response) => {
            console.log(response.data);
            this.$router.push({ name: "players" });
          })
          .catch((e) => {
            console.log(e);
          });
      },
    },
    mounted() {
      this.message = "";
      this.getPlayer(this.$route.params.id);
    },
  };
  </script>
