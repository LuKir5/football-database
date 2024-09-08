<template>
    <div class="v-container">
      <v-row align="center"> 
        <v-col v-for="n in 1"
        :key="n">
            <v-sheet class="app-container">
                <form @submit.prevent="sendEmail" class="contactform-container p-0">
                    <h2 class="formheader">Send us a question</h2>
                    <div class="mx-auto">
                        <div class="formfield">
                          <label for="name" class="formlabel">Name:</label>
                          <input name="name" type="text" class="inputfield" id="name" v-model="form.name" required/>
                          <ErrorMessage name="name" class="error-feedback"/>
                        </div>

                        <v-divider class="my-2"></v-divider>

                        <div class="formfield">
                          <label for="email" class="formlabel">E-Mail:</label>
                          <input name="email" type="email" class="inputfield" id="email" v-model="form.email" required>
                          <ErrorMessage name="email" class="error-feedback"/>
                        </div>

                        <v-divider class="my-2"></v-divider>

                        <div class="formfield">
                          <label for="message" class="formlabel">Your Message:</label>
                          <textarea name="message" type="textfield" class="inputfield" id="message" v-model="form.message" required></textarea>
                          <ErrorMessage name="message" class="error-feedback"/>
                        </div>
                        
                        <div id="contact-button-container" class="formfield">
                          <button name="send" type="submit" value="send" class="submit-button elevation-12">Send</button>
                          <button name="reset" type="reset" class="submit-button elevation-12">Reset</button>
                        </div>
                    </div>
                </form>
            </v-sheet>
        </v-col>
      </v-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      }
    };
  },
  methods: {
    async sendEmail() {
      try {
        const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        });

        if (response.ok) {
          alert('Email sent successfully!');
        } else {
          alert('Failed to send email.');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  }
};
// Backend code can be found in server.js
</script>