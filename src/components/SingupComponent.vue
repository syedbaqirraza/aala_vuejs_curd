<script>
import axios from 'axios'

export default {
  name: 'signin',
  data() {
    return {
      username: 'baqir@gmail.com',
      password: '12345678',
      name: 'baqir'
    }
  },
  methods: {
    signup() {
      const data = {
        email: this.username,
        name: this.name,
        password: this.password
      }
      const config = {
        method: 'post',
        url: 'http://127.0.0.1:8000/api/register',
        headers: {
          'Content-Type': 'application/json'
        },
        data
      }
      axios(config)
        .then((response) => {
          localStorage.setItem('token', JSON.stringify(response.data.token))
          this.$router.push({ name: 'home' })
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          console.log('final run')
        })
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (token) {
      this.$router.push('/home')
    }
  }
}
</script>
<template>
  <div class="container">
    <div class="login-form">
      <h2 class="text-center">Register</h2>
      <div class="form-group">
        <input v-model="name" type="text" class="form-control" placeholder="Enter Name" />
        <!-- <span class="text-danger">message</span> -->
      </div>
      <div class="form-group">
        <input v-model="username" type="text" class="form-control" placeholder="Username" />
        <!-- <span class="text-danger">message</span> -->
      </div>
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" placeholder="Password" />
        <!-- <span class="text-danger">message</span> -->
      </div>

      <div class="form-group">
        <button @click="signup" class="btn btn-primary btn-block">Log in</button>
        <RouterLink to="/"><i class="fa fa-arrow-left"></i> already have account </RouterLink>
      </div>
    </div>
  </div>
</template>
<style>
.form-control:focus {
  border-color: #0062cc;
  box-shadow: none;
}

.login-form {
  width: 340px;
  margin: 50px auto;
  font-size: 15px;
}
.login-form form {
  margin-top: 100px;
  margin-bottom: 15px;
  background: #f7f7f7;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.login-form h2 {
  margin: 0 0 15px;
}
.form-control,
.btn {
  min-height: 38px;
  border-radius: 2px;
}
.btn {
  font-size: 15px;
  font-weight: bold;
  background-color: #0062cc;
  border-color: #0062cc;
}
.btn:hover,
.btn:focus {
  background-color: #0052cc;
  border-color: #0052cc;
}
.logo {
  margin-bottom: 30px;
  height: 60px;
}
</style>
