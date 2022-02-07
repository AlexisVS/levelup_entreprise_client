<template>
  <v-card color="none" flat>
    <v-card-title class="mb-0 pb-0">
      <span class="subtitle-1">User Contact</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" class="py-0">
            <v-text-field label="Name" v-model="contactName" required :rules="contactNameRules"></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-text-field
              label="Email"
              v-model="contactEmail"
              type="email"
              required
              :rules="contactEmailRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-text-field
              label="Phone number"
              v-model="contactPhone"
              required
              :rules="contactPhoneRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-btn @click="validate" color="success">Register</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    validateStepThree: { type: Function },
  },
  data: () => ({
    contactName: null,
    contactEmail: null,
    contactPhone: null,
    contactNameRules: [],
    contactEmailRules: [
      v => (!!v && v.length > 5) || 'The email must be comported minimum 5 characters',
      v => (v && v.indexOf('@') > 0) || 'The email must be comported @ character',
    ],
    contactPhoneRules: [
      v => (!!v && v.length > 6) || 'The phone number must be at least 6 characters',
      v => (v && /^\d+$/.test(v)) || 'The phone number must be only contains number',
    ],
  }),
  methods: {
    validate () {
      let formData = new FormData();
      formData.append('name', this.contactName)
      formData.append('email', this.contactEmail)
      formData.append('phone', this.contactPhone)
      this.$emit('validateStepThree', formData)
    }
  }
}
</script>

<style>
</style>