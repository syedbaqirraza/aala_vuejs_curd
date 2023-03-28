<template>
  <div class="col-4 offset-4">
    <div class="form-group">
      <label for="skill">Update Skill</label>
      <input type="text" class="form-control" id="skill" v-model="skillUpdate" />
    </div>
    <button @click="updateSkill" class="btn btn-primary mt-2">Update</button>
    &nbsp;<button @click="backToHome" class="btn btn-success mt-2">Back To Home</button>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      message: '',
      alertType: '',
      isMessage: false,
      id: this.$route.params.id,
      skillUpdate: ''
    }
  },
  mounted() {
    this.getRecord()
  },
  methods: {
    getRecord() {
      let self = this
      let token = localStorage.getItem('token')
      token = JSON.parse(token)

      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/api/skill/${self.id}`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      axios(config)
        .then((response) => {
          self.skillUpdate = response.data.data.name
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateSkill() {
      let self = this
      let token = localStorage.getItem('token')
      token = JSON.parse(token)

      const data = JSON.stringify({
        name: self.skillUpdate
      })

      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `http://127.0.0.1:8000/api/skill/${self.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: data
      }

      axios(config)
        .then((response) => {
          if (response.data.success == false) {
            self.isMessage = true
            self.message = response.data.message.name[0]
            self.alertType = 'alert-danger'
          } else {
            self.$router.push({
              name: 'home',
              params: {
                updateMessage: true
              }
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    backToHome() {
      this.$router.push('/')
    }
  }
}
</script>
