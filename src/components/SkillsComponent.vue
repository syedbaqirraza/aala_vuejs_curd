<template>
  <div>
    <div v-if="isMessage == true">
      <alert :alert-type="alertType" :message="message" :closeAlert="closeAlert"></alert>
    </div>
    <h2 class="text-center">All Skills</h2>
    <input class="mx-3 my-2" type="text" v-model="searchQuery" placeholder="Search..." />
    <table class="table">
      <thead>
        <tr>
          <th scope="col">No.</th>
          <th scope="col">Name</th>
          <th scope="col">Created At</th>
          <th scope="col">Updated At</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody v-if="data.length > 0">
        <tr v-for="item in paginatedData" :key="item.id">
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
    <div class="pagination">
      <button v-if="currentPage > 1" @click="prevPage">Prev</button>
      <button
        v-for="(page, index) in pages"
        :key="index"
        :class="{ active: currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
      <button v-if="currentPage < pages.length" @click="nextPage">Next</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import AlertComponent from './AlertComponent.vue'

export default {
  components: {
    alert: AlertComponent
  },
  name: 'skillView',
  data() {
    return {
      data: [],
      pageSize: 10,
      currentPage: 1,
      message: '',
      isMessage: false,
      alertType: '',
      searchQuery: ''
    }
  },
  computed: {
    pages() {
      const filteredData = this.filterData()
      const totalPages = Math.ceil(filteredData.length / this.pageSize)
      const pagesArray = []
      for (let i = 1; i <= totalPages; i++) {
        pagesArray.push(i)
      }
      return pagesArray
    },
    paginatedData() {
      const filteredData = this.filterData()
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return filteredData.slice(startIndex, endIndex)
    }
  },
  methods: {
    async fetchData() {
      const self = this
      try {
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        var config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:8000/api/skill',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        axios(config)
          .then(function (response) {
            self.data = response.data.data
          })
          .catch(function (error) {
            console.log(error)
          })
      } catch (error) {
        console.log(error)
      }
    },
    filterData() {
      return this.data.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    goToPage(page) {
      this.currentPage = page
    },
    nextPage() {
      this.currentPage++
    },
    prevPage() {
      this.currentPage--
    },
    removeSkill(id) {
      const self = this
      let token = localStorage.getItem('token')
      token = JSON.parse(token)
      var config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/api/skill/${id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios(config)
        .then(function (response) {
          self.message = response.data.message
          self.isMessage = true
          self.alertType = 'alert-success'
          self.fetchData()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    closeAlert(isClose) {
      this.isMessage = isClose
    },
    updateSkillAlert() {
      if (this.$route.params.updateMessage == 'true') {
        this.message = 'Update Skill Successfully'
        this.isMessage = true
        this.alertType = 'alert-success'
      }
    }
  },
  mounted() {
    if (this.data.length < 1) {
      this.fetchData()
    }
    this.updateSkillAlert()
  }
}

</script>
<style>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.pagination button {
  margin: 0 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}
.pagination button:hover {
  background-color: #e0e0e0;
}
.pagination button.active {
  background-color: #d0d0d0;
  cursor: not-allowed;
}
</style>
