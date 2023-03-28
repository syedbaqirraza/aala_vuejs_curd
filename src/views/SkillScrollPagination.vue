<template>
  <div>
    <navbar />
    <SkillScrollComponent />
  </div>
</template>
<script>
import SkillScrollComponent from '../components/SkillScrollComponent.vue'

import navbar from '../components/Navbar.vue'
export default {
  components: {
    SkillScrollComponent,
    navbar
  }
}
</script>
<style></style>
