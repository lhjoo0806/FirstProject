<template>
  <div id="app">
    <h1>My To Do List</h1>    <!-- 어플리케이션 제목 -->

    <!-- 새로운 작업 목록을 추가하는 입력 필드-->
     <!-- v-model을 사용해서 입력필드와 - vue사이에 양방향 바인딩 설정 -->
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="할 일을 기록하세요.">
    <!-- click 디렉티브를 사용해서 버튼을 클릭하면 addTodo()함수 호출 -->
    <button @click="addTodo"> Add </button>
    
    <!-- 추가된 목록을 화면에 랜더링하는 작업-->
     <!-- v-for 디렉티브를 사용해서 todos배열을 순회하며 목록을 표시함-->
    <ul>
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @toggle-complete="toggleComplete"/>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

//todoItem가져오기
  import TodoItem from './components/TodoItem.vue/TodoItem.vue';

  export default {
    components : {
      TodoItem
    },
    data() {
      return {
        newTodo: '',      //새로운 할 일을 입력받을 문자열 변수
        todos: []         //할 일 목록이 저장되는 배열
      };
    },
    created() {
      this.getTodos();
    },
    //db에 저장된 항목 불러오기
    methods: {
      async getTodos() {
        try {
          const response = await axios.get("http://localhost:3000/todos");
          this.todos = response.data;
        }
        catch(error) {
          console.error('오류발생: ', error);
        }
      },
      async addTodo() {
        //입력된 텍스트가 있으면 목록에 추가 -> 입력값이 비어있지 않으면 목록에 추가
        if (this.newTodo.trim() !== '') {
          try {
            const response = await axios.post('http://localhost:3000/todos', { text:this.newTodo });
            this.todos.push(response.data);
            this.newTodo = '';    //입력하고 나서, 필드 초기화
        }
        catch(error) {
          console.error('목록 추가 오류:', error);
        }
      }
      },
      async toggleComplete(todoId) {
        const todo = this.todos.find(todo => todo.id === todoId);
        if (todo) {
          try {
            todo.completed = !todo.completed;
            // put: 상태 변경
            await axios.put(`http://localhost:3000/todos/${todoId}`, { completed: todo.completed });
          } catch (error) {
            console.error('상태 변경 중 에러 발생:', error);
          }
        } 
      }
    }
  };

</script>

<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f4f4f4;
  }
  h1 {
    color: #333;
  }
  input {
    padding: 10px;
    font-size: 17px;
    width: 300px;
    margin-right: 10px;
  }

  button {
    padding: 10px 15px;
    font-size: 17px;
    background-color: #28a745;
    color: white;
    border: none;
    cursor: pointer;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  /* li {
    background-color: white;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
  } */
</style>