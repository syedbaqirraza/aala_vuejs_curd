<template>
  <div class="text-center">
    <button @click="previousPage">Previous</button>
    <button v-for="page in totalPages" :key="page" @click="goToPage(page)">
      {{ page }}
    </button>
    <button @click="nextPage">Next</button>
  </div>
</template>
<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.$emit('page-changed', this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit('page-changed', this.currentPage + 1)
      }
    },
    goToPage(page) {
      this.$emit('page-changed', page)
    }
  }
}
</script>
