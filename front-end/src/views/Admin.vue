<template>
  <div class="admin">
    <h1>Register make and model</h1>

    <div class="admin_1">
      <div class="heading">
        <div class="circle">1</div>
        <h2>Add Make & Vehicle info</h2>
      </div>
      <div class="add">
        <div class="form">
          <h3>Make info</h3>
          <input v-model="name" placeholder="Make">
          <br>
          <br>
          <textarea v-model="text" placeholder="Description"></textarea> <!--description input-->
          <p></p>
          <input type="file" name="photo" @change="fileChanged">
          <br>
          <button onclick="alert('Brand information has been successfully uploaded');" @click="upload">Upload</button>
        </div>
        <br>
        <div class="form">
          <h3>Vehicle info</h3>
              <input v-model="make" placeholder="Make">
              <br>
              <input v-model="carName" placeholder="Model">
              <br>
              <input v-model="price" placeholder="Price">
              <br>
              <input v-model="title" placeholder="Title">
              <br>
              <input v-model="miles" placeholder="Odometers">
              <p></p>
              <br>
              <input type="file" name="photo" @change="fileChanged">
              <br>
              <button onclick="alert('Vehicle information has been successfully uploaded');" @click="uploadV()">Add a vehicle</button>
        </div>
      </div>
    </div>

    <div class="admin_2">
      <div class="heading">
        <div class="circle">2</div>
        <h2>Add/Edit/Delete info</h2>
      </div>
      
      <div class="edit">
        <div class="form">
          <h3>[Brand list]</h3>
          <div class="suggestions" v-if="suggestions.length > 0">
            <div class="suggestion" v-for="suggestion in suggestions" :key="suggestion.id" @click="selectBrand(suggestion)">{{suggestion.name}}
            </div>
          </div>
          <br>
        </div>
        <div class="upload-2" v-if="findBrand">
          <input v-model="findBrand.name">
          <p></p>
          <img :src="findBrand.path" />
          <br>
          <textarea v-model="findBrand.text" placeholder="Description"></textarea> <!--description  input-->
        </div>
        <div class="actions" v-if="findBrand">
          <br>
          <button onclick="alert('Brand information has been successfully edited');" @click="editBrand(findBrand)">Brand Edit</button>
          <button onclick="alert('Brand information has been successfully deleted');" @click="deleteBrand(findBrand)">Brand Delete</button>
          <br>
          <br>
        </div>
      </div>

      <div class="edit">
        <div class="form">
          <h3>[Vehicle list]</h3>
          <div class="suggestions" v-if="suggestions_2.length > 0">
            <div class="suggestion" v-for="suggestion in suggestions_2" :key="suggestion.id" @click="selectVehicle(suggestion)">{{suggestion.carName}}
            </div>
          </div>
          <br>
        </div>
        <div class="upload-2" v-if="findVehicle">
          <img :src="findVehicle.path" />
          <br>
          <input v-model="findVehicle.make" placeholder="Make">
          <input v-model="findVehicle.carName" placeholder="Model">
          <input v-model="findVehicle.price" placeholder="Price">
          <input v-model="findVehicle.title" placeholder="Title">
          <input v-model="findVehicle.miles" placeholder="Odometers">
          <br>      
        </div>
        <div class="actions" v-if="findVehicle">
          <br>
          <button onclick="alert('Brand information has been successfully edited');" @click="editVehicle(findVehicle)">Vehicle Edit</button>
          <button onclick="alert('Brand information has been successfully deleted');" @click="deleteVehicle(findVehicle)">Vehicle Delete</button>
          <br>
          <br>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      name: "",
      text: "",
      carName: "",
      miles: "",
      price: "",
      title: "",
      make: "",
      file: null,
      addBrand: null,
      addVehicle: null,
      findName: "",
      findName2: "",
      findCarName: "",
      findBrand: "",
      findVehicle: "",
      brands: [],
      vehicles: []
    }
  },
  computed: {
    suggestions() {
      let brands = this.brands.filter(brand => brand.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return brands.sort((a, b) => a.name > b.name);
    },
    suggestions_2() {
      let vehicles = this.vehicles.filter(vehicle => vehicle.carName.toLowerCase().startsWith(this.findName2.toLowerCase()));
      return vehicles.sort((a, b) => a.carName > b.carName);
    }
  },
  created() {
    this.getBrands();
    this.getVehicles();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/brands', {
          name: this.name,
          text: this.text, //description's value to text
          path: r1.data.path
        });
        this.addBrand = r2.data;
        this.name = "";
        this.text = "";  //reset description input box
        this.file = null;
      } catch (error) {
      //  console.log(error);
      }
    },
    async uploadV() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post("/api/vehicles", {
          carName: this.carName,
          miles: this.miles,
          make: this.make, 
          price: this.price,
          title: this.title,
          path: r1.data.path
        });
        this.addVehicle = r2.data;
        this.carName = "";
        this.miles = "";
        this.price = "";
        this.title = "";
        this.make = "";
        this.file = null;
        this.getVehicles();
      } catch (error) {
      //  console.log(error);
      }
    },
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
    selectBrand(brand) {
      this.findBrand = "";
      this.findBrand = brand;
    },
    selectVehicle(vehicle) {
      this.findVehicle = "";
      this.findVehicle = vehicle;
    },
    async deleteBrand(brand) {
      try {
        await axios.delete("/api/brands/" + brand._id);
        this.findBrand = null;
        this.getBrands();
        return true;
      } catch (error) {
      //  console.log(error);
      }
    },
    async deleteVehicle(vehicle) {
      try {
        await axios.delete("/api/vehicles/" + vehicle._id);
        this.getVehicles();
      } catch (error) {
        //console.log(error);
      } 
    },
    async editBrand(brand) {
      try {
        await axios.put("/api/brands/" + brand._id, {
          name: this.findBrand.name,
          text: this.findBrand.text      //description's value to text
        });
        this.findBrand = null;
        this.getBrands();
        return true;
      } catch (error) {
      //  console.log(error);
      }
    },
    async editVehicle(vehicle) {
      try {
        await axios.put("/api/vehicles/" + vehicle._id, {
          make: this.findVehicle.make,
          carName: this.findVehicle.carName,
          price: this.findVehicle.price,
          title: this.findVehicle.title,
          miles: this.findVehicle.miles,
        });
        this.findVehicle = null;
        this.getVehicles();
        return true;
      } catch (error) {
      //  console.log(error);
      }
    },
  }
}
</script>


<style scoped>
.admin {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}

.admin_1 {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 30px;
  border-top: rgb(114, 113, 113) 2px solid;
  border-bottom: rgb(114, 113, 113) 2px solid;
}

.admin_2 {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: rgb(114, 113, 113) 2px solid;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
  font-size: 1.3em;
}

.add,
.edit,
.upload-2 {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

h1 {
  font-size: 1.5em;
}

.form {
  margin-right: 100px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 70%;
}

.upload-2 h2 {
  margin: 0px;
}

.upload-2 img {
  max-width: 40%;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 13em;
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

.image-gallery {
  column-gap: 1em;
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  /*background-color: tomato;*/
}
</style>