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
              <v-stepper-step :complete="step > 1" step="1">Basic</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="step > 2" step="2">TVA</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Contact</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content  step="1">
                <v-card flat class="mb-12" color="none" height="200px">
                  <!-- /* -------------------------------------------------------------------------- */ -->
                  <!-- /*                                    item                                    */ -->
                  <RegisterStepOne/>
                  <!-- /* -------------------------------------------------------------------------- */ -->
                </v-card>
                <v-btn color="primary" @click="step = 2">Continue</v-btn>
                <v-btn text @click="$emit('toggleOverlayRegister', false)">Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-content step="2">
                  <v-card flat class="mb-12" color="none" height="200px">
                  <!-- /* -------------------------------------------------------------------------- */ -->
                  <!-- /*                                    item                                    */ -->
                  <RegisterStepTwo/>
                  <!-- /* -------------------------------------------------------------------------- */ -->
                </v-card>
                <v-btn color="primary" @click="step = 3">Continue</v-btn>
                <v-btn text @click="$emit('toggleOverlayRegister', false)">Cancel</v-btn>
              </v-stepper-content>

              <v-stepper-content step="3">
                  <v-card flat class="mb-12" color="none" height="200px">
                  <!-- /* -------------------------------------------------------------------------- */ -->
                  <!-- /*                                    item                                    */ -->
                  <RegisterStepThree/>
                  <!-- /* -------------------------------------------------------------------------- */ -->
                </v-card>
                <v-btn color="primary" @click="step = 1">Continue</v-btn>
                <v-btn text @click="$emit('toggleOverlayRegister', false)">Cancel</v-btn>
              </v-stepper-content>

            </v-stepper-items>
          </v-stepper>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import RegisterStepOne from "./register/registerStepOne.vue";
import RegisterStepTwo from "./register/registerStepTwo.vue";
import RegisterStepThree from "./register/registerStepThree.vue";
export default {
    data: () => ({
        step: 1,
    }),
    props: {
        toggleOverlayRegister: { type: Boolean },
    },
    name: "RegisterOverlay",
    components: { RegisterStepOne, RegisterStepTwo, RegisterStepThree }
}
</script>

<style scoped>
.theme--dark.v-stepper {
  background: none !important;
}
</style>