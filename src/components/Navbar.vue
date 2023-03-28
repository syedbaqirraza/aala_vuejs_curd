<script>
import { RouterLink } from 'vue-router'
export default {
  data() {
    return {}
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/')
    }
  },
  mounted() {
    let token = localStorage.getItem('token')
    token = JSON.parse(token)
    if (token == null) {
      this.$router.push('/')
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <RouterLink class="nav-link" to="/">All Skills</RouterLink>
        </li>
        <li class="nav-item active">
          <RouterLink class="nav-link" to="/add-skill">Add Skill</RouterLink>
        </li>
        <li class="nav-item active">
          <RouterLink class="nav-link" to="/skill-scroll-pagination"
            >Skill Scroll Pagination</RouterLink
          >
        </li>
        <li class="nav-item active">
          <RouterLink class="nav-link" to="/skill-database-pagination"
            >Skill Dastbase Pagination</RouterLink
          >
        </li>
        <li class="nav-item active">
          <RouterLink class="nav-link" to="/state-managment"
            >State Managment</RouterLink
          >
        </li>
        <li class="nav-item">
          <a class="nav-link logout" @click="logout">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<style>
.logout {
  cursor: pointer;
}
</style>
