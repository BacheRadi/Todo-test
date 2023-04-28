<template>
    <div class="todo-list">
        <slot></slot>
        <div class="filter">
          <button @click="setStatus(null)">All</button>
          <button @click="setStatus(true)">Completed</button>
          <button @click="setStatus(false)">Uncompleted</button>
        </div>
    </div>
</template>
  
<script>
  export default {
    data(){
        return{

        }
    },
    methods: {
      setStatus(val) {
        this.$emit('setStatus', val);
      }
    },
    components: {
      
    }
  }
</script>
  
<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&family=Poppins:wght@300;700&display=swap');
  .todo-list {
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .filter {
    padding: 5px 0;
    margin: 5px 0 0 0;
  }
  button {
    font-family: 'Poppins', sans-serif;
    margin: 0 5px;
    background-color: #f4f4f425;
    color: black;
    border: none;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
  }
  button:focus {
    outline: none;
  }
  button:hover {
    cursor: pointer;
  }
</style>