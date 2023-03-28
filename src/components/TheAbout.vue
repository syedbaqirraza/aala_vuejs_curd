<template>
  <div class="greetings">
    <h1 class="green">About Page</h1>
    <h3>You’ve successfully created a About Page</h3>
  </div>
  <div class="login-form">
    <form>
      <h2 class="text-center">Log in</h2>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Username" />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Password" />
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block">Log in</button>
      </div>
    </form>
  </div>
</template>
<style scoped>
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
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}
h3 {
  font-size: 1.2rem;
}
.greetings h1,
.greetings h3 {
  text-align: center;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
