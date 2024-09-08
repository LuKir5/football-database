<template>
  <div class="v-container mt-3 mx-auto">
    <h3 class="add-player-title">Add Player</h3>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          class="add-player-textfield"
          v-model="player.name"
          :rules="[(v) => !!v || 'Name is required']"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          class="add-player-textfield"
          v-model="player.age"
          :rules="[(v) => !!v || 'Age is required']"
          label="Age"
          required
        ></v-text-field>

        <v-text-field
          class="add-player-textfield"
          v-model="player.birthdate"
          :rules="[(v) => !!v || 'Birthdate is required']"
          label="Birthdate"
          required
        ></v-text-field>

        <v-text-field
          class="add-player-textfield"
          v-model="player.city"
          :rules="[(v) => !!v || 'City is required']"
          label="City"
          required
        ></v-text-field>

        <v-text-field
          class="add-player-textfield"
          v-model="player.height"
          :rules="[(v) => !!v || 'Height is required']"
          label="Height"
          required
        ></v-text-field>

        <v-text-field
          class="add-player-textfield"
          v-model="player.weight"
          :rules="[(v) => !!v || 'Weight is required']"
          label="Weight"
          required
        ></v-text-field>

        <v-text-field
          class="add-player-textfield"
          v-model="player.position"
          :rules="[(v) => !!v || 'Position is required']"
          label="Position"
          required
        ></v-text-field>
      </v-form>

      <v-btn class="mt-3 add-player-button" elevation="12" @click="savePlayer">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="add-player-submit-alert mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Player.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn class="add-player-button mt-3" color="success" @click="newPlayer">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import GetPlayerData from '/src/services/getPlayerData.js';

export default {
    name: "viewAddPlayer",
    data() {
    return {
      player: {
        id: null,
        name: "",
        age: "",
        birthdate: "",
        city: "",
        height: "",
        weight: "",
        position: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    savePlayer() {
      var data = {
        name: this.player.name,
        age: this.player.age,
        birthdate: this.player.birthdate,
        city: this.player.city,
        height: this.player.height,
        weight: this.player.weight,
        position: this.player.position,
      };

      GetPlayerData.create(data)
        .then((response) => {
          this.player.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newPlayer() {
      this.submitted = false;
      this.player = {};
    },
  },
}
</script>