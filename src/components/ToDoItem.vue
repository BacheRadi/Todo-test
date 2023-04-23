<template>
    <div class="todo-item" v-show="status ==null || status == item.completed">
        <div class="controls">
            <div class="edit" @click="editMode = !editMode"><i class="fa fa-edit"></i></div>
            <div class="delete" @click="deleteToDo"><i class="fa fa-trash"></i></div>
        </div>
        <div v-if="editMode"><input @keydown.enter="updateTodo" v-model="todo.todo"/></div>
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
    padding: 10px 20px;
    margin: 5px 0;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    width: 100%;
    border: 1px solid #EEE;
    border-radius: 10px;
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