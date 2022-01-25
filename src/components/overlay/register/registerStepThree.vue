<template>
  <v-card color="none" flat>
    <v-card-title class="mb-0 pb-0">
      <span class="subtitle-1">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Email" type="email" required :rules="emailRules"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              :rules="passwordRules"
              label="Password"
              hint="Greater than 10 characters and one character in upper case"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="$emit('toggleOverlayRegister', false)">Close</v-btn>
          <v-btn color="blue darken-1" text @click="$emit('toggleOverlayRegister', false)">Save</v-btn>
    </v-card-actions>-->
  </v-card>
</template>

<script>
export default {
  props: {
    validateStepThree: { type: Function },
  },
  data: () => ({
    passwordRules: [
      v => (!!v && v.length > 5) || 'The password must be comported minimum 5 characters',
      v => (v && v != v.toLowerCase()) || 'The password must be comported minimum one character in upper case',
    ],
    emailRules: [
      v => (!!v && v.length > 5) || 'The email must be comported minimum 5 characters',
      v => (v && v.indexOf('@') > 0) || 'The email must be comported @ character',
    ],
  }),
}
</script>

<style>
</style>