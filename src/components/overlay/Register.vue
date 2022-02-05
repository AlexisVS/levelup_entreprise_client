<template>
  <v-row justify="center">
    <v-dialog v-model="toggleOverlayRegister" persistent max-width="600px">
      <v-card color="none" flat>
        <v-card-title>
          <!-- /* ---------------------------------- Title --------------------------------- */ -->
          <span class="text-h5">Register</span>
        </v-card-title>
        <v-card-text>
          <!-- /* ---------------------------------- BODY ---------------------------------- */ -->
          <v-stepper v-model="step" color="rgba(0,0,0,0)" flat>
            <v-stepper-header flat style="box-shadow: none">
              <v-stepper-step :editable="stepUnlocked >= 1" :complete="step > 1" step="1">Basic</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :editable="stepUnlocked >= 2" :complete="step > 2" step="2">TVA</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :editable="stepUnlocked >= 3" step="3">Contact</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card flat class="mb-12" color="none" height="300px">
                  <!-- /* -------------------------------------------------------------------------- */ -->
                  <!-- /*                                    item                                    */ -->
                  <RegisterStepOne @validateStepOne="validateStepOne" />
                  <!-- /* -------------------------------------------------------------------------- */ -->
                </v-card>
                <v-btn :disabled="stepUnlocked < 2" color="primary" @click="changeStep(2)">Continue</v-btn>
                <v-btn text @click="$emit('toggleOverlayRegister', false)">Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card
                  flat
                  class="mb-12"
                  color="none"
                  :height="$vuetify.breakpoint.mdAndUp ? '300px' : '450px'"
                >
                  <!-- /* -------------------------------------------------------------------------- */ -->
                  <!-- /*                                    item                                    */ -->
                  <RegisterStepTwo
                    :validateStepTwo="validateStepTwo"
                    @validateStepTwo="validateStepTwo"
                  />
                  <!-- /* -------------------------------------------------------------------------- */ -->
                </v-card>
                <v-btn :disabled="stepUnlocked < 3" color="primary" @click="changeStep(3)">Continue</v-btn>
                <v-btn text @click="$emit('toggleOverlayRegister', false)">Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                  flat
                  class="mb-12"
                  color="none"
                  :height="$vuetify.breakpoint.mdAndUp ? '300px' : '350px'"
                >
                  <!-- /* -------------------------------------------------------------------------- */ -->
                  <!-- /*                                    item                                    */ -->
                  <RegisterStepThree
                    :validateStepThree="validateStepThree"
                    @validateStepThree="validateStepThree"
                  />
                  <!-- /* -------------------------------------------------------------------------- */ -->
                </v-card>
                <v-btn text @click="$emit('toggleOverlayRegister', false)">Cancel</v-btn>
                <!-- <v-btn color="primary" @click="$emit('toggleOverlayRegister', false)">Complete</v-btn> -->
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios"
import RegisterStepOne from "./register/registerStepOne.vue";
import RegisterStepTwo from "./register/registerStepTwo.vue";
import RegisterStepThree from "./register/registerStepThree.vue";
export default {
  name: "RegisterOverlay",
  components: { RegisterStepOne, RegisterStepTwo, RegisterStepThree },
  data: () => ({
    stepUnlocked: 1,
    step: 1,
  }),
  props: {
    toggleOverlayRegister: { type: Boolean },
  },
  methods: {
    changeStep (toStep) {
      if (this.stepUnlocked >= toStep) {
        this.step = toStep;
      }
    },
    validateStepOne (formData) {
      // axios.get('/sanctum/csrf-cookie').then((response) => {
      //   console.log(response);
      axios.post('/api/v1/register/validate-step-one', formData).then(res => {
        console.log(res);
        this.stepUnlocked++
        this.changeStep(2)
        localStorage.setItem('bearerToken', 'Bearer ' + res.data.data.bearerToken)
      })
      // }).then(() => {
      // axios.get('/sanctum/csrf-cookie').then(() => {
      // axios.post('/api/v1/login', formData).then(res => {
      //   console.log(res);
      //   localStorage.setItem('bearerToken', 'Bearer ' + res.data.data.bearerToken)
      // })
      // })
      // })
    },
    validateStepTwo (formData) {
      // axios.get('/sanctum/csrf-cookie').then(() => {
      axios.post('/api/v1/register/validate-step-two', formData, {
        headers: {
          Authorization: localStorage.getItem('bearerToken')
        }
      })
        .then(res => {
          console.log('bonjour');
          console.log(['register', res]);
          this.stepUnlocked++;
          // this.changeStep(3);
          localStorage.setItem('userId', res.data.data.user.id)
        })
      // })
      // Mot de passe du compte de l'api : BuJG2ZsQnhHSKwR
    },
    validateStepThree (formData) {
      axios.post('/api/v1/register/validate-step-three', formData, {
        headers: {
          Authorization: localStorage.getItem('bearerToken')
        }
      }).then(res => {
        console.log(res);
        this.$emit('toggleOverlayRegister', false)
        this.$emit('registrationComplete', false)
        location.reload();
      })
    },
  },
}
</script>

<style scoped>
.theme--dark.v-stepper {
  background: none !important;
}
</style>