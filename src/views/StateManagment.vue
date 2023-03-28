<template>
  <div>
    <Navbar />
    <state />

  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue';
import StateManagmentComponent from '../components/StateManagmentComponent.vue'
export default {
  components: {
    Navbar,
    state: StateManagmentComponent
  }
}
</script>
<style></style>
