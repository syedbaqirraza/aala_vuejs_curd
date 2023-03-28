<template>
  <div class="alert alert-dismissible fade show" :class="alertType" role="alert">
    {{ message }}
    <button @click="closeAlert(false)" class="float-end">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    message: String,
    alertType: String,
    closeAlert: Function
  },
  methods: {}
}
</script>
