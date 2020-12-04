<template>
  <div class="task-view">
    <div
      class="flex flex-col flex-grow items-start justify-between px-4 w-full"
    >
    <input
      type="text"
      class="relative w-full bg-transparent border border-none font-bold px-2"
      :value="task.name"
      @change="updateTask($event,'name')"
    >
      <textarea
        class="relative w-full bg-transparent px-2 mt-2 border h-64 border-none leading-normal"
        :value="task.description"
       @change="updateTask($event,'description')"

      />
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTask (event, propertyName) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        propertyName,
        value: event.target.value
      })
      this.$router.push({ name: 'board' })
    }
  }

}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
