<template>
  <v-card color="none" flat>
    <v-card-title class="mb-0 pb-0">
      <span class="subtitle-1">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Email" v-model="email" type="email" required :rules="emailRules"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :append-icon="isPasswordVisible == true ? 'mdi-eye-off' : 'mdi-eye'"
              :type="isPasswordVisible == true ? 'text' : 'password'"
              @click:append="isPasswordVisible = !isPasswordVisible"
              :rules="passwordRules"
              label="Password"
              hint="Greater than 10 characters and one character in upper case"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn @click="validate" color="success">Register</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    email: null,
    password: null,
    isPasswordVisible: false,
    passwordRules: [
      v => (!!v && v.length > 5) || 'The password must be comported minimum 5 characters',
      v => (v && v != v.toLowerCase()) || 'The password must be comported minimum one character in upper case',
    ],
    emailRules: [
      v => (!!v && v.length > 5) || 'The email must be comported minimum 5 characters',
      v => (v && v.indexOf('@') > 0) || 'The email must be comported @ character',
    ],
  }),
  methods: {
    validate () {
      let formData = new FormData;
      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('password_confirmation', this.password);
      this.$emit('validateStepOne', formData)
    }
  }
}
</script>

<style>
</style>