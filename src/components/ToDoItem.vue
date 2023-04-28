<template>
    <div class="todo-item" v-show="status ==null || status == item.completed">
        <div class="controls">
            <div class="edit" @click="editMode = !editMode"><i class="fa fa-edit"></i></div>
            <div class="delete" @click="deleteToDo"><i class="fa fa-trash"></i></div>
        </div>
        <div v-if="editMode"><input class="todo-item-input" @keydown.enter="updateTodo" v-model="todo.todo"/></div>
        <div v-else :class="{throw:item.completed}">{{ item.todo }}</div>
        <div><input type="checkbox" :checked="item.completed" @click="check"/></div>
    </div>
</template>
  
<script>
  export default {
    props: ['item','status'],
    data(){
        return{
            todo : this.item,
            editMode: false,
        }
    },
    methods: {
        check(){
            this.$emit('checkItem',this.item.id);
        },
        deleteToDo(){
            this.$emit('deleteToDo',this.item.id);
        },
        updateTodo() {
            if (this.todo.todo !== '') {
                this.$emit('updateTodo',this.todo);
                this.editMode = false;
            }
        }
    },
    components: {
      
    }
  }
</script>
  
<style>
.todo-item {
    background-color: #f4f4f425;
    padding: 1rem 1.5rem;
    margin: 5px 0;
    border-radius: var(--radius);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    width: 100%;
}
.todo-item-input {
    width: 100%;
    border: none;
    border-radius: var(--radius);
    padding: 1rem 1.5rem;
    font-size: 15px;
    background-color: #f4f4f425;
    color: black;
}
.todo-item-input::placeholder {
    color: #ffffff70;
}
input:focus{
    outline: none;
}
.throw {
    text-decoration: line-through;
}
.controls {
    display: flex;
    align-items: center;
}
.controls div {
    margin: 0 5px;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
}
.controls div:hover {
    cursor: pointer;
}
.delete {
    color: red;
}
.edit {
    color: green;
}
</style>