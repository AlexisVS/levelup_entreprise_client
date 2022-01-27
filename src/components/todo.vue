<template>
  <v-list-item
    class="d-flex align-center"
    :disabled="todo.status == 'done'"
    @click="todoDone(todo.id)"
  >
    <template v-slot:default="{ active }">
      <v-list-item-action>
        <v-checkbox
          class="pl-5 pt-3"
          style="transform: scale(1.5)"
          hide-details
          :input-value="todo.status == 'done' ? true : active"
        ></v-checkbox>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-subtitle>{{ todo.text }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-list-item>
</template>

<script>
export default {
  name: 'todo',
  props: {
    todo: { type: Object, required: true },
    todoDone: { type: Function },
  }
}
</script>

<style>
</style>