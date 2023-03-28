<template>
  <Navbar />
  <UpdateSkillComponent />
</template>
<script>
import UpdateSkillComponent from '../components/UpdateSkillComponent.vue'
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    UpdateSkillComponent,
    Navbar
  },
  name: 'updateSkill'
}
</script>
