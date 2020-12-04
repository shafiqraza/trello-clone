<template>
  <div class="board">
    <div class="flex flex-row item-start">
      <BoardColumn
        v-for="(column, columnIndex) in board.columns"
        :key="columnIndex"
        :columnIndex="columnIndex"
        :column="column"
        :board="board"
      />
      <div class="column" style="height: 100%">
        <div class="flex mb-2 items-center font-bold">
          Add Column
        </div>
         <input
            type="text"
            class="block p-2 w-full bg-white"
            placeholder="Column name"
            v-model="newColumnName"
            @keyup.enter="addColumn"
          >
      </div>
    </div>
    <div
      class="task-bg"
      v-if="isOpen"
      @click.self="goToBoard"
    >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn'
export default {
  components: {
    BoardColumn
  },
  data () {
    return {
      newColumnName: ''
    }
  },
  computed: {
    isOpen () {
      return this.$route.name === 'task'
    },
    ...mapState(['board'])
  },
  methods: {
    goToBoard () {
      this.$router.push({ name: 'board' })
    },
    addColumn () {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName
      })
      this.newColumnName = ''
    }
  }
}
</script>

<style lang="css">

.board {
  @apply p-4 bg-teal-dark h-full overflow-auto;
}
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
.task-bg {
  @apply pin absolute;
  background: rgba(0,0,0,0.5);
}
</style>
