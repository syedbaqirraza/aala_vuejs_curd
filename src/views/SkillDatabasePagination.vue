<template>
  <div>
    <navbar />
    <pagination />
  </div>
</template>
<script>
import pagination from '../components/SkillDatabasePaginationComponent.vue'

import navbar from '../components/Navbar.vue'
export default {
  components: {
    pagination,
    navbar
  }
}
</script>
<style></style>
