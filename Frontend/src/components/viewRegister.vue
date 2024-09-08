<template>
    <Form @submit="handleRegister" :validation-schema="schema" class="registerform-container p-0">
      <h2 class="formheader">Register</h2>
        <div v-if="!successful" class="mx-auto">
          <div class="formfield">
            <label for="username" class="formlabel">Username:</label>
            <Field name="username" type="text" class="inputfield"/>
            <br>
            <ErrorMessage name="username" class="error-feedback"/>
          </div>

          <v-divider class="my-2"></v-divider>

          <div class="formfield">
            <label for="email" class="formlabel">E-Mail:</label>
            <Field name="email" type="email" class="inputfield"/>
            <br>
            <ErrorMessage name="email" class="error-feedback"/>
          </div>

          <v-divider class="my-2"></v-divider>

          <div class="formfield">
            <label for="password" class="formlabel">Password:</label>
            <Field name="password" type="password" class="inputfield"/>
            <br>
            <ErrorMessage name="password" class="error-feedback"/>
          </div>

          <v-divider class="my-2"></v-divider>

          <div class="formfield">
            <label for="password_repeat" class="formlabel">Repeat Password:</label>
            <Field name="password_repeat" type="password" class="inputfield"/>
            <br>
            <ErrorMessage name="password_repeat" class="error-feedback"/>
          </div>

          <div id="register-button-container" class="formfield">
            <button :disabled="loading" class="submit-button elevation-12">
              <span
                v-show="loading"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </Form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: "viewRegister",
  components: {
   Form,
   Field,
   ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      password_repeat: yup
        .string()
        .required("Password must match!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      );
    },
  },
};
</script>