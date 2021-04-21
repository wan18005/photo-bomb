<template>
<div class="car-page">
  <div class="image"  v-if="car != null">
    <img :src="car.path" />
    <div class="car-info">
      <h3 class="car-title">Title: {{car.title}}</h3>
      <!--<p class="carName" v-if="carUser != null">{{carUser.firstName}} {{carUser.lastName}}</p>-->
      <p class="car-description">Discription: {{car.description}}</p>
      <p class="car-date">[{{formatDate(car.created)}}]</p>
    </div>
    
  </div>

  <div class="comments">
    <p style="text-align: center;font-weight: bold;">Comments</p>
    <hr>
    <div v-if="$root.$data.user === null">
        <p style="text-align: center;font-style:italic;">Commnet is not available. You must log in first</p>
    </div>
    <br>

    <div class="display-comments" v-for="comm in commentArray" v-bind:key="comm._id">
      <div class="comment-name-date"><p style="font-weight: bold;">- {{comm.user.firstName}} {{comm.user.lastName}}</p><p style="color: grey;font-size:0.8em;">--[{{formatDate(comm.created)}}]</p></div>
      <p class="comment-text" style="font-style:italic;">{{comm.commentData}}</p>
      <br>
      <br>
    </div>
    
    <div class="leave-comment" v-if="$root.$data.user != null" >
      <p>Comment here:</p>
      <textarea v-model="commentData" cols=72 rows=4 placeholder="Your Comment" ></textarea>
      <button style="display: block" @click="uploadComment">Upload</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'Car',
  data() {
    return {
      car: null,
      carUser: null,
      commentData: "",
      commentArray: [],
    }
  },
  created() {
    this.getCar();
    this.displayComments();
  },
  methods: {
    async getCar() {
      try {
        let response = await axios.get("/api/cars/" + this.$route.params.id);
        this.car = response.data;
        this.getCarUser();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getCarUser() {
      try {
        let response = await axios.get("/api/users/");
        this.carUser = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async uploadComment() {
        await axios.post('/api/comments', {
          car: this.$route.params.id,
          commentData: this.commentData,
        });
        this.commentData = "";
        //repopulate comments
        this.displayComments();
    },
    async displayComments() {
      try {
        let response = await axios.get('/api/comments/' + this.$route.params.id);
        this.commentArray = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
  }
}
</script>

<style scoped>
.comment-text {
  padding-left: 20px;
  color: #000000;
  font-size: 1.1em;
}
.comment-name-date {
  font-size: 1.2em;
  display: flex;
}
.car-page {
  align-items: center;
  width: 100%;
  padding-top: 120px;
  padding-bottom: 30px;
}
.car-info {
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
  row-gap: 5px;
  font-size: 1em;
  margin-bottom: 2.5em;
}
.car-info p {
  margin: 2px;
}
.car-description {
  font-size: 1.2em;
}
.car-date {
  font-size: 0.9em;
  color: grey;
}
.car-title {
  font-size: 2em;
  font-weight: bold;
}
p {
  margin: 3px;
}
.image {
  display: inline-block;
  width: 100%;
}
.image img {
  width: 70%;
}
</style>