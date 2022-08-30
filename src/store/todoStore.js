import {
  getTodoList, addTodo, updateTodo, deleteTodo,
} from '@/api/todo';

const todoStore = {
  namespaced: true,
  state: {
    count: 4,
    todos: [],
  },
  getters: {},
  mutations: {
    SET_TODO_LIST: (state, todoList) => {
      console.log('get todo mutation 들어옴!!', todoList);
      state.todos = todoList;
    },
    ADD_NEW_TODO: (state, newTodoData) => {
      state.todos = [...state.todos, newTodoData];
      state.count += 1;
    },
    UPDATE_TODO: (state, updatedTodoData) => {
      const newTodoList = [...state.todos];
      const targetIndex = newTodoList.findIndex((todo) => todo.no === updatedTodoData.no);
      newTodoList[targetIndex] = updatedTodoData;
      state.todos = newTodoList;
    },
    DELETE_TODO: (state, todoNo) => {
      const newTodoList = [...state.todos];
      const targetIndex = newTodoList.findIndex((todo) => todo.no === todoNo);
      newTodoList.splice(targetIndex, 1);
      state.todos = newTodoList;
    },
  },
  actions: {
    getTodos({ commit }) {
      getTodoList(
        (res) => {
          console.log('get todo success!!', res);
          commit('SET_TODO_LIST', res.data);
        },
        (err) => console.log('get todo fail!!', err),
      );
    },
    addNewTodo({ commit }, newTodoData) {
      addTodo(
        newTodoData,
        (res) => {
          console.log('add new todo success', res);
          commit('ADD_NEW_TODO', newTodoData);
        },
        (err) => {
          console.log('add new todo fail', err);
        },
      );
    },
    modifyTodo({ commit }, updatedTodoData) {
      updateTodo(
        updatedTodoData,
        (res) => {
          console.log('update todo success', res);
          commit('UPDATE_TODO', updatedTodoData);
        },
        (err) => {
          console.log('update todo fail', err);
        },
      );
    },
    removeTodo({ commit }, todoNo) {
      deleteTodo(
        todoNo,
        (res) => {
          console.log('delete todo success', res);
          commit('DELETE_TODO', todoNo);
        },
        (err) => {
          console.log('delete todo fail', err);
        },
      );
    },
  },
};

export default todoStore;
