<template>
  <div class="app">
    <todo-input @addTodo="addTodo"></todo-input>
    <todo-list @setStatus="setStatus">
      <todo-item
        @updateTodo="updateTodo(item.id, item)" 
        @deleteToDo="deleteToDo(item.id)" 
        @checkItem="checkItem" 
        v-for="item in items" 
        :key="item.id" 
        :item="item"
        :status="status"
      />
    </todo-list> 
  </div>
</template>

<script>
import TodoInput from './components/ToDoInput';
import TodoItem from './components/ToDoItem';
import TodoList from './components/ToDoList';
import db from './firebase/init.js';
import { doc, collection, setDoc, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';

export default {
  data(){
    return{
      items: [],
      status: null,
    }
  },
  mounted(){
    const todosRef = collection(db,'todos');
    onSnapshot(todosRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if(change.type == 'added'){
          this.items.push({
            id: change.doc.id,
            ...change.doc.data(),
          });
        }else if(change.type == 'removed'){
          this.items = this.items.filter(item => item.id !== change.doc.id);
        }else if(change.type == 'modified'){
          this.items = this.items.map(item => {
            if(item.id === change.doc.id){
              return {...change.doc.data(), id : change.doc.id};
            }
            return item;
          })
        }
      })
    })
  },
  computed: {
    itemsLength(){
      return this.items.length;
    },
    getId(){
      if(this.itemsLength) {
        return this.items[this.itemsLength - 1].id + 1; 
      }
      return 1;
    }
  },
  methods: {
    addTodo(todo){
      let todoItem = {
        todo,
        completed : false,
      }
      const docRef = doc(db,'todos',todoItem.todo);
      setDoc(docRef, todoItem).then(() => {
        console.log('Todo added successfully!');
      }).catch((error) => {
        console.log('Error adding document: ',error);
      })
    },
    checkItem(Id){
      let item = this.items.find(item => item.id === Id);
      if(item){
        item.completed = !item.completed;
        this.updateTodo(Id, {
          completed : item.completed,
          todo : item.todo,
        });
      }else{
        console.log(`Item with ID ${Id} not found`);
      }
    },
    deleteToDo(Id){
      const todosRef = doc(db,'todos',Id);
      deleteDoc(todosRef).then(() => {
        console.log('Document successfully deleted!');
      }).catch((error) => {
        console.log('Error removing document: ',error);
      })
    },
    updateTodo(Id, todo){
      const todosRef = doc(db,'todos',Id);
      const updatedFields = {
        completed: todo.completed,
        todo: todo.todo,
      };
      updateDoc(todosRef, updatedFields).then(() => {
        console.log('Document successfully updated!');
      }).catch((error) => {
        console.log('Error updating document: ',error);
      })
    },
    setStatus(val){
      this.status = val;
    }
  },
  components: {
    TodoInput,
    TodoItem,
    TodoList,
  }
}
</script>

<style>
.app {
  color: #ffffffb0;
  background-color: #ffffff42;
  width: var(--app-width);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: 0 15px 40px -20px black;
}
</style>
