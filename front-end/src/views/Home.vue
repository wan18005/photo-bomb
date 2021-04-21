<template>
<<<<<<< HEAD
<div class="home">
  <section class="image-gallery">
    <div class="image" v-for="item in items" :key="item.id">
      <h2>{{item.title}}</h2>
      <img :src="item.path" />
      <p>{{item.description}}</p>
    </div>
  </section>

</div>
=======
  <div class="home">
    <br /><br />
    <br />
    <image-gallery :photos="photos" />
    <p v-if="error">{{ error }}</p>
  </div>
>>>>>>> parent of b7b324d (stable version)
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
<<<<<<< HEAD
     items: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>


=======
      photos: [],
      error: "",
    };
  },
  created() {
    this.getPhotos();
  },
  methods: {
    async getPhotos() {
      try {
        let response = await axios.get("/api/photos/all");
        this.photos = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
  },
};
</script>

>>>>>>> parent of b7b324d (stable version)
