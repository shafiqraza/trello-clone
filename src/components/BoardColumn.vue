<template>
  <div>
    <div
      class="column"
      draggable="true"
      @dragstart.self="pickupColumn($event, columnIndex)"
      @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
      @dragenter.prevent
      @dragover.prevent
      >
      <div class="flex mb-2 items-center font-bold">
        {{ column.name }}
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task,taskIndex) in column.tasks"
          :key="taskIndex"
          :columnIndex="columnIndex"
          :column="column"
          :board="board"
          :taskIndex="taskIndex"
          :task="task"
        />
        <input
          type="text"
          class="block p-2 w-full bg-white"
          @keyup.enter="addTask($event, column.tasks)"
          placeholder="+ Enter new Task"
        >
      </div>
    </div>
  </div>
</template>

<script>
import MoveColumnAndTaskMixin from '@/mixins/MoveColumnAndTaskMixin'

import ColumnTask from './ColumnTask'
export default {
  components: {
    ColumnTask
  },
  props: {}, // dont remove it props will add through mixin
  mixins: [MoveColumnAndTaskMixin],

  methods: {

    addTask (e, tasks) {
      this.$store.commit('CREATE_TASK',
        {
          tasks,
          name: e.target.value
        }
      )
      e.target.value = ''
    },
    pickupColumn (e, fromColumnIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'column')
    }
  }

}
</script>

<style>
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
