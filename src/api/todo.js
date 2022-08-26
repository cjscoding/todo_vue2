import apiInstance from './index';

const api = apiInstance();

const getTodoList = (success, fail) => {
  api.get('/todo').then(success).catch(fail);
};

const addTodo = (newTodoData, success, fail) => {
  api.post('/todo', JSON.stringify(newTodoData)).then(success).catch(fail);
};

const updateTodo = (updatedTodoData, success, fail) => {
  api.post('/todo', JSON.stringify(updatedTodoData)).then(success).catch(fail);
};

const deleteTodo = (todoNo, success, fail) => {
  api.delete('/todo', JSON.stringify(todoNo)).then(success).catch(fail);
};

export {
  getTodoList, addTodo, updateTodo, deleteTodo,
};
