<template>
  <div>
    <table ref="scrollContainer" class="table scroll-container">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Name</th>
          <th scope="col">Created At</th>
          <th scope="col">Updated At</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody v-if="items.length > 0">
        <tr v-for="item in items" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.created_at }}</td>
          <td>{{ item.updated_at }}</td>
          <td>
            <button @click="removeSkill(item.id)" class="btn btn-danger mr-1">Delete</button>
            <RouterLink class="btn btn-info text-white" :to="`/update-skill/${item.id}`"
              >Update</RouterLink
            >
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td>Not Any Skill Found</td>
        </tr>
      </tbody>
    </table>
    <pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="loadData" />
  </div>
</template>

<script>
import axios from 'axios'
import Pagination from './ChildPaginationComponent.vue'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      items: [],
      currentPage: 1,
      totalPages: 1,
      searchQuery: ''
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData(page = 1) {
      const token = JSON.parse(localStorage.getItem('token'))
      const config = {
        method: 'get',
        url: `http://127.0.0.1:8000/api/get-skills?page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        params: {
          search: this.searchQuery
        }
      }
      axios(config)
        .then((response) => {
          this.items = response.data.data
          this.currentPage = response.data.current_page
          this.totalPages = response.data.last_page
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style>
.scroll-container {
  height: 500px;
  overflow-y: scroll;
}

.loading-indicator {
  text-align: center;
}
</style>
