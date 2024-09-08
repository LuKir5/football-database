<template>
  <Form @submit="handleLogin" :validation-schema="schema" class="loginform-container">
    <h2 class="formheader">Login</h2>

    <v-divider class="my-2"></v-divider>

      <div class="formfield">
        <label for="username" class="formlabel">Username:</label>
        <Field name="username" type="text" class="inputfield"/>
        <br>
        <ErrorMessage name="username" class="error-feedback"/>
      </div>

      <v-divider class="my-2"></v-divider>

      <div class="formfield">
        <label for="password" class="formlabel">Password:</label>
        <Field name="password" type="password" class="inputfield"/>
        <br>
        <ErrorMessage name="password" class="error-feedback"/>
      </div>

      <v-divider class="my-2"></v-divider>

      <div id="login-button-container" class="formfield">
        <button :disabled="loading" class="submit-button elevation-12">
          <span
            v-show="loading"
          ></span>
          <span>Login</span>
        </button>
      </div>

      <div>
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "viewLogin",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleLogin(user) {
      this.loading = true;

      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/profile");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style scoped>
</style>
