<template>
<div>
  <section class="gallery">
    <div class="image" v-for="car in cars" v-bind:key="car._id">
      <router-link :to="{ name: 'car', params: { id: car._id }}"><img :src="car.path" /></router-link>
      <div class="carInfo">
        <p class="carTitle">{{car.title}}</p>
        <p class="carName">{{car.user.firstName}} {{car.user.lastName}}</p>
      </div>
      <p class="carDate">{{formatDate(car.created)}}</p>
    </div>
  </section>
</div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Gallery',
  props: {
    cars: Array
  },
  methods: {
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  }
}
</script>

<style scoped>
.carInfo {
  display: flex;
  justify-content: space-between;
  font-size: 0.8em;
}

.carInfo p {
  margin: 0px;
}

.carDate {
  font-size: 0.7em;
  font-weight: normal;
}

p {
  margin: 0px;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.gallery {
  column-gap: 1em;
  padding-top: 10px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .gallery {
    column-count: 2;
  }
}
</style>