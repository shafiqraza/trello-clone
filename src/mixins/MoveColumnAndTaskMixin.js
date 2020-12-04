export default {
  methods: {
    moveTaskOrColumn (e, toTask, toColumnIndex, toTaskIndex) {
      const type = e.dataTransfer.getData('type')
      if (type === 'task') {
        this.moveTask(e, toTask, toTaskIndex !== undefined ? toTaskIndex : toTask.length)
        console.log('move Task')
      } else {
        this.moveColumn(e, toColumnIndex)
        console.log('move column')
      }
    },
    moveTask (e, toTask, toTaskIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      const fromTaskIndex = e.dataTransfer.getData('from-task-index')
      const fromTask = this.board.columns[fromColumnIndex].tasks

      this.$store.commit('MOVE_TASK', {
        fromTask,
        toTask,
        fromTaskIndex,
        toTaskIndex
      })
    },

    moveColumn (e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')

      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex
      })

      // console.log('from: ' + fromColumnIndex + ' to:' + toColumnIndex)
    }
  },
  props: {
    columnIndex: {
      type: Number,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  }
}
