<template>
    <input class="todo-input" v-model="todo" placeholder="Write something todo" @keydown.enter="addTodo">
</template>
  
<script>
  export default {
    data(){
        return{
            todo : '',
        }
    },
    methods: {
        addTodo(){
            if (this.todo !== '') {
              this.$emit('addTodo',this.todo);
              this.todo = '';
            }
        }
    },
    components: {
      
    }
  }
</script>
  
<style>
  .todo-input{
    width: 100%;
    margin-bottom: 2rem;
    border: none;
    border-radius: var(--radius);
    padding: 1rem 1.5rem;
    font-size: 20px;
    background-color: #f4f4f425;
    color: white;
  }
  
  .todo-input::placeholder {
    color: #ffffff70;
  }

  input:focus{
    outline: none;
  }
</style>