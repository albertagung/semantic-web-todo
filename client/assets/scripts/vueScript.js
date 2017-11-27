// Components
Vue.component('todo-list', {
  props: ['todo'],
  template: `
    <div class="col-md-3">
      <div class="card bg-dark text-white">
        <div class="card-img-overlay">
          <h4 class="card-title">{{todo.name}}</h4>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <p class="card-text">Desc: <br /> {{todo.description}}</p>
              <hr>
            </div>
          </div>
          <p class="card-text">Created At: <br /> {{todo.createdAt}}</p>
          <hr>
          <p class="card-text">Created By: <br /> {{todo.user.first_name + ' ' + todo.user.last_name}}</p>
          <hr />
          <div class="row justify-content-md-center">
            <button class="btn btn-success" type="button" id="completeTodo" @click="getA">Mark as Completed</button>
          </div>
        </div>
      </div>
    </div>`,
    methods: {
      getA () {
        this.$emit('get-a', {
          list: this.todo
        })
      }
    }
})

Vue.component('completed-list', {
  props: ['complete'],
  template: `
    <div class="col-md-3">
      <div class="card bg-success text-white">
        <div class="card-img-overlay">
          <h4 class="card-title">{{complete.name}}</h4>
          <hr />
          <div class="row">
            <div class="col-md-12">
              <p class="card-text">Desc: <br /> {{complete.description}}</p>
              <hr>
            </div>
          </div>
          <p class="card-text">Created At: <br /> {{complete.createdAt}}</p>
          <hr>
          <p class="card-text">Completed By: <br /> {{complete.user.first_name + ' ' + complete.user.last_name}}</p>
          <hr />
          <div class="row justify-content-md-center">
            <button class="btn btn-secondary" type="button" disabled>Completed</button>
          </div>
        </div>
      </div>
    </div>`
})

// Vue instance
new Vue({
  el: '#v',
  data: {
    todos: [],
    completed: []
  },
  created () {
    this.getDataTodos()
    this.getDataCompleted()
  },
  methods: {
    getDataTodos () {
      axios.get('http://localhost:3000/todos').then((response) => {
        this.todos.push(...response.data)
      }).catch((err) => {
        console.log(err);
      })
    },
    getDataCompleted () {
      axios.get('http://localhost:3000/complete').then((response) => {
        this.completed.push(...response.data)
      }).catch((err) => {
        console.log(err);
      })
    },
    addTodo () {
      let tagsArr = $('#todoTag').val()
      axios.post('http://localhost:3000/todos', {
        idUser: '5a1984afb57da0719bc2084d',
        name: $('#todoName').val(),
        description: $('#todoDescription').val(),
        tags: tagsArr.split(','),
        status: $('#todoStatus').val()
      }).then((response) => {
        console.log('ini response',response.data);
        $('#modalAddMore').modal('toggle')
      }).catch((err) => {
        console.log(err);
      })
    },
    testFunc (fromChild) {
      let dataTodos = fromChild.list
      axios.get(`http://localhost:3000/complete/${dataTodos.user._id}/${dataTodos._id}`).then((response) => {
        console.log(response.data);
        this.completed.push(response.data)
      }).catch((err) => {
        console.log(err);
      })
    }
  }
})
