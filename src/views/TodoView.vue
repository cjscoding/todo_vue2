<template>
  <ToDoApp>
    <ToDoContainer>
      <TopBar>
        <AppTitle>Todo List</AppTitle>
        <ToDoForm @submit="addTodo">
          <ToDoInput v-model="value" />
          <AddButton><i class="fa-solid fa-plus"></i></AddButton>
        </ToDoForm>
      </TopBar>
      <ToDoListBox>
        <ToDos>
          <todo-row v-for="todo in todos" :key="todo.no" v-bind="todo"></todo-row>
        </ToDos>
      </ToDoListBox>
    </ToDoContainer>
  </ToDoApp>
</template>

<script>
import styled from 'vue-styled-components';
import { mapState, mapActions } from 'vuex';
import TodoRow from '@/components/TodoRow.vue';

const ToDoApp = styled.div`
  padding: 10vh 20vw;
`;

const ToDoContainer = styled.div`
  height: 80vh;
  display: grid;
  grid-template-rows: 1fr 5fr;
  border-radius: 15px;
  box-shadow: 1px 1px 20px #a78b92;
  background-color: #e2211c;
  overflow: hidden;
  min-width: 500px;
`;

const TopBar = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AppTitle = styled.h1`
  color: white;
  font-size: 40px;
  margin-bottom: 15px;
`;

const ToDoForm = styled.form`
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
`;

const ToDoInput = styled.input.attrs({
  placeholder: 'todo..',
  autofocus: true,
})`
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 22px;
  padding: 10px 15px;
`;

const AddButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: white;
  font-size: 22px;
  margin-left: 8px;
  color: #f4c2bf;
  &:hover {
    color: #e2211c;
    cursor: pointer;
  }
`;

const ToDoListBox = styled.div`
  border-radius: 20px 20px 0 0;
  background-color: white;
  padding: 20px 30px;
  overflow-y: scroll;
`;

const ToDos = styled.ul``;

export default {
  components: {
    ToDoApp,
    ToDoContainer,
    TopBar,
    AppTitle,
    ToDoForm,
    ToDoInput,
    AddButton,
    ToDoListBox,
    ToDos,
    TodoRow,
  },
  data() {
    return {
      value: '',
    };
  },
  computed: {
    ...mapState('todoStore', ['count', 'todos']),
  },
  methods: {
    ...mapActions('todoStore', ['getTodos', 'addNewTodo']),
    addTodo(event) {
      event.preventDefault();
      const todoData = {
        title: event.target.value,
        no: this.count,
        done: false,
      };
      this.addNewTodo(todoData);
      this.value = '';
    },
  },
  created() {
    this.getTodos();
  },
};
</script>
