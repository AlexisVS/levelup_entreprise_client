<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <div class="d-flex justify-space-between">
          <h1 class="mb-5">Todolist</h1>
        </div>
        <v-list v-if="todos && todos.length > 0" flat subheader three-line>
          <v-row>
            <v-col class="d-flex justify-between px-4">
              <v-spacer></v-spacer>
            </v-col>
          </v-row>

          <v-list-item-group multiple active-class>
            <!-- Content -->
            <Todo
              :todoDone="todoDone"
              v-for="item in todos"
              :key="'todo-item-' + item.id"
              :todo="item"
            />
          </v-list-item-group>
        </v-list>
        <h2 v-else>You does'nt have todo registered</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import Todo from "../components/todo.vue";
export default {
  data: () => ({
    todos: null,
  }),
  methods: {
    getTodo () {
      axios.get('/api/v1/todos', {
        headers: {
          Authorization: localStorage.getItem('bearerToken')
        }
      })
        .then(res => { this.todos = res.data.data.todos })
    },
    todoDone (todoId) {
      axios.get(`/api/v1/todos/${todoId}/done`, {
        headers: {
          Authorization: localStorage.getItem('bearerToken')
        }
      })
        .then(() => { this.getTodo() })
    },
  },
  mounted () {
    this.getTodo()
  },
  components: {
    Todo,
  }
}
</script>

<style>
</style>