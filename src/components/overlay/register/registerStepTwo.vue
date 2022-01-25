<template>
  <v-card color="none" flat>
    <!-- <v-card-title class="my-0 py-0">
      <span class="subtitle-1 my-0 py-0">TVA</span>
    </v-card-title> -->
    <v-card-text>
      <v-container>
        <v-row class="mb-7 mt-0 pt-0">
          <v-col cols="9" class="my-0 py-0">
            <v-text-field class="my-0 py-0" label="TVA Number" :rules="tvaRules" v-model="tva" type="text"></v-text-field>
          </v-col>
          <v-col cols="3" class="my-0 py-0">
            <v-btn @click="$emit('validateStepTwo', tva)" color="success" class="my-0 py-0">Check</v-btn>
          </v-col>
        </v-row>
        <v-row class="my-0 py-0">
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field class="my-0 py-0" label="Enterprise name" :value="entrepriseName" disabled></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field class="my-0 py-0" label="Enterprise activities" :value="entrepriseActivities" disabled></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12">
            <v-text-field class="my-0 py-0" label="Address" :value="address" disabled></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field class="my-0 py-0" label="City" :value="city" disabled></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field class="my-0 py-0" label="Country" :value="country" disabled></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field class="my-0 py-0" label="Phone number" :value="phone" disabled></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field class="my-0 py-0" label="Zip code" :value="zip" disabled></v-text-field>
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
  data: () => ({
    tva: 'BE0844044609',
    entrepriseName: null,
    entrepriseActivities: null,
    address: null,
    city: null,
    country: null,
    phone: null,
    zip: null,
    tvaRules: [
      v => (!!v && v.length > 7) || 'The TVA number must be comported minimum 7 characters',
      v => (!!v && v[0] == 'B') || 'The first characted must be a "B" character',
      v => (!!v && v[1] == 'E') || 'The first characted must be a "E" character',
    ]
  }),
}
</script>

<style>
</style>