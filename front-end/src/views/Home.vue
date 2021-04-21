<template>
  <div class="home">
    <h1>-Available Brands-</h1>
    <section class="image-gallery">
      <div class="image" v-for="brand in brands" :key="brand.id"><a @click="selectBrand(brand)">
        <h2>{{brand.name}}</h2>
        <img :src="brand.path" />
        <p>{{brand.text}}</p>    <!--showing description in home page-->
      </a></div>
    </section>

    <div class="display" v-if="findBrand">
      <h1>See by brand</h1>
      <section class="image-gallery">
        <div class="image-2" v-for="vehicle in vehicles" :key="vehicle.id">
          <div v-if="vehicle.make === findBrand.name">
            <h3>{{vehicle.carName}}</h3>
            <img :src="vehicle.path" />
            <h3>$ {{vehicle.price}} (USD)</h3>
            <p>Title: {{vehicle.title}}</p>    <!--showing description in home page-->
            <p>Odometers: {{vehicle.miles}}</p>
          </div>
        </div>
      </section>
    </div>
    
    <div class="home">
      <h1>Wish list of customers</h1>
      <gallery :cars="cars" />
      <p v-if="error">{{error}}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
import Gallery from '@/components/Gallery.vue';
export default {
  name: 'Home',
  data() {
    return {
      findName: "",
      findVehicle: "",
      findBrand: "",
      brandName: "",
      show: 'all',
      brands: [],
      vehicles: [],
      cars: [],
      error: '',
    }
  },
  components: {
    Gallery,
  },
  created() {
    this.getBrands();
    this.getVehicles();
    this.getCars();
  },
  computed: {
    /*suggestions() {
      let brands = this.brands.filter(brand => brand.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return brands.sort((a, b) => a.name > b.name);
    },*/
    suggestions() {
      let brands = this.brands.filter(brand => brand.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return brands.sort((a, b) => a.name > b.name);
    },
    filteredVehicles(vehicle) {
      if (this.show === vehicle.id)
        return this.items.filter(item => {
          return !item.completed;
        });
      if (this.show === 'completed')
        return this.items.filter(item => {
          return item.completed;
        });
      return this.items;
    },
  },
  methods: {
    async getBrands() {
      try {
        let response = await axios.get("/api/brands");
        this.brands = response.data;
        return true;
      } catch (error) {
      //  console.log(error);
      }
    },
    async getVehicles() {
      try {
        let response = await axios.get("/api/vehicles");
        this.vehicles = response.data;
        return true;
      } catch (error) {
      //  console.log(error);
      }
    },
    async getCars() {
      try {
        let response = await axios.get("/api/cars/all");
        this.cars = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    selectBrand(brand) {
      this.findBrand = "";
      this.findBrand = brand;
      //this.getVehicles();
    },
    selectVehicle(vehicle) {
      this.findVehicle = "";
      this.findVehicle = vehicle;
      //this.getVehicles();
    },
    select(brandName) {
      this.brandName = brandName;
    },
  }
}
</script>

<style scoped>
h1 {
  font-size: 1.5em;
  font-weight: bolder;
  color: rgb(97, 94, 94);
}

.home {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.display {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.image h2 {
  font-style: italic;
  font-weight: bold;
  font-size: 1.5em;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1em;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  border-bottom: rgb(114, 113, 113) 2px solid;
  /*background-color: tomato;*/
}

.image-gallery-2 {
  margin-top: 1em;
  column-gap: 1em;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  /*border: rgb(68, 68, 68) 1px solid;*/
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 13em;
}

.image:hover {
  background-color: rgb(235, 235, 235);
}

.image img {
  height: 10em;
  width: 90%;
  border: rgb(68, 68, 68) 2px solid;
}

.image p {
  /*border: rgb(68, 68, 68) 2px solid;*/
  font-style: italic;
  font-size: 1.3em;
}

.image-2 {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 15em;
}

.image-2 img {
  height: 10em;
  width: 100%;
  border: rgb(68, 68, 68) 2px solid;
}

.image-2 p {
  /*border: rgb(68, 68, 68) 2px solid;*/
  font-style: italic;
  font-size: 1.1em;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #c1c3c4;
  color: #fff;
}

.upload-2 {
  margin-right: 50px;
}

.upload-2 h2 {
  margin: 0px;
}

.upload-2 img {
  max-width: 30%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>