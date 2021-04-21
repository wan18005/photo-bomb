<template>
     
<div id="app">
  <div class="link_bar">
    <div class="home_link">
      <router-link to="/"><i class="fas fa-home"></i>  Home</router-link>
    </div>
    <div class="admin_link">
      <router-link to="/dashboard"><i class="fas fa-user"></i>  My account </router-link>
    </div>
  </div>
  
  <div class="header">
    <router-link to="/">
    </router-link>
    <div class="title">
      <h1>Ruby Shark Art</h1>
    </div>
  </div>

  <div class="content">
    <router-view />
  </div>

  
  <div class="foot_bar">
    <div class="home_link">
      <router-link to="/about">About</router-link>
    </div>
    <div class="home_link">
      <router-link to="/admin">Admin</router-link>
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
  /* Semi-circle */
  margin: -3.5em 1em 1em 0;
  height: 100px;
  width: 200px;
  border-bottom-left-radius: 200px;
  border-bottom-right-radius: 200px;
  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 50%;
  transform: translate(-50%, 0);
  /* Color and alignment */
  background: #85B3D1FF;
  text-align: center;
  
}

.title {
  margin-top: 4px;
}
.title h1 {
  font-size: 30px;
}
.content {
  padding: 20px 100px;
  min-height: 580px;
}
/* header */
.link_bar {
  height: 50px;
  background: #2460A7FF;
  font-size: 1.5em;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
}
/* footer */
.foot_bar {
  margin-top: 200px;
  height: 50px;
  background: #2460A7FF;
  font-size: 1.5em;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-evenly;
}
.link_bar a {
  color: #f1f1f1;
  text-decoration: none;
}
.foot_bar a{
  color: #f1f1f1;
  text-decoration: none;
}
.home_link:hover {
  font-weight: bold;
}
.admin_link:hover {
  font-weight: bold;
}
#link_bar:hover {
  font-weight: bold;
}
h1 {
  font-size: 2px;
}
h2 {
  font-size: 14px;
}

</style>