<template>
  <div>
    <div
    class="task"
    draggable="true"
    @dragstart="pickupTask($event, columnIndex, taskIndex)"
    @click="goToTask(task)"
    @dragenter.prevent
    @dragover.prevent
    @drop.stop="moveTaskOrColumn($event, column.tasks,columnIndex, taskIndex)"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p
        v-if="task.description"
        class="w-full flex-no-shrink text-sm mt-1">
        {{ task.description }}
      </p>
  </div>
  </div>
</template>

<script>
import MoveColumnAndTaskMixin from '@/mixins/MoveColumnAndTaskMixin'
export default {
  props: {
    taskIndex: {
      type: Number,
      required: true
    },

    task: {
      type: Object,
      required: true
    }
  },
  mixins: [MoveColumnAndTaskMixin],
  methods: {
    pickupTask (e, fromColumnIndex, taskIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'

      e.dataTransfer.setData('from-task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColumnIndex)
      e.dataTransfer.setData('type', 'task')
    },

    goToTask (task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    }

  }
}
</script>

<style>

.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
