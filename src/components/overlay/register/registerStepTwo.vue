<template>
  <v-card color="none" flat>
    <!-- <v-card-title class="my-0 py-0">
      <span class="subtitle-1 my-0 py-0">TVA</span>
    </v-card-title>-->
    <v-card-text>
      <v-container>
        <v-row class="mb-7 mt-0 pt-0">
          <v-col cols="9" class="my-0 py-0">
            <v-text-field
              class="my-0 py-0"
              label="TVA Number"
              :rules="tvaRules"
              v-model="tva"
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="3" class="my-0 py-0">
            <v-btn @click="validate" color="success" class="my-0 py-0">Check</v-btn>
          </v-col>
        </v-row>
        <v-row class="my-0 py-0">
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field
              class="my-0 py-0"
              label="Enterprise name"
              :value="entrepriseName"
              disabled
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field
              class="my-0 py-0"
              label="Enterprise activities"
              v-model="entrepriseActivities"
            ></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12">
            <v-text-field class="my-0 py-0" label="Address" :value="address" disabled></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field class="my-0 py-0" label="City" v-model="city"></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field class="my-0 py-0" label="Country" :value="country" disabled></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field class="my-0 py-0" label="Phone number" :v-model="phone"></v-text-field>
          </v-col>
          <v-col class="my-0 py-0" cols="12" md="6">
            <v-text-field class="my-0 py-0" label="Zip code" v-model="zip"></v-text-field>
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
// import axios from 'axios';
export default {
  props: {
    validateStepTwo: { type: Function },
  },
  data: () => ({
    tva: 'BE0400378485',
    entrepriseName: null,
    entrepriseActivities: null,
    address: null,
    city: null,
    country: null,
    phone: null,
    zip: null,
    tvaRules: [
      v => (!!v && v.length > 7) || 'The TVA number must be comported minimum 7 characters',
    ]
  }),
  methods: {
    validate () {
      // axios.get('http://www.apilayer.net/api/validate?access_key=b4542632227f20fe0a3de0623f5316a3&vat_number=' + this.tva + '&format=1',
      //   { withCredentials: false, }
      // )
      //   .then((res) => {
      //     this.entrepriseName = res.data.company_name;
      //     this.address = res.data.company_address;
      //     this.country = res.data.country_code;
          /* -------------------------------------------------------------------------- */
          this.entrepriseActivities = 'food'
          this.city = 'Bruxelles'
          this.phone = '0032485654121'
          this.zip = '1000'

          /* --------------------------------------------a retirer pour l'api------------------------------ */
          this.entrepriseName = 'sdfsdfsdf'
          this.address = 'sdfsdfsdf'
          this.country = 'sdfsdfsdfds'
          /* -------------------------------------------------------------------------- */

          let formData = new FormData
          formData.append('name', this.entrepriseName)
          formData.append('activity', this.entrepriseActivities)
          formData.append('address', this.address)
          formData.append('city', this.city)
          formData.append('country', this.country)
          formData.append('phone', this.phone)
          formData.append('zip_code', this.zip)
          this.$emit('validateStepTwo',formData)
        // })
    }
  },
  computed: {
    checkFields () {
      if (
        this.entrepriseName != null &&
        this.entrepriseActivities != null &&
        this.address != null &&
        this.city != null &&
        this.country != null &&
        this.phone != null &&
        this.zip != null
      ) {
        return false;
      }
      else return true;
    }
  },
}
</script>

<style>
</style>