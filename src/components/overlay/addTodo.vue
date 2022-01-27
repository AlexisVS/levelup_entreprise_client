<template>
  <v-row justify="center">
    <v-dialog
      v-model="toggleAddTodoOverlay"
      @keydown.esc="$emit('toggleAddTodoOverlay', false)"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Add todo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="todoText" label="todo text" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="addTodo(todoText); $emit('toggleAddTodoOverlay', false)"
          >Save</v-btn>
          <v-btn color="blue darken-1" text @click="$emit('toggleAddTodoOverlay', false)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    toggleAddTodoOverlay: { type: Boolean },
    addTodo: { type: Function, required: true },
  },
  data: () => ({
    todoText: null,
    dialog: false,
  }),
}
</script>