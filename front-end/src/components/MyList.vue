<template>
<div class="main">
  <div class="menu">
    <p><a @click="toggleUpload"><i class="fas fa-image"></i></a></p>
    <h2>{{user.firstName}} {{user.lastName}} <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></h2>
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
  </div>
  <gallery :cars="cars" />
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
import Gallery from '@/components/Gallery.vue';
export default {
  name: 'MyCars',
  components: {
    Uploader,
    Gallery
  },
  data() {
    return {
      show: false,
      cars: [],
      error: '',
    }
  },
  created() {
    this.getCars();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getCars() {
      try {
        this.response = await axios.get("/api/cars");
        this.cars = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getCars();
    },
  }
}
</script>

<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
}

.menu h2 {
  font-size: 14px;
}
</style>

