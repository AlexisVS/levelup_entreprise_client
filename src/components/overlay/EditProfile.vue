<template>
  <v-dialog
    v-model="toggleOverlayEditProfile"
    @click:outside="$emit('closeOverlayEditProfile', false)"
    @keydown.esc="$emit('closeOverlayEditProfile', false)"
    hide-overlay
    color="transparent"
    :elevation="0"
    width="max-content"
  >
    <v-card width="max-content" class="mx-auto" :elevation="0">
      <v-card-text>
        <v-container>
          <v-row align="center">
            <v-col align-self="center" cols="12" class="pa-0">
              <v-form
                ref="form"
                class="px-9 py-9 rounded-lg mx-auto"
                :style="$vuetify.breakpoint.xsOnly ? 'width: 100%' : 'width:600px'"
                enctype="multipart/form-data"
                v-model="valid"
                lazy-validation
                @submit.prevent="validate()"
              >
                <v-text-field
                  v-model="firstName"
                  :counter="20"
                  :rules="firstNameRules"
                  name="firstName"
                  label="Name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  name="email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  label="Phone Number"
                  name="Phone"
                  required
                ></v-text-field>
                <v-btn :disabled="!valid" color="success" type="submit" class="mr-4 mt-4">Validate</v-btn>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditProfile',
  props: {
    'toggleOverlayEditProfile': { type: Boolean },
    'profile': { type: Object, required: true },
  },
  data () {
    return {
      valid: true,
      firstName: this.profile.contact.name,
      email: this.profile.contact.email,
      phone: this.profile.contact.phone,
      firstNameRules: [
        v => !!v || 'First name is required', // true aussi non ...
        v => (v && v.length <= 20) || 'First name must be less than 10 characters',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      phoneRules: [
        v => (!!v && v.length > 6) || 'The phone number must be at least 6 characters',
        v => (v && /^\d+$/.test(v)) || 'The phone number must be only contains number',
      ],
    }
  },
  methods: {
    validate () {
      /* ------------------------------- Just avatar ------------------------------ */

      let form = new FormData(this.$refs.form.$el)
      form.append('name', this.firstName)
      form.append('phone', this.phone)
      form.append('email', this.email)
      axios
        .post('/api/v1/edit-profile', form, {
          headers: {
            Authorization: localStorage.getItem('bearerToken')
          }
        }).then(res => console.log(res))
      this.$refs.form.validate();
      // this.$refs.form.reset();
      this.$emit('editProfileSuccess', false);
    },
  },
}
</script>