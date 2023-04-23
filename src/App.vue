<template>
  <div class="app">
    <todo-input @addTodo="addTodo"></todo-input>
    <todo-list @setStatus="setStatus">
      <todo-item
        @updateTodo="updateTodo" 
        @deleteToDo="deleteToDo" 
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
import { setDoc, doc } from 'firebase/firestore';

export default {
  data(){
    return{
      items: [],
      status: null,
    }
  },
  mounted(){
    const todosRef = doc(db,'todos',`Todo: ${Id}`);
    todosRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
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
      const docRef = doc(db,'todos',`Todo: ${todoItem.todo}`);
      setDoc(docRef, todoItem);
      console.log('Todo added successfually!');
    },
    checkItem(Id){
      //this.items = this.items.map( item => {
        //if(item.id === Id) {
         // return {...item,completed : !item.completed};
       // }
       // return item;
      //})
      let item = this.items.find(item => item.id === Id);
      item.completed = !item.completed;
      this.updateTodo({
        completed : item.completed,
        todo : item.todo,
      })
    },
    deleteToDo(Id){
      //this.items = this.items.filter(item => item.id !== Id);
      const todosRef = doc(db,'todos',`${Id}`);
      todosRef.doc(Id).delete().then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.log('Error removing document: ',error);
      })
    },
    updateTodo(todo){
      const todosRef = doc(db,'todos',`${todo.id}`);
      todosRef.doc(todo.id).update(todo).then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&family=Poppins:wght@300;700&display=swap');

.app {
  font-family: "Poppins", sans-serif;
  margin: 50px auto;
  width: 500px;
  padding: 20px;
  border: 1px solid #EEE;
  border-radius: 10px;
}

</style>
