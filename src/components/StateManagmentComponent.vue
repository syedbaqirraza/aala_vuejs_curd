<template>
  <div>
    <h1>child copmonent</h1>
    <h1>{{ $store.getters.getStateData }}</h1>

    <button @click="increment">increment</button>
    <button @click="decrement">decrement</button>
    <button @click="callAction">Mega Increment</button>
  </div>
</template>
<script>
export default {
  name: 'stateManagment',
  data() {
    return {}
  },
  methods: {
    decrement() {
      this.$store.dispatch('decrementAction', 5)
    },
    increment() {
      this.$store.dispatch('incrementAction', 5)
    },
    callAction() {
      this.$store.dispatch('megaIncrementAction',10)
    }
  }
}
</script>
<style></style>
