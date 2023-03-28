<template>
  <div class="scroll-container" @scroll="onScroll">
    <h2 class="text-center">Skill Scroll Pegination</h2>
    <input
      class="mx-3 my-2"
      type="text"
      @keyup.enter="filterData"
      v-model="searchQuery"
      placeholder="Search..."
    />

    <!-- <button @click="findSkill">Find</button> -->
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
    <div v-if="loading" class="loading-indicator">Loading...</div>
    <div v-if="isSearch" class="text-center">result not found...</div>
    <div v-if="!isMore" class="loading-indicator">All Record Are Loaded...</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      searchQuery: '',
      items: [],
      filteredData: [],
      serverResponseData: [],
      mergedData: [],
      loading: false,
      page: 1,
      pageSize: 5,
      isMore: true,
      isSearch: false,
      storageData: []
    }
  },
  mounted() {
    let self = this
    if (localStorage.getItem('cacheData') !== null) {
      self.storageData = JSON.parse(localStorage.getItem('cacheData'))
      self.items = self.storageData.skillsData
      self.page = self.storageData.pageNo
    }
    self.loadMoreItems()
  },

  methods: {
    filterData() {
      this.filteredData = this.items.filter((item) => {
        return item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
      this.items = this.filteredData
      this.findSkill()
    },

    mergeData() {
      const mergedData = [...this.filteredData, ...this.serverResponseData]
      const uniqueData = mergedData.reduce((acc, current) => {
        const x = acc.find((item) => item.id === current.id)
        if (!x) {
          return acc.concat([current])
        } else {
          return acc
        }
      }, [])
      this.mergedData = uniqueData
      this.items = uniqueData
    },

    findSkill() {
      if (this.searchQuery.length > 0) {
        let self = this
        let token = localStorage.getItem('token')
        token = JSON.parse(token)
        const data = JSON.stringify({
          search: self.searchQuery
        })
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://127.0.0.1:8000/api/search',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data: data
        }
        axios(config)
          .then((response) => {
            const newItems = response.data
            self.serverResponseData = newItems.items
            self.mergeData()
            if (newItems.items.length > 0) {
              self.items = newItems.items

              self.loading = false
              self.isSearch = false
              self.isMore = true
            } else {
              self.items = []
              self.isMore = false
              self.loading = false
              self.isSearch = false
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.loadMoreItems()
      }
    },
    loadMoreItems() {
      let self = this
      self.loading = true
      let token = localStorage.getItem('token')
      token = JSON.parse(token)
      var data = JSON.stringify({
        page: self.page,
        pageSize: self.pageSize
      })
      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/api/scroll',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios(config)
        .then((response) => {
          const newItems = response.data
          if (newItems.items.length > 0) {
            let remainingData = newItems.items.filter((item) => !self.items.includes(item))
            self.items.push(...remainingData)
            self.loading = false
            self.isMore = true
            localStorage.setItem(
              'cacheData',
              JSON.stringify({
                skillsData: self.items,
                pageNo: self.page,
                loading: self.loading,
                isMore: self.isMore
              })
            )
            self.page++
          } else {
            self.loading = false
            self.isMore = false
            localStorage.setItem(
              'cacheData',
              JSON.stringify({
                skillsData: self.items,
                pageNo: self.page,
                loading: self.loading,
                isMore: self.isMore
              })
            )
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onScroll() {
      const container = this.$refs.scrollContainer
      const scrollPosition = container.scrollTop + container.offsetHeight
      const contentHeight = container.scrollHeight
      if (
        scrollPosition >= contentHeight &&
        !this.loading &&
        this.isMore == true &&
        this.searchQuery == ''
      ) {
        this.loadMoreItems()
      }
    }
  }
}
</script>

<style scoped>
.scroll-container {
  height: 750px;
  overflow-y: scroll;
}

.loading-indicator {
  text-align: center;
}
</style>
