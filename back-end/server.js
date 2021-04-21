const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const users = require("./users.js");
const photos = require("./photos.js");

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the mongodb database
mongoose.connect('mongodb://localhost:27017/final', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',/*'../front-end/public/images/',*/
  limits: {
    fileSize: 10000000
  }
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    title: req.body.title,
    description: req.body.description,
    path: req.body.path,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});





// Brand part//
// Create a scheme for brands in the dealership: a name, a description, and a path to an image.
const brandSchema = new mongoose.Schema({
  name: String,
  text: String,
  path: String,
});

// Create a model for brands in the dealership.
const Brand = mongoose.model('Brand', brandSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});



// Model part//
const vehicleSchema = new mongoose.Schema({
  /*brand: {
      type: mongoose.Schema.ObjectId,
      ref: 'Brand'
  },*/
  carName: String,
  miles: String,
  price: String,
  title: String,
  path: String,
  make: String,
})

// Model for vehicles
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

app.post('/api/vehicles', async (req, res) => {
  const vehicle = new Vehicle({
    carName: req.body.carName,
    miles: req.body.miles,
    price: req.body.price,
    title: req.body.title,
    path: req.body.path,
    make: req.body.make,
  });
  try {
    await vehicle.save();
    res.send(vehicle);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/vehicles', async (req, res) => {
  try {
    let vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/brands/:id', async (req, res) => {
  try {
    const brand = await Brand.findOne({
      _id: req.params.id
    });
    brand.name = req.body.name;
    brand.text = req.body.text;    //description for Edit 
    await brand.save();
    res.send(brand);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/vehicles/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      _id: req.params.id
    });
    vehicle.carName = req.body.carName,
      vehicle.miles = req.body.miles,
      vehicle.price = req.body.price,
      vehicle.title = req.body.title,
      vehicle.make = req.body.make,
      await vehicle.save();
    res.send(vehicle);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/vehicles/:id', async (req, res) => {
  try {
    await Vehicle.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

































const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));














// import the users module and setup its API path
app.use("/api/users", users.routes);
app.use("/api/photos", photos.routes);

app.listen(3001, () => console.log('Server listening on port 3001!'));