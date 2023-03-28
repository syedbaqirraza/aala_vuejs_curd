<template>
  <Navbar />
  <AddSkillComponent />
</template>

<script>
import AddSkillComponent from '../components/AddSkillComponent.vue'
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    AddSkillComponent,
    Navbar
  },
  name: 'addSkill',
  data() {
    return {
      skillName: ''
    }
  },
  mounted() {}
}
</script>

<style></style>
