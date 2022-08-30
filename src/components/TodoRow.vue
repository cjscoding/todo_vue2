<template>
  <ToDo>
    <ToDoTitle
      v-show="!updateMode"
      :class="[done ? 'done' : 'inprogress']"
      @click="
        {
          toggleStatus(no);
        }
      "
      >☺︎ {{ title }}</ToDoTitle
    >
    <ToDoUpdateInput
      v-show="updateMode"
      v-model="titleName"
      @keyup.enter="
        {
          updateTodo(no);
        }
      "
      >{{ title }}</ToDoUpdateInput
    >
    <ButtonBox>
      <OptionButton v-show="!updateMode" @click="toggleUpdateMode"
        ><i class="fa-solid fa-pen"></i
      ></OptionButton>
      <OptionButton
        v-show="updateMode"
        @click="
          {
            updateTodo(no);
          }
        "
        ><i class="fa-solid fa-check"></i
      ></OptionButton>
      <OptionButton
        @click="
          {
            deleteTodo(no);
          }
        "
        ><i class="fa-solid fa-trash"></i
      ></OptionButton>
    </ButtonBox>
  </ToDo>
</template>

<script>
import styled from 'vue-styled-components';
import { mapActions } from 'vuex';

const ToDo = styled.li`
  list-style: none;
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 1fr;
  font-size: 20px;
  border-bottom: 1px solid #a78b92;
  padding: 10px 0;
  &:last-child {
    border: none;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ToDoTitle = styled.span`
/* text-decoration: line-through; */
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  },
`;

const ToDoUpdateInput = styled.input.attrs({
  placeholder: 'type title..',
})`
  width: 100%;
  outline: none;
  border: 1px solid gray;
  border-radius: 5px;
  font-size: 15px;
  opacity: 0.6;
  padding: 5px 10px;
  &:focus,
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const OptionButton = styled.button`
  border: none;
  padding: 3px;
  background-color: white;
  margin-left: 10px;
  color: #f4c2bf;
  &:hover {
    color: #e2211c;
    cursor: pointer;
  }
`;
export default {
  components: {
    ToDo,
    ToDoTitle,
    ButtonBox,
    OptionButton,
    ToDoUpdateInput,
  },
  props: {
    no: Number,
    title: String,
    done: Boolean,
  },
  data() {
    return {
      updateMode: false,
      titleName: this.title,
    };
  },
  computed: {},
  methods: {
    ...mapActions('todoStore', ['modifyTodo', 'removeTodo']),
    updateTodo(todoNo) {
      const newTodoData = {
        title: this.titleName,
        no: todoNo,
        done: this.done,
      };
      this.modifyTodo(newTodoData);
      this.toggleUpdateMode();
    },
    deleteTodo(todoNo) {
      this.removeTodo(todoNo);
    },
    toggleUpdateMode() {
      this.updateMode = !this.updateMode;
    },
    toggleStatus(todoNo) {
      const newTodoData = {
        title: this.titleName,
        no: todoNo,
        done: !this.done,
      };
      this.modifyTodo(newTodoData);
    },
  },
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
