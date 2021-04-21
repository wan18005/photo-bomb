<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/logo.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Kim's Delalership</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <div class="home_link">
      <router-link to="/">Home</router-link>
    </div>
    <div class="admin_link">
      <router-link to="/dashboard">Dashbord</router-link>
    </div>
    <div class="admin_link">
      <router-link to="/admin">Admin</router-link>
    </div>
    <div id="footer">
      <a href="https://github.com/kimycyc94/Dealership" target= '_blank'>Git Repo</a>
    </div>
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-flow: column wrap;
}

/* Header */
.header {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 20px 20px 0px 20px;
  background-color: #9a9d9e;
  color: #f1f1f1;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: 580px;
}

/* Footer */
.footer {
  height: 50px;
  background: #9a9d9e;
  font-size: 1.5em;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
}

.footer a {
  color: #f1f1f1;
  text-decoration: none;
}

.home_link:hover {
  font-weight: bold;
  text-decoration: underline;
}

.admin_link:hover {
  font-weight: bold;
  text-decoration: underline;
}

#footer:hover {
  font-weight: bold;
  text-decoration: underline;
}

h1 {
  font-size: 2px;
}

h2 {
  font-size: 14px;
}
</style>
