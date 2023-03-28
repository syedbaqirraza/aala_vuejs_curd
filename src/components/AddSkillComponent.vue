<template>
  <div class="col-4 offset-4">
    <div v-if="isMessage == true">
      <alert :alert-type="alertType" :message="message" :closeAlert="closeAlert"></alert>
    </div>
    <div class="form-group">
      <label for="skill">Add Skill</label>
      <input type="text" class="form-control" id="skill" v-model="skillName" />
    </div>
    <button @click="addSkill" class="btn btn-primary mt-2">Add</button>
    &nbsp;<button @click="backToHome" class="btn btn-success mt-2">Back To Home</button>
  </div>
</template>
<script>
import axios from 'axios'
import AlertComponent from './AlertComponent.vue';

export default {
  components: {
    alert: AlertComponent
  },
  name: 'addSkillComponent',
  data() {
    return {
      message: '',
      alertType: '',
      isMessage: false,
      skillName: '',
      formAdd: {
        name: ''
      }
    }
  },
  methods: {
    backToHome() {
      this.$router.push('/');
    },
    addSkill() {
      const token = JSON.parse(localStorage.getItem('token'));

      const data = JSON.stringify({
        name: this.skillName
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://127.0.0.1:8000/api/skill',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios(config)
        .then(response => {
          if (response.data.success == false) {
            this.isMessage = true;
            this.message = response.data.message.name[0];
            this.alertType = 'alert-danger';
          } else {
            this.skillName = '';
            this.isMessage = true;
            this.message = response.data.message;
            this.alertType = 'alert-success';
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    closeAlert(isClose) {
      this.isMessage = isClose;
    },
    backToHome() {
      this.$router.push('/');
    }
  }
}

</script>
