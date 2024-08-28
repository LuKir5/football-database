<template>
  <div class="">
    <!-- <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header> -->
    <main>
        <h3>Hey, this is our Homepage</h3>
    </main>
  </div>
</template>

<script>
import UserService from "/src/services/user.service.js";

export default {
  name: "viewHome",
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>

<style scoped>
</style>