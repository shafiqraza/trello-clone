import Vue from 'vue'
import Vuex from 'vuex'
import defaultBoard from './default-board'
import { uuid } from './utils'

Vue.use(Vuex)

const board = JSON.parse(localStorage.getItem('board')) || defaultBoard

export default new Vuex.Store({
  state: {
    board
  },
  getters: {
    getTask (state) {
      return (id) => {
        for (const column of state.board.columns) {
          for (const task of column.tasks) {
            if (task.id === id) {
              return task
            }
          }
        }
      }
    }
  },
  mutations: {
    CREATE_TASK (state, { tasks, name }) {
      tasks.push({
        id: uuid,
        name,
        description: ''
      })
    },
    CREATE_COLUMN (state, { name }) {
      state.board.columns.push({
        name,
        tasks: []
      })
    },
    UPDATE_TASK (state, { task, propertyName, value }) {
      task[propertyName] = value
    },

    MOVE_TASK (state, { fromTask, toTask, fromTaskIndex, toTaskIndex }) {
      const taskToMove = fromTask.splice(fromTaskIndex, 1)[0]
      // toTask.push(taskToMove)
      toTask.splice(toTaskIndex, 0, taskToMove)
    },
    MOVE_COLUMN (state, { fromColumnIndex, toColumnIndex }) {
      const columnList = state.board.columns
      const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
      columnList.splice(toColumnIndex, 0, columnToMove)
    }
  }
})
